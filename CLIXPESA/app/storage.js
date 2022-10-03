import { setItemAsync, getItemAsync, deleteItemAsync } from 'expo-secure-store'

export async function storeUserDetails(storeName, userDetails) {
  if (!userDetails) {
    return
  }
  const storedDetails = await getUserDetails(storeName)
  if (storedDetails.phoneNo === userDetails.phoneNo) {
    throw new Error('New user already exists. you cant share a phonenumber')
  }
  const serialised = JSON.stringify(userDetails)
  await setItemAsync(storeName, serialised)
}

export async function getUserDetails(storeName) {
  const storedDetails = await getItemAsync(storeName)
  const parsedDetails = JSON.parse(storedDetails)
  if (!parsedDetails) {
    return {}
  }
  return parsedDetails
}

export async function modifyUserDetails(storeName, updatedUserDetails) {
  if (!updatedUserDetails) {
    return
  }
  const storedDetails = await getUserDetails(storeName)
  const modifiedDetails = { ...storedDetails, updatedUserDetails }
  const serialised = JSON.stringify(modifiedDetails)
  await setItemAsync(storeName, serialised)
}
