import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import ReactPWA from '@primusmoney/react_pwa/react-js-ui';
//import ReactPWA from './nodemodules/@primusmoney/react_pwa/react-js-ui';

import {App} from '@primusmoney/react_pwa/react-js-ui';

console.log('loading index.js');

// app config
var EXEC_ENV = 'prod';
var PWA_APP_VERSION = '0.15.43.2022.10.28';


App.EXEC_ENV = EXEC_ENV;

async function beforeAppLoad() {
	// we fill the xtra route modules for pocs
	const AppStore = App.getAppStore();
	AppStore.route_modules = {};

	// auth-card POC
	AppStore.route_modules['mydeed'] = await import('./routes/my-deed.js');

	return true;
}

async function afterAppLoad() {
	// load mvc-mydeed module
	require('./model/module-load.js');

	var app = App.getAppObject();
	app.current_version += ' - mydeed: ' + PWA_APP_VERSION;

	try {
		// get mydeed api
		var react_pwa = ReactPWA.getObject();
		var clientglobal = react_pwa.getGlobalObject();
		var mvcmydeed = clientglobal.getModuleObject('mvc-mydeed');
		mvcmydeed.current_version = PWA_APP_VERSION;

		app.getMvcMyDeedObject = () => { return mvcmydeed};

		// initialize deed client module
		var Client = require('./js/src/deed-client.js').default;
		var clientmodule = Client.getObject();

		await clientmodule.init();

		app.getDeedClientObject = () => { return clientmodule};

	}
	catch(e) {
		console.log('exception in afterAppLoad: ' + e);
	}

}


try {
	var react_pwa = ReactPWA.getObject();

	if (EXEC_ENV === 'prod')  {
		// suppress logs early, before doing it in App.onLoaded()
		// to avoid all the logs of react_pwa.init
		if (window.simplestore)	window.simplestore.noconsoleoverload = false;

		// could use react_pwa.muteConsoleLog() for version >= 0.30.11
	}

	console.log('starting initialization of react pwa in index.js');
	react_pwa.init()
	.then( (res) => {
		return beforeAppLoad();
	})
	.then((res) => {
		if (res) {
			console.log('initialization of react pwa finished in index.js');

			var clientglobal = react_pwa.getGlobalObject();

			if (EXEC_ENV === 'dev') {
				clientglobal.setExecutionEnvironment('dev');
				console.log('Execution environment turned to dev in index.js');
			}

			
			var appcore = App.getAppObject();

			return appcore.onLoaded();
		}
		else {
			throw new Error('react pwa did not initialize correctly');
		}
	})
	.then((res) => {
		console.log('app core is now loaded in index.js');

		return afterAppLoad();
	})
	.catch((err) => {
		console.log('error initializing react pwa : ' + err);
	});

}
catch(e) {
	console.log('exception in index.js: ' + e);
	console.log(e.stack);
}
 
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
