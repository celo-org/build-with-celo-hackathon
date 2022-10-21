export function isStale(lastUpdated, staleTime) {
  return !lastUpdated || Date.now() - lastUpdated > staleTime
}

export function areDatesSameDay(d1, d2) {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  )
}

export function getDaysBetween(timestamp1, timestamp2) {
  return Math.round((timestamp2 - timestamp1) / (1000 * 60 * 60 * 24))
}
