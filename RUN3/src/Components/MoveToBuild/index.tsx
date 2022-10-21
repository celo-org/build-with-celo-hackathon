import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps'
import { globalStyles } from '../../utils/globalStyles'
import * as Location from 'expo-location'

export default function MoveToBuild() {
  const [location, setLocation] = useState<Location.LocationObject>()
  const [routeCoords, setRouteCoords] = useState<Location.LocationObjectCoords[]>([])
  const [errorMsg, setErrorMsg] = useState<string>()

  useEffect(() => {
    ;(async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied')
          return
        }
        const location = await await Location.getCurrentPositionAsync({})
        setLocation(location)
        await Location.watchPositionAsync(
          {
            accuracy: Location.LocationAccuracy.BestForNavigation,
            distanceInterval: 100,
          },
          (position) => {
            const { coords } = position
            setRouteCoords((prev) => [...prev, coords])
          }
        )
      } catch (e) {
        console.log('error', e)
      }
    })()
  }, [])

  return (
    <View style={globalStyles.container}>
      <Text>Move To Build</Text>
      <View style={styles.container}>
        <MapView
          initialRegion={
            location && {
              longitude: location.coords.longitude,
              latitude: location.coords.latitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }
          }
          provider={PROVIDER_GOOGLE}
          style={styles.map}
        >
          {location && (
            <Marker
              key="me"
              coordinate={{
                longitude: location?.coords.longitude,
                latitude: location?.coords.latitude,
              }}
              title="test"
              description="desc"
            />
          )}
          <Polyline coordinates={routeCoords} strokeColor="#19B5FE" strokeWidth={5} />
        </MapView>
      </View>
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
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 400,
  },
})
