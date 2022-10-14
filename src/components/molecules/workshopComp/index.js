import React, {useState} from 'react'
import {View,Text,TouchableOpacity,Image,StyleSheet,Modal} from 'react-native'
import {Gap,Button,Input} from '../../atoms'
import {ArrowLeft,MapPin,Warning} from '../../../assets'
import {ModalSuccess} from '../successModal'
import Animated from 'react-native-reanimated'
import firestore from '@react-native-firebase/firestore'
import Toast from 'react-native-toast-message'

const WorkshopComponent = ({flag,price,docId=[],desc='Online',onPress,namaBengkel,address,image="",problem,location,...rest}) => {
  const [visible,setVisible] = useState(false)
  // console.log(desc);
  const cancelRequest = async ()=>{
    await firestore()
    .collection('reports')
    .doc(docId[1])
    .update({
      status:'Pesanan dibatalkan'
    })
    .then(()=>{
      Toast.show({
        type: 'success',
        text1: 'Yeay!',
        text2: 'your report has been canceled👋'
      });
      // setVisible(false)
      setTimeout(()=>setVisible(false),3000)
    })
  }

  // console.log(desc);

  return (
      flag === 'history' ? <View >
        <Modal transparent visible={visible}>
          <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)'}}>
            <TouchableOpacity style={{flex:1}} onPress={()=>setVisible(false)}/>
            <Animated.View style={[styles.bottomSheet,{backgroundColor:"#fff",shadowColor:"#000000"}]}>
              <Text style={{color:"#000",fontFamily:"Nunito-Bold",height:50,width:"100%",fontSize:18}}>{problem}</Text>
                <Gap height={20}/>
                <View style={{borderStyle:'dotted',borderColor:"rgba(0,0,0,0.4)",borderWidth:2}}/>
                <Gap height={20}/>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <MapPin/>
                    <Text style={{color:"#000",fontFamily:"Nunito-Bold",fontSize:18}}>{location}</Text>
                  </View>
                </View>
                <Gap height={20}/>
                <Text style={{color:desc==="Sedang proses"?"#B3B553":desc==="Permintaan di tolak!"?"#f00":"#777",fontFamily:"Nunito-Bold",fontSize:18}}>{desc}</Text>
                <Gap height={20}/>
                <View style={{width:'100%',paddingHorizontal:5,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                  <Text style={{color:"#333"}}>Ongkos layanan ditempat</Text>
                  <Text style={{color:"#000",fontFamily:'Nunito-Bold',fontSize:18}}>Rp.{price}</Text>
                </View>
                <Gap height={55}/>
                <View>
                  <Text style={{width:"100%",textAlign:'right',color:"#000",fontFamily:"Nunito-Light"}}>Tekan batal jika tidak jadi servis</Text>
                  <Gap height={4}/>
                  <Button style={styles.button} name={desc==="Pesanan di terima"?'Selesai':'Batalkan'} size = {24} weight = 'bold' color ='#fff' onPress={cancelRequest}/>
                </View>
              </Animated.View>
              <Toast autoHide={true} visibilityTime={2000}/>
          </View>
        </Modal>
        <View style={{width:"100%",flexDirection:'row',padding:15,justifyContent:"space-between"}}>
          {image==="" ? <View style={{width:80,height:82,backgroundColor:"#444",borderRadius:15}}/> : <Image style={{width:80,height:82,backgroundColor:"#444",borderRadius:15}} source={{uri:`data:image/png;base64,${image}`}}/>}
          <View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={{fontFamily:"Nunito-Bold",color:"#000"}}> {namaBengkel}</Text>
              <Button name='Lihat' color='#3043F0' onPress={()=>setVisible(true)}/>
            </View>
            <Gap height={6}/>
            <Text style={{fontFamily:"Nunito-Light",color:"#000"}}>{address}</Text>
            <Gap height={3}/>
            <View style={{width:278,height:1,backgroundColor:"#555"}}/>
            <Gap height={3}/>
            <Text style={{color:desc==="Online"?"#B3B553":desc==='Permintaan di tolak!'?"#f00":"#777",fontFamily:"Nunito-Bold"}}>{desc}</Text>
          </View>
        </View>
      </View>
      : <TouchableOpacity onPress={onPress} {...rest}>
        <View style={{width:"100%",flexDirection:'row',padding:15,justifyContent:"space-between"}}>
          {image==="" ? <View style={{width:80,height:82,backgroundColor:"#444",borderRadius:15}}/> : <Image style={{width:80,height:82,backgroundColor:"#444",borderRadius:15}} source={{uri:`data:image/png;base64,${image}`}}/>}
          <View>
            <Text style={{fontFamily:"Nunito-Bold",color:"#000"}}>{namaBengkel}</Text>
            <Gap height={6}/>
            <Text style={{fontFamily:"Nunito-Light",color:"#000",width:260}}>{address}</Text>
            <Gap height={3}/>
            <View style={{width:278,height:1,backgroundColor:"#555"}}/>
            <Gap height={3}/>
            <Text style={{color:desc==="Online"?"#B3B553":"#777",fontFamily:"Nunito-Bold"}}>{desc}</Text>
          </View>
        </View>
      </TouchableOpacity>
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
    button:{
      height: 50,
      width:"100%",
      backgroundColor: '#5E6B73',
      width:"100%",
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15
    }
})

export default WorkshopComponent
