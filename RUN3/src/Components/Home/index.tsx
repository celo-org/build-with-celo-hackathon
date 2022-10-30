import React, { useEffect, useState } from 'react'
// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values'

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims'
// Import ethers now
import { ethers } from 'ethers'

import { View, Text, Image } from 'react-native'
import { useWalletProvider } from '../../contexts/WalletContext'
import { colors, globalStyles } from '../../utils/globalStyles'
import { styles } from './styles'
import { Avatar, Button, Divider, ListItem, Tooltip } from '@ui-kitten/components'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faWallet, faArrowLeft, faRefresh } from '@fortawesome/free-solid-svg-icons'
import * as Clipboard from 'expo-clipboard'
import WebView from 'react-native-webview'
import { useRun3T } from '../../hooks'
import { useWatch } from '../../hooks/useWatch'

export default function Home() {
  const { walletWithProvider } = useWalletProvider()
  const { getWatchDataByUser, watchData } = useWatch()
  const { mintRun3Token, run3TBalance } = useRun3T()

  const [tooltipVisible, setTooltipVisible] = useState({
    type: '',
    message: '',
  })
  const [celoBalance, setCeloBalance] = useState<string>('')
  const [showWebView, setShowWebView] = useState<boolean>(false)
  const [shouldRefresh, setShouldRefresh] = useState<boolean>(true)

  const copyToClipboard = async () => {
    setTooltipVisible({
      type: 'copyClipboard',
      message: 'Your wallet address was copied to your clipboard',
    })
    await Clipboard.setStringAsync(walletWithProvider.address)
    setTimeout(() => {
      setTooltipVisible({
        type: '',
        message: '',
      })
    }, 3000)
  }

  useEffect(() => {
    getWatchDataByUser()
  }, [])

  useEffect(() => {
    if (shouldRefresh) {
      const getBalance = async () => {
        const value = await walletWithProvider.getBalance()
        const balanceInEth = ethers.utils.formatEther(value)
        setCeloBalance(balanceInEth)
      }

      getBalance()
      setShouldRefresh(false)
    }
  }, [shouldRefresh])

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
              visible={tooltipVisible.type === 'copyClipboard'}
              onBackdropPress={() => setTooltipVisible({ type: '', message: '' })}
            >
              {tooltipVisible.message}
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
          key="1"
          title={`Address: ${walletWithProvider.address}`}
          accessoryLeft={() => <FontAwesomeIcon color={colors.secondary} icon={faWallet} size={50} />}
          accessoryRight={() => (
            <Tooltip
              anchor={() => (
                <Button style={[styles.btnItem, globalStyles.secondaryBg]} onPress={copyToClipboard} size="small">
                  COPY
                </Button>
              )}
              visible={tooltipVisible.type === 'copyClipboard'}
              onBackdropPress={() =>
                setTooltipVisible({
                  type: '',
                  message: '',
                })
              }
            >
              {tooltipVisible.message}
            </Tooltip>
          )}
        />
        <Divider />
        <ListItem
          key="2"
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
          key="3"
          title={`RUN3T Balance: ${run3TBalance}`}
          accessoryLeft={() => <Avatar style={styles.celoLogo} source={require('../../../assets/RUN3-isologo-01.png')} />}
          accessoryRight={() => (
            <Tooltip
              anchor={() => (
                <Button
                  onPress={async () => {
                    setTooltipVisible({
                      message: 'Your will receive 100 RUN3T soon',
                      type: 'run3t',
                    })
                    await mintRun3Token(walletWithProvider.address)
                    setTimeout(() => {
                      setTooltipVisible({
                        message: '',
                        type: '',
                      })
                    }, 3000)
                  }}
                  style={[styles.btnItem, globalStyles.secondaryBg]}
                  size="small"
                >
                  GET RUN3T
                </Button>
              )}
              visible={tooltipVisible.type === 'run3t'}
              onBackdropPress={() =>
                setTooltipVisible({
                  message: '',
                  type: '',
                })
              }
            >
              {tooltipVisible.message}
            </Tooltip>
          )}
        />
        <Divider />
        <ListItem
          key="4"
          title={`${watchData?.name || 'Press "GET NFT", wait a few minutes and press refresh to get the watch'}`}
          accessoryLeft={() => <Avatar style={styles.celoLogo} source={require('../../../assets/Reloj_verde.png')} />}
          accessoryRight={() => (
            <Tooltip
              anchor={() =>
                !watchData?.name ? (
                  <Button
                    onPress={async () => {
                      setTooltipVisible({
                        type: 'watch',
                        message: 'Your will receive an NFT Watch soon',
                      })
                      await getWatchDataByUser()
                      setTimeout(() => {
                        setTooltipVisible({
                          type: '',
                          message: '',
                        })
                      }, 3000)
                    }}
                    style={[styles.btnItem, globalStyles.secondaryBg]}
                    size="small"
                  >
                    GET NFT
                  </Button>
                ) : (
                  <Text />
                )
              }
              visible={tooltipVisible.type === 'watch'}
              onBackdropPress={() =>
                setTooltipVisible({
                  type: '',
                  message: '',
                })
              }
            >
              {tooltipVisible.message}
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
