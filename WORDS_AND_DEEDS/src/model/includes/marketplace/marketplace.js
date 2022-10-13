class NftMarketplace {
	constructor(session) {
		this.session = session;
	}

	async listNft(tokenaddress, nftid, price) {

	}

	async buyNft(tokenaddress, nftid) {

	}

	async resellNft(tokenaddress, nftid, price) {

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

