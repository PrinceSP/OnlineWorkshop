import React,{useState} from 'react'
import { StyleSheet, Text, View, Image, TextInput, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native'
import {launchImageLibrary} from 'react-native-image-picker';
import { Button, Gap } from '../../components'
import firestore from '@react-native-firebase/firestore'
import Toast from 'react-native-toast-message'
import { ArrowLeft, MotoLogo } from '../../assets'

const RegisterBengkelMotor = ({navigation}) => {
  const [photo,setPhoto] = useState('')
  const [hasPhoto, setHasPhoto] = useState(false)
  const [photoBase64,setPhotoBase64] = useState('')
  const [userInfos,setUserInfos] = useState({
    namaBengkel:'',
    alamat:'',
    username:'',
    email:'',
    password:'',
    noHp:'',
  })
  const {namaBengkel,address,username,email,noHp,password} = userInfos
  const datas = {
    namaBengkel:namaBengkel,
    alamat:address,
    username:username,
    email:email,
    password:password,
    noHp:noHp,
    image:photoBase64,
    role:'bengkel',
    state:'Offline'
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
  const submit=()=>{
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
      // setUserInfos({...userInfos,namaBengkel:'',address:'',username:'',email:'',password:'',noHp:''})
      // setHasPhoto(false)
      // setPhoto('');
      // setPhotoBase64('');
      setTimeout(()=>{
        navigation.navigate('LoginBengkel')
      },3500)
    })
    .catch((e)=>{
      Toast.show({
        type: 'error',
        text1: 'Failed!',
        text2: 'account cannot be register!'
      });
      // setUserInfos({...userInfos,namaBengkel:'',address:'',username:'',email:'',password:'',noHp:''})
      // setHasPhoto(false)
      // setPhoto('');
      // setPhotoBase64('');
    })
    // .finally(()=>{
    //
    // })
    // console.log(datas);
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{backgroundColor:"#fff"}}>
        <View style={styles.containerHeader}>
         <Gap height={20}/>
         <ArrowLeft height={21} width={24} onPress={()=>navigation.goBack()}/>
         <Gap height={20}/>
         <Text style={styles.titleHeader}>Lengkapi Profil</Text>
        </View>
        <View style={{borderBottomColor: 'black',borderBottomWidth: 2, opacity: 0.2, marginVertical:12 }}/>
        <View style={styles.content}>
          <Text style={{fontWeight: 'bold', color:'black'}}>Jenis Bengkel yang dipilih</Text>
          <Gap height={20}/>
          <View  style={{flexDirection:'row',alignItems:'center'}}>
           <MotoLogo height={61} width={64}/>
           <Gap height={16}/>
          <Text style={{fontWeight: 'bold', color:'black',marginLeft:20}}>Bengkel Motor</Text>
          </View>
          <Gap height={16}/>
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
        </View>
        <Gap height={20}/>
        <ScrollView showsVerticalScrollIndicator={false} containerStyle={styles.scrollView}>
          <View style={styles.containerInput}>
            <Text style={styles.textTitle}>Nama Bengkel</Text>
            <TextInput style={styles.input} defaultValue={namaBengkel} onChangeText={(value)=>setUserInfos({...userInfos,namaBengkel:value})}/>
          </View>
          <Gap height={20}/>
          <View style={styles.containerInput}>
            <Text style={styles.textTitle}>Alamat</Text>
            <TextInput style={styles.input} defaultValue={address} onChangeText={(value)=>setUserInfos({...userInfos,address:value})}/>
          </View>
          <Gap height={20}/>
          <View style={styles.containerInput}>
            <Text style={styles.textTitle}>Nama Pengguna</Text>
            <TextInput style={styles.input} defaultValue={username} onChangeText={(value)=>setUserInfos({...userInfos,username:value})}/>
          </View>
          <Gap height={20}/>
          <View style={styles.containerInput}>
            <Text style={styles.textTitle}>Email</Text>
            <TextInput style={styles.input} defaultValue={email} onChangeText={(value)=>setUserInfos({...userInfos,email:value})}/>
          </View>
          <Gap height={20}/>
          <View style={styles.containerInput}>
            <Text style={styles.textTitle}>Nomor HP</Text>
            <TextInput style={styles.input} defaultValue={noHp} onChangeText={(value)=>setUserInfos({...userInfos,noHp:value})}/>
          </View>
          <Gap height={20}/>
          <View style={styles.containerInput}>
            <Text style={styles.textTitle}>Password</Text>
            <TextInput style={styles.input} defaultValue={password} onChangeText={(value)=>setUserInfos({...userInfos,password:value})}/>
          </View>
          <Gap height={20}/>
          <Button style={styles.button} name='Lanjut' size = {24} weight = 'bold' color ='white' onPress={submit}/>
        </ScrollView>
        <Gap height={20}/>
        <Toast autoHide={true} visibilityTime={2000} position="bottom"/>
    </ScrollView>
  )
}

export default RegisterBengkelMotor

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
  },
  containerHeader:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 20
  },
  textTitle:{
    fontWeight:'500',
    marginBottom:10,
    color: 'black'
  },
  titleHeader:{
    fontSize: 36,
    color: 'black',
    fontWeight: '500'
  },
  content:{
    flexDirection: 'column',
    marginLeft: 12,
    fontSize: 18,
    fontWeight: '700',
  },
  containerImage:{
    alignItems:'center',
    justifyContent:'center'
  },
  ImageStyle: {
    padding: 10,
    marginTop: 40,
    marginBottom: 35,
    height: 87,
    width: 87,
    borderRadius:43.5,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  input:{
    borderWidth:1,
    borderColor: '#020202',
    borderRadius: 8,
    paddingLeft: 10,
    paddingHorizontal: 10
  },
  containerInput:{
    marginHorizontal: 16
  },
  button:{
    marginHorizontal: 10,
    height: 50,
    backgroundColor: '#5E6B73',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  addPhoto: {
    height: 90,
    width: 90,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 90,
  },
  avatar: {
    height: 90,
    width: 90,
    borderRadius: 90,
  },
  addPhotoText: {
    fontSize: 12,
    fontFamily: 'Inter',
    maxWidth: 40,
    textAlign: 'center',
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
})
