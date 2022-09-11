import React,{useState,useContext} from 'react';
import {View,Text,StyleSheet,ScrollView} from 'react-native'
import {FeedbackIllustrations,SuccessIcon} from '../../assets'
import {Input,Gap,Button,FeedbackForm,ModalSuccess,Header} from '../../components'
import firestore from '@react-native-firebase/firestore'
import {AuthContext} from '../../config/authContext'

const Feedback = ({navigation}) => {
  const [visible,setVisible] = useState(false)
  const [feedback,setFeedback] = useState('')
  const {user:currentUser} = useContext(AuthContext)

  const submit = ()=>{
    firestore().collection('feedback')
    .add({
      feedback:feedback,
      owner:currentUser[0]
    })
    .then(() => {
      console.log('User added!');
      setFeedback('')
      setVisible(true)
    });
  }

  return (
    <View style={{flex:1,backgroundColor:"#fff"}}>
      <ModalSuccess visible={visible}>
        <View style={style.modalContainer}>
          <Text onPress={()=>setVisible(false)} style={{fontSize:28,position:'absolute',right:30,top:24,color:'#000'}}>X</Text>
          <SuccessIcon height={120} width={120}/>
          <View style={[style.headingWrapper,{marginTop:21}]}>
            <Text style={[{color:'#823589'},style.headingText]}>Terima kasih,</Text>
            <Text style={[{color:'#718496',marginLeft:4},style.headingText]}>Yoel Roring!</Text>
          </View>
          <Text style={style.comment}>Terimakasih atas feedback yang di berikan!</Text>
        </View>
      </ModalSuccess>
      <Gap height={15}/>
      <Header name="Tanggapan dan Saran" btn="customer" navigation={navigation}/>
      <Gap height={15}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.innerWrapper}>
          <FeedbackIllustrations height={207}/>
          <FeedbackForm desc={feedback} onChangeText={value=>setFeedback(value)}/>
          <Gap height={26}/>
          <Button style={style.button} name="Kirim"
            color="#fff"
            fam='Nunito-Bold' size={24} onPress={submit}
            />
        </View>
      </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
  button:{
    marginBottom:15,
    backgroundColor:'#5E6B73',
    height:66,
    width:330,
    borderRadius:15,
    alignItems:'center',
    justifyContent:'center'
  },
  innerWrapper:{alignItems:'center'},
  headingWrapper:{flexDirection:'row'},
  headingText:{fontSize:16,fontFamily:'Poppins-SemiBold'},
  comment:{textAlign:'center',width:230,marginTop:5,color:'#999'},
  modalBg:{
    flex:1,
    backgroundColor:'rgba(0, 0, 0, 0.43)',
    alignItems:'center',
    justifyContent:'center'
  },
  modalContainer:{
    backgroundColor:'#fff',
    minHeight:405,
    minWidth:329,
    borderRadius:20,
    alignItems:'center',
    paddingVertical:64
  }
})


export default Feedback
