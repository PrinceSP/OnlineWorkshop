import React, {useState,useContext} from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { ArrowLeft, Edit, SuccessIcon } from '../../assets';
import { Button, Gap, ModalSuccess } from '../../components';
import firestore from '@react-native-firebase/firestore'
import {AuthContext} from '../../config/authContext'

const BengkelMelaporCustomer = ({navigation}) => {
  const [visible,setVisible] = useState(false)
  const [feedback,setFeedback] = useState('')
  const {user:currentUser} = useContext(AuthContext)

  const submit = ()=>{
    firestore().collection('feedback')
    .add({
      feedback:feedback,
      owner:currentUser._data
    })
    .then(() => {
      console.log('User added!');
      setFeedback('')
      setVisible(true)
    });
  }
  return (
    <View style={{flex: 1}}>
      <ModalSuccess visible={visible}>
        <View style={styles.modalContainer}>
          <Text onPress={()=>setVisible(false)} style={{fontSize:28,position:'absolute',right:30,top:24,color:'#000'}}>X</Text>
          <SuccessIcon height={120} width={120}/>
          <View style={[styles.headingWrapper,{marginTop:21}]}>
            <Text style={[{color:'#823589'},styles.headingText]}>Terima kasih,</Text>
            <Text style={[{color:'#718496',marginLeft:4},styles.headingText]}>Yoel Roring!</Text>
          </View>
          <Text style={styles.comment}>Laporan anda akan segera kami tangani</Text>
          <View style={[styles.headingWrapper,{marginTop:50}]}>
            <Text style={{fontSize:15,fontFamily:'Poppins-SemiBold',color:'#C0A8C2'}}>Butuh bantuan?</Text>
            <Text style={{color:'#E550F2',marginLeft:4,fontSize:15,fontFamily:'Poppins-SemiBold'}}>Hubungi kami!</Text>
          </View>
        </View>
      </ModalSuccess>
      <View style={styles.header}>
        <View style={styles.headerBackButton}>
          <ArrowLeft height={20} width={18} onPress={()=>navigation.navigate("HistoryPemesanan")}/>
        </View>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitleText}>Lapor</Text>
        </View>
      </View>
      <Gap height={17}/>
      <View style={{borderBottomColor: 'black',borderBottomWidth: 2, opacity: 0.2}}/>
      <Gap height={23}/>
      <View style={styles.content}>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontFamily:'Nunito', fontWeight:'700', fontSize: 18, color: 'black'}}>Laporkan jika ada masalah</Text>
          <Gap width={7}/>
          <Edit width={20}/>
        </View>
        <TextInput style={styles.textInputStyle} underlineColorAndroid="transparent"
          placeholderTextColor="#C0A8C2"
          numberOfLines={10}
          multiline={true}
          defaultValue={feedback}
          onChangeText={value=>setFeedback(value)}/>
        <Gap height={200}/>
        <Button style={styles.button} name='Kirim' size = {24} weight = 'bold' color ='white' onPress={submit}/>
      </View>
    </View>
  )
}

export default BengkelMelaporCustomer;

const styles = StyleSheet.create({

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
    color:'black',
    fontFamily:'Nunito',
    fontSize: 36
  },
  textInputStyle:{
    textAlignVertical:'top',
    borderWidth: 2,
    borderColor:'black',
    height: 132,
    width: '100%',
    borderRadius: 10,
    paddingHorizontal:10
  },
  content:{
    marginHorizontal: 15,
    flexDirection:'column',
    justifyContent: 'space-between',
  },
  button:{
    height: 50,
    backgroundColor: '#5E6B73',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  modalContainer:{
    backgroundColor:"#fff",
    minHeight:405,
    minWidth:329,
    borderRadius:20,
    alignItems:'center',
    paddingVertical:64
  },
  headingWrapper:{flexDirection:'row'},
  headingText:{fontSize:19,fontFamily:'Poppins-SemiBold'},
  modalBg:{
    flex:1,
    backgroundColor:'rgba(0, 0, 0, 0.43)',
    alignItems:'center',
    justifyContent:'center'
  },
  comment:{textAlign:'center',width:230,marginTop:5,color:'#999',fontSize:17},
})
