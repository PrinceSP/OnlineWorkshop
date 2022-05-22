import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import {Gap} from '../../components'
import AntDesign from 'react-native-vector-icons/AntDesign'

const ProfileCustomer = () => {
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
          <View style={styles.headerBackButton}>
              <AntDesign name ="arrowleft" size={30} color='black'/>
          </View>
          <View style={styles.headerTitleContainer}> 
                <Text style={styles.headerTitleText}>Profil</Text>
          </View>
          <Gap height={20}/>
      </View>
      
        <View style={styles.containerImage}>
          <Image
            source={require('../../assets/images/fotoprofil.jpg')} //Change your icon image here
              style={styles.ImageStyle}
        />
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
      <View style={[styles.cardContainer]}>
          <Text style={styles.titleText}>Password</Text>
        <View style={styles.card}>
            <Text>*************</Text>    
        </View>
      </View>
      <Gap height={9}/>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginRight: 19 }}>
          <View>
            <Text >Atur ulang kata sandi</Text>    
          </View>
      </View>
      
    </View>
  )
}

export default ProfileCustomer

const styles = StyleSheet.create({
  container:{
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
    marginBottom: 14
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