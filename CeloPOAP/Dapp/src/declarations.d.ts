declare module '@coreui/utils/src';

declare module '@coreui/chartjs/dist/js/coreui-chartjs.js';

declare module '*.json' {
  const value: any;
  export default value;
}

interface Window {
  ethereum: any,
  web3: any,
  celo: any
}