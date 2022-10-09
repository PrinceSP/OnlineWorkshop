import React,{useState,useEffect,useContext} from 'react'
import {View,StyleSheet,Text,FlatList} from 'react-native'
import {Header,Gap,WorkshopComponent} from '../../components'
import firestore from '@react-native-firebase/firestore'
import {AuthContext} from '../../config/authContext'

const HomepageCustomer = ({navigation}) => {

  const [bengkels,setBengkels] = useState([])
  const [refreshing,setRefreshing] = useState(false)
  const [reports,setReport] = useState([])
  const {user:currentUser} = useContext(AuthContext)
  // const userId = currentUser[0].ref._documentPath._parts[1]
  // console.log(userId);
  const fetchBengkel=async()=>{
    await firestore().collection('users')
    .where('role','==','bengkel')
    .get()
    .then(items=>{
      setBengkels(items)
      setRefreshing(true)
    }).catch(e=>{
      setRefreshing(false)
      setBengkels([])
    }).finally(()=>{
      setRefreshing(false)
    })
  }

  const fetchReports=async()=>{
    await firestore().collection('reports')
    .where('from.email','==',currentUser[0]._data.email)
    .get()
    .then(items=>{
      setReport(items._docs)
      // console.log(items._docs);
      setRefreshing(true)
    }).catch(e=>{
      setRefreshing(false)
      setReport([])
    }).finally(()=>{
      setRefreshing(false)
    })
  }


  useEffect(()=>{
    let isMounted = true
    if(isMounted){
      fetchBengkel()
      fetchReports()
    }
    return ()=>isMounted=false
  },[])

  return (
    <View style={styles.container}>
     <Gap height={20}/>
     <Header navigation="navigation" name="Home"/>
     <Gap height={30}/>
     <FlatList
      keyExtractor={item => item.id}
      refreshing={refreshing}
      onRefresh={fetchBengkel}
      showsVerticalScrollIndicator={false}
      data={bengkels._docs}
      renderItem={({item,index,newArr})=><WorkshopComponent key={index} onPress={()=>navigation.navigate('LaporKerusakkan',{itemId:item.id,otherParams:item._data})} desc={item._data.state} namaBengkel={item._data.namaBengkel} address={item._data?.location?.desc} image={item._data.image}/>}
      />
      {
        reports.map((item,index,newArr)=>(
          newArr[index]._data.status === "menunggu konfirmasi" ? <View key={index} style={{height:82,width:"100%",position:"absolute",bottom:0,backgroundColor:"#5E6B73",padding:10}}>
            <Text style={{fontSize:20,fontFamily:"Nunito-Bold",color:"#fff"}}>sedang menunggu konfirmasi dari  </Text>
            <Text style={{fontSize:18,fontFamily:"Nunito-Bold",color:"#ddd"}}>• {item._data.toBengkel.namaBengkel}</Text>
          </View> : item._data.status === null||undefined ? <Text>sdfsdfsdf</Text> : null
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
  }
})

export default HomepageCustomer
