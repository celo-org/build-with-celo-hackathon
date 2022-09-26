import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown, DropdownButton, FormGroup, FormControl, FormLabel, InputGroup } from 'react-bootstrap';

import PropTypes from 'prop-types';

import { Dots } from 'react-activity';
import 'react-activity/dist/react-activity.css';

import { faMobileAlt, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {CurrencyCardIcon} from '@primusmoney/react_pwa/react-js-ui';

import RemoteWalletConnectForm from '../../remote-wallet/remote-wallet-connect-form.js'



class DeedCreateForm extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.app = this.props.app;
		this.getMvcMyPWAObject = this.app.getMvcMyPWAObject;
		this.getMvcMyDeedObject = this.app.getMvcMyDeedObject;
		
		let mintername = '';
		let title = '';
		let description = '';
		let external_url = ''
		let currency = {symbol: ''};
		let currencies= [];
		let signingkey = null;
		let currentcard = null;
		let balance = '';
		
		this.closing = false;

		this.remotewallet = false;
		this.rpc = null;
		
		this.state = {
			mintername,
			title,
			description,
			external_url,
			currency,
			currencies,
			signingkey,
			currentcard,
			balance,
			message_text: '',
			processinginfo: 'processing submission',
			processing: false
		};
	}

	_setState(state) {
		if (this.closing !== true)
		this.setState(state);
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
		//console.log('DeedCreateForm.componentDidUpdate called');
		
		let mvcmypwa = this.getMvcMyPWAObject();

		let rootsessionuuid = this.props.rootsessionuuid;
		let walletuuid = this.props.currentwalletuuid;
		
		// limit the size of minter name to 64
		if (this.state.mintername != prevState.mintername) {
			if (this.state.mintername.length > 64) {
				let title = this.state.mintername.slice(0,64);

				this._setState({title});
			}
		}

		// limit the size of title to 256
		if (this.state.title != prevState.title) {
			if (this.state.title.length > 256) {
				let title = this.state.title.slice(0,256);

				this._setState({title});
			}
		}

		// limit the size of description to 1024
		if (this.state.description != prevState.description) {
			if (this.state.description.length > 1024) {
				let description = this.state.description.slice(0,1024);

				this._setState({description});
			}
		}

		// limit the size of external_url to 256
		if (this.state.external_url != prevState.external_url) {
			if (this.state.external_url.length > 256) {
				let external_url = this.state.external_url.slice(0,256);

				this._setState({external_url});
			}
		}

		// entered a private key
		if (this.state.signingkey != prevState.signingkey) {
			const {currency} = this.state;

			if ( (currency) && (currency.uuid)) {
				let currentcard = null;
				let balance = '';
				
				let currencyuuid = currency.uuid;

				this.app.createCurrencyCard(currencyuuid, this.state.signingkey, {maincard: true})
				.then(card => {
					currentcard = card;

					return mvcmypwa.getCurrencyPosition(rootsessionuuid, walletuuid, currencyuuid)
				})
				.then((pos) => {
					return mvcmypwa.formatCurrencyAmount(rootsessionuuid, currencyuuid, pos);
				})
				.then((balance) => {
					this._setState({currentcard, balance});
				})
				.catch(err => {
					this._setState({currentcard, balance})
				});
			}
		}

		// selected a currency
		if (this.state.currency && this.state.currency.uuid && (this.state.currency.uuid != (prevState.currency ? prevState.currency.uuid : null))) {
			// we reset the current card
			let currentcard = null;
			let balance = '';

			const currency = this.state.currency;
			let currencyuuid = currency.uuid;

			this.app.openCurrencyCard(currencyuuid)
			.then(card => {
				if (!card)
					throw 'no current card';

				currentcard = card;

				return mvcmypwa.fetchDeedMinter(rootsessionuuid, walletuuid, currency.uuid, currentcard.uuid).catch(err => {});
			})
			.then((minter) => {
				if ((minter) && (minter.name )) {
					// minter correctly deployed (at least answers to getChainName)
					this._setState({currentminter: minter, mintername: minter.name});
				}
				else {
					this._setState({currentminter: null});
					
					mvcmypwa.getWalletInfo(rootsessionuuid, walletuuid)
					.then((walletinfo) => {
						let mintername = mvcmypwa.t('Deeds of') + ' ' + walletinfo.ownername;
						this._setState({mintername});
					})
					.catch(err => {});
				}
				
				return mvcmypwa.getCurrencyPosition(rootsessionuuid, walletuuid, currencyuuid, currentcard.uuid);
			})	
			.then((pos) => {
				return mvcmypwa.formatCurrencyAmount(rootsessionuuid, currencyuuid, pos);
			})
			.then((balance) => {
				this._setState({currentcard, balance});
			})		
			.catch(err => {
				this._setState({currentminter: null, mintername: ''});
				this._setState({currentcard, balance})
			});

		}
	}

	componentDidMount() {
		console.log('DeedCreateForm.componentDidMount called');
		
		let mvcmypwa = this.getMvcMyPWAObject();
		

		// message translated in user's language
		let message_text = mvcmypwa.t(
		'When you press the button \'Create Deed\', a url will be generated that you will \
		be able to publish on the web or send via email. \
		If you haven\'t yet provided your private key for the corresponding currency, \
		you will be asked to enter it at the next step so that your deed is signed. \
		Your private key will be crypted and stored on your device, it will not leave \
		your device at any time and will not be shared with anyone. \
		You will be able to transfer this deed to anyone providing you with a valid address \
		this will represent the rights that you have agreed to confer to this person.');

		this._setState({message_text});

		this.checkNavigationState().catch(err => {console.log('error in DeedCreateForm.checkNavigationState: ' + err);});
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

		// list of currencies
		var currencies = await this._readVisibleCurrencies()
		.catch(err => {
			console.log('error in DeedCreateForm.componentDidMount ' + err);
		});

		// filter currencies that can register deeds
		var enabled_currencies = [];

		for (var i = 0; i < (currencies ? currencies.length : 0); i++) {
			if (currencies[i].ops.canregisterdeeds)
			enabled_currencies.push(currencies[i])
		}
		
		this._setState({currencies: enabled_currencies});
		
		if (enabled_currencies && (enabled_currencies.length == 1)) {
			// if there's only one currency, we select it automatically
			this._setState({currency: enabled_currencies[0]});
		}
	

		if (app_nav_target && (app_nav_target.route == 'deed') && (app_nav_target.reached == false)) {
			// mark target as reached
			app_nav_target.reached = true;

		}

	 }

	// end of life
	componentWillUnmount() {
		console.log('DeedCreateForm.componentWillUnmount called');
		
		this.closing = true;
	}

	
	// user actions
	
	async onSubmit() {
		console.log('onSubmit pressed!');
		
		let mvcmypwa = this.getMvcMyPWAObject();
		let mvcmydeed = this.getMvcMyDeedObject();

		let rootsessionuuid = this.props.rootsessionuuid;
		let walletuuid = this.props.currentwalletuuid;
		
		let wallet;
		let carduuid;
		let card;
		
		let { currentminter, mintername, title, description, external_url, currency, currentcard, signingkey } = this.state;

		let remotewallet = this.remotewallet;
		let remoteaccount;

		this._setState({processing: true});

		try {
			if (!mintername || (mintername.length == 0)) {
				this.app.alert('You need to enter an overall name for the deeds you will generate');
				this._setState({processing: false});
				return;
			}
	
			if (!title || (title.length == 0)) {
				this.app.alert('You need to enter a title for this deed');
				this._setState({processing: false});
				return;
			}
	
	
			if (!currency || !currency.uuid) {
				this.app.alert('You need to specify a valid currency');
				this._setState({processing: false});
				return;
			}

			if (remotewallet === true) {
				let deedclient = this.app.getDeedClientObject();
				remoteaccount = deedclient.getRemoteAccount();

				if (!remoteaccount) {
					this.app.alert('You need to be connected to a remote wallet');
					this._setState({processing: false});
					return;
				}
				return;
			}
	
			// get wallet details
			wallet = await mvcmypwa.getWalletInfo(rootsessionuuid, walletuuid);
	
			if (currentcard) {
				card = currentcard;
				carduuid = card.uuid;
			}
			else {
				if (signingkey) {
					let currencyuuid = currency.uuid;
		
					card = await this.app.createCurrencyCard(currencyuuid, signingkey, {maincard: true})
					.catch(err => {
						console.log('error in DeedCreateForm.onSubmit: ' + err);
					});
	
					if (!card) {
						this.app.alert('Could not create card from private key');
						this._setState({processing: false});
						return;
					}
				}
				else {
					this.app.alert('You need to provide your private key for ' + currency.name + ' in order to sign and fund your deed');
					this._setState({processing: false});
					return;
				}
		
			}

			// check card can transfer credit units and tokens
			let _privkey = await  mvcmypwa.getCardPrivateKey(rootsessionuuid, walletuuid, currentcard.uuid).catch(err => {});
			let cansign = (_privkey ? true : false);

			if (cansign !== true) {
				this.app.alert('Current card for the currency is read-only');
				this._setState({processing: false});
				return;
			}

			// we get the minter to generate a deed
			var stop = false;
			var minter = currentminter;

			if (!minter) {
				// we create minter now
				minter = {name: mintername, symbol: 'nft' };

				// check we have enough transaction credits
				let tx_fee = {};
				tx_fee.transferred_credit_units = 0;
				let minter_cost_units = (currency.deeds_v1.create_minter_cost_units ? parseInt(currency.deeds_v1.create_minter_cost_units) : 225);
				tx_fee.estimated_cost_units = minter_cost_units;

				// need a higher feelevel than standard this.app.getCurrencyFeeLevel(currencyuuuid)
				let _feelevel = await mvcmypwa.getRecommendedFeeLevel(rootsessionuuid, walletuuid, card.uuid, tx_fee);
				let connection = {type: 'local', feelevel: _feelevel};

				var canspend = await mvcmypwa.canCompleteTransaction(rootsessionuuid, walletuuid, card.uuid, tx_fee, _feelevel).catch(err => {});
		
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


				// build tokenuri
				minter.basetokenuri = await this.app.getBaseTokenURI(currency.uuid, currentcard.address);
				
				minter = await mvcmydeed.deployDeedMinter(rootsessionuuid, walletuuid, currency.uuid, currentcard.uuid, minter, connection)
				.catch(err => {
					console.log('error in DeedCreateForm.onSubmit: ' + err);
					stop = true;
				});
			}

			if (stop) {
				this.app.alert('Could not deploy contract to mint deeds');
				this._setState({processing: false});
				return;
			}

			// then mint a deed

			// check we have enough transaction credits to perform both transactions
			let tx_fee = {};
			tx_fee.transferred_credit_units = 0;
			let mint_deed_cost_units = (currency.deeds_v1.create_deed_cost_units ? parseInt(currency.deeds_v1.create_deed_cost_units) : 8);
			let add_clause_cost_units = (currency.deeds_v1.add_clause_cost_units ? parseInt(currency.deeds_v1.add_clause_cost_units) : 7);
			tx_fee.estimated_cost_units = mint_deed_cost_units + add_clause_cost_units;

			let _feelevel = await mvcmypwa.getRecommendedFeeLevel(rootsessionuuid, walletuuid, currentcard.uuid, tx_fee);
			let connection = {type: 'local', feelevel: _feelevel};

			var canspend = await mvcmypwa.canCompleteTransaction(rootsessionuuid, walletuuid, currentcard.uuid, tx_fee, _feelevel)
			.catch(err => {
				console.log('error in DeedCreateForm.onSubmit: ' + err);
			});
	
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
			
			// mint deed

			// need a higher feelevel than standard feelevel
			tx_fee = {};
			tx_fee.transferred_credit_units = 0;
			tx_fee.estimated_cost_units = mint_deed_cost_units;

			_feelevel = await mvcmypwa.getRecommendedFeeLevel(rootsessionuuid, walletuuid, currentcard.uuid, tx_fee);
			
			const deed = await mvcmydeed.mintDeed(rootsessionuuid, walletuuid, currency.uuid, minter, connection)
			.catch(err => {
				console.log('error in DeedCreateForm.onSubmit: ' + err);
				stop = true;
			});

			if (stop) {
				this.app.alert('Could not mint deed');
				this._setState({processing: false});
				return;
			}

			// add metadata as a clause
			const metadata_clause = {subtype: 'metadata', title, description, external_url, time: Date.now()};
			metadata_clause.signature = await mvcmypwa.signString(rootsessionuuid, walletuuid, currentcard.uuid, JSON.stringify(metadata_clause));
			metadata_clause.signer = currentcard.address;

			// need a higher feelevel than standard feelevel
			tx_fee = {};
			tx_fee.transferred_credit_units = 0;
			tx_fee.estimated_cost_units = add_clause_cost_units;

			_feelevel = await mvcmypwa.getRecommendedFeeLevel(rootsessionuuid, walletuuid, currentcard.uuid, tx_fee);

			const metadata_txhash = await mvcmydeed.registerClause(rootsessionuuid, walletuuid, currency.uuid, minter, deed, metadata_clause, connection)
			.catch(err => {
				console.log('error in DeedCreateForm.onSubmit: ' + err);
				stop = true;
			});

			if (stop) {
				this.app.alert('Could not add meta data to deed');
				this._setState({processing: false});
				return;
			}

			// go to list view (to let time for the blockchain to commit the transactions)
			let params = {action: 'view', currencyuuid: currency.uuid, cardaddress: currentcard.address};
	
			await this.app.gotoRoute('deeds', params);
	
			this._setState({processing: false});
	
			return true;
		}
		catch(e) {
			console.log('exception in onSubmit: ' + e);
			this.app.error('exception in onSubmit: ' + e);

			this.app.alert('could not create deed');

			this._setState({processing: false});
		}
	}

	async _changeCurrency(currency) {
		if (currency) {
			// check if corresponding currency is set for remote
			let config = this.app.getConfig('remotewallet');	

			if (config && config.rpc && config.rpc[currency.uuid]) {
				let curr_rpc_config = config.rpc[currency.uuid];

				if (curr_rpc_config.enabled === true) {
					this.remotewallet = true;
					this.rpc = curr_rpc_config.rpc;
				}
			}

			// change state
			this._setState({currency});

		}

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

	async onShowCurrencyCard() {
		let currency = this.state.currency;
		let params = {currencyuuid: currency.uuid};
		this.app.gotoRoute('currencycard', params);
	}

	
	// rendering
	renderRemoteWalletConnection() {
		return (
			<RemoteWalletConnectForm 
				app = {this.app}
				parent={this}
				rpc={this.rpc}
			/>
		);
	}



	renderMainCardPart() {
		let { currency, currentcard, signingkey, balance } = this.state;

		return (
			<span>
				{(currentcard ?
					<FormGroup className="CurrencyCard" controlId="address">
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
							value={balance}
						/>
					</span>
					</FormGroup> :
					<FormGroup controlId="signingkey">
						<FormLabel>Private key {(currency && currency.name ? 'for ' + currency.name : '')}</FormLabel>
						<FormControl
						autoFocus
						type="text"
						value={(signingkey ? signingkey : '')}
						onChange={e => this._setState({signingkey: e.target.value})}
						/>
					</FormGroup>
				)}		
			</span>
		);

	}

	renderCurrencyPickForm() {
		let { currencies, currency, } = this.state;
		
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

				{(this.remotewallet ? this.renderRemoteWalletConnection() : this.renderMainCardPart())}

			</div>
		  );
	}


	renderMinterCreateForm() {
		let { currentminter, mintername } = this.state;

		return (
			<div className="Form">
				<FormGroup controlId="title">
				  <FormLabel>Minter Title</FormLabel>
				  <FormControl
				  	disabled={(currentminter ? true : false)}
					autoFocus
					type="text"
					value={mintername}
					onChange={e => this._setState({mintername: e.target.value})}
				  />
				</FormGroup>
			</div>
		);
	}

	renderDeedCreateForm() {
		let { title, description, external_url, currentcard, message_text } = this.state;
		
		return (
			<div className="Form">
			  <div>
				
				<FormGroup controlId="title">
				  <FormLabel>Deed Title</FormLabel>
				  <FormControl
					autoFocus
					type="text"
					value={title}
					onChange={e => this._setState({title: e.target.value})}
				  />
				</FormGroup>

				<FormGroup controlId="description">
				  <FormLabel>Description</FormLabel>
				  <FormControl 
					as="textarea" 
					rows="3" 
					autoFocus
					type="text"
					value={description}
					onChange={e => this._setState({description: e.target.value})}
				  />
				</FormGroup>
				
				<FormGroup controlId="externalurl">
				<FormLabel>External url</FormLabel>
				<FormControl
					autoFocus
					type="text"
					value={external_url}
					onChange={e => this._setState({external_url: e.target.value})}
				  />
				</FormGroup>
				
				<Button 
				disabled={(currentcard ? false : true)}
				onClick={this.onSubmit.bind(this)} 
				type="submit">
				  Create Deed
				</Button>

				<div className="TextBox">
				  {message_text}
			  	</div>

			  </div>
			</div>
		  );
	}

	renderItem(item){
		let type = item.type;
		let label = item.label;

		return (
			<div>
				<span>{(type == 0 ? <FontAwesomeIcon icon={faMobileAlt} /> : <FontAwesomeIcon icon={faGlobe} />)}</span>
				<span>{label}</span>
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
				<div className="Title">Create Deed</div>
				{ this.renderCurrencyPickForm()}
				{ this.renderMinterCreateForm()}
				{ this.renderDeedCreateForm()}
			</div>
		  );
	}
	
}


// propTypes validation
DeedCreateForm.propTypes = {
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
		currentcarduuid: state.cards.carduuid,
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
	};
}


export {DeedCreateForm};
export default connect(mapStateToProps, mapDispatchToProps)(DeedCreateForm);

