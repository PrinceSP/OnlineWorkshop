import React from 'react'
import {View,StyleSheet,Text} from 'react-native'
import {Button,Gap} from '../../components'
import {LoginIllustration,Logo} from '../../assets'

const LoginOptions = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{alignItems:'center'}}>
        <Logo/>
        <Text style={{fontSize:25,color:"#000",fontWeight:'700'}}>Auto OnServ</Text>
      </View>
      <LoginIllustration/>
      <Gap height={20}/>
      <Button name='Customer' color='#fff' size={20} fam='Nunito-Bold' style={styles.btnSubmit} onPress={()=>navigation.navigate('LoginCustomer')}/>
      <Button name='Bengkel' color='#fff' size={20} fam='Nunito-Bold' style={styles.btnSubmit} onPress={()=>navigation.navigate('LoginBengkel')}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#fff",
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  btnSubmit:{
    backgroundColor:"#5E6B73",
    marginBottom:15,
    height:50,
    width:110,
    elevation:10,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
  },
})

export default LoginOptions
