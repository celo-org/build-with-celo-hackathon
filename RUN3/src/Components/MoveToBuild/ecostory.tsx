import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import { Camera, CameraCapturedPicture } from 'expo-camera'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { Route } from '../../api/routes/routes.interface'
import { styles } from './style'

export default function Ecostory({ navigation, route }: { navigation: any; route: { params: Route } }) {
  const [camera, setCamera] = useState<Camera>(new Camera({}))
  const [hasPermission, setHasPermission] = useState<boolean>(false)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture>()
  const back = 1
  const front = 2
  const [type, setType] = useState(back)

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  const takePicture = async () => {
    if (!camera) return
    let photo = await camera.takePictureAsync()
    setPreviewVisible(true)
    setCapturedImage(photo)
  }

  const handleCameraType = () => {
    setType(type === back ? front : back)
  }

  return (
    <View style={styles.flex1}>
      {previewVisible ? (
        <ImageBackground source={{ uri: capturedImage && capturedImage.uri }} style={styles.flex1}>
          <View style={styles.buttonsCameraCont}>
            <TouchableOpacity style={styles.cameraButtons} onPress={() => setPreviewVisible(false)}>
              <Text style={styles.actionBtns}>Re-take</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      ) : (
        <View style={styles.flex1}>
          <Camera
            style={styles.flex1}
            type={type}
            ref={(r) => {
              if (r) setCamera(r)
            }}
          >
            <View style={styles.buttonsCameraCont}>
              <TouchableOpacity style={styles.cameraButtons} onPress={() => navigation.goBack()}>
                <FontAwesome name="arrow-left" style={styles.cameraIcons} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.cameraButtons} onPress={takePicture}>
                <FontAwesome name="camera" style={styles.cameraIcons} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.cameraButtons} onPress={handleCameraType}>
                <MaterialCommunityIcons name="camera-switch" style={styles.cameraIcons} />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      )}
    </View>
  )
}
