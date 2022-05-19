import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Profile from './src2/pages/profile/index'
import Icon from 'react-native-vector-icons/MaterialIcons'

const App = () => {
  return (
    <>
      {/* <Profile/> */}
      <Text>React Native Vector Icon</Text>
      <Text> <Icon name="book" size = {50}/></Text>
    </>
  )
}

export default App

const styles = StyleSheet.create({})