import DeedHomeScreen from '../screens/mydeed/deed/deed-home.js';
import DeedListScreen from '../screens/mydeed/deed/deed-list-screen.js';

import ClauseHomeScreen from '../screens/mydeed/clause/clause-home.js';
import ClauseListScreen from '../screens/mydeed/clause/clause-list-screen.js';

import CeloHomeScreen from '../screens/remote-wallet/celo/celo-home.js';
import RemoteWalletHomeScreen from '../screens/remote-wallet/remote-wallet-home.js';

import QRCodeReaderHomeScreen from '../screens/common/qr-code-reader/qr-code-reader-home.js';


import '../css/mydeed.css';
class Routes {

	static getRoutes(app) {
		return [
			{
				name: 'deeds',
				path: '/deeds',
				screen: DeedListScreen
			},	
			{
				name: 'deed',
				path: '/deed',
				dataobject: {type: 'deed', path: 'deed', action: 'view', params: ['txhash', 'currencyuuid', 'minter', 'tokenid']},
				screen: DeedHomeScreen
			},	
			{
				name: 'deedview',
				path: '/deedview',
				screen: DeedHomeScreen
			},
			{
				name: 'clauses',
				path: '/clauses',
				screen: ClauseListScreen
			},	
			{
				name: 'clause',
				path: '/clause',
				dataobject_back: {type: 'clause', path: 'clause', action: 'view', params: ['txhash', 'currencyuuid', 'minter', 'tokenid', 'index']},
				screen: ClauseHomeScreen
			},	
			{
				name: 'remotewallet',
				path: '/remotewallet',
				screen: RemoteWalletHomeScreen
			},	
			{
				name: 'celo',
				path: '/celo',
				screen: CeloHomeScreen
			},
			{
				name: 'qrcodereader',
				path: '/qrcodereader',
				screen: QRCodeReaderHomeScreen
			}
		];
	}
}

export default Routes;