import React, { useEffect, useState } from 'react'
import { Divider, List, ListItem, Spinner, Text } from '@ui-kitten/components'
import { styles } from './style'
import { getRoutes } from '../../api/routes/routes'
import { Route } from '../../api/routes/routes.interface'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRoute } from '@fortawesome/free-solid-svg-icons'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { colors, globalStyles } from '../../utils/globalStyles'
import { useRoute } from '../../hooks/useRoute'
import { useIsFocused } from '@react-navigation/native'

export default function RouteList({ showMyRoutes }: { showMyRoutes: boolean }) {
  const [routes, setRoutes] = useState<Route[]>([])
  const [myRoutes, setMyRoutes] = useState<Route[]>([])
  const [loader, setLoader] = useState<boolean>(false)
  const navigation = useNavigation() as any
  const isFocused = useIsFocused()

  const { getRoutesByUser } = useRoute()

  useEffect(() => {
    const getList = async () => {
      if ((routes.length === 0 && !showMyRoutes) || (myRoutes.length === 0 && showMyRoutes)) {
        setLoader(true)
      }
      let list
      if (showMyRoutes) {
        list = (await getRoutesByUser()) as Route[]
        setMyRoutes(list)
      } else {
        list = (await getRoutes()) as Route[]
        setRoutes(list)
      }
      setLoader(false)
    }
    getList()
  }, [showMyRoutes, isFocused])

  const renderItem = ({ item }: { item: Route; index: number }) => (
    <ListItem
      key={item.id}
      title={item.title}
      onPress={() => {
        navigation.navigate('routeDetail', item.id)
      }}
      description={item.description}
      accessoryLeft={() => (
        <View style={styles.routeIcon}>
          <FontAwesomeIcon style={globalStyles.lightGreenColor} size={34} icon={faRoute} />
        </View>
      )}
    />
  )

  if (loader)
    return (
      <View style={styles.wrapSpinner}>
        <Spinner style={{ borderColor: colors.primary }} size="large" />
        {showMyRoutes && (
          <Text style={{ textAlign: 'center', width: '80%' }}>
            This might take a while cause is being consulted in the blockchain, please be patient
          </Text>
        )}
      </View>
    )

  return (
    <List
      style={styles.listContainer}
      data={showMyRoutes ? myRoutes : routes}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
  )
}
