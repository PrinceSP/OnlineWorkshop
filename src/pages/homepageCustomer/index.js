import React,{useState,useEffect,useContext} from 'react'
import {View,StyleSheet,Text,FlatList} from 'react-native'
import {Header,Gap,WorkshopComponent} from '../../components'
import firestore from '@react-native-firebase/firestore'

const HomepageCustomer = ({navigation}) => {

  const [bengkels,setBengkels] = useState([])
  const [refreshing,setRefreshing] = useState(false)

  const fetchBengkel=()=>{
    firestore().collection('users')
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

  useEffect(()=>{
    let mounted = true
    if(mounted){
      fetchBengkel()
    }
    return ()=>mounted=false
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
        renderItem={({item,index})=><WorkshopComponent key={index} onPress={()=>navigation.navigate('LaporKerusakkan')} desc={item._data.state} namaBengkel={item._data.namaBengkel} address={item._data.alamat} image={item._data.image}/>}
        />
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
