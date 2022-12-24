import React, { useEffect, useRef, useState } from 'react'
// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values'

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims'
// Import ethers now
import { ethers } from 'ethers'
import { View, Text, Image, Platform } from 'react-native'
import { Pedometer } from 'expo-sensors'
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import { colors, globalStyles } from '../../utils/globalStyles'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { styles } from './style'
import { Button } from '@ui-kitten/components'
import { useIsFocused } from '@react-navigation/native'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useWatch } from '../../hooks/useWatch'
import { useWalletProvider } from '../../contexts/WalletContext'

export default function MoveToEarn() {
  const [pedometer, setPedometer] = useState({
    isPedometerAvailable: false,
    pastStepCount: 0,
    currentStepCount: 0,
  })

  const { getItem: getSteps, setItem: setSteps } = useAsyncStorage('stepsCount')
  const { watchData, getWatchDataByUser, abi, watchAddress } = useWatch()
  const { walletWithProvider, provider } = useWalletProvider()
  const [showRunner, setShowRunner] = useState(false)
  const [loading, setLoading] = useState(false)
  const isFocused = useIsFocused()

  const subscription = useRef<Pedometer.Subscription | null>(null)
  const stepsToComplete = 100

  const unsubscribe = () => {
    if (subscription.current) {
      subscription.current.remove()
    }
    subscription.current = null
    setSteps('0')

    setPedometer((prev) => ({
      ...prev,
      pastStepCount: 0,
      currentStepCount: 0,
    }))
    setLoading(false)
  }

  const subscribe = () => {
    subscription.current = Pedometer.watchStepCount((result) => {
      setPedometer((prev) => ({
        ...prev,
        currentStepCount: result.steps,
      }))
    })

    Pedometer.isAvailableAsync().then(
      (result) => {
        setPedometer((prev) => ({
          ...prev,
          isPedometerAvailable: result,
        }))
      },
      (error) => {
        setPedometer((prev) => ({
          ...prev,
          isPedometerAvailable: false,
        }))
      }
    )
  }

  const progressSteps = pedometer.pastStepCount + pedometer.currentStepCount

  const collectReward = async () => {
    try {
      setShowRunner(true)
      setLoading(true)
      const watchContract = new ethers.Contract(watchAddress, abi, walletWithProvider)
      // Not estimable
      // const estimatedGas = await watchContract?.estimateGas.collectReward(walletWithProvider.address)
      const mintTxUnsigned = await watchContract?.populateTransaction.collectReward(walletWithProvider.address)
      if (mintTxUnsigned) {
        mintTxUnsigned.gasLimit = ethers.BigNumber.from(1000000)
        mintTxUnsigned.gasPrice = await walletWithProvider.getGasPrice()
        const mintTxSigned = await walletWithProvider.signTransaction(mintTxUnsigned)
        const submittedTx = await provider.sendTransaction(mintTxSigned)
        const mintReceipt = await submittedTx.wait()

        if (mintReceipt.status === 0) {
          alert('Transaction failed, sorry please try again')
          setLoading(false)
        } else {
          unsubscribe()
          subscribe()
        }
      }
    } catch (e) {
      console.log('error', e)
    }
  }

  useEffect(() => {
    const setCurrentSteps = async () => {
      if (progressSteps) {
        await setSteps(String(progressSteps))
      }
    }
    setCurrentSteps()
  }, [progressSteps])

  useEffect(() => {
    if (!watchData) {
      getWatchDataByUser()
    }
  }, [watchData, isFocused])

  useEffect(() => {
    subscribe()

    // Unfortunately, this does not work as it should, is not asking for Android permission :/
    if (Platform.OS === 'android') {
      alert('Pedometer in Android might not work, sorry for the inconvenience :( ')
      Pedometer.requestPermissionsAsync()
        .then((result) => {
          if (result.granted) {
            console.log('Pedometer working')
          } else {
            alert('The permission for the pedometer has not been requested or it was denied')
          }
        })
        .catch((error) => {
          alert('Something went wrong, please close the app and try again')
        })
    }

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    const getStoredSteps = async () => {
      const storedSteps = await getSteps()
      if (Number(storedSteps)) {
        setPedometer((prev) => ({
          ...prev,
          pastStepCount: Number(storedSteps),
        }))
      }
    }
    getStoredSteps()
  }, [])

  if (!watchData)
    return (
      <View style={globalStyles.container}>
        <Text style={{ margin: 8, fontSize: 20 }}>You don't have an NFT Watch yet, press "GET NFT" in the user page</Text>
      </View>
    )

  if (showRunner) {
    return (
      <View style={globalStyles.container}>
        <View style={styles.runnerBox}>
          <Text style={styles.congratsMsg}>Congratulations! you will receive 10RUN3T soon</Text>
        </View>
        <Image
          source={require('../../../assets/runner.gif')}
          style={{
            height: 500,
            resizeMode: 'contain',
          }}
        />
        {loading ? (
          <Text style={styles.loading}>Loading...</Text>
        ) : (
          <Button
            onPress={() => {
              setShowRunner(false)
            }}
            disabled={loading}
            style={[styles.okBtn, globalStyles.primaryBg]}
          >
            OK
          </Button>
        )}
      </View>
    )
  }

  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>
        {watchData.name} #{watchData.id}
      </Text>
      <AnimatedCircularProgress
        size={300}
        width={15}
        fill={progressSteps}
        tintColor={colors.lightGreen}
        backgroundColor={'#d8eaeb'}
      >
        {(fill) => (
          <View>
            <Image
              source={require('../../../assets/Reloj_verde.png')}
              style={{
                width: 200,
                resizeMode: 'contain',
              }}
            />
          </View>
        )}
      </AnimatedCircularProgress>
      <View style={styles.pedBox}>
        <Text style={styles.pedStatus}>
          Status:{' '}
          {pedometer.isPedometerAvailable ? (
            <Text style={{ fontWeight: '600' }}>Connected</Text>
          ) : (
            <Text style={{ fontWeight: '600' }}>Disconnected</Text>
          )}
        </Text>
        <View style={pedometer.isPedometerAvailable ? [styles.circle, globalStyles.lightGreenBg] : styles.circle} />
      </View>
      <View style={styles.stepsView}>
        <Text style={styles.circleText}>
          {progressSteps > 100 ? 100 : progressSteps} / {stepsToComplete}
        </Text>
        <View style={styles.stepsLabel}>
          <Text style={styles.stepsText}>STEPS</Text>
        </View>
      </View>
      {progressSteps >= stepsToComplete && (
        <Button
          onPress={collectReward}
          accessoryLeft={<FontAwesomeIcon color={'#FFF'} icon={faCoins} size={20} />}
          style={[globalStyles.primaryBg, styles.btnRewards]}
        >
          COLLECT REWARDS
        </Button>
      )}
    </View>
  )
}
