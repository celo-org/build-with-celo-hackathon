import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

import {Header} from '@primusmoney/react_pwa/react-js-ui';

import { QrReader } from 'react-qr-reader';

class QRCodeReaderHomeScreen extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.app = this.props.app;
		this.getMvcMyPWAObject = this.app.getMvcMyPWAObject;
		
		this.uuid = this.app.guid();

		this.checking = false;

		this.state = {
			facingMode: 'environment',
			facing: {variant: 'secondary'},
			rear: {variant: 'primary'},

			action: 'view-list',
			loaded: false,
			readerinfo: 'loading...'		
		};		
	}
	

	componentDidUpdate(prevProps) {
		console.log('QRCodeReaderHomeScreen.componentDidUpdate called');
		
	}

	async checkNavigationState() {
		this.checking = true;

		try {
			let mvcmypwa = this.getMvcMyPWAObject();

			let rootsessionuuid = this.props.rootsessionuuid;
			let walletuuid = this.props.currentwalletuuid;
	
			let app_nav_state = this.app.getNavigationState();
			let app_nav_target = app_nav_state.target;
	
			if (app_nav_target && (app_nav_target.route == 'qrcodereader') && (app_nav_target.reached == false)) {
				var params = app_nav_target.params;
	
				if (params) {
					let action = (params.action ? params.action : 'view-list');
		
					this.setState({action});
				}
	
				// CurrencyCardListView will take care of marking target reached
			}
	
			this.setState({loaded: true});
		}
		catch(e) {
			console.log('exception in QRCodeReaderHomeScreen.checkNavigationState: '+ e);
		}
		finally {
			this.checking = false;
		}


	}


	componentDidMount() {
		console.log('QRCodeReaderHomeScreen.componentDidMount called');

		this.checkNavigationState().catch(err => {console.log('error in checkNavigationState: ' + err);});
	}

	// end of life
	componentWillUnmount() {
		console.log('QRCodeReaderHomeScreen.componentWillUnmount called');

	}


	setAction(flag) {
		this.setState({action: flag});
	}

	async _isValidUrl(url_string) {
		var inputElement = document.createElement('input');
		inputElement.type = 'url';
		inputElement.value = url_string;
  
		if (!inputElement.checkValidity()) {
		  return false;
		} else {
		  return true;
		}
	}

	async _confirm(message) {
		return window.confirm(message);
	}

	async onRead(result, error) {
		if (!!result) {
			let url = result.text;
			let isUrl = await this._isValidUrl(url);
			
			if (isUrl) {
				let _cr = '\r\n';
				let message = 'Go to? ' + _cr + _cr + url;

				let choice = await this._confirm(message);

				if (choice) {
					console.log('Jumping to ' + url);
					await this.app.gotoUrl(url);
				}
			}
			else {
				this.app.alert('Could not read a proper url!')
			}
			
		}
	}

	async onSwitchCamera(e) {
		let {facingMode, facing, rear} = this.state;

		switch(facingMode) {
			case 'user': {
				let value = (e && e.length && e.includes('environment') ? 'environment' : 'user');

				if (value == 'user')
				return;

				facing.variant = 'secondary';
				rear.variant = 'primary';

				facingMode = 'environment';

				this.setState({facingMode, facing, rear});
			}
			break;

			case 'environment': {
				let value = (e && e.length && e.includes('user') ? 'user' : 'environment');

				if (value == 'environment')
				return;

				facing.variant = 'primary';
				rear.variant = 'secondary';

				facingMode = 'user';

				this.setState({facingMode, facing, rear});
			}
			break;

			default:
				break;
		}
	}

	render() {
		let {facingMode, facing, rear, loaded, readerinfo} = this.state;

		let constraints = {facingMode};

		return (
			<div className="Screen">
				<Header app = {this.app}/>
				<div className="Container">
				<div className="TitleBanner">
				<div className="Title">QR Code Reader</div>
				</div>

				<div className="QRCoderReader">
				<QrReader
					key={(facingMode == 'user' ? 'user' : 'environment')}
					onResult={this.onRead.bind(this)}
					style={{ width: '100%' }}
					constraints={constraints}
				/>
				</div> 
				<ToggleButtonGroup
				type="checkbox"
				onChange={this.onSwitchCamera.bind(this)}
				>
				<ToggleButton value={'user'} variant={facing.variant}>Facing</ToggleButton>
				<ToggleButton value={'environment'} variant={rear.variant}>Rear</ToggleButton>
				</ToggleButtonGroup>


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
QRCodeReaderHomeScreen.propTypes = {
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


export {QRCodeReaderHomeScreen};
export default connect(mapStateToProps, mapDispatchToProps)(QRCodeReaderHomeScreen);