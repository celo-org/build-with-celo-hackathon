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

		this.NftMarketplace = global.getModuleClass('common', 'NftMarketplace');

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
	async _putAddressLockerContent(session, wallet, currency, card, contentstring) {
		var global = this.global;
		var _apicontrollers = this._getClientAPI();

		var sessionuuid = session.getSessionUUID();
		var walletuuid = wallet.getWalletUUID();

		var mvcpwa = this._getMvcPWAObject();

		var childsession;
		var fromaccount;

		var canSign = await this.canCardSign(sessionuuid, walletuuid, card.uuid);

		if (canSign) {
			// get proper session to access erc721token for currency
			childsession = await this._getMonitoredERC721TokenSession(session, wallet, currency);
			fromaccount = card._getSessionAccountObject();
		}
		else {
			var isconnected = this._isCardConnected(session, wallet, card);

			if (!isconnected)
				return Promise.reject('card is not connected to send transactions: ' + card.address);

			childsession = card._getSession();
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
				if (!res || (res.success === false)) {
					let err = 'transaction did not succeed in ContractKitWrapper';

					if (callback)
						callback(err, null);

					throw err;
				}

				if (callback)
					callback(null, res);
				
				return res;
			})
			.catch(err => {
				if (callback)
					callback(err, null);

				throw err;
			});
		};

		// we overload CARD._getSessionAccountObject to allow direct use of mvccurrencies API
		// (very bad but waiting for future versions of Wallet module)
		const CardClass = global.getModuleClass('wallet', 'Card');

		if (CardClass && !CardClass.prototype._org_getSessionAccountObject) {
			CardClass.prototype._org_getSessionAccountObject = CardClass.prototype._getSessionAccountObject;

			CardClass.prototype._getSessionAccountObject = function () {
				let _session = this._getSession();
				let _connection = _session.getSessionVariable('remote_connection');
				
				if (_connection)
					return this._getAccountObject();
				else
					return this._org_getSessionAccountObject();
			};

		}

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

		return wallet.getCardFromUUID(cardinfo.uuid);
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

	// minter
	async _getMonitoredERC721TokenSession(session, wallet, currency) {
		var mvcpwa = this._getMvcPWAObject();

		return mvcpwa._getMonitoredERC721TokenSession(session, wallet, currency);
	}

	async _createERC721TokenObject(session, currency, data) {
		// for local contract objects (before deployment)
		var global = this.global;
		var mvcerc721module = global.getModuleObject('mvc-erc721');

		var erc721token = await mvcerc721module.createERC721TokenObject(session, currency, data);

		return erc721token;
	}

	async _getERC721TokenObject(session, currency, minter) {
		// for contract objects already deployed

		if (!minter || !minter.address)
			return Promise.reject('can only instantiate minters already on the chain');

		var global = this.global;
		var mvcerc721module = global.getModuleObject('mvc-erc721');

		var data = Object.create(null);

		data['address'] = minter.address;
		data['name'] = minter.name;
		data['symbol'] = minter.symbol;

		var erc721token = await mvcerc721module.createERC721TokenObject(session, currency, data);

		return erc721token;
	}

	async _getMinterCard(session, wallet, currency, minter) {
		var carduuid = minter.card_uuid;
		var card;

		if (wallet && carduuid) {
			// if minter created through getMinter()
			card =  await wallet.getCardFromUUID(carduuid);
	
			if (!card)
				return Promise.reject('could not find card with uuid ' + carduuid);
		}
		else {
			// TODO: find better way to find back card from minter address
			card = await this._getCurrencyCard(session, wallet, currency);
		}

		return card;
	}

	async deployDeedMinter(sessionuuid, walletuuid, currencyuuid, carduuid, minter, feelevel) {
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
	
		var card = await wallet.getCardFromUUID(carduuid);

		if (!card)
			return Promise.reject('could not find card ' + carduuid);

		
		// get proper session to access erc21token for currency
		var childsession;
		var fromaccount;

		var canSign = await this.canCardSign(sessionuuid, walletuuid, card.uuid);

		if (canSign) {
			childsession = await this._getMonitoredERC721TokenSession(session, wallet, currency);
			fromaccount = card._getSessionAccountObject();
		}
		else {
			var isconnected = this._isCardConnected(session, wallet, card);

			if (!isconnected)
				return Promise.reject('card is not connected to send transactions: ' + card.address);

			childsession = card._getSession();
			fromaccount = card._getAccountObject(); // read-only card
		}			
			
		// create contract object (local)
		var data = Object.create(null);

		data['name'] = minter.name;
		data['symbol'] = minter.symbol;

		data['basetokenuri'] = minter.basetokenuri;

		var erc721token = await this._createERC721TokenObject(childsession, currency, data);

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
			return Promise.reject('could not generate a minter for currency ' + currencyuuid);

		minter.address = erc721tokenaddress;
		minter.card_uuid = carduuid;
		minter.card_address = card.getAddress();

		// we save the mapping
		var txhash = await this._putAddressLockerContent(session, wallet, currency, card, erc721tokenaddress);

		minter.txhash = txhash;
	
		return minter;
	}

	async mintDeed(sessionuuid, walletuuid, currencyuuid, minter, feelevel = null) {
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

		var card = await this._getMinterCard(session, wallet, currency, minter);

		if (!card)
			return Promise.reject('could not find minter card');

		// get proper session to access erc21token for currency
		var childsession;
		var fromaccount;

		var canSign = await this.canCardSign(sessionuuid, walletuuid, card.uuid);

		if (canSign) {
			childsession = await this._getMonitoredERC721TokenSession(session, wallet, currency);
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
		var erc721token = await this._getERC721TokenObject(childsession, currency, minter);

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
			currencyuuid,
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

	async transferDeed(sessionuuid, walletuuid, currencyuuid, minter, deed, toaddress, feelevel = null) {
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
	
		// get card owning this deed
		var card = await this._getDeedOwningCard(session, wallet, currency, minter, deed);

		if (!card)
			return Promise.reject('could not find minter card');
		
		// get proper session to access erc21token for currency
		var childsession = await this._getMonitoredERC721TokenSession(session, wallet, currency);
		var fromaccount;

		var canSign = await this.canCardSign(sessionuuid, walletuuid, card.uuid);

		if (canSign) {
			childsession = await this._getMonitoredERC721TokenSession(session, wallet, currency);
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
		var erc721token = await this._getERC721TokenObject(childsession, currency, minter);

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
			card = await this._getMinterCard(session, wallet, currency, minter);
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
			card = await this._getMinterCard(session, wallet, currency, minter);
		}

		if (!card)
			return Promise.reject('could not find minter card');
	
		// get proper session to access erc21token for currency
		var childsession;
		var fromaccount;

		var canSign = await this.canCardSign(sessionuuid, walletuuid, card.uuid);

		if (canSign) {
			childsession = await this._getMonitoredERC721TokenSession(session, wallet, currency);
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
		var erc721token = await this._getERC721TokenObject(childsession, currency, minter);

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
	async _getNftMarketplaceObject(session, wallet, currency) {
		var global = this.global;

		var contractaddress = currency.deeds_v1.marketplace;
		var currenciesmodule = global.getModuleObject('currencies');

		var web3providerurl = await currenciesmodule.getCurrencyWeb3ProviderUrl(session, currency);

		const NftMarketplaceClass = this.NftMarketplace;

		var nftMarketplace = new NftMarketplaceClass(session, contractaddress, web3providerurl);

		return nftMarketplace;
	}

	async getDeedSaleInfo(sessionuuid, walletuuid, currencyuuid, minter, deed) {
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
			// we are creating the deed and probably listing the deed on the fly
			card = await this._getMinterCard(session, wallet, currency, minter);
		}
	
		if (!card)
			return Promise.reject('could not find minter card');
	
		// instantiate NftMarketplace
		var nftMarketplace = await this._getNftMarketplaceObject(session, wallet, currency);

		if (!nftMarketplace)
			return Promise.reject('could not find nft market place');

		var tokenaddress = deed.minter;
		var tokenid = deed.tokenid;

		var childsession;
		var fromaccount;

		var canSign = await this.canCardSign(sessionuuid, walletuuid, card.uuid);

		if (canSign) {
			// get proper session to access erc721token for currency
			childsession = await this._getMonitoredERC721TokenSession(session, wallet, currency);
			fromaccount = card._getSessionAccountObject();
		}
		else {
			var isconnected = this._isCardConnected(session, wallet, card);

			if (!isconnected)
				return Promise.reject('card is not connected to send transactions: ' + card.address);

			childsession = card._getSession();
			fromaccount = card._getAccountObject(); // read-only card
		}

		var listing_info = {onsale: false, tokenaddress, tokenid};

		var listed_nfts = await nftMarketplace.getListedNfts();

		for (var i = 0; i < (listed_nfts ? listed_nfts.length: 0); i++) {
			let _nft = listed_nfts[i];
			let _nft_tokenaddress = _nft[0]
			let _nft_tokenid = _nft[1];
			let areequal = childsession.areAddressesEqual(_nft_tokenaddress, tokenaddress);

			if ( _nft.listed && areequal && (_nft_tokenid == tokenid)) {
				listing_info.onsale = true;
				listing_info.saleprice = _nft.price;
				listing_info.owner = _nft.owner;
				listing_info.seller = _nft.seller;
			}
		}

		return listing_info;
	}


	async offerDeedOnSale(sessionuuid, walletuuid, currencyuuid, minter, deed, amount, feelevel) {
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
			// we are creating the deed and probably listing the deed on the fly
			card = await this._getMinterCard(session, wallet, currency, minter);
		}
	
		if (!card)
			return Promise.reject('could not find minter card');
	
		// instantiate NftMarketplace
		var nftMarketplace = await this._getNftMarketplaceObject(session, wallet, currency);

		if (!nftMarketplace)
			return Promise.reject('could not find nft market place');

		var tokenaddress = deed.minter;
		var tokenid = deed.tokenid;

		var childsession;
		var fromaccount;

		var canSign = await this.canCardSign(sessionuuid, walletuuid, card.uuid);

		if (canSign) {
			// get proper session to access erc721token for currency
			childsession = await this._getMonitoredERC721TokenSession(session, wallet, currency);
			fromaccount = card._getSessionAccountObject();
		}
		else {
			var isconnected = this._isCardConnected(session, wallet, card);

			if (!isconnected)
				return Promise.reject('card is not connected to send transactions: ' + card.address);

			childsession = card._getSession();
			fromaccount = card._getAccountObject(); // read-only card
		}

		// we first approve the marketplace contract to let marketplaceobj transfer ownership
		var nftmarketplace_address = nftMarketplace.getAddress();

		var erc721token = await this._getERC721TokenObject(childsession, currency, minter);

		// TEST
		var _from_addr = fromaccount.getAddress();

		var listed_nfts = await nftMarketplace.getListedNfts();
		var my_nfts = await nftMarketplace.getMyNfts(_from_addr);
		var my_listed_nfts = await nftMarketplace.getMyListedNfts(_from_addr);

		var _current_owner = await erc721token.ownerOf(tokenid);
		var _balance_of = await erc721token.balanceOf(fromaccount);
		var _is_approved_for_all = await erc721token.isApprovedForAll(_from_addr, nftmarketplace_address);
		// TEST

		var nft_approved_addr = await erc721token.getApproved(tokenid);
		var areequal = childsession.areAddressesEqual(nftmarketplace_address, nft_approved_addr);

		if (!areequal) {
			let _ethtx = ethereumnodeaccessmodule.getEthereumTransactionObject(childsession, fromaccount);
		
			// compute feelevel then create fee
			let _tx_fee = {};
			_tx_fee.transferred_credit_units = 0;
			let approval_cost_units = 3;
			_tx_fee.estimated_cost_units = approval_cost_units;
	
			let _feelevel = await mvcpwa._getRecommendedFeeLevel(session, wallet, card, _tx_fee);
	
			let _fee = await _apicontrollers.createSchemeFee(from_card_scheme, _feelevel);
	
			_ethtx.setGas(_fee.gaslimit);
			_ethtx.setGasPrice(_fee.gasPrice);
	
			let tx_approved = await erc721token.approve(nftmarketplace_address, tokenid, _ethtx);

			if (!tx_approved || (tx_approved.success === false))
				return Promise.reject('could not approve nft market place');
		}

		// then list the deed

		// create ethereum transaction
		var from_card_scheme = card.getScheme();

		var ethereumnodeaccessmodule = global.getModuleObject('ethereum-node-access');

		var ethereumtransaction = ethereumnodeaccessmodule.getEthereumTransactionObject(childsession, fromaccount);
		
		// create fee
		var fee = await _apicontrollers.createSchemeFee(from_card_scheme, feelevel);

		ethereumtransaction.setGas(fee.gaslimit);
		ethereumtransaction.setGasPrice(fee.gasPrice);

		var tokenamount = amount;
		var tokenamount_string = tokenamount.toString(); // use string to avoid "fault='overflow', operation='BigNumber.from'"

		// listing fee
		var ethnodemodule = global.getModuleObject('ethnode');
		var ethnodecontrollers = ethnodemodule.getControllersObject();
		
		var listing_fee_wei = await nftMarketplace.getListingFee();
		var listing_fee_eth = ethnodecontrollers.getEtherStringFromWei(listing_fee_wei, 18);
		var listing_units = await mvcpwa._getUnitsFromCredits(session, from_card_scheme, listing_fee_wei);

		ethereumtransaction.setValue(listing_fee_eth);
		
		var txhash = await nftMarketplace.listNft(tokenaddress, tokenid, tokenamount_string, ethereumtransaction);

		return txhash;
	}
	
	async buyDeed(sessionuuid, walletuuid, currencyuuid, minter, deed, feelevel) {
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

		
		var listing_info = await this.getDeedSaleInfo(sessionuuid, walletuuid, currencyuuid, minter, deed);

		if (!listing_info || (listing_info.onsale !== true))
			return Promise.reject('deed is not on sale');
		
		
		var card;
		if (deed.owner) {
			// clause can be added by a subsequent owner different from the creator
			card = await this._getDeedOwningCard(session, wallet, currency, minter, deed);
		}
		else {
			// we are creating the deed and probably listing the deed on the fly
			card = await this._getMinterCard(session, wallet, currency, minter);
		}
	
		if (!card)
			return Promise.reject('could not find minter card');
	
		// instantiate NftMarketplace
		var nftMarketplace = await this._getNftMarketplaceObject(session, wallet, currency);

		if (!nftMarketplace)
			return Promise.reject('could not find nft market place');

		var tokenaddress = deed.minter;
		var tokenid = deed.tokenid;

		var childsession;
		var fromaccount;

		var canSign = await this.canCardSign(sessionuuid, walletuuid, card.uuid);

		if (canSign) {
			// get proper session to access erc721token for currency
			childsession = await this._getMonitoredERC721TokenSession(session, wallet, currency);
			fromaccount = card._getSessionAccountObject();
		}
		else {
			var isconnected = this._isCardConnected(session, wallet, card);

			if (!isconnected)
				return Promise.reject('card is not connected to send transactions: ' + card.address);

			childsession = card._getSession();
			fromaccount = card._getAccountObject(); // read-only card
		}
	

		// TODO:
		// for payments in currency, before sendin buyNft transaction
		// we must approve the mark for listing_info.price amount in tokens
		var nftmarketplace_address = nftMarketplace.getAddress();

		// get token object to access erc20 data
		var erc20credittokenobject = await from_card_scheme.getTokenObject(card.address);

		// initialize
		erc20credittokenobject._getERC20TokenContract(childsession);

		// synchronize
		const Token = global.getModuleClass('wallet', 'Token');
		await Token.synchronizeERC20TokenContract(childsession, erc20credittokenobject);

		// erc20 contract
		var erc20contract = erc20credittokenobject._getERC20TokenContract(childsession);

		var alloweeaccount = childsession.createBlankAccountObject();
		alloweeaccount.setAddress(nftmarketplace_address);
		var payingaccount = card._getAccountObject();
		var gas = fee.gaslimit;
		var gasPrice = fee.gasPrice;

		// pass string to avoid BigNumber error
		var saleprice = listing_info.price
		var balance = await erc20contract.balanceOf(payingaccount);

		if (balance < saleprice)
			return Promise.reject('not enough funds on ' + card.address + ' to spend ' + saleprice);


		var allowance = await erc20contract.allowance(payingaccount, alloweeaccount);

		if (saleprice > allowance) {
			let _allowance = saleprice.toString();
			let _txhash = await erc20contract.approve(alloweeaccount, _allowance, payingaccount, gas, gasPrice);

			if (!_txhash)
			return Promise.reject('could not approve marketplace contract as spender for token ' + card.address);
		}		
	
		// create ethereum transaction
		var from_card_scheme = card.getScheme();

		var ethereumnodeaccessmodule = global.getModuleObject('ethereum-node-access');

		var ethereumtransaction = ethereumnodeaccessmodule.getEthereumTransactionObject(childsession, fromaccount);
		
		// create fee
		var fee = await _apicontrollers.createSchemeFee(from_card_scheme, feelevel);

		ethereumtransaction.setGas(fee.gaslimit);
		ethereumtransaction.setGasPrice(fee.gasPrice);

		var txhash = null;//await nftMarketplace.buyNft(tokenaddress, tokenid, ethereumtransaction);

		return txhash;
	

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
