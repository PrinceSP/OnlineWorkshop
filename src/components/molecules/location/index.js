import React, {useState,useEffect} from 'react'
import {Text,View,StyleSheet,Dimensions,useWindowDimensions,ActivityIndicator,Linking} from 'react-native'
import {PanGestureHandler} from 'react-native-gesture-handler'
import {Gap} from '../../atoms'
import MapFinderBengkelTwo from '../mapsFinderBengkel'
import {Phone,ArrowLeft,Pointer} from '../../../assets'
import Animated,{useAnimatedGestureHandler,useAnimatedStyle,useSharedValue,withSpring} from 'react-native-reanimated'

const {width,height} = Dimensions.get('window')

const POVLocation = ({onPress,datas})=>{
  console.log("Datas: ",datas);
  const [reportInfo,setReportInfo] = useState({})
  // console.log("location: ",route);
  const submit = async()=>{
    top.value = withSpring(dimensions.height / 1,springConfig)
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
      if (top.value > dimensions.height / 1.4 + 200) {
        top.value = dimensions.height
      } else{
        top.value = dimensions.height
      }
    }
  })

  const back=()=>{
    top.value = withSpring(dimensions.height / 1,springConfig)
    navigation.navigate("PermintaanService")
  }

  const getGeometrics = (...datas)=>{
    setReportInfo(...datas)
    // console.log(...datas);
  }
  // getLocation(...datas)

  // console.log(route.params.otherParam);
  // console.log(datas);
  return(
    <>
      <MapFinderBengkelTwo getGeometrics={getGeometrics} flags="bengkel" regions={datas}/>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[bottomSheet,bottomSheetStyle]}>
          <View style={{flexDirection:'row',width:"100%"}}>
            <View style={{backgroundColor:'#5E6B73',height:38,width:39,borderRadius:30,alignItems:'center',justifyContent:'center'}}>
              <View style={{backgroundColor:"#000",height:10.75,width:10.83,borderRadius:10}}/>
            </View>
            <View style={{marginLeft:10}}>
              <Text style={{fontSize:18,fontFamily:'Nunito-Bold',color:"#000"}}>Malalayang Satu</Text>
              <Text style={{fontSize:14,fontFamily:"Nunito-Light",color:"#000"}}>FR39+R98, Malalayang satu, Manado, Manado City, North Sulawesi, Indonesia</Text>
            </View>
          </View>
          <Gap height={20}/>
          <View style={{margin:"auto",width:"60%",flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <View>
              <Phone onPress={()=>Linking.openURL(`tel:${+6281213507373}`)}/>
              <Text style={{fontSize:14,fontFamily:"Nunito-Light",color:"#000"}}>Via Phone</Text>
            </View>
            <View>
              <Phone onPress={()=>Linking.openURL(`whatsapp://send?phone=${6281213507373}`)}/>
              <Text style={{fontSize:14,fontFamily:"Nunito-Light",color:"#000"}}>Via WhatsApp</Text>
            </View>
          </View>
        </Animated.View>
      </PanGestureHandler>
      <View style={style.arrowLeft}>
        <ArrowLeft onPress={onPress}/>
      </View>
      <Pointer style={style.pointer} onPress={()=>{top.value = withSpring(dimensions.height / 1.4,springConfig)}}/>
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
  buttonSubmit:{
    marginTop:68,
    backgroundColor:'#598EF5',
    height:57,
    width:220,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center'
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
    position:"absolute",bottom:"30%",right:"7%",
    shadowOffset: { width: 0, height: 2 },shadowColor:"#000",
    shadowOpacity: 0.9,
    shadowRadius:3.84,
    elevation:10
  },
  arrowLeft:{width:40,height:40,borderRadius:40,backgroundColor:"#fff",
    alignItems:'center',justifyContent:'center',position:"absolute",left:"7%",bottom:"30%",
    shadowOffset: { width: 0, height: 2 },shadowColor:"#000",
    shadowOpacity: 0.9,
    shadowRadius:3.84,
    elevation:10
  }
})

const {container,text1,mapContainer,formContainer,button,buttonSubmit,bottomSheet,sheetLine,upload,toggleBottomSheet} = style


export default POVLocation
