import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import RemoteWalletConnectForm from './remote-wallet-connect-form.js'

import { Button, Dropdown, DropdownButton, FormGroup, FormControl, FormLabel, InputGroup } from 'react-bootstrap';

import {TextCopyIcon} from '@primusmoney/react_pwa';


class RemoteWalletView extends React.Component {
	constructor(props) {
		super(props);
		
		this.app = this.props.app;
		this.parent = this.props.parent;
		this.getMvcMyPWAObject = this.app.getMvcMyPWAObject;

		this.connectionuuid = this.props.connectionuuid;
		this.currencyuuid = this.props.currencyuuid;
		
		this.closing = false;

		this.state = {
			message_text: 'loading...',

			currency: {symbol: ''},
			currencies: [],

			connected: false,
			rpc: null,

			balance_string: 'loading...',

			creditbalance: 'loading...',
			position: null,
			position_int: -1,
			position_string: 'loading...',

			address: null,
			address_string: 'loading...',

		}
	}

	_setState(state) {
		if (this.closing !== true)
		this.setState(state);
	}



	// post render commit phase
	componentDidUpdate(prevProps, prevState) {

		if ( this.state.hasOpenWallet != prevState.hasOpenWallet) {
			// wallet has been open (or closed)
			let connection;

			this._getRemoteConnection()
			.then(cnct => {
				connection = cnct;
				return this._getRemoteAccountInfo(connection);
			})
			.then(account_info => {
				if (connection && connection.account) {
					let connected = true;
	
					let creditbalance = account_info.creditbalance;
	
					let position = account_info.position;
					let position_string = account_info.position_string;
					let position_int = account_info.position_int;
	
					// export
					let address = account_info.address;
					let web3providerurl = account_info.web3providerurl;
	
					let address_string = account_info.address_string;
					let web3providerurl_string = account_info.web3providerurl_string;

					this._setState({connected,
						creditbalance, position, position_int, position_string,  
						address, web3providerurl,
						address_string, web3providerurl_string});
				}
			})
			.catch(err => {
				console.log('error in RemoteWalletView.componentDidUpdate: ' + err);
			});
		}
	}

	componentDidMount() {
		console.log('RemoteWalletView.componentDidMount called');

		let mvcmypwa = this.getMvcMyPWAObject();

		mvcmypwa.registerEventListener('on_walletconnect_connected', this.uuid, this.onWalletConnected.bind(this));
		mvcmypwa.registerEventListener('on_walletconnect_disconnected', this.uuid, this.onWalletDisconnected.bind(this));

		this.checkNavigationState().catch(err => {console.log('error in checkNavigationState: ' + err);});
	}

	async _getRemoteConnection() {
		let deedclient = this.app.getDeedClientObject();
		let walletconnectclient = deedclient.getWalletConnectClient();
		let walletconnection = walletconnectclient.getConnection(this.connectionuuid);

		return walletconnection;
	}

	async _getRemoteAccountInfo(connection) {
		let account_info = {};

		if (connection && connection.account) {
			let mvcmypwa = this.getMvcMyPWAObject();

			let rootsessionuuid = this.props.rootsessionuuid;
			let walletuuid = this.props.currentwalletuuid;

			if (!walletuuid)
				return account_info;

			let currencyuuid = this.currencyuuid;
	
			let remoteaccount = connection.account;

			if (currencyuuid) {
				let card = await mvcmypwa.getCurrencyCardWithAddress(rootsessionuuid, walletuuid, currencyuuid,
					remoteaccount); // creates read-only card if necessary
	
				let scheme = await mvcmypwa.getSchemeInfo(rootsessionuuid, card.schemeuuid );
	
				account_info.credits = await mvcmypwa.getCreditBalance(rootsessionuuid, walletuuid, card.uuid);
				account_info.creditbalance = account_info.credits.transactionunits;
				account_info.credits.threshold = await mvcmypwa.getSchemeTransactionUnitsThreshold(rootsessionuuid, scheme.uuid);
	
				account_info.position = await mvcmypwa.getCurrencyPosition(rootsessionuuid, walletuuid, currencyuuid, card.uuid);
				account_info.position_string = await mvcmypwa.formatCurrencyAmount(rootsessionuuid, currencyuuid, account_info.position);
				account_info.position_int = await account_info.position.toInteger();
	
				// export
				account_info.address = card.address;
				account_info.web3providerurl = scheme.network.ethnodeserver.web3_provider_url;
	
				account_info.address_string = (account_info.address ? mvcmypwa.fitString(account_info.address, 32) : '');
				account_info.web3providerurl_string = (account_info.web3providerurl ? mvcmypwa.fitString(account_info.web3providerurl, 48) : '');
			}

		}

		return account_info;
	}

	async _readVisibleCurrencies() {
		let mvcmypwa = this.getMvcMyPWAObject();

		let rootsessionuuid = this.props.rootsessionuuid;
		let walletuuid = this.props.currentwalletuuid;

		let currencies = await mvcmypwa.getCurrencies(rootsessionuuid, walletuuid);

		if (!currencies)
		return Promise.reject('could not get list of currencies');

		let arr = [];

		for (var i = 0; i < currencies.length; i++) {
			if (currencies[i].hidden && (currencies[i].hidden == true))
			continue;

			arr.push(currencies[i]);
		}

		return arr;
	}


	async _getConnectionCurrencies(connection) {
		if (!connection)
			return [];

		let mvcmypwa = this.getMvcMyPWAObject();

		let rootsessionuuid = this.props.rootsessionuuid;
	
		let rpc = connection.rpc;
		let web3urls = Object.values(connection.rpc);

		let _visible_currencies = await this._readVisibleCurrencies();
		let connection_currencies = [];

		for (var i = 0; i < _visible_currencies.length; i++) {
			let currency = _visible_currencies[i]
			let currency_schemeuuid = currency.scheme_uuid;
			let scheme;
			let scheme_web3_provider_url;

			if (currency_schemeuuid) {
				scheme = await mvcmypwa.getSchemeInfo(rootsessionuuid, currency_schemeuuid);

				scheme_web3_provider_url = (scheme && scheme.network && scheme.network.ethnodeserver
					&& scheme.network.ethnodeserver.web3_provider_url ? scheme.network.ethnodeserver.web3_provider_url : null);
			}				
			else if (currency.web3providerurl) {
				// not directly attached to a registered scheme
				scheme_web3_provider_url = currency.web3providerurl;
			}

			if (web3urls.includes(scheme_web3_provider_url)) {
				connection_currencies.push(currency);
			}
		}

		return connection_currencies;
	}

	async checkNavigationState() {
		let mvcmypwa = this.getMvcMyPWAObject();

		let rootsessionuuid = this.props.rootsessionuuid;
		let walletuuid = this.props.currentwalletuuid;


		try {

			let message_text = 'This is a view of one of the address in your remote wallet. \
					To get a full view of the content of your wallet, you must directly open\
					the app that is managing this remote wallet. ';

			// find connection from connectionuuid
			let connection = await this._getRemoteConnection();
			let rpc = (connection ? connection.rpc : null);

			// get currency
			let currencyuuid = this.currencyuuid;
			let currency = {symbol: ''};

			if (currencyuuid) {
				currency = await mvcmypwa.getCurrencyFromUUID(rootsessionuuid, currencyuuid);
			}
			else {
				// we pick a currency corresponding to the connection
				if (connection) {
					let _connection_currencies = await this._getConnectionCurrencies(connection);

					if (_connection_currencies && _connection_currencies.length) {
						currency = _connection_currencies[0]; // pick first
						currencyuuid = currency.uuid;
						this.currencyuuid = currencyuuid;
					}
				}
			}

			let connected = false;
			let address;
			let web3providerurl;

			let address_string;
			let web3providerurl_string;

			let creditbalance;

			let position;
			let position_string;
			let position_int;


			if (connection && connection.account) {
				connected = true;
				let account_info = await this._getRemoteAccountInfo(connection);

				creditbalance = account_info.creditbalance;

				position = account_info.position;
				position_string = account_info.position_string;
				position_int = account_info.position_int;

				// export
				address = account_info.address;
				web3providerurl = account_info.web3providerurl;

				address_string = account_info.address_string;
				web3providerurl_string = account_info.web3providerurl_string;
			}

			// list of currencies
			let currencies = await this._readVisibleCurrencies()
			.catch(err => {
				console.log('error in DeedCreateForm.componentDidMount ' + err);
			});
		
			// filter currencies that have rpc enabled
			let enabled_currencies = [];
			let config = this.app.getConfig('remotewallet');
			
			if (config && config.rpc) {
				for (var i = 0; i < currencies.length; i++) {
					let _curr = currencies[i];
					if (config.rpc[_curr.uuid]) {
						let curr_rpc_config = config.rpc[_curr.uuid];
		
						if (curr_rpc_config.enabled === true) {
							enabled_currencies.push(_curr);
						}
					}
				}
	
			}

			// setState
			this._setState({message_text,
				currency, currencies: enabled_currencies,
				connected, rpc,
				creditbalance, position, position_int, position_string,  
				address, web3providerurl,
				address_string, web3providerurl_string});
		}
		catch(e) {
			console.log('exception in RemoteWalletView.checkNavigationState: '+ e);
		}
	}

	// end of life
	componentWillUnmount() {
		console.log('RemoteWalletView.componentWillUnmount called');
				
		this.closing = true;

		let mvcmypwa = this.getMvcMyPWAObject();

		mvcmypwa.unregisterEventListener('on_walletconnect_disconnected', this.uuid);
		mvcmypwa.unregisterEventListener('on_walletconnect_connected', this.uuid);

	}

	// events coming from walletconnect client in case it is doing the connect/disconnect
	async onWalletConnected(eventname, params) {
		console.log('RemoteWalletView.onWalletConnected called');
		try {
			if (!this.connectionuuid)
				this.connectionuuid = params.connectionuuid;

			if (params.connectionuuid == this.connectionuuid) {

				let connection = await this._getRemoteConnection();
	
				if (connection && connection.account) {
					let connected = true;
					let account_info = await this._getRemoteAccountInfo(connection);
	
					let creditbalance = account_info.creditbalance;
	
					let position = account_info.position;
					let position_string = account_info.position_string;
					let position_int = account_info.position_int;
	
					// export
					let address = account_info.address;
					let web3providerurl = account_info.web3providerurl;
	
					let address_string = account_info.address_string;
					let web3providerurl_string = account_info.web3providerurl_string;

					this._setState({connected,
						creditbalance, position, position_int, position_string,  
						address, web3providerurl,
						address_string, web3providerurl_string});
				}
			}
		}
		catch(e) {
			console.log('exception in RemoteWalletView.onWalletConnected: '+ e);
		}

		return;
	}

	async onWalletDisconnected(eventname, params) {
		console.log('RemoteWalletView.onWalletDisconnected called');

		try {
			if (params.connectionuuid == this.connectionuuid)
			this.setState({connected: false});
		}
		catch(e) {
			console.log('exception in RemoteWalletView.onWalletConnected: '+ e);
		}

		return;
	}

	async _changeCurrency(currency) {
		let rpc = null;

		if (currency) {
			this.currencyuuid = currency.uuid;

			// check if corresponding currency is set for remote
			let config = this.app.getConfig('remotewallet');	

			if (config && config.rpc && config.rpc[currency.uuid]) {
				let curr_rpc_config = config.rpc[currency.uuid];

				if (curr_rpc_config.enabled === true) {
					rpc = curr_rpc_config.rpc;
				}
			}

			// change state
			this._setState({currency});
		}

		this._setState({rpc});
	}

	async onChangeCurrency(e) {
		var cur = e.target.value;

		var {currencies} = this.state;
		var currency;

		for (var i = 0; i < currencies.length; i++) {
			if (cur === currencies[i].symbol) {
				currency = currencies[i];
				break;
			}
		}

		this._changeCurrency(currency);
	}

	async onSelectCurrency(uuid) {
		var {currencies} = this.state;
		var currency;

		for (var i = 0; i < currencies.length; i++) {
			if (uuid === currencies[i].uuid) {
				currency = currencies[i];
				break;
			}
		}

		this._changeCurrency(currency);
	}

	// rendering
	renderRemoteWalletConnection() {
		let {rpc} = this.state;

		return (
			<RemoteWalletConnectForm 
				app = {this.app}
				parent={this.parent}
				rpc={rpc}
			/>
		);
	}

	renderCurrencyPickForm() {
		let { currencies, currency, rpc} = this.state;
		
		return (
			<div className="Form">
			  <FormGroup controlId="currency">
			  <FormLabel>Currency</FormLabel>
			  <FormGroup className="DeedCurrencyPickLine" controlId="pickccy">
				<InputGroup>
					<FormControl  className="DeedCurrencyName"
						autoFocus
						type="text"
						value={currency.symbol}
						onChange={e => this.onChangeCurrency(e)}
					/>
					<DropdownButton
						id="input-dropdown-addon"
						title="Cur."
						onSelect={e => this.onSelectCurrency(e)}
					>
						{currencies.map((item, index) => (
							<Dropdown.Item key={item.uuid} eventKey={item.uuid} value={item.uuid}>{item.symbol}</Dropdown.Item>
						))}
					</DropdownButton>
				</InputGroup>
			  </FormGroup>
			  </FormGroup>

				{(rpc ? this.renderRemoteWalletConnection() : <></>)}

			</div>
		  );
	}


	renderWalletView() {
		let {currency, creditbalance, position_string, address, address_string, web3providerurl, web3providerurl_string} = this.state;

		return (
			<div className="Form">
				<FormGroup className="CurrencyCard" controlId="balance">
				<span>
					<FormLabel># credit units</FormLabel>
					<FormControl
						className="CurrencyCardBalance"
						disabled
						autoFocus
						type="text"
						value={creditbalance}
					/>
				</span>
				<span>
					<FormLabel>Balance</FormLabel>
					<FormControl
						className="CurrencyCardBalance"
						disabled
						autoFocus
						type="text"
						value={position_string}
					/>
				</span>
				</FormGroup>

				<div>{this.connectionuuid}</div>

				<FormGroup controlId="address">
					<FormLabel>Address</FormLabel>
					<FormGroup className="ClaimerCardLine">
						<FormControl
							className="CurrencyCardAddress"
							disabled
							autoFocus
							type="text"
							value={(address_string ? address_string : '')}
						/>
						<div className="ShareIcon">
							<TextCopyIcon
								app={this.app}
								text={address}
								message="address has been copied to clipboard"
							/>
						</div>
					</FormGroup>
				</FormGroup>

				<FormGroup controlId="web3providerurl">
					<FormLabel>RPC URL {(currency && currency.name ? 'for ' + currency.name : '')}</FormLabel>
					<FormGroup className="ClaimerCardLine">
						<FormControl
							className="CurrencyCardAddress"
							disabled
							autoFocus
							type="text"
							value={(web3providerurl_string ? web3providerurl_string : '')}
						/>
						<div className="ShareIcon">
							<TextCopyIcon
								app={this.app}
								text={web3providerurl}
								message="rpc url has been copied to clipboard"
							/>
						</div>
					</FormGroup>
				</FormGroup>

			</div>	
		);

	}

	render() {
		let {connected, rpc, message_text} = this.state;

		return(
			<div className="Container">
			<div className="TitleBanner">
			<div className="Title">Remote Wallet</div>
			</div>

			{ (connected ? 
				this.renderWalletView() :
				this.renderCurrencyPickForm()
			)}

			<div className="TextBox">
				{message_text}
			</div>


			</div>

		);
	}

	// static functions	 
	static getDerivedStateFromProps(nextProps, prevState) {
		// fill state
		return {
			hasOpenWallet: ((nextProps.currentwalletuuid) && (nextProps.iswalletlocked === false) ? true : false),
		};
	}
}


// propTypes validation
RemoteWalletView.propTypes = {
	app: PropTypes.object.isRequired,
	rootsessionuuid: PropTypes.string,
	currentwalletuuid: PropTypes.string,
	iswalletlocked: PropTypes.bool,
};

//redux
const mapStateToProps = (state) => {
	return {
		rootsessionuuid: state.session.sessionuuid,
		currentwalletuuid: state.wallets.walletuuid,
		iswalletlocked: state.wallets.islocked,
	};
} 

const mapDispatchToProps = (dispatch) => {
	return {
	};
}
export {RemoteWalletView};
export default connect(mapStateToProps, mapDispatchToProps)(RemoteWalletView);