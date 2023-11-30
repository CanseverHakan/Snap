import React, { useRef } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useEffect, useState } from 'react';
import { Camera } from 'expo-camera';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { addPics } from '../reducers/user';
import { useIsFocused } from '@react-navigation/native';

export default function SnapScreen() {
  const dispatch = useDispatch()
  const isFocused = useIsFocused()
  const [hasPermission, setHasPermission] = useState(null)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off)
  const cameraRef = useRef(null)


  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
    }

    getCameraPermissions()
  }, [])


  if (hasPermission === null || !isFocused) {
    return <View />
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  const takePicture = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.current.takePictureAsync({ quality: 0.3, flashMode: flashMode })
        dispatch(addPics(photo.uri))
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  }


  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    )
  }

  const toggleFlashMode = () => {
    setFlashMode(
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    )
  }

  const flashIconColor = flashMode === Camera.Constants.FlashMode.on ? 'yellow' : 'white';

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        type={cameraType}
        flashMode={flashMode}
        style={StyleSheet.absoluteFillObject}>
        <FontAwesome
          name="rotate-right"
          style={styles.rotate}
          color={'white'}
          size={50}
          onPress={toggleCameraType}
        />
        <FontAwesome
          name="circle-thin"
          style={styles.button}
          color={'white'}
          onPress={takePicture}
          size={90}
        />
        <FontAwesome
          name="flash"
          style={{ ...styles.flash, color: flashIconColor }}
          onPress={toggleFlashMode}
          size={30}
        />
      </Camera>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: '40%',
    marginBottom: 16,
  },
  rotate: {
    position: 'absolute',
    bottom: 20,
    left: '70%',
    marginBottom: 16,
  },
  flash: {
    position: 'absolute',
    left: '93%',
    marginTop: 15,
  },
});
