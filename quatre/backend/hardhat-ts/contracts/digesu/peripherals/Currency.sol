// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

abstract contract Currency {

  // Supported tokens:
  mapping (address=>bool) private supportedTokens;

  //Ensures token is supported by this contract
  modifier onlySupportedToken(address token) {
    if(!supportedTokens[token]) revert ("Not supported");
    _;
  }

  /**@dev Updates the storage for supportedTokens
   * Note Dual function: Can also remove support for `newToken`;
   * @param newToken: newSupported token or to be removed.
  */
  function setSupportedTokens(address newToken) public virtual {
    bool isSupported = supportedTokens[newToken];
    supportedTokens[newToken] = !isSupported;
  }

  // Returns token is supported or otherwise
  function _supportedToken(address token) internal view returns (bool) {
    return supportedTokens[token];
  }

}