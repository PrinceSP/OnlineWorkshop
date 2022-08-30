import 'react-native-gesture-handler';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes'
import {AuthContextProvider} from './config/authContext'

const App = ({navigation}) => {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Routes/>
      </NavigationContainer>
    </AuthContextProvider>
  )
}

export default App
