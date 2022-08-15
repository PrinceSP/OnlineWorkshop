import React from 'react'
import {Text,View,TouchableOpacity} from 'react-native'
import {Burger,Edit} from '../../../assets'

const Header = ({name,navigation,action,edit,nav,color="#000",bgColor="#fff"})=>{

  const BackCancel = ({onPress})=>{
    return(
      <TouchableOpacity onPress={onPress}>
        <Text style={{fontFamily:'Poppins-Regular',color,fontSize:15}}>{action}</Text>
      </TouchableOpacity>
    )
  }

  return(
    <View style={{minHeight:43,alignItems:'center',justifyContent:'space-between',flexDirection:'row',paddingHorizontal:17,
    backgroundColor:bgColor}}>
      <Burger stroke={color} strokeWidth="4" strokeLinecap="round" onPress={()=>navigation.openDrawer()}/>

      <Text style={{fontFamily:'Poppins-Medium',color,fontSize:22}}>{name}</Text>
      {edit===true?<TouchableOpacity onPress={()=>nav.navigate('EditProfile')} style={{flexDirection:'row'}}><Edit/><Text style={{color:'#7a7a7a'}}>Edit</Text></TouchableOpacity>:<View style={{width:42}}/>}
    </View>
  )
}

export default Header
