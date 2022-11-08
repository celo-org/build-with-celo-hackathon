import { BigInt, log } from '@graphprotocol/graph-ts'
import { Loans, CreatedLoan } from '../generated/Loans/Loans'
import { Loan, User, UserLoan } from '../generated/schema'

export function handleCreatedLoan(event: CreatedLoan): void {
  //create the loan
  let loan = new Loan(event.params.loanAddress)
  loan.principal = event.params.LD.principal
  loan.balance = event.params.LD.balance
  loan.paid = event.params.LD.paid
  loan.dueDate = event.params.LD.setDeadline
  //create the user
  let user1 = User.load(event.params.LD.lender)
  let user2 = User.load(event.params.LD.borrower)
  if (!user1) {
    user1 = new User(event.params.LD.lender)
    user1.name = event.params.LD.lenderName
    user1.save()
  }
  if (!user2) {
    user2 = new User(event.params.LD.borrower)
    user2.name = event.params.LD.borrowerName
    user2.save()
  }

  let user1Loan = new UserLoan(user1.id.concat(loan.id))
  user1Loan.user = user1.id
  user1Loan.loan = loan.id

  let user2Loan = new UserLoan(user2.id.concat(loan.id))
  user2Loan.user = user2.id
  user2Loan.loan = loan.id
  // Entities can be written to the store with `.save()`
  loan.save()
  user1Loan.save()
  user2Loan.save()

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
  // - contract.getLoans(...)
  // - contract.getMyLoans(...)
  // - contract.getONRsAddr(...)
}
