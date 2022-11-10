import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps'
import { colors, globalStyles } from '../../utils/globalStyles'
import * as Location from 'expo-location'
import { Spinner, Button } from '@ui-kitten/components'
import { BuildForm } from './buildForm'
import { styles } from './style'
import { useRun3T } from '../../hooks/useRUN3T'
import { useIsFocused } from '@react-navigation/native'

export default function Builder() {
  const [routeCoords, setRouteCoords] = useState<(Location.LocationObjectCoords & { id: number })[]>([])
  const [buildStarted, setBuildStarted] = useState(false)
  const [showBuildForm, setShowBuildForm] = useState(false)
  const [loadingCalc, setLoadingCalc] = useState(false)
  const [markerIndex, setMarkerIndex] = useState<number>(0)
  const [currentDistance, setCurrentDistance] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const isFocused = useIsFocused()

  const { run3TBalance, getRun3TBalance } = useRun3T()
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
    if (!run3TBalance) {
      getRun3TBalance()
    }
  }, [run3TBalance, isFocused])

  useEffect(() => {
    let totalDistance = 0

    const distance = (
      coords1: Location.LocationObjectCoords & { id: number },
      coords2: Location.LocationObjectCoords & { id: number }
    ) => {
      const R = 6371e3 // metres
      const φ1 = (coords1.latitude * Math.PI) / 180 // φ, λ in radians
      const φ2 = (coords2.latitude * Math.PI) / 180
      const Δφ = ((coords2.latitude - coords1.latitude) * Math.PI) / 180
      const Δλ = ((coords2.longitude - coords1.longitude) * Math.PI) / 180

      const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

      return R * c
    }
    for (let i = 1; i < routeCoords.length; i++) {
      totalDistance += distance(routeCoords[i - 1], routeCoords[i])
    }
    setCurrentDistance(Number(totalDistance.toFixed(2)))
  }, [routeCoords])

  useEffect(() => {
    ;(async () => {
      try {
        if (!routeCoords.length) {
          let { status } = await Location.requestForegroundPermissionsAsync()
          if (status !== 'granted') {
            alert('Permission to access location was denied')
            return
          }
          await addCoordToRoute()
        }
      } catch (e) {
        console.log('error', e)
      }
    })()
  }, [routeCoords])

  if (routeCoords.length === 0 || isLoading)
    return (
      <View style={globalStyles.container}>
        <Spinner style={{ borderColor: colors.primary }} size="large" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    )

  return (
    <View style={globalStyles.container}>
      <View style={styles.floatingBox}>
        <Text style={styles.boxText}>{`Current Distance ${currentDistance}m`}</Text>
        <Text style={[styles.boxText, { marginTop: 8 }]}>{`RUN3T Cost: ${Number(
          (currentDistance / 10).toFixed(3)
        )} RUN3T`}</Text>
        <Text style={[styles.boxText, { marginTop: 8 }]}>{`RUN3T Balance: ${run3TBalance} RUN3T`}</Text>
        {currentDistance / 10 > Number(run3TBalance) && (
          <Text style={[styles.boxText, { marginTop: 8 }, globalStyles.yellowColor]}>
            Warning: you don't have enough RUN3T to build this route
          </Text>
        )}
      </View>
      {showBuildForm && (
        <BuildForm
          cost={Number((currentDistance / 10).toFixed(3))}
          setRouteCoords={setRouteCoords}
          setIsLoading={setIsLoading}
          routeCoords={routeCoords}
          closeForm={closeForm}
        />
      )}
      <View>
        {routeCoords[0] && (
          <MapView
            region={{
              longitude: routeCoords[0].longitude,
              latitude: routeCoords[0].latitude,
              latitudeDelta: 0.003,
              longitudeDelta: 0.003,
            }}
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
        )}
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
          {routeCoords.length > 1 && currentDistance / 10 <= Number(run3TBalance) && (
            <Button onPress={() => setShowBuildForm(true)} style={[styles.btntFloat, globalStyles.secondaryBg]}>
              BUILD ROUTE
            </Button>
          )}
        </View>
      )}
    </View>
  )
}
