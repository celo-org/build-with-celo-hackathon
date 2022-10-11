
import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { doOpenWallet, doSetWallet } from '@primusmoney/react_client_wallet/imports/view/actions/wallet/wallet-actions.js';


import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

class RemoteWalletConnectForm extends React.Component {
	constructor(props) {
		super(props);
		
		this.app = this.props.app;
		this.parent = this.props.parent;

		this.rpc = this.props.rpc;

		this.uuid = this.app.guid();

		this.getMvcMyPWAObject = this.app.getMvcMyPWAObject;

		this.uuid = this.app.guid();

		this.checking = false;

		this.state = {
			loaded: false,

			connectionuuid: null,
			account: null,

			message: null
		};

	}

	// post render commit phase
	async checkNavigationState() {
		this.checking = true;

		try {
			// !!!: This component needs a wallet connect client to answer its signalEvent
			let connection_status = await this._retrieveWalletConnectionStatus();

			let account = connection_status.account;
			let connectionuuid = connection_status.connectionuuid;

			this.setState({loaded: true, connectionuuid, account});

		}
		catch(e) {
			console.log('exception in RemoteWalletConnectForm.checkNavigationState: '+ e);
		}
		finally {
			this.checking = false;
		}


	}

	componentDidMount() {
		console.log('RemoteWalletConnectForm.componentDidMount called');

		let mvcmypwa = this.getMvcMyPWAObject();

		mvcmypwa.registerEventListener('on_walletconnect_connected', null, this.onWalletConnected.bind(this));
		mvcmypwa.registerEventListener('on_walletconnect_disconnected', null, this.onWalletDisconnected.bind(this));

		this.checkNavigationState().catch(err => {console.log('error in checkNavigationState: ' + err);});
	}

	// end of life
	componentWillUnmount() {
		console.log('RemoteWalletConnectForm.componentWillUnmount called');

		let mvcmypwa = this.getMvcMyPWAObject();

		mvcmypwa.unregisterEventListener('on_walletconnect_connected', this.uuid);
		mvcmypwa.unregisterEventListener('on_walletconnect_disconnected', this.uuid);

	}

	// redux actions
	async _doSetWallet(walletname, walletuuid) {
		const result = new Promise((resolve, reject) => { 
			this.props.doSetWallet(walletname, walletuuid, (err, res) => {
				if (err) reject(err); else resolve(res);
			});
		});
		
		return result;
	}

	async _doOpenWallet(mvcmodule, sessionuuid, walletuuid, walletname, password) {
		const result = new Promise((resolve, reject) => { 
			this.props.doOpenWallet(mvcmodule, sessionuuid, walletuuid, walletname, password, (err, res) => {
				if (err) reject(err); else resolve(res);
			});
		});
		
		return result;
	}



	// calling a wallet connect client
	async _connectToWallet() {
		let mvcmypwa = this.getMvcMyPWAObject();

		let res = await new Promise((resolve, reject) => {
			mvcmypwa.signalEvent('on_walletconnect_connect', {
				emitter: this.uuid,
				rpc: this.rpc,
				callback: (err,res) => {if (res) resolve(res); else reject(err);}
			});
		});

		return res;
	}

	async _disconnectFromWallet() {
		let mvcmypwa = this.getMvcMyPWAObject();

		let res = await new Promise((resolve, reject) => {
			mvcmypwa.signalEvent('on_walletconnect_disconnect', {
				emitter: this.uuid,
				connectionuuid: this.state.connectionuuid,
				callback: (err,res) => {if (res) resolve(res); else reject(err);}
			});
		});

		return res;
	}

	async _retrieveWalletConnectionStatus() {
		let mvcmypwa = this.getMvcMyPWAObject();

		let res = await new Promise((resolve, reject) => {
			mvcmypwa.signalEvent('on_walletconnect_status_requested', {
				emitter: this.uuid,
				connectionuuid: this.state.connectionuuid,
				rpc: this.rpc,
				callback: (err,res) => {if (res) resolve(res); else reject(err);}
			});
		});

		return res;
	}

	async _openConnectionWallet() {
		let mvcmypwa = this.getMvcMyPWAObject();

		let rootsessionuuid = this.props.rootsessionuuid;

		let res = await new Promise((resolve, reject) => {
			mvcmypwa.signalEvent('on_walletconnect_open_requested', {
				emitter: this.uuid,
				sessionuuid: rootsessionuuid,
				connectionuuid: this.state.connectionuuid,
				rpc: this.rpc,
				callback: (err,res) => {if (res) resolve(res); else reject(err);}
			});
		});

		return (res && res.walletinfo ? res.walletinfo : null);
	}

	async _isWalletConnectWallet(walletuuid) {
		let mvcmypwa = this.getMvcMyPWAObject();

		let res = await new Promise((resolve, reject) => {
			mvcmypwa.signalEvent('on_walletconnect_is_connected_wallet', {
				emitter: this.uuid,
				connectionuuid: this.state.connectionuuid,
				rpc: this.rpc,
				walletuuid,
				callback: (err,res) => {if (res) resolve(res); else reject(err);}
			});
		});

		return (res && res.isconnectedwallet ? true : false);
	}



			
	// events coming from walletconnect client in case it is doing the connect/disconnect
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


	async onWalletConnected(eventname, params) {
		console.log('RemoteWalletConnectForm.onWalletConnected called');
		try {
			if (!params.rpc)
				return;

			let domatch = this._doMatchRpc(params.rpc, this.rpc);

			if (!domatch)
				return; // nothing to do with our connection

			let rootsessionuuid = this.props.rootsessionuuid;
			let walletuuid = this.props.currentwalletuuid;

			if (!walletuuid) {
				// we don't have a wallet open, not even the device wallet
				// we then open the connection wallet for this walletconnect connection
				let walletinfo = await this._openConnectionWallet();

				// and set it in redux
				if (walletinfo) {
					//let res = await this._doSetWallet(walletinfo.label, walletinfo.uuid); // does not unlock wallet

					// note: for @primusmoney/react_pwa > 0.30.20, we can use this.app.openWallet

					let mvcmodule = this.app.getMvcModuleObject();
					let password = params.account;
					let unlocked =  await this._doOpenWallet(mvcmodule, rootsessionuuid, walletinfo.uuid, walletinfo.label, password)
					.catch(err => {
						console.log('error in RemoteWalletConnectForm.onWalletConnected:' + err);
					});

					if (!unlocked) {
						this.app.error('could not unlock connection wallet: ' + walletinfo.uuid);
					}
				}
			}

			// set state
			this.setState({
				connectionuuid: params.connectionuuid,
				account: params.account});


		}
		catch(e) {
			console.log('exception in RemoteWalletConnectForm.onWalletConnected: '+ e);
		}

		return;
	}

	async onWalletDisconnected(eventname, params) {
		console.log('RemoteWalletConnectForm.onWalletDisconnected called');

		try {
			let mvcmypwa = this.getMvcMyPWAObject();

			let rootsessionuuid = this.props.rootsessionuuid;
			let walletuuid = this.props.currentwalletuuid;

			let iswalletconnect = await this._isWalletConnectWallet(walletuuid);

			if (iswalletconnect) {
				let islocked = await mvcmypwa.isWalletLocked(rootsessionuuid, walletuuid);

				if (!islocked) {
					await this.app.resetWallet();
				}
			}
	
		}
		catch(e) {
			console.log('exception in RemoteWalletConnectForm.onWalletConnected: '+ e);
		}

		this.setState({connectionuuid: null, account: null});

		return;
	}
	
		
	// actions
	async connect() {
		try {
			await this._connectToWallet();

			let connection_status = await this._retrieveWalletConnectionStatus();

			let account = connection_status.account;
			let connectionuuid = connection_status.connectionuuid;
		
			let mvcmypwa = this.getMvcMyPWAObject();
			let now = Date.now();
			let time_string = mvcmypwa.formatDate(now/1000, 'YYYY-mm-dd HH:MM:SS');

			// set state
			this.setState({
				message: 'returning from connect at ' + time_string});

			return {account, connectionuuid};
		}
		catch(e) {
			console.log('exception in RemoteWalletConnectForm.connect: '+ e);
		}
	}

	async disconnect() {

		try {
			await this._disconnectFromWallet();
		}
		catch(e) {
			console.log('exception in RemoteWalletConnectForm.disconnect: '+ e);
		}

		return {disconnected: true};
	}


	// rendering
	render() {
		let {account, message} = this.state;

		return(

			<div className="Form">
				<FormGroup controlId="address">
					<FormLabel>Remote Wallet Address</FormLabel>
					<FormGroup className="ClaimerCardLine">
						<FormControl
							className="CurrencyCardAddress"
							disabled
							autoFocus
							type="text"
							value={(account ? account : 'not connected')}
						/>
						{(account ?
						<Button 
						onClick={this.disconnect.bind(this)} 
						type="submit">
							Disconnect
						</Button> :
						<Button 
						onClick={this.connect.bind(this)} 
						type="submit">
							Connect
						</Button>
						)}
					</FormGroup>
				</FormGroup>
				<div>{(message ? message : '')}</div>
			</div>

		);
	}
}

// propTypes validation
RemoteWalletConnectForm.propTypes = {
	app: PropTypes.object.isRequired,
	rootsessionuuid: PropTypes.string,
	currentwalletuuid: PropTypes.string,
	doOpenWallet: PropTypes.func.isRequired,
	doSetWallet: PropTypes.func.isRequired
};

//redux
const mapStateToProps = (state) => {
	return {
		rootsessionuuid: state.session.sessionuuid,
		currentwalletuuid: state.wallets.walletuuid,
	};
} 

const mapDispatchToProps = (dispatch) => {
	return {
		doOpenWallet: (mvcmodule, session, walletuuid, walletname, password, callback) => dispatch(doOpenWallet(mvcmodule, session, walletuuid, walletname, password, callback)),
		doSetWallet: (walletname, walletuuid) => dispatch(doSetWallet(walletname, walletuuid)),
	};
}
export {RemoteWalletConnectForm};
export default connect(mapStateToProps, mapDispatchToProps)(RemoteWalletConnectForm);