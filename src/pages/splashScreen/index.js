import React,{useEffect} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import { ManWithCarRepair,ManWithMotoRepair,Logo } from '../../assets';
import {Input,Gap,Button} from '../../components'

const SplashScreen = ({navigation}) => {
  return(
    <View style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:"center",width:"100%"}}>
        <Logo height={70} width={70}/>
        <Text style={{color:'#000000',fontSize:24,fontFamily:"Nunito-Bold",marginLeft:15}}>Auto OnServ</Text>
      </View>
      <View style={styles.illustrationContainer}>
        <ManWithCarRepair height={250}/>
        <ManWithMotoRepair height={250}/>
      </View>
      <Button name='Mulai' color='#fff' fam='Nunito-Bold' size={24} style={styles.btnSubmit} onPress={()=>navigation.navigate("LoginOptions")}/>
    </View>
  )
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff',
    paddingHorizontal:20
  },
  illustrationContainer:{
    padding:0,
    margin:0,
    height:480,
    marginBottom:20,
    alignItems:'center'
  },
  btnSubmit:{
    backgroundColor:"#5E6B73",
    height:50,
    width:120,
    borderRadius:35,
    elevation:10,
    alignItems:'center',
    justifyContent:'center',
  }
})

export default SplashScreen
