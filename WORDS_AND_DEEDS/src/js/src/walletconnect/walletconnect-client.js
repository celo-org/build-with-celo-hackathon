import WalletConnectProvider from '@walletconnect/web3-provider';

class WalletConnectClient {
	constructor() {
		this.global = null;
		this.mvcmypwa = null;

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


	async init(global) {

		try {
			this.global = global;
			
			// listen to wallet connect events
			let mvcmypwa = this.getMvcMyPWAObject();

			mvcmypwa.registerEventListener('on_walletconnect_connect', null, this.onConnect.bind(this));
			mvcmypwa.registerEventListener('on_walletconnect_disconnect', null, this.onDisconnect.bind(this));
	
			mvcmypwa.registerEventListener('on_walletconnect_connected', null, this.onWalletConnected.bind(this));
			mvcmypwa.registerEventListener('on_walletconnect_disconnected', null, this.onWalletDisconnected.bind(this));
	
			// remove any traces of a previous session to restart on a clean slate
			//await this.disconnectFromWallet();
	
		}
		catch(e) {
			console.log('exception in WalletConnectClient.init: ' + e);
		}	

	}

	// called by other components like WalletConnectWidget
	async onConnect(eventname, params) {
		console.log('WalletConnectWidget.onConnect called');

		await this.connect();

		let ret = {provider: this.state.provider, account: this.state.account};

		if (params && params.callback) {
			params.callback(null, ret);
		}

		return ret;
	}

	async onDisconnect(eventname, params) {
		console.log('WalletConnectWidget.onDisconnect called');

		await this.disconnect();

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
			mvcmypwa.signalEvent('on_walletconnect_connected', {provider, account});

			return {provider, account};
		}
		catch(e) {
			console.log('exception in WalletConnectClient.connect: '+ e);
		}
	}

	async disconnect() {

		try {
			if (this.provider)
			await this.provider.disconnect();
			else {
				// look if we have an entry left from previous connection
				const entry = window.localStorage.getItem('walletconnect');

				if (entry) {
					const provider = new WalletConnectProvider({
						rpc: this.rpc,
					});
					let account = null;
				
					// enable to clean through disconnect
					await provider.enable();
					
					await provider.disconnect();

					// apparently provider.disconnect does not remove entry fast enough
					window.localStorage.removeItem('walletconnect');
				}
			}

		}
		catch(e) {
			console.log('exception in WalletConnectClient.disconnect: '+ e);
		}

		this.rpc = null;
		this.provider = null
		this.account = null;

		// dispatch disconnection
		let mvcmypwa = this.getMvcMyPWAObject();

		mvcmypwa.signalEvent('on_walletconnect_disconnected');

		return {disconnected: true};
	}
	

	// events coming from another client in case it is doing the connect/disconnect
	async onWalletConnected(eventname, params) {
		console.log('WalletConnectClient.onWalletConnected called');
		try {
			this.account = params.account;
		}
		catch(e) {
			console.log('exception in WalletConnectClient.onWalletConnected: '+ e);
		}

		return;
	}

	async onWalletDisconnected(eventname, params) {
		console.log('WalletConnectClient.onWalletDisconnected called');

		this.account = null;

		return;
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

		mvcmypwa.signalEvent('on_walletconnect_accounts_changed', {accounts});
	}

	async onChainIdChanged(chainId) {
		console.log("WallectConnect chain changed: " + chainId);

		let mvcmypwa = this.getMvcMyPWAObject();

		mvcmypwa.signalEvent('on_walletconnect_chainid_changed', {chainId});
	}

	async onDisconnected(code, reason) {
		console.log("WallectConnect disconnect: " + code + " - " + reason);

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
	