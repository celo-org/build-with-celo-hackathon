import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { Pedometer } from 'expo-sensors'
import { colors, globalStyles } from '../../utils/globalStyles'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { styles } from './style'
import { Button } from '@ui-kitten/components'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

export default function MoveToEarn() {
  const [pedometer, setPedometer] = useState({
    isPedometerAvailable: false,
    pastStepCount: 0,
    currentStepCount: 0,
  })

  const { getItem: getSteps, setItem: setSteps } = useAsyncStorage('stepsCount')

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

  useEffect(() => {
    const setCurrentSteps = async () => {
      if (progressSteps) {
        //  await setSteps(String(progressSteps))
      }
    }
    setCurrentSteps()
  }, [progressSteps])

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

  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>NFT WATCH</Text>
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
      {progressSteps >= stepsToComplete && (
        <Button
          accessoryLeft={<FontAwesomeIcon color={'#FFF'} icon={faWallet} size={20} />}
          style={[globalStyles.primaryBg, styles.btnRewards]}
        >
          COLLECT REWARDS
        </Button>
      )}
    </View>
  )
}
