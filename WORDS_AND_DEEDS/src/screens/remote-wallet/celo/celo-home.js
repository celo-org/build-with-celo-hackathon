import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import {Header} from '@primusmoney/react_pwa/react-js-ui';

import RemoteWalletConnectForm from '../../../components/remote-wallet/remote-wallet-connect-form.js';

import CeloWalletView from '../../../components/remote-wallet/celo/celo-wallet-view.js';
//import CeloWalletView from '../../../components/remote-wallet/celo/test.js';
import CeloTransactionView from '../../../components/remote-wallet/celo/celo-transaction-view.js';



class CeloHomeScreen extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.app = this.props.app;
		this.getMvcMyPWAObject = this.app.getMvcMyPWAObject;
		
		this.uuid = this.app.guid();

		this.callparams = null;

		this.checking = false;
		this.closing = false;

		this.initialization = {};

		this.rpc = {
			44787: "https://alfajores-forno.celo-testnet.org",
			42220: "https://forno.celo.org",
		};

		this.state = {
			action: 'none',
			loaded: false,
			celoinfo: 'action...',
			processinginfo: 'loading...',

		};
	}
	
	_setState(state) {
		if (this.closing !== true)
		this.setState(state);
	}

	
	componentDidUpdate(prevProps) {
		console.log('CeloHomeScreen.componentDidUpdate called');
		
	}



	async checkNavigationState() {
		this.checking = true;

		try {
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
				if (!this.closing) {
					// check we are online
					let online = await this.app.checkOnline();

					if (!online) {
						let params = (app_nav_target ? app_nav_target.params : null);
						this.app.gotoRoute('about', params);
						//this.app.gotoRoute('offline', params);
						return;
					}

					// we open the default device wallet
					let devicewallet = await this.app.openDeviceWallet()
					.catch(err => {
					});
		
					walletuuid = devicewallet.uuid;
		
					this._setState({isdevicewallet: true});
				}
				else {
					let params = (app_nav_target ? app_nav_target.params : null);
					this.app.gotoRoute('login', params);
					return;
				}
			}
			else {
				let isdevicewallet = await this.app.isDeviceWallet(walletuuid);
	
				this._setState({isdevicewallet});
			}

			if (app_nav_target && (app_nav_target.route == 'celo') && (app_nav_target.reached == false)) {

				// mark target as reached
				app_nav_target.reached = true;
			}

			this.setState({loaded: true});

		}
		catch(e) {
			console.log('exception in CeloHomeScreen.checkNavigationState: '+ e);
		}
		finally {
			this.checking = false;
		}


	}


	componentDidMount() {
		console.log('CeloHomeScreen.componentDidMount called');

		this.checkNavigationState().catch(err => {console.log('error in checkNavigationState: ' + err);});
	}

	// end of life
	componentWillUnmount() {
		console.log('CeloHomeScreen.componentWillUnmount called');
		this.closing = true;

	}


	// rendering
	renderWalletView() {
		return (
			<div>
				<RemoteWalletConnectForm 
					app = {this.app}
					parent={this}
					rpc={this.rpc}
				/>
				<div className="Separator">&nbsp;</div>
				<CeloWalletView
					app = {this.app}
					parent={this}
				/>
			</div>
		);
	}


	render() {
		let {loaded, celoinfo, processinginfo} = this.state;

		return (
			<div className="Screen">
				<Header app = {this.app}/>

				<div className="Container">
				<div className="TitleBanner">
				<div className="Title">Celo</div>
				</div>

				<div className="Form">
					<div className="Explanations">{celoinfo}</div>
				<div className="Separator">&nbsp;</div>
					<div>{(loaded === true ? 
					this.renderWalletView() :
					processinginfo)}</div>
				</div>
				</div>

			</div>
		);
	}
	
	static getDerivedStateFromProps(nextProps, prevState) {
		// fill state
		return {
			rootsessionuuid: nextProps.rootsessionuuid,
		};
	}
}

// propTypes validation
CeloHomeScreen.propTypes = {
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


export {CeloHomeScreen};
export default connect(mapStateToProps, mapDispatchToProps)(CeloHomeScreen);