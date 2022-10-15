import React, { useEffect, useState } from 'react'
// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values'

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims'
// Import ethers now
import { ethers } from 'ethers'

import { Text, View } from 'react-native'
import { useWalletProvider } from '../../contexts/WalletContext'
import { colors, globalStyles } from '../../utils/globalStyles'
import { styles } from './styles'
import { Avatar, Button, Divider, ListItem, Tooltip } from '@ui-kitten/components'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faWallet, faArrowLeft, faRefresh } from '@fortawesome/free-solid-svg-icons'
import * as Clipboard from 'expo-clipboard'
import WebView from 'react-native-webview'
import { useRun3T } from '../../hooks'

export default function Home() {
  const { walletWithProvider } = useWalletProvider()
  const { mintRun3Token, abi } = useRun3T()
  const [visibleTooltip, setVisibleTooltip] = useState<boolean>(false)
  const [visibleTooltipRun3, setVisibleTooltipRun3] = useState<boolean>(false)
  const [celoBalance, setCeloBalance] = useState<string>('')
  const [run3TBalance, setRun3TBalance] = useState<string>('')
  const [showWebView, setShowWebView] = useState<boolean>(false)
  const [shouldRefresh, setShouldRefresh] = useState<boolean>(true)

  const copyToClipboard = async () => {
    setVisibleTooltip(true)
    await Clipboard.setStringAsync(walletWithProvider.address)
    setTimeout(() => {
      setVisibleTooltip(false)
    }, 3000)
  }

  useEffect(() => {
    if (shouldRefresh) {
      const getBalance = async () => {
        const value = await walletWithProvider.getBalance()
        const balanceInEth = ethers.utils.formatEther(value)
        setCeloBalance(balanceInEth)
      }

      const getRun3TBalance = async () => {
        try {
          const run3tContract = new ethers.Contract('0x25cD75A13d91AA792b18F593E0a337E23a774bAe', abi, walletWithProvider)
          const balance = await run3tContract?.balanceOf(walletWithProvider.address)
          const formatBalance = Number(ethers.utils.formatEther(balance)).toFixed(2)
          setRun3TBalance(formatBalance)
        } catch (e) {
          console.log('Error', e)
        }
      }
      getBalance()
      getRun3TBalance()
      setShouldRefresh(false)
    }
  }, [shouldRefresh])

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
      <View>
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
          accessoryLeft={() => <Avatar style={styles.celoLogo} source={require('../../../assets/celo-logo.png')} />}
          accessoryRight={() => (
            <Button onPress={() => setShowWebView(true)} style={[styles.btnItem, globalStyles.secondaryBg]} size="small">
              GET CELO
            </Button>
          )}
        />
        <Divider />
        <ListItem
          title={`RUN3T Balance: ${run3TBalance}`}
          accessoryLeft={() => <Avatar style={styles.celoLogo} source={require('../../../assets/RUN3-isologo-01.png')} />}
          accessoryRight={() => (
            <Tooltip
              anchor={() => (
                <Button
                  onPress={async () => {
                    setVisibleTooltipRun3(true)
                    await mintRun3Token(walletWithProvider.address)
                    setTimeout(() => {
                      setVisibleTooltip(false)
                    }, 3000)
                  }}
                  style={[styles.btnItem, globalStyles.secondaryBg]}
                  size="small"
                >
                  GET RUN3T
                </Button>
              )}
              visible={visibleTooltipRun3}
              onBackdropPress={() => setVisibleTooltipRun3(false)}
            >
              Your will receive 100 RUN3T soon
            </Tooltip>
          )}
        />
        <Divider />
      </View>
      <Button
        onPress={() => setShouldRefresh(true)}
        style={[styles.refreshBtn, globalStyles.primaryBg]}
        accessoryLeft={<FontAwesomeIcon color="white" icon={faRefresh} size={18} />}
      >
        REFRESH
      </Button>
    </View>
  )
}
