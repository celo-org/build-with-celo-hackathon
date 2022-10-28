import { LOANS_STORE } from 'clixpesa/app/constants'
import { getUserLoans } from 'clixpesa/app/storage'

export const loansListCache = {}

export async function hasLoans() {
  const result = await getLoans()
  return result.length !== 0
}

export async function getDefaultNewLoanName() {
  const list = await getLoans()
  return `Loan ${list.length + 1}`
}

export async function getLoans() {
  if (Object.keys(loansListCache).length <= 0) {
    const storedLoans = await getUserLoans(LOANS_STORE)
    for (const loan of Array.from(storedLoans)) {
      Object.assign(loansListCache, { [loan.address]: loan })
    }
  }
  return Object.values(loansListCache) //Always return a list
}
