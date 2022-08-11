import React from 'react'
import {View,StyleSheet,Text} from 'react-native'
import {Header,Gap} from '../../components'

const HomepageCustomer = (props) => {
  return (
    <View style={styles.container}>
      <Gap height={20}/>
      <Header button={true}/>
      <Gap height={30}/>
      <WorkshopComponent/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
  }
})

export default HomepageCustomer
