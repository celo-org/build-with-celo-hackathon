import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {Header} from '@primusmoney/react_pwa/react-js-ui';

import AppsPane from '../../core/apps-pane.js';

import DeedListView from '../../../components/mydeed/deed/deed-list-view.js';

class DeedListScreen extends React.Component {
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
		console.log('DeedListScreen.componentDidMount called');
		
		this.checkNavigationState().catch(err => {console.log('error in checkNavigationState: ' + err);});
	}

	async checkNavigationState() {
		let mvcmypwa = this.getMvcMyPWAObject();

		let app_nav_state = this.app.getNavigationState();
		let app_nav_target = app_nav_state.target;

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
	
	// end of life
	componentWillUnmount() {
		console.log('DeedListScreen.componentWillUnmount called');
		let app = this.app;
		let mvcmypwa = this.getMvcMyPWAObject();
		
	}
	
	
	render() {
		let {loaded, action, deedinfo, txhash} = this.state;

		return (
			<div className="Screen">
				<Header app = {this.app} />
				<AppsPane app={this.app}>
				{(loaded === true ?
				<DeedListView app = {this.app} /> :
				<div>{deedinfo}</div>
				)}
				</AppsPane>


			</div>
		);
	}
}

// propTypes validation
DeedListScreen.propTypes = {
	app: PropTypes.object.isRequired,
};

export default DeedListScreen;