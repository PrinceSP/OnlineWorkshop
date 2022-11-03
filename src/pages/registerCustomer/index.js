import React, {useState} from 'react'
import {ImageBackground,View,Text,StyleSheet,Dimensions,TouchableOpacity,ScrollView,Image} from 'react-native'
import {Input,Gap,Button} from '../../components'
import {Camera,ArrowLeft} from '../../assets'
import {launchImageLibrary} from 'react-native-image-picker'
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import {isValidObjField,updateError,isValidEmail} from '../../config/validator'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Register = ({navigation}) => {
  const [photo,setPhoto] = useState('')
  const [hasPhoto, setHasPhoto] = useState(false)
  const [photoBase64,setPhotoBase64] = useState('')
  const [message,setMessage] = useState("")
  const [userInfo,setUserInfo] = useState({
    username:'',
    fullname:'',
    email:'',
    phoneNumber:'',
    password:'',
  })
  const {username,fullname,email,phoneNumber,password} = userInfo
  const datas = {username,fullname,email,phoneNumber,password,role:"customer",image:photoBase64}

  const validation = ()=>{
    if(!isValidObjField(userInfo))
      return updateError("Fields can't be empty",setMessage)
    if(!isValidEmail(email))
      return updateError("Email address must contains '@'",setMessage)
    if(email.length < 8)
      return updateError("Email length must be 8 or more characters")
    if(!password.trim() || password.length < 6 )
      return updateError("Password must have min 6 characters",setMessage)

    return true
  }

  const submit =()=>{
    if (validation()) {
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
      <View style={styles.containerImage}>
        <View style={styles.border}>
          <TouchableOpacity onPress={imageGallery} activeOpacity={0.5}>
              {!hasPhoto && (
                  <View style={styles.addPhoto}>
                  <Text style={styles.addPhotoText}>Add Photo</Text>
              </View>
          )}
              {hasPhoto && (
                  <Image source={{uri: photo}} style={styles.avatar} />
          )}
          </TouchableOpacity>
        </View>
      </View>
      {message ? <Text style={{color:'#000'}}>{message}</Text> : null}
      <Input setLabel={true} label="fullname" borderRadius={10} width={windowWidth/1.22} defaultValue={username} onChangeText={(value)=>setUserInfo({...userInfo,username:value})}/>
      <Gap height={25}/>
      <Input setLabel={true} label="Username" borderRadius={10} width={windowWidth/1.22} defaultValue={fullname} onChangeText={(value)=>setUserInfo({...userInfo,fullname:value})}/>
      <Gap height={25}/>
      <Input setLabel={true} label="Email" borderRadius={10} width={windowWidth/1.22} defaultValue={email} onChangeText={(value)=>setUserInfo({...userInfo,email:value})}/>
      <Gap height={25}/>
      <Input setLabel={true} label="Phone Number" borderRadius={10} width={windowWidth/1.22} defaultValue={phoneNumber} onChangeText={(value)=>setUserInfo({...userInfo,phoneNumber:value})}/>
      <Gap height={25}/>
      <Input setLabel={true} secureTextEntry={true} label="Password" borderRadius={10} width={windowWidth/1.22} defaultValue={password} onChangeText={(value)=>setUserInfo({...userInfo,password:value})}/>
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
  },
  containerImage:{
    alignItems:'center',
    justifyContent:'center'
  },
  border: {
    borderWidth: 1,
    borderColor: '8D92A3',
    width: 110,
    height: 110,
    borderRadius: 110,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
  },
  avatar: {
    height: 90,
    width: 90,
    borderRadius: 90,
  },
  addPhoto: {
    height: 90,
    width: 90,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 90,
  },
  addPhotoText: {
    fontSize: 12,
    fontFamily: 'Inter',
    maxWidth: 40,
    textAlign: 'center',
  },
})

export default Register
