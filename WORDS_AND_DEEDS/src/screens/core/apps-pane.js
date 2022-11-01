import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';


class AppsPane extends React.Component {
	constructor(props) {
		super(props);
		
		this.app = this.props.app;

		this.getMvcMyPWAObject = this.app.getMvcMyPWAObject;
		this.getMvcMyDeedObject = this.app.getMvcMyDeedObject;
	}

	// utils
	async isInternalUrl(url) {
		let cleanurl = await this.app.getCleanUrl();

		if (url && (url.startsWith(cleanurl) === true)) {
			return true;
		}

		return false;
	
	}

	async getInternalUrlParams(url) {
		const URL = require("url");

		let {query} = URL.parse(url, true);

		return query;
	}

	// connection methods
	_getRemoteConnectionFromRpc(rpc) {
		return this.app.getDeedClientObject().getConnectionFromRpc(rpc);
	}

	// card methods
	async getCurrencyContext(currencyuuid) {
		let context = {remotewallet: false};
		try {
			let mvcmypwa = this.getMvcMyPWAObject();
			let mvcmydeed = this.getMvcMyDeedObject();
	
			let rootsessionuuid = this.props.rootsessionuuid;
			let walletuuid = this.props.currentwalletuuid;

			if (!walletuuid)
				return context; // no wallet open, we have no cards
	
			let currency = await mvcmypwa.getCurrencyFromUUID(rootsessionuuid, currencyuuid);

			// check if corresponding currency is set for remote
			let config = this.app.getConfig('remotewallet');	

			if (config && config.rpc && config.rpc[currency.uuid]) {
				let curr_rpc_config = config.rpc[currency.uuid];

				if (curr_rpc_config.enabled === true) {
					context.rpc = curr_rpc_config.rpc;

					// check if a remote wallet is connected
					context.connection = await this._getRemoteConnectionFromRpc(context.rpc);

					if (context.connection && context.connection.account) {
						context.remotewallet = true;
					}
				}
			}

		}
		catch(e) {
			console.log('exception in AppsPane.getCardContext: ' + e);
		}

		return context;
	}


	// erc721 methods
	async getBaseTokenURI(currencyuuid, cardaddress) {
		var basetokenuri = await this.app.getCleanUrl();

		basetokenuri += '?ccy=' + currencyuuid;
		basetokenuri += '&card=' + cardaddress;
		basetokenuri += '&tokenid=';

		return basetokenuri;
	}

	// ethereum methods
	async getTransactionInfo(schemeuuid, txhash) {

		var tx_info = {hash: txhash};

		let mvcmypwa = this.getMvcMyPWAObject();
		let mvcmydeed = this.getMvcMyDeedObject();
	
		let rootsessionuuid = this.props.rootsessionuuid;
		let walletuuid = this.props.currentwalletuuid;

		if (!walletuuid)
			return tx_info;

		if (!schemeuuid)
			return tx_info;


		try {
			// get transaction for more specific info
			let transaction = await mvcmydeed.getSchemeEthereumTransaction(rootsessionuuid, walletuuid, schemeuuid, txhash)
			.catch(err => {
				console.log('could not retrieve transaction in AppsPane.getTransactionInfo: ' + err);
			});
			let tx = (transaction ? transaction._ethtx : null);

			if (tx) {
				tx_info.time = tx.time;
				tx_info.status_int = 5; // pending

				// get transaction receipt
				let tx_receipt = await mvcmydeed.getSchemeEthereumTransactionReceipt(rootsessionuuid, walletuuid, schemeuuid, txhash).catch(err => {});

				if (tx_receipt) {
					tx_info.blockNumber = tx_receipt.blockNumber;
					tx_info.from_address = tx_receipt.from;
					tx_info.status = tx_receipt.status;
					tx_info.status_int = (tx_receipt.status ? 10 : -10); // 1 success, -1 fail
		
					// erc20 format
					tx_info.tokenaddress = tx_receipt.to
					tx_info.amount = (tx_receipt.logs && tx_receipt.logs[0] ? parseInt(tx_receipt.logs[0].data) : null);
					tx_info.to_address = (tx_receipt.logs && tx_receipt.logs[0] && tx_receipt.logs[0].topics && tx_receipt.logs[0].topics[2] ? '0x' + tx_receipt.logs[0].topics[2].substring(26) : null);
		
					if (tx_info.to_address) {
						let token = await mvcmydeed.getSchemeERC20TokenInfo(rootsessionuuid, walletuuid, schemeuuid, tx_info.tokenaddress);
						if (token) {
							let options = {showdecimals: true, decimalsshown: 2};
							tx_info.amount_string = (tx_info.amount != null ? await mvcmydeed.formatTokenAmountAsync(rootsessionuuid, tx_info.amount, token, options) : '');
						}
	
					}
				}
			}
			else {
				tx_info.status_int = -5; // not found
			}
		}
		catch(e) {
			console.log('exception in AppsPane.getTransactionInfo: ' + e);
		}

		return tx_info;
	}


	// deeds methods
	async getDeedCardContext(currencyuuid, minter, deed) {
		let context = {remotewallet: false};
		let deedcard;

		try {
			let mvcmypwa = this.getMvcMyPWAObject();
			let mvcmydeed = this.getMvcMyDeedObject();
	
			let rootsessionuuid = this.props.rootsessionuuid;
			let walletuuid = this.props.currentwalletuuid;

			if (!walletuuid)
				return context; // no wallet open, we have no cards
	
			let currency = await mvcmypwa.getCurrencyFromUUID(rootsessionuuid, currencyuuid);
	
			//deedcard = await mvcmydeed.getDeedOwningCard(rootsessionuuid, walletuuid, currencyuuid, minter, deed).catch(err => {});
			deedcard = await await mvcmypwa.getCurrencyCardWithAddress(rootsessionuuid, walletuuid, currencyuuid,
																				deed.owner); // creates read-only card if necessary

			// check if card is read-only
			let cansign = await mvcmydeed.canCardSign(rootsessionuuid, walletuuid, deedcard.uuid);

			if (!cansign) {
		
				// check if corresponding currency is set for remote
				let config = this.app.getConfig('remotewallet');	
	
				if (config && config.rpc && config.rpc[currency.uuid]) {
					let curr_rpc_config = config.rpc[currency.uuid];
	
					if (curr_rpc_config.enabled === true) {
						context.rpc = curr_rpc_config.rpc;
	
						// check if a remote wallet is connected
						context.connection = await this._getRemoteConnectionFromRpc(context.rpc);
	
						if (context.connection && context.connection.account) {
							let areequal = await mvcmypwa.areAddressesEqual(rootsessionuuid, context.connection.account, deedcard.address);
							if (areequal) {
								// we are connected to a remote wallet supporting this
								// currency's rpc and having this card address

								// we connect the card
								await mvcmydeed.connectCard(rootsessionuuid, walletuuid, deedcard.uuid, context.connection);
								
								context.remotewallet = true;
							}
							else {
								deedcard = null;
							}
						}
						else {
							deedcard = null;
						}
	
					}
					else {
						deedcard = null;
					}
				}
				else {
					deedcard = null;
				}
	
			}
	
		}
		catch(e) {
			console.log('exception in DeedClient.getDeedOwningCard: ' + e);
		}

		context.deedcard = deedcard;

		return context;
	}

	async turnToLocalUri(uri) {
		if (!uri)
			return uri;

		let _uri;
		const cleanUrl = await this.app.getCleanUrl();

		if (!uri.startsWith(cleanUrl)) {
			let parts = uri.split('?');

			_uri = cleanUrl + (parts.length > 1 ? '?' + parts[1] : '');
		}
		else {
			_uri = uri;
		}

		return _uri;
	}

	// post render commit phase
	componentDidMount() {
		// register to app
		this.app.setVariable('AppsPane',this);
	}

	// end of life
	componentWillUnmount() {
		console.log('AppsPane.componentWillUnmount called');
		
		// unregister from app
		this.app.setVariable('AppsPane',null);
	}

	render() {
		return (
			<div className="AppsPane">
			{this.props.children}
			</div>
		);
	}
}

// propTypes validation
AppsPane.propTypes = {
	app: PropTypes.object.isRequired,
	rootsessionuuid: PropTypes.string,
	currentwalletuuid: PropTypes.string,
	iswalletlocked: PropTypes.bool,
};

//redux
const mapStateToProps = (state) => {
	return {
		rootsessionuuid: state.session.sessionuuid,
		pending: state.login.pending,
		success: state.login.success,
		lasterror: state.login.error,
		currentwalletuuid: state.wallets.walletuuid,
		iswalletlocked: state.wallets.islocked,
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
	};
}

export {AppsPane};
export default connect(mapStateToProps, mapDispatchToProps)(AppsPane);
