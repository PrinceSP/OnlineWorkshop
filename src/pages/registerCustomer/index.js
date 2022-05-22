import React from 'react'
import {ImageBackground,View,Text,StyleSheet,Dimensions} from 'react-native'
import {Input,Gap,Button} from './src/components'

const Register = (props) => {
  return (
    <View style={styles.container}>
      <Input setLabel={true} label="Email" borderRadius={10} width={width/1.22}/>
      <Gap height={15}/>
      <Input setLabel={true} label="Password" borderRadius={10} width={width/1.22}/>
      <Gap height={15}/>
      <Input setLabel={true} label="Email" borderRadius={10} width={width/1.22}/>
      <Gap height={15}/>
      <Input setLabel={true} label="Password" borderRadius={10} width={width/1.22}/>
      <Gap height={15}/>
      <Input setLabel={true} label="Password" borderRadius={10} width={width/1.22}/>
      <Gap height={40}/>
      <Button name='Daftar' color='#000' fam='Nunito-Regular' size={20} style={styles.btnSubmit}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
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

export default Register
