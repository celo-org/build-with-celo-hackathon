import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

import PropTypes from 'prop-types';

import { faMobileAlt, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



class DeedListView extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.app = this.props.app;
		this.parent = this.props.parent;
		
		this.getMvcMyPWAObject = this.app.getMvcMyPWAObject;
		this.getMvcMyDeedObject = this.app.getMvcMyDeedObject;

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
		console.log('DeedListView.componentDidMount called');

		let mvcmypwa = this.getMvcMyPWAObject();

		let rootsessionuuid = this.props.rootsessionuuid;
		let walletuuid = this.props.currentwalletuuid;
		
		mvcmypwa.registerEventListener('on_refreshPage', this.uuid, this.onRefreshPage.bind(this));
	

		this.checkNavigationState().catch(err => {console.log('error in DeedListView.checkNavigationState: ' + err);});
	}

	async _readAllDeeds() {
		let mvcmypwa = this.getMvcMyPWAObject();
		let mvcmydeed = this.getMvcMyDeedObject();

		let rootsessionuuid = this.props.rootsessionuuid;
		let walletuuid = this.props.currentwalletuuid;

		let deeds = await mvcmydeed.readDeeds(rootsessionuuid, walletuuid);

		// enrich items
		for (var i = 0; i < deeds.length; i++) {
			deeds[i].uuid = deeds[i].txhash;
			deeds[i].formattedtime = (deeds[i].time ? mvcmypwa.formatDate(deeds[i].time/1000, 'YYYY-mm-dd HH:MM:SS') : mvcmypwa.formatDate(deeds[i].savetime/1000, 'YYYY-mm-dd HH:MM:SS'));
			deeds[i].title = (deeds[i].title ? deeds[i].title : mvcmypwa.t('token' + ' ' + deeds[i].tokenid));
			deeds[i].currency = await mvcmypwa.getCurrencyFromUUID(rootsessionuuid, deeds[i].currencyuuid).catch(err => {});
		}

		return deeds;
	}

	async _checkDeedCurrency(deed) {
		try {
			const URL = require("url");
			return;

			// we retrieve the basetokenuri we entered to check currency and minter match
			let minter = deed.minterobject;
			let basetokenuri = minter.basetokenuri;

			if (basetokenuri) {
				let {query} = URL.parse(basetokenuri, true);
				let minter_currencyuuid = query.ccy;

				if (minter_currencyuuid && (minter_currencyuuid !== deed.currencyuuid)) {
					console.log('fixing currency of deed ' + deed.txhash + ' to ' + minter_currencyuuid);
					deed.currencyuuid = minter_currencyuuid;
				}
			}
			else {
				return; // can not check
			}
		}
		catch(e) {
		}

		return;
	}

	async _fetchChainDeeds() {
		let mvcmypwa = this.getMvcMyPWAObject();
		let mvcmydeed = this.getMvcMyDeedObject();

		let rootsessionuuid = this.props.rootsessionuuid;
		let walletuuid = this.props.currentwalletuuid;

		let currencies = await mvcmypwa.getCurrencies(rootsessionuuid, walletuuid);

		if (!currencies)
			return Promise.reject('could not get list of currencies');

		var deeds = [];

		if (!walletuuid)
			return deeds;

		for (var i = 0; i < currencies.length; i++) {
			let _currency = currencies[i];

			let _currencycards = await mvcmypwa.getCurrencyCardList(rootsessionuuid, walletuuid, _currency.uuid);
			let _currencydeeds = [];

			// enrich items
			for (var j = 0; j < _currencycards.length; j++) {
				let _currencycard = _currencycards[j];

				var minter = await mvcmydeed.fetchDeedMinter(rootsessionuuid, walletuuid, _currency.uuid, _currencycard.uuid).catch(err => {
					console.log('error: ' + err);
				});

				if (!minter) continue;

				let _currencycarddeeds = await mvcmydeed.fetchDeeds(rootsessionuuid, walletuuid, _currency.uuid, minter).catch(err => {
					console.log('error: ' + err);
				});

				// enrich items
				for (var k = 0; k < (_currencycarddeeds ? _currencycarddeeds.length : 0); k++) {
					let _currencycarddeed = _currencycarddeeds[k]
					var metadata = (_currencycarddeed.metadata ? _currencycarddeed.metadata : {title: mvcmypwa.t('token') + ' ' + _currencycarddeed.tokenid});

					_currencycarddeed.uuid = _currencycarddeed.txhash;

					_currencycarddeed.time = metadata.time;
					_currencycarddeed.title = (metadata.title ? metadata.title : mvcmypwa.t('no title'));
					_currencycarddeed.formattedtime = (_currencycarddeed.time ? mvcmypwa.formatDate(_currencycarddeed.time/1000, 'YYYY-mm-dd HH:MM:SS') : mvcmypwa.t('no time'));;
					
					_currencycarddeed.currencyuuid = _currency.uuid;
					_currencycarddeed.minterobject = minter;

					// check the currency of the card did match the currency of the minter (in case deed was created on another device)
					await this._checkDeedCurrency( _currencycarddeed);
				}

				_currencydeeds = _currencydeeds.concat(_currencycarddeeds);
			}

			// merge
			deeds = deeds.concat(_currencydeeds);
		}

		return deeds;		
	}

	async _filterDeeds(currency) {
		let items = [];
		let deeds = this.deeds;

		if (currency) {
			// filter items
			for (var i = 0; i < deeds.length; i++) {
				if (currency.uuid === deeds[i].currencyuuid) {
					items.push(deeds[i]);
				}
			}
		}
		else {
			items = deeds;
		}

		return items;
	}

	async checkNavigationState() {
		let mvcmypwa = this.getMvcMyPWAObject();
		let mvcmydeed = this.getMvcMyDeedObject();

		let rootsessionuuid = this.props.rootsessionuuid;
		let walletuuid = this.props.currentwalletuuid;

		let app_nav_state = this.app.getNavigationState();
		let app_nav_target = app_nav_state.target;

		if (app_nav_target && (app_nav_target.route == 'deeds') && (app_nav_target.reached == false)) {
			// mark target as reached
			app_nav_target.reached = true;
		}

		let currencies = await mvcmypwa.getCurrencies(rootsessionuuid, walletuuid);

		if (!currencies)
			return Promise.reject('could not get list of currencies');

		// read deed saved locally
		this.deeds = await this._readAllDeeds();

		// filter items on curreny
		let currency = this.state.currency;
		let items = await this._filterDeeds(currency);

		// sort descending order
		if (items)
		items.sort(function(a,b) {return ((b.time !== undefined ? b.time : 0) - (a.time !== undefined ? a.time : 0));});

		this._setState({currencies, items});

		// fetch list of deeds for all cards for all currencies
		// to see if there are additional deeds to save
		let chaindeeds = await this._fetchChainDeeds();

		for (var i = 0; i < chaindeeds.length; i++) {
			await mvcmydeed.saveDeed(rootsessionuuid, walletuuid, chaindeeds[i]);
		}

		// refresh deeds list from local (updated) list
		this.deeds = await this._readAllDeeds();
		items = await this._filterDeeds(currency);

		// sort descending order
		if (items)
		items.sort(function(a,b) {return ((b.time !== undefined ? b.time : 0) - (a.time !== undefined ? a.time : 0));});

		this._setState({currencies, items});
	}
	
	async onRefreshPage() {
		console.log('DeedListView.onRefreshPage called');
	}
	
	// end of life
	componentWillUnmount() {
		console.log('DeedListView.componentWillUnmount called');
		
		let app = this.app;
		let mvcmypwa = this.getMvcMyPWAObject();
		
		this.closing = true;

		mvcmypwa.unregisterEventListener('on_refreshPage', this.uuid);
	}

	
	// user actions
	async onClickItem(item) {
		let currencyuuid = item.currencyuuid;
		let txhash = item.txhash;
		let minter = item.minter;
		let tokenid = item.tokenid;

		let mvcmydeed = this.getMvcMyDeedObject();

		let rootsessionuuid = this.props.rootsessionuuid;
		let walletuuid = this.props.currentwalletuuid;

		let minterobj = item.minterobject;

		if (!minterobj) {
			minterobj = await mvcmydeed.fetchDeedMinterFromAddress(rootsessionuuid, walletuuid, currencyuuid, minter).catch(err => {
				console.log('error: ' + err);
			});
		}


		let stop = false;
		let deed = await mvcmydeed.fetchDeed(rootsessionuuid, walletuuid, currencyuuid, minterobj, tokenid)
		.catch(err => {
			console.log('error in DeedListView.onClickItem ' + err);

			if (err == 'ERR_MISSING_CREDENTIALS') {
				this.app.alert('No sufficient rights to perform action.');
				stop = true;
			}
		});

		if (stop === true)
			return;

		if (!deed) {
			this.app.alert('Could not find deed. Deeds may take a few seconds before being fully registered.')
			return;
		}

		let params = {action: 'view', currencyuuid, txhash, address: minterobj.address, tokenid, dataobject: deed};

		this.app.gotoRoute('deed', params);
	}

	renderItem(item){
		let mvcmypwa = this.app.getMvcMyPWAObject();

		let title = mvcmypwa.fitString(item.title, 21);
		let formattedtime = item.formattedtime;
		let uuid = item.uuid;

		let currencysymbol = (item.currency ? item.currency.symbol : '-');

		return (
			<tr key={uuid} onClick={() => this.onClickItem(item)}>
				<th>{formattedtime}</th>
				<th>{currencysymbol}</th>
				<th>{title}</th>
			</tr>
		);
	}
	
	renderList() {
		let {items} = this.state;

		return (
			<Table responsive>
				<thead className="ListHeader">
					<tr>
					<th>Time</th>
					<th>ccy</th>
					<th>Title</th>
					</tr>
				</thead>
				<tbody className="ListItem" >
				{items.map((item, index) => {
					return (this.renderItem(item));
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
				<div className="Title">List of deeds</div>
				{this.renderList()}
			</div>
		);
	}
	
}


// propTypes validation
DeedListView.propTypes = {
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


export {DeedListView};
export default connect(mapStateToProps, mapDispatchToProps)(DeedListView);

