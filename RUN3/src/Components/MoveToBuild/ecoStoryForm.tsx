import React, { useState } from 'react'
import { View, Image, ScrollView, TextInput, TouchableOpacity, Text } from 'react-native'
import { Button, Input, Icon, Spinner } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { useWalletProvider } from '../../contexts/WalletContext'
import { styles } from './style'
import { colors } from '../../utils/globalStyles'
import { globalStyles } from '../../utils/globalStyles'
import { CameraCapturedPicture } from 'expo-camera'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { updateRouteEcostories, getRouteById } from '../../api/routes/routes'
import { Ecostory, Route } from '../../api/routes/routes.interface'

export default function EcoStoryForm({
  navigation,
  route,
}: {
  navigation: any
  route: { params: { capturedImage: CameraCapturedPicture; routeId: string } }
}) {
  const [ecoStory, setEcoStory] = useState<Ecostory>({
    date: new Date().toLocaleDateString(),
    description: '',
    image: '',
    points: 0,
  })
  const [loader, setLoader] = useState(false)
  const { capturedImage, routeId } = route.params

  return (
    <ScrollView style={{ backgroundColor: colors.white }} keyboardShouldPersistTaps="handled">
      <View style={{ marginTop: 60 }}>
        <View style={styles.postBtnCont}>
          <Button
            appearance="ghost"
            style={{ width: 50 }}
            disabled={loader}
            accessoryLeft={<FontAwesomeIcon color={colors.secondary} icon={faArrowLeft} size={25} />}
            onPress={() => navigation.pop(2)}
          />
          {!loader ? (
            <Button
              onPress={async () => {
                setLoader(true)
                const currentRoute = (await getRouteById(routeId)) as Route
                if (ecoStory.description) {
                  const stories = !currentRoute.ecostories ? [ecoStory] : [...currentRoute.ecostories, ecoStory]
                  await updateRouteEcostories(routeId, stories)
                  navigation.pop(2)
                  setLoader(false)
                } else {
                  alert('Please fill the description')
                  setLoader(false)
                }
              }}
              style={[styles.postBtn, globalStyles.secondaryBg]}
            >
              Post
            </Button>
          ) : (
            <Spinner style={{ borderColor: colors.primary }} size="large" />
          )}
        </View>
        <TouchableOpacity style={styles.cameraButtons} onPress={() => navigation.navigate('ecoStoryForm', capturedImage)}>
          <Text style={styles.actionBtns}>Save</Text>
        </TouchableOpacity>
        <View style={{ marginTop: -25 }}>
          <Input
            textStyle={{ minHeight: 150 }}
            onChangeText={(val) => {
              setEcoStory((prev) => ({
                ...prev,
                description: val,
              }))
            }}
            placeholder="Type the description here"
            multiline
            numberOfLines={8}
          />
        </View>
        <Image source={{ uri: capturedImage.uri }} style={styles.postImage} />
      </View>
    </ScrollView>
  )
}
