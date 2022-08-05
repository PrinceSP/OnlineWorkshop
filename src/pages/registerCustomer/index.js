import React, {useState} from 'react'
import {ImageBackground,View,Text,StyleSheet,Dimensions,TouchableOpacity} from 'react-native'
import {Input,Gap,Button} from '../../components'
import {Camera,ArrowLeft} from '../../assets'
import {launchImageLibrary} from 'react-native-image-picker'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Register = ({navigation}) => {
  const [photo,setPhoto] = useState('')
  const [hasPhoto, setHasPhoto] = useState(false)
  const [photoBase64,setPhotoBase64] = useState('')

  const imageGallery = ()=>{
    const options={
      maxHeight:400,
      maxWidth:400,
      includeBase64:true,
    }
    launchImageLibrary(options,res=>{
      if(res.didCancel){
        setHasPhoto(false)
        setPhoto('');
        setPhotoBase64('');
      }else{
        setPhoto(res.assets[0].uri);
        setPhotoBase64(res.assets[0].base64);
        setHasPhoto(true);
      }
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={imageGallery} style={{height:80,width:80,borderRadius:50,borderWidth:2,borderColor:"#000",alignItems:"center",justifyContent:"center"}}>
        <Camera/>
      </TouchableOpacity>
      <Input setLabel={true} label="Email" borderRadius={10} width={windowWidth/1.22}/>
      <Gap height={15}/>
      <Input setLabel={true} label="Password" borderRadius={10} width={windowWidth/1.22}/>
      <Gap height={15}/>
      <Input setLabel={true} label="Email" borderRadius={10} width={windowWidth/1.22}/>
      <Gap height={15}/>
      <Input setLabel={true} label="Password" borderRadius={10} width={windowWidth/1.22}/>
      <Gap height={25}/>
      <Button name='Daftar' color='#000' fam='Nunito-Regular' size={20} style={styles.btnSubmit} onPress={()=>navigation.navigate('LoginOptions')}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
  },
  image:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  blurBackground:{
    width: windowWidth/1.12,
    height: windowHeight/1.15,
    backgroundColor: 'rgba(255, 252, 252, 0.82)',
    borderRadius:15,
    padding:15,
    position:'relative'
  },
  btnSubmit:{
    marginBottom:15,
    marginLeft:220,
    height:60,
    width:100,
    borderStyle:'solid',
    borderWidth:1,
    borderColor:'#000',
    borderRadius:7,
    alignItems:'center',
    justifyContent:'center',
  },
  containerHeader:{
    flexDirection: 'row',
    alignItems:'center',
    marginLeft: 15,
  },
  titleHeader:{
    fontSize: 26,
    color: '#000',
    fontWeight: '500',
    marginLeft:120
  },
})

export default Register
