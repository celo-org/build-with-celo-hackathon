import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';


class AppsPane extends React.Component {
	constructor(props) {
		super(props);
		
		this.app = this.props.app;

		this.getMvcMyPWAObject = this.app.getMvcMyPWAObject;
		this.getMvcMyDeedObject = this.app.getMvcMyDeedObject;
	}

	// connection methods
	_getRemoteConnectionFromRpc(rpc) {
		return this.app.getDeedClientObject().getConnectionFromRpc(rpc);
	}

	// deeds methods
	async getDeedCardContext(currencyuuid, minter, deed) {
		let context = {remotewallet: false};
		let deedcard;

		try {
			let mvcmypwa = this.getMvcMyPWAObject();
			let mvcmydeed = this.getMvcMyDeedObject();
	
			let rootsessionuuid = this.props.rootsessionuuid;
			let walletuuid = this.props.currentwalletuuid;

			if (!walletuuid)
				return context; // no wallet open, we have no cards
	
			let currency = await mvcmypwa.getCurrencyFromUUID(rootsessionuuid, currencyuuid);
	
			deedcard = await mvcmydeed.getDeedOwningCard(rootsessionuuid, walletuuid, currencyuuid, minter, deed).catch(err => {});

			// check if card is read-only
			let cansign = await mvcmydeed.canCardSign(rootsessionuuid, walletuuid, deedcard.uuid);

			if (!cansign) {
		
				// check if corresponding currency is set for remote
				let config = this.app.getConfig('remotewallet');	
	
				if (config && config.rpc && config.rpc[currency.uuid]) {
					let curr_rpc_config = config.rpc[currency.uuid];
	
					if (curr_rpc_config.enabled === true) {
						context.rpc = curr_rpc_config.rpc;
	
						// check if a remote wallet is connected
						context.connection = await this._getRemoteConnectionFromRpc(context.rpc);
	
						if (context.connection && context.connection.account) {
							let areequal = await mvcmypwa.areAddressesEqual(rootsessionuuid, context.connection.account, deedcard.address);
							if (areequal) {
								// we are connected to a remote wallet supporting this
								// currency's rpc and having this card address
								context.remotewallet = true;
							}
							else {
								deedcard = null;
							}
						}
						else {
							deedcard = null;
						}
	
					}
				}
				else {
					deedcard = null;
				}
	
			}
	
		}
		catch(e) {
			console.log('exception in DeedClient.getDeedOwningCard: ' + e);
		}

		context.deedcard = deedcard;

		return context;
	}

	// post render commit phase
	componentDidMount() {
		// register to app
		this.app.setVariable('AppsPane',this);
	}

	// end of life
	componentWillUnmount() {
		console.log('AppsPane.componentWillUnmount called');
		
		// unregister from app
		this.app.setVariable('AppsPane',null);
	}

	render() {
		return (
			<div className="AppsPane">
			{this.props.children}
			</div>
		);
	}
}

// propTypes validation
AppsPane.propTypes = {
	app: PropTypes.object.isRequired,
	rootsessionuuid: PropTypes.string,
	currentwalletuuid: PropTypes.string,
	iswalletlocked: PropTypes.bool,
};

//redux
const mapStateToProps = (state) => {
	return {
		rootsessionuuid: state.session.sessionuuid,
		pending: state.login.pending,
		success: state.login.success,
		lasterror: state.login.error,
		currentwalletuuid: state.wallets.walletuuid,
		iswalletlocked: state.wallets.islocked,
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
	};
}

export {AppsPane};
export default connect(mapStateToProps, mapDispatchToProps)(AppsPane);
