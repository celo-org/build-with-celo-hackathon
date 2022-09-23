import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {Header} from '@primusmoney/react_pwa/react-js-ui';

import ClauseCreateForm from '../../../components/mydeed/clause/clause-create-form.js';
import ClauseView from '../../../components/mydeed/clause/clause-view.js';

class ClauseHomeScreen extends React.Component {
	constructor(props) {
		super(props);
		
		this.app = this.props.app;
		this.getMvcModuleObject = this.app.getMvcModuleObject;
		this.getMvcMyPWAObject = this.app.getMvcMyPWAObject;
		
		this.uuid = this.app.guid();
		
		
		this.state = {
			action: 'create',
			txhash: null,
			loaded: false,
			clauseinfo: 'loading...',
		};
	}
	
	// post render commit phase
	componentDidMount() {
		console.log('ClauseHomeScreen.componentDidMount called');
		let mvcmypwa = this.app.getMvcMyPWAObject();
		
		mvcmypwa.registerEventListener('on_refreshPage', this.uuid, this.onRefreshPage.bind(this));
		
		this.checkNavigationState().catch(err => {console.log('error in checkNavigationState: ' + err);});
	}
	
	async checkNavigationState() {
		let mvcmypwa = this.getMvcMyPWAObject();

		let rootsessionuuid = this.props.rootsessionuuid;
		
		let app_nav_target = this.app.getNavigationState('target');

		if (app_nav_target && (app_nav_target.route == 'clause') && (app_nav_target.reached == false)) {
			var params = app_nav_target.params;

			if (params) {
				let action = (params.action ? params.action : 'view');
				let txhash = params.txhash;
				let clauseinfo = '';
	
				if (txhash) {
					// retrieve info from firenze
					clauseinfo = txhash;
				}
	
				this.setState({txhash, action, clauseinfo});
			}

			// QuoteView will take care of marking target reached
		}

		this.setState({loaded: true});
	}

	async onRefreshPage() {
		console.log('ClauseHomeScreen.onRefreshPage called');

		return this.checkNavigationState().catch(err => {console.log('error in checkNavigationState: ' + err);});
	}
	

	// end of life
	componentWillUnmount() {
		console.log('ClauseHomeScreen.componentWillUnmount called');
		let app = this.app;
		let mvcmypwa = this.getMvcMyPWAObject();
		
		mvcmypwa.unregisterEventListener('on_refreshPage', this.uuid);
	}
	
	
	render() {
		let {loaded, action, clauseinfo} = this.state;

		return (
			<div className="Screen">
				<Header app = {this.app} />
				{(loaded === true ?
				(action === 'view' ?
				<ClauseView app = {this.app} /> :
				<ClauseCreateForm app = {this.app} />)
				: <div>{clauseinfo}</div>)}
			</div>
		);
	}
}

// propTypes validation
ClauseHomeScreen.propTypes = {
	app: PropTypes.object.isRequired,
};



export default ClauseHomeScreen;