import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Card, Input, Text } from '@ui-kitten/components'
import { styles } from './style'
import { globalStyles } from '../../utils/globalStyles'

const Header = (props: any) => (
  <View {...props}>
    <Text category="h6">Build Route</Text>
  </View>
)

export const BuildForm = ({ closeForm }: { closeForm: () => void }) => (
  <Card
    style={styles.cardForm}
    header={Header}
    footer={(props: any) => (
      <View {...props} style={[props.style, styles.footerContainer]}>
        <Button onPress={closeForm} style={styles.footerControl} size="small" status="basic">
          CANCEL
        </Button>
        <Button onPress={closeForm} style={[styles.footerControl, globalStyles.primaryBg]} size="small">
          ACCEPT
        </Button>
      </View>
    )}
  >
    <Input style={styles.formInput} placeholder="Title" />
    <Input style={styles.formInput} placeholder="Description" />
  </Card>
)
