import * as React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Gap } from '../../components';
import {Logo} from '../../assets/'
import {Button} from '../../components'
function HomeScreen({ navigation }) {

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View>
      <View style={{marginLeft: 13}}>
      {/* Header */}
        <Gap height={20}/>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          >
            <Gap height={6.75}/>
            <View style={{borderBottomColor: '#333333',borderBottomWidth: 2, opacity: 1, maxWidth: 10.67}}/>
            <Gap height={6.75}/>
            <View style={{borderBottomColor: '#333333',borderBottomWidth: 2, opacity: 1, maxWidth: 18.67}}/>
            <Gap height={6.75}/>
            <View style={{borderBottomColor: '#333333',borderBottomWidth: 2, opacity: 1, maxWidth: 10.67}}/>
        </TouchableOpacity>
      </View>
      <Gap height={21}/>
      <View style={{borderBottomColor: 'black',borderBottomWidth: 2, opacity: 0.2, marginVertical:12 }}/> 
      <View style={styles.caption}>
        {/* caption */}
        <View style={{height: 130}}> 
          <Logo height={157}/>
        </View>
        <View>
           <Text style={styles.text1}>Auto OnServ</Text>
        </View>
        <View>
          <Text style={styles.text2}>Service anywhere anythime!</Text>
        </View>
      </View>
      <View style={{borderBottomColor: 'black',borderBottomWidth: 2, opacity: 0.2, marginVertical:12 }}/> 
      <Gap height={50}/>
      <View style={styles.content}>
        {/* Content */}
        <View style={{flexDirection:'row'}}>
          <Text style={styles.text3}>Status: </Text>
          
          { isEnabled?
          <Text style={styles.text4a}> Aktif</Text>
          :
          <Text style={styles.text4b}>Tidak Aktif</Text>
          }
        </View>
        <View style={styles.switchContainer}>
          <Switch
            style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
            trackColor={{ false: "#767577", true: "#38B000" }}
            thumbColor={isEnabled ? "#ffff" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
       </View>

      </View>
      <Gap height={250}/>
      <View>
          {/* bottom button */}
          <Button 
          style={styles.button}
          name='Permintaan Service'
          color = 'white'
          textAlign='center'
          size = {18}
          fam = 'Nunito'
          />
      </View>
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
  switchContainer: {
    flex: 1,
    alignItems:"flex-end",
    marginRight:28
    // justifyContent: "center"
  },
  content:{
    marginHorizontal: 12
  },
  button:{
    marginHorizontal: 144,
    height: 50,
    backgroundColor: '#5E6B73',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
    ImageStyle: {
      padding: 10,
      marginTop: 40,
      marginBottom: 35,
      height: 87,
      width: 87,
      borderRadius:43.5,
      resizeMode: 'stretch',
      alignItems: 'center',
  }

})



const Drawer = createDrawerNavigator();

export default function HomePageBengkel() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home"
       screenOptions={
         {
           headerShown: false,
           drawerStyle: {
            backgroundColor: 'white',
            width: 318,
            height:436,
            shadowColor:'black'
          }
         }
        }
      drawerContent={props => <DrawerContent{...props}/>}
      >
        <Drawer.Screen name="Profil" component={HomeScreen}/>
        <Drawer.Screen name="Riwayat" component={Riwayat}/>
        <Drawer.Screen name="LogOut" component={LogOut}/>
        <Drawer.Screen name="TanggapanDanSaran" component={TanggapanDanSaran}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const Riwayat = () =>{
  return(
    <Text>Riwayat</Text>
  )
}

const LogOut = () =>{
  return(
    <Text>LogOut</Text>
  )
}

const TanggapanDanSaran = () =>{
  return(
    <Text>TanggapanDanSaran</Text>
  )
}

 function DrawerContent(props){


    return(
        <View style ={{flex: 1}} >
          <View style={{flexDirection:'column', marginLeft: 10}}>
            <View>
            <Image
              source={require('../../assets/images/fotoprofil.jpg')} //Change your icon image here
                style={styles.ImageStyle}
              />
            </View>
            <View>
              <Text style={{fontFamily:'Nunito', fontWeight:'700', fontSize:24, color: 'black'}}>Bengkel Motorjaya</Text>
              </View>
            <View>
              <Text style={{fontFamily:'Nunito', fontWeight:'200', fontSize:18, color: 'black'}}>+6281356510077</Text>
              </View>
            <View>
              <Text style={{fontFamily:'Nunito', fontWeight:'200', fontSize:18, color: 'black'}}>motorjaya@gmail.com</Text>
            </View>
          </View>
          <View style={{borderBottomColor: 'black',borderBottomWidth: 2, opacity: 0.2, marginVertical:12 }}/> 
          
          <TouchableOpacity  onPress={()=>{props.navigation.navigate('Home')}}>
                    <View style={{flexDirection:"row", alignItems:'center'}}>
                      <Logo height={25}/>
                      <Text style={{fontFamily:'Nunito', fontWeight:'700', fontSize:18, color: 'black'}}>Profil</Text>
                    </View>
          </TouchableOpacity>
            <Gap height={20}/>
          <TouchableOpacity  onPress={()=>{props.navigation.navigate('Home')}}>
                    <View style={{flexDirection:"row", alignItems:'center'}}>
                      <Logo height={25}/>
                      <Text style={{fontFamily:'Nunito', fontWeight:'700', fontSize:18, color: 'black'}}>Riwayat</Text>
                    </View>
          </TouchableOpacity>
          <Gap height={20}/>
          <TouchableOpacity  onPress={()=>{props.navigation.navigate('Home')}}>
                    <View style={{flexDirection:"row", alignItems:'center'}}>
                      <Logo height={25}/>
                      <Text style={{fontFamily:'Nunito', fontWeight:'700', fontSize:18, color: 'black'}}>Log out</Text>
                    </View>
          </TouchableOpacity>
          <Gap height={20}/>
          <TouchableOpacity  onPress={()=>{props.navigation.navigate('Home')}}>
                    <View style={{flexDirection:"row", alignItems:'center'}}>
                      <Logo height={25}/>
                      <Text style={{fontFamily:'Nunito', fontWeight:'700', fontSize:18, color: 'black'}}>Tanggapan dan Saran</Text>
                    </View>
          </TouchableOpacity>


          </View>
    )
}
