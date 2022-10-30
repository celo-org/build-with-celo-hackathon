    // SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../token/IERC20.sol";
import "../interfaces/Params.sol";
import "./Address.sol";
import "../interfaces/ICommon.sol";
// import "./SafeMath.sol";

library Utils {
    // using SafeMath for uint256;

    ///@dev Requires the three conditions to be true
    function assertChained3(bool a, bool b, bool c, string memory errorMessage) internal pure {
        require(a && b && c, errorMessage);
    }

    ///@dev Requires the three conditions to be true
    function assertChained4(bool a, bool b, bool c, bool d, string memory errorMessage) internal pure {
        require(a && b && c && d, errorMessage);
    }

    ///@dev Requires the three conditions to be true 
    function assertChained2(bool a, bool b, string memory errorMessage) internal pure {
        require(a && b, errorMessage);
    }

    ///@dev Requires the three conditions to be true 
    function assertEither(bool a, bool b, string memory errorMessage) internal pure {
        require(a || b, errorMessage);
    }

    ///@dev Requires conditions to be true 
    function assertUnchained(bool condition, string memory errorMessage) internal pure {
        require(condition, errorMessage);
    }

    ///@dev Requires conditions to be true 
    function assertNotUnchained(bool condition, string memory errorMessage) internal pure {
        require(!condition, errorMessage);
    }

    ///@dev Asserts condition is true, and the callback is executed
    function ifTrueCallBack(bool condition, function(uint64, address) internal callback, uint64 pid, address user) internal {
        if(condition) callback(pid, user);
    }

    // Simple arithmetic : Multiplication and division
    function mulDivOp(uint256 value, uint8 numerator) internal pure returns (uint _return) {
        if(value == 0 || numerator == 0) return 0; 
        _return = (value * numerator) / 100;
    }
    
    // Enquire and return the collateral balances of `who` in QFT.
    function getCollateralBalance(address token, address who) internal view returns(uint256) {
        IERC20.AccountBalances memory acc = IERC20(token).accountBalances(who);

        return acc.spendable;
    }

    ///@dev Checks allowance from user `p1.from`
    function screenAllowance(ICommon.MC memory p1) internal view returns(ICommon.MC memory) {
        uint amount = IERC20(p1.token).allowance(p1.from, p1.to);
        require(amount >= p1.amount, "No allowance found");
        p1.amount = amount;
        return p1;
    }

    ///@dev Withdraws allowance from user `p1.from`
    function getDeposit(ICommon.MC memory p1, address to) internal returns (uint) {
        require(IERC20(p1.token).transferFrom(p1.from, to, p1.amount), "Transfer failed");
        return p1.amount;
    }

       // ///@dev Returns balance of who
    // function getBalance(Params.TokenParams memory p1) internal view returns(Params.TokenParams memory) {
    //     p1.amount = IERC20(p1.token).balanceOf(p1.subject);
    //     return p1;
    // }

    ///@dev transfer Assets
    function transfer(ICommon.MC memory p1) internal {
        require(IERC20(p1.token).transfer(p1.to, p1.amount), "Withdrawal failed");
    }

    ///@dev Withdraws 
    function forwardAsset(ICommon.MC memory p1) internal {
        require(IERC20(p1.token).transfer(p1.to, p1.amount), "Withdrawal failed");
    }

    // Restricts `param.who` from moving token of amount `param.amount`
    function lockCollateral(address token, address who, uint amount) internal {
        IERC20(token).lockFor(who, amount);
        // bytes memory data = abi.encodeWithSignature("lockFor(address,uint)", param.who, param.amount);
        // (bool s, bytes memory returndata) = param.token.call(data);
        // Address.verifyCallResult(s, returndata, "failed");
    }

    // Restricts `param.who` from moving token of amount `param.amount`
    function unlockCollateral(ICommon.GCB memory param) internal {
        Address.functionCall(param.token, abi.encodeWithSelector(
            bytes4(
                keccak256(
                    bytes(
                        "unlockFor(address,address,uint,uint,uint)"
                        )
                    )
                ), 
               param.who, param.to, computeReward(param.cr, param.cr2), param.amount, param.amountTo));
    }

    /** 
        Reward calculator
        ================
        o CA = User's contributed amount.
        o TC = Total contribution at the time of call.
        o TS = Total subscribers.
        o ERD = Expected repayment duration (in days).

        Reward = CA.div(TC).mul(TS).mul(ERD)
    
     */
    function computeReward(ICommon.CR memory param, ICommon.CR2 memory param2) internal pure returns (uint) {
        uint mantissa = 10**10;
        // return param2.valueContributed.mul(mantissa).div(param.totalValueContributed).mul(param.subscribers).mul(param2.erd).div(mantissa);
        return ((((param2.valueContributed * mantissa) / param.totalValueContributed) * param.subscribers) * param2.erd) / mantissa;
    }

    // Restricts `param.who` from moving token of amount `param.amount`
    function moveCollateral(address token, address to, address from, uint amount) internal {
        Address.functionCall(token, abi.encodeWithSelector(bytes4(keccak256(bytes("unlockAndTransfer(address,address,uint)"))), from, to, amount));
    }

    // Compute and return collateral value
    function computeCollateral(ICommon.CC memory param) internal returns (uint) {
        uint discAssetValueInETH;
        uint256 discAssetValueInToken = getCollateralBalance(param.token, param.who);
        discAssetValueInETH = discAssetValueInToken * param.assetPriceInETH;
        assertUnchained(discAssetValueInETH >= param.loanValueInETH, "Insufficient Collateral");
        discAssetValueInToken = param.loanValueInETH / param.assetPriceInETH;
        uint ccr = (discAssetValueInETH * 100) / param.loanValueInETH;
        assertUnchained(ccr >= param.expectedCcr, "Ratio is low");
        lockCollateral(param.token, param.who, discAssetValueInToken);
        
        return discAssetValueInToken;
        // return Params.Return1(discAssetValueInETH, discAssetValueInToken, ccr);
    }

    ///@dev Distributes capital to all members, clears trustee.
    function _clearTrustee(address trustee, address[50] memory addresses)internal {
        Address.functionCall(trustee, abi.encodeWithSelector(bytes4(keccak256(bytes("distribute(address[])"))), addresses));
    }

    /**
        @dev Computes maker fee.
            Note : Maker rate must be in denomination of 1000 e.g 1010, 1100 etc.
        Example: 1015 = 1.5%. 1150 = 15%, 1500 = 150%.
    */
    function computeMakerFee(ICommon.CMF memory cmf) internal pure returns (uint mFee, uint owings) {
        mFee = (((cmf.makerRate * 10**10) / 1000) * cmf.amount) / 10**10;
        owings = mFee + cmf.amount;
        // return uint(cmf.makerRate).mul(10 ** 10).div(1000).mul(cmf.amount).div(10 ** 10).add(cmf.amount);
    }

    function zeroAddress(address which) internal pure returns(bool _return) {
        _return = which == address(0);
    }

}