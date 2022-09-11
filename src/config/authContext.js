import React, {createContext,useReducer} from 'react'
import AuthReducer from './authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'

const data = async()=>{
  const userDataToString= JSON.stringify(await AsyncStorage.getItem("@user"))
  const userData= JSON.parse(userDataToString || null)
  // console.log(userData._changes[0]._nativeData);
  return userData
}

const INITIAL_STATE = {
  // user:null,
  user:data(),
  isFetching:false,
  error:false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children})=>{
  const [state,dispatch] = useReducer(AuthReducer,INITIAL_STATE)
  return(
    <AuthContext.Provider value={{user:state.user, isFetching:state.isFetching, error:state.error,dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}
