// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "./ERC20Abstract.sol";
import "./Pausable.sol";
import "./Ownable.sol";
// import "../digesu/interfaces/ICommonParam.sol";

/**
    @title QuatreFinance Token is the native token of the Quatrefinance platform.
            It is a utility token that gives its holders access to Quatrefinance
            products.
        Standard: ERC20 Standard.
        Type: Deflationary.
        Max Supply: 1_000_000_000.
        Decimal: 18.

        For more detail, see ERC20Abstract.sol

    @author 
        For: Quatrefinance 
        By: Bobeu
            Github: https://github.com/bobeu
            Twitter: https://twitter.com/bobman7000
*/
contract QuatreToken is ERC20Abstract, Pausable, Ownable {
    // Reward switcher
    bool private rewardActive;

    // Action only Digesu can perform.
    modifier onlyDigesu() {
        address digesu = _digesuAddr();
        require(digesu != address(0) && _msgSender() == digesu, "NA");
        _;
    }

    constructor (address initTokenRecipient) ERC20Abstract("QuatreFinance Token", "QFT", initTokenRecipient) { rewardActive = true; }

    receive () external payable { payable(_digesuAddr()).transfer(msg.value); } 

    ///@dev Pauses the contract. When called, some functions are halted.
    function pause() public onlyOwner {
        _pause();
    }

    ///@dev unpauses the contract.
    function unpause() public onlyOwner {
        _unpause();
    }

    ///@dev Moves the balance of an 'amount' from locked to regular balances
    function unlockSpecific(uint amount) public override whenNotPaused {
        _unlock(UnlockParam(_msgSender(), amount, true));
    }

    ///@dev Moves the balance of an 'amount' from locked to regular balances
    function panicMove(address lostAddress) public whenNotPaused onlyOwner {
        _panicMove(lostAddress);
    }

    ///@dev Moves the balance of an 'amount' from regular to locked to balances
    function lockSpecific(address routeTo, uint256 amount, uint16 lockTil) public override whenNotPaused {
        require(lockTil > 0, "Zero Days");
        _lock(LockParam(_msgSender(), routeTo, amount, lockTil, true));
    }

    ///@dev Mints token of `amount  
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    ///@dev Burns token of `amount`
    function burn(uint amount) public {
        _burn(_msgSender(), amount);
    }

    ///@dev Returns max supply
    function maxSupply() public returns (uint) {
        return _maxSupply();
    }

    /** Locks specific amount to `tsrget's` account
        @notice Callable only by the Digesu contract on behalf of subscribers on approval.
        Note : User must initiate a transaction that initiate the call otherise Digesu cannot execute on its own.
                Neither can any member of the team nor the deployer is able to influence Digesu to make unintended call.
    */
    function lockFor(address target, uint amount) public override onlyDigesu {
        _lock(LockParam(target, address(0), amount, 0, false));
    }

    /**
        @notice Callable only by the Digesu contract on behalf of subscribers on approval.
        Note : User must initiate a transaction that sends the call otherwise Digesu cannot execute this on its own.
                Neither can any member of the team nor the deployer is able to influence Digesu to make unintended call.
            
            o User who successfully complete a circle on Digesu are entitled to mint some QFT based on the amount contributed.
                For proper reward calculation, see Utils.computeReward().
            o Minting reqard is based on whether minting is active or not.
            o A condition may also warrant transfering penalty charged to other party.    
    */
    function unlockFor(
        address from,
        address to,
        uint mintable,
        uint amountTo,
        uint amount
    ) public override onlyDigesu {
        _unlock(UnlockParam(from, amount, false));
        if(rewardActive) _mint(from, mintable);
        if(amountTo > 0) _transfer(from, to, amountTo);

    }

    /**
        @dev Perform dual actions: 
            1. Unlock subscription balances of 'par.amount'.
            2. Move the balance to 'to'.

        Note : User must initiate a transaction that sends the call otherwise Digesu cannot execute this on its own.
            Neither can any member of the team nor the deployer is able to influence Digesu to make unintended call.
     */
    function unlockAndTransfer(
        address from,
        address to,
        uint amount
    ) external onlyDigesu {
        _unlock(UnlockParam(from, amount, false));
        _transfer(from, to, amount);
    }

    // See ERC20 `_accountBalances`
    function accountBalances(address who) public view override returns(AccountBalances memory) {
        return _accountBalances(who);
    }

    //See ERC20 _lockTier1Zone
    function lockTier1() public onlyOwner {
        _lockTier1Zone();
    }

    //See ERC20 _unlockTier1Zone
    function unlockTier1() public onlyOwner {
        _unlockTier1Zone();
    }

    ///@dev Activates reward
    function activateReward() public onlyOwner {
        require(!rewardActive, "Not Paused");
        rewardActive = true;
    }

    ///@dev Deactivates reward
    function deActivateReward() public onlyOwner {
        require(rewardActive, "Paused");
        rewardActive = false;
    }

    /**
        @dev Batch transfer: enables to transfer to multiple recipients.
                Also flexible enough to allow for dynamic transfer value.
     */
    function dynamicTransfer(uint[] memory reqAmts, address[] memory tos) public {
        for (uint i = 0; i < tos.length; i++) {
            address to = tos[i];
            uint amount = reqAmts[i];
            _transfer(_msgSender(), to, amount);
        }
    }

    //See DigesuAbstract.sol
    function updateDigesuAddr(address newAddr) public onlyOwner {
        _setDigesuContract(newAddr);
    }

}