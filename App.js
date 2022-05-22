import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfileCustomer from './src/pages/profileCustomer/index'
import ProfileBengkel from './src/pages/profileBengkel'
import RegisterBengkel from './src/pages/registerBengkel'
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/index';
import RegisterBengkelMotor from './src/pages/registerBengkelMotor';

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

const styles = StyleSheet.create({})

export default App