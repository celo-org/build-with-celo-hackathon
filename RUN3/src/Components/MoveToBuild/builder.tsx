import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps'
import { colors, globalStyles } from '../../utils/globalStyles'
import * as Location from 'expo-location'
import { Spinner, Button } from '@ui-kitten/components'
import { BuildForm } from './buildForm'
import { styles } from './style'

export default function Builder() {
  const [routeCoords, setRouteCoords] = useState<(Location.LocationObjectCoords & { id: number })[]>([])
  const [buildStarted, setBuildStarted] = useState(false)
  const [showBuildForm, setShowBuildForm] = useState(false)
  const [loadingCalc, setLoadingCalc] = useState(false)
  const [markerIndex, setMarkerIndex] = useState<number>(0)
  const addCoordToRoute = async () => {
    const currentCoord = await Location.getCurrentPositionAsync({ accuracy: Location.LocationAccuracy.Balanced })
    const index = routeCoords.findIndex(
      (route) => route.latitude === currentCoord.coords.latitude && route.longitude === currentCoord.coords.longitude
    )
    if (index === -1) setRouteCoords((prev) => [...prev, { ...currentCoord.coords, id: Date.now() }])
  }

  const closeForm = () => {
    setShowBuildForm(false)
  }

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
      {showBuildForm && <BuildForm closeForm={closeForm} />}
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
          {routeCoords.map((marker) => (
            <Marker
              onDragStart={(e) => {
                const coords = e.nativeEvent.coordinate
                const index = routeCoords.findIndex(
                  (route) => route.latitude === coords.latitude && route.longitude === coords.longitude
                )
                setMarkerIndex(index)
                setLoadingCalc(true)
              }}
              onDragEnd={(e) => {
                const coords = e.nativeEvent.coordinate
                setRouteCoords((prev) => {
                  const routes = [...prev]
                  routes[markerIndex] = {
                    ...routes[markerIndex],
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                  }

                  return routes
                })
                setLoadingCalc(false)
              }}
              key={marker.id}
              coordinate={{
                longitude: marker.longitude,
                latitude: marker.latitude,
              }}
              draggable
              tappable
              title="Starting Point"
            />
          ))}
          <Polyline tappable coordinates={routeCoords} strokeColor={colors.primary} strokeWidth={4} />
        </MapView>
      </View>
      {!loadingCalc && (
        <View style={styles.floatActions}>
          {!buildStarted ? (
            <Button
              disabled={loadingCalc}
              onPress={() => setBuildStarted(true)}
              style={[styles.btntFloat, globalStyles.primaryBg]}
            >
              START BUILDING
            </Button>
          ) : (
            <Button onPress={addCoordToRoute} style={[styles.btntFloat, globalStyles.primaryBg]}>
              SAVE POINT
            </Button>
          )}
          {routeCoords.length > 1 && (
            <Button onPress={() => setShowBuildForm(true)} style={[styles.btntFloat, globalStyles.secondaryBg]}>
              BUILD ROUTE
            </Button>
          )}
        </View>
      )}
    </View>
  )
}
