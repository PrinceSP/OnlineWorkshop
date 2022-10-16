import React,{useState,useContext,useEffect} from 'react'
import { StyleSheet, Text, View, Image,TouchableOpacity,FlatList,ActivityIndicator } from 'react-native'
import {ArrowLeft,MapPin,Warning} from '../../assets/'
import { Gap,Button,WorkshopComponent } from '../../components'
import {PanGestureHandler} from 'react-native-gesture-handler'
import Animated,{useAnimatedGestureHandler,useAnimatedStyle,useSharedValue,withSpring} from 'react-native-reanimated'
import {AuthContext} from '../../config/authContext'
import firestore from '@react-native-firebase/firestore'

const CustomerHistory = ({navigation}) => {

  const [reports,setReport] = useState([])
  const [refreshing,setRefreshing] = useState(true)
  const [isVisible,setIsVisible] = useState(false)
  const {user:currentUser} = useContext(AuthContext)
  const [docId,setDocId] = useState([])

  const fetchReports=async()=>{
    try {
      await firestore()
      .collection('reports')
      .where('from.email','==',currentUser[0]._data.email)
      .onSnapshot(items => {
        items?._changes.map(item=>{
          if (item._nativeData.doc.data.from[1].email[1] == currentUser[0]._data.email) {
            console.log('id:',item.id);
            setReport(items._changes)
            setRefreshing(false)
            console.log(true);
          }else{
            setReport([])
            setRefreshing(false)
          }
        })
        setRefreshing(false)
      })
    } catch (e) {
      console.log(e);
      setReport([])
      setRefreshing(false)
    }
  }

  const report=()=>{
    navigation.navigate("BengkelMelaporCustomer")
  }

  useEffect(()=>{
      fetchReports()
      return ()=> fetchReports()
  },[])

  if (refreshing) {
    return <ActivityIndicator />;
  }

  // console.log(reports[0]._nativeData);
  return (
    <View style={styles.container}>
      <Gap height={24}/>
      <View style={styles.header}>
        <View>
          <ArrowLeft height={13} width={14} onPress={()=>navigation.goBack()}/>
        </View>
        <Gap height={32}/>
        <View>
          <Text style={styles.textCaption}>Riwayat</Text>
        </View>
      </View>
      <Gap height={12}/>
      <View style={{borderBottomColor: '#000',borderBottomWidth: 2, opacity: 0.2}}/>
      <Gap height={30}/>
      {reports!== (undefined||null||[]) && <FlatList
        keyExtractor={(item,index) => index}
        refreshing={refreshing}
        onRefresh={fetchReports}
        showsVerticalScrollIndicator={false}
        data={reports}
        extraData={reports}
        renderItem={({item,index})=><WorkshopComponent
          flag="history"
          docId={item._nativeData.doc.path.split('/')}
          namaBengkel={item._nativeData.doc.data.toBengkel[1].namaBengkel[1]}
          problem={item._nativeData.doc.data.problem[1]}
          location={item._nativeData.doc.data.location[1].desc[1]}
          image={item._nativeData.doc.data.toBengkel[1].image[1]}
          address={item._nativeData.doc.data.toBengkel[1].alamat[1]}
          price={item._nativeData.doc.data.harga[1]}
          desc={item._nativeData.doc.data?.status[1]}
        />}
       />
      }
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
