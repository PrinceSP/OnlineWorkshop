import React, {useState} from 'react'
import {ImageBackground,View,Text,StyleSheet,Dimensions,TouchableOpacity,ScrollView} from 'react-native'
import {Input,Gap,Button} from '../../components'
import {Camera,ArrowLeft} from '../../assets'
import {launchImageLibrary} from 'react-native-image-picker'
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Register = ({navigation}) => {
  const [photo,setPhoto] = useState('')
  const [hasPhoto, setHasPhoto] = useState(false)
  const [photoBase64,setPhotoBase64] = useState('')
  const [userInfo,setUserInfo] = useState({
    username:'',
    fullname:'',
    email:'',
    phoneNumber:'',
    password:'',
  })
  const {username,fullname,email,phoneNumber,password} = userInfo
  const datas = {username,fullname,email,phoneNumber,password,role:"customer"}

  const submit =()=>{
    firestore()
    .collection('users')
    .add(datas)
    .then(() => {
      console.log('User added!');
      Toast.show({
        type: 'success',
        text1: 'User added!',
        text2: 'account has been registered 👋'
      });
    })
    .catch((e)=>{
      Toast.show({
        type: 'error',
        text1: 'Failed!',
        text2: 'account cannot be register!'
      });
    })
    .finally(()=>{
      setUserInfo({...userInfo,username:'',fullname:'',email:'',phoneNumber:'',password:''})
      setTimeout(()=>{
        navigation.navigate('LoginOptions')
      },3500)
    })

  }

  const imageGallery = ()=>{
    const options={
      maxHeight:400,
      maxWidth:400,
      includeBase64:true,
    }
    launchImageLibrary(options,res=>{
      if(res.didCancel){
        setHasPhoto(false)
        setPhoto('');
        setPhotoBase64('');
      }else{
        setPhoto(res.assets[0].uri);
        setPhotoBase64(res.assets[0].base64);
        setHasPhoto(true);
      }
    })
  }

  return (
    <ScrollView keyboardShouldPersistTaps="never" contentContainerStyle={styles.container}>
      <Gap height={60}/>
      <TouchableOpacity onPress={imageGallery} style={{height:80,width:80,borderRadius:50,borderWidth:2,borderColor:"#000",alignItems:"center",justifyContent:"center"}}>
        <Camera/>
      </TouchableOpacity>
      <Input setLabel={true} label="fullname" borderRadius={10} width={windowWidth/1.22} defaultValue={username} onChangeText={(value)=>setUserInfo({...userInfo,username:value})}/>
      <Gap height={25}/>
      <Input setLabel={true} label="Username" borderRadius={10} width={windowWidth/1.22} defaultValue={fullname} onChangeText={(value)=>setUserInfo({...userInfo,fullname:value})}/>
      <Gap height={25}/>
      <Input setLabel={true} label="Email" borderRadius={10} width={windowWidth/1.22} defaultValue={email} onChangeText={(value)=>setUserInfo({...userInfo,email:value})}/>
      <Gap height={25}/>
      <Input setLabel={true} label="Phone Number" borderRadius={10} width={windowWidth/1.22} defaultValue={phoneNumber} onChangeText={(value)=>setUserInfo({...userInfo,phoneNumber:value})}/>
      <Gap height={25}/>
      <Input setLabel={true} label="Password" borderRadius={10} width={windowWidth/1.22} defaultValue={password} onChangeText={(value)=>setUserInfo({...userInfo,password:value})}/>
      <Gap height={25}/>
      <Button name='Daftar' color='#000' fam='Nunito-Regular' size={20} style={styles.btnSubmit} onPress={submit}/>
      <Toast autoHide={true} visibilityTime={2000}/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    paddingBottom:30
  },
  btnSubmit:{
    marginBottom:15,
    marginLeft:220,
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
