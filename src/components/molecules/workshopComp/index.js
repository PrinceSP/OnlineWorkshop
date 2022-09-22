import React from 'react'
import {View,Text,TouchableOpacity,Image,StyleSheet,Modal} from 'react-native'
import {Gap,Button,Input} from '../../atoms'
import {ModalSuccess} from '../successModal'

const WorkshopComponent = ({desc='Online',onPress,namaBengkel,address,image="",...rest}) => {

  return (
    <TouchableOpacity onPress={onPress} {...rest}>
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

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:15,
        backgroundColor:"#fff"
    },
    textCaption:{
        fontFamily:'Nunito-Bold',
        fontWeight:'700',
        fontSize: 36,
        color:'#000000',
        letterSpacing: 0.4
    },
    ImageStyle: {
        padding: 10,
        // marginTop: 40,
        // marginBottom: 35,
        height: 87,
        width: 87,
        borderRadius:43.5,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    bottomSheet:{
      position:'absolute',
      bottom:0,
      right:0,
      left:0,
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
      zIndex:99,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius:3.84,
      elevation:10,
      paddingHorizontal:16,
      paddingVertical:16,
    },
})

export default WorkshopComponent
