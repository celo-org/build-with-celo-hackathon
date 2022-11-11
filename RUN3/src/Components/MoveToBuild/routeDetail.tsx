import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Dimensions, Image } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps'
import { colors, globalStyles } from '../../utils/globalStyles'
import * as Location from 'expo-location'
import { Spinner, Button } from '@ui-kitten/components'
import { styles } from './style'
import { useIsFocused } from '@react-navigation/native'
import { Ecostory, Route } from '../../api/routes/routes.interface'
import { getRouteById } from '../../api/routes/routes'
import Carousel from 'react-native-snap-carousel'

export default function RouteDetail({ navigation, route }: { navigation: any; route: { params: string } }) {
  const [routeCoords, setRouteCoords] = useState<(Location.LocationObjectCoords & { id: number })[]>([])
  const [routeData, setRouteData] = useState<Route>()
  const [showEco, setShowEco] = useState(false)
  const routeId = route.params
  const isFocused = useIsFocused()
  const carouselRef = useRef(null)
  const { width, height } = Dimensions.get('window')

  const LATITUDE_DELTA = 0.0098
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height)

  const _renderItem = ({ item, index }: { item: Ecostory; index: number }) => {
    return (
      <View style={styles.carouselItem}>
        <View style={{ backgroundColor: 'black', borderRadius: 10 }}>
          <Image source={{ uri: item.image }} style={styles.carouselImg} />
        </View>
        <View style={{ padding: 8 }}>
          <Text style={styles.carouselDes}>{item.description}</Text>
          <Text style={styles.carouselUser}>
            Created at {item.date} by {item.user?.name}
          </Text>
        </View>
      </View>
    )
  }

  useEffect(() => {
    if (isFocused) {
      const getRouteData = async () => {
        const data = (await getRouteById(routeId)) as Route
        setRouteData(data)
        const points = data.coordinates.map((co, index) => {
          return {
            id: index,
            latitude: co.latitude,
            longitude: co.longitude,
          }
        }) as (Location.LocationObjectCoords & { id: number })[]
        setRouteCoords(points)
      }
      getRouteData()
    }
  }, [isFocused])

  if (routeCoords.length === 0 || !routeData)
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
        <Text style={[styles.boxText, { marginTop: 8 }]}>
          Eco-Stories: {routeData.ecostories?.length || 0}
          {'   '}
          {routeData.ecostories?.length && (
            <Button onPress={() => setShowEco(!showEco)} style={globalStyles.primaryBg} size="tiny">
              {showEco ? 'HIDE' : 'SHOW'}
            </Button>
          )}
        </Text>
      </View>
      {routeCoords[0] && (
        <MapView
          region={{
            longitude: routeCoords[0].longitude,
            latitude: routeCoords[0].latitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
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
            />
          ))}
          <Polyline tappable coordinates={routeCoords} strokeColor={colors.primary} strokeWidth={4} />
        </MapView>
      )}
      {showEco && (
        <View style={styles.carousel}>
          <Carousel
            layout={'default'}
            ref={carouselRef}
            data={routeData.ecostories || []}
            renderItem={_renderItem}
            sliderWidth={width}
            itemWidth={width - 100}
          />
        </View>
      )}
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
