import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Register,Login,SplashScreen,LoginOptions,LoginBengkel,LoginCustomer,RegisterBengkel,RegisterBengkelMotor,RegisterBengkelMobil} from '../pages';

const {Navigator,Screen} = createNativeStackNavigator();

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
    </Navigator>
  );
};

export default Router;
