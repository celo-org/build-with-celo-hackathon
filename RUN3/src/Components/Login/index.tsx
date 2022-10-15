// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values'

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims'
// Import ethers now
import { ethers } from 'ethers'

import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, Image } from 'react-native'
import { Button, Text } from '@ui-kitten/components'
import Web3Auth, { LOGIN_PROVIDER, OPENLOGIN_NETWORK, State } from '@web3auth/react-native-sdk'
import { CeloProvider, CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'
import { Buffer } from 'buffer'
import { CLIENT_ID, NET_PROVIDER } from 'react-native-dotenv'
import { styles } from './styles'
import { useWalletProvider } from '../../contexts/WalletContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { globalStyles } from '../../utils/globalStyles'

global.Buffer = global.Buffer || Buffer

const resolvedRedirectUrl = Linking.createURL('web3auth', {})

export default function Login({ navigation }: { navigation: any }) {
  const { setWalletWithProvider } = useWalletProvider()

  const login = async () => {
    try {
      const web3auth = new Web3Auth(WebBrowser, {
        clientId: CLIENT_ID,
        network: OPENLOGIN_NETWORK.TESTNET,
        chainNamespace: 'eip155',
        chainId: '0xaef3',
        rpcTarget: NET_PROVIDER,
        displayName: 'Celo Testnet',
        blockExplorer: 'https://alfajores-blockscout.celo-testnet.org',
        ticker: 'CELO',
        tickerName: 'CELO',
      })
      const state = await web3auth.login({
        redirectUrl: resolvedRedirectUrl,
        loginProvider: LOGIN_PROVIDER.GOOGLE,
      })
      if (state.privKey) {
        const provider = new CeloProvider(NET_PROVIDER)
        await provider.ready
        const walletWithProvider = new CeloWallet(state.privKey, provider)

        setWalletWithProvider(walletWithProvider)
        await AsyncStorage.setItem('wallet', JSON.stringify(walletWithProvider))
        navigation.replace('home')
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../../assets/RUN3-logo-03.png')} />
      <Button style={[styles.signBtn, globalStyles.primaryBg]} size="large" onPress={login}>
        <Text style={styles.signBtnText}>LOGIN</Text>
      </Button>
      <StatusBar style="auto" />
    </View>
  )
}
