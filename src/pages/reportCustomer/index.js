import React from 'react'
import {Text,View,StyleSheet,TouchableOpacity,Image} from 'react-native'
import {ArrowLeft,MapPin,Edit} from '../../assets'
import {Gap,Input,Button} from '../../components'

const LaporKerusakkan = ({navigation}) => {
  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
      <Gap height={20}/>
      <ArrowLeft onPress={()=>navigation.navigate('HomepageCustomer')} style={{marginLeft:18}} onPress={()=>navigation.goBack()}/>
      <Gap height={28}/>
      <View style={{alignItems:'center'}}>
        <View>
          <View style={styles.line}/>
          <Text style={styles.title}>Bengkel Motorjaya, Malalayang</Text>
          <Image source={require('../../assets/images/fotoprofil.jpg')} style={styles.image}/>
          <Gap height={29}/>
          <TouchableOpacity style={styles.rowAlignment} onPress={()=>navigation.navigate("CustomerDrawer",{screen:"CustomerMap"})}>
            <MapPin/>
            <Text style={{color:"#000"}}>Tentukan Lokasimu</Text>
          </TouchableOpacity>
        </View>
        <Gap height={40}/>
        <View style={styles.rowAlignment}>
          <Text style={styles.reportTitle}>Tuliskan masalah pada kendaraanmu</Text>
          <Edit/>
        </View>
        <Input underlineColorAndroid="transparent"
        placeholderTextColor="#C0A8C2"
        numberOfLines={100}
        multiline={true}
        borderRadius={10}
        height={172}
        width={360}/>
      <Gap height={25}/>
      <Button style={styles.btnSubmit} name="Minta layanan" size={24} fam="Nunito-Bold" color="#fff"/>
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
  btnSubmit:{
    marginBottom:15,
    backgroundColor:'#5E6B73',
    height:66,
    width:360,
    borderRadius:15,
    alignItems:'center',
    justifyContent:'center',
  },
  rowAlignment:{
    flexDirection:"row",
    alignItems:'center'
  },
  title:{fontSize:24,fontFamily:"Nunito-Bold",color:"#000"},
  line:{height:2,width:"100%",backgroundColor:"#666"},
  reportTitle:{fontSize:18,fontFamily:"Nunito-Bold",color:"#000"},
  image:{height:188,width:360,borderRadius:15}
})

export default LaporKerusakkan
