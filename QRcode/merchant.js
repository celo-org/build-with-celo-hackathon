// user details 
const userInfo = {
 avatar: 'https://cdn.dribbble.com/users/958158/screenshots/14192094/media/c769e137d35a8b7feb5bd5fd047abd3a.gif', 
 hero: 'https://static.codepen.io/assets/profile/profile-bg-8ff33bd9518be912289d4620cb48f21eb5c9a2e0b9577484126cfe10a5fb354f.svg', 
 website: 'https://online.kfc.co.in/menu', 
 name: 'KFC', 
 info: 'KENTUCKY FRIED CHICKEN temporary merchant', 
}; 

// crypto wallets 
const cryptoWallets = [
 {
  symbol: 'WINR', 
  name: 'Wrapped indian rupees',
  address: '13R8NFPs7oFjDof3pQ832g1RgEkkkFqBAN', 
 }, 
 {
  symbol: 'Food', 
  name: 'Food tokens',
  address: '0x1c2a703e0939389c2b7c09f6422a3f56451e5b42', 
 }, 
 {
  symbol: 'Pellets', 
  name: 'Game Tokens',
  address: 'LgKxe22pt8qP3RHsNEXw7GzcFdzNBHnZEy', 
 }, 
 {
  symbol: 'Gas', 
  name: 'Transaction fee',
  address: 'xrb_1gwcfutq437fxaiqkckijede91f7binhbttfehufr9xckgwzitnkefwr3d48', 
 }, 
 {
  symbol: 'CNFT', 
  name: 'NFT',
  address: 'AHYs2QxbzzoGdDfMjKfnEgMAdUGJswYWVa', 
 },
];

// number format filter 
Vue.filter( 'toMoney', ( num, decimals ) => {
 let o = { style: 'decimal', minimumFractionDigits: decimals, maximumFractionDigits: decimals };
 return new Intl.NumberFormat( 'en-US', o ).format( num );
});

// vue instance 
new Vue({
 el: '#card', 
 
 // app data 
 data: {
  userInfo, 
  cryptoWallets,
  tab: 'WINR', 
  wallet: {}, 
  statsCache: {}, 
  stats: {}, 
 }, 
 
 // computed methods 
 computed: {
  
  // compute list wallets for tabs 
  walletsList() {
   return this.cryptoWallets.map( w => {
    w.active = ( w.symbol === this.tab ); 
    return w;
   }); 
  }, 
 }, 
 
 // custom methods 
 methods: {
  
  // select active tab wallet 
  selectWallet( symbol ) {
   let wallet = this.cryptoWallets.filter( w => w.symbol === symbol ).shift(); 
   if ( !wallet ) return; 
   wallet.copied = 0; 
   this.wallet = wallet;  
   this.tab = symbol; 
   this.fetchStats( symbol ); 
  },  
  
  // copy text to clipboard
  copyText( txt ) {
   txt = String( txt || '' ).trim();
   if ( !txt ) return;
   let input = document.createElement( 'input' );
   document.body.appendChild( input );
   input.value = txt;
   input.select();
   document.execCommand( 'Copy' );
   document.body.removeChild( input ); 
   this.wallet = Object.assign( {}, this.wallet, { copied: 1 } ); 
  },
  
  // get qr image url for selected wallet 
  getQrImage() {
   const w = 180; 
   const h = 180; 
   const a = this.wallet.address; 
   return `https://chart.googleapis.com/chart?chs=${w}x${h}&cht=qr&choe=UTF-8&chl=${a}`;
  }, 
  
  // set coin stats 
  setStats( symbol, data ) {
   let price  = 0;
   let cap    = 0;
   let supply = 0;
   let time   = Date.now(); 
   let stats  = Object.assign( { price, cap, supply, time }, data ); 
   this.statsCache[ symbol ] = stats; 
   this.stats = stats; 
  }, 
  
  // fetch market stats for a symbol 
  fetchStats( symbol ) {
   let stats = this.statsCache[ symbol ] || null; 
   let price = stats ? stats.price : 0; 
   let secs  = stats ? ( ( Date.now() - stats.time ) / 1000 ) : 0; 
   
   // use values from cache 
   if ( price && secs < 300 ) {
    return this.setStats( symbol, stats );
   }
   // reset and fetch new values from api 
   this.setStats( symbol ); 
   const xhr = new XMLHttpRequest();
   xhr.open( 'GET', 'https://coincap.io/page/'+ symbol, true );
   xhr.setRequestHeader( 'X-Requested-With', 'XMLHttpRequest' );
   xhr.responseType = 'json';
   xhr.addEventListener( 'load', e => { 
    if ( !xhr.response || !xhr.response.id ) return;  
    let price  = parseFloat( xhr.response.price ) || 0; 
    let cap    = parseFloat( xhr.response.market_cap ) || 0; 
    let supply = parseFloat( xhr.response.supply ) || 0; 
    this.setStats( symbol, { price, cap, supply } ); 
   });
   xhr.send();
  }, 
 }, 
 
 // when component mounts 
 mounted() {
  this.selectWallet( this.tab ); 
 }, 
});