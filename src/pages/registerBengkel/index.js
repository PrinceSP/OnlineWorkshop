import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { ArrowLeft,CarLogo,MotoLogo,ArrowRight } from '../../assets'
import { Gap } from '../../components'

const RegisterBengkel = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Gap height={30}/>
        <ArrowLeft height={13} widdth={14}/>
        <Gap height={30}/>
        <View>
          <Text style={styles.titleHeader}>Pendaftaran Bengkel</Text>
        </View>
      </View>
      <View style={{borderBottomColor: 'black',borderBottomWidth: 2, opacity: 0.2, marginVertical:12 }}/>
      <View style={styles.instruction}>
        <View style={{flexDirection:'column'}}>
          <Text style={{fontSize: 20, fontWeight:'700', color:'black'}}>Selamat datang di pendaftaran bengkel</Text>
        </View>
        <Gap height={10}/>
        <View>
            <Text style={{fontSize:18,color:"#000",fontWeight:"300"}}>Ikuti langkah-langkah untuk daftar bengkel secara praktis</Text>
        </View>
      </View>
     <View style={{borderBottomColor: 'black',borderBottomWidth: 2, opacity: 0.2, marginVertical:12 }}/>
     <View style={styles.content}>
      <View>
        <Text style={{color:'#000',fontWeight:"700"}}>Pilih jenis Bengkel</Text>
      </View>
      <TouchableOpacity style={styles.category}>
        <CarLogo/>
        <Text style={{color:'#000',fontWeight:"700",fontSize:16}}>Bengkel Mobil</Text>
        <ArrowRight/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.category}>
        <MotoLogo/>
        <Text style={{color:'#000',fontWeight:"700",fontSize:16}}>Bengkel Motor</Text>
        <ArrowRight/>
      </TouchableOpacity>
     </View>
    </View>
  )
}

export default RegisterBengkel

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"#FFF"
    },
    containerHeader:{
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginLeft: 10,
      marginRight: 20
    },
    titleHeader:{
      fontSize: 36,
      color: '#000',
      fontWeight: '500'
    },
    content:{
      height: '50%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginLeft: 36,
      fontSize: 18,
      fontWeight: '700'
    },
    category:{
      width:280,
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'space-between',
    },
    instruction:{
      marginHorizontal:10,
    }
})
