// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BaseApiUrl: 'https://localhost:3053',
  web3StorageToken: '',

  // //harhat
  // poapFactoryAddress: '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853',
  // poapMarketAddress: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'

  //celotest
  poapFactoryAddress: '0xac8B204895d7d8B51A46ed7D2B37079C14a0CD54',
  poapMarketAddress: '0xb90F1858B0E6D6B30D711c70241F045063b378bF'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
