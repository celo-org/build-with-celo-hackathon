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
	// Card functions
	//
	async canCardSign(sessionuuid, walletuuid, carduuid) {
		var global = this.global;
		var mvcmodule = global.getModuleObject('mvc');

		var _privkey = await mvcmodule.getCardPrivateKey(sessionuuid, walletuuid, carduuid).catch(err => {});

		return (_privkey ? true : false);
	}

	async _isCardConnected(session, wallet, card) {
		var cardsession = card._getSession();

		var curr_connection = cardsession.getSessionVariable('remote_connection');

		return (curr_connection ? true : false);
	}

	async _setConnectedCardSession(session, wallet, card, connection) {
		var global = this.global;
		var _apicontrollers = this._getClientAPI();

		var cardsession = card._getSession();
		var card_address = card.getAddress();

		if (!connection || !connection.account |!connection.provider)
			return Promise.reject('invalid connection');

		if (card_address != connection.account)
			return Promise.reject('connection account does not match card: ' + card_address);

		var curr_connection = cardsession.getSessionVariable('remote_connection');

		if (curr_connection)
			return cardsession;

		cardsession.setSessionVariable('remote_connection', connection);

		var cardscheme = card.getScheme();

		if (cardscheme.isRemote() === true) {
			// remote (or at least for authkey)
			cardsession.mydeed_isremote = true;
		}
		else {
			// local
			cardsession.mydeed_isremote = false;
		}

		cardsession.MYDEED = this.current_version;

		var ethereum_node_access_instance = await _apicontrollers.getEthereumNodeAccessInstance(cardsession);
		var web3 = ethereum_node_access_instance._getWeb3Instance();

		// replace standard sendTransaction
		var contractkitwrapper = new this.ContractKitWrapper(cardsession);
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


		return cardsession;
	}

	async connectCard(sessionuuid, walletuuid, carduuid, connection) {
		if (!sessionuuid)
			return Promise.reject('session uuid is undefined');
		
		if (!walletuuid)
			return Promise.reject('wallet uuid is undefined');
		
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
		
		var card = await wallet.getCardFromUUID(carduuid);
		
		if (!card)
			return Promise.reject('could not find card ' + carduuid);

		await this._setConnectedCardSession(session, wallet, card, connection);

		return true;
	}

	

	//
	// Deeds
	//
/*	async _getDeedSigningCard(session, wallet, currency, minter, deed, connection) {
		var card;

		var mvcpwa = this._getMvcPWAObject();

		if (!connection || (connection.type == 'local')) {
			// get card owning this deed
			card = await this._getDeedOwningCard(session, wallet, currency, minter, deed);
		}
		else {
			// when it is possible, we will ask remote wallet to sign strings

			// for now, we check we have a local card that can sign locally
			card = await mvcpwa._getCurrencyCard(session, wallet, currency);
		}
		
		return card;
	}

	async canSignDeed(sessionuuid, walletuuid, currencyuuid, minter, deed, connection) {
		if (!sessionuuid)
		return Promise.reject('session uuid is undefined');
	
		if (!walletuuid)
			return Promise.reject('wallet uuid is undefined');
		
		if (!currencyuuid)
			return Promise.reject('currency uuid is undefined');
		
		var global = this.global;
		var _apicontrollers = this._getClientAPI();

		var mvcpwa = this._getMvcPWAObject();

		var session = await _apicontrollers.getSessionObject(sessionuuid);
		
		if (!session)
			return Promise.reject('could not find session ' + sessionuuid);
		
		var wallet = await _apicontrollers.getWalletFromUUID(session, walletuuid);
		
		if (!wallet)
			return Promise.reject('could not find wallet ' + walletuuid);

		var currency = await mvcpwa.getCurrencyFromUUID(sessionuuid, currencyuuid);

		if (!currency)
			return Promise.reject('could not find currency ' + currencyuuid);

		var card = await this. _getDeedSigningCard(session, wallet, currency, minter, deed, connection);

		return card.canSign();
	}

	async signDeedString(sessionuuid, walletuuid, currencyuuid, minter, deed, plainstring, connection) {
		if (!sessionuuid)
		return Promise.reject('session uuid is undefined');
	
		if (!walletuuid)
			return Promise.reject('wallet uuid is undefined');
		
		if (!currencyuuid)
			return Promise.reject('currency uuid is undefined');
		
		
		var global = this.global;
		var _apicontrollers = this._getClientAPI();

		var mvcpwa = this._getMvcPWAObject();

		var session = await _apicontrollers.getSessionObject(sessionuuid);
		
		if (!session)
			return Promise.reject('could not find session ' + sessionuuid);
		
		var wallet = await _apicontrollers.getWalletFromUUID(session, walletuuid);
		
		if (!wallet)
			return Promise.reject('could not find wallet ' + walletuuid);
	
		var currency = await mvcpwa.getCurrencyFromUUID(sessionuuid, currencyuuid);

		if (!currency)
			return Promise.reject('could not find currency ' + currencyuuid);

		var card = await this._getDeedSigningCard(session, wallet, currency, minter, deed, connection);

		if (!card)
			return Promise.reject('could not find deed card');

		var cardaccount = card._getSessionAccountObject();

		if (!cardaccount)
			return Promise.reject('card can not sign texts ' + card.uuid);

		var privatekey = cardaccount.getPrivateKey();

		// when it is possible, we will ask remote wallet to sign strings
		var signing = {};

		signing.signature = await _apicontrollers.signString(session, privatekey, plainstring);
		signing.signer = card.getAddress();

		return signing
	}*/

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
		var contractkitwrapper = new this.ContractKitWrapper(childsession);
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
	async _getDeedOwningCard(session, wallet, currency, minter, deed) {
		var mvcpwa = this._getMvcPWAObject();

		var sessionuuid = session.getSessionUUID();
		var walletuuid = wallet.getWalletUUID();
		var currencyuuid = currency.uuid;
		var address = deed.owner;

		var cardinfo = await mvcpwa.getCurrencyCardWithAddress(sessionuuid, walletuuid, currencyuuid, address).catch(err => {});

		if (!cardinfo)
			return;

		return await wallet.getCardFromUUID(cardinfo.uuid);
	}

	

	async getDeedOwningCard(sessionuuid, walletuuid, currencyuuid, minter, deed) {
		if (!sessionuuid)
			return Promise.reject('session uuid is undefined');
		
		if (!walletuuid)
			return Promise.reject('wallet uuid is undefined');
		
		if (!currencyuuid)
			return Promise.reject('currency uuid is undefined');
		
		var global = this.global;
		var _apicontrollers = this._getClientAPI();
		var mvcpwa = this._getMvcPWAObject();

	
		var session = await _apicontrollers.getSessionObject(sessionuuid);
	
		if (!session)
			return Promise.reject('could not find session ' + sessionuuid);

		var wallet = await _apicontrollers.getWalletFromUUID(session, walletuuid).catch(err => {});
	
		if (!wallet)
			return;

		var currency = await mvcpwa.getCurrencyFromUUID(sessionuuid, currencyuuid);

		if (!currency)
			return Promise.reject('could not find currency ' + currencyuuid);
	
		var address = deed.owner;

		var cardinfo = await mvcpwa.getCurrencyCardWithAddress(sessionuuid, walletuuid, currencyuuid, address).catch(err => {});

		if (!cardinfo)
			return;

		// we accept read-only card
/* 		var _privatekey = await this.getCardPrivateKey(sessionuuid, walletuuid, cardinfo.uuid);

		if (_privatekey) */
		return cardinfo;
	}

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
		var card = await this._getDeedOwningCard(session, wallet, currency, minter, deed);

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

/*	async _registerClause(session, wallet, currency, minter, deed, clause, connection) {
		var global = this.global;
		var _apicontrollers = this._getClientAPI();

		var mvcpwa = this._getMvcPWAObject();
	
		var card;
		if (deed.owner) {
			// clause can be added by a subsequent owner different from the creator
			card = await this._getDeedOwningCard(session, wallet, currency, minter, deed);
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
	} */

	async signClauseMetaData(sessionuuid, walletuuid, currencyuuid, minter, deed, metadata_clause) {
		if (!sessionuuid)
			return Promise.reject('session uuid is undefined');
		
		if (!walletuuid)
			return Promise.reject('wallet uuid is undefined');
		
		if (!currencyuuid)
			return Promise.reject('currency uuid is undefined');
		
		
		var global = this.global;
		var _apicontrollers = this._getClientAPI();
		var mvcpwa = this._getMvcPWAObject();

		var session = await _apicontrollers.getSessionObject(sessionuuid);
		
		if (!session)
			return Promise.reject('could not find session ' + sessionuuid);
		
		var wallet = await _apicontrollers.getWalletFromUUID(session, walletuuid);
		
		if (!wallet)
			return Promise.reject('could not find wallet ' + walletuuid);
	
		var currency = await mvcpwa.getCurrencyFromUUID(sessionuuid, currencyuuid);

		if (!currency)
			return Promise.reject('could not find currency ' + currencyuuid);
	
		var card;
		if (deed.owner) {
			// clause can be added by a subsequent owner different from the creator
			card = await this._getDeedOwningCard(session, wallet, currency, minter, deed);
		}
		else {
			// we are creating the deed and probably adding the first metadata clause
			card = await mvcpwa._getMinterCard(session, wallet, currency, minter);
		}

		if (!card)
			return Promise.reject('could not find minter card');

		var canSign = await this.canCardSign(sessionuuid, walletuuid, card.uuid);
		var signingcard;

		if (canSign) {
			signingcard = card;
		}
		else {
			var isconnected = this._isCardConnected(session, wallet, card);

			if (!isconnected)
				return Promise.reject('card is not connected to sign clauses transactions: ' + card.address);

			// TODO: replace when remote wallet will provide ability to sign string

			// we use the currency card
			signingcard = await mvcpwa._getCurrencyCard(session, wallet, currency);

			if (!signingcard) {
				// we create a currency card on the fly
				let _privatekey = await mvcpwa.generatePrivateKey(sessionuuid);
				signingcard = await mvcpwa.createCurrencyCard(sessionuuid, walletuuid, currencyuuid, _privatekey);
			}
		}

		metadata_clause.signature = await mvcpwa.signString(sessionuuid, walletuuid, signingcard.uuid, JSON.stringify(metadata_clause));
		metadata_clause.signer = signingcard.address;

		return metadata_clause;
	}

	async registerClause(sessionuuid, walletuuid, currencyuuid, minter, deed, clause, feelevel = null) {
		if (!sessionuuid)
			return Promise.reject('session uuid is undefined');
		
		if (!walletuuid)
			return Promise.reject('wallet uuid is undefined');
		
		if (!currencyuuid)
			return Promise.reject('currency uuid is undefined');
		
		
		var global = this.global;
		var _apicontrollers = this._getClientAPI();
		var mvcpwa = this._getMvcPWAObject();

		var session = await _apicontrollers.getSessionObject(sessionuuid);
		
		if (!session)
			return Promise.reject('could not find session ' + sessionuuid);
		
		var wallet = await _apicontrollers.getWalletFromUUID(session, walletuuid);
		
		if (!wallet)
			return Promise.reject('could not find wallet ' + walletuuid);
	
		var currency = await mvcpwa.getCurrencyFromUUID(sessionuuid, currencyuuid);

		if (!currency)
			return Promise.reject('could not find currency ' + currencyuuid);
	
		var card;
		if (deed.owner) {
			// clause can be added by a subsequent owner different from the creator
			card = await this._getDeedOwningCard(session, wallet, currency, minter, deed);
		}
		else {
			// we are creating the deed and probably adding the first metadata clause
			card = await mvcpwa._getMinterCard(session, wallet, currency, minter);
		}

		if (!card)
			return Promise.reject('could not find minter card');
	
		// get proper session to access erc21token for currency
		var childsession;
		var fromaccount;

		var canSign = await this.canCardSign(sessionuuid, walletuuid, card.uuid);

		if (canSign) {
			childsession = await mvcpwa._getMonitoredERC721TokenSession(session, wallet, currency);
			fromaccount = card._getSessionAccountObject();
		}
		else {
			var isconnected = this._isCardConnected(session, wallet, card);

			if (!isconnected)
				return Promise.reject('card is not connected to send transactions: ' + card.address);

			childsession = card._getSession();
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

	//
	// Deed marketplace
	//
	async offerDeedOnSale(sessionuuid, walletuuid, currencyuuid, minter, deed, amount, connection) {
		if (!sessionuuid)
		return Promise.reject('session uuid is undefined');
	
		if (!walletuuid)
			return Promise.reject('wallet uuid is undefined');
		
		if (!currencyuuid)
			return Promise.reject('currency uuid is undefined');
		
		
		var global = this.global;
		var _apicontrollers = this._getClientAPI();
		var mvcpwa = this._getMvcPWAObject();

		var session = await _apicontrollers.getSessionObject(sessionuuid);
		
		if (!session)
			return Promise.reject('could not find session ' + sessionuuid);
		
		var wallet = await _apicontrollers.getWalletFromUUID(session, walletuuid);
		
		if (!wallet)
			return Promise.reject('could not find wallet ' + walletuuid);
	
		var currency = await mvcpwa.getCurrencyFromUUID(sessionuuid, currencyuuid);

		if (!currency)
			return Promise.reject('could not find currency ' + currencyuuid);

	}
	
	async buyDeed(sessionuuid, walletuuid, currencyuuid, minter, deed, amount, connection) {
		if (!sessionuuid)
		return Promise.reject('session uuid is undefined');
	
		if (!walletuuid)
			return Promise.reject('wallet uuid is undefined');
		
		if (!currencyuuid)
			return Promise.reject('currency uuid is undefined');
		
		
		var global = this.global;
		var _apicontrollers = this._getClientAPI();
		var mvcpwa = this._getMvcPWAObject();

		var session = await _apicontrollers.getSessionObject(sessionuuid);
		
		if (!session)
			return Promise.reject('could not find session ' + sessionuuid);
		
		var wallet = await _apicontrollers.getWalletFromUUID(session, walletuuid);
		
		if (!wallet)
			return Promise.reject('could not find wallet ' + walletuuid);
	
		var currency = await mvcpwa.getCurrencyFromUUID(sessionuuid, currencyuuid);

		if (!currency)
			return Promise.reject('could not find currency ' + currencyuuid);

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
