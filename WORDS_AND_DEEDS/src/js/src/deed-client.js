console.log('loading deed-client.js');


class DeedClient {
	constructor() {
		this.name = 'deedclient';

		this.global = null; // put by global on registration
		this.isready = false;
		this.isloading = false;

		this.globalscope = window;

		this.mvcmypwa = null;

		this.walletconnect_client = null;
	}

	getMvcMyPWAObject() {
		if (this.mvcmypwa)
			return this.mvcmypwa;

		this.mvcmypwa = this.global.getModuleObject('mvc-myquote');

		return this.mvcmypwa;
	}

	async init() {

		try {
			var _globalscope = this.globalscope;

			var clientglobal = _globalscope.simplestore.Global.getGlobalObject();
			
			// register this module
			clientglobal.registerModuleObject(this);


			// init wallet connect client
			const WalletConnectClient = require('./walletconnect/walletconnect-client.js').default;
			this.walletconnect_client = WalletConnectClient.getObject();

			await this.walletconnect_client.init(clientglobal);
	
		}
		catch(e) {
			console.log('exception in DeedClient.init: ' + e);
		}	

	}

	// compulsory  module functions
	loadModule(parentscriptloader, callback) {
		console.log('loadModule called for module ' + this.name);
		
		if (this.isloading)
			return;
			
		this.isloading = true;

		var self = this;

		var modulescriptloader = parentscriptloader.getChildLoader('deedclientmoduleloader');

		modulescriptloader.load_scripts(function() { 
			//self.init(); // init is called by index.js
			if (callback) callback(null, self); 
		});

		return modulescriptloader;	
	}
	
	isReady() {
		return this.isready;
	}

	hasLoadStarted() {
		return this.isloading;
	}

	// optional  module functions
	registerHooks() {
		console.log('module registerHooks called for ' + this.name);
		
		var global = this.global;
		
		global.registerHook('getDataObjectFromComposedHash_asynchook', this.name, this.getDataObjectFromComposedHash_asynchook);
		global.registerHook('getDataObjectFromCurrencyTransaction_asynchook', this.name, this.getDataObjectFromCurrencyTransaction_asynchook);
		global.registerHook('getDataObjectFromCard_asynchook', this.name, this.getDataObjectFromCard_asynchook);
	}
	
	postRegisterModule() {
		console.log('postRegisterModule called for ' + this.name);
		if (!this.isloading) {
			var global = this.global;
			var self = this;
			var rootscriptloader = global.getRootScriptLoader();
			
			this.loadModule(rootscriptloader, () => {
				if (this.registerHooks)
				this.registerHooks();
			});
		}
	}

	// hooks
	async getDataObjectFromComposedHash_asynchook(result, params) {
		console.log('getDataObjectFromComposedHash_asynchook called for ' + this.name);

		try {
			let mvcmypwa = this.getMvcMyPWAObject();
			
			let rootsessionuuid = params[0];
			let walletuuid = params[1];
			let txhash = params[2];
			let currencyuuid = params[3];
	
			let dataobject;
			let arr = (txhash ? txhash.split('-') : []);
	
			let stub = arr[0];
	
			if (stub == 'dd') {
				let minteraddress = arr[1];
				let tokenid = arr[2];
	
				let deed;

				if (currencyuuid) {

					let minter = await mvcmypwa.fetchDeedMinterFromAddress(rootsessionuuid, walletuuid, currencyuuid, minteraddress);
		
					if (!minter)
						return Promise.reject('could not find minter linked to address ' + minteraddress);
		
					deed = await mvcmypwa.fetchDeed(rootsessionuuid, walletuuid, currencyuuid, minter, tokenid)
					.catch(err => {
						console.log('error in DeedClient._getDeedDataObjectFromMinter:' + err);
					});
				}
				else {
					return Promise.reject('currency is missing');
				}		
	
				if (arr.length < 4) {
					dataobject = deed;
				}
				else {
					let index = arr[3];
	
					if (deed.clauses && (deed.clauses.length >= index)) {
						let clause = deed.clauses[index];
	
						dataobject = clause;
					}
					else {
						// we could not make sense of this hash, stick to the deed
						dataobject = deed;
					}
				}
			}
			else {
				return Promise.reject('do not recognize transaction hash stub: ' + stub);
			}

			result.dataobject = dataobject;
			result.push({module: this.name, handled: true});
		}
		catch(e) {
			console.log('exception in DeedClient.getDataObjectFromComposedHash_asynchook: ' + e);
		}	

	}
	
	async getDataObjectFromCurrencyTransaction_asynchook(result, params) {
		console.log('getDataObjectFromCurrencyTransaction_asynchook called for ' + this.name);

		try {
			result.push({module: this.name, handled: true});
		}
		catch(e) {
			console.log('exception in DeedClient.getDataObjectFromCurrencyTransaction_asynchook: ' + e);
		}

	}
	
	async getDataObjectFromCard_asynchook(result, params) {
		console.log('getDataObjectFromCard_asynchook called for ' + this.name);

		try {
			let mvcmypwa = this.getMvcMyPWAObject();

			let rootsessionuuid = params[0];
			let walletuuid = params[1];
			let currencyuuid = params[2];
			let cardaddress = params[3];
			let tokenid = params[4];

			let minter = await mvcmypwa.fetchDeedMinterFromOwner(rootsessionuuid, walletuuid, currencyuuid, cardaddress);

			if (!minter)
				return Promise.reject('could not find minter linked to address ' + cardaddress);

			var dataobject = await mvcmypwa.fetchDeed(rootsessionuuid, walletuuid, currencyuuid, minter, tokenid)
			.catch(err => {
				console.log('error in DeedClient._getDataObjectFromCard:' + err);
			});

			result.dataobject = dataobject;
			result.push({module: this.name, handled: true});
		}
		catch(e) {
			console.log('exception in DeedClient.getDataObjectFromCurrencyTransaction_asynchook: ' + e);
		}

	}

	async _getDeedDataObjectFromMinter(sessionuuid, walletuuid, currencyuuid, minteraddress, tokenid) {
		let mvcmypwa = this.getMvcMyPWAObject();

		if (currencyuuid) {

			let minter = await mvcmypwa.fetchDeedMinterFromAddress(sessionuuid, walletuuid, currencyuuid, minteraddress);

			if (!minter)
				return Promise.reject('could not find minter linked to address ' + minteraddress);

			var dataobject = await mvcmypwa.fetchDeed(sessionuuid, walletuuid, currencyuuid, minter, tokenid)
			.catch(err => {
				console.log('error in DeedClient._getDeedDataObjectFromMinter:' + err);
			});

			return dataobject;
		}		
	}

	// wallet connect
	getWalletConnectClient() {
		return this.walletconnect_client;
	}

	// actions
	async connectToWallet() {
		let mvcmypwa = this.getMvcMyPWAObject();

		let res = await new Promise((resolve, reject) => {
			mvcmypwa.signalEvent('on_walletconnect_connect', {
				callback: (err,res) => {if (res) resolve(res); else reject(err);}
			});
		});

		return res;
	}

	async disconnectFromWallet() {
		let mvcmypwa = this.getMvcMyPWAObject();

		let res = await new Promise((resolve, reject) => {
			mvcmypwa.signalEvent('on_walletconnect_disconnect', {
				callback: (err,res) => {if (res) resolve(res); else reject(err);}
			});
		});

		return res;
	}
		
	

	// static
	static getObject() {
		if (DeedClient.webclient)
			return DeedClient.webclient;
		
		DeedClient.webclient = new DeedClient();

		return DeedClient.webclient;
	}

}

// Note: webpack does not handle well import on module.exports
export default DeedClient;
