
import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';


class CeloTransactionView extends React.Component {
	constructor(props) {
		super(props);
		
		this.app = this.props.app;
		this.parent = this.props.parent;

		this.rpc = this.props.rpc;

		this.getMvcMyPWAObject = this.app.getMvcMyPWAObject;
		
		this.uuid = this.app.guid();

		this.checking = false;

		this.currencies = [];

		this.state = {
			loaded: false,

			kit: null,

			provider: null,
			account: null,

			to_address: null,
			transfer_amount_string: null,

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



	async checkNavigationState() {
		this.checking = true;

		try {

			// get list of currencies for celo
			this.currencies = await this._getCurrencies();

			this.setState({loaded: true});

		}
		catch(e) {
			console.log('exception in CeloTransactionView.checkNavigationState: '+ e);
		}
		finally {
			this.checking = false;
		}


	}


	componentDidMount() {
		console.log('CeloTransactionView.componentDidMount called');

		let mvcmypwa = this.getMvcMyPWAObject();

		mvcmypwa.registerEventListener('on_walletconnect_connected', this.uuid, this.onWalletConnected.bind(this));
		mvcmypwa.registerEventListener('on_walletconnect_disconnected', this.uuid, this.onWalletDisconnected.bind(this));

		mvcmypwa.registerEventListener('on_celo_send', this.uuid, this.send.bind(this));

		this.checkNavigationState().catch(err => {console.log('error in checkNavigationState: ' + err);});
	}

	// end of life
	componentWillUnmount() {
		console.log('CeloTransactionView.componentWillUnmount called');

		let mvcmypwa = this.getMvcMyPWAObject();

		mvcmypwa.unregisterEventListener('on_celo_send', this.uuid);

		mvcmypwa.unregisterEventListener('on_walletconnect_disconnected', this.uuid);
		mvcmypwa.unregisterEventListener('on_walletconnect_connected', this.uuid);

	}
		
	// events coming from wallet connect diget
	async onWalletConnected(eventname, params) {
		console.log('CeloTransactionView.onWalletConnected called');

		let balances = {};

		let mvcmypwa = this.getMvcMyPWAObject();

		let rootsessionuuid = this.props.rootsessionuuid;
		let walletuuid = this.props.currentwalletuuid;

		try {
			let card_address = params.account;

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
			console.log('exception in CeloTransactionView.onWalletConnected: '+ e);
		}


		this.setState({provider: params.provider, account: params.account, balances, message: 'waiting for action...'})

		return;
	}

	async onWalletDisconnected(eventname, params) {
		console.log('CeloTransactionView.onWalletDisconnected called');

		this.setState( {kit: null, provider: null, account: null, balances: {}, message: 'waiting for connection...'});

		return;
	}


	// user actions
	async connect() {
		try {
			let mvcmypwa = this.getMvcMyPWAObject();
			
			mvcmypwa.signalEvent('on_walletconnect_connect');

			let now = Date.now();
			let time_string = mvcmypwa.formatDate(now/1000, 'YYYY-mm-dd HH:MM:SS');

			this.setState({
				message: 'returning from connect at ' + time_string});
		}
		catch(e) {
			console.log('exception in CeloTransactionView.connect: '+ e);
		}
	}

	async disconnect() {
		try {
			let mvcmypwa = this.getMvcMyPWAObject();
			
			mvcmypwa.signalEvent('on_walletconnect_disconnect');

			let now = Date.now();
			let time_string = mvcmypwa.formatDate(now/1000, 'YYYY-mm-dd HH:MM:SS');

			this.setState({
				message: 'returning from disconnect at ' + time_string});
		}
		catch(e) {
			console.log('exception in CeloTransactionView.connect: '+ e);
		}
	}

	// actions
	_getCTokenCode(currency) {
		if (!currency)
			return 'cUSD';

		let tokenaddress = currency.address.toLowerCase();

		switch(tokenaddress) {
			case '0x765de816845861e75a25fca122bb6898b8b1282a': // mainnet
			case '0x874069fa1eb16d44d622f2e0ca25eea172369bc1': // alfajores
				return 'cUSD';

			case '0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73': // mainnet
			case '0x10c892a6ec43a53e45d0b916b4b7d383b1b78c0f': // alfajores
				return 'cEUR';

			default:
				return 'cUSD';
		}
	}

	async send(eventname, params) {
		try {
			this.setState({message: 'requesting transaction to connected wallet...'});

			let {account, provider} = this.state;

			let mvcmypwa = this.getMvcMyPWAObject();

			let rootsessionuuid = this.props.rootsessionuuid;
			let walletuuid = this.props.currentwalletuuid;

			let currency = params.currency;
			
			let to_address = (params.to_address ? params.to_address : null);
			let transfer_amount = (params.transfer_amount ? params.transfer_amount : 0);
			
			let callback_url = (params.callback_url ? params.callback_url : null);

			// format transfer_amount to float string using currency
			let decimalamount_string = '0.00';

			if (currency) {
				let decimals = parseInt(currency.decimals);
				let decimalamount = await mvcmypwa.getDecimalAmount(rootsessionuuid, transfer_amount, decimals);
				decimalamount_string = await decimalamount.toFixedString();
			}
			
			// display requested transaction details
			let tokenamount = await mvcmypwa.getCurrencyAmount(rootsessionuuid, currency.uuid, decimalamount_string);
			let transfer_amount_string = await mvcmypwa.formatCurrencyAmount(rootsessionuuid, currency.uuid, tokenamount);

			this.setState({to_address, transfer_amount_string});

			// check account has enough funds
			let card = await mvcmypwa.getCurrencyCardWithAddress(rootsessionuuid, walletuuid, currency.uuid, account);

			if ((card) && (currency)) {
				let transfer_amount_int = parseInt(transfer_amount);

				let carduuid = card.uuid;
				let currencyuuid = currency.uuid;

				let scheme = await mvcmypwa.getSchemeInfo(rootsessionuuid, card.schemeuuid );

				let credits = await mvcmypwa.getCreditBalance(rootsessionuuid, walletuuid, carduuid);
				let creditbalance = credits.transactionunits;
				credits.threshold = await mvcmypwa.getSchemeTransactionUnitsThreshold(rootsessionuuid, scheme.uuid);

				let position = await mvcmypwa.getCurrencyPosition(rootsessionuuid, walletuuid, currencyuuid, carduuid);
				let position_string = await mvcmypwa.formatCurrencyAmount(rootsessionuuid, currencyuuid, position);
				let position_int = await position.toInteger();

				if (transfer_amount_int >= position_int) {
					this.app.alert('The wallet you are connected to has not enough funds to proceed with the transaction: ' + transfer_amount_string);
					
					let ret = {success: false};

					if (params && params.callback) {
						params.callback(null, ret);
					}
			
					return ret;				
				}

			}

			// use contractKit to create raw transaction and request execution by connected wallet
			const Web3 = require('web3');
			const newKitFromWeb3 = require('@celo/contractkit').newKitFromWeb3;

			const web3 = new Web3(provider);
			let kit = newKitFromWeb3(web3);
		
			kit.defaultAccount = account;

			let stable_amount = kit.web3.utils.toWei(decimalamount_string, 'ether');

			const _ctokencode = this._getCTokenCode(currency);
			const stabletoken = await kit.contracts.getStableToken(_ctokencode);

			const tx = await stabletoken.transfer(to_address, stable_amount).send({feeCurrency: stabletoken.address});
			const tx_receipt = await tx.waitReceipt();

			let tx_info = {};

			if (tx_receipt) {
				tx_info.hash = tx_receipt.transactionHash;

				tx_info.blockNumber = tx_receipt.blockNumber;
				tx_info.from_address = tx_receipt.from;
				tx_info.status = tx_receipt.status;
				tx_info.status_int = (tx_receipt.status ? 10 : -10); // 1 success, -1 fail

				// if we have a callback url, we send it the transaction hash
				let txhash_payment = tx_info.hash;

				if (callback_url) {
					try {
						// transaction hash
						let _url = callback_url;
	
						if (_url.includes('?') !== true) {
							_url += '?tx=' + txhash_payment;;
						}
						else {
							// transaction hash
							_url += '&tx=' + txhash_payment;
						}
	
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
	
					}
					catch(e) {
						console.log('exception in CurrencyCardView.onTransfer notifying callback: ' + e);
					}
				}

				let ret = {success: true, tx_info};

				if (params && params.callback) {
					params.callback(null, ret);
				}
		
				return ret;
			}

		}
		catch(e) {
			console.log('exception in CeloTransactionView.send: '+ e);
		}

		let ret = {success: false};

		if (params && params.callback) {
			params.callback(null, ret);
		}

		return ret;
	}
	
	// rendering
	renderRemoteCardPart() {
		const {account, balances} = this.state;

		return (
			<div>
				{(account ? 
				this.currencies.map((currency, index) => {
					let balance = balances[currency.uuid];
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
						</FormGroup>
						<div className="Separator">&nbsp;</div>
						</div>	
					);
				}) :
				<></>)}
				

			</div>

		);
	}

	renderTransferRequest() {
		let { to_address, transfer_amount_string } = this.state;

		return (
			<div>
			<FormGroup controlId="transferto">
				<FormLabel>Transfer to address</FormLabel>
				<FormGroup className="ClaimerCardLine">
					<FormControl
						disabled
						autoFocus
						type="text"
						value={(to_address ? to_address : '')}
					/>
				</FormGroup>
			</FormGroup>
			<FormGroup controlId="transfer">
				<FormLabel>currency amount</FormLabel>
				<FormGroup className="ClaimerCardLine">
					<FormControl
						disabled
						autoFocus
						type="text"
						value={(transfer_amount_string ? transfer_amount_string : '')}
					/>

				</FormGroup>
			</FormGroup>			
			</div>		
		);
	}

	render() {
		let {message, error} = this.state;

		return(
			<div className="Form">
				{this.renderRemoteCardPart()}
				{this.renderTransferRequest()}
				{(error ? 
					<div className='ActionError'>{error}</div>	: 
					<div>{(message ? message : 'processing...')}</div>
				)}
			</div>

		);
	}
}

// propTypes validation
CeloTransactionView.propTypes = {
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


export {CeloTransactionView};
export default connect(mapStateToProps, mapDispatchToProps)(CeloTransactionView);