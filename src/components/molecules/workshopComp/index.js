import React from 'react'
import {View,Text} from 'react-native'
import {Gap} from '../../atoms'

const WorkshopComponent = (props) => {
  return (
    <View style={{width:"100%",flexDirection:'row',padding:15,justifyContent:"space-between"}}>
      <View style={{width:80,height:82,backgroundColor:"#444",borderRadius:15}}/>
      <View>
        <Text style={{fontFamily:"Nunito-Bold",color:"#000"}}>Bengkel Motor Jaya, Malalayang</Text>
        <Gap height={6}/>
        <Text style={{fontFamily:"Nunito-Light",color:"#000"}}>Bengkel Sepeda motor dan spare parts</Text>
        <Gap height={3}/>
        <View style={{width:278,height:1,backgroundColor:"#555"}}/>
        <Gap height={3}/>
        <Text style={{color:"#B3B553",fontFamily:"Nunito-Bold"}}>Online</Text>
      </View>
    </View>
  )
}

export default WorkshopComponent
