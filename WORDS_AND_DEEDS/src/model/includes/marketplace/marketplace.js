'use strict';
class NftMarketplace {
	constructor(session, contractaddress, web3providerurl) {
		this.session = session;
		this.address = contractaddress;
		
		this.web3providerurl = web3providerurl;

		this.contractpath = './contracts/erc721_marketplace_v1/Marketplace.json';
		
		// operating variables
		this.contractinstance = null;

	}

	getContractPath() {
		return this.contractpath;
	}

	setContractPath(path) {
		this.contractpath = path;
		this.contractinstance = null;
	}
	
	getContractInstance() {
		if (this.contractinstance)
			return this.contractinstance;
		
		var session = this.session;
		var global = session.getGlobalObject();
		var ethnodemodule = global.getModuleObject('ethnode');

		var contractpath = this.getContractPath();
		
		this.contractinstance = ethnodemodule.getContractInstance(session, this.address, contractpath, this.web3providerurl);
		
		return this.contractinstance;
	}

	// contract methods

	// read
	async getListingFee() {
		var contractinstance = this.getContractInstance();

		var params = [];
	
		const valstr = await contractinstance.method_call('getListingFee', params);
		
		return valstr;
	}

	async getListedNfts() {
		var contractinstance = this.getContractInstance();

		var params = [];
	
		const arr = await contractinstance.method_call('getListedNfts', params);
		
		return arr;
	}

	async getMyNfts() {
		var contractinstance = this.getContractInstance();

		var params = [];
	
		const arr = await contractinstance.method_call('getMyNfts', params);
		
		return arr;
	}

	async getMyListedNfts() {
		var contractinstance = this.getContractInstance();

		var params = [];
	
		const arr = await contractinstance.method_call('getMyListedNfts', params);
		
		return arr;
	}

	// transactions
	async listNft(tokenaddress, nftid, price, ethtx) {
		var contractinstance = this.getContractInstance();

		var fromaccount = ethtx.getFromAccount();
		var payingaccount = ethtx.getPayingAccount();

		payingaccount = (payingaccount ? payingaccount : fromaccount);

		var gas = ethtx.getGas();
		var gasPrice = ethtx.getGasPrice();

		var transactionuuid = ethtx.getTransactionUUID();
		var value = ethtx.getValue();


		var contractinstance = this.getContractInstance();
		var contracttransaction = contractinstance.getContractTransactionObject(payingaccount, gas, gasPrice);

		contracttransaction.setArguments(args);
		
		contracttransaction.setContractTransactionUUID(transactionuuid);
		contracttransaction.setValue(value);

		contracttransaction.setMethodName('listNft');		
		
		var args = [];
	
		args.push(tokenaddress);
		args.push(nftid);
		args.push(price);
		
		contracttransaction.setArguments(args);

		return contractinstance.method_send(contracttransaction);
	}

	async buyNft(tokenaddress, nftid, ethtx) {
		var contractinstance = this.getContractInstance();

		var fromaccount = ethtx.getFromAccount();
		var payingaccount = ethtx.getPayingAccount();

		payingaccount = (payingaccount ? payingaccount : fromaccount);

		var gas = ethtx.getGas();
		var gasPrice = ethtx.getGasPrice();

		var transactionuuid = ethtx.getTransactionUUID();
		var value = ethtx.getValue();


		var contractinstance = this.getContractInstance();
		var contracttransaction = contractinstance.getContractTransactionObject(payingaccount, gas, gasPrice);

		contracttransaction.setArguments(args);
		
		contracttransaction.setContractTransactionUUID(transactionuuid);
		contracttransaction.setValue(value);

		contracttransaction.setMethodName('buyNft');		
		
		var args = [];
	
		args.push(tokenaddress);
		args.push(nftid);
		
		contracttransaction.setArguments(args);

		return contractinstance.method_send(contracttransaction);
	}

	async resellNft(tokenaddress, nftid, price, ethtx) {
		var contractinstance = this.getContractInstance();

		var fromaccount = ethtx.getFromAccount();
		var payingaccount = ethtx.getPayingAccount();

		payingaccount = (payingaccount ? payingaccount : fromaccount);

		var gas = ethtx.getGas();
		var gasPrice = ethtx.getGasPrice();

		var transactionuuid = ethtx.getTransactionUUID();
		var value = ethtx.getValue();


		var contractinstance = this.getContractInstance();
		var contracttransaction = contractinstance.getContractTransactionObject(payingaccount, gas, gasPrice);

		contracttransaction.setArguments(args);
		
		contracttransaction.setContractTransactionUUID(transactionuuid);
		contracttransaction.setValue(value);

		contracttransaction.setMethodName('resellNft');		
		
		var args = [];
	
		args.push(tokenaddress);
		args.push(nftid);
		args.push(price);
		
		contracttransaction.setArguments(args);

		return contractinstance.method_send(contracttransaction);
	}

	// static
	static getObject() {
		if (NftMarketplace.instance)
			return NftMarketplace.instance;
		
		NftMarketplace.instance = new NftMarketplace();

		return NftMarketplace.instance;
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

_GlobalClass.registerModuleClass('common', 'NftMarketplace', NftMarketplace);

