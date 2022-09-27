import React,{useState,useContext} from 'react'
import {Text,View,StyleSheet,TouchableOpacity,Image} from 'react-native'
import {ArrowLeft,MapPin,Edit,SuccessIcon} from '../../assets'
import {Gap,Input,Button,ModalSuccess} from '../../components'
import firestore from '@react-native-firebase/firestore'
import {AuthContext} from '../../config/authContext'

const LaporKerusakkan = ({navigation,route}) => {
  const [visible,setVisible] = useState(false)
  const [problems,setProblems] = useState('')
  const {itemId,otherParams,location} = route.params
  const {user:currentUser} = useContext(AuthContext)
  // console.log(location);
  const price = location?.distance*3.87222
  const submitreport=()=>{
    firestore()
    .collection("reports")
    .add({problem:problems,toBengkel:otherParams,location,from:currentUser[0]._data,status:'Sedang menunggu konfirmasi',harga:price.toFixed(3)})
    .then(()=>{
      console.log('report added');
      setVisible(true)
    })
  }

  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
      <ModalSuccess visible={visible}>
        <View style={styles.modalContainer}>
          <Text onPress={()=>setVisible(false)} style={{fontSize:28,position:'absolute',right:30,top:24,color:'#000'}}>X</Text>
          <SuccessIcon height={120} width={120}/>
          <View style={[styles.headingWrapper,{marginTop:21}]}>
            <Text style={[{color:'#823589'},styles.headingText]}>Terima kasih</Text>
          </View>
          <Text style={styles.comment}>Permintaan akan segera di proses!</Text>
        </View>
      </ModalSuccess>
      <Gap height={20}/>
      <ArrowLeft onPress={()=>navigation.navigate('HomepageCustomer')} style={{marginLeft:18}} onPress={()=>navigation.goBack()}/>
      <Gap height={28}/>
      <View style={{alignItems:'center'}}>
        <View>
          <View style={styles.line}/>
          <Text style={styles.title}>{`${otherParams.namaBengkel}, ${otherParams.alamat}`}</Text>
          <Image source={{uri:`data:image/png;base64,${otherParams.image}`}} style={styles.image}/>
          <Gap height={29}/>
          <TouchableOpacity style={styles.rowAlignment} onPress={()=>navigation.navigate("CustomerDrawer",{screen:"CustomerMap"},{itemId:itemId})}>
            <MapPin/>
            <Text style={{color:"#000",width:"80%"}}>{location!==undefined || null ? location?.desc :  'Tentukan Lokasimu'}</Text>
          </TouchableOpacity>
        </View>
        <Gap height={40}/>
        <View style={styles.rowAlignment}>
          <Text style={styles.reportTitle}>Tuliskan masalah pada kendaraanmu</Text>
          <Edit/>
        </View>
        <Text style={{color:"#777"}}>Note: Mohon sertakan jenis/model/merek kendaraan</Text>
        <Gap height={4}/>
        <Input underlineColorAndroid="transparent"
        placeholderTextColor="#C0A8C2"
        numberOfLines={100}
        multiline={true}
        borderRadius={10}
        height={172}
        width={360}
        defaultValue={problems}
        onChangeText={value=>setProblems(value)}/>
      <Gap height={25}/>
      <Button style={styles.btnSubmit} name="Minta layanan" size={24} fam="Nunito-Bold" color="#fff" onPress={submitreport}/>
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
  image:{height:188,width:360,borderRadius:15},
  headingWrapper:{flexDirection:'row'},
  headingText:{fontSize:16,fontFamily:'Poppins-SemiBold'},
  comment:{textAlign:'center',width:230,marginTop:5,color:'#999'},
  modalBg:{
    flex:1,
    backgroundColor:'rgba(0, 0, 0, 0.43)',
    alignItems:'center',
    justifyContent:'center'
  },
  modalContainer:{
    backgroundColor:'#fff',
    minHeight:405,
    minWidth:329,
    borderRadius:20,
    alignItems:'center',
    paddingVertical:64
  }
})

export default LaporKerusakkan
