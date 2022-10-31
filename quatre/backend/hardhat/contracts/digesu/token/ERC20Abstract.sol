// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "./IERC20Metadata.sol";
import "./IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Context.sol";

/**QUATRE FINANCE TOKEN - (Customized)
    - Fully compatible and complied with ERC20 token standard.

  @author Bobeu
    Github: https://github.com/bobeu
    NOTE: SOME OF THE DEPENDENCY MODULES AND SUBMODULES RALATED TO THIS CONTRACT ARE IMPORTED AND INSPIRED BY THE 
            OPENZEPPELIN CONTRACTS. KUDOS TO THE OZ GUYS.

 * @dev Implementation of the {IERC20} interface.
        Note: digesuAddr is only a naming convention, and should not be mistaken for how it sounds as it does not in
              anyway take custody of token unless a prompt call is initited by the user.
 */

abstract contract ERC20Abstract is Context, IERC20, IERC20Metadata {
  using SafeMath for uint256;
  
  MetaData private meta;

  // Incentive mining
  uint256 public reserved;

  /**@dev Maps holders to tier1.
          Note : Holders in this category auto earn from the inbuilt reward
                  model.
                To earn from this category, holders of QFT must have left their
                token in the wallet unmoved for a period of at least 30 days.  
   */
  mapping(address => Share) public tier1;

  ///@dev Maps addresses to their corresponding balances profile.
  mapping(address => Holders) private _balances;

  // Approvals for addresses to spend on behalf of other addresses.
  mapping(address => mapping(address => uint256)) private _allowances;

  // #Constructor
  constructor(string memory _name, string memory _symbol, address initTokenRecipient) {
    uint decis = 10**18;
    meta = MetaData(1.0e18, 0, false, _name, _symbol, address(0));
    reserved = 120_000_000 * decis; //Being 12% of max supply
    _mint(initTokenRecipient, 880_000_000 * decis);
  }

  /**
   * @dev Returns the name of the token.
   */
  function name() public view override returns (string memory _name) {
    _name = meta.name;
    return _name;
  }

  /**
   * @dev Returns the symbol of the token, usually a shorter version of the
   * name.
   */
  function symbol() public view override returns (string memory _sym) {
    _sym = meta.symbol;
    return _sym;
  }

  /**
   * @dev Returns the number of decimals used to get its user representation.
   * For example, if `decimals` equals `2`, a balance of `505` tokens should
   * be displayed to a user as `5.05` (`505 / 10 ** 2`).
   *
   * Tokens usually opt for a value of 18, imitating the relationship between
   * Ether and Wei. This is the value {ERC20} uses, unless this function is
   * overridden;
   *
   * NOTE: This information is only used for _display_ purposes: it in
   * no way affects any of the arithmetic of the contract, including
   * {IERC20-balanceOf} and {IERC20-transfer}.
   */
  function decimals() public pure override returns (uint8) {
    return 18;
  }

  /**
   * @dev See {IERC20-totalSupply}.
   */
  function totalSupply() public view override returns (uint256 _ts) {
    _ts = meta.tSupply;
    return _ts;
  }

  /**
   * @dev See {IERC20-balanceOf} for more info.
        Returns total spendable balances of `account`
        @notice : Spendable balance is a function of main balance less the 
                  addition of locked balances and balance in subscription.
   */
  function balanceOf(address account) public view override returns (uint256 bal) {
    AccountBalances memory acc  = _accountBalances(account);

    return acc.spendable.add(acc.locked).add(acc.inSubScription);
  }

  /**
   * @dev See {IERC20-transfer}.
   *
   * Requirements:
   *
   * - `recipient` cannot be the zero address.
   * - the caller must have a balance of at least `amount`.
   */
  function transfer(address recipient, uint256 amount) public override returns (bool) {
    _transfer(_msgSender(), recipient, amount);
    return true;
  }

  /**
   * @dev See {IERC20-allowance}.
   */
  function allowance(address _owner, address spender) public view override returns (uint256 _allow) {
    _allow = _allowances[_owner][spender];
    return _allow;
  }

  /**
   * @dev See {IERC20-approve}.
   *
   * Requirements:
   *
   * - `spender` cannot be the zero address.
   */
  function approve(address spender, uint256 amount) public override returns (bool) {
    _approve(_msgSender(), spender, amount);
    return true;
  }

  /**
   * @dev See {IERC20-transferFrom}.
   *
   * Emits an {Approval} event indicating the updated allowance. This is not
   * required by the EIP. See the note at the beginning of {ERC20}.
   *
   * Requirements:
   *
   * - `sender` and `recipient` cannot be the zero address.
   * - `sender` must have a balance of at least `amount`.
   * - the caller must have allowance for ``sender``"s tokens of at least
   * `amount`.
   * If called by the farmer, it signifies staking.
   */
  function transferFrom(address sender,address recipient,uint256 amount) public override returns (bool) {
    _transfer(sender, recipient, amount);

    uint256 curAllow = _allowances[sender][_msgSender()];
    require(curAllow >= amount, "ERC20: Amt exceeds allowance");
    unchecked {
      _approve(sender, _msgSender(), curAllow - amount);
    }

    return true;
  }

  /**
   * @dev Atomically increases the allowance granted to `spender` by the caller.
   *
   * This is an alternative to {approve} that can be used as a mitigation for
   * problems described in {IERC20-approve}.
   *
   * Emits an {Approval} event indicating the updated allowance.
   *
   * Requirements:
   *
   * - `spender` cannot be the zero address.
   */
  function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
    _beforeTokenTransfer(_msgSender(), spender, addedValue);
    _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
    return true;
  }

  /**
   * @dev Atomically decreases the allowance granted to `spender` by the caller.
   *
   * This is an alternative to {approve} that can be used as a mitigation for
   * problems described in {IERC20-approve}.
   *
   * Emits an {Approval} event indicating the updated allowance.
   *
   * Requirements:
   *
   * - `spender` cannot be the zero address.
   * - `spender` must have allowance for the caller of at least
   * `subVal`.
   */
  function decreaseAllowance(address spender, uint256 subVal) public returns (bool) {
    _beforeTokenTransfer(_msgSender(), spender, subVal);
    uint256 curAllow = _allowances[_msgSender()][spender];
    require(curAllow >= subVal, "Decreased allowance below zero");
    _approve(_msgSender(), spender, curAllow.sub(subVal));

    return true;
  }

  /**
   * @dev Moves `amount` of tokens from `sender` to `recipient`.
   *
   * This internal function is equivalent to {transfer}, and can be used to
   * e.g. implement automatic token fees, slashing mechanisms, etc.
   *
   * Emits a {Transfer} event.
   *
   * Requirements:
   *
   * - `sender` cannot be the zero address.
   * - `recipient` cannot be the zero address.
   * - `sender` must have a balance of at least `amount`.
   * We did a few twist here: This is a generic ERC20 transfer, to keep with the
   * standard, balance of sender is deducted from the normal iterated balance
   * but we check if recipient has lock in force, preference is given to the extra
   * secure layer.
   Note: 
        o If the balance of sender is less than value to send and there is no lock set up,
            the transfer fails ie usual ERC20 behavior.
        
        o If balance of sender is less than value to send and there was lock, the spendable 
            balance reads to 0 and the locked balance accumulates it.

        o If sender's balance can cover the amount to spend, the usual ERC20 transfer is executed.
        o If Recipient has lock set up, we give preference by sending to locked spot otherwise regular.

        @notice This model however is fully compatible with the ERC20 token standard, and does not 
                in any way deny holders of right to their token. The system only executes secondary 
                instructions if the holder had given previous order such as setting
                up a locker.

        @notice We automatically unlock sender's locked balances when its time.
                Asset is forwarded to the escape address provided.
   */
  function _transfer(
    address from,
    address to,
    uint256 reqAmt
  ) internal virtual {
    _beforeTokenTransfer(from, to, reqAmt);
    require(to != address(0), "address: zero");
    Holders memory fH = _balances[from];
    AccountBalances memory accFrom = _accountBalances(from);

    if (_now() >= fH.locked.lockTil) {
      unchecked {
        _balances[from].main = fH.main - accFrom.locked;
        _balances[fH.locked.routeTo].main += accFrom.locked;
      }
      _balances[from].locked.value = 0;
    } else { require(accFrom.spendable >= reqAmt, "Insuff bal");}

    if (accFrom.spendable >= reqAmt) {
      unchecked {
        _balances[from].main = fH.main - reqAmt;
        _balances[to].main += reqAmt;
      }
    }

    emit Transfer(from, to, reqAmt);
  }

  ///@dev Try unlock "who's" locked balance
  function _tryUnlock(Holders memory hodl, address who, uint256 reqAmt) private returns (uint locked) {
    require(hodl.locked.value >= reqAmt, "No prev locked");
    if(_now() >= hodl.locked.lockTil) {
      unchecked {
        _balances[who].locked.value = hodl.locked.value - reqAmt;
        _balances[who].main -= reqAmt;
        _balances[hodl.locked.routeTo].main += reqAmt;
      }
      locked = hodl.locked.value;
    }
    return locked;
  }

  ///@dev panic moves all balances of `who` to the set escaped address
  function _panicMove(address who) internal virtual {
    Holders memory hodl = _balances[who];
    require(hodl.locked.routeTo != address(0), "Escape addr is empty");
    AccountBalances memory acc  = _accountBalances(who);

    uint allBal = acc.spendable.add(acc.locked).add(acc.inSubScription);
    unchecked {
      _balances[hodl.locked.routeTo].main += allBal;
    }
    _balances[who].main = 0;
    _balances[who].locked.value = 0;
    _balances[who].sub.value = 0;
  }

  ///@notice Checks if "who" qualifies for share reward.
  function _postShare(address who, uint locked) private {
    Share memory sh = tier1[who];
    uint earnings;
    if(sh.lastLockedDate > 0) {
      if(_now() > sh.lastLockedDate){
        unchecked {
          uint diff = _now() - sh.lastLockedDate;
          uint256 _earnRate = meta.rewardRate.mul(10000).div(100.0e18).mul(10 ** 18); // ((meta.rewardRate * 10000) / 100.0e18) * 10**18;
          uint earnPerSec = _earnRate.mul(locked).div(10 ** 18).div(10000); // ((_earnRate * locked) / 10**18) / 10000;
          earnings = earnPerSec.mul(diff);
        }
        tier1[who].lastLockedDate = 0;
        if(meta.shareActive && reserved >= earnings) {
          reserved -= earnings;
          _mint(who, earnings);
        }
      }
    }
  }

  /**User unlocks balance
    @param ul : #parameters.
              If cmd true, we unlock the selfLocked otherwise unlock the subscription
              by reqAmt
   */
  function _unlock(UnlockParam memory ul) internal virtual {
    Holders memory hodl = _balances[ul.who];
    uint locked;
    if(ul.cmd) locked = _tryUnlock(hodl, ul.who, ul.reqAmt);
    if(!ul.cmd) {
      require(hodl.sub.value >= ul.reqAmt, "Amount exceed locked");
      unchecked {
        _balances[ul.who].sub.value -= ul.reqAmt;
      }
      locked = ul.reqAmt;
    }
    _postShare(ul.who, locked);
    
  }

  /**Holder or Digesu trsutee account (on permissioned) is able to lock balance
      of `_of`.
      @param lp : Parameters.
      @notice : Amount locked will always be forwarded to `routeTo` when lock
                        period is over.
      Note: If caller has no lock previously set,`routeTo` must not be an empty address.
   */
  function _lock(LockParam memory lp) internal virtual {
    Holders memory hodl = _balances[lp.who];
    Share memory t1 = tier1[lp.who];

    if(lp.cmd) {
      require(lp.routeTo != address(0) && lp.routeTo != lp.who, "Invalid addr");
      hodl.locked.routeTo = lp.routeTo;
      _balances[lp.who].locked = SelfLocked(lp.lockTil * 1 days, hodl.locked.value + lp.inValue, lp.routeTo);
    } else {
      _balances[lp.who].sub = Subscription(hodl.sub.value + lp.inValue);
    }
    
    tier1[lp.who].lastLockedDate = lp.lockTil == 0 ? 0 : t1.lastLockedDate > 0 ? t1.lastLockedDate : _now();
  }

  ///@dev Returns current Unix time stamp
  function _now() internal view returns(uint32) {
    return uint32(block.timestamp);
  }

  ///@dev Returns QFT balance of this contract.
  function _balanceThis() internal virtual returns (uint256) {
    return _balances[address(this)].main;
  }

  ///@dev Returns struct of balances relating to `who`
  function _accountBalances(address who) internal virtual view returns (AccountBalances memory) {
    Holders memory _h = _balances[who];
    return AccountBalances(_h.main - (_h.locked.value + _h.sub.value), _h.locked.value, _h.sub.value);
  }

  
  function _maxSupply() internal virtual returns (uint256) {
    return 1_000_000_000 * 10 ** 18;
  }

  /** @dev Creates `amount` tokens and assigns them to `account`, increasing
   * the total supply.
   *
   * Emits a {Transfer} event with `from` set to the zero address.
   
   * Requirements:
   * - `account` cannot be the zero address.
   */
  function _mint(address to, uint256 amount) internal virtual {
    require(to != address(0), "ERC20: mint zero address?");
    require(meta.tSupply + amount <= _maxSupply(), "Max supply ovf");
     _beforeTokenTransfer(address(0), to, amount);

      meta.tSupply = meta.tSupply.add(amount);
      _balances[to].main =  _balances[to].main.add(amount);
      emit Transfer(address(0), to, amount);

      _afterTokenTransfer(address(0), to, amount);
  }

  /**
   * @dev Destroys `amount` tokens from `account`, reducing the
   * total supply.
   *
   * Emits a {Transfer} event with `recipient` set to the zero address.
   *
   * Requirements:
   *
   * - `account` cannot be the zero address.
   * - `account` must have at least `amount` tokens.
   */
  function _burn(address from, uint256 amount) internal virtual {
    require(from != address(0), "ERC20: zero address");

    _beforeTokenTransfer(from, address(0), amount);

    uint256 alcBal = _balances[from].main;
    require(alcBal >= amount, "ERC20: burn exceeds balance");
    unchecked {
      _balances[from].main = alcBal - amount;
    }
    meta.tSupply = meta.tSupply.sub(amount);

    emit Transfer(from, address(0), amount);

    _afterTokenTransfer(from, address(0), amount);
  }

  /**
   * @dev Sets `amount` as the allowance of `spender` over the `_owner` s tokens.
   *
   * This internal function is equivalent to `approve`, and can be used to
   * e.g. set automatic allowances for certain subsystems, etc.
   *
   * Emits an {Approval} event.
   *
   * Requirements:
   *
   * - `_owner` cannot be the zero address.
   * - `spender` cannot be the zero address.
   */
  function _approve(address _owner,address spender,uint256 amount) internal {
    require(_owner != address(0) && spender != address(0), "ERC20: zero address");
    _beforeTokenTransfer(_owner, spender, amount);
    _allowances[_owner][spender] = amount;
    emit Approval(_owner, spender, amount);
  }

  /**
   * @dev Hook that is called before any transfer of tokens. This includes
   * minting and burning.
   *
   * Calling conditions:
   *
   * - when `from` and `to` are both non-zero, `amount` of ``from``"s tokens
   * will be transferred to `to`.
   * - when `from` is zero, `amount` tokens will be minted for `to`.
   * - when `to` is zero, `amount` of ``from``"s tokens will be burned.
   * - `from` and `to` are never both zero.
   *
   * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
   */

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal {}

  function _afterTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal {}

  /**@dev Pause inbuilt reward
  */
  function _lockTier1Zone() internal virtual {
    meta.shareActive = false;
  }

  /**@dev unpause inbuilt reward
*/
  function _unlockTier1Zone() internal virtual {
    meta.shareActive = true;
  }

  ///@dev Returns token data plus "who's" profile
  function tokenData(address who) public view override returns (MetaData memory, Holders memory) {
    return ( 
      MetaData(meta.rewardRate, meta.tSupply, meta.shareActive, meta.name, meta.symbol, meta.digesuAddr),
      _balances[who]
    );
  }

  ///@dev Fetches digesu contract address
  function _digesuAddr() internal view virtual returns (address) {
    return meta.digesuAddr;
  }

  ///@dev Updates digesu contract address
  function _setDigesuContract(address newAddr) internal virtual {
    require(newAddr != address(0), "Zero Addr");
    meta.digesuAddr = newAddr;
  }

}

//Overdraft