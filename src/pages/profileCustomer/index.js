import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import {Gap} from '../../components'
import { ArrowLeft } from '../../assets'

const ProfileCustomer = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* header */}
      <View style={styles.header}>
          <View style={styles.headerBackButton}>
          <ArrowLeft height={13} widdth={14}/>
          </View>
          <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitleText}>Profil</Text>
          </View>
          <Gap height={20}/>
      </View>

        <View style={styles.containerImage}>
          <Image source={require('../../assets/images/fotoprofil.jpg')} style={styles.ImageStyle}/>
        </View>
      <View style={styles.cardContainer}>
          <Text style={styles.titleText}>Nama Lengkap</Text>
        <View style={styles.card}>
            <Text style={styles.textCard}>Yoel Roring</Text>
        </View>
      </View>
      <Gap height={28}/>
      <View style={styles.cardContainer}>
        <Text style={styles.titleText}>Email</Text>
        <View style={styles.card}>
          <Text style={styles.textCard}>roringy@gmail.com</Text>
        </View>
      </View>
      <Gap height={28}/>
      <View style={styles.cardContainer}>
        <Text style={styles.titleText}>Nomor HP</Text>
        <View style={styles.card}>
          <Text style={styles.textCard}>+6281317743660</Text>
        </View>
      </View>
      <Gap height={28}/>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container:{
    backgroundColor: '#fff'
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
}

})
export default ProfileCustomer
