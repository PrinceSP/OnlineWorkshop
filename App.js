import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


import RegisterBengkelMotor from './src/pages/registerBengkelMotor';
import HomePageBengkel from './src/pages/homepageBengkel';
import SplashScreen from './src/pages/splashScreen';
import PermintaanService from './src/pages/permintaanService';
import BengkelMelaporCustomer from './src/pages/bengkelMelaporCustomer';
import HistoryPemesanan from './src/pages/historyPemesanan';

const App = () => {
  return (
    <>
      {/* <RegisterBengkelMotor/> */}
      {/* <HomePageBengkel/> */}
      {/* <PermintaanService/> */}
      {/* <SplashScreen/> */}
      {/* <BengkelMelaporCustomer/> */}
      {/* <ProfileCustomer/> */}
      <HistoryPemesanan/>
    </>
  )
}

export default App

