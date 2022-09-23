import React,{useState,useContext,useEffect} from 'react'
import { StyleSheet, Text, View, Image,TouchableOpacity,useWindowDimensions,FlatList,Modal } from 'react-native'
import {ArrowLeft,MapPin,Warning} from '../../assets/'
import { Gap,Button,WorkshopComponent } from '../../components'
import {PanGestureHandler} from 'react-native-gesture-handler'
import Animated,{useAnimatedGestureHandler,useAnimatedStyle,useSharedValue,withSpring} from 'react-native-reanimated'
import {AuthContext} from '../../config/authContext'
import firestore from '@react-native-firebase/firestore'

const CustomerHistory = ({navigation}) => {

  const [reports,setReport] = useState([])
  const [refreshing,setRefreshing] = useState(false)
  const [isVisible,setIsVisible] = useState(false)
  const {user:currentUser} = useContext(AuthContext)
  // console.log(currentUser[0]._data.email);
  // console.log(reports[0]);
  const fetchReports=()=>{
    firestore().collection('reports')
    .where('from.email','==',currentUser[0]._data.email)
    .get()
    .then(items=>{
      // console.log(items._changes[1]._nativeData.doc.data);
      items._changes.map(item=>{
        if (item._nativeData.doc.data.from[1].email[1] == currentUser[0]._data.email) {
          // console.log(item._nativeData.doc.data.from[1]);
          setReport(items._changes)
          console.log(true);
          setRefreshing(true)
        }else{
          setReport([])
          setRefreshing(true)
          // console.log(item._nativeData.doc.data.from[1].email[1]);
          console.log(currentUser[0]._data.email);
        }
      })
    }).catch(e=>{
      setReport([])
      setRefreshing(false)
    }).finally(()=>{
      setRefreshing(false)
    })
  }


  const submit = async()=>{
    top.value = withSpring(dimensions.height / 1,springConfig)
  }

  const report=()=>{
    // top.value = withSpring(dimensions.height / 1,springConfig)
    navigation.navigate("BengkelMelaporCustomer")
  }

  // const getValue = (...value)=>{
  //   setIsVisible(...value)
  // }

  useEffect(()=>{
    let mounted = true
    if (mounted) {
      fetchReports()
    }
      return ()=>mounted=false
  },[])

  // console.log(reports[0]._nativeData);
  return (
    <View style={styles.container}>
      <Gap height={24}/>
      <View style={styles.header}>
        <View>
        {/* Header */}
        <ArrowLeft height={13} width={14} onPress={()=>navigation.goBack()}/>
        </View>
        <Gap height={32}/>
        <View>
        <Text style={styles.textCaption}>History</Text>
        </View>
      </View>
      <Gap height={12}/>
      <View style={{borderBottomColor: 'black',borderBottomWidth: 2, opacity: 0.2}}/>
      <Gap height={30}/>
      {reports!== (undefined||null||[]) && <FlatList
        keyExtractor={(item,index) => index}
        refreshing={refreshing}
        onRefresh={fetchReports}
        showsVerticalScrollIndicator={false}
        data={reports}
        renderItem={({item,index})=><WorkshopComponent flag="history" key={index}
        namaBengkel={item._nativeData.doc.data.toBengkel[1].namaBengkel[1]} problem={item._nativeData.doc.data.problem[1]} location={item._nativeData.doc.data.location[1].desc[1]}
        image={item._nativeData.doc.data.toBengkel[1].image[1]} address={item._nativeData.doc.data.toBengkel[1].alamat[1]} desc={item._nativeData.doc.data?.status[1]}/>}
        />}
      <Gap height={25}/>
    </View>
  )
}

export default CustomerHistory

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
