import { StyleSheet, Text, View, Image, useWindowDimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import {ArrowLeft} from '../../assets/'
import { Gap,Button } from '../../components'
import {PanGestureHandler} from 'react-native-gesture-handler'
import Animated,{useAnimatedGestureHandler,useAnimatedStyle,useSharedValue,withSpring} from 'react-native-reanimated'

const PermintaanService = ({navigation}) => {
  const dimensions = useWindowDimensions()
  const springConfig ={
    damping:80,
    overshootClamping:true,
    restDisplacementThreshold:0.1,
    stiffness:500
  }

  const top = useSharedValue(dimensions.height)

  const bottomSheetStyle = useAnimatedStyle(()=>{
    return{
      top:withSpring(top.value,springConfig)
    }
  })

  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, context){
      context.startTop = top.value
    },
    onActive(event,context){
      top.value = context.startTop + event.translationY
    },
    onEnd(){
      if (top.value > dimensions.height / 2 + 200 ) {
        top.value = dimensions.height
      } else{
        top.value = dimensions.height
      }
    }
  })

  const back=()=>{
    top.value = withSpring(dimensions.height / 1,springConfig)
    navigation.navigate("HomeScreen")
  }

  return (
    <View style={styles.container}>
      <Gap height={24}/>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.bottomSheet,bottomSheetStyle,{backgroundColor:"#fff",shadowColor:"#000000"}]}>
          <Text style={{color:"#000",fontFamily:"Nunito-Bold",height:50,width:"100%",fontSize:18}}>Perlu ganti oli dan canvas rem motor matic</Text>
          <Gap height={20}/>
          <View style={{borderStyle:'dotted',borderColor:"rgba(0,0,0,0.4)",borderWidth:2}}/>
          <Gap height={70}/>
          <View style={{width:"100%",flexDirection:'row',alignItems:'center',justifyContent:'space-between',alignContent:'center',paddingHorizontal:40}}>
            <Button style={styles.button} name='Terima' size = {18} color ='#A8AA3B' fam="Nunito-Bold"/>
            <Button style={styles.button} name='Tolak' size = {18} color ='#FF0000' fam="Nunito-Bold"/>
          </View>
        </Animated.View>
      </PanGestureHandler>
      <View style={styles.header}>
          {/* Header */}
        <ArrowLeft width={14} height={13} onPress={back}/>
      </View>
      <Gap height={32}/>
      <View>
        <Text style={styles.textCaption}>Permintaan Service</Text>
      </View>
      <TouchableOpacity onPress={()=>top.value = withSpring(dimensions.height / 1.4,springConfig)}>
        <View style={{flexDirection:'row'}}>
          <Image
              source={require('../../assets/images/fotoprofil.jpg')} //Change your icon image here
              style={styles.ImageStyle}
             />
          <Gap width={23}/>
          <View style={{flexDirection:'column', justifyContent:'center'}}>
            <Text style={{fontSize:18, fontFamily:'Nunito', fontWeight:'700', color:'black'}}>Yoel Roring</Text>
            <Text style={{fontSize:18, fontFamily:'Nunito', fontWeight:'700', color:'#BCB6B6'}}>Malalayang Satu</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default PermintaanService

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:15
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
