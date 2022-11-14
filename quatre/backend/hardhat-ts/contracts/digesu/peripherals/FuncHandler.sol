// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "../interfaces/ICommon.sol";

abstract contract FuncHandler is ICommon {
  
  /**
    @dev Maps functions to Access
      Note: Functions can either be in locked or open mode.
  */
  mapping(uint => mapping(FuncTag => Access)) private fLock;

  /**@dev Function contexts determines if certain internal function 
   * should run or not. Each internal callable function should run only
   * in the context of the external function for which they're defined.
   * All internal functions are locked by default and bound to specific function.
   */
  // mapping (FuncTag=>bool) private context;

  // /**Internal func must be in context of specific function 
  //  * for which they're bound.
  //  * @param tag :  Function handle
  //  */
  // modifier isAContextOf(FuncTag exTag, bool unlock) {
  //   bool _isContext = context[exTag];
  //   if(unlock) {
  //     context[exTag] = true; 
  //   } else {
  //     if(!_isContext) revert NonInContext();

  //   }
  //   _;
  //   if(_isContext) context[exTag] = false;
  // }

  // // Returns the four bytes of a function signature
  // function _sig(string memory funcLiteral) internal pure returns(bytes4 _sig_) {
  //   _sig_ = bytes4(
  //     keccak256(
  //       bytes(
  //         funcLiteral
  //       )
  //     )
  //   )
  // }
  
  /**
    @dev Determine if function should be called at this time.
      @param tag - Function handle. See IStorage.FuncTag'
   */
  modifier checkFunctionPass(uint poolId, FuncTag tag) {
    require(_fStatus(poolId, tag) == Access.ALLOWED, "Locked");
    _;
  }

  
  ///@dev locks function with @param tag : Function handle
  function _lock(uint pid, FuncTag tag) internal {
    fLock[pid][tag] = Access.DENIED;
  }

  ///@dev Unlocks function with @param tag : Function handle
  function _unlock(uint pid, FuncTag tag) internal {
    fLock[pid][tag] = Access.ALLOWED;
  }

  /**@dev Return status of predefined functions.
   * @param pid : pool Id
   * @param tag : Function tag
   */
  function _fStatus(uint pid, FuncTag tag) internal view returns (Access _status) {
    _status = fLock[pid][tag];
  }


}