import React, { useState,useContext,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, Image } from 'react-native';
import { Gap } from '../../components';
import {Logo} from '../../assets/'
import {Button,Header} from '../../components'
import firestore from '@react-native-firebase/firestore'
import {AuthContext} from '../../config/authContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreen = ({ navigation })=>{
  const {user:currentUser} = useContext(AuthContext)
  // console.log(currentUser._nativeData.doc.data.state[1]==="Online" ? true : false);
  const [isEnabled, setIsEnabled] = useState(currentUser._nativeData.doc.data.state[1]==="Online" ? true : falselse);
  const userId = currentUser._nativeData.doc.path.split("/")
  // console.log(currentUser._nativeData.doc.data.state[1]);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
    firestore().collection('users').doc(userId[1])
    .update({state:isEnabled==true?"Offline":"Online"})
    .then(() => {
      console.log('User updated!');
    });
  };

  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
      <Gap height={21}/>
      <Header navigation={navigation} name="Home" btn="bengkel"/>
      <View style={{borderBottomColor: 'black',borderBottomWidth: 2, opacity: 0.2, marginVertical:12 }}/>
      <View style={styles.caption}>
        <Logo height={157}/>
        <Text style={styles.text1}>Auto OnServ</Text>
        <Text style={styles.text2}>Service anywhere anythime!</Text>
      </View>
      <View style={{borderBottomColor: 'black',borderBottomWidth: 2, opacity: 0.2, marginVertical:12 }}/>
      <Gap height={40}/>
      <View style={styles.content}>
        {/* Content */}
        <View style={{flexDirection:'row'}}>
          <View style={{flexDirection:"row"}}>
            <Text style={styles.text3}>Status: </Text>
            { isEnabled ? <Text style={styles.text4a}> Aktif</Text> :
              <Text style={styles.text4b}>Tidak Aktif</Text>
            }
          </View>
        </View>
        <Switch
          style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
          trackColor={{ false: "#767577", true: "#38B000" }}
          thumbColor={isEnabled ? "#ffff" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}/>
      </View>
      <Gap height={220}/>
      <Button style={styles.button} name='Permintaan Service' color = 'white' textAlign='center' size = {18} fam = 'Nunito' onPress={()=>navigation.navigate('PermintaanService')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  caption:{
    flexDirection:'column',
    // backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1:{
    fontSize:30,
    fontFamily:"Nunito-Bold",
    color:'black',
    fontWeight: '700',
    letterSpacing: 1.1
  },
  text2:{
    fontSize:24,
    fontFamily:"Nunito",
    color:'black',
    fontWeight: '400',
    letterSpacing: 0.4
  },
  text3:{
    fontSize:20,
    fontFamily:"Nunito",
    color:'black',
    fontWeight: '700',
    // letterSpacing: 0.4
  },
  text4a:{
    fontSize:20,
    fontFamily:"Nunito",
    color:'#38B000',
    fontWeight: '700',
    // letterSpacing: 0.4
  },
  text4b:{
    fontSize:20,
    fontFamily:"Nunito",
    color:'black',
    fontWeight: '700',
    // letterSpacing: 0.4
  },
  content:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginHorizontal:26
  },
  button:{
    marginLeft:100,
    height: 50,
    width:200,
    backgroundColor: '#5E6B73',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    padding:4
  },
    ImageStyle: {
      padding: 10,
      marginTop: 24,
      marginBottom: 5,
      height: 87,
      width: 87,
      borderRadius:43.5,
      resizeMode: 'stretch',
      alignItems: 'center',
  }
})

export default HomeScreen
