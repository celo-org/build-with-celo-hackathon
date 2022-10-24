import React, { useState } from 'react'
import { View } from 'react-native'
import { Button } from '@ui-kitten/components'
import { colors } from '../../utils/globalStyles'
import RouteList from './routeList'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { styles } from './style'

export default function MoveToBuild({ navigation }: { navigation: any }) {
  const [isBuilding, setIsBuilding] = useState(false)

  return (
    <View>
      <RouteList />
      <Button
        style={styles.circleFloat}
        appearance="ghost"
        onPress={() => navigation.navigate('builder')}
        accessoryLeft={() => <FontAwesomeIcon color={colors.secondary} icon={faPlus} size={38} />}
      />
    </View>
  )
}
