import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps'
import { colors, globalStyles } from '../../utils/globalStyles'
import * as Location from 'expo-location'
import { Spinner, Button, Card } from '@ui-kitten/components'
import { styles } from './style'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

export default function Builder() {
  const [routeCoords, setRouteCoords] = useState<Location.LocationObjectCoords[]>([])
  const [buildStarted, setBuildStarted] = useState(false)
  const [loadingCalc, setLoadingCalc] = useState(false)

  const addCoordToRoute = async () => {
    const currentCoord = await Location.getCurrentPositionAsync({ accuracy: Location.LocationAccuracy.Balanced })
    setRouteCoords((prev) => [...prev, currentCoord.coords])
  }

  const recalculatePoint = async () => {
    setLoadingCalc(true)
    if (routeCoords.length) {
      const currentCoord = await Location.getCurrentPositionAsync({ accuracy: Location.LocationAccuracy.High })
      setRouteCoords((prev) => {
        const temp = [...prev]
        temp[temp.length - 1] = currentCoord.coords
        return [...temp]
      })
    }
    setLoadingCalc(false)
  }

  const LoadingIndicator = (props: any) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner size="small" />
    </View>
  )

  useEffect(() => {
    ;(async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
          alert('Permission to access location was denied')
          return
        }
        await addCoordToRoute()
      } catch (e) {
        console.log('error', e)
      }
    })()
  }, [])

  if (routeCoords.length === 0)
    return (
      <View style={globalStyles.container}>
        <Spinner style={{ borderColor: colors.primary }} size="large" />
        <Text style={styles.loadingText}>Loading Map and Getting Location</Text>
      </View>
    )

  return (
    <View style={globalStyles.container}>
      <View style={styles.floatingBox}>
        <Text style={styles.boxText}>Current Distance 1000m = 100 RUN3T</Text>
        <Text style={[styles.boxText, { marginTop: 8 }]}>RUN3T Balance: 80RUN3T</Text>
        {/* <Text style={[styles.boxText, { marginTop: 8 }, globalStyles.yellowColor]}>
          Warning: you don't have enough RUN3T to build this route
        </Text> */}
      </View>
      <View>
        <MapView
          initialRegion={
            routeCoords[0] && {
              longitude: routeCoords[0].longitude,
              latitude: routeCoords[0].latitude,
              latitudeDelta: 0.003,
              longitudeDelta: 0.003,
            }
          }
          provider={PROVIDER_GOOGLE}
          style={styles.map}
        >
          {routeCoords.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                longitude: marker.longitude,
                latitude: marker.latitude,
              }}
              title="test"
              description="desc"
            />
          ))}
          <Polyline tappable coordinates={routeCoords} strokeColor={colors.lightGreen} strokeWidth={5} />
        </MapView>
      </View>
      <View style={styles.floatActions}>
        <Button
          accessoryLeft={loadingCalc ? LoadingIndicator : undefined}
          style={[styles.btntFloat]}
          onPress={recalculatePoint}
          disabled={loadingCalc}
          status="control"
        >
          RECALCULATE POINT
        </Button>
        {!buildStarted ? (
          <Button
            disabled={loadingCalc}
            onPress={() => setBuildStarted(true)}
            style={[styles.btntFloat, globalStyles.primaryBg]}
          >
            START BUILDING
          </Button>
        ) : (
          <Button onPress={addCoordToRoute} disabled={loadingCalc} style={[styles.btntFloat, globalStyles.primaryBg]}>
            SAVE POINT
          </Button>
        )}
        {routeCoords.length > 1 && (
          <Button disabled={loadingCalc} style={[styles.btntFloat, globalStyles.secondaryBg]}>
            BUILD ROUTE
          </Button>
        )}
      </View>
    </View>
  )
}
