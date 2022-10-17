import React,{useState,useContext,useEffect} from 'react'
import { StyleSheet, Text, View, Image,TouchableOpacity,useWindowDimensions, FlatList } from 'react-native'
import {ArrowLeft,MapPin,Warning} from '../../assets/'
import { Gap,Button ,WorkshopComponent} from '../../components'
import {PanGestureHandler} from 'react-native-gesture-handler'
import Animated,{useAnimatedGestureHandler,useAnimatedStyle,useSharedValue,withSpring} from 'react-native-reanimated'
import firestore from '@react-native-firebase/firestore'
import {AuthContext} from '../../config/authContext'

const HistoryPemesanan = ({navigation}) => {
  const [reports,setReport] = useState([])
  const [refreshing,setRefreshing] = useState(true)
  const [isVisible,setIsVisible] = useState(false)
  const {user:currentUser} = useContext(AuthContext)
  const [docId,setDocId] = useState([])

  const submit = ()=>{
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
      if (top.value > dimensions.height / 2 + 200 ) {
        top.value = dimensions.height
      } else{
        top.value = dimensions.height
      }
    }
  })

  const report=()=>{
    top.value = withSpring(dimensions.height / 1,springConfig)
    navigation.navigate("BengkelMelaporCustomer")
  }
  // console.log(currentUser._nativeData.doc.data.email[1]);

  const fetchReports=async()=>{
    try {
      await firestore()
      .collection('reports')
      .where('toBengkel.email','==',currentUser._nativeData.doc.data.email[1])
      .onSnapshot(items => {
        // console.log(items);
        items._changes.map(item=>{
          if (item._nativeData.doc.data.toBengkel[1].email[1] == currentUser._nativeData.doc.data.email[1]) {
            setReport(items._changes)
            setRefreshing(false)
            console.log(true)
            // console.log(item._nativeData.doc.data.status[1]);
          }else{
            setReport([])
            setRefreshing(false)
          }
        })
        setRefreshing(false)
      })
      // console.log(currentUser._nativeData.doc.data.email[1]);
    } catch (e) {
      console.log(e);
      setReport([])
      setRefreshing(false)
    }
  }

  useEffect(()=>{
    fetchReports()
    return ()=> fetchReports()
  },[])

  // console.log(reports[0]?._nativeData.doc.data.status[1])

  return (
    <View style={styles.container}>
      <Gap height={24}/>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.bottomSheet,bottomSheetStyle,{backgroundColor:"#fff",shadowColor:"#000000"}]}>
          <Text style={{color:"#000",fontFamily:"Nunito-Bold",height:50,width:"100%",fontSize:18}}>Perlu ganti oli dan canvas rem motor matic</Text>
          <Gap height={20}/>
          <View style={{borderStyle:'dotted',borderColor:"rgba(0,0,0,0.4)",borderWidth:2}}/>
          <Gap height={20}/>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <MapPin/>
              <Text style={{color:"#000",fontFamily:"Nunito-Bold",fontSize:18}}>Malalayang Satu</Text>
            </View>
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={report}>
              <Warning/>
              <Text style={{color:"#000",fontFamily:"Nunito-Bold",fontSize:18}}>Lapor</Text>
            </TouchableOpacity>
          </View>
          <Gap height={20}/>
          <Text style={{color:"#B3B553",fontFamily:"Nunito-Bold",fontSize:18}}>Sedang di proses</Text>
          <Gap height={75}/>
          <View>
            <Text style={{width:"100%",textAlign:'right',color:"#000",fontFamily:"Nunito-Light"}}>Tekan selesai jika sudah selesai servis</Text>
            <Gap height={4}/>
            <Button style={styles.button} name='Selesai' size = {24} weight = 'bold' color ='#fff'/>
          </View>
        </Animated.View>
      </PanGestureHandler>
      <View style={styles.header}>
        <View>
        {/* Header */}
        <ArrowLeft height={13} widdth={14} onPress={()=>navigation.goBack()}/>
        </View>
        <Gap height={32}/>
        <View>
        <Text style={styles.textCaption}>Riwayat</Text>
        </View>
      </View>
      <Gap height={12}/>
      <View style={{borderBottomColor: 'black',borderBottomWidth: 2, opacity: 0.2}}/>
      <Gap height={30}/>
      {reports!== (undefined||null||[]) ? <FlatList
        keyExtractor={(item,index) => index}
        refreshing={refreshing}
        onRefresh={fetchReports}
        showsVerticalScrollIndicator={false}
        data={reports}
        extraData={reports}
        renderItem={({item,index})=>item._nativeData.doc.data.status[1] === "Permintaan di terima" || item._nativeData.doc.data.status[1] === "Permintaan selesai" ? <WorkshopComponent
          flag="history"
          docId={item._nativeData.doc.path.split('/')}
          namaBengkel={item._nativeData.doc.data.from[1].username[1]}
          problem={item._nativeData.doc.data.problem[1]}
          location={item._nativeData.doc.data.location[1].desc[1]}
          image={item._nativeData.doc.data.toBengkel[1].image[1]}
          address={item._nativeData.doc.data.toBengkel[1].alamat[1]}
          price={item._nativeData.doc.data.harga[1]}
          desc={item._nativeData.doc.data?.status[1]}
        /> : null}
       /> : null
      }
    </View>
  )
}

export default HistoryPemesanan

const styles = StyleSheet.create({
  container:{
    // marginLeft: 15
    flex:1,
    backgroundColor:"#fff"
  },
  header:{
    marginLeft: 15
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
