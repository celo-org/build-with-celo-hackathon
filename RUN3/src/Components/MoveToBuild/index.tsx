import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, ButtonGroup, Divider } from '@ui-kitten/components'
import { colors, globalStyles } from '../../utils/globalStyles'
import RouteList from './routeList'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { styles } from './style'

export default function MoveToBuild({ navigation }: { navigation: any }) {
  const [showMyRoutes, setShowMyRoutes] = useState<boolean>(false)

  return (
    <View style={{ backgroundColor: '#fff' }}>
      <ButtonGroup status="basic" style={styles.topButtons}>
        <Button onPress={() => setShowMyRoutes(false)} style={!showMyRoutes && globalStyles.primaryBg}>
          All Routes
        </Button>
        <Button onPress={() => setShowMyRoutes(true)} style={showMyRoutes && globalStyles.primaryBg}>
          My Routes
        </Button>
      </ButtonGroup>
      <Divider />
      <RouteList showMyRoutes={showMyRoutes} />
      <Button
        style={styles.circleFloat}
        appearance="ghost"
        onPress={() => navigation.navigate('builder')}
        accessoryLeft={() => <FontAwesomeIcon color={colors.secondary} icon={faPlus} size={38} />}
      />
    </View>
  )
}
