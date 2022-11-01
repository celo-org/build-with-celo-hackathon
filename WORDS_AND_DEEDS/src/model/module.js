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
	// Scheme functions
	//

	async _getMonitoredSchemeSession(session, wallet, scheme) {
		var mvcpwa = this._getMvcPWAObject();

		return mvcpwa._getMonitoredSchemeSession(session, wallet, scheme);
	}

	async _getEthereumTransaction(session, txhash) {
		var global = this.global;

		var ethereumnodeaccessmodule = global.getModuleObject('ethereum-node-access');

		const result = new Promise((resolve, reject) => { 
			ethereumnodeaccessmodule.readEthereumTransactionObject(session, txhash, (err, res) => {
				if (err) reject(err);
				else {
					var ethereumnodeaccessmodule = global.getModuleObject('ethereum-node-access');
					var data = res.data;
					try {
						// can throw invalid UTF8 detected
						res.data_decoded_utf8 = ethereumnodeaccessmodule.web3ToUTF8(session, data);
					}
					catch(e) {}
				
					resolve(res);
				}
			})
			.then(res => {
				// fixing missing callback call when data == null
				// in EthereumNodeAccess.readEthereumTransactionObject
				if (res)
					return res;
				else
					throw new Error('no transaction found with hash ' + txhash);
			})
			.catch(err => {
				reject(err);
			});
		});
		
		return result;
	}

	async _readTransaction(session, txhash) {
		var global = this.global;
		
		var ethchainreadermodule = global.getModuleObject('ethchainreader');
		
		var chainreaderinterface = ethchainreadermodule.getChainReaderInterface(session);
		
		const result = new Promise((resolve, reject) => { 
			chainreaderinterface.getTransaction(txhash,(err, res) => {
				if (err) reject(err); 
				else {
					var ethereumnodeaccessmodule = global.getModuleObject('ethereum-node-access');
					var input = res.input;
					try {
						res.input_decoded_utf8 = ethereumnodeaccessmodule.web3ToUTF8(session, input);
					}
					catch(e) {}
				
					resolve(res);
				}
			})			
			.then(res => {
				// fixing missing callback calls when data == null
				// because of error read property of null in Transaction._createTransactionObject
				if (res)
					return res;
				else
					throw new Error('no transaction found with hash ' + txhash);
			})
			.catch(err => {
				reject(err);
			});
		});
		
		return result;
	}


	async getSchemeEthereumTransaction(sessionuuid, walletuuid, schemeuuid, txhash) {
		if (!sessionuuid)
			return Promise.reject('session uuid is undefined');
		
		if (!walletuuid)
			return Promise.reject('wallet uuid is undefined');

		if (!schemeuuid)
			return Promise.reject('scheme uuid is undefined');
		
		var global = this.global;
		var _apicontrollers = this._getClientAPI();

		var session = await _apicontrollers.getSessionObject(sessionuuid);
		
		if (!session)
			return Promise.reject('could not find session ' + sessionuuid);
		
		var wallet = await _apicontrollers.getWalletFromUUID(session, walletuuid);
		
		if (!wallet)
			return Promise.reject('could not find wallet ' + walletuuid);
	
		var	scheme = await _apicontrollers.getSchemeFromUUID(session, schemeuuid)
		.catch(err => {});

		if (!scheme)
			return Promise.reject('could not find scheme ' + schemeuuid);

		var childsession = await this._getMonitoredSchemeSession(session, wallet, scheme);

		// TODO: uncomment for version >= 0.30.8
		//var ethereumtransaction = await _apicontrollers.getEthereumTransaction(childsession, txhash);
		var ethereumtransaction = await this._getEthereumTransaction(childsession, txhash);
		
		ethereumtransaction._ethtx = await this._readTransaction(childsession, txhash);
		//ethereumtransaction._ethtx = await apicontrollers.readTransaction(childsession, txhash);

		return ethereumtransaction;
	}

	async getSchemeEthereumTransactionReceipt(sessionuuid, walletuuid, schemeuuid, txhash) {
		if (!sessionuuid)
			return Promise.reject('session uuid is undefined');
		
		if (!walletuuid)
			return Promise.reject('wallet uuid is undefined');

		if (!schemeuuid)
			return Promise.reject('scheme uuid is undefined');
		
		var global = this.global;
		var _apicontrollers = this._getClientAPI();

		var session = await _apicontrollers.getSessionObject(sessionuuid);
		
		if (!session)
			return Promise.reject('could not find session ' + sessionuuid);
		
		var wallet = await _apicontrollers.getWalletFromUUID(session, walletuuid);
		
		if (!wallet)
			return Promise.reject('could not find wallet ' + walletuuid);
	
		var	scheme = await _apicontrollers.getSchemeFromUUID(session, schemeuuid)
		.catch(err => {});

		if (!scheme)
			return Promise.reject('could not find scheme ' + schemeuuid);

		var childsession = await this._getMonitoredSchemeSession(session, wallet, scheme);

		return _apicontrollers.getEthereumTransactionReceipt(childsession, txhash);
	}

	async getSchemeERC20TokenInfo(sessionuuid, walletuuid, schemeuuid, tokenaddress) {
		if (!sessionuuid)
			return Promise.reject('session uuid is undefined');
		
		if (!walletuuid)
			return Promise.reject('wallet uuid is undefined');

		if (!schemeuuid)
			return Promise.reject('scheme uuid is undefined');
		
		var global = this.global;
		var _apicontrollers = this._getClientAPI();

		var session = await _apicontrollers.getSessionObject(sessionuuid);
		
		if (!session)
			return Promise.reject('could not find session ' + sessionuuid);
		
		var wallet = await _apicontrollers.getWalletFromUUID(session, walletuuid);
		
		if (!wallet)
			return Promise.reject('could not find wallet ' + walletuuid);
	
		var	scheme = await _apicontrollers.getSchemeFromUUID(session, schemeuuid)
		.catch(err => {});

		if (!scheme)
			return Promise.reject('could not find scheme ' + schemeuuid);

		var childsession = await this._getMonitoredSchemeSession(session, wallet, scheme);

		// get erc20 token contract
		var erc20token_contract = await _apicontrollers.importERC20Token(childsession, tokenaddress);

		var token = {address: tokenaddress};

		token.name = await erc20token_contract.getChainName();
		token.symbol = await erc20token_contract.getChainSymbol();
		token.decimals = await erc20token_contract.getChainDecimals();

		return token;
	}

	//
	// Currencies functions
	//
	async _createDecimalAmountFromTokenAmount(session, amount, decimals) {
		// we are using an enriched version of DecimalAmount (2022.10.30)
		// because several operations (e.g. substraction) are missing in the DecimalAmmount of currencies moudle
		// TODO: redirect to currencies when DecimalAmount has been upgrade
		var global = this.global;
		var DecimalAmountClass = global.getModuleClass('mvc-myquote', 'DecimalAmount');
		var amount_str = '';

		if (typeof amount === 'string' || amount instanceof String) {
			// whole part
			if (amount.length > decimals)
				amount_str += amount.substring(0, amount.length  - decimals);
			else 
				amount_str = '0';

			amount_str += '.';

			// decimal part
			amount_str += amount.substring(amount.length - decimals, amount.length);

		}
		else {
			amount_str = await DecimalAmountClass._stringifyAmount(session, amount, decimals);
		}

		return DecimalAmountClass.create(session, amount_str, decimals);
		
		/*var mvcpwa = this._getMvcPWAObject();

		return mvcpwa._createDecimalAmount(session, amount, decimals);*/
	}

	async _getCurrencyAmount(session, currency, amount) {
		// we are using an enriched version of DecimalAmount & CurrencyAmount (2022.10.30)
		var global = this.global;

		var CurrencyAmountClass = global.getModuleClass('mvc-myquote', 'CurrencyAmount');

		var currency_amount = await CurrencyAmountClass.create(session, currency, amount);

		return currency_amount;
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

		var connection_context = cardsession.getSessionVariable('remote_connection');

		if (!connection_context) {
			// first time we go through here for this session
			connection_context = {connection};
			cardsession.setSessionVariable('remote_connection', connection_context);

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
		}


		// we check ethereum_node_access_instance is still connected
		var ethereum_node_access_instance = await _apicontrollers.getEthereumNodeAccessInstance(cardsession);

		if (ethereum_node_access_instance.MYDEED)
			return cardsession; // everything is ok

		if (!connection_context.ethereum_node_access_instance) {
			// we overload access
			connection_context.ethereum_node_access_instance = ethereum_node_access_instance;

			ethereum_node_access_instance.MYDEED = this.current_version;

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
		}
		else {
			// replace the new access instance with the overloaded one
			cardsession.ethereum_node_access_instance = ethereum_node_access_instance;
		}


		// we overload CARD._getSessionAccountObject to allow direct use of mvccurrencies API
		// (very bad but waiting for future versions of Wallet module)
		const CardClass = global.getModuleClass('wallet', 'Card');

		if (CardClass && !CardClass.prototype._org_getSessionAccountObject) {
			// first time we go through here for this execution of the webapp

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

 		var _privatekey = await this.getCardPrivateKey(sessionuuid, walletuuid, cardinfo.uuid);

		if (_privatekey)
		return cardinfo;
	}

	// minter
	async _getMonitoredERC721TokenSession(session, wallet, currency) {
		var global = this.global;
		var _apicontrollers = this._getClientAPI();
		var mvcpwa = this._getMvcPWAObject();
		
		var currencyscheme = await mvcpwa._getCurrencyScheme(session, currency);
		var childsession = await mvcpwa._getMonitoredSchemeSession(session, wallet, currencyscheme);

		if (currencyscheme.isRemote() === true) {
			// remote (or at least for authkey, we could check that ehtnodeserver is indeed remote)
			var ethnodemodule = global.getModuleObject('ethnode');
			var ethereumnodeaccessinstance = ethnodemodule.getEthereumNodeAccessInstance(childsession);
			// TODO: could be better to use
			// var ethereumnodeaccessinstance = _apicontrollers.getEthereumNodeAccessInstance(childsession);
	
			if (this.contract_path_root_uri && ethereumnodeaccessinstance.web3_setArtifactRootUri) {
				// we set the root uri for contracts in EthereumNodeAccess
				await ethereumnodeaccessinstance.web3_setArtifactRootUri(this.contract_path_root_uri);
			}

		}
		else {
			// local

			// TODO: remove when ethereum_core will use newer web3 version
			// than 1.0.0-beta.34 (e.g. 1.3.5)
			// overload is necessary to be able reading arrays in fetchRecords
/* 			var ethnodemodule = global.getModuleObject('ethnode');
			var EthereumNodeAccess = global.getModuleObject('ethereum-node-access');

			var ethereum_node_access_instance = ethnodemodule.getEthereumNodeAccessInstance(childsession);
			var web3providerurl = ethnodemodule.getWeb3ProviderUrl(childsession);

			var web3_upgraded = childsession.getSessionVariable('ERC721_WEB3_UPGRADED', true);

			if (web3_upgraded !== true) {
				const Web3 = require("web3");
	
				var web3Provider = EthereumNodeAccess.getWeb3Provider(childsession, web3providerurl);
					  
				var web3instance = new Web3(web3Provider);
				web3instance.OVERLOADED_BY_MYDEED = true;
				
				await ethereum_node_access_instance.web3_setProviderUrl(web3providerurl);
				ethereum_node_access_instance.web3instance = web3instance; // overload
				ethereum_node_access_instance.OVERLOADED_BY_MYDEED = true;
		
				// put in session map for this url
				var web3ProviderObject = ethnodemodule.createWeb3ProviderObject(childsession, web3providerurl, ethereum_node_access_instance)
				ethnodemodule.putWeb3ProviderObject(childsession, web3ProviderObject)
				//childsession.web3instancemap[web3providerurl] = web3instance;
	
				childsession.ERC721TOKEN = true;
				childsession.setSessionVariable('ERC721_WEB3_UPGRADED', true);	
			} */
			// END Remove
		}


	
		return childsession;
	}

	async _createERC721TokenObject(session, currency, data) {
		// for local contract objects (before deployment)
		var global = this.global;
		var mvcerc721module = global.getModuleObject('mvc-erc721');

		var erc721token = await mvcerc721module.createERC721TokenObject(session, currency, data);

		return erc721token;
	}

	async _getAddressLockerContent(session, wallet, currency, card_address) {
		var global = this.global;
		var _apicontrollers = this._getClientAPI();

		// get proper session to access erc21token for currency
		var childsession = await this._getMonitoredERC721TokenSession(session, wallet, currency);

		var mvcerc721module = global.getModuleObject('mvc-erc721');

		return mvcerc721module.getLockerContent(childsession, currency, card_address);
	}

	async _fetchDeedMinterFromAddress(session, wallet, currency, minteraddress) {
		// for contract objects already deployed

		if (!minteraddress)
		return Promise.reject('can only instantiate minters already on the chain');

		var global = this.global;

		// get proper session to access erc721token for currency
		var childsession = await this._getMonitoredERC721TokenSession(session, wallet, currency);

		// we read the token elements
		var minter = {address: minteraddress};

		// create contract object (already deployed)
		var data = Object.create(null);
		data['address'] = minteraddress;

		var mvcerc721module = global.getModuleObject('mvc-erc721');

		var erc721token = await mvcerc721module.createERC721TokenObject(childsession, currency, data);

		var basetokenuri = await erc721token.getChainTokenURI(0);
		var name = await erc721token.getChainName();
		var symbol = await erc721token.getChainSymbol();

		minter.name = name;
		minter.symbol = symbol;
		minter.basetokenuri = basetokenuri;

		minter.currencyuuid = currency.uuid;
		minter.address = minteraddress;

		return minter;
	}

	async fetchDeedMinterFromAddress(sessionuuid, walletuuid, currencyuuid, minteraddress) {
		if (!sessionuuid)
			return Promise.reject('session uuid is undefined');
		
/* 		if (!walletuuid)
			return Promise.reject('wallet uuid is undefined');
*/	
		if (!currencyuuid)
			return Promise.reject('currency uuid is undefined');
		
		
		var global = this.global;
		var _apicontrollers = this._getClientAPI();
		var mvcpwa = this._getMvcPWAObject();

		var session = await _apicontrollers.getSessionObject(sessionuuid);
		
		if (!session)
			return Promise.reject('could not find session ' + sessionuuid);
		
		var wallet = await _apicontrollers.getWalletFromUUID(session, walletuuid).catch(err => {});
		
/* 		if (!wallet)
			return Promise.reject('could not find wallet ' + walletuuid);
*/
 		var currency = await mvcpwa.getCurrencyFromUUID(sessionuuid, currencyuuid);

		if (!currency)
			return Promise.reject('could not find currency ' + currencyuuid);
	

		// we read the contract elements
		var minter = await this._fetchDeedMinterFromAddress(session, wallet, currency, minteraddress);

		return minter;
	}

	async fetchDeedMinterFromOwner(sessionuuid, walletuuid, currencyuuid, owneraddress) {
		if (!sessionuuid)
			return Promise.reject('session uuid is undefined');
		
/* 		if (!walletuuid)
			return Promise.reject('wallet uuid is undefined');
*/		
 		if (!currencyuuid)
			return Promise.reject('currency uuid is undefined');
		
		
		var global = this.global;
		var _apicontrollers = this._getClientAPI();
		var mvcpwa = this._getMvcPWAObject();

		var session = await _apicontrollers.getSessionObject(sessionuuid);
		
		if (!session)
			return Promise.reject('could not find session ' + sessionuuid);
		
		var wallet = await _apicontrollers.getWalletFromUUID(session, walletuuid).catch(err => {});
		
/* 		if (!wallet)
			return Promise.reject('could not find wallet ' + walletuuid);
*/
		var currency = await mvcpwa.getCurrencyFromUUID(sessionuuid, currencyuuid);

		if (!currency)
			return Promise.reject('could not find currency ' + currencyuuid);
	
		var minteraddress = await this._getAddressLockerContent(session, wallet, currency, owneraddress);

		// we read the contract elements
		var minter = await this._fetchDeedMinterFromAddress(session, wallet, currency, minteraddress);

		return minter;
	}

	async fetchDeedMinter(sessionuuid, walletuuid, currencyuuid, carduuid) {
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
	
		var card_address = card.getAddress();
		var erc721tokenaddress = await this._getAddressLockerContent(session, wallet, currency, card_address);

		if (!erc721tokenaddress)
			return; // no minter

		// we read the contract elements
		var minter = await this._fetchDeedMinterFromAddress(session, wallet, currency, erc721tokenaddress);

		// add currency uuid
		minter.currencyuuid = currencyuuid;
		
		// add card info
		minter.card_uuid = carduuid;
		minter.card_address = card_address;

		return minter;
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


	// deeds
	async readDeeds(sessionuuid, walletuuid) {
		if (!sessionuuid)
			return Promise.reject('session uuid is undefined');
		
		var global = this.global;
		var _apicontrollers = this._getClientAPI();
		var mvcpwa = this._getMvcPWAObject();

		var session = await _apicontrollers.getSessionObject(sessionuuid);
		
		if (!session)
			return Promise.reject('could not find session ' + sessionuuid);

		if (!walletuuid) {
			var keys = ['myquote', 'deeds']; 
			// shared keys
		}
		else {
			console.log('WARNING: walletuuid specific case not implemented!!!');
			var keys = ['myquote', 'deeds']; 
			// shared keys, also we could look in wallet
			// with mvcmodule.getFromWallet
		}
	
		let deed_list = await mvcpwa._readClientSideJson(session, keys);

		if (!deed_list)
		deed_list = [];

		return deed_list;
	}

	async fetchDeeds(sessionuuid, walletuuid, currencyuuid, minter) {
		if (!sessionuuid)
			return Promise.reject('session uuid is undefined');
		
/* 		if (!walletuuid)
			return Promise.reject('wallet uuid is undefined'); */
		
		if (!currencyuuid)
			return Promise.reject('currency uuid is undefined');
		
		
		var global = this.global;
		var _apicontrollers = this._getClientAPI();
		var mvcpwa = this._getMvcPWAObject();

		var session = await _apicontrollers.getSessionObject(sessionuuid);
		
		if (!session)
			return Promise.reject('could not find session ' + sessionuuid);
		
		var wallet = await _apicontrollers.getWalletFromUUID(session, walletuuid).catch(err => {});
		
/* 		if (!wallet)
			return Promise.reject('could not find wallet ' + walletuuid); */
	
		var currency = await mvcpwa.getCurrencyFromUUID(sessionuuid, currencyuuid);

		if (!currency)
			return Promise.reject('could not find currency ' + currencyuuid);
	
		/*var card =  await this._getCurrencyCard(session, wallet, currency);

		 if (!card)
			return Promise.reject('could not find currency card for wallet ' + walletuuid); */

		// get proper session to access erc21token for currency
		var childsession = await this._getMonitoredERC721TokenSession(session, wallet, currency);
	
		// get contract
		var erc721token = await this._getERC721TokenObject(childsession, currency, minter);

		// list of deeds
		var deeds = [];

		// get totalsupply to get list of tokenids
		const totalsupply = await erc721token.getTotalSupply();

		for (var i = 0; i < totalsupply; i++) {
			var deed =  await this._fetchDeedInfo(currency, erc721token, i);

			deeds.push(deed);
		}

		return deeds;
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



	async saveDeed(sessionuuid, walletuuid, deed) {
		var global = this.global;
		var _apicontrollers = this._getClientAPI();
		var mvcpwa = this._getMvcPWAObject();

		var deed_list = await this.readDeeds(sessionuuid, walletuuid);

		// look not in list
		var bInList = false;

		for (var i = 0; i < deed_list.length; i++) {
			if (deed_list[i].txhash == deed.txhash) {
				bInList = true;
				break;
			}
		}

		if (!bInList) {
			var session = await _apicontrollers.getSessionObject(sessionuuid);
		
			if (!session)
				return Promise.reject('could not find session ' + sessionuuid);

			// deed parameters to be saved
			var txhash = deed.txhash;
			var currencyuuid = deed.currencyuuid;
			var minter = deed.minter;
			var tokenid = deed.tokenid;
			var time = (deed.metadata ? deed.metadata.time : null);
			var title = (deed.metadata ? deed.metadata.title : null);
	
			if (!walletuuid) {
				var keys = ['myquote', 'deeds']; 
				// shared keys
			}
			else {
				console.log('WARNING: walletuuid specific case not implemented!!!');
				var keys = ['myquote', 'deeds']; 
				// shared keys, also we could put in wallet
				// with mvcmodule.putInWallet			
			}
		
			var localjson = {txhash, time, currencyuuid, minter, tokenid, title};

			localjson.savetime = Date.now();

			deed_list.push(localjson);
	
			return mvcpwa._saveClientSideJson(session, keys, deed_list);
		}
		else {
			return deed_list;
		}
	}

	async _fetchDeedInfo(currency, erc721token, tokenid) {
		// fetch deed info
		var deed = {type: 'deed', tokenid};

		deed.currencyuuid = currency.uuid;

		deed.minter = erc721token.getAddress();
		deed.txhash = 'dd-' + deed.minter + '-' + tokenid;

		deed.tokenuri = await erc721token.getChainTokenURI(tokenid);
		deed.owner = await erc721token.ownerOf(tokenid);
		deed.approved = await erc721token.getApproved(tokenid);

		// fetch records and fill metadata and articles
		deed.metadata = {};
		deed.articles = [];
		deed.clauses = [];

		var stringrecords = await erc721token.fetchRecords(tokenid)
		.catch(err => {
			console.log('error in fetchRecords: ' + err);
		});

		for (var i = 0; i < stringrecords.length; i++) {
			try {
				var clause = JSON.parse(stringrecords[i]);

				clause.type = 'clause';

				clause.currencyuuid = deed.currencyuuid;
				clause.txhash = deed.txhash + '-' + i;

				clause.minter = deed.minter;
				clause.tokenid = tokenid;
				clause.index = i;


				switch(clause.subtype) {
					case 'metadata':
						// overload
						Object.assign(deed.metadata, clause);
						break;
					case 'article':
						// addition
						deed.articles.push(clause);
						break;
					default:
						break;
				}

				deed.clauses.push(clause);
			}
			catch(e) {
				console.log('string record is mal-formed: ' + stringrecords[i]);
			}
		}

		return deed;
	}

	async fetchDeed(sessionuuid, walletuuid, currencyuuid, minter, tokenid) {
		if (!sessionuuid)
			return Promise.reject('session uuid is undefined');
		
/* 		if (!walletuuid)
			return Promise.reject('wallet uuid is undefined'); */
		
		if (!currencyuuid)
			return Promise.reject('currency uuid is undefined');
		
		
		var global = this.global;
		var _apicontrollers = this._getClientAPI();
		var mvcpwa = this._getMvcPWAObject();

		var session = await _apicontrollers.getSessionObject(sessionuuid);
		
		if (!session)
			return Promise.reject('could not find session ' + sessionuuid);
		
		var wallet = await _apicontrollers.getWalletFromUUID(session, walletuuid).catch(err => {});
		
/* 		if (!wallet)
			return Promise.reject('could not find wallet ' + walletuuid); */
	
		var currency = await mvcpwa.getCurrencyFromUUID(sessionuuid, currencyuuid);

		if (!currency)
			return Promise.reject('could not find currency ' + currencyuuid);
	
		// get proper session to access erc21token for currency
		var childsession = await this._getMonitoredERC721TokenSession(session, wallet, currency);
	
		// get contract
		var erc721token = await this._getERC721TokenObject(childsession, currency, minter);

		// fetch deed info
		var deed = await this._fetchDeedInfo(currency, erc721token, tokenid);

		// save this deed in the local list
		await this.saveDeed(sessionuuid, walletuuid, deed);

		return deed;
	}

	async fetchLastDeed(sessionuuid, walletuuid, currencyuuid, minter) {
		if (!sessionuuid)
			return Promise.reject('session uuid is undefined');
		
/* 		if (!walletuuid)
			return Promise.reject('wallet uuid is undefined'); */
		
		if (!currencyuuid)
			return Promise.reject('currency uuid is undefined');
		
		
		var global = this.global;
		var _apicontrollers = this._getClientAPI();
		var mvcpwa = this._getMvcPWAObject();

		var session = await _apicontrollers.getSessionObject(sessionuuid);
		
		if (!session)
			return Promise.reject('could not find session ' + sessionuuid);
		
		var wallet = await _apicontrollers.getWalletFromUUID(session, walletuuid).catch(err => {});
		
/* 		if (!wallet)
			return Promise.reject('could not find wallet ' + walletuuid); */
	
		var currency = await mvcpwa.getCurrencyFromUUID(sessionuuid, currencyuuid);

		if (!currency)
			return Promise.reject('could not find currency ' + currencyuuid);
	
		// get proper session to access erc21token for currency
		var childsession = await this._getMonitoredERC721TokenSession(session, wallet, currency);
	
		// get contract
		var erc721token = await this._getERC721TokenObject(childsession, currency, minter);

		// fetch totalsupply
		const totalsupply = await erc721token.getTotalSupply();
		const lasttokenid = totalsupply - 1;

		return this.fetchDeed(sessionuuid, walletuuid, currencyuuid, minter, lasttokenid);
	}

	async isCardOwningDeed(sessionuuid, walletuuid, currencyuuid, carduuid, minter, deed) {
		var owningcardinfo = await this.getDeedOwningCard(sessionuuid, walletuuid, currencyuuid, minter, deed).catch(err => {});

		if (!owningcardinfo)
			return false;

		if (owningcardinfo.uuid == carduuid)
		return true;
		else
		return false;
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

		// instantiate NftMarketplace (with the childsession!!!)
		var nftMarketplace = await this._getNftMarketplaceObject(childsession, wallet, currency);
		const nftmarketplace_version = await nftMarketplace.getVersion();

		var listing_info = {canbelisted: false, onsale: false, tokenaddress, tokenid};

		if (!nftMarketplace) {
			return listing_info;
		}
		else {
			listing_info.canbelisted = true;
		}
	
		var nft = await nftMarketplace.getNft(tokenaddress, tokenid);

		if (nft) {

			listing_info.nftIndex = nft.nftIndex;
			listing_info.onsale = (nft.listed ? true : false);
			listing_info.owner = nft.owner;
			listing_info.seller = nft.seller;

			let saleprice = nft.price;
			let saleprice_dec = await this._createDecimalAmountFromTokenAmount(session, saleprice, currency.decimals);
			let saleprice_curr = await this._getCurrencyAmount(session, currency, saleprice_dec);
	
			listing_info.saleprice = saleprice;
			listing_info.saleprice_int = await saleprice_dec.toInteger();
			listing_info.saleprice_string = await saleprice_dec.toString();

			let _options = {showdecimals: true, decimalsshown: 2};
			listing_info.saleprice_decorated_string = await this._formatMonetaryAmountString(session, listing_info.saleprice_string, currency.symbol, currency.decimals, _options);
		}

		// TEST
		var listed_nfts = await nftMarketplace.getListedNfts();

		/* for (var i = 0; i < (listed_nfts ? listed_nfts.length: 0); i++) {
			let _nft = listed_nfts[i];
			let _nft_tokenaddress = _nft[1];
			let _nft_tokenid = _nft[2];
			let areequal = childsession.areAddressesEqual(_nft_tokenaddress, tokenaddress);

			if ( _nft.listed && areequal && (_nft_tokenid == tokenid)) {
				listing_info.onsale = true;
				listing_info.saleprice = _nft.price;
				listing_info.owner = _nft.owner;
				listing_info.seller = _nft.seller;
			}
		} */
		// TEST

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

		// instantiate NftMarketplace (with the childsession!!!)
		var nftMarketplace = await this._getNftMarketplaceObject(childsession, wallet, currency);
		const nftmarketplace_version = await nftMarketplace.getVersion();

		if (!nftMarketplace)
			return Promise.reject('could not find nft market place');


		// get listing info, if it has alreadt been listed
		var listing_info = await this.getDeedSaleInfo(sessionuuid, walletuuid, currencyuuid, minter, deed);


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

		// transactions
		var ethereumnodeaccessmodule = global.getModuleObject('ethereum-node-access');
		var from_card_scheme = card.getScheme();

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
		
		var txhash;
		
		if (!listing_info.owner) {
			// first time listed on the marketplace
			txhash = await nftMarketplace.listNft(tokenaddress, tokenid, tokenamount_string, currency.address, ethereumtransaction);
		}
		else {
			txhash = await nftMarketplace.resellNft(listing_info.nftIndex, tokenamount_string, ethereumtransaction);
		}

		return txhash;
	}
	
	async buyDeed(sessionuuid, walletuuid, carduuid, minter, deed, currencyuuid, amount, feelevel) {
		if (!sessionuuid)
			return Promise.reject('session uuid is undefined');
	
		if (!walletuuid)
			return Promise.reject('wallet uuid is undefined');
		
		if (!carduuid)
			return Promise.reject('card uuid is undefined');

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
		
		
		var card = await wallet.getCardFromUUID(carduuid);

		if (!card)
			return Promise.reject('could not find a card for currency ' + currencyuuid);
		
		
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
	
		// instantiate NftMarketplace (with the childsession!!!)
		var nftMarketplace = await this._getNftMarketplaceObject(childsession, wallet, currency);
		const nftmarketplace_version = await nftMarketplace.getVersion();

		if (!nftMarketplace)
			return Promise.reject('could not find nft market place');


		var from_card_scheme = card.getScheme();


		// for payments in currency, before sending buyNft transaction
		// we must approve the mark for listing_info.price amount in tokens
		var nftmarketplace_address = nftMarketplace.getAddress();

		// get token object to access erc20 data
		var erc20currencytokenobject = await from_card_scheme.getTokenObject(currency.address);

		// initialize
		erc20currencytokenobject._getERC20TokenContract(childsession);

		// synchronize
		const Token = global.getModuleClass('wallet', 'Token');
		await Token.synchronizeERC20TokenContract(childsession, erc20currencytokenobject);

		// erc20 contract
		var erc20contract = erc20currencytokenobject._getERC20TokenContract(childsession);

		var alloweeaccount = childsession.createBlankAccountObject();
		alloweeaccount.setAddress(nftmarketplace_address);
		var payingaccount = card._getAccountObject();

		// pass string to avoid BigNumber error
		var saleprice = listing_info.saleprice;
		var saleprice_dec = await this._createDecimalAmountFromTokenAmount(session, saleprice, currency.decimals);
		var saleprice_int = await saleprice_dec.toInteger();

		var balance = await erc20contract.balanceOf(payingaccount);
		var balance_dec = await this._createDecimalAmountFromTokenAmount(session, balance, currency.decimals);
		var balance_int = await saleprice_dec.toInteger();

		if (amount < saleprice_int)
			return Promise.reject('no authorization on ' + card.address + ' to spend more than ' + amount + ' while sale price is ' + saleprice);

		if (balance_int < saleprice_int)
			return Promise.reject('not enough funds on ' + card.address + ' to spend ' + saleprice);


		var allowance = await erc20contract.allowance(payingaccount, alloweeaccount);
		var allowance_dec = await this._createDecimalAmountFromTokenAmount(session, allowance, currency.decimals);
		var allowance_int = await allowance_dec.toInteger();

		if (saleprice_int > allowance_int) {
			// go through approve call
			// TODO: use specific feelevel
			let fee = await _apicontrollers.createSchemeFee(from_card_scheme, feelevel);

			let gas = fee.gaslimit;
			let gasPrice = fee.gasPrice;

			let _allowance = saleprice.toString();
			let _txhash = await erc20contract.approve(alloweeaccount, _allowance, payingaccount, gas, gasPrice);

			if (!_txhash)
			return Promise.reject('could not approve marketplace contract as spender for token ' + card.address);
		}		
	
		// create ethereum transaction
		var ethereumnodeaccessmodule = global.getModuleObject('ethereum-node-access');

		var ethereumtransaction = ethereumnodeaccessmodule.getEthereumTransactionObject(childsession, fromaccount);
		
		// create fee
		var fee = await _apicontrollers.createSchemeFee(from_card_scheme, feelevel);

		ethereumtransaction.setGas(fee.gaslimit);
		ethereumtransaction.setGasPrice(fee.gasPrice);

		var nft = await nftMarketplace.getNft(tokenaddress, tokenid);

		if (!nft)
			return Promise.reject('could not find nft ' + tokenaddress + ' - ' + tokenid + ' on the marketplace');

		var nftIndex = nft.nftIndex;
		var txhash = await nftMarketplace.buyNft(nftIndex, ethereumtransaction);

		return txhash;
	

	}


	//
	// utils
	//

	async formatTokenAmountAsync(sessionuuid, amount, token, options) {
/* 		var global = this.global;
		var mvcclientwalletmodule = global.getModuleObject('mvc-client-wallet');
		return mvcclientwalletmodule.formatTokenAmount(amount, token, options); */

		if (!amount)
		return;

		if (!sessionuuid)
			return Promise.reject('session uuid is undefined');
	
		var global = this.global;
		var _apicontrollers = this._getClientAPI();

		var session = await _apicontrollers.getSessionObject(sessionuuid);
	
		if (!session)
			return Promise.reject('could not find session ' + sessionuuid);
		
		var decimals = token.decimals;
		var symbol = token.symbol;
		
		var tokenamountdec = await this._createDecimalAmountFromTokenAmount(session, amount, decimals);
		var tokenamountstring = await tokenamountdec.toString();

		var currencyamountstring = await this._formatMonetaryAmountString(session, tokenamountstring, symbol, decimals, options);

		return currencyamountstring;
	}


	async _fitAmountString(session, amount_string, decimals, options) {
		if (amount_string === undefined)
			return;
		
		var _inputamountstring = amount_string;
		var amountstring;

		if (_inputamountstring.includes(".")) {
			const parts = _inputamountstring.split('.');

			// integer part
			var integerpart = parts[0];
			var decimalpart;

			if (parts[1].length > decimals)
				decimalpart = parts[1].substring(decimals); // cut
			else {
				decimalpart = parts[1]; // fill if necessary
				for (var i = 0; i < (decimals -parts[1].length) ; i++) decimalpart += '0';
			}

			amountstring = integerpart + '.' + decimalpart;
		}
		else {
			if (_inputamountstring.length > decimals) {
				// integer part
				var integerpart = _inputamountstring.substring(0, _inputamountstring.length - decimals);
				var decimalpart = _inputamountstring.substring(_inputamountstring.length - decimals);
	
				amountstring = integerpart + '.' + decimalpart;
			}
			else {
				var leading = '';
				for (var i = 0; i < (decimals -_inputamountstring.length) ; i++) leading += '0';
				amountstring = '0.' + leading + _inputamountstring;
			}
		}
		


		if (options) {
			if (typeof options.showdecimals !== 'undefined') {
				if (options.showdecimals === false) {
					// we remove . and after
					amountstring = amountstring.substring(0, amountstring.indexOf('.'));
				}
				else {
					var decimalsshown = (options.decimalsshown ? options.decimalsshown : decimals);
					amountstring = amountstring.substring(0, amountstring.indexOf('.') + 1 + decimalsshown);
				}

			}
		}

		return amountstring;
	}
	

	async _formatMonetaryAmountString(session, amount_string, symbol, decimals, options) {
		var amountstring = await this._fitAmountString(session, amount_string, decimals, options);
		
		return amountstring + ' ' + symbol;
	}

	async _formatCurrencyIntAmount(sessionuuid, currencyuuid, amount_int, options) {
		// because of issues with double points when formatting  
		// with mvccurrencies formatCurrencyAmount (e.g. 0.30.10) from integer

		if (!sessionuuid)
			return Promise.reject('session uuid is undefined');
	
		if (!currencyuuid)
			return Promise.reject('currency uuid is undefined');
		
	
		
		var global = this.global;
		var _apicontrollers = this._getClientAPI();
		var mvcpwa = this._getMvcPWAObject();

		var session = await _apicontrollers.getSessionObject(sessionuuid);
		
		if (!session)
			return Promise.reject('could not find session ' + sessionuuid);
		
		var currency = await mvcpwa.getCurrencyFromUUID(sessionuuid, currencyuuid);

		if (!currency)
			return Promise.reject('could not find currency ' + currencyuuid);

		var currency_amount = await this._getCurrencyAmount(session, currency, amount_int);
		var tokenamountstring = await currency_amount.toString();

		//var currency_amount_string = await mvcpwa.formatCurrencyAmount(sessionuuid, currency.uuid, currency_amount, options);
		var _options = (options ? options : {showdecimals: true, decimalsshown: 2});
		
		var tokenamountstring = await currency_amount.toString(); 
		// !!! faulty because of _formatAmount (see above)
		
		var currencyamountstring = await this._formatMonetaryAmountString(session, tokenamountstring, currency.symbol, currency.decimals, _options);


		return currencyamountstring;
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
