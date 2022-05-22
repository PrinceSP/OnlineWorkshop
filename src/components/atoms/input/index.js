import React from 'react'
import {View,Text,TextInput,StyleSheet} from 'react-native'

const Input = ({setLabel=false,width=329,borderRadius=50,label,color,...rest})=>{
  const style=StyleSheet.create({
    container:{
      height:50,
      width,
      borderWidth:1.5,
      borderColor:'#000',
      borderRadius,
      color:'#000',
      paddingHorizontal:28.77,
      fontSize:19,
      backgroundColor:'#fff',
    }
  })

  return(
    <View>
      {setLabel && <Text style={{fontSize:20,color,marginBottom:4}}>{label}</Text>}
      <TextInput placeholderTextColor="#999" style={style.container} autoCapitalize="none" {...rest}/>
    </View>
  )
}



export default Input
