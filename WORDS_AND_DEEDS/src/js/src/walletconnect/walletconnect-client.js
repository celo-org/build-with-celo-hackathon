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

	async openConnectionWallet(sessionuuid, connectionuuid) {
		let global = this.global;
		var clientapicontrollers = this.getClientAPI();

		let mvcmypwa = global.getModuleObject('mvc-myquote');
		let mvcmydeed = global.getModuleObject('mvc-mydeed');


		let connectedwllts = await mvcmypwa.readSettings('wc_wallets');

		connectedwllts = (connectedwllts ? connectedwllts : []);

		let walletname = 'remotewallet';
		let walletuuid;

		// get passphrase from connected account address

		// returns local wallet associated with current walletconnect connection (if any)
		let connection = this._getConnection(connectionuuid);
		let account = connection.account;

		if (!account) {
			// connect now
			let ret = await this.connect(connection.rpc);

			if (!ret || !ret.account) {
				return Promise.reject('could not connect to remote wallet');
			}

			account = ret.account;
		}
		
		
		let passphrase = account;

		let walletinfo;

		// go through the list of wallets to see if can open a wallet with this passphrase

		for (var i = 0; i < connectedwllts.length; i++) {
			let _walletuuid = connectedwllts[i].walletuuid;
			let unlocked = await mvcmypwa.unlockWallet(sessionuuid, _walletuuid, passphrase).catch(err => {});

			if (unlocked) {
				walletuuid = _walletuuid;
				break;
			}
		}

		if (walletuuid) {
			// open wallet
			walletinfo = await mvcmypwa.getWalletInfo(sessionuuid, walletuuid);

			if (!walletinfo)
				return Promise.reject('could not open wallet: ' + walletuuid);
		}
		else {
			// we create a wallet
			
			let localscheme = await mvcmypwa.getDefaultLocalSchemeInfo(sessionuuid);
			let localschemeuuid = localscheme.uuid;
			// !!!: for the moment (mvc-client-wallet version 0.30.10) local wallet are only created on default-0

			//let walletschemeuuid = item.uuid;

			walletinfo = await mvcmypwa.makeWallet(sessionuuid, walletname, localschemeuuid, passphrase)
			.catch(err => {
				console.log('error in WalletConnectClient.openConnectionWallet: ' + err);
			});

			if (!walletinfo)
				return Promise.reject('could not create wallet for celo');

			walletuuid = walletinfo.uuid;

			// we change name of wallet, so that login find it from the username
			await mvcmydeed.setWalletLabel(sessionuuid, walletuuid, walletuuid); 
				// TODO: use mvcmypwa for @primusmoney/react_pwa > 0.30.20

			// save in our list
			let connectedwllt = {};
			connectedwllt.walletuuid = walletuuid;
			connectedwllt.created_on = Date.now();

			connectedwllts.push(connectedwllt);
			
			await mvcmypwa.putSettings('wc_wallets', connectedwllts);
	
		}

		return walletinfo;
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

			// actions
			mvcmypwa.registerEventListener('on_walletconnect_connect', null, this.onConnect.bind(this));
			mvcmypwa.registerEventListener('on_walletconnect_disconnect', null, this.onDisconnect.bind(this));
	
			// other clients
			mvcmypwa.registerEventListener('on_walletconnect_connected', null, this.onWalletConnected.bind(this));
			mvcmypwa.registerEventListener('on_walletconnect_disconnected', null, this.onWalletDisconnected.bind(this));

			// api
			mvcmypwa.registerEventListener('on_walletconnect_status_requested', null, this.onWalletConnectionStatusRequested.bind(this));
			mvcmypwa.registerEventListener('on_walletconnect_open_requested', null, this.onWalletConnectionOpenRequested.bind(this));
			mvcmypwa.registerEventListener('on_walletconnect_is_connected_wallet', null, this.onIsWalletConnectWallet.bind(this));
	
			// remove any traces of a previous session to restart on a clean slate
			await this._cleanWalletConnect();
	
		}
		catch(e) {
			console.log('exception in WalletConnectClient.init: ' + e);
		}	

	}

	// called by other components like WalletConnectClient
	async onConnect(eventname, params) {
		console.log('WalletConnectClient.onConnect called');

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
		console.log('WalletConnectClient.onDisconnect called');

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
	_doMatchRpc(rpc, newrpc) {
		let rpc_string = JSON.stringify(rpc);
		let newrpc_string = JSON.stringify(newrpc);

		if (rpc_string == newrpc_string)
			return true; // perfect match

		// otherwise, we look if chain ids are included in rpc
		let is_included = true;
		let newrpc_keys = Object.keys(newrpc);

		for (var i = 0; i < newrpc_keys.length; i++) {
			let chainid = newrpc_keys[i];

			if (!rpc[chainid] || (rpc[chainid] != newrpc[chainid])) {
				is_included = false;
				break;
			}
		}

		return is_included;
	}

	getConnectionFromRpc(rpc) {
		if (!rpc)
			return;

		for (var i = 0; i <  this.connections.length; i++) {
			let domatch = this._doMatchRpc(this.connections[i].rpc, rpc)

			if (domatch)
			return this.connections[i];
		}

		// enter a connection entry
		let connectionuuid = this.guid();
		let connection = {uuid: connectionuuid, rpc};

		this._addConnection(connection);

		return connection;
	}

	async connect(rpc) {
		try {
			let connection = this.getConnectionFromRpc(rpc);
			let connectionuuid = (connection ? connection.uuid : null);

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
			let params = {emitter: this.uuid, connectionuuid, provider, account, rpc}

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

			let connection = this.getConnectionFromRpc(params.rpc);

			connection.provider = params.provider;
			connection.account = params.account;
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
	
	// api
	async onWalletConnectionStatusRequested(eventname, params) {
		console.log('WalletConnectClient.onWalletConnectionStatusRequested called');

		let connectionuuid = params.connectionuuid;

		if (!connectionuuid && params.rpc) {
			let connection = this.getConnectionFromRpc(params.rpc);

			connectionuuid = (connection ? connection.uuid : null);
		}

		let ret = this.getConnectionStatus(connectionuuid);
		ret.emitter = this.uuid;

		if (params && params.callback) {
			params.callback(null, ret);
		}

		return ret;
	}

	async onWalletConnectionOpenRequested(eventname, params) {
		console.log('WalletConnectClient.onWalletConnectionOpenRequested called');

		let sessionuuid = params.sessionuuid;
		let connectionuuid = params.connectionuuid;

		if (!connectionuuid && params.rpc) {
			let connection = this.getConnectionFromRpc(params.rpc);

			connectionuuid = (connection ? connection.uuid : null);
		}

		let walletinfo = await this.openConnectionWallet(sessionuuid, connectionuuid);

		let ret = {connectionuuid, walletinfo};
		ret.emitter = this.uuid;

		if (params && params.callback) {
			params.callback(null, ret);
		}

		return ret;
	}

	async onIsWalletConnectWallet(eventname, params) {
		let walletuuid = params.walletuuid;
		let isconnectedwallet = false;

		if (walletuuid)	 {
			let mvcmypwa = this.getMvcMyPWAObject();

			let connectedwllts = await mvcmypwa.readSettings('wc_wallets');
	
			for (var i = 0; i < connectedwllts.length; i++) {
				let _walletuuid = connectedwllts[i].walletuuid;
	
				if (_walletuuid == walletuuid) {
					isconnectedwallet = true;
					break;
				}
			}
		}

		let ret = {isconnectedwallet}

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

	getConnectionStatus(connectionuuid) {
		let connection = this._getConnection(connectionuuid);

		return (connection ? {connectionuuid, rpc: connection.rpc, provider: connection.provider, account: connection.account} : {connectionuuid});
	}

	getConnection(connectionuuid) {
		let connection = this._getConnection(connectionuuid);

		return connection;
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
	