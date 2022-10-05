// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values'

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims'
// Import ethers now
import { ethers } from 'ethers'

import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import Web3Auth, { LOGIN_PROVIDER, OPENLOGIN_NETWORK, State } from '@web3auth/react-native-sdk'
import { CeloProvider, CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import Constants, { AppOwnership } from 'expo-constants'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'
import { Buffer } from 'buffer'

global.Buffer = global.Buffer || Buffer
const scheme = 'web3authexposample'

const resolvedRedirectUrl =
  Constants.appOwnership == AppOwnership.Expo || Constants.appOwnership == AppOwnership.Guest
    ? Linking.createURL('web3auth', {})
    : Linking.createURL('web3auth', { scheme: scheme })

export default function App() {
  const [provider, setProvider] = useState<CeloProvider>()

  const getProvider = async () => {
    const prov = new CeloProvider('https://alfajores-forno.celo-testnet.org')

    const result = await prov

    setProvider(result)
    return result
  }

  useEffect(() => {
    if (provider) {
      const wallet = new CeloWallet('555bbf12d0931a8068f41c2126a1860f85727a4156e5e22bf224c1604dbb0919', provider)
      const balance = async () => {
        return await wallet.getBalance()
      }
      balance()
    } else {
      getProvider()
    }
  }, [provider])

  const [key, setKey] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [userInfo, setUserInfo] = useState<State>()
  const login = async () => {
    try {
      const web3auth = new Web3Auth(WebBrowser, {
        clientId: 'BKq6KHsjFsG5GWYRS05KsHIybgic-DjlPaT_ZgV0-D7-RGlWvzNtdlw66VqhlvaGWimsSud-kSYIoJWeAVvAJfI',
        network: OPENLOGIN_NETWORK.TESTNET,
      })
      const state = await web3auth.login({
        redirectUrl: resolvedRedirectUrl,
      })
      setKey(state.privKey || 'no key')
      setUserInfo(state)
    } catch (e) {
      console.error(e)
      setErrorMsg(String(e))
    }
  }

  return (
    <View style={styles.container}>
      {key !== '' ? <Text>Key: {key}</Text> : null}
      {userInfo !== null ? <Text>UserInfo: {JSON.stringify(userInfo)}</Text> : null}
      {errorMsg !== '' ? <Text>Error: {errorMsg}</Text> : null}
      <Text>Linking URL: {resolvedRedirectUrl}</Text>
      <Button title="Login with Web3Auth" onPress={login} />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
