import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {Header} from '@primusmoney/react_pwa/react-js-ui';

import ClauseListView from '../../../components/mydeed/clause/clause-list-view.js';

class ClauseListScreen extends React.Component {
	constructor(props) {
		super(props);
		
		this.app = this.props.app;
		this.getMvcMyPWAObject = this.app.getMvcMyPWAObject;
		
		this.uuid = this.app.guid();
		
		
		this.state = {
			action: 'create',
			txhash: null,
			loaded: false,
			quoteinfo: 'loading...'
		};
	}
	
	// post render commit phase
	componentDidMount() {
		console.log('ClauseListScreen.componentDidMount called');
		
		this.checkNavigationState().catch(err => {console.log('error in checkNavigationState: ' + err);});
	}

	async checkNavigationState() {
		let mvcmypwa = this.getMvcMyPWAObject();

		let rootsessionuuid = this.props.rootsessionuuid;

		let app_nav_state = this.app.getNavigationState();
		let app_nav_target = app_nav_state.target;

		if (app_nav_target && (app_nav_target.route == 'quote') && (app_nav_target.reached == false)) {
			var params = app_nav_target.params;

			if (params) {
				let txhash = params.txhash;
				let quoteinfo = '';
				let action = (params.action ? params.action : 'create');
	
				if (txhash) {
					// retrieve info from firenze
					quoteinfo = txhash;
				}
	
				this.setState({action, txhash, quoteinfo});
			}

			// QuoteView will take care of marking target reached
		}

		this.setState({loaded: true});
	}
	
	// end of life
	componentWillUnmount() {
		console.log('ClauseListScreen.componentWillUnmount called');
		let app = this.app;
		let mvcmypwa = this.getMvcMyPWAObject();
		
	}
	
	
	render() {
		let {loaded, action, quoteinfo, txhash} = this.state;

		return (
			<div className="Screen">
				<Header app = {this.app} />
				{(loaded === true ?
				<ClauseListView app = {this.app} /> :
				<div>{quoteinfo}</div>
				)}
			</div>
		);
	}
}

// propTypes validation
ClauseListScreen.propTypes = {
	app: PropTypes.object.isRequired,
};



export default ClauseListScreen;