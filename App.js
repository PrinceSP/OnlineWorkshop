import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import { NavigationContainer } from '@react-navigation/native';
// import Routes from './src/routes/index';

import RegisterBengkelMotor from './src/pages/registerBengkelMotor';
import HomePageBengkel from './src/pages/homepageBengkel';
import SplashScreen from './src/pages/splashScreen';
import PermintaanService from './src/pages/permintaanService';

const App = () => {
  return (
    <>

      {/* <RegisterBengkelMotor/> */}
      {/* <HomePageBengkel/> */}
      <PermintaanService/>
      {/* <SplashScreen/> */}
    </>
  )
}

export default App
