import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/index';

const App = () => {
  return (
    <>
      {/* <ProfileBengkel/> */}
      {/* <RegisterBengkel/> */}
      <RegisterBengkelMotor/>
      {/* <NavigationContainer> */}
        {/* <Routes/> */}
      {/* </NavigationContainer> */}
    </>
  )
}

export default App
