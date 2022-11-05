import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import { Camera } from 'expo-camera'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'

export default function Ecostory({ navigation, route }: { navigation: any; route: { params: Route } }) {
  const [camera, setCamera] = useState<any>(new Camera({}))
  const [hasPermission, setHasPermission] = useState<any>(null)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState<any>(null)
  const [type, setType] = useState(Camera.Constants.Type.back)

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
    setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {previewVisible ? (
        <ImageBackground
          source={{ uri: capturedImage && capturedImage.uri }}
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              padding: 15,
              justifyContent: 'flex-end',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                onPress={() => setPreviewVisible(false)}
                style={{
                  width: 130,
                  height: 40,

                  alignItems: 'center',
                  borderRadius: 4,
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 20,
                  }}
                >
                  Re-take
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      ) : (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={type}
            ref={(r) => {
              setCamera(r)
            }}
          >
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 30 }}>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                }}
                onPress={takePicture}
              >
                <FontAwesome name="camera" style={{ color: '#fff', fontSize: 40 }} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                }}
                onPress={handleCameraType}
              >
                <MaterialCommunityIcons name="camera-switch" style={{ color: '#fff', fontSize: 40 }} />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      )}
    </View>
  )
}
