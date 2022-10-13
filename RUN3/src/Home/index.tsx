import React, { useState } from 'react'
// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values'

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims'
// Import ethers now
import { ethers } from 'ethers'

import { Text, View } from 'react-native'
import { useWalletProvider } from '../contexts/WalletContext'
import { colors, globalStyles } from '../utils/globalStyles'
import { styles } from './styles'
import { Avatar, Button, Divider, ListItem, Tooltip } from '@ui-kitten/components'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faWallet, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import * as Clipboard from 'expo-clipboard'
import WebView from 'react-native-webview'
import { useRun3T } from '../hooks/useRUN3T'

export default function Home() {
  const { walletWithProvider } = useWalletProvider()
  const { mintRun3Token } = useRun3T()
  const [visibleTooltip, setVisibleTooltip] = useState<boolean>(false)
  const [celoBalance, setCeloBalance] = useState<string>('')
  const [showWebView, setShowWebView] = useState<boolean>(false)
  const getBalance = async () => {
    const value = await walletWithProvider.getBalance()
    const balanceInEth = ethers.utils.formatEther(value)
    setCeloBalance(balanceInEth)
  }
  getBalance()

  const copyToClipboard = async () => {
    setVisibleTooltip(true)
    await Clipboard.setStringAsync(walletWithProvider.address)
    setTimeout(() => {
      setVisibleTooltip(false)
    }, 3000)
  }

  //0x25cD75A13d91AA792b18F593E0a337E23a774bAe RUN3T address

  if (showWebView)
    return (
      <View style={styles.wrapper}>
        <Button
          style={globalStyles.primaryBg}
          accessoryLeft={() => <FontAwesomeIcon color="white" icon={faArrowLeft} />}
          onPress={() => setShowWebView(false)}
        >
          Go Back
        </Button>
        <ListItem
          title={`Address: ${walletWithProvider.address}`}
          accessoryLeft={() => <FontAwesomeIcon color={colors.secondary} icon={faWallet} size={50} />}
          accessoryRight={() => (
            <Tooltip
              anchor={() => (
                <Button style={[styles.btnItem, globalStyles.secondaryBg]} onPress={copyToClipboard} size="small">
                  COPY
                </Button>
              )}
              visible={visibleTooltip}
              onBackdropPress={() => setVisibleTooltip(false)}
            >
              Your wallet address was copied to your clipboard
            </Tooltip>
          )}
        />
        <WebView
          source={{
            uri: 'https://celo.org/developers/faucet',
          }}
        />
      </View>
    )

  return (
    <View style={styles.wrapper}>
      <ListItem
        title={`Address: ${walletWithProvider.address}`}
        accessoryLeft={() => <FontAwesomeIcon color={colors.secondary} icon={faWallet} size={50} />}
        accessoryRight={() => (
          <Tooltip
            anchor={() => (
              <Button style={[styles.btnItem, globalStyles.secondaryBg]} onPress={copyToClipboard} size="small">
                COPY
              </Button>
            )}
            visible={visibleTooltip}
            onBackdropPress={() => setVisibleTooltip(false)}
          >
            Your wallet address was copied to your clipboard
          </Tooltip>
        )}
      />
      <Divider />
      <ListItem
        title={`CELO Balance: ${celoBalance}`}
        accessoryLeft={() => <Avatar style={styles.celoLogo} source={require('../../assets/celo-logo.png')} />}
        accessoryRight={() => (
          <Button onPress={() => setShowWebView(true)} style={[styles.btnItem, globalStyles.secondaryBg]} size="small">
            GET CELO
          </Button>
        )}
      />
      <Divider />
      <ListItem
        title={`RUN3T Balance: ${celoBalance}`}
        accessoryLeft={() => <Avatar style={styles.celoLogo} source={require('../../assets/RUN3-isologo-01.png')} />}
        accessoryRight={() => (
          <Button
            onPress={() => mintRun3Token(walletWithProvider.address)}
            style={[styles.btnItem, globalStyles.secondaryBg]}
            size="small"
          >
            GET RUN3T
          </Button>
        )}
      />
      <Divider />
    </View>
  )
}
