import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown, DropdownButton, FormGroup, FormControl, FormLabel, InputGroup } from 'react-bootstrap';

import PropTypes from 'prop-types';

import { Dots } from 'react-activity';

import { faCopy, faUndo} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import QRCodeReadForm from '../../common/qr-code-reader/qr-code-read-form.js';

import QRCodeReact from 'qrcode.react';


class DeedCheckForm extends React.Component {
	
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

		let currency = {symbol: ''};

		let currentcard = null;

		
		this.closing = false;
		
		this.state = {
			mintername,

			title,
			description,

			currency,

			isOwner: false,

			action: '',
			challenge_text: null,
			response_text: null,
			ownership_proof: null,

			remotewallet: false,
			rpc: null,
			connection: null,

			currentcard,

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

	async _getDeedOwningCard(currencyuuid, minter, deed) {
		let context = await this.app.getVariable('AppsPane').getDeedCardContext(currencyuuid, minter, deed);

		this._setState({remotewallet: context.remotewallet, rpc: context.rpc, connection: context.connection});

		return context.deedcard;
	}

	async _isValidUrl(url_string) {
		var inputElement = document.createElement('input');
		inputElement.type = 'url';
		inputElement.value = url_string;
  
		if (!inputElement.checkValidity()) {
		  return false;
		} else {
		  return true;
		}
	}

	async _isInternalUrl(url_string) {
		return this.app.getVariable('AppsPane').isInternalUrl(url_string);

	}

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
	
	// post render commit phase
	componentDidUpdate(prevProps, prevState) {
		//console.log('DeedCreateForm.componentDidUpdate called');
		
		let mvcmypwa = this.getMvcMyPWAObject();

		let rootsessionuuid = this.props.rootsessionuuid;
		let walletuuid = this.props.currentwalletuuid;


	}

	componentDidMount() {
		console.log('DeedCheckForm.componentDidMount called');
		
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

		this.checkNavigationState().catch(err => {console.log('error in DeedCheckForm.checkNavigationState: ' + err);});
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
				let minter = await mvcmydeed.fetchDeedMinterFromAddress(rootsessionuuid, walletuuid, currencyuuid, minter_address);

				if (!minter)
					throw 'could not find minter with address ' + minter_address;

				this.minter = minter;
				let mintername = minter.name;

				let deed = await mvcmydeed.fetchDeed(rootsessionuuid, walletuuid, currencyuuid, minter, tokenid);
				this.deed = deed;

				// time
				let registration_time = (deed.metadata ? deed.metadata.time/1000 : null);
				let registration_text = mvcmypwa.t('This deed has been registered on');

				registration_text += ' ' + mvcmypwa.formatDate(registration_time, 'YYYY-mm-dd HH:MM:SS') + '.';
				
	
				// share link
				let currency = await mvcmypwa.getCurrencyFromUUID(rootsessionuuid, currencyuuid)
				.catch(err => {
					console.log('error in DeedCheckForm.checkNavigationState: ' + err);
				});

				if (!currency)
					return Promise.reject('could not find currency ' + currencyuuid);
	
				var sharelink = await this.app.getShareLink(txhash, currency.uuid);

				// check if deed is on sale
				let isOnSale = false;
				let listing_info = await mvcmydeed.getDeedSaleInfo(rootsessionuuid, walletuuid, currencyuuid, minter, deed).catch(err => {});

				if (listing_info && (listing_info.onsale === true)) {
					isOnSale = true;
				}
	
				// check if is owner
				let isOwner = false;
				let action = '';
				let challenge_text = (params.challenge ? params.challenge : null);
				let response_text = (params.response ? params.response : null);
				let ownership_proof = null;

				let deedcard = await this._getDeedOwningCard(currencyuuid, minter, deed).catch(err => {});

				if (deedcard) {
					isOwner = true;
				}

				let currentcard = await this._openCurrencyCard(currencyuuid).catch(err => {});

				if (isOwner) {
					if ((challenge_text) && (!response_text)) {
						// we are challenged

						// we build the response
						response_text = await this.app.getCleanUrl();

						response_text += '?route=deedview&action=check';
						response_text += '&challenge=' + challenge_text;
						response_text += '&response=' + await mvcmypwa.signString(rootsessionuuid, walletuuid, deedcard.uuid, challenge_text);
				
						response_text += '&ccy=' + this.deed.currencyuuid;
						response_text += '&minter=' + this.deed.minter;
						response_text += '&tokenid=' + this.deed.tokenid;

						action = 'showing_response';
					}
				}
				else {
					if (challenge_text && response_text) {
						// check response
						let deedproxycard = await await mvcmypwa.getCurrencyCardWithAddress(rootsessionuuid, walletuuid, currency.uuid,
																								deed.owner); // creates read-only card if necessary
						let signed = await mvcmypwa.validateStringCardSignature(rootsessionuuid, walletuuid, deedproxycard.uuid, challenge_text, response_text);

						if (signed) {
							// check it's a proper challenges
							let ischallenge = await this._isChallenge(challenge_text);

							if (ischallenge)
								ownership_proof = 'success';
							else
								ownership_proof = 'maybe';
						}
						else {
							ownership_proof = 'failure';
						}

					}
	
				}


				this._setState({currency, mintername, 
					isOwner,
					currentcard,
					isOnSale,
					action, challenge_text, response_text, ownership_proof,
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
		console.log('DeedCheckForm.componentWillUnmount called');
		
		this.closing = true;
	}
	
	
	// user actions
	async onBack() {
		console.log('onBack pressed!');

		let currencyuuid = this.deed.currencyuuid;
		let txhash = this.deed.txhash;
		let address = this.deed.minter;
		let tokenid = this.deed.tokenid;
		
		let params = {action: 'view', currencyuuid, txhash, address, tokenid, dataobject: this.deed};

		this.app.gotoRoute('deed', params);
	}

	async _getNewChallenge() {
		let challenge = await this.app.guid();

		let challenges = this.app.getVariable('deed_challenges');

		if (!challenges) {
			challenges = [];
			this.app.setVariable('deed_challenges', challenges);
		}

		challenges.push(challenge);

		return challenge;
	}

	async _isChallenge(challenge) {
		if (!challenge)
			return false;

		let challenges = this.app.getVariable('deed_challenges');

		if (!challenges) {
			challenges = [];
			this.app.setVariable('deed_challenges', challenges);
		}

		return challenges.includes(challenge);
	}


	async onBuildQRCodeChallenge() {
		console.log('onBuildQRCodeChallenge pressed!');

		try {
			let challenge_text = await this.app.getCleanUrl();

			challenge_text += '?route=deedview&action=check';
			challenge_text += '&challenge=' + await this._getNewChallenge();
	
			challenge_text += '&ccy=' + this.deed.currencyuuid;
			challenge_text += '&minter=' + this.deed.minter;
			challenge_text += '&tokenid=' + this.deed.tokenid;
	
			this._setState({ownership_proof: null, action: 'asking_challenge', challenge_text});
		}
		catch(e) {
			console.log('exception in onBuildQRCodeChallenge' + e);
		}
	}

	async onScanQRCodeChallenge()  {
		console.log('onScanQRCodeChallenge pressed!');

		this._setState({ownership_proof: null, action: 'reading_challenge'});
	}

	async onBuildQRCodeResponse() {
		console.log('onBuildQRCodeResponse pressed!');

		this._setState({ownership_proof: null, action: 'showing_response'});
	}

	async onScanQRCodeResponse() {
		console.log('onScanQRCodeResponse pressed!');

		this._setState({ownership_proof: null, action: 'reading_response'});
	}

	async onRead(result, error) {
		try {
			if (!!result) {
				let url = result.text;
				let isUrl = await this._isValidUrl(url);
				
				if (isUrl) {
					let isinternal = await this._isInternalUrl(url);

					let _cr = '\r\n';
					let message = '';
					let choice = false;
					
					if (isinternal) {
						// we could directly jump if it is an internal url
						message = 'Jump to internal url? ' + _cr + _cr + url;
						choice = await this.app.confirm(message);
					}
					else {
						message = 'Go to? ' + _cr + _cr + url;
						choice = await this.app.confirm(message);
					}
	
					if (choice) {
						console.log('Jumping to ' + url);
						await this.app.gotoUrl(url);
					}
				}
				else {
					this.app.alert('Could not read a proper url!')
				}
				
			}
		}
		catch(e) {
			console.log('exception in onRead' + e);
		}
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
	renderQRCodePart() {
		let {ownership_proof, action, challenge_text, response_text} = this.state;

		if (ownership_proof) {
			switch(ownership_proof) {
				case 'success':
					return (
						<div className="OwnershipTrue">
							Correspondent is the rightful owner!
						</div>
					);
				case 'failure':
					return (
						<div className="OwnershipTrue">
							Correspondent is NOT the owner!
						</div>
					);
				case 'maybe':
					return (
						<div className="OwnershipUnsure">
							Correspondent provided proof on a challenge, but we can not certify the challenge!
						</div>
					);				
				default:
					return (
						<div className="OwnershipTrue">
							Error happened!
						</div>
					);
			}
		}
		else {
			switch(action) {
				case 'asking_challenge':
					return (
						<QRCodeReact
						value={challenge_text}
						renderas='svg'
						size={360}
						includeMargin={true}
						/>
					);
				case 'reading_challenge':
					return (
						<QRCodeReadForm app={this.app} onRead={this.onRead.bind(this)} />
					);
	
				case 'showing_response':
					return (
						<QRCodeReact
						value={response_text}
						renderas='svg'
						size={360}
						includeMargin={true}
						/>
					);
				case 'reading_response':
					return (
						<QRCodeReadForm app={this.app} onRead={this.onRead.bind(this)} />
					);
	
			
	
				default:
					return(<></>);
			}
		}


	}

	renderDeedButtons() {
		let { loaded, isOwner} = this.state;

		if (loaded) {
			return(
				<div>
				{(isOwner ?
				<>
				<span>
				<Button  className="DeedButton" onClick={this.onBuildQRCodeResponse.bind(this)} type="submit">
				Build QR Code</Button>
				</span>
				<span>
				<Button className="DeedButton" onClick={this.onScanQRCodeChallenge.bind(this)} type="submit">
				Read Challenge</Button>
				</span>
				</>	:
				<>
				<span>
				<Button  className="DeedButton" onClick={this.onBuildQRCodeChallenge.bind(this)} type="submit">
				Build Challenge</Button>
				</span>				
				<span>
				<Button className="DeedButton" onClick={this.onScanQRCodeResponse.bind(this)} type="submit">
				Read Response</Button>
				</span>
				</> 
				)}
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

	renderDeedCheckForm() {
		let { mintername, title, description, ownership_proof, action, registration_text, message_text, sharelinkmessage, sharelink, external_url } = this.state;
		
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

				{(!ownership_proof && (!action || !action.length) ?
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
				</FormGroup> :
				this.renderQRCodePart()
				)}

				{this.renderDeedButtons()}


				<FormGroup controlId="asseturl">
				  <FormLabel>Asset url</FormLabel>
				  <div className="ShareBlock">
				  <span className="ShareLink" onClick={this.onExternalURLClick.bind(this)}>{external_url}</span>
				  <span className="ShareIcon" onClick={this.onExternalURLClick.bind(this)}><FontAwesomeIcon icon={faCopy} /></span>
				  </div>
				</FormGroup>


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
				<div className="Title">Check Deed</div>
				<div className="BackIcon" onClick={this.onBack.bind(this)}><FontAwesomeIcon icon={faUndo} /></div>
				</div>
				{ this.renderDeedCheckForm()}
			</div>
		  );
	}
	
}


// propTypes validation
DeedCheckForm.propTypes = {
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


export {DeedCheckForm};
export default connect(mapStateToProps, mapDispatchToProps)(DeedCheckForm);

