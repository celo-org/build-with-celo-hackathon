import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { Dropdown, DropdownButton, FormGroup, FormControl, FormLabel, InputGroup } from 'react-bootstrap';

import QRCodeReact from 'qrcode.react';

import {Header} from '@primusmoney/react_pwa/react-js-ui';

import {CurrencyCardIcon} from '@primusmoney/react_pwa/react-js-ui';
import RemoteWalletIcon from '../../../components/remote-wallet/remote-wallet-icon.js'

class QRCodeBuilderHomeScreen extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.app = this.props.app;

		this.getMvcMyPWAObject = this.app.getMvcMyPWAObject;
		this.getMvcMyDeedObject = this.app.getMvcMyDeedObject;
		
		this.uuid = this.app.guid();

		this.base_currencycard_url = null;

		this.checking = false;
		this.closing = false;

		this.state = {
			currency: {symbol: ''},
			currencies: [],

			remotewallet: false,
			rpc: null,
			connection: null,

			currentcard: null,
			card_balance_string: '',
			card_creditunits: '',

			currencycard_url: null,

			loaded: false,
			builderinfo: 'loading...'		
		};		
	}
	
	_setState(state) {
		if (this.closing !== true)
		this.setState(state);
	}

	// connection methods
	_getRemoteConnectionFromRpc(rpc) {
		return this.app.getDeedClientObject().getConnectionFromRpc(rpc);
	}


	// post render commit phase
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

	componentDidUpdate(prevProps, prevState) {
		console.log('QRCodeBuilderHomeScreen.componentDidUpdate called');

		let mvcmypwa = this.getMvcMyPWAObject();

		let rootsessionuuid = this.props.rootsessionuuid;
		let walletuuid = this.props.currentwalletuuid;
		
		// selected a currency
		if (this.state.currency && this.state.currency.uuid && (this.state.currency.uuid != (prevState.currency ? prevState.currency.uuid : null))) {
			// we reset the current card
			let currentcard = null;
			let card_balance_string = '';
			let card_creditunits = '';

			const currency = this.state.currency;
			let currencyuuid = currency.uuid;
			let currencyscheme;

			let currencycard_url = '';

			mvcmypwa.getCurrencyScheme(rootsessionuuid, walletuuid, currencyuuid).
			then(scheme => {
				currencyscheme = scheme;

				return this._openCurrencyCard(currencyuuid);
			})
			.then(card => {
				if (!card)
					throw 'no current card';

				currentcard = card;

				currencycard_url += this.base_currencycard_url;
				let web3url = currencyscheme.network.ethnodeserver.web3_provider_url;
				currencycard_url += '&web3url=' + this.app.encodebase64(web3url);
				currencycard_url += '&tokenaddress=' + currency.address;
				currencycard_url += '&cardaddress=' + currentcard.address;

				return mvcmypwa.getCurrencyPosition(rootsessionuuid, walletuuid, currencyuuid, currentcard.uuid);
			})	
			.then((pos) => {
				return mvcmypwa.formatCurrencyAmount(rootsessionuuid, currencyuuid, pos);
			})

			.then((balance) => {
				card_balance_string = balance;

				return mvcmypwa.getCreditBalance(rootsessionuuid, walletuuid, currentcard.uuid);
			})
			.then((credits) => {
				card_creditunits = credits.transactionunits;

				this._setState({currentcard, card_balance_string, card_creditunits, currencycard_url})
			})
			.catch(err => {
				this._setState({currentcard, card_balance_string, card_creditunits, currencycard_url})
			});
		}
	}

	async checkNavigationState() {
		this.checking = true;

		try {
			let mvcmypwa = this.getMvcMyPWAObject();

			let rootsessionuuid = this.props.rootsessionuuid;
			let walletuuid = this.props.currentwalletuuid;
	
			let app_nav_state = this.app.getNavigationState();
			let app_nav_target = app_nav_state.target;
	
			// check wallet is unlocked
			let unlocked = await this.app.checkWalletUnlocked()
			.catch(err => {
			});
	
			if (!unlocked) {
				if (!this.closing) {
					// we open the default device wallet
					let devicewallet = await this.app.openDeviceWallet()
					.catch(err => {
					});
		
					walletuuid = devicewallet.uuid;
		
					this._setState({isdevicewallet: true});
				}
				else {
					let params = (app_nav_target ? app_nav_target.params : null);
					this.app.gotoRoute('login', params);
					return;
				}
			}

			if (app_nav_target && (app_nav_target.route == 'qrcodebuilder') && (app_nav_target.reached == false)) {
				var params = app_nav_target.params;
	
				app_nav_target.reached = true;
			}


			let base_currencycard_url = await this.app.getCleanUrl();

			base_currencycard_url += '?route=currencycard';

			this.base_currencycard_url = base_currencycard_url;

			// list of currencies
			var currencies = await this._readVisibleCurrencies()
			.catch(err => {
				console.log('error in QRCodeBuilderHomeScreen.checkNavigationState ' + err);
			});

			this.setState({currencies});
	
		}
		catch(e) {
			console.log('exception in QRCodeBuilderHomeScreen.checkNavigationState: '+ e);
		}
		finally {
			this.checking = false;
		}

		this.setState({loaded: true});

	}


	componentDidMount() {
		console.log('QRCodeBuilderHomeScreen.componentDidMount called');

		this.checkNavigationState().catch(err => {console.log('error in checkNavigationState: ' + err);});
	}

	// end of life
	componentWillUnmount() {
		console.log('QRCodeBuilderHomeScreen.componentWillUnmount called');
		
		this.closing = true;
	}

	// user actions
	async _openCurrencyCard(currencyuuid) {
		let mvcmypwa = this.getMvcMyPWAObject();
		let mvcmydeed = this.getMvcMyDeedObject();

		let rootsessionuuid = this.props.rootsessionuuid;
		let walletuuid = this.props.currentwalletuuid;
		
		let card;

		let {remotewallet} = this.state;

		if (remotewallet !== true){
			card = await this.app.openCurrencyCard(currencyuuid);
		}
		else {
			if (this.state.connection && (this.state.connection.account)) {
				card = await mvcmypwa.getCurrencyCardWithAddress(rootsessionuuid, walletuuid, currencyuuid, this.state.connection.account);
										// creates read-only card if necessary

				// we connect the card
				let connected = await mvcmydeed.connectCard(rootsessionuuid, walletuuid, card.uuid, this.state.connection);

				// TODO: to be coherent, we should call this.app.openCard
				// but not really usefull, since we don't use redux for cards in pwa-apps
				// this.app.openCard(card.uuid);
			}
			else {
				return Promise.reject('remote connection is not activated');
			}
		}

		return card;
	}

	async _changeCurrency(currency) {
		let remotewallet = false;
		let rpc = null;
		let connection = null;

		if (currency) {
			// check if corresponding currency is set for remote
			let config = this.app.getConfig('remotewallet');	

			if (config && config.rpc && config.rpc[currency.uuid]) {
				let curr_rpc_config = config.rpc[currency.uuid];

				if (curr_rpc_config.enabled === true) {
					rpc = curr_rpc_config.rpc;

					// check if a remote wallet is connected
					connection = await this._getRemoteConnectionFromRpc(rpc);

					if (connection && connection.account) {
						// we are connected to a remote wallet supporting this
						// currency's rpc
						remotewallet = true;
					}
				}
			}
		}

		// change state
		this._setState({currency, remotewallet, rpc, connection});
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

	async onClick() {
		let {currencycard_url} = this.state;

		if (currencycard_url) {
			console.log('Jumping to ' + currencycard_url);
			await this.app.gotoUrl(currencycard_url);
		}
	}


	async onShowCurrencyCard() {
		let currency = this.state.currency;
		let params = {currencyuuid: currency.uuid};
		this.app.gotoRoute('currencycard', params);
	}

	// rendering
	renderMainCardPart() {
		let { currency, remotewallet, connection, currentcard, card_balance_string, card_creditunits } = this.state;

		return (
			<span>
				{(remotewallet !== true ?
					(currentcard ?
					<FormGroup className="CurrencyCard" controlId="currencycard">
					<span className="CardIconCol">
						<CurrencyCardIcon
							app={this.app}
							currency={currency}
							card={currentcard}
						/>
					</span>
					<span className="CardBalanceCol">
						<FormLabel>Balance</FormLabel>
						<FormControl
							className="CardBalanceCol"
							disabled
							autoFocus
							type="text"
							value={card_balance_string}
						/>
					</span>
					</FormGroup> :
					<></>
					) :
					<FormGroup className="CurrencyCard" controlId="remotewallet">
					<span className="CardIconCol">
						<RemoteWalletIcon
								app={this.app}
								currency={currency}
								connection={connection}
							/>
					</span>
					<span className="CardBalanceCol">
						<FormLabel>Balance</FormLabel>
						<FormControl
							className="CardBalanceCol"
							disabled
							autoFocus
							type="text"
							value={card_balance_string}
						/>
					</span>
					</FormGroup>
				)}		
			</span>
		);

	}

	renderCurrencyPickForm() {
		let { currencies, currency} = this.state;
		
		return (
			<div className="Form">
			  <FormGroup controlId="currency">
			  <FormLabel>Currency</FormLabel>
			  <FormGroup className="DeedCurrencyPickLine" controlId="pickccy">
				<InputGroup>
					<FormControl  className="DeedCurrencyName"
						disabled
						autoFocus
						type="text"
						value={currency.symbol}
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

				{this.renderMainCardPart()}

			</div>
		  );
	}

	render() {
		let {loaded, builderinfo, currency, currentcard, currencycard_url} = this.state;

		return (
			<div className="Screen">
				<Header app = {this.app}/>
				<div className="Container">
				<div className="TitleBanner">
				<div className="Title">Main Currency Card QR Code</div>
				</div>

				{ this.renderCurrencyPickForm()}

				<div className="QRCodeBuilder" onClick={this.onClick.bind(this)}>
					{(currentcard ?
					<QRCodeReact
					value={currencycard_url}
					renderas='svg'
					size={360}
					includeMargin={true}
				/> :
				<div className="TextBox">{(currency && currency.symbol ? 'No main currency card for ' + currency.symbol : '')}</div>
				)}
				
				</div> 


				</div>

			</div>
		);
	}
	
	static getDerivedStateFromProps(nextProps, prevState) {
		// fill state
		return {
			rootsessionuuid: nextProps.rootsessionuuid,
		};
	}
}

// propTypes validation
QRCodeBuilderHomeScreen.propTypes = {
	app: PropTypes.object.isRequired,
	rootsessionuuid: PropTypes.string,
	currentwalletuuid: PropTypes.string,
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
	};
}


export {QRCodeBuilderHomeScreen};
export default connect(mapStateToProps, mapDispatchToProps)(QRCodeBuilderHomeScreen);