import { Loan } from '../generated/schema'
import { LoanFunded, LoanRepaid } from '../generated/templates/P2PLoan/P2PLoan'

export function handleLoanFunded(event: LoanFunded): void {
  let loan = Loan.load(event.address)
  if (loan) {
    if (loan.balance) {
      loan.balance = loan.balance.plus(event.params.amount)
    }

    loan.save()
  }
}

export function handleLoanRepaid(event: LoanRepaid): void {
  let loan = Loan.load(event.address)
  if (loan) {
    if (loan.paid) {
      loan.paid = loan.paid.plus(event.params.amount)
      loan.balance = loan.balance.minus(event.params.amount)
    }
    loan.save()
  }
}
