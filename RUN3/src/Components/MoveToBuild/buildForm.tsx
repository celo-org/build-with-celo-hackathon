import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Card, Input, Text } from '@ui-kitten/components'
import { styles } from './style'
import { globalStyles } from '../../utils/globalStyles'
import { createRoute } from '../../api/routes/routes'
import { LocationObjectCoords } from 'expo-location'
import { GeoPoint } from 'firebase/firestore'
import { useRoute } from '../../hooks/useRoute'
import { useRun3T } from '../../hooks/useRUN3T'
import { useWalletProvider } from '../../contexts/WalletContext'

const Header = (props: any) => (
  <View {...props}>
    <Text category="h6">Build Route</Text>
  </View>
)

export const BuildForm = ({
  closeForm,
  routeCoords,
  cost,
}: {
  closeForm: () => void
  routeCoords: (LocationObjectCoords & { id: number })[]
  cost: number
}) => {
  const [des, setDes] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const { routeAddress, mintRoute, getRouteByUser } = useRoute()
  const { transferRun3TtoContract } = useRun3T()

  const buildRoute = async () => {
    const payload = {
      coordinates: routeCoords.map((route) => new GeoPoint(route.latitude, route.longitude)),
      date: new Date().toLocaleDateString(),
      title,
      description: des,
    }
    try {
      const payment = await transferRun3TtoContract(cost)
      if (payment) {
        const res: any = await createRoute(payload)
        await mintRoute(res.id)
      } else {
        alert('There was an error, please try again')
      }
    } catch (e) {
      console.log('error', e)
    }
  }

  useEffect(() => {
    getRouteByUser()
  }, [])

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
