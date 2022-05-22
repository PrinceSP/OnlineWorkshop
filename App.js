import React from 'react';
import {ImageBackground,View,Text,StyleSheet,Dimensions} from 'react-native'
import {ManWithCarRepair,ManWithMotoRepair,Logo} from './src/assets'
import {Input,Gap,Button} from './src/components'

const {width,height} = Dimensions.get('window')

const App = () => {
  return(
    <View style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:"center",width:"100%"}}>
        <Logo height={70} width={70}/>
        <Text style={{color:'#000000',fontSize:24,fontFamily:"Nunito-Bold",marginLeft:15}}>Auto OnServ</Text>
      </View>
      <ManWithCarRepair height={300}/>
      <ManWithMotoRepair height={300}/>
    </View>
  )
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff',
    paddingHorizontal:20
  }
})

export default App;
