import React,{useState,useContext} from 'react'
import {Text,View,StyleSheet,TouchableOpacity,Image,ScrollView,useWindowDimensions,PermissionsAndroid} from 'react-native'
import {ArrowLeft,MapPin,Edit,SuccessIcon} from '../../assets'
import {Gap,Input,Button,ModalSuccess} from '../../components'
import firestore from '@react-native-firebase/firestore'
import {AuthContext} from '../../config/authContext'
import {launchImageLibrary,launchCamera} from 'react-native-image-picker'
import {PanGestureHandler} from 'react-native-gesture-handler'
import Animated,{useAnimatedGestureHandler,useAnimatedStyle,useSharedValue,withSpring} from 'react-native-reanimated'

const LaporKerusakkan = ({navigation,route}) => {
  const [visible,setVisible] = useState(false)
  const [problems,setProblems] = useState('')
  const {itemId,otherParams,location} = route.params
  const {user:currentUser} = useContext(AuthContext)
  const [photo,setPhoto] = useState('')
  const [hasPhoto, setHasPhoto] = useState(false)
  const [photoBase64,setPhotoBase64] = useState('')
  // console.log(photoBase64);
  const price = location?.distance*3.87222
  const submitreport=()=>{
    firestore()
    .collection("reports")
    .add({
      problem:problems,
      toBengkel:otherParams,
      location,
      from:currentUser[0]._data,
      status:'Menunggu konfirmasi',
      harga:price.toFixed(3),
      image:photoBase64
    })
    .then(()=>{
      console.log('report added');
      setVisible(true)
    })
  }

  const imageGallery = ()=>{
    const options={
      maxHeight:400,
      maxWidth:400,
      includeBase64:true,
    }
    launchImageLibrary(options,res=>{
      if(res.didCancel){
        // setHasPhoto(false)
        setPhoto('');
        setPhotoBase64('');
      }else{
        setPhoto(res.assets[0].uri);
        setPhotoBase64(res.assets[0].base64);
        // setHasPhoto(true);
      }
    })
  }

  const fromCamera = async() => {
    const options = {
      includeBase64:true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Bengkel Online Camera Permission",
          message:
            "We need access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        launchCamera(options, (res) => {
          if (res.didCancel) {
            // setHasPhoto(false)
            setPhoto('');
            setPhotoBase64('');
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else {
            setPhoto(res.assets[0].uri);
            setPhotoBase64(res.assets[0].base64);
            // setHasPhoto(true);
            // setIsFetching(true)
            top.value = withSpring(dimensions.height / 1,springConfig)
          }
        });
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const dimensions = useWindowDimensions()
  const springConfig ={
    damping:80,
    overshootClamping:true,
    restDisplacementThreshold:0.1,
    stiffness:500
  }

  const top = useSharedValue(dimensions.height)

  const bottomSheetStyle = useAnimatedStyle(()=>{
    return{
      top:withSpring(top.value,springConfig)
    }
  })

  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, context){
      context.startTop = top.value
    },
    onActive(event,context){
      top.value = context.startTop + event.translationY
    },
    onEnd(){
      if (top.value > dimensions.height / 2 + 200) {
        top.value = dimensions.height
      } else{
        top.value = dimensions.height
      }
    }
  })

  const closeBottomSheet = ()=>{
    top.value = withSpring(dimensions.height/1,springConfig)
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
      <ScrollView contentContainerStyle={{alignItems:'center'}}>
        <View>
          <View style={styles.line}/>
          <Text style={styles.title}>{`${otherParams.namaBengkel}, ${otherParams.location.desc.split(",")[2]}`}</Text>
          <Image source={{uri:`data:image/png;base64,${otherParams.image}`}} style={styles.image}/>
          <Gap height={29}/>
          <TouchableOpacity style={styles.rowAlignment} onPress={()=>navigation.navigate("CustomerDrawer",{screen:"CustomerMap",params:otherParams.location},{itemId:itemId})}>
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
        <Gap height={20}/>
        <Button name="Add Photo" size={16} fam="Nunito-Bold" color="#000" onPress={()=>{
          top.value = withSpring(dimensions.height / 2,springConfig)
        }}/>
        <Gap height={20}/>
        <Input underlineColorAndroid="transparent"
          placeholderTextColor="#C0A8C2"
          numberOfLines={100}
          multiline={true}
          borderRadius={10}
          height={172}
          width={360}
          textAlignVertical="top"
          paddingVertical={20}
          defaultValue={problems}
          onChangeText={value=>setProblems(value)}/>
        <Gap height={25}/>
        <Button style={styles.btnSubmit} name="Minta layanan" size={24} fam="Nunito-Bold" color="#fff" onPress={submitreport}/>
      </ScrollView>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.bottomSheet,bottomSheetStyle,{backgroundColor:"#fff",shadowColor:"#000"}]}>
          <View style={styles.sheetLine}/>
          <Text style={[styles.panelTitle,{color:"#000"}]}>Upload Photo</Text>
          <Text style={[styles.panelSubtitle,{color:"#000"}]}>Choose Your Profile Photo</Text>
          <Gap height={20}/>
          <Button name="Take a photo" color={"#fff"} size={18} fam='Poppins-SemiBold' onPress={()=>fromCamera()} style={[styles.button,{backgroundColor:'#ED6262'}]}/>
          <Button name="Choose from gallery" color={"#fff"} size={18} fam='Poppins-SemiBold' onPress={()=>imageGallery()} style={[styles.button,{backgroundColor:'#ED6262'}]}/>
          <Button name="Cancel" color={"#fff"} size={18} fam='Poppins-SemiBold' style={[styles.button,{backgroundColor:'#ED6262'}]} onPress={closeBottomSheet}/>
        </Animated.View>
      </PanGestureHandler>
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
    shadowOpacity: 0.9,
    shadowRadius:3.84,
    elevation:10,
    paddingHorizontal:10,
    alignItems:'center'
  },
  button:{
    marginBottom:15,
    // backgroundColor:'#f73b3b',
    // backgroundColor:'#ED6262',
    height:60,width:329,borderRadius:14,alignItems:'center',
    justifyContent:'center',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 10, height: 10 },
        shadowColor: "#88aaff",
        shadowOpacity: 1,
        shadowRadius:5,
      },
      android:{
        elevation: 4,
      },
    })
  },
  sheetLine:{width:70,borderTopWidth:4,borderTopColor:"#777",borderRadius:2,alignSelf:'center',marginVertical:15},
  panelTitle:{fontFamily:"Poppins-SemiBold",fontSize:25},
  panelSubtitle:{fontFamily:"Poppins-Regular"},
})

export default LaporKerusakkan
