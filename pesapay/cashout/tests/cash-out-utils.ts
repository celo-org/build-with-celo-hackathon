import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  FundsWithdrawn,
  OwnershipTransferred,
  Paused,
  TokenFundsDeposited,
  TokenFundsWithdrawn,
  UniqueTokenAdded,
  Unpaused,
  contractTokenBalanceAdjusted
} from "../generated/CashOut/CashOut"

export function createFundsWithdrawnEvent(
  withdrawAddressNative: Address,
  amountWithdrawnNative: BigInt
): FundsWithdrawn {
  let fundsWithdrawnEvent = changetype<FundsWithdrawn>(newMockEvent())

  fundsWithdrawnEvent.parameters = new Array()

  fundsWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "withdrawAddressNative",
      ethereum.Value.fromAddress(withdrawAddressNative)
    )
  )
  fundsWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "amountWithdrawnNative",
      ethereum.Value.fromUnsignedBigInt(amountWithdrawnNative)
    )
  )

  return fundsWithdrawnEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createTokenFundsDepositedEvent(
  tokenDeposited: Address,
  addressDeposited: Address,
  amountDeposited: BigInt
): TokenFundsDeposited {
  let tokenFundsDepositedEvent = changetype<TokenFundsDeposited>(newMockEvent())

  tokenFundsDepositedEvent.parameters = new Array()

  tokenFundsDepositedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenDeposited",
      ethereum.Value.fromAddress(tokenDeposited)
    )
  )
  tokenFundsDepositedEvent.parameters.push(
    new ethereum.EventParam(
      "addressDeposited",
      ethereum.Value.fromAddress(addressDeposited)
    )
  )
  tokenFundsDepositedEvent.parameters.push(
    new ethereum.EventParam(
      "amountDeposited",
      ethereum.Value.fromUnsignedBigInt(amountDeposited)
    )
  )

  return tokenFundsDepositedEvent
}

export function createTokenFundsWithdrawnEvent(
  tokenWithdrawn: Address,
  withdrawAddress: Address,
  amountWithdrawn: BigInt
): TokenFundsWithdrawn {
  let tokenFundsWithdrawnEvent = changetype<TokenFundsWithdrawn>(newMockEvent())

  tokenFundsWithdrawnEvent.parameters = new Array()

  tokenFundsWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "tokenWithdrawn",
      ethereum.Value.fromAddress(tokenWithdrawn)
    )
  )
  tokenFundsWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "withdrawAddress",
      ethereum.Value.fromAddress(withdrawAddress)
    )
  )
  tokenFundsWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "amountWithdrawn",
      ethereum.Value.fromUnsignedBigInt(amountWithdrawn)
    )
  )

  return tokenFundsWithdrawnEvent
}

export function createUniqueTokenAddedEvent(
  addedToken: Address
): UniqueTokenAdded {
  let uniqueTokenAddedEvent = changetype<UniqueTokenAdded>(newMockEvent())

  uniqueTokenAddedEvent.parameters = new Array()

  uniqueTokenAddedEvent.parameters.push(
    new ethereum.EventParam(
      "addedToken",
      ethereum.Value.fromAddress(addedToken)
    )
  )

  return uniqueTokenAddedEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}

export function createcontractTokenBalanceAdjustedEvent(
  token: Address,
  amount: BigInt
): contractTokenBalanceAdjusted {
  let contractTokenBalanceAdjustedEvent = changetype<
    contractTokenBalanceAdjusted
  >(newMockEvent())

  contractTokenBalanceAdjustedEvent.parameters = new Array()

  contractTokenBalanceAdjustedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  contractTokenBalanceAdjustedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return contractTokenBalanceAdjustedEvent
}
