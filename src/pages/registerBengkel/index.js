import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Gap } from '../../components'

const RegisterBengkel = () => {
  return (
    <View style={styles.container}>
        <View style={styles.containerHeader}>
            <View style={styles.arrowLeft}>
              <AntDesign name ="arrowleft" size={25} color='black'/>
            </View>
            <View>
                <Text style={styles.titleHeader}>Pendaftaran Bengkel</Text>
            </View>
        </View>
        <View style={{borderBottomColor: 'black',borderBottomWidth: 2, opacity: 0.2, marginVertical:12 }}/> 
        <View style={styles.instruction}>
            <View style={{flexDirection:'column'}}>
                <Text style={{fontSize: 24, fontWeight:'700', color:'black'}}>Selamat datang di pendaftaran bengkel</Text>
            </View>
            <Gap height={10}/>
            <View>
                <Text style={{fontSize:18}}>Ikuti langkah-langkah untuk daftar bengkel secara praktis</Text>
            </View>
        </View>
        <View style={{borderBottomColor: 'black',borderBottomWidth: 2, opacity: 0.2, marginVertical:12 }}/> 
        <View style={styles.content}>
            <View>
                <Text>Pilih jenis Bengkel</Text>    
            </View>
            <View style={styles.category}>
                    <Text>Bengkel Motor</Text>
                    <AntDesign name="right" size={20}/> 
            </View>
            <View style={styles.category}>
                <TouchableOpacity onPress={
                    alert('Bengkel Mobil')
                }>
                    <Text>Bengkel Motor</Text>
                    <AntDesign name="right" size={20}/>         
                </TouchableOpacity>
            </View>
            <View>

            </View>
        </View>
    </View>
  )
}

export default RegisterBengkel

const styles = StyleSheet.create({
    container: {
        flex: 1,  
    },
    containerHeader:{
        // backgroundColor: 'red',
        flexDirection: 'column',
        justifyContent: 'space-between',  
        marginLeft: 10,  
        marginRight: 20  
    },
    titleHeader:{
        fontSize: 36,
        color: 'black',
        fontWeight: '500'
    },
    content:{
        // flex: 0.5,
        height: '50%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        // backgroundColor: 'red',
        marginLeft: 36,
        fontSize: 18,
        fontWeight: '700'
    },
    category:{
        flexDirection: 'row',
        justifyContent:'space-around',
        // backgroundColor: 'white'
    },
    instruction:{
        marginHorizontal:10,
    }
})