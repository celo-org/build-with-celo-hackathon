  // SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "./IERC20.sol";
import "./SafeMath.sol";

library DexLib {
  using SafeMath for uint256;

//   ///@dev Call router
//   function safeCall(address poolAddr, address user, uint value, bytes4 selector) internal {
//     require(poolAddr != address(0), "Pool addresss empty");
//     bytes memory data = abi.encodeWithSelector(selector, user);
//     (bool thisSuccess, ) = poolAddr.call{value:value}(data);
//     require(thisSuccess, "Proxy: operation failed");
//   }

  function checkAndWithdraw(address target, address approver, uint expColInToken) internal returns(uint allow) {
    allow = IERC20(target).allowance(approver, address(this));
    if(allow >= expColInToken) {
        require(IERC20(target).transferFrom(approver, address(this), allow), "Transfer failed");
    } else {
        revert("Collateral too low");
    }
    return allow;
  }

  /**@dev Returns calculated collateral
  */
  function calculateExpectedCollateralInStable(uint poolSize, int price, uint collacteralFactor) internal pure  returns(uint) {
    return poolSize.mul(uint(price)).mul(collacteralFactor).mul(1e18 wei).div(10**18);
  }

  ///@dev computes and return interests
  function calculateInterest(uint averageBlockPerDay, uint128 apr, uint _unit, uint16 duration) internal pure returns(uint intOnLoan, uint intPBlk) {
      uint ratePBlk = uint(apr).div(100.0e18).div(averageBlockPerDay * 365);
      intPBlk = ratePBlk.mul(_unit.mul(4)).div(1e18 wei);
      intOnLoan = intPBlk.mul(averageBlockPerDay * duration);
      
      return (intOnLoan, intPBlk);
  }

  function transferHelper(address token, address to, uint value) internal {
    require(IERC20(token).transfer(to, value), "Transfer failed");
  }

}