import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegisterBengkel from '../pages/registerBengkel';
// import { SignIn, SplashScreen, SignUp, Home } from '../pages';


const Stack = createNativeStackNavigator();
const Router = () =>{
    return (
        <Stack.Navigator>
            <Stack.Screen name="RegisterBengkel" component={RegisterBengkel}options={{headerShown: false}}/>
            <Stack.Screen name="RegisterBengkel" component={RegisterBengkel}options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};

export default Router;