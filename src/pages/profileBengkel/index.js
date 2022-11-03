import React, {useContext,useState} from 'react'
import { StyleSheet, Text, View, Image,ScrollView,TextInput } from 'react-native'
import {Gap} from '../../components'
import { ArrowLeft, CarLogo,AvatarProfile } from '../../assets'
import {Header,Button} from '../../components'
import {AuthContext} from '../../config/authContext'
import {launchImageLibrary} from 'react-native-image-picker'
import firestore from '@react-native-firebase/firestore'

const ProfileBengkel = ({navigation}) => {
  const {user:currentUser} = useContext(AuthContext)
  const docId = currentUser._nativeData.doc.path.split('/')
  const [photo,setPhoto] = useState('')
  const [hasPhoto, setHasPhoto] = useState(false)
  const [photoBase64,setPhotoBase64] = useState('')
  const [userInfos,setInfos] = useState({
    fullname:currentUser._nativeData.doc.data.namaBengkel[1],
    email:currentUser._nativeData.doc.data.alamat[1],
    phoneNumber:currentUser._nativeData.doc.data.noHp[1],
  })
  // console.log(docId[1]);
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
        firestore().collection('users').doc(docId[1])
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
    .doc(docId[1])
    .update({
      fullname:userInfos.fullname,
      email: userInfos.email,
      phoneNumber: userInfos.phoneNumber
    }).then(() => {
      console.log('User updated!');
    });
  }
  console.log(currentUser._nativeData.doc.data);
  return (
    <View style={styles.container}>
      {/* header */}
      <Header name="Profil" navigation={navigation} btn="bengkel"/>
      <Gap height={60}/>
      <ScrollView contentContainerStyle={{paddingBottom:20,alignItems:'center'}}>
        <View style={{borderBottomColor: 'black',borderBottomWidth: 1, opacity: 0.2, marginBottom: 12 }}/>
          {currentUser?._nativeData?.doc.data?.image[1] ? <Image style={styles.image} source={{uri:`data:image/png;base64,${currentUser._nativeData.doc.data.image[1]}`}}/>
        :<View style={[styles.image,{backgroundColor:'#e8e8e8',alignItems:'center',justifyContent:'center'}]}><AvatarProfile height={40} width={40} onPress={imageGallery}/></View>}
        <Gap height={50}/>
          <View style={styles.cardContainer}>
            <Text style={styles.titleText}>Nama Bengkel</Text>
            <View style={styles.card}>
             <TextInput style={styles.textCard} defaultValue={currentUser._nativeData.doc.data.namaBengkel[1]} onChangeText={(event)=>setInfos({...userInfos,fullname:event})}/>
            </View>
          </View>
          <Gap height={20}/>
          <View style={styles.cardContainer}>
            <Text style={styles.titleText}>Email</Text>
            <View style={styles.card}>
             <TextInput style={styles.textCard} defaultValue={currentUser._nativeData.doc.data.alamat[1]} onChangeText={(event)=>setInfos({...userInfos,email:event})}/>
            </View>
          </View>
          <Gap height={20}/>
          <View style={styles.cardContainer}>
            <Text style={styles.titleText}>Nomor HP</Text>
            <View style={styles.card}>
             <TextInput style={styles.textCard} defaultValue={currentUser._nativeData.doc.data.noHp[1]} onChangeText={(event)=>setInfos({...userInfos,phoneNumber:event})}/>
            </View>
          </View>
        </ScrollView>
        {
          (userInfos.fullname != currentUser._nativeData.doc.data.namaBengkel[1] || userInfos.email != currentUser._nativeData.doc.data.alamat[1] || userInfos.phoneNumber != currentUser._nativeData.doc.data.noHp[1])
          ? <Button name='Perbarui Profil' color='#fff' fam='Nunito-SemiBold' size={20} style={styles.btnSubmit} onPress={updateBio}/> : null
        }
      </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'white'
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
    width:"80%"
  },
  titleText:{
    fontSize: 14,
    marginBottom: 14,
    color:"#444"
  },
  card:{
    borderWidth:2,
    borderRadius: 14,
    borderColor: 'black',
    height: 59,
    paddingVertical: 10,
    paddingHorizontal: 16,
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
  image:{
    width:90,
    height:90,
    borderRadius:35
  },
  btnSubmit:{
    backgroundColor:"#3d2c3f",
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
  }

})
export default ProfileBengkel
