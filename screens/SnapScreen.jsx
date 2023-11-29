import React, { useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react';
import { Camera } from 'expo-camera';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { addPics } from '../reducers/user';

export default function SnapScreen() {
  const dispatch = useDispatch()
  const [hasPermission, setHasPermission] = useState(null)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off)
  const cameraRef = useRef(null)


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])


  if (hasPermission === null) {
    return <View />
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
    <Camera style={{ flex: 1 }}
      ref={cameraRef}
      type={cameraType}
      flashMode={flashMode}>
      <FontAwesome
        name="rotate-right"
        style={styles.rotate}
        size={50}
        onPress={toggleCameraType}
      />
      <FontAwesome
        name="circle-thin"
        style={styles.button}
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
    marginTop: 15
  },
});
