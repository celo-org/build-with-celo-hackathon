import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown, DropdownButton, FormGroup, FormControl, FormLabel, InputGroup } from 'react-bootstrap';

import PropTypes from 'prop-types';

import { Dots } from 'react-activity';

import { faCopy, faUndo} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import QRCodeReact from 'qrcode.react';

import {CurrencyCardIcon} from '@primusmoney/react_pwa/react-js-ui';
import RemoteWalletIcon from '../../remote-wallet/remote-wallet-icon.js'

class DeedSellForm extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.app = this.props.app;
		this.parent = this.props.parent;
		
		this.getMvcMyPWAObject = this.app.getMvcMyPWAObject;
		this.getMvcMyDeedObject = this.app.getMvcMyDeedObject;

		this.dataobject = null;

		this.minter = null;
		this.deed = null;

		
		let mintername = '';

		let title = '';
		let description = '';

		let saleprice = '';

		let currency = {symbol: ''};

		let signingkey = null;
		let deedcard = null;
		let deedcard_balance_int = 0;
		let deedcard_balance_string = '';
		let deedcard_creditunits = '';

		
		this.closing = false;
		
		this.state = {
			mintername,

			title,
			description,

			saleprice,
			canbelisted: false,

			currency,

			signingkey,
			isOwner: false,

			remotewallet: false,
			rpc: null,
			connection: null,

			deedcard,
			deedcard_balance_int,
			deedcard_balance_string,
			deedcard_creditunits,

			sell_mode: null,
			pay_url: null,

			loaded: false,
			registration_text: 'loading...',
			message_text: 'loading...',
			sharelinkmessage: 'loading...',
			sharelink: 'loading...',
			processinginfo: 'processing transfer',
			processing: false

		}
	}


	_setState(state) {
		if (this.closing !== true)
		this.setState(state);
	}

	// deed and connection methods
	_getRemoteConnectionFromRpc(rpc) {
		return this.app.getDeedClientObject().getConnectionFromRpc(rpc);
	}

	async _getBaseTokenURI(currencyuuid, cardaddress) {
		let uri = await this.app.getVariable('AppsPane').getBaseTokenURI(currencyuuid, cardaddress);

		return uri;
	}

	async _getDeedOwningCard(currencyuuid, minter, deed) {
		let context = await this.app.getVariable('AppsPane').getDeedCardContext(currencyuuid, minter, deed);

		this._setState({remotewallet: context.remotewallet, rpc: context.rpc, connection: context.connection});

		return context.deedcard;
	}

	async _canCompleteTransaction(carduuid, tx_fee, feelevel) {
		if (this.state.remotewallet && this.state.remotecreate) {
			let {card_creditunits} = this.state;

			tx_fee.required_units = tx_fee.estimated_cost_units;
			tx_fee.estimated_fee = {};

			tx_fee.estimated_fee.max_credits = 0; // not computed, but must be present
			tx_fee.estimated_fee.execution_credits = 0; // not computed, but must be present
			tx_fee.estimated_fee.execution_units = tx_fee.estimated_cost_units;

			if (card_creditunits > tx_fee.required_units)
				return true;
			else
				return false;
		}

		let mvcmypwa = this.getMvcMyPWAObject();

		let rootsessionuuid = this.props.rootsessionuuid;
		let walletuuid = this.props.currentwalletuuid;

		var canspend = await mvcmypwa.canCompleteTransaction(rootsessionuuid, walletuuid, carduuid, tx_fee, feelevel).catch(err => {});

		return canspend;
	}

	
	// post render commit phase
	componentDidMount() {
		console.log('DeedSellForm.componentDidMount called');
		
		let mvcmypwa = this.getMvcMyPWAObject();

		let registration_text = mvcmypwa.t('This deed has been registered.');

		let message_text = mvcmypwa.t(
			'This deed represents some rights that are potentially conferred to the owner of the deed. \
			Ownership can be asserted by the possession of the private key registered as owner of the deed. \
			If you haven\'t yet provided a private key for the corresponding currency, \
			you can add your private key through the currency cards menu. \
			If you provide a private key, it will be crypted and stored on your device, it will not leave \
			your device at any time and will not be shared with anyone. \
			This deed is registered and is accessible to anyone by clicking on \
			the link that has been generated. \
			Send this link to anyone to share the exact description of this deed.');
	
		let sharelinkmessage = mvcmypwa.t('You can share this deed with the following link:');
		
		
		this._setState({registration_text, message_text, sharelinkmessage});

		this.checkNavigationState().catch(err => {console.log('error in DeedSellForm.checkNavigationState: ' + err);});
	}


	async checkNavigationState() {
		let mvcmypwa = this.getMvcMyPWAObject();
		let mvcmydeed = this.getMvcMyDeedObject();

		let rootsessionuuid = this.props.rootsessionuuid;
		let walletuuid = this.props.currentwalletuuid;

		let app_nav_state = this.app.getNavigationState();
		let app_nav_target = app_nav_state.target;

		if (app_nav_target && (app_nav_target.route == 'deed') && (app_nav_target.reached == false)) {
			var params = app_nav_target.params;
			var dataobj = params.dataobject;

			if (dataobj && (dataobj.type === 'deed') && (dataobj.treated !== true)) {
				this.dataobject = dataobj;

				let currencyuuid = params.currencyuuid;
				let txhash = params.txhash;

				let minter_address = params.address;
				let tokenid = params.tokenid;

				// we fetch the deed to have a proper record
				let minter = await mvcmypwa.fetchDeedMinterFromAddress(rootsessionuuid, walletuuid, currencyuuid, minter_address);

				if (!minter)
					throw 'could not find minter with address ' + minter_address;

				this.minter = minter;
				let mintername = minter.name;

				let deed = await mvcmypwa.fetchDeed(rootsessionuuid, walletuuid, currencyuuid, minter, tokenid);
				this.deed = deed;

				// check if deed can be listed on a marketplace
				let canbelisted = false;
				let listing_info = await mvcmydeed.getDeedSaleInfo(rootsessionuuid, walletuuid, currencyuuid, minter, deed).catch(err => {});

				if (listing_info) {
					if (listing_info.onsale === true) {
						// we shouldn't be here
						return this.onBack();
					}

					if (listing_info.canbelisted === true)
					canbelisted = true;
				}


				// time
				let registration_time = (deed.metadata ? deed.metadata.time/1000 : null);
				let registration_text = mvcmypwa.t('This deed has been registered on');

				registration_text += ' ' + mvcmypwa.formatDate(registration_time, 'YYYY-mm-dd HH:MM:SS') + '.';
				
	
				// share link
				let currency = await mvcmypwa.getCurrencyFromUUID(rootsessionuuid, currencyuuid)
				.catch(err => {
					console.log('error in DeedSellForm.checkNavigationState: ' + err);
				});

				if (!currency)
					return Promise.reject('could not find currency ' + currencyuuid);
	
				var sharelink = await this.app.getShareLink(txhash, currency.uuid);
	
				let isOwner = false;
				
				let deedcard = await this._getDeedOwningCard(currencyuuid, minter, deed).catch(err => {});
				let deedcard_balance_int = 0;
				let deedcard_balance_string = '';
				let deedcard_creditunits = '';

				if (deedcard) {
					isOwner = true;
					let pos = await mvcmypwa.getCurrencyPosition(rootsessionuuid, walletuuid, currencyuuid, deedcard.uuid);
			
					if (pos !== undefined) {
						deedcard_balance_int = await pos.toInteger();
						deedcard_balance_string = await mvcmypwa.formatCurrencyAmount(rootsessionuuid, currencyuuid, pos);
					}
	
					let credits = deedcard_creditunits = await mvcmypwa.getCreditBalance(rootsessionuuid, walletuuid, deedcard.uuid);
					deedcard_creditunits = credits.transactionunits;
	
				}

				this._setState({currency, mintername, 
					isOwner,
					deedcard, deedcard_balance_int, deedcard_balance_string, deedcard_creditunits,
					registration_text, sharelink});

				dataobj.viewed = true;
			}

			// mark target as reached
			app_nav_target.reached = true;
		}

		if (this.deed) {
			let deed = this.deed;

			let tokenuri = deed.tokenuri;

			let title = (deed.metadata && deed.metadata.title ? deed.metadata.title : '');
			let description = (deed.metadata && deed.metadata.description ? deed.metadata.description : '');
			let external_url = (deed.metadata && deed.metadata.external_url ? deed.metadata.external_url : '');

			this._setState({tokenuri, title, description, external_url});
		}

		this._setState({loaded: true});
	}

 	// end of life
	componentWillUnmount() {
		console.log('DeedSellForm.componentWillUnmount called');
		
		this.closing = true;
	}
	
	
	// user actions
	async onBuildQRCode() {
		console.log('onBuildQRCode pressed!');

		let mvcmypwa = this.getMvcMyPWAObject();
		let mvcmydeed = this.getMvcMyDeedObject();

		let rootsessionuuid = this.props.rootsessionuuid;
		let walletuuid = this.props.currentwalletuuid;

		let {currency, deedcard, saleprice} =this.state;

		
		this._setState({processing: true});

		try {
			if (!this.deed) {
				this.app.alert('No deed selected');
				this._setState({processing: false});
				return;
			}

			if (!saleprice || (saleprice.length == 0)) {
				this.app.alert('You need to enter a price you want for this deed');
				this._setState({processing: false});
				return;
			}
	
			let pay_url = this.deed.tokenuri;

			pay_url += '&route=deedview&action=buy&mode=qrcode';

			let tokenamount = await mvcmypwa.getCurrencyAmount(rootsessionuuid, currency.uuid, saleprice);
			let tokenamount_int = await tokenamount.toInteger();

			pay_url += '&amount=' + tokenamount_int;


			this._setState({sell_mode: 'qrcode', pay_url});

		}
		catch(e) {
			console.log('exception in onBuildQRCode: ' + e);
			this.app.error('exception in onBuildQRCode: ' + e);

			this.app.alert('could not set price of deed')
		}

		this._setState({processing: false});


	}

	async onOfferOnSale() {
		console.log('onOfferOnSale pressed!');
		
		let mvcmypwa = this.getMvcMyPWAObject();
		let mvcmydeed = this.getMvcMyDeedObject();

		let rootsessionuuid = this.props.rootsessionuuid;
		let walletuuid = this.props.currentwalletuuid;
		
		let wallet;
		let carduuid;
		let card;

		let {currency, saleprice, deedcard, signingkey} =this.state;

		this._setState({processing: true});

		try {
			if (!saleprice || (saleprice.length == 0)) {
				this.app.alert('You need to enter a price you want for this deed');
				this._setState({processing: false});
				return;
			}
	
			// get wallet details
			wallet = await mvcmypwa.getWalletInfo(rootsessionuuid, walletuuid);

			if (deedcard) {
				card = deedcard;
				carduuid = deedcard.uuid;
			}
			else {
				if (signingkey) {
					let currencyuuid = currency.uuid;
					let options = {maincard: true, allow_readonly: true};
		
					card = await this.app.createCurrencyCard(currencyuuid, signingkey, options)
					.catch(err => {
						console.log('error in ClauseCreateForm.onSubmit: ' + err);
					});
	
					if (!card) {
						this.app.alert('could not create card from private key');
						this._setState({processing: false});
						return;
					}
				}
				else {
					this.app.alert('You need to provide your private key for ' + currency.name + ' in order to being able to transfer this deed');
					this._setState({processing: false});
					return;
				}
		
			}

			// register the sell offer
			let minter = this.minter;
			let deed = this.deed;

			// check we have enough transaction credits
			let tx_fee = {};
			tx_fee.transferred_credit_units = 0;
			let listing_deed_cost_units = (currency.deeds_v1.listing_deed_cost_units ? parseInt(currency.deeds_v1.listing_deed_cost_units) : 4);
			tx_fee.estimated_cost_units = listing_deed_cost_units;

			let _feelevel = await mvcmypwa.getRecommendedFeeLevel(rootsessionuuid, walletuuid, deedcard.uuid, tx_fee);

			let canspend = await this._canCompleteTransaction(deedcard.uuid, tx_fee, _feelevel).catch(err => {});

			if (!canspend) {
				if (tx_fee.estimated_fee.execution_credits > tx_fee.estimated_fee.max_credits) {
					this.app.alert('The execution of this transaction is too large: ' + tx_fee.estimated_fee.execution_units + ' credit units.');
					this._setState({processing: false});
					return;
				}
				else {
					this.app.alert('You must add transaction units to the source card. You need at least ' + tx_fee.required_units + ' credit units.');
					this._setState({processing: false});
					return;
				}
			}
			

			let tokenamount = await mvcmypwa.getCurrencyAmount(rootsessionuuid, currency.uuid, saleprice);
			let tokenamount_int = await tokenamount.toInteger();

			let txhash = await mvcmydeed.offerDeedOnSale(rootsessionuuid, walletuuid, currency.uuid, minter, deed, tokenamount_int, _feelevel);

			if (!txhash) {
				this.app.alert('Could not offer deed on sale at this time');
				this.setState({processing: false});
				return;
			}


		}
		catch(e) {
			console.log('exception in onOfferOnSale: ' + e);
			this.app.error('exception in onOfferOnSale: ' + e);

			this.app.alert('could not set price of deed')
		}

		this._setState({processing: false});


	}

	async onBack() {
		console.log('onBack pressed!');

		let currencyuuid = this.deed.currencyuuid;
		let txhash = this.deed.txhash;
		let address = this.deed.minter;
		let tokenid = this.deed.tokenid;
		
		let params = {action: 'view', currencyuuid, txhash, address, tokenid, dataobject: this.deed};

		this.app.gotoRoute('deed', params);
	}


	async onShareLinkClick() {
		const {sharelink} = this.state;
		
		// create a textarea on the fly, then remove it to
		// be able to copy to clipboard
		var textArea = document.createElement("textarea");
		textArea.value = sharelink;

		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand("Copy");
		textArea.remove();

		this.app.alert("Share link has been copied to clipboard");
	}

	async onTokenURIClick() {
		const {tokenuri} = this.state;
		
		// create a textarea on the fly, then remove it to
		// be able to copy to clipboard
		var textArea = document.createElement("textarea");
		textArea.value = tokenuri;

		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand("Copy");
		textArea.remove();

		this.app.alert("Token URI has been copied to clipboard");
	}

	async onExternalURLClick() {
		const {external_url} = this.state;
		
		// create a textarea on the fly, then remove it to
		// be able to copy to clipboard
		var textArea = document.createElement("textarea");
		textArea.value = external_url;

		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand("Copy");
		textArea.remove();

		this.app.alert("Asset url has been copied to clipboard");
	}

	
	// rendering
	renderDeedCardPart() {
		let { currency, remotewallet, connection, deedcard, signingkey, deedcard_balance_string, deedcard_creditunits } = this.state;

		return (
			<span>
				{( remotewallet !== true ?
					(deedcard ?
					<FormGroup className="CurrencyCard" controlId="currencycard">
						<span className="CardIconCol">
							<CurrencyCardIcon
								app={this.app}
								currency={currency}
								card={deedcard}
							/>
						</span>
						<span className="CardBalanceCol">
							<FormLabel># credit units</FormLabel>
							<FormControl
								className="CardBalanceCol"
								disabled
								autoFocus
								type="text"
								value={deedcard_creditunits}
							/>
						</span>
					</FormGroup> :
					<FormGroup controlId="signingkey">
						<FormLabel>'Your Private Key '{(currency && currency.name ? 'for ' + currency.name : '')}</FormLabel>
						<FormGroup>
							<FormControl
								autoFocus
								type="text"
								value={(signingkey ? signingkey : '')}
								onChange={e => this._setState({signingkey: e.target.value})}
							/>
						</FormGroup>
					</FormGroup>) :

					<FormGroup className="CurrencyCard" controlId="remotewallet">
					<span className="CardIconCol">
						<RemoteWalletIcon
								app={this.app}
								currency={currency}
								connection={connection}
							/>
					</span>
					<span className="CardBalanceCol">
						<FormLabel># credit units</FormLabel>
						<FormControl
							className="CardBalanceCol"
							disabled
							autoFocus
							type="text"
							value={deedcard_creditunits}
						/>
					</span>
					</FormGroup>
				)}
			</span>

		);
	}

	renderDeedButtons() {
		let { loaded, isOwner, canbelisted} = this.state;

		if (loaded) {
			return(
				<div>
				<span>
				<Button className="DeedButton" onClick={this.onBuildQRCode.bind(this)} disabled={(isOwner ? false : true)} type="submit">
				QR Code</Button>
				</span>
				<span>
				{(canbelisted ? 
				<Button className="DeedButton" onClick={this.onOfferOnSale.bind(this)} disabled={(isOwner ? false : true)} type="submit">
				Offer on sale</Button> :
				<Button disabled type="submit">
				Offer on sale</Button>)}
				</span>
				</div>
			);
		}
		else {
			return(	
				<div>
				<span>
				<Button className="DeedButton" disabled type="submit">
					loading...
				</Button>
				</span>
				<span>
				<Button className="DeedButton" disabled type="submit">
					loading...
				</Button>
				</span>
				</div>
			);
		}
	}

	renderDeedSellForm() {
		let { mintername, title, description, currency, registration_text, message_text,
			sharelinkmessage, sharelink,
			sell_mode, pay_url,
			saleprice, external_url } = this.state;
		
		return (
			<div className="Form">
				<FormGroup controlId="mintername">
				  <FormLabel>Minter Name</FormLabel>
				  <FormControl
					disabled
					autoFocus
					type="text"
					value={mintername}
					onChange={e => this._setState({mintername: e.target.value})}
				  />
				</FormGroup>

				<FormGroup controlId="title">
				  <FormLabel>Deed Title</FormLabel>
				  <FormControl
					disabled
					autoFocus
					type="text"
					value={title}
					onChange={e => this._setState({title: e.target.value})}
				  />
				</FormGroup>

				{(!sell_mode || (sell_mode != 'qrcode') ?
				<>
					<FormGroup controlId="description">
					<FormLabel>Description</FormLabel>
					<FormControl 
					disabled
					as="textarea" 
					rows="5" 
					autoFocus
					type="text"
					value={description}
					onChange={e => this._setState({description: e.target.value})}
					/>
					</FormGroup>

					{this.renderDeedCardPart()}
					
					<FormGroup controlId="title">
						<FormLabel>Enter sale price</FormLabel>
						<FormControl
						autoFocus
						type="text"
						value={saleprice}
						onChange={e => this._setState({saleprice: e.target.value})}
						/>
					</FormGroup>
				</>	:
				<QRCodeReact
				value={pay_url}
				renderas='svg'
				size={360}
				includeMargin={true}
				/>
				)}


				<FormGroup controlId="asseturl">
				  <FormLabel>Asset url</FormLabel>
				  <div className="ShareBlock">
				  <span className="ShareLink" onClick={this.onExternalURLClick.bind(this)}>{external_url}</span>
				  <span className="ShareIcon" onClick={this.onExternalURLClick.bind(this)}><FontAwesomeIcon icon={faCopy} /></span>
				  </div>
				</FormGroup>

				{this.renderDeedButtons()}

				<div className="TextBox">
				  {registration_text}
			  	</div>

				<div className="TextBox">
					<div>{sharelinkmessage}</div>
					<div className="ShareBlock">
					<span className="ShareLink" onClick={this.onShareLinkClick.bind(this)}>{sharelink}</span>
					<span className="ShareIcon" onClick={this.onShareLinkClick.bind(this)}><FontAwesomeIcon icon={faCopy} /></span>
					</div>
				</div>

				<div className="TextBox">
				  {message_text}
			  	</div>

			</div>
		  );
	}


	render() {
		let {processing} = this.state; 
		
		if (processing === true) {
			return (
				<div className="Splash">
					<div>{this.state.processinginfo}</div>
					<Dots />
				</div>
			);
		}
		
		return (
			<div className="Container">
				<div className="TitleBanner">
				<div className="Title">Sell Deed</div>
				<div className="BackIcon" onClick={this.onBack.bind(this)}><FontAwesomeIcon icon={faUndo} /></div>
				</div>
				{ this.renderDeedSellForm()}
			</div>
		  );
	}
	
}


// propTypes validation
DeedSellForm.propTypes = {
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


export {DeedSellForm};
export default connect(mapStateToProps, mapDispatchToProps)(DeedSellForm);

