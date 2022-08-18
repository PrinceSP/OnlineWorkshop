import React,{useState,useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Register,Login,SplashScreen,LoginOptions,LoginBengkel,LoginCustomer,RegisterBengkel,
  RegisterBengkelMotor,RegisterBengkelMobil,HomeScreen,HomepageCustomer,ProfileBengkel,
  ProfileCustomer,HistoryPemesanan,BengkelMelaporCustomer} from '../pages';
import {DrawerContent,DrawerContentCustomer} from '../components'

const {Navigator,Screen} = createNativeStackNavigator();
const Drawer = createDrawerNavigator()
const DrawerTwo = createDrawerNavigator()

const CustomerDrawer = ()=>{
  return(
    <DrawerTwo.Navigator initialRouteName="HomepageCustomer"
      id="customerDrawer"
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
      <DrawerTwo.Screen name="HomepageCustomer" component={HomepageCustomer} options={{headerShown: false}}/>
      <DrawerTwo.Screen name="ProfileCustomer" component={ProfileCustomer} options={{headerShown:false}}/>
    </DrawerTwo.Navigator>
  )
}

const Root=()=>{

  return(
    <Drawer.Navigator initialRouteName="HomeScreen"
      id="root"
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
      <Drawer.Screen name="ProfileBengkel" component={ProfileBengkel} options={{headerShown:false}}/>
      <Drawer.Screen name="HistoryPemesanan" component={HistoryPemesanan} options={{headerShown:false}}/>
      <Drawer.Screen name="BengkelMelaporCustomer" component={BengkelMelaporCustomer} options={{headerShown:false}}/>
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
      <Screen name="CustomerDrawer" component={CustomerDrawer} options={{headerShown:false}}/>
    </Navigator>
  );
};

export default Router;
