'use strict';

var CurrencyAmount = class {
	constructor(session, currency, amount) {
		this.session = session;
		this.currency = currency;

		this.amount = amount;

		var global = session.getGlobalObject();
		var DecimalAmountClass = global.getModuleClass('currencies', 'DecimalAmount');

		if ((amount instanceof DecimalAmountClass) !== true)
			this.decimalamount = amount;
		else
			this.decimalamount = null;
	}

	async init() {
		if (this.decimalamount)
			return; // init of decimal amount should have been done before calling constructor

		var global = this.session.getGlobalObject();
		var DecimalAmountClass = global.getModuleClass('currencies', 'DecimalAmount');
	
		this.decimalamount = await DecimalAmountClass.create(this.session, this.amount, this.decimals);
	}

	async getDecimalAmount() {
		return this.decimalamount;
	}

	async toString() {
		return this.decimalamount.toString();
	}

	async toInteger() {
		return this.decimalamount.toInteger();
	}

	async multiply(multiplier) {
		await this.decimalamount.multiply(multiplier);

		 return this;
	}

	async toDecoratedString(options) {
		var session = this.session;
		var global = session.getGlobalObject();
		var mvccurrenciesmodule = global.getModuleObject('mvc-currencies');

		var amount = await this.decimalamount.toInteger();
		var symbol = this.currency.symbol;
		var decimals = this.currency.decimals;
		
		var amountstring = await mvccurrenciesmodule._formatMonetaryAmount(session, amount, symbol, decimals, options);

		return amountstring;
	}




	static async create(session, currency, amount) {
		// analyse amount type transform it to integer
		return new CurrencyAmount(session, currency, amount);
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

_GlobalClass.registerModuleClass('mvc-myquote', 'CurrencyAmount', CurrencyAmount);
