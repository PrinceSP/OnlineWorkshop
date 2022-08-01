import React from 'react'
import {ImageBackground,View,Text,StyleSheet,Dimensions} from 'react-native'
import {LoginBackground,Logo} from '../../assets'
import {Input,Gap,Button} from '../../components'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const LoginCustomer = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={LoginBackground} resizeMode="cover" style={styles.image}>
        <View style={styles.blurBackground}>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:"center"}}>
            <Logo height={70} width={70}/>
            <Text style={{color:'#000000',fontSize:24,fontFamily:"Nunito-Bold",marginLeft:15}}>Customer</Text>
          </View>
          <Text style={styles.title}>Masuk</Text>
          <Input setLabel={true} label="Email" borderRadius={10} width={width/1.22}/>
          <Gap height={40}/>
          <Input setLabel={true} label="Password" borderRadius={10} width={width/1.22}/>
          <Gap height={15}/>
          <Button name='Lupa password?' color='#000' fam='Nunito-Bold'/>
          <Gap height={60}/>
          <View style={styles.btnContainer}>
            <View>
              <Text style={{color:'#777'}}>Pengguna baru?</Text>
              <Button name='Daftar' color='#000' fam='Nunito-Bold' onPress={()=>navigation.navigate('Register')}/>
            </View>
            <Button name='Masuk' color='#000' fam='Nunito-Regular' size={20} style={styles.btnSubmit}/>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
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
  title:{
    fontFamily:'Nunito-Bold',
    fontSize:36,
    color:'#000',
    marginTop:30,
    marginBottom:30
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
  },
  btnContainer:{
    flexDirection:'row',
    justifyContent:'space-between'
  }
})

export default LoginCustomer
