import { BigInt } from "@graphprotocol/graph-ts"
import {
  CashOut,
  FundsWithdrawn,
  OwnershipTransferred,
  Paused,
  TokenFundsDeposited,
  TokenFundsWithdrawn,
  UniqueTokenAdded,
  Unpaused,
  contractTokenBalanceAdjusted
} from "../generated/CashOut/CashOut"
import { Deposit, Token, User } from "../generated/schema"

export function handleFundsWithdrawn(event: FundsWithdrawn): void {}
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  // let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  // if (!entity) {
  //   entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    // entity.count = BigInt.fromI32(0)
  // }

  // BigInt and BigDecimal math are supported
  // entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  // entity.withdrawAddressNative = event.params.withdrawAddressNative
  // entity.amountWithdrawnNative = event.params.amountWithdrawnNative

  // Entities can be written to the store with `.save()`
  // entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.aggregateValues(...)
  // - contract.allowedTokensAddresses(...)
  // - contract.contractTokenBalances(...)
  // - contract.getAuthorisedSignerIndex(...)
  // - contract.getLatestPrice(...)
  // - contract.getUniqueSignersThreshold(...)
  // - contract.isTrustedForwarder(...)
  // - contract.lowestCashoutAmount(...)
  // - contract.owner(...)
  // - contract.paused(...)
  // - contract.proxyRequestToBaseContract(...)
  // - contract.tokenIsAllowed(...)


export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePaused(event: Paused): void {}

export function handleTokenFundsDeposited(event: TokenFundsDeposited): void {
    let deposit = new Deposit(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
    deposit.amount = event.params.amountDeposited
    deposit.createdAtTimestamp = event.block.timestamp
    deposit.transactionHash = event.transaction.hash
    deposit.depositor = event.params.addressDeposited.toHexString()
    deposit.tokenDeposited = event.params.tokenDeposited.toHexString()
    deposit.save()
  let user = User.load(event.params.addressDeposited.toHexString())
  if(!user){
    user = new User(event.params.addressDeposited.toHexString())
    user.save()
  }
  let token = Token.load(event.params.tokenDeposited.toHexString())
  if(!token){
    token = new Token(event.params.tokenDeposited.toHexString())
    token.save()
  }
  
}

export function handleTokenFundsWithdrawn(event: TokenFundsWithdrawn): void {}

export function handleUniqueTokenAdded(event: UniqueTokenAdded): void {}

export function handleUnpaused(event: Unpaused): void {}

export function handlecontractTokenBalanceAdjusted(
  event: contractTokenBalanceAdjusted
): void {}
