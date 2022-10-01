import React,{useState} from 'react'
import {View,Text,TouchableOpacity,Image,StyleSheet,Modal} from 'react-native'
import {Gap,Button,Input} from '../../atoms'
import ModalSuccess from '../successModal'
import POVLocation from '../location'
import firestore from '@react-native-firebase/firestore'
import Toast from 'react-native-toast-message'

const RequestLists = ({desc='Online',navigation,id=[],locations,namaBengkel,address,image=""}) => {
  const [visible,setVisible] = useState(false)
  const [showMap,setShowMap] = useState(false)

    const confirm=async()=>{
      await firestore()
      .collection('reports')
      .doc(id[1])
      .update({
        status:'Pesanan di terima'
      })
      .then(()=>{
        Toast.show({
          type: 'success',
          text1: 'Yeay!',
          text2: 'Pesanan berhasil di terima👋'
        });
        // setVisible(false)
        setTimeout(()=>{
          setVisible(false)
          setShowMap(true)
        },3000)
      })

    }

    const close=async()=>{
      await firestore()
      .collection('reports')
      .doc(id[1])
      .update({
        status:'Permintaan di tolak!'
      })
      .then(()=>{
        Toast.show({
          type: 'success',
          text1: 'Yeay!',
          text2: 'Pesanan berhasil di tolak👋'
        });
        // setVisible(false)
        setTimeout(()=>setVisible(false),3000)
      })
    }

  return (
    <View style={{flex:1,width:'100%'}} key={id}>
      <ModalSuccess visible={visible}>
        <Toast autoHide={true} visibilityTime={2000}/>
        <View style={[styles.bottomSheet,{backgroundColor:"#fff",shadowColor:"#000000"}]}>
          <Text style={{color:"#000",fontFamily:"Nunito-Bold",height:50,width:"100%",fontSize:18}}>{desc}</Text>
          <Gap height={20}/>
          <View style={{borderStyle:'dotted',borderColor:"rgba(0,0,0,0.4)",borderWidth:2}}/>
          <Gap height={70}/>
          <View style={{width:"100%",flexDirection:'row',alignItems:'center',justifyContent:'space-between',alignContent:'center',paddingHorizontal:40}}>
            <Button style={styles.button} name='Terima' size = {18} color ='#A8AA3B' fam="Nunito-Bold" onPress={confirm}/>
            <Button style={styles.button} name='Tolak' size = {18} color ='#FF0000' fam="Nunito-Bold" onPress={close}/>
          </View>
        </View>
      </ModalSuccess>
      <Modal transparent visible={showMap}>
        <View style={{flex:1}}>
          <POVLocation onPress={()=>setShowMap(false)} datas={locations}/>
        </View>
      </Modal>
      <View style={{width:"100%",flexDirection:'row',paddingVertical:15,paddingHorizontal:5,justifyContent:"space-between"}}>
        {image==="" ? <View style={{width:80,height:82,backgroundColor:"#444",borderRadius:15}}/> : <Image style={{width:80,height:82,backgroundColor:"#444",borderRadius:15}} source={{uri:`data:image/png;base64,${image}`}}/>}
        <View>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontFamily:"Nunito-Bold",color:"#000"}}> {namaBengkel}</Text>
            <Button name='Lihat' color='#3043F0' onPress={()=>setVisible(true)}/>
          </View>
          <Gap height={6}/>
          <Text style={{fontFamily:"Nunito-Light",color:"#000"}}> {address}</Text>
          <Gap height={3}/>
          <View style={{width:278,height:1,backgroundColor:"#555"}}/>
          <Gap height={3}/>
          <Text style={{color:desc==="Online"?"#B3B553":"#777",fontFamily:"Nunito-Bold"}}> {desc}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:15,
        backgroundColor:"#fff"
    },
    textCaption:{
        fontFamily:'Nunito-Bold',
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
    },
    bottomSheet:{
      position:'absolute',
      bottom:0,
      right:0,
      left:0,
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
      zIndex:99,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius:3.84,
      elevation:10,
      paddingHorizontal:16,
      paddingVertical:16,
    },
})

export default RequestLists
