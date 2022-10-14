import React, {useContext} from 'react'
import { StyleSheet, Text, View, Image,ScrollView } from 'react-native'
import {Gap} from '../../components'
import { ArrowLeft, CarLogo,AvatarProfile } from '../../assets'
import {Header} from '../../components'
import {AuthContext} from '../../config/authContext'


const ProfileBengkel = ({navigation}) => {
  const {user:currentUser} = useContext(AuthContext)
  // console.log(currentUser?._nativeData?.doc.data.namaBengkel[1]);

  return (
    <View style={styles.container}>
      {/* header */}
      <Header name="Profil" navigation={navigation} btn="bengkel"/>
      <Gap height={60}/>
      <ScrollView contentContainerStyle={{paddingBottom:20,alignItems:'center'}}>
        <View style={{borderBottomColor: 'black',borderBottomWidth: 1, opacity: 0.2, marginBottom: 12 }}/>
          {currentUser?._nativeData?.doc.data?.image[1] ? <Image style={styles.image} source={{uri:`data:image/png;base64,${currentUser._nativeData.doc.data.image[1]}`}}/>
        :<View style={[styles.image,{backgroundColor:'#e8e8e8',alignItems:'center',justifyContent:'center'}]}><AvatarProfile height={40} width={40}/></View>}
        <Gap height={50}/>

          <View style={styles.cardContainer}>
              <Text style={styles.titleText}>Nama bengkel</Text>
            <View style={styles.card}>
              <Text style={styles.textCard}>{currentUser?._nativeData?.doc.data.namaBengkel[1]}</Text>
            </View>
          </View>
          <Gap height={20}/>
          <View style={styles.cardContainer}>
              <Text style={styles.titleText}>Alamat</Text>
            <View style={styles.card}>
                <Text style={styles.textCard}>{currentUser?._nativeData?.doc.data.email[1]}</Text>
            </View>
          </View>
          <Gap height={20}/>
          <View style={styles.cardContainer}>
              <Text style={styles.titleText}>Nomor HP</Text>
            <View style={styles.card}>
              <Text style={styles.textCard}>+62{`${currentUser._nativeData.doc.data.noHp[1]}`}</Text>
            </View>
          </View>
        </ScrollView>
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
    padding: 16
  },
  textCard:{
    fontSize: 18,
    color:"#000",
    width:"100%"
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

})
export default ProfileBengkel
