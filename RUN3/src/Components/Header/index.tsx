import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { View, Image } from 'react-native'
import { Button } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { useWalletProvider } from '../../contexts/WalletContext'
import { styles } from './styles'
import { colors } from '../../utils/globalStyles'

export default function Header() {
  const { setWalletWithProvider, setProvider } = useWalletProvider()
  const navigation = useNavigation() as any

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
      <Button
        onPress={() => {
          setWalletWithProvider({} as any)
          setProvider({} as any)
          navigation.replace('login')
        }}
        appearance="ghost"
        style={styles.logOut}
        accessoryLeft={<FontAwesomeIcon color={colors.secondary} icon={faDoorOpen} size={25} />}
      />
    </View>
  )
}
