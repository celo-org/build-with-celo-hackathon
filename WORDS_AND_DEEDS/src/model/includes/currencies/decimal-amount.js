'use strict';

var DecimalAmount = class {
	constructor(session, amount, decimals) {
		this.session = session;
		this.amount = amount;
		this.decimals = decimals;
	}

	async init() {
		// full precision representation
		this.amount_as_string = await DecimalAmount._stringifyAmount(this.session, this.amount, this.decimals);
		this.amount_as_int =  await DecimalAmount._integerifyAmount(this.session, this.amount_as_string, this.decimals);

		// big number for opertions
		var global = this.session.getGlobalObject();
		var _globalscope = global.getExecutionGlobalScope();
		var _simplestore = _globalscope.simplestore;

		this.BigNumber = _simplestore.BigNumber;
		this.amount_as_bignumber = new this.BigNumber(this.amount_as_string);

	}

	async _updatePrecisionRepresentation() {
		// use this.amount_as_bignumber
		var _amount_as_string = this.amount_as_bignumber.toString();
		this.amount_as_string = await DecimalAmount._stringifyAmount(this.session, _amount_as_string, this.decimals);
		this.amount_as_int =  await DecimalAmount._integerifyAmount(this.session, this.amount_as_string, this.decimals);
	}

	// logical operations
	async equals(decimalamount) {
		var _otheramount = ((decimalamount instanceof DecimalAmount) !== true ? decimalamount.toString() : decimalamount.amount_as_bignumber);

		return this.amount_as_bignumber.isEqualTo(_otheramount);
	}

	// representation
	async toInternalString() {
		return this.amount_as_string;
	}


	async toString() {
		var amountstring = (this.amount_as_bignumber ? this.amount_as_bignumber.toString() : '0');

		return amountstring;
	}

	async toInteger() {
		return this.amount_as_int;
	}

	async toFixedString(decimals) {
		var amountstring = this.amount_as_string;

		if (decimals && (decimals < this.decimals)) {
			// we cut end
			amountstring = amountstring.slice(0, amountstring.includes.length - (this.decimals - decimals) - 1);
		}

		return amountstring;
	}

	async toBigNumber() {
		return this.amount_as_bignumber;
	}

	// simple mathematical operations
	async multiply(multiplier) {
		this.amount_as_bignumber = this.amount_as_bignumber.multipliedBy(multiplier);

		await this._updatePrecisionRepresentation();

		return this;
	}

	async divide(divisor) {
		this.amount_as_bignumber = this.amount_as_bignumber.dividedBy(divisor);

		await this._updatePrecisionRepresentation();

		return this;
	}

	async add(decimalamount) {
		if ((decimalamount instanceof DecimalAmount) !== true)
			return Promise.reject('wrong decimal amount type');

		this.amount_as_bignumber = this.amount_as_bignumber.plus(decimalamount.amount_as_bignumber);

		await this._updatePrecisionRepresentation();

		return this;
	}

	async substract(decimalamount) {
		if ((decimalamount instanceof DecimalAmount) !== true)
			return Promise.reject('wrong decimal amount type');

		this.amount_as_bignumber = this.amount_as_bignumber.minus(decimalamount.amount_as_bignumber);

		await this._updatePrecisionRepresentation();

		return this;
	}

	// static
	static async create(session, amount, decimals) {
		var decamount = new DecimalAmount(session, amount, decimals);

		await decamount.init();
		
		return decamount;
	}

	static async _integerifyAmount(session, amount, decimals) {
		if (amount === undefined)
			return;

		if (decimals === undefined)
			return;

			var _inputamountstring;
			var _outputinteger;
	
			// turn into a string with a decimal part
			if(typeof amount == 'number' && !isNaN(amount)){
	
				// check if it is integer
				if (Number.isInteger(amount)) {
					return amount;
				}
				else {
					// it's a float
					_inputamountstring = amount.toString();
				}
			
			}
			
			if (typeof amount === 'string' || amount instanceof String) {
				// we parse the string and turn it into a clean float string
				// if necessary
				let parts = amount.split('.');
	
				let integerpart = ( Number.isInteger(parseInt(parts[0])) ? parts[0] : '0');
				let decimalpart = ( Number.isInteger(parseInt(parts[1])) ? parts[1] : '0');

				_inputamountstring = integerpart + '.' + decimalpart;
			}

			if (_inputamountstring) {
				// fill the decimals up to the required length
				let parts = _inputamountstring.split('.');
	
				let integerpart = parts[0];
				let decimalpart;
	
				if (parts[1].length > decimals)
					decimalpart = parts[1].substring(decimals); // cut
				else {
					decimalpart = parts[1]; // fill if necessary
					for (var i = 0; i < (decimals -parts[1].length) ; i++) decimalpart += '0';
				}
	
				_outputinteger = parseInt(integerpart + decimalpart);
			}
	
			return _outputinteger;
	}

	static async _stringifyAmount(session, amount, decimals) {
		if (amount === undefined)
			return;

		if (decimals === undefined)
			return;


		var _inputamountstring;
		var _outputamountstring;

		// turn into a string with a decimal part
		if(typeof amount == 'number' && !isNaN(amount)){

			// check if it is integer
			if (Number.isInteger(amount)) {
				let amount_str = amount.toString();

				let integerpart = (amount_str.length > decimals ? amount_str.substring(0, amount_str.length - decimals) : '0');
				let decimalpart = (amount_str.length > decimals ? amount_str.substring(amount_str.length - decimals, amount_str.length - 1) : '0');
				
				_inputamountstring = integerpart + '.' + decimalpart;
			}
			else {
				// it's a float
				_inputamountstring = amount.toString();
			}
		
		}
		
		if (typeof amount === 'string' || amount instanceof String) {
			// we parse the string and turn it into a clean float string
			// if necessary
			let parts = amount.split('.');

			let integerpart = ( parts[0] ? parts[0] : '0');
			let decimalpart = ( parts[1] ? parts[1] : '0');

			_inputamountstring = integerpart + '.' + decimalpart;
		}


		if (_inputamountstring) {
			// fill the decimals up to the required length
			let parts = _inputamountstring.split('.');

			let integerpart = (parts[0] ? parts[0] : '');
			let decimalpart;

			if (parts[1]) {
				if (parts[1].length > decimals)
				decimalpart = parts[1].substring(decimals); // cut
				else {
					decimalpart = parts[1]; // fill if necessary
					for (var i = 0; i < (decimals -parts[1].length) ; i++) decimalpart += '0';
				}

				_outputamountstring = integerpart + '.' + decimalpart;
			}
			else {
				_outputamountstring = integerpart;
			}


		}
			

		return _outputamountstring;
	}

	static async _formatAmount(session, amount, decimals, options) {
		if (amount === undefined)
			return;
		
		var _inputamountstring = amount.toString();
		var amountstring;
		
		if (_inputamountstring.length > decimals) {
			// integer part
			var integerpart = _inputamountstring.substring(0, _inputamountstring.length - decimals);

			amountstring = integerpart + '.' + _inputamountstring.substring(_inputamountstring.length - decimals);
		}
		else {
			var leading = '';
			for (var i = 0; i < (decimals -_inputamountstring.length) ; i++) leading += '0';
			amountstring = '0.' + leading + _inputamountstring;
		}

		if (options) {
			if (typeof options.showdecimals !== 'undefined') {
				if (options.showdecimals === false) {
					// we remove . and after
					amountstring = amountstring.substring(0, amountstring.indexOf('.'));
				}
				else {
					var decimalsshown = (options.decimalsshown ? options.decimalsshown : decimals);
					amountstring = amountstring.substring(0, amountstring.indexOf('.') + 1 + decimalsshown);
				}

			}
		}

		return amountstring;
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

_GlobalClass.registerModuleClass('mvc-myquote', 'DecimalAmount', DecimalAmount);
