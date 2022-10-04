import WalletConnectProvider from '@walletconnect/web3-provider';

class WalletConnectClient {
	constructor() {
		this.global = null;
		this.mvcmypwa = null;

		this.uuid = null;

		this.connections = [];
	}

	_getConnection(connectionuuid) {
		if (!connectionuuid && this.connections.length) {
			return this.connections[0]; // returns first as default (and potentially only)
		}

		for (var i = 0; i <  this.connections.length; i++) {
			if (this.connections[i].uuid == connectionuuid)
			return this.connections[i];
		}
	}

	_addConnection(connection) {
		this.connections.push(connection);
	}

	_removeConnection(connectionuuid) {
		if (!connectionuuid)
			this.connections = []; // null removes all

		this.connections = this.connections.filter(connection => connection.uuid != connectionuuid);
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

	guid() {
		var clientapicontrollers = this.getClientAPI();

		var session = clientapicontrollers.getCurrentSessionObject();
		return session.guid();
	}

	async _cleanWalletConnect() {
		// NOTE:
		// WalletConnect is mono-connection for the moment

		// look if we have an entry left from previous connection
		const entry = window.localStorage.getItem('walletconnect');

		if (entry) {
			window.localStorage.removeItem('walletconnect');
		}
	}

	async init(global) {

		try {
			// get session object and a uuid for our client
			this.global = global;

			this.uuid = this.guid();
			
			// listen to wallet connect events
			let mvcmypwa = this.getMvcMyPWAObject();

			mvcmypwa.registerEventListener('on_walletconnect_connect', null, this.onConnect.bind(this));
			mvcmypwa.registerEventListener('on_walletconnect_disconnect', null, this.onDisconnect.bind(this));
	
			mvcmypwa.registerEventListener('on_walletconnect_connected', null, this.onWalletConnected.bind(this));
			mvcmypwa.registerEventListener('on_walletconnect_disconnected', null, this.onWalletDisconnected.bind(this));
			mvcmypwa.registerEventListener('on_walletconnect_status_requested', null, this.onWalletConnectionStatusRequested.bind(this));
	
			// remove any traces of a previous session to restart on a clean slate
			await this._cleanWalletConnect();
	
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

		let res = await this.connect(params.rpc);

		let ret = (res ? {connectionuuid: res.connectionuuid, provider: res.provider, account: res.account} : {});

		if (params && params.callback) {
			params.callback(null, ret);
		}

		return ret;
	}

	async onDisconnect(eventname, params) {
		console.log('WalletConnectWidget.onDisconnect called');

		if (params.emitter == this.uuid)
			return; // sent by us

		await this.disconnect(params.connectionuuid);

		let ret = {disconnected: true};

		if (params && params.callback) {
			params.callback(null, ret);
		}

		return ret;
	}
	

	// actions
	async connect(rpc) {
		try {
			let connectionuuid = this.guid();
			let connection = {uuid: connectionuuid, rpc};

			this._addConnection(connection);

			const provider = new WalletConnectProvider({
				rpc: connection.rpc,
			});
			let account = null;
		
			// handshake
			let res = await provider.enable();

			if (provider.connected) {
				account = provider.accounts[0];

				// Suscribe to account changed
				provider.on("accountsChanged", (accounts) => {
					this.onAccountsChanged(connection, accounts);
				});
	
				// Subscribe to chainId change
				provider.on("chainChanged", (chainId) => {
					this.onChainIdChanged(connection, chainId);
				});
				
				// Subscribe to session disconnection
				provider.on("disconnect", (code, reason) => {
					this.onDisconnected(connection, code, reason);
				});
			}
			else {
				this.app.alert('could not connect to wallet');
			}
		
			connection.provider = provider;
			connection.account = account;

			let mvcmypwa = this.getMvcMyPWAObject();

			// dispatch the new provider and account
			let params = {emitter: this.uuid, provider, account}

			mvcmypwa.signalEvent('on_walletconnect_connected', params);

			return {connectionuuid, connection, provider, account, rpc};
		}
		catch(e) {
			console.log('exception in WalletConnectClient.connect: '+ e);
		}
	}

	async disconnect(connectionuuid) {

		try {
			let connection = this._getConnection(connectionuuid);

			if (connection) {
				
				if (connection.provider) {
					await connection.provider.disconnect();
				}
				else if (connection.rpc) {
					const provider = new WalletConnectProvider({
						rpc: connection.rpc
					});
				
					// enable to clean through disconnect
					await provider.enable();
					
					await provider.disconnect();
				}
	
				// remove from connections
				this._removeConnection(connection.uuid);


				// apparently provider.disconnect does not remove entry fast enough
				// we do a force clean, especially because WalletConnect is mono-connection
				// for the moment
				await this._cleanWalletConnect();
			}

		}
		catch(e) {
			console.log('exception in WalletConnectClient.disconnect: '+ e);
		}

		// dispatch disconnection
		let mvcmypwa = this.getMvcMyPWAObject();

		let params = {emitter: this.uuid, connectionuuid}

		mvcmypwa.signalEvent('on_walletconnect_disconnected', params);

		return {disconnected: true};
	}
	

	// events coming from another client in case it is doing the connect/disconnect
	async onWalletConnected(eventname, params) {
		console.log('WalletConnectClient.onWalletConnected called');
		try {
			if (params.emitter == this.uuid)
				return; // sent by us


			let connectionuuid = this.guid();
			let connection = {uuid: connectionuuid};

			connection.rpc = params.rpc;
			connection.provider = params.provider;
			connection.account = params.account;


			this._addConnection(connection);
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

		this._removeConnection(params.connectionuuid); // remove all connections

		return;
	}
	
	async onWalletConnectionStatusRequested(eventname, params) {
		console.log('WalletConnectClient.onWalletConnectionStatusRequested called');

		let connection = this._getConnection(params.connectionuuid);

		let ret = {emitter: this.uuid};

		if (connection) {
			ret.rpc = connection.rpc;
			ret.provider = connection.provider;
			ret.account = connection.account;
		}
	
		if (params && params.callback) {
			params.callback(null, ret);
		}

		return ret;
	}
	
	getProvider(connectionuuid) {
		let connection = this._getConnection(connectionuuid);

		return (connection ? connection.provider : null);
	}
	
	getRemoteAccount(connectionuuid) {
		let connection = this._getConnection(connectionuuid);

		return (connection ? connection.account : null);
	}

	// called by wallet connect
	async onAccountsChanged(connection, accounts) {
		console.log("WallectConnect account changed: " + accounts);

		let mvcmypwa = this.getMvcMyPWAObject();

		let params = {emitter: this.uuid, connectionuuid: connection.uuid, accounts};

		mvcmypwa.signalEvent('on_walletconnect_accounts_changed', params);
	}

	async onChainIdChanged(connection, chainId) {
		console.log("WallectConnect chain changed: " + chainId);

		let mvcmypwa = this.getMvcMyPWAObject();

		let params = {emitter: this.uuid, connectionuuid: connection.uuid, chainId};

		mvcmypwa.signalEvent('on_walletconnect_chainid_changed', params);
	}

	async onDisconnected(connection, code, reason) {
		console.log("WallectConnect disconnect: " + code + " - " + reason);

		let mvcmypwa = this.getMvcMyPWAObject();

		let params = {emitter: this.uuid, connectionuuid: connection.uuid, code ,reason};

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
	