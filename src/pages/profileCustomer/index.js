import React,{useState,useContext} from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import {Gap} from '../../components'
import { ArrowLeft,Camera } from '../../assets'
import {AuthContext} from '../../config/authContext'
import {launchImageLibrary} from 'react-native-image-picker'
import firestore from '@react-native-firebase/firestore'

const ProfileCustomer = ({navigation}) => {
  const {user:currentUser} = useContext(AuthContext)
  // console.log(currentUser);
  const userId = currentUser[0].ref._documentPath._parts[1]
  // console.log(userId);
  const [photo,setPhoto] = useState('')
  const [hasPhoto, setHasPhoto] = useState(false)
  const [photoBase64,setPhotoBase64] = useState('')

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
            <Text style={styles.textCard}>{currentUser[0].fullname}</Text>
        </View>
      </View>
      <Gap height={28}/>
      <View style={styles.cardContainer}>
        <Text style={styles.titleText}>Email</Text>
        <View style={styles.card}>
          <Text style={styles.textCard}>{currentUser[0].email}</Text>
        </View>
      </View>
      <Gap height={28}/>
      <View style={styles.cardContainer}>
        <Text style={styles.titleText}>Nomor HP</Text>
        <View style={styles.card}>
          <Text style={styles.textCard}>{currentUser[0].phoneNumber}</Text>
        </View>
      </View>
      <Gap height={28}/>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container:{
    backgroundColor: '#fff',
    flex:1
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
    height: 59,
    padding: 16
  },
  textCard:{
    fontSize: 18
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
  }
})
export default ProfileCustomer
