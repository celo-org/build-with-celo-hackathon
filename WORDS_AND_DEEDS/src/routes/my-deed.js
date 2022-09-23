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
				screen: ClauseHomeScreen
			}
		];
	}
}

export default Routes;