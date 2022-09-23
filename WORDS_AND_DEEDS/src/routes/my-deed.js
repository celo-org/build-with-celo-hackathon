import DeedHomeScreen from '../screens/mydeed/deed/deed-home.js';
import DeedListScreen from '../screens/mydeed/deed/deed-list-screen.js';

import ClauseHomeScreen from '../screens/mydeed/clause/clause-home.js';
import ClauseListScreen from '../screens/mydeed/clause/clause-list-screen.js';

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
				name: 'clauses',
				path: '/clauses',
				screen: ClauseListScreen
			},	
			{
				name: 'clause',
				path: '/clause',
				dataobject_back: {type: 'clause', path: 'clause', action: 'view', params: ['txhash', 'currencyuuid', 'minter', 'tokenid', 'index']},
				screen: ClauseHomeScreen
			}
		];
	}
}

export default Routes;