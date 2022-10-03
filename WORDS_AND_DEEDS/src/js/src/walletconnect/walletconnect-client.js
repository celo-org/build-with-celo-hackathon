import WalletConnectProvider from '@walletconnect/web3-provider';

class WalletConnectClient {
	constructor() {
		this.global = null;
		this.mvcmypwa = null;

		this.uuid = null;

		this.rpc = null;
		this.provider = null;
		this.account = null;
	}

	getMvcMyPWAObject() {
		if (this.mvcmypwa)
			return this.mvcmypwa;

		this.mvcmypwa = this.global.getModuleObject('mvc-myquote');

		return this.mvcmypwa;
	}

	getClientAPI() {
		var global = this.global;

		var clientmodules =  global.getModuleObject('clientmodules');
		
		this.clientcontrollers = clientmodules.getControllersObject();
		
		return this.clientcontrollers;
	}

	async init(global) {

		try {
			// get session object and a uuid for our client
			this.global = global;

			var clientapicontrollers = this.getClientAPI();

			var session = clientapicontrollers.getCurrentSessionObject();
			this.uuid = session.guid();
			
			// listen to wallet connect events
			let mvcmypwa = this.getMvcMyPWAObject();

			mvcmypwa.registerEventListener('on_walletconnect_connect', null, this.onConnect.bind(this));
			mvcmypwa.registerEventListener('on_walletconnect_disconnect', null, this.onDisconnect.bind(this));
	
			mvcmypwa.registerEventListener('on_walletconnect_connected', null, this.onWalletConnected.bind(this));
			mvcmypwa.registerEventListener('on_walletconnect_disconnected', null, this.onWalletDisconnected.bind(this));
			mvcmypwa.registerEventListener('on_walletconnect_status_requested', null, this.onWalletConnectionStatusRequested.bind(this));
	
			// remove any traces of a previous session to restart on a clean slate
			await this.disconnect();
	
		}
		catch(e) {
			console.log('exception in WalletConnectClient.init: ' + e);
		}	

	}

	// called by other components like WalletConnectWidget
	async onConnect(eventname, params) {
		console.log('WalletConnectWidget.onConnect called');

		if (params.emitter == this.uuid)
			return; // sent by us

		await this.connect(params.rpc);

		let ret = {provider: this.provider, account: this.account};

		if (params && params.callback) {
			params.callback(null, ret);
		}

		return ret;
	}

	async onDisconnect(eventname, params) {
		console.log('WalletConnectWidget.onDisconnect called');

		if (params.emitter == this.uuid)
			return; // sent by us

		await this.disconnect(params.rpc);

		let ret = {disconnected: true};

		if (params && params.callback) {
			params.callback(null, ret);
		}

		return ret;
	}
	

	// actions
	async connect(rpc) {
		try {
			this.rpc = rpc;

			const provider = new WalletConnectProvider({
				rpc: this.rpc,
			});
			let account = null;
		
			// handshake
			let res = await provider.enable();

			if (provider.connected) {
				account = provider.accounts[0];

				// Suscribe to account changed
				provider.on("accountsChanged", (accounts) => {
					this.onAccountsChanged(accounts);
				});
	
				// Subscribe to chainId change
				provider.on("chainChanged", (chainId) => {
					this.onChainIdChanged(chainId);
				});
				
				// Subscribe to session disconnection
				provider.on("disconnect", (code, reason) => {
					this.onDisconnected(code, reason);
				});
			}
			else {
				this.app.alert('could not connect to wallet');
			}
		
			this.provider = provider;
			this.account = account;

			let mvcmypwa = this.getMvcMyPWAObject();

			// dispatch the new provider and account
			let params = {emitter: this.uuid, provider, account}

			mvcmypwa.signalEvent('on_walletconnect_connected', params);

			return {provider, account};
		}
		catch(e) {
			console.log('exception in WalletConnectClient.connect: '+ e);
		}
	}

	async disconnect(rpc) {
		let _rpc = (rpc ? rpc : this.rpc);

		try {
			if (rpc) {
				console.log('WalletConnectClient.connect: calling with rpc, should not really happen for the moment')

				const provider = new WalletConnectProvider({
					rpc,
				});
			
				// enable to clean through disconnect
				await provider.enable();
				
				await provider.disconnect();
			}
			else {
				if (this.provider)
				await this.provider.disconnect();

				// look if we have an entry left from previous connection
				const entry = window.localStorage.getItem('walletconnect');

				if (entry) {
					// apparently provider.disconnect does not remove entry fast enough
					window.localStorage.removeItem('walletconnect');
				}
			}

			this.rpc = null;
			this.provider = null
			this.account = null;
	
		}
		catch(e) {
			console.log('exception in WalletConnectClient.disconnect: '+ e);
		}

		// dispatch disconnection
		let mvcmypwa = this.getMvcMyPWAObject();

		let params = {emitter: this.uuid, rpc: _rpc}

		mvcmypwa.signalEvent('on_walletconnect_disconnected', params);

		return {disconnected: true};
	}
	

	// events coming from another client in case it is doing the connect/disconnect
	async onWalletConnected(eventname, params) {
		console.log('WalletConnectClient.onWalletConnected called');
		try {
			if (params.emitter == this.uuid)
				return; // sent by us

			this.rpc = params.rpc;
			this.provider = params.provider;
			this.account = params.account;
		}
		catch(e) {
			console.log('exception in WalletConnectClient.onWalletConnected: '+ e);
		}

		return;
	}

	async onWalletDisconnected(eventname, params) {
		console.log('WalletConnectClient.onWalletDisconnected called');

		if (params.emitter == this.uuid)
			return; // sent by us

		this.rpc = null;
		this.provider = null;
		this.account = null;

		return;
	}
	
	async onWalletConnectionStatusRequested(eventname, params) {
		console.log('WalletConnectClient.onWalletConnectionStatusRequested called');

		let ret = {emitter: this.uuid, rpc: this.rpc, provider: this.provider, account: this.account};

		if (params && params.callback) {
			params.callback(null, ret);
		}

		return ret;
	}
	
	getProvider() {
		return this.provider;
	}
	
	getRemoteAccount() {
		return this.account;
	}

	// called by wallet connect
	async onAccountsChanged(accounts) {
		console.log("WallectConnect account changed: " + accounts);

		let mvcmypwa = this.getMvcMyPWAObject();

		let params = {emitter: this.uuid, accounts};

		mvcmypwa.signalEvent('on_walletconnect_accounts_changed', params);
	}

	async onChainIdChanged(chainId) {
		console.log("WallectConnect chain changed: " + chainId);

		let mvcmypwa = this.getMvcMyPWAObject();

		let params = {emitter: this.uuid, chainId};

		mvcmypwa.signalEvent('on_walletconnect_chainid_changed', params);
	}

	async onDisconnected(code, reason) {
		console.log("WallectConnect disconnect: " + code + " - " + reason);

		let mvcmypwa = this.getMvcMyPWAObject();

		let params = {emitter: this.uuid, code ,reason};

		mvcmypwa.signalEvent('on_walletconnect_connection_changed', params);

		return this.disconnect();
	}
	
	
	

	// static
	static getObject() {
		if (WalletConnectClient.webclient)
			return WalletConnectClient.webclient;
		
		WalletConnectClient.webclient = new WalletConnectClient();

		return WalletConnectClient.webclient;
	}

}

// Note: webpack does not handle well import on module.exports
export default WalletConnectClient;
	