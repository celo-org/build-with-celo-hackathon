'use strict';


var Module = class {
	
	constructor() {
		this.name = 'mvc-mydeed';
		
		this.global = null; // put by global on registration

		this.isready = false;
		this.isloading = false;
		
	}
	
	init() {
		console.log('module init called for ' + this.name);

		var global = this.global;
		
		this.isready = true;

		this.Linker = global.getModuleClass('common', 'Linker');

	}
	
	// compulsory  module functions
	loadModule(parentscriptloader, callback) {
		console.log('loadModule called for module ' + this.name);
		
		if (this.isloading)
			return;
			
		this.isloading = true;

		var self = this;

		// load module's files
		var modulescriptloader = parentscriptloader.getChildLoader('mvcmydeedloader');

		modulescriptloader.load_scripts(function() { self.init(); if (callback) callback(null, self); });

		return modulescriptloader;	
	}
	
	isReady() {
		return this.isready;
	}

	hasLoadStarted() {
		return this.isloading;
	}

	// optional module functions
	registerHooks() {
		console.log('module registerHooks called for ' + this.name);
		
		var global = this.global;

		global.registerHook('creatingSession_hook', this.name, this.creatingSession_hook);
	}
	
	postRegisterModule() {
		console.log('postRegisterModule called for ' + this.name);
		if (!this.isloading) {
			var global = this.global;
			var self = this;
			var rootscriptloader = global.getRootScriptLoader();
			
			this.loadModule(rootscriptloader, function() {
				if (self.registerHooks)
				self.registerHooks();
			});
		}
	}

	//
	// hooks
	//
	creatingSession_hook(result, params) {
		console.log('creatingSession_hook called for ' + this.name);
		
		var global = this.global;
		var session = params[0];
		
		return true;
	}

	
	_getClientAPI() {
		if (this.clientapicontrollers)
			return this.clientapicontrollers;
		
		var global = this.global;
		
		var mvcmodule = global.getModuleObject('mvc');
		
		this.clientapicontrollers = mvcmodule._getClientAPI();

		return  this.clientapicontrollers;
	}

	_getMvcPWAObject() {
		var global = this.global;
		
		var mvcmodule = global.getModuleObject('mvc-myquote');

		return mvcmodule;
	}

	// API


	//
	// Deeds
	//

	// minter
	async deployDeedMinter(sessionuuid, walletuuid, currencyuuid, carduuid, minter, connection) {

		if (!connection || !connection.type || (connection.type == 'local')) {
			var mvcpwa = this._getMvcPWAObject();

			return mvcpwa.deployDeedMinter(sessionuuid, walletuuid, currencyuuid, carduuid, minter, (connection && connection.feelevel ? connection.feelevel : null));
		}
	}


	async mintDeed(sessionuuid, walletuuid, currencyuuid, minter, connection) {

		if (!connection || !connection.type || (connection.type == 'local')) {
			var mvcpwa = this._getMvcPWAObject();

			return mvcpwa.mintDeed(sessionuuid, walletuuid, currencyuuid, minter, (connection && connection.feelevel ? connection.feelevel : null));
		}
	}


	async transferDeed(sessionuuid, walletuuid, currencyuuid, minter, deed, toaddress, connection) {
		
		if (!connection || !connection.type || (connection.type == 'local')) {
			var mvcpwa = this._getMvcPWAObject();

			return mvcpwa.transferDeed(sessionuuid, walletuuid, currencyuuid, minter, deed, toaddress, (connection && connection.feelevel ? connection.feelevel : null));
		}
	}

	async registerClause(sessionuuid, walletuuid, currencyuuid, minter, deed, clause, connection) {
		
		if (!connection || !connection.type || (connection.type == 'local')) {
			var mvcpwa = this._getMvcPWAObject();

			return mvcpwa.registerClause(sessionuuid, walletuuid, currencyuuid, minter, deed, clause, (connection && connection.feelevel ? connection.feelevel : null));
		}
	}
}


if ( typeof window !== 'undefined' && typeof window.GlobalClass !== 'undefined' && window.GlobalClass ) {
	var _GlobalClass = window.GlobalClass;
}
else if (typeof window !== 'undefined') {
	var _GlobalClass = ( window && window.simplestore && window.simplestore.Global ? window.simplestore.Global : null);
}
else if (typeof global !== 'undefined') {
	// we are in node js
	var _GlobalClass = ( global && global.simplestore && global.simplestore.Global ? global.simplestore.Global : null);
}

_GlobalClass.getGlobalObject().registerModuleObject(new Module());

// dependencies
_GlobalClass.getGlobalObject().registerModuleDepency('mvc-mydeed', 'common');
