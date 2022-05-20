import React from 'react'
import {ImageBackground,View,Text,StyleSheet,Dimensions} from 'react-native'
import {ManWithCarRepair,ManWithMotoRepair,Logo} from '../src/assets'
import {Input,Gap,Button} from '../src/components'

const SplashScreen = () => {
  return(
    <View style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:"center"}}>
        <Logo height={70} width={70}/>
        <Text style={{color:'#000000',fontSize:24,fontFamily:"Nunito-Bold",marginLeft:15}}>Auto OnServ</Text>
      </View>
      <ManWithCarRepair/>
      <ManWithMotoRepair/>
    </View>
  )
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff'
  },
  image:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  blurBackground:{
    width: width/1.12,
    height: height/1.15,
    backgroundColor: 'rgba(255, 252, 252, 0.82)',
    borderRadius:15,
    padding:15,
    position:'relative'
  },
  btnSubmit:{
    marginBottom:15,
    height:60,
    width:100,
    borderStyle:'solid',
    borderWidth:1,
    borderColor:'#000',
    borderRadius:7,
    alignItems:'center',
    justifyContent:'center',
  }
})

export default SplashScreen
