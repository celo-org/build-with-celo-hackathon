import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';


class CeloWalletView extends React.Component {
	constructor(props) {
		super(props);
		
		this.app = this.props.app;
		this.parent = this.props.parent;

		this.rpc = this.props.rpc;

		this.account = this.props.account;


		this.getMvcMyPWAObject = this.app.getMvcMyPWAObject;
		
		this.uuid = this.app.guid();

		this.checking = false;

		this.currencies = [];

		this.state = {
			loaded: false,

			balances: {},

			message: 'waiting for connection...',
			error: null
		};

	}

	async _getCurrencies() {
		let currencies = [];

		let config = this.app.getConfig('remotewallet');

		let rootsessionuuid = this.props.rootsessionuuid;
		let walletuuid = this.props.currentwalletuuid;


		if (config && config.rpc) {
			let mvcmypwa = this.getMvcMyPWAObject();

			let arr = Object.keys(config.rpc);

			for (var i = 0; i < arr.length; i++) {
				let curr_rpc_config = config.rpc[arr[i]];

				if (curr_rpc_config.enabled === true) {
					let currency = await  mvcmypwa.getCurrencyFromUUID(rootsessionuuid, arr[i]);

					if (currency)
					currencies.push(currency);
				}
			}
		}

		return currencies
	}

	async _getBalances() {
		let balances = {};

		let mvcmypwa = this.getMvcMyPWAObject();

		let rootsessionuuid = this.props.rootsessionuuid;
		let walletuuid = this.props.currentwalletuuid;

		try {
			let card_address = this.account;

			if (card_address) {
				for (var i = 0; i < (this.currencies ? this.currencies.length : 0); i++) {
					let currency = this.currencies[i];
					let card = await mvcmypwa.getCurrencyCardWithAddress(rootsessionuuid, walletuuid, currency.uuid,
						 													card_address); // creates read-only card if necessary
							
					const credits = await mvcmypwa.getCreditBalance(rootsessionuuid, walletuuid, card.uuid);
					const creditbalance = credits.transactionunits;
	
					const position = await mvcmypwa.getCurrencyPosition(rootsessionuuid, walletuuid, currency.uuid, card.uuid);
					const position_string = await mvcmypwa.formatCurrencyAmount(rootsessionuuid, currency.uuid, position);
					const position_int = await position.toInteger();
	
					balances[currency.uuid] = {creditbalance, position_string};
				}
			}
		}
		catch(e) {
			console.log('exception in CeloWalletView.onWalletConnected: '+ e);
		}

		return balances;
	}


	// post render commit phase
	async checkNavigationState() {
		this.checking = true;

		try {

			// get list of currencies for celo
			this.currencies = await this._getCurrencies();

			// is connected?
			let connection_status = await this._retrieveWalletConnectionStatus();

			this.account = connection_status.account;

			// check balances
			let balances = await this._getBalances();


			this.setState({loaded: true, balances});

		}
		catch(e) {
			console.log('exception in CeloWalletView.checkNavigationState: '+ e);
		}
		finally {
			this.checking = false;
		}

	}

	componentDidMount() {
		console.log('CeloWalletView.componentDidMount called');

		let mvcmypwa = this.getMvcMyPWAObject();

		mvcmypwa.registerEventListener('on_walletconnect_connected', this.uuid, this.onWalletConnected.bind(this));
		mvcmypwa.registerEventListener('on_walletconnect_disconnected', this.uuid, this.onWalletDisconnected.bind(this));

		this.checkNavigationState().catch(err => {console.log('error in checkNavigationState: ' + err);});
	}

	// end of life
	componentWillUnmount() {
		console.log('CeloWalletView.componentWillUnmount called');

		let mvcmypwa = this.getMvcMyPWAObject();

		mvcmypwa.unregisterEventListener('on_walletconnect_disconnected', this.uuid);
		mvcmypwa.unregisterEventListener('on_walletconnect_connected', this.uuid);

	}


	// calling a wallet connect client
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
			
		
	// events coming from wallet connect diget
	async onWalletConnected(eventname, params) {
		console.log('CeloWalletView.onWalletConnected called');

		this.account = params.account;

		let balances = await this._getBalances()

		this.setState({balances, message: 'waiting for action...'})

		return;
	}

	async onWalletDisconnected(eventname, params) {
		console.log('CeloWalletView.onWalletDisconnected called');

		this.setState( {balances: {}, message: 'waiting for connection...'});

		return;
	}



	// rendering
	renderRemoteCardPart() {
		const {balances} = this.state;

		return (
			<div>
				{(this.account ? 
				this.currencies.map((currency, index) => {
					let balance = balances[currency.uuid];
					return (
						<div key={currency.uuid} className="Form">
							{(balance ?
							<FormGroup className="CurrencyCard" controlId="balance">
								<span>
									<FormLabel># credit units</FormLabel>
									<FormControl
										className="CurrencyCardBalance"
										disabled
										autoFocus
										type="text"
										value={balance.creditbalance}
									/>
								</span>
								<span>
									<FormLabel>Balance</FormLabel>
									<FormControl
										className="CurrencyCardBalance"
										disabled
										autoFocus
										type="text"
										value={balance.position_string}
									/>
								</span>
							</FormGroup> :
							<></>
							)}
						<div className="Separator">&nbsp;</div> 
						</div>	
					);
				}) :
				<></>)}
				

			</div>

		);
	}

	render() {
		let {message, error} = this.state;

		return(
			<div className="Form">
				{this.renderRemoteCardPart()}
				{(error ? 
					<div className='ActionError'>{error}</div>	: 
					<div>{(message ? message : 'processing...')}</div>
				)}
			</div>

		);
	}
}

// propTypes validation
CeloWalletView.propTypes = {
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


export {CeloWalletView};
export default connect(mapStateToProps, mapDispatchToProps)(CeloWalletView);