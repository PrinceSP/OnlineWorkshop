import React, {useState,useContext} from 'react'
import {Text,View,StyleSheet,Dimensions,useWindowDimensions,ActivityIndicator} from 'react-native'
import {PanGestureHandler} from 'react-native-gesture-handler'
import {Gap,MapFinderBengkel,Button} from '../../components'
import {Pointer,ArrowLeft} from '../../assets'
import Animated,{useAnimatedGestureHandler,useAnimatedStyle,useSharedValue,withSpring} from 'react-native-reanimated'
import {AuthContext} from '../../config/authContext'
import firestore from '@react-native-firebase/firestore'

const BengkelLocation = ({navigation}) => {
  const [location,setLocation] = useState({})
  const {user:currentUser} = useContext(AuthContext)
  // console.log();
  const userId = currentUser._nativeData.doc.path.split('/')
  console.log(userId[1]);
  const back=()=>{
    top.value = withSpring(dimensions.height/1,springConfig)
    navigation.goBack()
  }
  const sendLocation=()=>{
    firestore().collection('users').doc(userId[1])
    .update({location})
    .then(() => {
      console.log('User updated!');
    });
    navigation.navigate({
      name: 'HomeScreen',
      params: { location: location },
      merge: true,
    });
  }

  const getGeometrics = (...datas)=>{
    setLocation(...datas)
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
  return (
    <>
      <MapFinderBengkel getGeometrics={getGeometrics} navigation={navigation}/>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[style.bottomSheet,bottomSheetStyle]}>
          <Text style={{width:"100%",color:"#000",fontFamily:"Nunito-Bold",fontSize:22,textAlign:'left'}}>Tentukan Lokasi</Text>
          <Gap height={20}/>
          <View style={{flexDirection:'row',width:"100%"}}>
            <View style={{backgroundColor:'#5E6B73',height:38,width:39,borderRadius:30,alignItems:'center',justifyContent:'center'}}>
              <View style={{backgroundColor:"#000",height:10.75,width:10.83,borderRadius:10}}/>
            </View>
            <View style={{marginLeft:10}}>
              <Text style={{fontSize:18,fontFamily:'Nunito-Bold',color:"#000"}}>Lokasi anda</Text>
              <Text style={{width:"80%",fontSize:14,fontFamily:"Nunito-Light",color:"#000"}}>{location.desc}</Text>
            </View>
          </View>
          <Gap height={10}/>
          <Button style={style.btnSubmit} name="Konfirmasi Lokasi" size={20} fam="Nunito-Bold" color="#fff" onPress={sendLocation}/>
        </Animated.View>
      </PanGestureHandler>
      <View style={style.arrowLeft}>
        <ArrowLeft onPress={back}/>
      </View>
      <Pointer style={style.pointer} onPress={()=>{top.value = withSpring(dimensions.height / 1.8,springConfig)}}/>
    </>
  )
}

const style=StyleSheet.create({
  container:{ flex: 1},
  text1:{fontSize:20,fontFamily:'Lato-Bold',color:'#565665'},
  formContainer:{paddingHorizontal:20,paddingBottom:150},
  button:{
    marginTop:12,
    height:37,
    width:120,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center'
  },
  btnSubmit:{
    marginBottom:15,
    backgroundColor:'#5E6B73',
    height:55,
    width:340,
    borderRadius:15,
    alignItems:'center',
    justifyContent:'center',
  },
  bottomSheet:{
    backgroundColor:"#fff",
    width:"100%",
    position:'absolute',
    bottom:0,
    right:0,
    left:0,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    zIndex:99,
    shadowColor:"#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius:3.84,
    elevation:10,
    paddingHorizontal:10,
    paddingTop:20,
    alignItems:'center',
  },
  pointer:{
    position:"absolute",top:"33%",right:"7%",
    shadowOffset: { width: 0, height: 2 },shadowColor:"#000",
    shadowOpacity: 0.9,
    shadowRadius:3.84,
    elevation:10
  },
  arrowLeft:{width:40,height:40,borderRadius:40,backgroundColor:"#fff",
    alignItems:'center',justifyContent:'center',position:"absolute",left:"7%",top:"33%",
    shadowOffset: { width: 0, height: 2 },shadowColor:"#000",
    shadowOpacity: 0.9,
    shadowRadius:3.84,
    elevation:10
  }
})

export default BengkelLocation
