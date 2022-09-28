class ContractKitWrapper {
	constructor(session) {
		this.session = session;
	}

	_getCTokenCode(currency) {
		if (!currency)
			return 'cUSD';

		let tokenaddress = currency.address.toLowerCase();

		switch(tokenaddress) {
			case '0x765de816845861e75a25fca122bb6898b8b1282a': // mainnet
			case '0x874069fa1eb16d44d622f2e0ca25eea172369bc1': // alfajores
				return 'cUSD';

			case '0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73': // mainnet
			case '0x10c892a6ec43a53e45d0b916b4b7d383b1b78c0f': // alfajores
				return 'cEUR';

			default:
				return 'cUSD';
		}
	}

	async sendToken(connection, transaction) {
		try {
			let account = connection.account;
			let provider = connection.provider;

			let currency = transaction.currency;
			
			let to_address = transaction.to;
			let transfer_amount = transaction.amount;

			// format transfer_amount to float string using currency
			let decimalamount_string = '0.00';

			if (currency) {
				let session = this.session;
				let global = session.getGlobalObject();

				let sessionuuid = session.getSessionUUID();
				let mvccurrencies = global.getModuleObject('mvc-currencies');

				let decimals = parseInt(currency.decimals);
				let decimalamount = await mvccurrencies.getDecimalAmount(sessionuuid, transfer_amount, decimals);
				decimalamount_string = await decimalamount.toFixedString();
			}
			
			// use contractKit to create raw transaction and request execution by connected wallet
			const Web3 = require('web3');
			const newKitFromWeb3 = require('@celo/contractkit').newKitFromWeb3;

			const web3 = new Web3(provider);
			let kit = newKitFromWeb3(web3);
		
			kit.defaultAccount = account;

			let stable_amount = kit.web3.utils.toWei(decimalamount_string, 'ether');

			const _ctokencode = this._getCTokenCode(currency);
			const stabletoken = await kit.contracts.getStableToken(_ctokencode);

			const tx = await stabletoken.transfer(to_address, stable_amount).send({feeCurrency: stabletoken.address});
			const tx_receipt = await tx.waitReceipt();

			let tx_info = {};

			if (tx_receipt) {
				tx_info.hash = tx_receipt.transactionHash;

				tx_info.blockNumber = tx_receipt.blockNumber;
				tx_info.from_address = tx_receipt.from;
				tx_info.status = tx_receipt.status;
				tx_info.status_int = (tx_receipt.status ? 10 : -10); // 1 success, -1 fail


				let ret = {success: true, tx_info};

				return ret;
			}

		}
		catch(e) {
			console.log('exception in ContractKitWrapper.sendToken: '+ e);
		}

		let ret = {success: false};

		return ret;
	}


	async sendTransaction(connection, txjson) {
		try {
			let account = connection.account;
			let provider = connection.provider;

			// use contractKit to create raw transaction and request execution by connected wallet
			const Web3 = require('web3');
			const newKitFromWeb3 = require('@celo/contractkit').newKitFromWeb3;

			const web3 = new Web3(provider);
			let kit = newKitFromWeb3(web3);
		
			kit.defaultAccount = account;

			if (!txjson.to)
			txjson.to = '0x0000000000000000000000000000000000000000'; // make sure contract calls have non null .to or get an error below

			const tx = await kit.sendTransaction(txjson);

			const hash = await tx.getHash();
			const receipt = await tx.waitReceipt()

			return receipt.transactionHash;
		}
		catch(e) {
			console.log('exception in ContractKitWrapper.sendTransaction: '+ e);
		}

		let ret = {success: false};

		return ret;
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

_GlobalClass.registerModuleClass('common', 'ContractKitWrapper', ContractKitWrapper);

