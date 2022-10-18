import React, { useEffect, useRef, useState } from 'react'
// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values'

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims'
// Import ethers now
import { ethers } from 'ethers'
import { View, Text, Image } from 'react-native'
import { Pedometer } from 'expo-sensors'
import { colors, globalStyles } from '../../utils/globalStyles'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { styles } from './style'
import { Button } from '@ui-kitten/components'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
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

  const subscription = useRef<Pedometer.Subscription | null>(null)
  const stepsToComplete = 100

  const unsubscribe = () => {
    subscription.current && subscription.current.remove()
    subscription.current = null
  }

  const subscribe = () => {
    subscription.current = Pedometer.watchStepCount((result) => {
      if (result.steps <= stepsToComplete) {
        setPedometer((prev) => ({
          ...prev,
          currentStepCount: result.steps,
        }))
      }
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
      const watchContract = new ethers.Contract(watchAddress, abi, walletWithProvider)
      // Not estimable
      // const estimatedGas = await watchContract?.estimateGas.collectReward(walletWithProvider.address)
      const mintTxUnsigned = await watchContract?.populateTransaction.collectReward(walletWithProvider.address)
      if (mintTxUnsigned) {
        mintTxUnsigned.gasLimit = ethers.BigNumber.from(1000000)
        mintTxUnsigned.gasPrice = await walletWithProvider.getGasPrice()
        const mintTxSigned = await walletWithProvider.signTransaction(mintTxUnsigned)
        console.log('logP', provider)
        const submittedTx = await provider.sendTransaction(mintTxSigned)
        const mintReceipt = await submittedTx.wait()

        if (mintReceipt.status === 0) throw new Error('Mint transaction failed')
      }
    } catch (e) {
      console.log('error', e)
    }
  }

  useEffect(() => {
    const setCurrentSteps = async () => {
      if (progressSteps) {
        //  await setSteps(String(progressSteps))
      }
    }
    setCurrentSteps()
  }, [progressSteps])

  useEffect(() => {
    if (!watchData) {
      getWatchDataByUser()
    }
  }, [watchData])

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

  useEffect(() => {
    subscribe()
  }, [])

  if (!watchData)
    return (
      <View style={globalStyles.container}>
        <Text style={{ margin: 8, fontSize: 20 }}>You don't have an NFT Watch yet, press refresh in the user page</Text>
      </View>
    )
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
      <View style={styles.stepsView}>
        <Text style={styles.circleText}>
          {progressSteps} / {stepsToComplete}
        </Text>
        <View style={styles.stepsLabel}>
          <Text style={styles.stepsText}>STEPS</Text>
        </View>
      </View>
      {/* {progressSteps >= stepsToComplete && ( */}
      <Button
        onPress={collectReward}
        accessoryLeft={<FontAwesomeIcon color={'#FFF'} icon={faWallet} size={20} />}
        style={[globalStyles.primaryBg, styles.btnRewards]}
      >
        COLLECT REWARDS
      </Button>
      {/* )} */}
    </View>
  )
}
