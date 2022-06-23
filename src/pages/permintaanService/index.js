import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import {ArrowLeft} from '../../assets/'
import { Gap } from '../../components'

const PermintaanService = () => {
  return (
    <View style={styles.container}>
    <Gap height={24}/>
        <View style={styles.header}>
            {/* Header */}
            <ArrowLeft/>        
        </View>
        <Gap height={32}/>
        <View>
          <Text style={styles.textCaption}>Permintaan Service</Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <View>
            <Image
                source={require('../../assets/images/fotoprofil.jpg')} //Change your icon image here
                style={styles.ImageStyle}
               />
            </View>
            <Gap width={23}/>
            <View style={{flexDirection:'column', justifyContent:'center'}}>
                <View>
                    <Text style={{fontSize:18, fontFamily:'Nunito', fontWeight:'700', color:'black'}}>Yoel Roring</Text>
                </View>
                <View>
                    <Text style={{fontSize:18, fontFamily:'Nunito', fontWeight:'700', color:'#BCB6B6'}}>Malalayang Satu</Text>
                </View>
            </View>
        </View>
    </View>
  )
}

export default PermintaanService

const styles = StyleSheet.create({
    container:{
        marginLeft: 15
    },
    header:{

    },
    textCaption:{
        fontFamily:'Nunito',
        fontWeight:'700',
        fontSize: 36,
        color:'#000000',
        letterSpacing: 0.4
    }, 
    ImageStyle: {
        padding: 10,
        // marginTop: 40,
        // marginBottom: 35,
        height: 87,
        width: 87,
        borderRadius:43.5,
        resizeMode: 'stretch',
        alignItems: 'center',
    }
})