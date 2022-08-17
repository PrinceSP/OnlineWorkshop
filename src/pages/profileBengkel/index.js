import { StyleSheet, Text, View, Image,ScrollView } from 'react-native'
import React from 'react'
import {Gap} from '../../components'
import { ArrowLeft, CarLogo } from '../../assets'
import {Header} from '../../components'

const ProfileBengkel = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* header */}
      <Header name="Profil" navigation={navigation}/>
      <ScrollView contentContainerStyle={{paddingBottom:20}}>
        <View style={{borderBottomColor: 'black',borderBottomWidth: 1, opacity: 0.2, marginBottom: 12 }}/>
        <Text style={{color: 'black', fontWeight:'bold'}}>Jenis Bengkel yang dipilih:</Text>
        <View style={styles.containerImage}>
          <Image
            source={require('../../assets/images/fotoprofilbengkel.png')}
            style={styles.ImageStyle}
          />
         </View>
          <View style={styles.cardContainer}>
              <Text style={styles.titleText}>Nama Bengkel</Text>
            <View style={styles.card}>
              <Text style={styles.textCard}>Bengkel Motorjaya</Text>
            </View>
          </View>
          <Gap height={20}/>
          <View style={styles.cardContainer}>
              <Text style={styles.titleText}>Alamat</Text>
            <View style={styles.card}>
                <Text style={styles.textCard}>motorjaya@gmail.com</Text>
            </View>
          </View>
          <Gap height={20}/>
          <View style={styles.cardContainer}>
              <Text style={styles.titleText}>Nomor HP</Text>
            <View style={styles.card}>
              <Text style={styles.textCard}>+6281317743660</Text>
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
    color:"#000"
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
  }

})
export default ProfileBengkel
