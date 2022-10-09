// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values'

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims'
// Import ethers now
import { ethers } from 'ethers'

import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Text, View, Image } from 'react-native'
import { Button } from 'native-base'
import Web3Auth, { LOGIN_PROVIDER, OPENLOGIN_NETWORK, State } from '@web3auth/react-native-sdk'
import { CeloProvider, CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import Constants, { AppOwnership } from 'expo-constants'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'
import { Buffer } from 'buffer'
import { NET_PROVIDER, FAKE_KEY } from 'react-native-dotenv'
import { styles } from './styles'

global.Buffer = global.Buffer || Buffer

const resolvedRedirectUrl = Linking.createURL('web3auth', {})

export default function Login() {
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
        loginProvider: LOGIN_PROVIDER.GOOGLE,
      })
      setKey(state.privKey || '')
      setUserInfo(state)
    } catch (e) {
      console.error(e)
      setErrorMsg(String(e))
    }
  }

  useEffect(() => {
    if (key) {
      console.log('logK', key)
      const wallet = new ethers.Wallet(key)
      let provider = ethers.getDefaultProvider()
      console.log('logP', provider)
      let walletWithProvider = new ethers.Wallet(key, provider)
      console.log('logWp', walletWithProvider)
    }
    if (errorMsg) {
      console.log('logE', errorMsg)
    }
    if (userInfo) {
      console.log('logU', userInfo)
    }
  }, [key, errorMsg, userInfo])

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/RUN3-logo-03.png')} />
      <Button style={styles.signBtn} size="lg" backgroundColor="primary" onPress={login}>
        <Text style={styles.signBtnText}>Login</Text>
      </Button>

      <StatusBar style="auto" />
    </View>
  )
}
