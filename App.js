import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import user from './reducers/user';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './screens/HomeScreen';
import GalleryScreen from './screens/GalleryScreen';
import SnapScreen from './screens/SnapScreen';
import Scanner from './screens/Scanner';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const reducers = combineReducers({ user })

const persistConfig = {
  key: 'snapme-5363728asa2yegz',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

const persistor = persistStore(store);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = '';

          if (route.name === 'Snap') {
            iconName = 'camera';
          } else if (route.name === 'Gallery') {
            iconName = 'image';
          } else if (route.name === 'Scanner') {
            iconName = 'qrcode';
          }
          return <FontAwesome name={iconName} size={30} color={color}></FontAwesome>;
        },
        tabBarActiveTintColor: '#e8be4b',
        tabBarInactiveTintColor: '#b2b2b2',
      })}
    >
      <Tab.Screen name="Snap" component={SnapScreen}></Tab.Screen>
      <Tab.Screen name="Scanner" component={Scanner}></Tab.Screen>
      <Tab.Screen name="Gallery" component={GalleryScreen}></Tab.Screen>
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
            <Stack.Screen name="TabNavigator" component={TabNavigator}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

