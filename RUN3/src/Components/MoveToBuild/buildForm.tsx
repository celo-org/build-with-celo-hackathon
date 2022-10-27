import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Card, Input, Text } from '@ui-kitten/components'
import { styles } from './style'
import { globalStyles } from '../../utils/globalStyles'
import { createRoute } from '../../api/routes/routes'
import { LocationObjectCoords } from 'expo-location'
import { GeoPoint } from 'firebase/firestore'

const Header = (props: any) => (
  <View {...props}>
    <Text category="h6">Build Route</Text>
  </View>
)

export const BuildForm = ({
  closeForm,
  routeCoords,
}: {
  closeForm: () => void
  routeCoords: (LocationObjectCoords & { id: number })[]
}) => {
  const [des, setDes] = useState<string>('')
  const [title, setTitle] = useState<string>('')

  const buildRoute = async () => {
    const payload = {
      coordinates: routeCoords.map((route) => new GeoPoint(route.latitude, route.longitude)),
      date: new Date().toLocaleDateString(),
      title,
      description: des,
    }
    const res = await createRoute(payload)
    console.log('logR', res)
  }

  return (
    <Card
      style={styles.cardForm}
      header={Header}
      footer={(props: any) => (
        <View {...props} style={[props.style, styles.footerContainer]}>
          <Button onPress={closeForm} style={styles.footerControl} size="small" status="basic">
            CANCEL
          </Button>
          <Button
            onPress={() => {
              buildRoute()
              closeForm()
            }}
            style={[styles.footerControl, globalStyles.primaryBg]}
            size="small"
          >
            ACCEPT
          </Button>
        </View>
      )}
    >
      <Input
        style={styles.formInput}
        onChangeText={(e) => {
          setTitle(e)
        }}
        placeholder="Title"
      />
      <Input
        style={styles.formInput}
        onChangeText={(e) => {
          setDes(e)
        }}
        placeholder="Description"
      />
    </Card>
  )
}
