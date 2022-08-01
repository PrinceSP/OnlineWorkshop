import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes'

const App = ({navigation}) => {
  return (
    <NavigationContainer>
      <Routes/>
    </NavigationContainer>
  )
}

export default App
