import React, { useEffect, useState } from 'react'
import { Divider, List, ListItem, Spinner } from '@ui-kitten/components'
import { styles } from './style'
import { getRoutes } from '../../api/routes/routes'
import { Route } from '../../api/routes/routes.interface'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRoute } from '@fortawesome/free-solid-svg-icons'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { colors, globalStyles } from '../../utils/globalStyles'
import { useRoute } from '../../hooks/useRoute'

export default function RouteList({ showMyRoutes }: { showMyRoutes: boolean }) {
  const [routes, setRoutes] = useState<Route[]>([])
  const [loader, setLoader] = useState<boolean>(false)
  const navigation = useNavigation()

  const { getRoutesByUser } = useRoute()

  useEffect(() => {
    const getList = async () => {
      setLoader(true)
      let list
      if (showMyRoutes) {
        list = (await getRoutesByUser()) as Route[]
      } else {
        list = (await getRoutes()) as Route[]
      }
      setRoutes(list)
      setLoader(false)
    }
    getList()
  }, [showMyRoutes])

  const renderItem = ({ item }: { item: Route; index: number }) => (
    <ListItem
      key={item.id}
      title={item.title}
      onPress={() => {
        navigation.navigate('routeDetail', item)
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
      </View>
    )

  return <List style={styles.listContainer} data={routes} ItemSeparatorComponent={Divider} renderItem={renderItem} />
}
