import { setItemAsync, getItemAsync, deleteItemAsync } from 'expo-secure-store'
import { areAddressesEqual } from 'clixpesa/blockchain/utils/addresses'

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

export async function storeUserLoan(storeName, userLoanDetails) {
  if (!userLoanDetails) {
    return
  }
  const storedLoans = await getUserLoans(storeName)
  if (
    Array.prototype.find.call(storedLoans, (loan) =>
      areAddressesEqual(loan.address, userLoanDetails.address),
    )
  ) {
    throw new Error('This loan already exists!')
  }
  Array.prototype.push.call(storedLoans, userLoanDetails)
  const serialised = JSON.stringify(storedLoans)
  await setItemAsync(storeName, serialised)
}

export async function getUserLoans(storeName) {
  const storedDetails = await getItemAsync(storeName)
  const parsedDetails = JSON.parse(storedDetails)
  if (!parsedDetails) {
    return {}
  }
  return parsedDetails
}

export async function modifyLoanDetails(storeName, updatedLoanDetails) {
  if (!updatedLoanDetails) {
    return
  }
  const storedLoans = await getUserLoans(storeName)
  const index = Array.prototype.findIndex.call(storedLoans, (loan) =>
    areAddressesEqual(loan.address, updatedLoanDetails.address),
  )
  if (index < 0) {
    throw new Error('Address not found in loans list')
  }
  storedLoans[index] = updatedLoanDetails
  const serialised = JSON.stringify(storedLoans)
  await setItemAsync(storeName, serialised)
}

/**
 * Adds a new wallet to the users wallets list
 * @param {string} listName accounts list name
 * @param {{}} newWallet crypto wallet account object
 * @return A promise that will reject if value cannot be stored on the device.
 */
export async function storeUserWallet(listName, newWallet) {
  //validateWallet(newWallet)
  const storedWallets = await getUserWallets(listName)
  //await SecureStore.deleteItemAsync(listName)
  if (
    Array.prototype.find.call(storedWallets, (a) => areAddressesEqual(a.address, newWallet.address))
  ) {
    throw new Error('New wallet already exists in wallets store')
  }
  Array.prototype.push.call(storedWallets, newWallet) //storedWallets is an object
  const serialised = JSON.stringify(storedWallets)
  await setItemAsync(listName, serialised)
}

/**
 * Retrieves stored list of accounts/wallets
 * @param {string} listName
 * @returns A promise that resolves to the previously stored value, or `null` if there is no entry
 * for the given key. The promise will reject if an error occurred while retrieving the value.
 */
export async function getUserWallets(listName) {
  //await SecureStore.deleteItemAsync(listName)
  let storedWallets = await getItemAsync(listName)
  const parsedWallets = JSON.parse(storedWallets)
  if (!parsedWallets) {
    return {}
  }
  //Array.prototype.forEach.call(parsedWallets, validateWallet)
  return {
    ...parsedWallets,
  }
}

/**
 * Modifies wallets in the wallets list
 * @param {string} listName
 * @param {{}} updatedWallets
 * @returns
 */
export async function modifyStoredWallets(listName, updatedWallets) {
  // eslint-disable-next-line curly
  if (!updatedWallets.length) return
  const storedWallets = await getUserWallets(listName)
  for (const wallet of Array.from(updatedWallets)) {
    const index = Array.prototype.findIndex.call(storedWallets, (a) =>
      areAddressesEqual(a.address, wallet.address),
    )
    if (index < 0) {
      throw new Error('Address not found in account list')
    }
    storedWallets[index] = wallet
    const serialised = JSON.stringify(storedWallets)
    await setItemAsync(listName, serialised)
  }
}

/**
 * Removes a wallet for a wallets list
 * @param {string} listName
 * @param {string} walletAddress
 */
export async function removeAccount(listName, walletAddress) {
  const storedWallets = await getUserWallets(listName)
  const index = Array.prototype.findIndex.call(storedAccounts, (a) =>
    areAddressesEqual(a.address, walletAddress),
  )
  if (index < 0) {
    throw new Error('Address not found in account list')
  }
  Array.prototype.splice.call(storedWallets, (index, 1)) //never deletes the only remaining item. condider (object,index)
  const serialised = JSON.stringify(storedWallets)
  await setItemAsync(listName, serialised)
}

/**
 * Deletes the whole list of wallets
 * @param {string} listName
 */
export async function removeAllWallets(listName) {
  await deleteItemAsync(listName)
}

/**
 * Deletes the user's account and wallets
 * @param {string} walletList
 * @param {string} userStore
 */
export async function deleteAccount(walletList, userStore) {
  await deleteItemAsync(walletList)
  await deleteItemAsync(userStore)
}
