import React, { Component } from 'react';

import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RemoteWalletIcon = ({ app, currency, connection }) => {
	var theapp = app;
	var thecurrency = currency;
	var theconnection = connection;

	const onShowRemoteWallet = () => {
		let params = {currencyuuid: thecurrency.uuid, connectionuuid: theconnection.uuid};
		theapp.gotoRoute('remotewallet', params);
	}

	return (
		<FontAwesomeIcon 
			icon={faWallet}
			size="3x"
			onClick={onShowRemoteWallet}
		/>

	);
};
  

export default RemoteWalletIcon;