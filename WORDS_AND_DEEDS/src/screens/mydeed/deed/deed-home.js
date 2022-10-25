import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import {Header} from '@primusmoney/react_pwa/react-js-ui';

import AppsPane from '../../core/apps-pane.js';

import DeedBuyForm from '../../../components/mydeed/deed/deed-buy-form.js';
import DeedCheckForm from '../../../components/mydeed/deed/deed-check-form.js';
import DeedCreateForm from '../../../components/mydeed/deed/deed-create-form.js';
import DeedSellForm from '../../../components/mydeed/deed/deed-sell-form.js';
import DeedTransferForm from '../../../components/mydeed/deed/deed-transfer-form.js';
import DeedView from '../../../components/mydeed/deed/deed-view.js';

class DeedHomeScreen extends React.Component {
	constructor(props) {
		super(props);
		
		this.app = this.props.app;
		this.getMvcMyPWAObject = this.app.getMvcMyPWAObject;
		
		this.uuid = this.app.guid();
		
		this.state = {
			action: 'create',
			txhash: null,
			loaded: false,
			deedinfo: 'loading...'
		};
	}
	
	// post render commit phase
	componentDidMount() {
		console.log('DeedHomeScreen.componentDidMount called');
		let mvcmypwa = this.app.getMvcMyPWAObject();
		
		mvcmypwa.registerEventListener('on_refreshPage', this.uuid, this.onRefreshPage.bind(this));
		
		this.checkNavigationState().catch(err => {console.log('error in checkNavigationState: ' + err);});
	}

	async checkNavigationState() {
		let mvcmypwa = this.getMvcMyPWAObject();

		let rootsessionuuid = this.props.rootsessionuuid;

		let app_nav_state = this.app.getNavigationState();
		let app_nav_target = app_nav_state.target;

		if (app_nav_target && (app_nav_target.route == 'deedview')) {
			// particular re-entry
			// we re-set to reserved routes and params that are forbidden in Root._gotoUrl

			// check wallet is unlocked
			let unlocked = await this.app.checkWalletUnlocked()
			.catch(err => {
			});

			if (!unlocked) {
				let params = (app_nav_target ? app_nav_target.params : null);
				this.app.gotoRoute('login', params);
				return;
			}

			let walletuuid = this.props.currentwalletuuid;

			var params = app_nav_target.params;

			app_nav_target.route = 'deed';

			if (params && !params.dataobject) {
				let currencyuuid = params.ccy;
				let cardaddress = params.card;
				let tokenid = params.tokenid;

				let minter = await mvcmypwa.fetchDeedMinterFromOwner(rootsessionuuid, walletuuid, currencyuuid, cardaddress).catch(err => {});

				if (minter) {
					let dataobject = await mvcmypwa.fetchDeed(rootsessionuuid, walletuuid, currencyuuid, minter, tokenid)
					.catch(err => {
						console.log('error in DeedClient._getDataObjectFromCard:' + err);
					});
	
					params.dataobject = dataobject;
					params.currencyuuid = currencyuuid;
					params.address = minter.address;
				}
			}
			
		}


		if (app_nav_target && (app_nav_target.route == 'deed') && (app_nav_target.reached == false)) {
			var params = app_nav_target.params;

			if (params) {
				let txhash = params.txhash;
				let deedinfo = '';
				let action = (params.action ? params.action : 'create');

				if (txhash) {
					// retrieve info from firenze
					deedinfo = txhash;
				}
	
				this.setState({action, txhash, deedinfo});
			}

			// DeedView will take care of marking target reached
		}

		this.setState({loaded: true});
	}

	async onRefreshPage() {
		console.log('DeedHomeScreen.onRefreshPage called');

		return this.checkNavigationState().catch(err => {console.log('error in checkNavigationState: ' + err);});
	}
	
	// end of life
	componentWillUnmount() {
		console.log('DeedHomeScreen.componentWillUnmount called');
		let app = this.app;
		let mvcmypwa = this.getMvcMyPWAObject();
		
		mvcmypwa.unregisterEventListener('on_refreshPage', this.uuid);
	}

	renderDeedView() {
		switch(this.state.action) {
			case 'view':
				return (<DeedView app = {this.app} parent={this}/>);
			case 'create':
				return (<DeedCreateForm app = {this.app} parent={this}/>);
			case 'transfer':
				return (<DeedTransferForm app = {this.app} parent={this}/>);
			case 'offeronsale':
				return (<DeedSellForm app = {this.app} parent={this}/>);
			case 'buy':
				return (<DeedBuyForm app = {this.app} parent={this}/>);
			case 'check':
				return (<DeedCheckForm app = {this.app} parent={this}/>);
			default:
				return (<div>Error, wrong action {this.state.action}</div>);
		}
	}
	
	
	render() {
		let {loaded, action, deedinfo, txhash} = this.state;

		return (
			<div className="Screen">
				<Header app = {this.app} />
				<AppsPane app={this.app}>
				{(loaded === true ?
				this.renderDeedView() :
				<div>{deedinfo}</div>
				)}
				</AppsPane>
			</div>
		);
	}
}

// propTypes validation
DeedHomeScreen.propTypes = {
	app: PropTypes.object.isRequired,
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


export {DeedHomeScreen};
export default connect(mapStateToProps, mapDispatchToProps)(DeedHomeScreen);