
import React from 'react';
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

			account: null,

			message: null
		};

	}

	async checkNavigationState() {
		this.checking = true;

		try {
			// !!!: This component needs a wallet connect client to answer its signalEvent
			let connection_status = await this._retrieveWalletConnectionStatus();

			let account = connection_status.account;


			this.setState({loaded: true, account});

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

/* 		mvcmypwa.registerEventListener('on_walletconnect_connect', this.uuid, this.onConnect.bind(this));
		mvcmypwa.registerEventListener('on_walletconnect_disconnect', this.uuid, this.onDisconnect.bind(this));
 
		mvcmypwa.registerEventListener('on_walletconnect_add_connected_account', this.uuid, this.addConnectedAccount.bind(this));*/


		this.checkNavigationState().catch(err => {console.log('error in checkNavigationState: ' + err);});
	}

	// end of life
	componentWillUnmount() {
		console.log('RemoteWalletConnectForm.componentWillUnmount called');

		let mvcmypwa = this.getMvcMyPWAObject();

/*		mvcmypwa.unregisterEventListener('on_walletconnect_add_connected_account', this.uuid);

 		mvcmypwa.unregisterEventListener('on_walletconnect_disconnect', this.uuid);
		mvcmypwa.unregisterEventListener('on_walletconnect_connect', this.uuid); */
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
				rpc: this.rpc,
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
				rpc: this.rpc,
				callback: (err,res) => {if (res) resolve(res); else reject(err);}
			});
		});

		return res;
	}
			
		
	// called by other components
/* 	async onConnect(eventname, params) {
		console.log('RemoteWalletConnectForm.onConnect called');

		if (params.emitter == this.uuid)
			return; // sent by us

		await this.connect();

		let ret = {emitter: this.uuid, connected: true, account: this.state.account};

		if (params && params.callback) {
			params.callback(null, ret);
		}

		return ret;
	}

	async onDisconnect(eventname, params) {
		console.log('RemoteWalletConnectForm.onDisconnect called');

		if (params.emitter == this.uuid)
			return; // sent by us

		await this.disconnect();

		let ret = {disconnected: true};

		if (params && params.callback) {
			params.callback(null, ret);
		}

		return ret;
	}
	
		async addConnectedAccount(eventname, params) {
		try {
			let mvcmypwa = this.getMvcMyPWAObject();

			let res = await this.connect();

			let {account} = this.state;
			let {callback_url, sessiontoken} = params;
			let vendorname = 'celo wallet';

			if (account && callback_url) {
				try {
					// transaction hash
					let _url = callback_url;

					if (_url.includes('?') !== true) {
						_url += '?action=add_vendor_account';
					}
					else {
						// transaction hash
						_url += '&action=add_vendor_account';
					}

					_url += '&vendoraddress=' + account;
					_url += '&vendorname=' + vendorname;

					_url += '&sessiontoken=' + sessiontoken;

					let res = await new Promise((resolve, reject) => {

						// make an XHttpRequest call (simle call, no check on return)
						var xhttp = new XMLHttpRequest();
					
						xhttp.open('GET', _url, true);
						
						xhttp.send();
						xhttp.onload = function(e) {
							if (xhttp.status == 200) {
								var res = {};
								
								try {
									res = JSON.parse(xhttp.responseText);
								}
								catch(e) {
								}
			
								resolve(res);
							}
							else {
								reject('wrong result');
							}
						};
						
						xhttp.onerror = function (e) {
							reject('rest error is ' + xhttp.statusText);
						};
					})
					.catch(err => {
						console.log('error in RemoteWalletConnectForm.addConnectedAccount notifying callback: ' + err);
					});

					let ret = {success: true, account};

					if (params && params.callback) {
						params.callback(null, ret);
					}
			
					return ret;
				}
				catch(e) {
					console.log('exception in RemoteWalletConnectForm.addConnectedAccount notifying callback: ' + e);
				}
			}

		}
		catch(e) {
			console.log('exception in RemoteWalletConnectForm.addConnectedAccount: '+ e);
		}

		let ret = {success: false};

		if (params && params.callback) {
			params.callback(null, ret);
		}

		return ret;
	}
*/

	// actions
	async connect() {
		try {
			await this._connectToWallet();

			let connection_status = await this._retrieveWalletConnectionStatus();

			let account = connection_status.account;
		
			let mvcmypwa = this.getMvcMyPWAObject();
			let now = Date.now();
			let time_string = mvcmypwa.formatDate(now/1000, 'YYYY-mm-dd HH:MM:SS');

			// set state
			this.setState({
				message: 'returning from connect at ' + time_string,
				account});

			return {account};
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

		this.setState({account: null});

		return {disconnected: true};
	}


	// rendering
	render() {
		let {account, message} = this.state;

		return(

			<div className="Form">
				<FormGroup controlId="address">
					<FormLabel>Wallet Address</FormLabel>
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

export default RemoteWalletConnectForm;