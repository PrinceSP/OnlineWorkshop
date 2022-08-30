import React from 'react'
import {View,Text,TouchableOpacity,Image} from 'react-native'
import {Gap} from '../../atoms'

const WorkshopComponent = ({desc='Online',onPress,namaBengkel,address,image=""}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{width:"100%",flexDirection:'row',padding:15,justifyContent:"space-between"}}>
        {image==="" ? <View style={{width:80,height:82,backgroundColor:"#444",borderRadius:15}}/> : <Image style={{width:80,height:82,backgroundColor:"#444",borderRadius:15}} source={{uri:`data:image/png;base64,${image}`}}/>}
        <View>
          <Text style={{fontFamily:"Nunito-Bold",color:"#000"}}>{namaBengkel}</Text>
          <Gap height={6}/>
          <Text style={{fontFamily:"Nunito-Light",color:"#000"}}>{address}</Text>
          <Gap height={3}/>
          <View style={{width:278,height:1,backgroundColor:"#555"}}/>
          <Gap height={3}/>
          <Text style={{color:desc==="Online"?"#B3B553":"#777",fontFamily:"Nunito-Bold"}}>{desc}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default WorkshopComponent
