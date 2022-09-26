
import React from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

class RemoteWalletConnectForm extends React.Component {
	constructor(props) {
		super(props);
		
		this.app = this.props.app;
		this.parent = this.props.parent;

		this.rpc = this.props.rpc;

		this.getMvcMyPWAObject = this.app.getMvcMyPWAObject;

		this.deed_client = this.app.getDeedClientObject();
		this.walletconnect_client = this.deed_client.getWalletConnectClient();
		
		this.uuid = this.app.guid();

		this.checking = false;

		this.state = {
			loaded: false,

			provider: null,
			account: null,

			message: null
		};

	}

	async checkNavigationState() {
		this.checking = true;

		try {

			this.setState({loaded: true});

		}
		catch(e) {
			console.log('exception in RemoteWalletConnectForm.checkNavigationState: '+ e);
		}
		finally {
			this.checking = false;

			this.parent.initializationStatus('wc_ready');
		}


	}


	componentDidMount() {
		console.log('RemoteWalletConnectForm.componentDidMount called');

		let mvcmypwa = this.getMvcMyPWAObject();

		mvcmypwa.registerEventListener('on_walletconnect_connect', this.uuid, this.onConnect.bind(this));
		mvcmypwa.registerEventListener('on_walletconnect_disconnect', this.uuid, this.onDisconnect.bind(this));

		mvcmypwa.registerEventListener('on_walletconnect_add_connected_account', this.uuid, this.addConnectedAccount.bind(this));


		this.checkNavigationState().catch(err => {console.log('error in checkNavigationState: ' + err);});
	}

	// end of life
	componentWillUnmount() {
		console.log('RemoteWalletConnectForm.componentWillUnmount called');

		let mvcmypwa = this.getMvcMyPWAObject();

		mvcmypwa.unregisterEventListener('on_walletconnect_add_connected_account', this.uuid);

		mvcmypwa.unregisterEventListener('on_walletconnect_disconnect', this.uuid);
		mvcmypwa.unregisterEventListener('on_walletconnect_connect', this.uuid);
	}
			
		
	// called by other components
	async onConnect(eventname, params) {
		console.log('RemoteWalletConnectForm.onConnect called');

		await this.connect();

		let ret = {provider: this.state.provider, account: this.state.account};

		if (params && params.callback) {
			params.callback(null, ret);
		}

		return ret;
	}

	async onDisconnect(eventname, params) {
		console.log('RemoteWalletConnectForm.onDisconnect called');

		await this.disconnect();

		let ret = {disconnected: true};

		if (params && params.callback) {
			params.callback(null, ret);
		}

		return ret;
	}

	// actions
	async connect() {
		try {
			await this.walletconnect_client.connect(this.rpc);

			let provider = this.walletconnect_client.getProvider();
			let account = this.walletconnect_client.getRemoteAccount();
		
			let mvcmypwa = this.getMvcMyPWAObject();
			let now = Date.now();
			let time_string = mvcmypwa.formatDate(now/1000, 'YYYY-mm-dd HH:MM:SS');

			// set state
			this.setState({
				message: 'returning from connect at ' + time_string,

				provider, account});

			return {provider, account}
		}
		catch(e) {
			console.log('exception in RemoteWalletConnectForm.connect: '+ e);
		}
	}

	async disconnect() {

		try {
			await this.walletconnect_client.disconnect();

		}
		catch(e) {
			console.log('exception in RemoteWalletConnectForm.disconnect: '+ e);
		}

		this.setState({provider: null, account: null});

		// dispatch disconnection
		let mvcmypwa = this.getMvcMyPWAObject();

		mvcmypwa.signalEvent('on_walletconnect_disconnected');

		return {disconnected: true};
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
						console.log('error in CurrencyCardView.onTransfer notifying callback: ' + err);
					});

					let ret = {success: true, account};

					if (params && params.callback) {
						params.callback(null, ret);
					}
			
					return ret;
				}
				catch(e) {
					console.log('exception in CurrencyCardView.onTransfer notifying callback: ' + e);
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

	// rendering
	render() {
		let {account, provider, message} = this.state;

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
						{(provider ?
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