export const truncate = input => `${input.substring(0, 5)}...${input.slice(-4)}`

export const cleanDate = dirtyDate => {
  const date = new Date(dirtyDate)
  return date.toUTCString()
}