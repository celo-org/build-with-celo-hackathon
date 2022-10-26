//export const UNSUPPORTED_LIST_URLS: string[] = []

const COMPOUND_LIST = 'https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json';
const UBESWAP_LIST = 'https://raw.githubusercontent.com/Ubeswap/default-token-list/master/ubeswap.token-list.json'
//const UBESWAP_EXPERIMENTAL_LIST =
//  'https://raw.githubusercontent.com/Ubeswap/default-token-list/master/ubeswap-experimental.token-list.json'
// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
    UBESWAP_LIST,
    //UBESWAP_EXPERIMENTAL_LIST,
    COMPOUND_LIST,
    //...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
  ]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [UBESWAP_LIST, COMPOUND_LIST]
