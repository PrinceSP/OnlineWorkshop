import React,{useState,useContext} from 'react'
import { StyleSheet, TextInput,Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import {Gap,Button} from '../../components'
import { ArrowLeft,Camera } from '../../assets'
import {AuthContext} from '../../config/authContext'
import {launchImageLibrary} from 'react-native-image-picker'
import firestore from '@react-native-firebase/firestore'

const ProfileCustomer = ({navigation}) => {
  const {user:currentUser} = useContext(AuthContext)
  // console.log(currentUser[0]._data.email);
  const userId = currentUser[0].ref._documentPath._parts[1]
  // console.log(userId);
  const [photo,setPhoto] = useState('')
  const [hasPhoto, setHasPhoto] = useState(false)
  const [photoBase64,setPhotoBase64] = useState('')
  const [userInfos,setInfos] = useState({
    fullname:currentUser[0]._data.fullname,
    phoneNumber:currentUser[0]._data.phoneNumber,
    email:currentUser[0]._data.email
  })
  // console.log(userInfos.fullname,userInfos.phoneNumber,userInfos.email);
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
        firestore().collection('users').doc(userId)
        .update({image:res.assets[0].base64})
        .then(() => {
          console.log('User updated!');
        });
      }
    })
  }

  const updateBio = ()=>{
    firestore()
    .collection('users')
    .doc(userId)
    .update({
      fullname:userInfos.fullname,
      email: userInfos.email,
      phoneNumber: userInfos.phoneNumber
    }).then(() => {
      console.log('User updated!');
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
       <View style={styles.headerBackButton}>
        <ArrowLeft height={14} onPress={()=>navigation.goBack()}/>
       </View>
       <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitleText}>Profil</Text>
       </View>
       <Gap height={20}/>
      </View>

      {!hasPhoto && currentUser[0]._data.image === "" &&
        <View style={styles.addPhoto}>
         <Text style={styles.addPhotoText}>Add Photo</Text>
         <Camera width={30} style={{position:'absolute',bottom:0,right:-6}} onPress={imageGallery}/>
        </View>
      }
        {currentUser[0]._data.image !== "" &&
          <View style={[styles.containerImage]}>
           <Image source={{uri:`data:image/png;base64,${photoBase64 || currentUser[0]._data.image}`}} style={styles.ImageStyle}/>
           <Camera width={30} style={{position:'absolute',bottom:26,right:155}} onPress={imageGallery}/>
          </View>
      }
      <View style={styles.cardContainer}>
          <Text style={styles.titleText}>Nama Lengkap</Text>
        <View style={styles.card}>
          <TextInput style={styles.textCard} defaultValue={currentUser[0]._data.fullname} onChangeText={(event)=>setInfos({...userInfos,fullname:event})}/>
        </View>
      </View>
      <Gap height={28}/>
      <View style={styles.cardContainer}>
        <Text style={styles.titleText}>Email</Text>
        <View style={styles.card}>
        <TextInput style={styles.textCard} defaultValue={currentUser[0]._data.email} onChangeText={(event)=>setInfos({...userInfos,email:event})}/>
        </View>
      </View>
      <Gap height={28}/>
      <View style={styles.cardContainer}>
        <Text style={styles.titleText}>Nomor HP</Text>
        <View style={styles.card}>
        <TextInput style={styles.textCard} defaultValue={currentUser[0]._data.phoneNumber} onChangeText={(event)=>setInfos({...userInfos,phoneNumber:event})}/>
        </View>
      </View>
      <Gap height={58}/>
      {
        (userInfos.fullname != currentUser[0]._data.fullname || userInfos.email != currentUser[0]._data.email || userInfos.phoneNumber != currentUser[0]._data.phoneNumber)
        ? <Button name='Perbarui Profil' color='#fff' fam='Nunito-SemiBold' size={20} style={styles.btnSubmit} onPress={updateBio}/> : null
      }
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container:{
    backgroundColor: '#fff',
    flex:1,
  },
  header:{
    flexDirection: 'row',
  },
  headerBackButton:{
    justifyContent:'center',
    marginLeft: 20,
  },
  headerTitleContainer:{
    marginHorizontal: 120
  },
  headerTitleText:{
    fontSize: 36,
    color:'black'
  },
  cardContainer:{
    marginLeft:19,
    marginRight: 19,
  },
  titleText:{
    fontSize: 14,
    marginBottom: 14,
    color:"#000"
  },
  card:{
    borderWidth:2,
    borderRadius: 14,
    borderColor: 'black',
    height: 60,
    padding: 16,
    justifyContent:'center'
  },
  textCard:{
    fontSize: 18,
    color:"#000",
    width:"100%",
    height:40
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
  btnSubmit:{
    backgroundColor:"#5E6B73",
    marginBottom:15,
    height:60,
    width:200,
    borderStyle:'solid',
    borderWidth:1,
    borderColor:'#6F9C99',
    borderRadius:7,
    alignItems:'center',
    justifyContent:'center',
    left:"24%"
  },
})
export default ProfileCustomer
