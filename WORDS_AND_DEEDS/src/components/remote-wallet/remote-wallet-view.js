import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { FormGroup, FormControl, FormLabel } from 'react-bootstrap';

import {TextCopyIcon} from '@primusmoney/react_pwa';


class RemoteWalletView extends React.Component {
	constructor(props) {
		super(props);
		
		this.app = this.props.app;
		this.getMvcMyPWAObject = this.app.getMvcMyPWAObject;

		this.connectionuuid = this.props.connectionuuid;
		this.currencyuuid = this.props.currencyuuid;

		this.state = {
			message_text: 'loading...',

			currency: null,

			balance_string: 'loading...',

			creditbalance: 'loading...',
			position: null,
			position_int: -1,
			position_string: 'loading...',

			address: null,
			address_string: 'loading...',

		}
	}

	// post render commit phase
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

	async checkNavigationState() {
		let mvcmypwa = this.getMvcMyPWAObject();

		let rootsessionuuid = this.props.rootsessionuuid;
		let walletuuid = this.props.currentwalletuuid;


		try {

			let message_text = 'This is a view of one of the address in your remote wallet. \
					To get a full view of the content of your wallet, you must directly open\
					the app that is managing this remote wallet. ';

			let currencyuuid = this.currencyuuid;
			let currency;
		
			if (currencyuuid) {
				currency = await mvcmypwa.getCurrencyFromUUID(rootsessionuuid, currencyuuid);
			}

			// find connection from connectionuuid
			let connection = await this._getRemoteConnection();

			let address;
			let web3providerurl;

			let address_string;
			let web3providerurl_string;

			let credits;
			let creditbalance;

			let position;
			let position_string;
			let position_int;


			if (connection) {
				let remoteaccount = connection.account;

				let card = await mvcmypwa.getCurrencyCardWithAddress(rootsessionuuid, walletuuid, currencyuuid,
					remoteaccount); // creates read-only card if necessary

				let scheme = await mvcmypwa.getSchemeInfo(rootsessionuuid, card.schemeuuid );

				credits = await mvcmypwa.getCreditBalance(rootsessionuuid, walletuuid, card.uuid);
				creditbalance = credits.transactionunits;
				credits.threshold = await mvcmypwa.getSchemeTransactionUnitsThreshold(rootsessionuuid, scheme.uuid);

				position = await mvcmypwa.getCurrencyPosition(rootsessionuuid, walletuuid, currencyuuid, card.uuid);
				position_string = await mvcmypwa.formatCurrencyAmount(rootsessionuuid, currencyuuid, position);
				position_int = await position.toInteger();

				// export
				address = card.address;
				web3providerurl = scheme.network.ethnodeserver.web3_provider_url;

				address_string = (address ? mvcmypwa.fitString(address, 32) : '');
				web3providerurl_string = (web3providerurl ? mvcmypwa.fitString(web3providerurl, 48) : '');
				

			}

			this.setState({message_text,
				currency,
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

		let mvcmypwa = this.getMvcMyPWAObject();

		mvcmypwa.unregisterEventListener('on_walletconnect_disconnected', this.uuid);
		mvcmypwa.unregisterEventListener('on_walletconnect_connected', this.uuid);

	}

	// events coming from walletconnect client in case it is doing the connect/disconnect
	async onWalletConnected(eventname, params) {
		console.log('RemoteWalletView.onWalletConnected called');
		try {

		}
		catch(e) {
			console.log('exception in RemoteWalletView.onWalletConnected: '+ e);
		}

		return;
	}

	async onWalletDisconnected(eventname, params) {
		console.log('RemoteWalletView.onWalletDisconnected called');

		try {
		}
		catch(e) {
			console.log('exception in RemoteWalletView.onWalletConnected: '+ e);
		}

		return;
	}

	async onShowRemoteWallet(eventname, params) {
		console.log('RemoteWalletView.onShowRemoteWallet called');
	}
	
	// rendering
	renderWalletViewView() {
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
		let {message_text} = this.state;

		return(
			<div className="Container">
			<div className="TitleBanner">
			<div className="Title">Remote Wallet</div>
			</div>

			{ this.renderWalletViewView()}

			<div className="TextBox">
				{message_text}
			</div>


			</div>

		);
	}
}


// propTypes validation
RemoteWalletView.propTypes = {
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
export {RemoteWalletView};
export default connect(mapStateToProps, mapDispatchToProps)(RemoteWalletView);