import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl, FormLabel, InputGroup } from 'react-bootstrap';

import PropTypes from 'prop-types';

import { Dots } from 'react-activity';
import 'react-activity/dist/react-activity.css';

import { faUserLock, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {CurrencyCardIcon} from '@primusmoney/react_pwa/react-js-ui';



class ClauseCreateForm extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.app = this.props.app;
		this.getMvcModuleObject = this.app.getMvcModuleObject;
		this.getMvcMyPWAObject = this.app.getMvcMyPWAObject;

		this.minter = null;
		this.deed = null;
		
		let title = ''; // deed
		let description = '';

		let header = ''; // clause
		let content = '';

		let currency = {symbol: ''};

		let signingkey = null;
		let deedcard = null;
		let deedcard_balance_int = 0;
		let deedcard_balance_string = '';

		this.closing = false;

		
		this.state = {
			title,
			description,

			header,
			content,

			currency,
			signingkey,
			isOwner: false,
			deedcard,
			deedcard_balance_int,
			deedcard_balance_string,
			
			loaded: false,
			message_text: 'loading...',
			processinginfo: 'processing submission',
			processing: false
		};
	}

	_setState(state) {
		if (this.closing !== true)
		this.setState(state);
	}

	
	// post render commit phase
	componentDidUpdate(prevProps, prevState) {
		//console.log('ClauseCreateForm.componentDidUpdate called');
		
		let mvcmypwa = this.getMvcMyPWAObject();

		let rootsessionuuid = this.props.rootsessionuuid;
		let walletuuid = this.props.currentwalletuuid;
		
		// limit the size of header to 256
		if (this.state.header != prevState.header) {
			if (this.state.header.length > 256) {
				let header = this.state.header.slice(0,256);

				this._setState({header});
			}
		}

		// limit the size of content to 1024
		if (this.state.content != prevState.content) {
			if (this.state.content.length > 1024) {
				let content = this.state.content.slice(0,1024);

				this._setState({content});
			}
		}
		
		// entered an address or a private key
		if (this.state.signingkey != prevState.signingkey) {
			const {currency} = this.state;

			if ( (currency) && (currency.uuid)) {
				let newcard = null;
				let deedcard = null;
				let position = 0;

				let isOwner = false;
				let deedcard_balance_int = 0;
				let deedcard_balance_string = '';
				
				let currencyuuid = currency.uuid;
				let options = {maincard: true, allow_readonly: true};

				this.app.createCurrencyCard(currencyuuid, this.state.signingkey, options)
				.then(card => {
					newcard = card;

					return mvcmypwa.isCardOwningDeed(rootsessionuuid, walletuuid, currencyuuid, newcard.uuid, this.minter, this.deed);
				})
				.then(owning => {
					if (owning) {
						isOwner = true;
						deedcard = newcard;
					}

					if (!deedcard)
					throw 'not the card owning the deed';

					return mvcmypwa.getCurrencyPosition(rootsessionuuid, walletuuid, currencyuuid, deedcard.uuid);
				})
				.then((pos) => {
					position = pos;

					return position.toInteger();
				})
				.then((pos_int) => {
					deedcard_balance_int = pos_int;

					return mvcmypwa.formatCurrencyAmount(rootsessionuuid, currencyuuid, position);
				})
				.then((pos_string) => {
					deedcard_balance_string = pos_string;
					this._setState({deedcard, isOwner, deedcard_balance_int, deedcard_balance_string});
				})
				.catch(err => {
				});
			}
		}
	}

	componentDidMount() {
		console.log('ClauseCreateForm.componentDidMount called');
		let mvcmypwa = this.getMvcMyPWAObject();
		let rootsessionuuid = this.props.rootsessionuuid;
		
		// message translated in user's language
		let message_text = mvcmypwa.t(
			'Clauses are used to define more precisely what are the rights that are conferred \
			through the ownership of a deed and what are the conditions. \
			New clauses can be added by subsequent owners to reflect evolutions on the asset \
			or on the conditions of use.');
	
		this._setState({message_text});

		this.checkNavigationState().catch(err => {console.log('error in checkNavigationState: ' + err);});
	}
	

	async checkNavigationState() {
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
			let params = (app_nav_target ? app_nav_target.params : null);
			this.app.gotoRoute('login', params);
			return;
		}
		else {
			// check it is not the device wallet, because we need a safer wallet
			let isdevicewallet = await this.app.isDeviceWallet();
			
			if (isdevicewallet) {
				await this.app.resetWallet();
				
			   let params = (app_nav_target ? app_nav_target.params : null);
			   this.app.gotoRoute('login', params);
			   return;
			 }
	   }


		if (app_nav_target && (app_nav_target.route == 'clause') && (app_nav_target.reached == false)) {
			let params = app_nav_target.params;
			let dataobj = params.dataobject;

			let currencyuuid = dataobj.currencyuuid;

			let minter_address = dataobj.minter;
			let tokenid = dataobj.tokenid;

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
				let deedcard_balance_int = 0;
				let deedcard_balance_string = '';


				const cur = await mvcmypwa.getCurrencyFromUUID(rootsessionuuid, currencyuuid)
				.catch(err => {});

				if (cur)
				currency = cur;

				// get the deed card
				deedcard = await mvcmypwa.getDeedOwningCard(rootsessionuuid, walletuuid, currencyuuid, minter, deed)
				.catch(err => {
					console.log('error in DeedView.checkNavigationState: ' + err);
				});

				if (deedcard) {
					isOwner = true;
					let pos = await mvcmypwa.getCurrencyPosition(rootsessionuuid, walletuuid, currencyuuid, deedcard.uuid);
			
					if (pos !== undefined) {
						deedcard_balance_int = await pos.toInteger();
						deedcard_balance_string = await mvcmypwa.formatCurrencyAmount(rootsessionuuid, currencyuuid, pos);
					}
	
				}								
				
			
				this._setState({title, description, currency, 
					isOwner, deedcard, deedcard_balance_int, deedcard_balance_string });
			}
			else {
				this.app.error('no data object for clause create form')
			}
			
			// mark target as reached
			app_nav_target.reached = true;
		}

		this._setState({loaded: true});
	}

 	// end of life
	componentWillUnmount() {
		console.log('ClauseCreateForm.componentWillUnmount called');
		
		this.closing = true;

		this.app.closeDeviceWallet();
	}

	
	
	// user actions
	async onSubmit() {
		console.log('onSubmit pressed!');
		
		let mvcmypwa = this.getMvcMyPWAObject();

		let rootsessionuuid = this.props.rootsessionuuid;
		let walletuuid = this.props.currentwalletuuid;
		
		let wallet;
		let carduuid;
		let card;
		
		let { header, content, currency, deedcard, signingkey} = this.state;

		this._setState({processing: true});

		try {

			if (!header || (header.length == 0)) {
				this.app.alert('Please provide a header before adding a clause');
				this._setState({processing: false});
				return;
			}
	
			if (!content || (content.length == 0)) {
				this.app.alert('Please provide a content before adding a clause');
				this._setState({processing: false});
				return;
			}
	
	
			if (!currency || !currency.uuid) {
				this.app.alert('You need to specify a valid currency');
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
					this.app.alert('You need to provide your private key for ' + currency.name + ' in order to sign your clause');
					this._setState({processing: false});
					return;
				}
		
			}
	


			let minter = this.minter;
			let deed = this.deed;

			// check we have enough transaction credits
			let tx_fee = {};
			tx_fee.transferred_credit_units = 0;
			let add_clause_cost_units = (currency.deeds_v1.add_clause_cost_units ? parseInt(currency.deeds_v1.add_clause_cost_units) : 7);
			tx_fee.estimated_cost_units = add_clause_cost_units;

			// need a higher feelevel
			var feelevel = await mvcmypwa.getRecommendedFeeLevel(rootsessionuuid, walletuuid, deedcard.uuid, tx_fee);

			var canspend = await mvcmypwa.canCompleteTransaction(rootsessionuuid, walletuuid, deedcard.uuid, tx_fee, feelevel).catch(err => {});
	
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

			// register clause
			const article_clause = {subtype: 'article', header, content, time: Date.now()};
			article_clause.signature = await mvcmypwa.signString(rootsessionuuid, walletuuid, deedcard.uuid, JSON.stringify(article_clause));
			article_clause.signer = deedcard.address;
			const clause_txhash = await mvcmypwa.registerClause(rootsessionuuid, walletuuid, currency.uuid, minter, deed, article_clause, feelevel)
			.catch(err => {
				console.log('error in ClauseCreateForm.onSubmit: ' + err);
			});

			if (!clause_txhash) {
				this.app.alert('Could not add clause to deed');
				this._setState({processing: false});
				return;
			}
	
			// go to deed view
			let params = {action: 'view', currencyuuid: deed.currencyuuid, txhash: deed.txhash, address: deed.minter, tokenid: deed.tokenid, dataobject: deed};

			this.app.gotoRoute('deed', params);
		
			this._setState({processing: false});
	
			return true;
		}
		catch(e) {
			console.log('exception in onSubmit: ' + e);
			this.app.error('exception in onSubmit: ' + e);

			this.app.alert('could not create clause')

			this._setState({processing: false});
		}

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

	
	// rendering
	renderDeedCardPart() {
		let { currency, deedcard, signingkey, deedcard_balance_string } = this.state;

		return (
			<span>
				{(deedcard ?
					<FormGroup className="CurrencyCard" controlId="address">
						<span className="CardIconCol">
							<CurrencyCardIcon
								app={this.app}
								currency={currency}
								card={deedcard}
							/>
						</span>
						<span className="CardBalanceCol">
							<FormLabel>Your Balance</FormLabel>
							<FormControl
								className="CardBalanceCol"
								disabled
								autoFocus
								type="text"
								value={deedcard_balance_string}
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
					</FormGroup>
				)}
			</span>

		);
	}

	renderAddClauseButton() {
		let { loaded, isOwner} = this.state;

		if (loaded) {
			return(
				<span>
					<Button 
						disabled={(isOwner ? false : true)}
						onClick={this.onSubmit.bind(this)} 
						type="submit">
						Add Clause
					</Button>
				</span>);
		}
		else {
			return(	
				<Button disabled type="submit">
					loading...
				</Button>
			);
		}
	}

	renderDeedPart() {
		let { title, description, currency } = this.state;
		
		return (
			<div className="Form">
				<div>
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

					{this.renderDeedCardPart()}


				</div>
			</div>
		  );	
	}

	renderClauseCreateForm() {
		let { header, content, message_text } = this.state;
		
		return (
			<div className="Form">
				<div>

					<FormGroup controlId="header">
						<FormLabel>Clause Header</FormLabel>
						<FormControl
							autoFocus
							type="text"
							value={header}
							onChange={e => this._setState({header: e.target.value})}
						/>
					</FormGroup>
					<FormGroup controlId="content">
						<FormLabel>Clause Content</FormLabel>
						<FormControl 
							as="textarea" 
							rows="4" 
							autoFocus
							type="text"
							value={content}
							onChange={e => this._setState({content: e.target.value})}
						/>
					</FormGroup>
				
					{this.renderAddClauseButton()}

					<div className="TextBox">
					{message_text}
					</div>

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
				<div className="Title">Add Clause</div>
				<div className="BackIcon" onClick={this.onBack.bind(this)}><FontAwesomeIcon icon={faUndo} /></div>
				</div>
				{ this.renderDeedPart()}
				<div className="Separator"></div>
				{ this.renderClauseCreateForm()}
			</div>
		  );
	}
	
}


// propTypes validation
ClauseCreateForm.propTypes = {
	app: PropTypes.object.isRequired,
	rootsessionuuid: PropTypes.string,
	currentwalletuuid: PropTypes.string,
};

//redux
const mapStateToProps = (state) => {
	return {
		rootsessionuuid: state.session.sessionuuid,
		pending: state.login.pending,
		success: state.login.success,
		lasterror: state.login.error,
		currentwalletuuid: state.wallets.walletuuid,
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
	};
}


export {ClauseCreateForm};
export default connect(mapStateToProps, mapDispatchToProps)(ClauseCreateForm);

