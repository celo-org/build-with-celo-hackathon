import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { CreatedLoan } from "../generated/Loans/Loans"

export function createCreatedLoanEvent(
  loanAddress: Address,
  loanInitiator: Address,
  LD: ethereum.Tuple
): CreatedLoan {
  let createdLoanEvent = changetype<CreatedLoan>(newMockEvent())

  createdLoanEvent.parameters = new Array()

  createdLoanEvent.parameters.push(
    new ethereum.EventParam(
      "loanAddress",
      ethereum.Value.fromAddress(loanAddress)
    )
  )
  createdLoanEvent.parameters.push(
    new ethereum.EventParam(
      "loanInitiator",
      ethereum.Value.fromAddress(loanInitiator)
    )
  )
  createdLoanEvent.parameters.push(
    new ethereum.EventParam("LD", ethereum.Value.fromTuple(LD))
  )

  return createdLoanEvent
}
