import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl, FormLabel, InputGroup, Table } from 'react-bootstrap';

import PropTypes from 'prop-types';

import { Dots } from 'react-activity';
import 'react-activity/dist/react-activity.css';


import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



class ClauseView extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.app = this.props.app;
		this.getMvcModuleObject = this.app.getMvcModuleObject;
		this.getMvcMyPWAObject = this.app.getMvcMyPWAObject;
		
		this.uuid = this.app.guid();

		this.dataobject = null;

		this.minter = null;
		this.deed = null;
		this.clause = null;
		
		
		let mintername = '';

		let title = '';
		let description = '';

		let header = '';
		let content = '';

		let currency = {symbol: ''};

		let deedcard = null;
		
		this.closing = false;

		this.state = {
				mintername,
				title,
				description,

				header,
				content,

				currency,
				deedcard,

				loaded: false,
				registration_text: 'loading...',
				message_text: 'loading...',
				sharelinkmessage: 'loading...',
				sharelink: 'loading...',
				processinginfo: 'processing clause',
				processing: false
		}
	}

	_setState(state) {
		if (this.closing !== true)
		this.setState(state);
	}

	
	// post render commit phase
	componentDidMount() {
		console.log('ClauseView.componentDidMount called');

		let mvcmypwa = this.getMvcMyPWAObject();

		let rootsessionuuid = this.props.rootsessionuuid;
				
		mvcmypwa.registerEventListener('on_refreshPage', this.uuid, this.onRefreshPage.bind(this));


		let registration_text = mvcmypwa.t('This clause has been registered.');
		
		let message_text = mvcmypwa.t('Clause signed with:');
	
		let sharelinkmessage = mvcmypwa.t('Send this link to share this clause:');
		
		
		this._setState({registration_text, message_text, sharelinkmessage});

		this.checkNavigationState().catch(err => {console.log('error in ClauseView.checkNavigationState: ' + err);});
	}
	
	async checkNavigationState() {
		let mvcmypwa = this.getMvcMyPWAObject();

		let rootsessionuuid = this.props.rootsessionuuid;
		let walletuuid = this.props.currentwalletuuid;

		let app_nav_state = this.app.getNavigationState();
		let app_nav_target = app_nav_state.target;
		
		if (app_nav_target && (app_nav_target.route == 'clause') && (app_nav_target.reached == false)) {
			var params = app_nav_target.params;
			var dataobj = params.dataobject;

			if (dataobj && (dataobj.type === 'clause') && (dataobj.treated !== true)) {
				this.dataobject = dataobj;

				let txhash = params.txhash;

				let currencyuuid = dataobj.currencyuuid;
	
				let minter_address = dataobj.minter;
				let tokenid = dataobj.tokenid;
				let clauseindex = dataobj.index;
	
				// we fetch the deed to have a proper record
				let minter = await mvcmypwa.fetchDeedMinterFromAddress(rootsessionuuid, walletuuid, currencyuuid, minter_address);
				this.minter = minter;
	
				if (!minter)
					throw 'could not find minter with address ' + minter_address;
	
				let mintername = minter.name;
	
				let deed = await mvcmypwa.fetchDeed(rootsessionuuid, walletuuid, currencyuuid, minter, tokenid);
				this.deed = deed;
	
				if (deed) {
					let title = (deed.metadata ? deed.metadata.title : null);
					let description = (deed.metadata ? deed.metadata.description : null);
	
					
					let currency = {symbol: ''};
	
					let isOwner = false;
					let deedcard = null;
	
	
					const cur = await mvcmypwa.getCurrencyFromUUID(rootsessionuuid, currencyuuid)
					.catch(err => {});
	
					if (cur)
					currency = cur;
	
					// get the deed card
					deedcard = await mvcmypwa.getDeedOwningCard(rootsessionuuid, walletuuid, currencyuuid, minter, deed)
					.catch(err => {
						console.log('error in ClauseView.checkNavigationState: ' + err);
					});
	
					if (deedcard) {
						isOwner = true;
					}
					
					let clause = deed.clauses[clauseindex];
					this.clause = deed.clauses[clauseindex];

					let header = clause.header;
					let content = clause.content;

					// time
					let registration_time = clause.time/1000;
					let registration_text = mvcmypwa.t('This clause has been registered on');

					registration_text += ' ' + mvcmypwa.formatDate(registration_time, 'YYYY-mm-dd HH:MM:SS') + '.';
				
					// author
					let message_text = mvcmypwa.t('Clause signed with:');
	
					message_text += ' ' + clause.signer;
				
					// link
					var sharelink = await this.app.getShareLink(txhash, currency.uuid);


					this._setState({ currency, isOwner, deedcard ,
						mintername, title, description, 
						header, content,
						registration_text, message_text, sharelink });
		
					dataobj.viewed = true;
				}
			}

			// mark target as reached
			app_nav_target.reached = true;		
		}

		if (this.clause) {
			let clause = this.clause
			let clausestatus = clause.status; // 0 = unhandled, 1 = payment pending, 10 paid, -1 = rejection pending, -10 = rejected

			let clause_uuid = clause.uuid;

			let payment_txhash = clause.payment_txhash;

			this._setState({clause_uuid, clausestatus, payment_txhash});
		}

		this._setState({loaded: true});
	}

	async onRefreshPage() {
		console.log('ClauseView.onRefreshPage called');

		this.checkNavigationState().catch(err => {console.log('error in ClauseView.checkNavigationState: ' + err);});
	}
	
	// end of life
	componentWillUnmount() {
		let app = this.app;
		let mvcmypwa = this.getMvcMyPWAObject();
		
		this.closing = true;

		mvcmypwa.unregisterEventListener('on_refreshPage', this.uuid);
	}
	
	// user actions
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
	
	async onClose() {
		console.log('onClose pressed!');

		let currencyuuid = this.deed.currencyuuid;
		let txhash = this.deed.txhash;
		let address = this.deed.minter;
		let tokenid = this.deed.tokenid;
		
		let params = {action: 'view', currencyuuid, txhash, address, tokenid, dataobject: this.deed};

		this.app.gotoRoute('deed', params);
	}



	// rendering
	renderDeedPart() {
		let { mintername, title, description, currency } = this.state;
		
		return (
			<div className="Form">
				<div>
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

					<FormGroup controlId="description">
						<FormLabel>Description</FormLabel>
						<FormControl 
							disabled
							as="textarea" 
							rows="3" 
							autoFocus
							type="text"
							value={description}
							onChange={e => this._setState({description: e.target.value})}
						/>
					</FormGroup>


				</div>
			</div>
		  );	
	}

	renderClausePart() {
		let { loaded, header, content, message_text } = this.state;
		
		return (
			<div className="Form">
				<div>

					<FormGroup controlId="header">
						<FormLabel>Clause Header</FormLabel>
						<FormControl
							disabled
							autoFocus
							type="text"
							value={header}
							onChange={e => this._setState({header: e.target.value})}
						/>
					</FormGroup>
					<FormGroup controlId="content">
						<FormLabel>Clause Content</FormLabel>
						<FormControl 
							disabled
							as="textarea" 
							rows="4" 
							autoFocus
							type="text"
							value={content}
							onChange={e => this._setState({content: e.target.value})}
						/>
					</FormGroup>
				
					<Button 
						disable={(loaded ? false : true)}
						onClick={this.onClose.bind(this)} 
						type="submit">
						Close
					</Button>

				</div>
			</div>
		  );
	}

	renderBottomInfoPart() {
		let { registration_text, message_text, sharelinkmessage, sharelink, 
			isOwner } = this.state;

		if (isOwner) {
			return (
				<div>
					<div className="TextBox">
						{registration_text}
					</div>
					
					<div className="TextBox">
						{message_text}
					</div>
	
					<div className="TextBox">
						<div>{sharelinkmessage}</div>
						<div className="ShareBlock">
						<span className="ShareLink" onClick={this.onShareLinkClick.bind(this)}>{sharelink}</span>
						<span className="ShareIcon" onClick={this.onShareLinkClick.bind(this)}><FontAwesomeIcon icon={faCopy} /></span>
						</div>
					</div>

				</div>
			);
		}
		else {
			return (
				<div>
					<div className="TextBox">
						{registration_text}
					</div>
					
					<div className="TextBox">
						{message_text}
					</div>
	
					<div className="TextBox">
						<div>{sharelinkmessage}</div>
						<div className="ShareBlock">
						<span className="ShareLink" onClick={this.onShareLinkClick.bind(this)}>{sharelink}</span>
						<span className="ShareIcon" onClick={this.onShareLinkClick.bind(this)}><FontAwesomeIcon icon={faCopy} /></span>
						</div>
					</div>

				</div>
			);
		}

	}

	renderClauseView() {

		return (
			<div className="Form">
				{this.renderDeedPart()}

				{this.renderClausePart()}

				{this.renderBottomInfoPart()}

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
				<div className="Title">Clause View</div>
				{ this.renderClauseView()}
			</div>
		  );
	}
	
}


// propTypes validation
ClauseView.propTypes = {
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


export {ClauseView};
export default connect(mapStateToProps, mapDispatchToProps)(ClauseView);

