import React from 'react'
import { View, StyleSheet, Image } from 'react-native'

export default function Header() {
  return (
    <View style={styles.viewContainer}>
      <Image
        source={require('../../../assets/RUN3-logo-03.png')}
        style={{
          width: '100%',
          height: 40,
          resizeMode: 'contain',
        }}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'row',
    right: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
