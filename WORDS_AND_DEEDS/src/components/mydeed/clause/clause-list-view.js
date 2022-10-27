import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

import PropTypes from 'prop-types';

import { faMobileAlt, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




class ClauseListView extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.app = this.props.app;
		this.parent = this.props.parent;

		this.getMvcMyPWAObject = this.app.getMvcMyPWAObject;
		this.getMvcMyDeedObject = this.app.getMvcMyDeedObject;

		this.deed = this.props.deed;

		this.uuid = this.app.guid();

		this.closing = false;
		
		this.state = {
			items: []
		}
	}

	_setState(state) {
		if (this.closing !== true)
		this.setState(state);
	}

	
	// post render commit phase
	componentDidMount() {
		console.log('ClauseListView.componentDidMount called');
		
		let mvcmypwa = this.getMvcMyPWAObject();
		
		let rootsessionuuid = this.props.rootsessionuuid;
		let walletuuid = this.props.currentwalletuuid;
		
		mvcmypwa.registerEventListener('on_refreshPage', this.uuid, this.onRefreshPage.bind(this));
		
		this.checkNavigationState().catch(err => {console.log('error in ClauseListView.checkNavigationState: ' + err);});
	}

	async checkNavigationState() {
		let mvcmypwa = this.getMvcMyPWAObject();

		let rootsessionuuid = this.props.rootsessionuuid;
		let walletuuid = this.props.currentwalletuuid;

		let app_nav_state = this.app.getNavigationState();
		let app_nav_target = app_nav_state.target;

		if (app_nav_target && (app_nav_target.route == 'clauses') && (app_nav_target.reached == false)) {
			// mark target as reached
			app_nav_target.reached = true;
		}

		if (this.deed) {
			let currencyuuid = this.deed.currencyuuid;
	
			let minter_address = this.deed.minter;
			let tokenid = this.deed.tokenid;

			let clauses = this.deed.clauses;
			let articles = [];

			for (var i = 0; i < (clauses ? clauses.length : 0); i++) {
				if (clauses[i].subtype == 'article') {
					clauses[i].uuid = clauses[i].txhash;

					clauses[i].formattedtime = mvcmypwa.formatDate(clauses[i].time/1000, 'YYYY-mm-dd HH:MM:SS');

					articles.push(clauses[i]);
				}
			}

			this._setState({items: articles});

	
		}



	}
	
	async onRefreshPage() {
		console.log('ClauseListView.onRefreshPage called');
	}
	
	// end of life
	componentWillUnmount() {
		console.log('ClauseListView.componentWillUnmount called');

		let app = this.app;
		let mvcmypwa = this.getMvcMyPWAObject();
		
		this.closing = true;

		mvcmypwa.unregisterEventListener('on_refreshPage', this.uuid);
	}

	
	// user actions
	async onClickItem(item) {
		let txhash = item.txhash;
		let currencyuuid = item.currencyuuid;

		let mvcmypwa = this.getMvcMyPWAObject();

		let rootsessionuuid = this.props.rootsessionuuid;
		let walletuuid = this.props.currentwalletuuid;

		let clause = item;

		let params = {action: 'view', txhash, currencyuuid, dataobject: clause};

		this.app.gotoRoute('clause', params);
	}

	renderItem(item, index){
		let mvcmypwa = this.app.getMvcMyPWAObject();

		let header = item.header;
		let formattedtime = item.formattedtime;
		let content = item.content;
		let uuid = item.txhash;

		return (
			<tr key={uuid} onClick={() => this.onClickItem(item)}>
				<th>
				<div className="ClauseArticleHeader">art. {index + 1} - {header}</div>
				<div className="ClauseArticleContent">{content}</div>
				<div className="ClauseArticleTime">{formattedtime}</div>
				</th>
			</tr>
		);

	}

	renderList() {
		let {items} = this.state;

		return (
			<Table responsive>
				<thead className="ListHeader">
					<tr>
					<th>Articles</th>
					</tr>
				</thead>
				<tbody className="ListItem" >
				{items.map((item, index) => {
					return (this.renderItem(item, index));
				})}
				</tbody>
			</Table>
		);

	}
	
	
	// rendering
	render() {
		let {items} = this.state;
		
		return (
			<div className="Container">
				<div className="Title">List of clauses</div>
				{this.renderList()}
			</div>
		);
	}
	
}


// propTypes validation
ClauseListView.propTypes = {
	app: PropTypes.object.isRequired,
	rootsessionuuid: PropTypes.string,
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


export {ClauseListView};
export default connect(mapStateToProps, mapDispatchToProps)(ClauseListView);

