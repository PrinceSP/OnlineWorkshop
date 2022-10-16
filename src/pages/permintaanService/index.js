import { StyleSheet, Text, View, Image, TouchableOpacity,FlatList } from 'react-native'
import React, {useEffect,useState,useContext} from 'react'
import {ArrowLeft} from '../../assets'
import { Gap,Button,RequestLists } from '../../components'
import firestore from '@react-native-firebase/firestore'
import {AuthContext} from '../../config/authContext'

const PermintaanService = ({navigation}) => {
  const [refreshing,setRefreshing] = useState(false)
  const [visible,isVisible] = useState(false)
  const [reports,setReport] = useState([])
  const {user:currentUser} = useContext(AuthContext)
  // reports !=(null||undefined||[]) && reports._changes.map(item=>console.log(item._nativeData))
  // console.log(reports._changes);
  const back=()=>{
    // top.value = withSpring(dimensions.height / 1,springConfig)
    navigation.navigate("HomeScreen")
  }


  const fetchReports=()=>{
    firestore().collection('reports')
    .where('toBengkel.email','==',currentUser._nativeData.doc.data.email[1])
    .get()
    .then(items=>{
      setReport(items)
      setRefreshing(true)
    }).catch(e=>{
      setRefreshing(false)
      setReport([])
    }).finally(()=>{
      setRefreshing(false)
    })
  }

  useEffect(()=>{
    let mounted = true
    if(mounted){
      fetchReports()
    }
    return ()=>mounted=false
  },[])

  return (
    <View style={styles.container}>
      <Gap height={24}/>
      <View style={styles.header}>
        <ArrowLeft width={14} height={13} onPress={back}/>
      </View>
      <Gap height={32}/>
      <View>
        <Text style={styles.textCaption}>Permintaan Service</Text>
      </View>
      {reports !== (undefined||null||[]) &&
        // console.log(reports._changes[0]._nativeData.doc.path)
        <FlatList
         keyExtractor={(item,index) => index}
         refreshing={refreshing}
         onRefresh={fetchReports}
         showsVerticalScrollIndicator={false}
         data={reports._changes}
         renderItem={(item,index)=><RequestLists key={index}
           visible={visible}
           desc={item.item._nativeData.doc.data.problem[1]}
           harga={item.item._nativeData.doc.data.harga[1]}
           namaBengkel={item.item._nativeData.doc.data.from[1].fullname[1]}
           id={item.item._nativeData.doc.path.split('/')}
           address={item.item._nativeData.doc.data.status[1]}
           navigation={navigation}
           locations={item.item._nativeData.doc.data}
           image={item.item._nativeData.doc.data?.image[1]}
           />}
        />
      }
    </View>
  )
}

export default PermintaanService

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:15,
        backgroundColor:"#fff",
        position:'relative'
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
