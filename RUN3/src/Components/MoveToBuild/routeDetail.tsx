import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps'
import { colors, globalStyles } from '../../utils/globalStyles'
import * as Location from 'expo-location'
import { Spinner, Button } from '@ui-kitten/components'
import { BuildForm } from './buildForm'
import { styles } from './style'
import { useRun3T } from '../../hooks/useRUN3T'
import { Route } from '../../api/routes/routes.interface'

export default function RouteDetail({ navigation, route }: { navigation: any; route: { params: Route } }) {
  const [routeCoords, setRouteCoords] = useState<(Location.LocationObjectCoords & { id: number })[]>([])
  const routeData = route.params
  useEffect(() => {
    const points = route.params.coordinates.map((co, index) => {
      return {
        id: index,
        latitude: co.latitude,
        longitude: co.longitude,
      }
    }) as (Location.LocationObjectCoords & { id: number })[]
    setRouteCoords(points)
  }, [])

  if (routeCoords.length === 0)
    return (
      <View style={globalStyles.container}>
        <Spinner style={{ borderColor: colors.primary }} size="large" />
        <Text style={styles.loadingText}>Loading Map</Text>
      </View>
    )

  return (
    <View style={globalStyles.container}>
      <View style={styles.floatingBox}>
        <Text style={styles.mapTitle}>{routeData.title}</Text>
        <Text style={[styles.boxText, { marginTop: 8 }]}>{routeData.description}</Text>
      </View>
      <MapView
        initialRegion={
          routeCoords[0] && {
            longitude: routeCoords[0].longitude,
            latitude: routeCoords[0].latitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          }
        }
        provider={PROVIDER_GOOGLE}
        style={styles.map}
      >
        {routeCoords.map((marker) => (
          <Marker
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
      <View style={styles.floatActions}>
        <Button
          onPress={() => navigation.navigate('ecostory', { id: routeData.id })}
          style={[styles.btntFloat, globalStyles.primaryBg]}
        >
          Create Eco-Story
        </Button>
      </View>
    </View>
  )
}
