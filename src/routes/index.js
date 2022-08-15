import React,{useState,useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Register,Login,SplashScreen,LoginOptions,LoginBengkel,LoginCustomer,RegisterBengkel,
  RegisterBengkelMotor,RegisterBengkelMobil,HomeScreen,ProfileBengkel,HomepageCustomer} from '../pages';
import {DrawerContent} from '../components'

const {Navigator,Screen} = createNativeStackNavigator();
const Drawer = createDrawerNavigator()

const Root=()=>{
  const[userType,setUserType] = useState(false)
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

  return(
    <Drawer.Navigator initialRouteName="HomeScreen"
      drawerContent={props=><DrawerContent {...props}/>}
      screenOptions={{
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
      <Drawer.Screen name="HomepageCustomer" component={HomepageCustomer} options={{headerShown: false}}/>
      <Drawer.Screen name="ProfileBengkel" component={ProfileBengkel} options={{headerShown:false}}/>
    </Drawer.Navigator>
  )
}

const Router = () =>{
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
    </Navigator>
  );
};

export default Router;
