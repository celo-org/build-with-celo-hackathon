import { SPACES_STORE } from 'clixpesa/app/constants'
import { getUserLoans } from 'clixpesa/app/storage'

export const SpaceListCache = {}

export async function hasSpaces() {
  const result = await getSpaces()
  return result.length !== 0
}

export async function getSpaces() {
  if (Object.keys(SpaceListCache).length <= 0) {
    const storedSpaces = await getUserLoans(SPACES_STORE)
    for (const space of Array.from(storedSpaces)) {
      Object.assign(SpaceListCache, { [space.address]: space })
    }
  }
  return Object.values(SpaceListCache) //Always return a list
}

export async function getDueDate() {
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
}
