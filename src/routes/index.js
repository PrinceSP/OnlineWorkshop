import React,{useState,useEffect,useContext} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Register,Login,SplashScreen,LoginOptions,LoginBengkel,LoginCustomer,RegisterBengkel,
  RegisterBengkelMotor,RegisterBengkelMobil,HomeScreen,HomepageCustomer,ProfileBengkel,Feedback,
  ProfileCustomer,HistoryPemesanan,BengkelMelaporCustomer,PermintaanService,POVLocation,CustomerHistory,
  LaporKerusakkan,CustomerMap} from '../pages';
import {DrawerContent,DrawerContentCustomer} from '../components'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {AuthContext} from '../config/authContext'

const {Navigator,Screen} = createNativeStackNavigator();
const Drawer = createDrawerNavigator()
const DrawerTwo = createDrawerNavigator()

const CustomerDrawer = ()=>{
  return(
    <DrawerTwo.Navigator initialRouteName="HomepageCustomer"
      id="customerDrawer"
      drawerContent={props=><DrawerContentCustomer {...props}/>}
      screenOptions={{
        drawerPosition: 'right',
        drawerStyle: {
          backgroundColor: '#FFFFFF',
          width: 300,
          borderTopRightRadius:20,
          borderBottomRightRadius:20,
        },
        focused:Boolean,
        drawerActiveBackgroundColor:'#abcdef'
      }}>
      <DrawerTwo.Screen name="HomepageCustomer" component={HomepageCustomer} options={{headerShown: false}}/>
      <DrawerTwo.Screen name="ProfileCustomer" component={ProfileCustomer} options={{headerShown:false}}/>
      <DrawerTwo.Screen name="CustomerHistory" component={CustomerHistory} options={{headerShown:false}}/>
      <DrawerTwo.Screen name="Feedback" component={Feedback} options={{headerShown:false}}/>
      <DrawerTwo.Screen name="LaporKerusakkan" component={LaporKerusakkan} options={{headerShown:false}}/>
      <DrawerTwo.Screen name="CustomerMap" component={CustomerMap} options={{headerShown:false}}/>
    </DrawerTwo.Navigator>
  )
}

const Root=()=>{

  return(
    <Drawer.Navigator initialRouteName="HomeScreen"
      id='root'
      drawerContent={props=><DrawerContent {...props}/>}
      screenOptions={{
        drawerPosition: 'left',
        drawerStyle: {
          backgroundColor: '#FFFFFF',
          width: 300,
          borderTopRightRadius:20,
          borderBottomRightRadius:20,
        },
        focused:Boolean,
        drawerActiveBackgroundColor:'#abcdef'
      }}>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
      <Drawer.Screen name="ProfileBengkel" component={ProfileBengkel} options={{headerShown:false}}/>
      <Drawer.Screen name="HistoryPemesanan" component={HistoryPemesanan} options={{headerShown:false}}/>
      <Drawer.Screen name="BengkelMelaporCustomer" component={BengkelMelaporCustomer} options={{headerShown:false}}/>
      <Drawer.Screen name="PermintaanService" component={PermintaanService} options={{headerShown:false}}/>
      {/*<Drawer.Screen name="POVLocation" component={POVLocation} options={{headerShown:false}}/>*/}
    </Drawer.Navigator>
  )
}

const Router = () =>{
  const {user:currentUser} = useContext(AuthContext)
  const datas = []
  const userData = JSON.stringify(currentUser, (key, val)=>{
     if (val != null && typeof val == "object") {
          if (datas.indexOf(val) >= 0) {
              return;
          }
          datas.push(val);
      }
      return val;
  });
  // const userData = JSON.stringify(currentUser)
  const userReal = JSON.parse(userData || null)
  console.log(userReal?._j);

  // const[viewedOnBoarding,setViewedOnBoarding] = useState(false)
  // const checkOnBoarding = async()=>{
  //   try {
  //     const value = await AsyncStorage.getItem("@viewed")
  //     if (value!==null) {
  //       return setViewedOnBoarding(true)
  //     }else{
  //       return setViewedOnBoarding(false)
  //     }
  //   } catch (e) {
  //     return e
  //   }
  // }
  // useEffect(()=>{
  //   checkOnBoarding()
  // },[])
  return (
    <Navigator>
      <Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}}/>
      <Screen name="Register" component={Register} options={{headerShown: false}}/>
      <Screen name="LoginOptions" component={LoginOptions} options={{headerShown: false}}/>
      <Screen name="LoginBengkel" component={LoginBengkel} options={{headerShown: false}}/>
      <Screen name="LoginCustomer" component={LoginCustomer} options={{headerShown: false}}/>
      <Screen name="RegisterBengkel" component={RegisterBengkel} options={{headerShown: false}}/>
      <Screen name="RegisterBengkelMotor" component={RegisterBengkelMotor} options={{headerShown: false}}/>
      <Screen name="RegisterBengkelMobil" component={RegisterBengkelMobil} options={{headerShown: false}}/>
      <Screen name="Root" component={Root} options={{headerShown:false}}/>
      <Screen name="CustomerDrawer" component={CustomerDrawer} options={{headerShown:false}}/>
    </Navigator>
  );
};

export default Router;
