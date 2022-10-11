import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {Header} from '@primusmoney/react_pwa/react-js-ui';

import RemoteWalletView from '../../components/remote-wallet/remote-wallet-view.js';

class RemoteWalletHomeScreen extends React.Component {
	constructor(props) {
		super(props);
		
		this.app = this.props.app;
		this.getMvcMyPWAObject = this.app.getMvcMyPWAObject;

		this.connectionuuid = null;
		this.currencyuuid = null;
		
		this.uuid = this.app.guid();
		
		this.checking = false;
		
		this.state = {
			action: 'view',
			txhash: null,
			loaded: false,
			remotewalletinfo: 'loading...',
		};
	}
	
	// post render commit phase
	componentDidMount() {
		console.log('RemoteWalletHomeScreen.componentDidMount called');
		let mvcmypwa = this.app.getMvcMyPWAObject();
		
		mvcmypwa.registerEventListener('on_refreshPage', this.uuid, this.onRefreshPage.bind(this));
		
		this.checkNavigationState().catch(err => {console.log('error in checkNavigationState: ' + err);});
	}
	
	async checkNavigationState() {
		this.checking = true;

		let mvcmypwa = this.getMvcMyPWAObject();

		let rootsessionuuid = this.props.rootsessionuuid;
		
		let app_nav_target = this.app.getNavigationState('target');

		try {

			if (app_nav_target && (app_nav_target.route == 'remotewallet') && (app_nav_target.reached == false)) {
				var params = (app_nav_target.params ? app_nav_target.params : {});

				this.connectionuuid = params.connectionuuid;
				this.currencyuuid = params.currencyuuid;

				// mark target as reached
				app_nav_target.reached = true;
			}

		}
		catch(e) {
			console.log('exception in CeloHomeScreen.checkNavigationState: '+ e);
		}
		finally {
			this.checking = false;
		}

		this.setState({loaded: true});
	}

	async onRefreshPage() {
		console.log('RemoteWalletHomeScreen.onRefreshPage called');

		return this.checkNavigationState().catch(err => {console.log('error in checkNavigationState: ' + err);});
	}
	

	// end of life
	componentWillUnmount() {
		console.log('RemoteWalletHomeScreen.componentWillUnmount called');
		let app = this.app;
		let mvcmypwa = this.getMvcMyPWAObject();
		
		mvcmypwa.unregisterEventListener('on_refreshPage', this.uuid);
	}

	renderWalletView() {
		switch(this.state.action) {
			case 'view':
				return (<RemoteWalletView app={this.app} parent={this} connectionuuid={this.connectionuuid} currencyuuid={this.currencyuuid}/>);
			case 'load':
				return (<div>Not implemented {this.state.action}</div>);
			default:
				return (<div>Error, wrong action {this.state.action}</div>);
		}
	}
	
	
	render() {
		let {loaded, action, remotewalletinfo} = this.state;

		return (
			<div className="Screen">
				<Header app = {this.app} />
				{(loaded === true ?
				this.renderWalletView()
				: <div>{remotewalletinfo}</div>)}
			</div>
		);
	}
}

// propTypes validation
RemoteWalletHomeScreen.propTypes = {
	app: PropTypes.object.isRequired,
};



export default RemoteWalletHomeScreen;