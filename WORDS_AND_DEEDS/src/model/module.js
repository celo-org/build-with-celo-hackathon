'use strict';


var Module = class {
	
	constructor() {
		this.name = 'mvc-mydeed';
		this.current_version = "to_be_filled";
		
		this.global = null; // put by global on registration

		this.isready = false;
		this.isloading = false;
		
	}
	
	init() {
		console.log('module init called for ' + this.name);

		var global = this.global;
		
		this.isready = true;

		this.Linker = global.getModuleClass('common', 'Linker');

		require('./celo/contractkit-wrapper.js');
		this.ContractKitWrapper = global.getModuleClass('common', 'ContractKitWrapper');
	}
	
	// compulsory  module functions
	loadModule(parentscriptloader, callback) {
		console.log('loadModule called for module ' + this.name);
		
		if (this.isloading)
			return;
			
		this.isloading = true;

		var self = this;

		// load module's files
		var modulescriptloader = parentscriptloader.getChildLoader('mvcmydeedloader');

		modulescriptloader.load_scripts(function() { self.init(); if (callback) callback(null, self); });

		return modulescriptloader;	
	}
	
	isReady() {
		return this.isready;
	}

	hasLoadStarted() {
		return this.isloading;
	}

	// optional module functions
	registerHooks() {
		console.log('module registerHooks called for ' + this.name);
		
		var global = this.global;

		global.registerHook('creatingSession_hook', this.name, this.creatingSession_hook);
	}
	
	postRegisterModule() {
		console.log('postRegisterModule called for ' + this.name);
		if (!this.isloading) {
			var global = this.global;
			var self = this;
			var rootscriptloader = global.getRootScriptLoader();
			
			this.loadModule(rootscriptloader, function() {
				if (self.registerHooks)
				self.registerHooks();
			});
		}
	}

	//
	// hooks
	//
	creatingSession_hook(result, params) {
		console.log('creatingSession_hook called for ' + this.name);
		
		var global = this.global;
		var session = params[0];
		
		return true;
	}

	
	_getClientAPI() {
		if (this.clientapicontrollers)
			return this.clientapicontrollers;
		
		var global = this.global;
		
		var mvcmodule = global.getModuleObject('mvc');
		
		this.clientapicontrollers = mvcmodule._getClientAPI();

		return  this.clientapicontrollers;
	}

	_getMvcPWAObject() {
		var global = this.global;
		
		var mvcmodule = global.getModuleObject('mvc-myquote');

		return mvcmodule;
	}

	// API

	//
	// Storage
	//
	async _putAddressLockerContent(session, wallet, currency, card, contentstring, connection) {
		var global = this.global;
		var _apicontrollers = this._getClientAPI();

		var mvcpwa = this._getMvcPWAObject();

		var childsession;
		var fromaccount;

		if (!connection || !connection.type || (connection.type == 'local')) {
			// get proper session to access erc721token for currency
			childsession = await mvcpwa._getMonitoredERC721TokenSession(session, wallet, currency);
			fromaccount = card._getSessionAccountObject();
		}
		else {
			childsession = await this._getMonitoredRemoteWalletSession(session, wallet, currency, connection);
			fromaccount = card._getAccountObject(); // read-only card
		}

		var mvcerc721module = global.getModuleObject('mvc-erc721');

		var from_card_scheme = card.getScheme();

		var ethereumnodeaccessmodule = global.getModuleObject('ethereum-node-access');

		var ethereumtransaction = ethereumnodeaccessmodule.getEthereumTransactionObject(childsession, fromaccount);
		
		// compute feelevel then create fee
		let tx_fee = {};
		tx_fee.transferred_credit_units = 0;
		let minter_cost_units = (currency.deeds_v1.locker_put_cost_units ? parseInt(currency.deeds_v1.locker_put_cost_units) : 2);
		tx_fee.estimated_cost_units = minter_cost_units;

		var _feelevel = await mvcpwa._getRecommendedFeeLevel(session, wallet, card, tx_fee);

		var fee = await _apicontrollers.createSchemeFee(from_card_scheme, _feelevel);

		ethereumtransaction.setGas(fee.gaslimit);
		ethereumtransaction.setGasPrice(fee.gasPrice);

		return mvcerc721module.putLockerContent(childsession, currency, contentstring, ethereumtransaction);
	}

	//
	// Wallet functions
	//
	async setWalletLabel(sessionuuid, walletuuid, label) {
		var global = this.global;
		var mvcclientwalletmodule = global.getModuleObject('mvc-client-wallet');
		return mvcclientwalletmodule.setWalletLabel(sessionuuid, walletuuid, label);
	}
	

	//
	// Deeds
	//

	async _getMonitoredRemoteWalletSession(session, wallet, currency, connection) {
		var global = this.global;
		var _apicontrollers = this._getClientAPI();

		var mvcpwa = this._getMvcPWAObject();


		// look if we already have a child sessiion for remote transactions
		var walletsession = wallet._getSession();

		var remotesession = walletsession.getSessionVariable('remotesession');

 		if (remotesession)
			return remotesession;
		
		// otherwise create a child session
		var currencyscheme = await mvcpwa._getCurrencyScheme(session, currency);
		var childsession = await mvcpwa._getMonitoredSchemeSession(session, wallet, currencyscheme);

		if (currencyscheme.isRemote() === true) {
			// remote (or at least for authkey)
			childsession.mydeed_isremote = true;
		}
		else {
			// local
			childsession.mydeed_isremote = false;
		}

		childsession.MYDEED = this.current_version;

		var ethereum_node_access_instance = await _apicontrollers.getEthereumNodeAccessInstance(childsession);
		var web3 = ethereum_node_access_instance._getWeb3Instance();

		// replace standard sendTransaction
		var contractkitwrapper = new this.ContractKitWrapper(session);
		web3.eth.sendTransaction = (txjson, callback) => {
			//return web3.eth.sendTransaction(txjson, callback);
			return contractkitwrapper.sendTransaction(connection, txjson)
			.then(res => {
				if (callback)
					return callback(null, res);
				
				return res;
			})
			.catch(err => {
				if (callback)
					return callback(err, null);

				throw err;
			});
		};

		walletsession.setSessionVariable('remotesession', childsession);

		return childsession;
	}


	// minter
	async _deployDeedMinter(session, wallet, currency, card, minter, connection) {
		var global = this.global;
		var _apicontrollers = this._getClientAPI();

		var mvcpwa = this._getMvcPWAObject();
	
		var feelevel = connection.feelevel;
		var childsession;
		var fromaccount;

		if (!connection || !connection.type || (connection.type == 'local')) {
			// get proper session to access erc721token for currency
			childsession = await mvcpwa._getMonitoredERC721TokenSession(session, wallet, currency);
			fromaccount = card._getSessionAccountObject();
		}
		else {
			childsession = await this._getMonitoredRemoteWalletSession(session, wallet, currency, connection);
			fromaccount = card._getAccountObject(); // read-only card
		}

		// create contract object (local)
		var data = Object.create(null);

		data['name'] = minter.name;
		data['symbol'] = minter.symbol;

		data['basetokenuri'] = minter.basetokenuri;

		var erc721token = await mvcpwa._createERC721TokenObject(childsession, currency, data);

		var from_card_scheme = card.getScheme();

		var ethereumnodeaccessmodule = global.getModuleObject('ethereum-node-access');

		var ethereumtransaction = ethereumnodeaccessmodule.getEthereumTransactionObject(childsession, fromaccount);
		
		// fee
		var fee = await _apicontrollers.createSchemeFee(from_card_scheme, feelevel);

		ethereumtransaction.setGas(fee.gaslimit);
		ethereumtransaction.setGasPrice(fee.gasPrice);

 		var contractaddress = await erc721token.deploy(ethereumtransaction);

		var erc721tokenaddress = erc721token.getAddress();

		if (!erc721tokenaddress)
			return Promise.reject('could not generate a minter for currency ' + currency.uuid);

		minter.address = erc721tokenaddress;
		minter.card_uuid = card.uuid;
		minter.card_address = card.getAddress();

		// we save the mapping
		var txhash = await this._putAddressLockerContent(childsession, wallet, currency, card, erc721tokenaddress, connection);

		minter.txhash = txhash;
	
		return minter;
	}

	async deployDeedMinter(sessionuuid, walletuuid, currencyuuid, carduuid, minter, connection) {
		var mvcpwa = this._getMvcPWAObject();

		if (!connection || !connection.type || (connection.type == 'local')) {
			// use mvcpwa function, for now
			return mvcpwa.deployDeedMinter(sessionuuid, walletuuid, currencyuuid, carduuid, minter, (connection && connection.feelevel ? connection.feelevel : null));
		}
		else {
			if (!sessionuuid)
			return Promise.reject('session uuid is undefined');
		
			if (!walletuuid)
				return Promise.reject('wallet uuid is undefined');
			
			if (!currencyuuid)
				return Promise.reject('currency uuid is undefined');
			
			if (!carduuid)
				return Promise.reject('card uuid is undefined');
				
			var global = this.global;
			var _apicontrollers = this._getClientAPI();

			var session = await _apicontrollers.getSessionObject(sessionuuid);
			
			if (!session)
				return Promise.reject('could not find session ' + sessionuuid);
			
			var wallet = await _apicontrollers.getWalletFromUUID(session, walletuuid);
			
			if (!wallet)
				return Promise.reject('could not find wallet ' + walletuuid);
		
			var currency = await mvcpwa.getCurrencyFromUUID(sessionuuid, currencyuuid);

			if (!currency)
				return Promise.reject('could not find currency ' + currencyuuid);

			var card = await wallet.getCardFromUUID(carduuid);
	
			if (!card)
				return Promise.reject('could not find card ' + carduuid);
				
			return this._deployDeedMinter(session, wallet, currency, card, minter, connection);
		}
	}


	async _mintDeed(session, wallet, currency, minter, connection) {
		var global = this.global;
		var _apicontrollers = this._getClientAPI();

		var mvcpwa = this._getMvcPWAObject();

		var card = await mvcpwa._getMinterCard(session, wallet, currency, minter);

		if (!card)
			return Promise.reject('could not find minter card');

		var feelevel = connection.feelevel;
		var childsession;
		var fromaccount;

		if (!connection || !connection.type || (connection.type == 'local')) {
			// get proper session to access erc721token for currency
			childsession = await mvcpwa._getMonitoredERC721TokenSession(session, wallet, currency);
			fromaccount = card._getSessionAccountObject();
		}
		else {
			childsession = await this._getMonitoredRemoteWalletSession(session, wallet, currency, connection);
			fromaccount = card._getAccountObject(); // read-only card
		}
		
		// get contract
		var erc721token = await mvcpwa._getERC721TokenObject(childsession, currency, minter);

		var from_card_scheme = card.getScheme();

		// mint a token item
		var ethereumnodeaccessmodule = global.getModuleObject('ethereum-node-access');

		var ethereumtransaction = ethereumnodeaccessmodule.getEthereumTransactionObject(childsession, fromaccount);
		
		// fee
		var fee = await _apicontrollers.createSchemeFee(from_card_scheme, feelevel);

		ethereumtransaction.setGas(fee.gaslimit);
		ethereumtransaction.setGasPrice(fee.gasPrice);

		// fetch totalsupply
		const totalsupply = await erc721token.getTotalSupply();

		// mint now
		var txhash = await erc721token.mint(fromaccount, ethereumtransaction);

		if (!txhash)
			return Promise.reject('mint of deed did not succeed, no transaction hash returned');

		var deed = {
			type: 'deed',
			currencyuuid: currency.uuid,
			minter: minter.address,
			tokenid: totalsupply,
			txhash: 'dd-' + minter.address + '-' + totalsupply,
			metadata: {},
			articles: [],
			clauses: [],
			minthash: txhash
		};

		return deed;
	}

	async mintDeed(sessionuuid, walletuuid, currencyuuid, minter, connection) {
		var mvcpwa = this._getMvcPWAObject();

		if (!connection || !connection.type || (connection.type == 'local')) {
			// use mvcpwa function, for now
			return mvcpwa.mintDeed(sessionuuid, walletuuid, currencyuuid, minter, (connection && connection.feelevel ? connection.feelevel : null));
		}
		else {
			if (!sessionuuid)
			return Promise.reject('session uuid is undefined');
		
			if (!walletuuid)
				return Promise.reject('wallet uuid is undefined');
			
			if (!currencyuuid)
				return Promise.reject('currency uuid is undefined');
			
			
			var global = this.global;
			var _apicontrollers = this._getClientAPI();

			var session = await _apicontrollers.getSessionObject(sessionuuid);
			
			if (!session)
				return Promise.reject('could not find session ' + sessionuuid);
			
			var wallet = await _apicontrollers.getWalletFromUUID(session, walletuuid);
			
			if (!wallet)
				return Promise.reject('could not find wallet ' + walletuuid);
		
			var currency = await mvcpwa.getCurrencyFromUUID(sessionuuid, currencyuuid);

			if (!currency)
				return Promise.reject('could not find currency ' + currencyuuid);

			return this._mintDeed(session, wallet, currency, minter, connection);
		}
	}


	async _transferDeed(session, wallet, currency, minter, deed, toaddress, connection) {
		var global = this.global;
		var _apicontrollers = this._getClientAPI();

		var mvcpwa = this._getMvcPWAObject();
	
		// get card owning this deed
		var card = await mvcpwa._getDeedOwningCard(session, wallet, currency, minter, deed);

		if (!card)
			return Promise.reject('could not find minter card');
		
		var feelevel = connection.feelevel;
		var childsession;
		var fromaccount;

		if (!connection || !connection.type || (connection.type == 'local')) {
			// get proper session to access erc721token for currency
			childsession = await mvcpwa._getMonitoredERC721TokenSession(session, wallet, currency);
			fromaccount = card._getSessionAccountObject();
		}
		else {
			childsession = await this._getMonitoredRemoteWalletSession(session, wallet, currency, connection);
			fromaccount = card._getAccountObject(); // read-only card
		}
		
		// get contract
		var erc721token = await mvcpwa._getERC721TokenObject(childsession, currency, minter);

		// sender and recipient
		var from_card_scheme = card.getScheme();

		var toaccount = childsession.createBlankAccountObject();

		toaccount.setAddress(toaddress);

		// transfer

		var ethereumnodeaccessmodule = global.getModuleObject('ethereum-node-access');

		var ethereumtransaction = ethereumnodeaccessmodule.getEthereumTransactionObject(childsession, fromaccount);
		
		// fee
		var fee = await _apicontrollers.createSchemeFee(from_card_scheme, feelevel);

		ethereumtransaction.setGas(fee.gaslimit);
		ethereumtransaction.setGasPrice(fee.gasPrice);

		var tokenid = deed.tokenid;
		
		// TODO: uncomment for @p2pmoney-org/ethereum_erc721 > 0.20.16
		//var _Buffer = this._getBufferClass();
		//var deed_data_str = (deed.data ? JSON.stringify(deed.data) : '{}');
		//var deed_data_buf = _Buffer.from(deed_data_str, 'utf8'); // not used while using @p2pmoney-org/ethereum_core ver 0.20.10

		//var txhhash = await erc721token.safeTransferFrom(fromaccount, toaccount, tokenid, deed_data_buf, ethereumtransaction);

		var txhhash = await erc721token.transferFrom(fromaccount, toaccount, tokenid, ethereumtransaction);
	
		return txhhash;
	}

	async transferDeed(sessionuuid, walletuuid, currencyuuid, minter, deed, toaddress, connection) {
		var mvcpwa = this._getMvcPWAObject();

		if (!connection || !connection.type || (connection.type == 'local')) {
			// use mvcpwa function, for now
			return mvcpwa.transferDeed(sessionuuid, walletuuid, currencyuuid, minter, deed, toaddress, (connection && connection.feelevel ? connection.feelevel : null));
		}
		else {
			if (!sessionuuid)
			return Promise.reject('session uuid is undefined');
		
			if (!walletuuid)
				return Promise.reject('wallet uuid is undefined');
			
			if (!currencyuuid)
				return Promise.reject('currency uuid is undefined');
			
			
			var global = this.global;
			var _apicontrollers = this._getClientAPI();

			var session = await _apicontrollers.getSessionObject(sessionuuid);
			
			if (!session)
				return Promise.reject('could not find session ' + sessionuuid);
			
			var wallet = await _apicontrollers.getWalletFromUUID(session, walletuuid);
			
			if (!wallet)
				return Promise.reject('could not find wallet ' + walletuuid);
		
			var currency = await mvcpwa.getCurrencyFromUUID(sessionuuid, currencyuuid);

			if (!currency)
				return Promise.reject('could not find currency ' + currencyuuid);

			return this._transferDeed(session, wallet, currency, minter, deed, toaddress, connection);
		}
	}

	async _registerClause(session, wallet, currency, minter, deed, clause, connection) {
		var global = this.global;
		var _apicontrollers = this._getClientAPI();

		var mvcpwa = this._getMvcPWAObject();
	
		var card;
		if (deed.owner) {
			// clause can be added by a subsequent owner different from the creator
			card = await mvcpwa._getDeedOwningCard(session, wallet, currency, minter, deed);
		}
		else {
			// we are creating the deed and probably adding the first metadata clause
			card = await mvcpwa._getMinterCard(session, wallet, currency, minter);
		}

		if (!card)
			return Promise.reject('could not find minter card');

		var feelevel = connection.feelevel;
		var childsession;
		var fromaccount;

		if (!connection || !connection.type || (connection.type == 'local')) {
			// get proper session to access erc721token for currency
			childsession = await mvcpwa._getMonitoredERC721TokenSession(session, wallet, currency);
			fromaccount = card._getSessionAccountObject();
		}
		else {
			childsession = await this._getMonitoredRemoteWalletSession(session, wallet, currency, connection);
			fromaccount = card._getAccountObject(); // read-only card
		}
	
		// get contract
		var erc721token = await mvcpwa._getERC721TokenObject(childsession, currency, minter);

		var tokenid = deed.tokenid;

		var contentstring = JSON.stringify(clause);

		var ethereumnodeaccessmodule = global.getModuleObject('ethereum-node-access');

		var from_card_scheme = card.getScheme();

		var ethereumtransaction = ethereumnodeaccessmodule.getEthereumTransactionObject(childsession, fromaccount);
		
		// fee
		var fee = await _apicontrollers.createSchemeFee(from_card_scheme, feelevel);

		ethereumtransaction.setGas(fee.gaslimit);
		ethereumtransaction.setGasPrice(fee.gasPrice);

		const txhash = await erc721token.registerRecord(tokenid, contentstring, ethereumtransaction);

		return txhash;
	}

	async registerClause(sessionuuid, walletuuid, currencyuuid, minter, deed, clause, connection) {
		var mvcpwa = this._getMvcPWAObject();

		if (!connection || !connection.type || (connection.type == 'local')) {
			// use mvcpwa function, for now
			return mvcpwa.registerClause(sessionuuid, walletuuid, currencyuuid, minter, deed, clause, (connection && connection.feelevel ? connection.feelevel : null));
		}
		else {
			if (!sessionuuid)
			return Promise.reject('session uuid is undefined');
		
			if (!walletuuid)
				return Promise.reject('wallet uuid is undefined');
			
			if (!currencyuuid)
				return Promise.reject('currency uuid is undefined');
			
			
			var global = this.global;
			var _apicontrollers = this._getClientAPI();

			var session = await _apicontrollers.getSessionObject(sessionuuid);
			
			if (!session)
				return Promise.reject('could not find session ' + sessionuuid);
			
			var wallet = await _apicontrollers.getWalletFromUUID(session, walletuuid);
			
			if (!wallet)
				return Promise.reject('could not find wallet ' + walletuuid);
		
			var currency = await mvcpwa.getCurrencyFromUUID(sessionuuid, currencyuuid);

			if (!currency)
				return Promise.reject('could not find currency ' + currencyuuid);

			return this._registerClause(session, wallet, currency, minter, deed, clause, connection);
		}
	}
}


if ( typeof window !== 'undefined' && typeof window.GlobalClass !== 'undefined' && window.GlobalClass ) {
	var _GlobalClass = window.GlobalClass;
}
else if (typeof window !== 'undefined') {
	var _GlobalClass = ( window && window.simplestore && window.simplestore.Global ? window.simplestore.Global : null);
}
else if (typeof global !== 'undefined') {
	// we are in node js
	var _GlobalClass = ( global && global.simplestore && global.simplestore.Global ? global.simplestore.Global : null);
}

_GlobalClass.getGlobalObject().registerModuleObject(new Module());

// dependencies
_GlobalClass.getGlobalObject().registerModuleDepency('mvc-mydeed', 'common');
