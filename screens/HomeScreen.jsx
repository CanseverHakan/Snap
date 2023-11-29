import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addEmail } from '../reducers/user'

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [errorMsg, setErrorMsg] = useState(null)

  const isEmailValid = () => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  }

  const handlePress = () => {
    if (isEmailValid()) {
      dispatch(addEmail(email));
      navigation.navigate('TabNavigator', { screen: 'Snap' });
    } else {
      setErrorMsg('invalid email adress');
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.homeImage}
        source={require('../assets/camera.jpg')} >
      </Image>
      <Text style={styles.title}>SnapMe</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder='Email' onChangeText={(value) => setEmail(value.toLowerCase())} value={email}></TextInput>
        {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
        <TouchableOpacity style={styles.button} onPress={() => handlePress()}>
          <Text style={styles.buttonText}>Go to Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 300,
  },
  homeImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 50,
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    paddingVertical: 20,
    borderRadius: 15,
    gap: 30,
    marginBottom: -200
  },
  input: {
    marginHorizontal: 20,
    width: 290,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  button: {
    paddingVertical: 5,
    marginHorizontal: 20,
    paddingHorizontal: 100,
    width: '100%',
    backgroundColor: '#76B3A5',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 15,
    marginLeft: 90,  
  }
});
