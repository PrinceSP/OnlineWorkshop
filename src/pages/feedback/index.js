import React from 'react';
import {View,Text,StyleSheet,ScrollView} from 'react-native'
import {FeedbackIllustrations} from '../../assets'
import {Input,Gap,Button,FeedbackForm,ModalSuccess,Header} from '../../components'

const Feedback = ({navigation}) => {
  return (
    <View style={{flex:1,backgroundColor:"#fff"}}>
      <Gap height={15}/>
      <Header name="Tanggapan dan Saran" btn="customer" navigation={navigation}/>
      <Gap height={15}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/*<ModalSuccess visible={visible}>
          <View style={modalContainer}>
            <Text onPress={()=>setVisible(false)} style={{fontSize:28,position:'absolute',right:30,top:24,color:'#000'}}>X</Text>
            <ModalSuccessIcon height={120} width={120}/>
            <View style={[headingWrapper,{marginTop:21}]}>
              <Text style={[{color:'#823589'},headingText]}>Thank you so much,</Text>
              <Text style={[{color:'#718496',marginLeft:4},headingText]}>{currentUser[0].username}!</Text>
            </View>
            <Text style={comment}>Your feedback will help us improve our app</Text>
            <View style={[headingWrapper,{marginTop:50}]}>
              <Text style={{fontSize:15,fontFamily:'Poppins-SemiBold',color:'#C0A8C2'}}>Need some help?</Text>
              <Text style={{color:'#E550F2',marginLeft:4,fontSize:15,fontFamily:'Poppins-SemiBold'}}>Contact Us!</Text>
            </View>
          </View>
        </ModalSuccess>*/}
        <View style={style.innerWrapper}>
          <FeedbackIllustrations height={207}/>
          <FeedbackForm/>
          <Gap height={26}/>
          <Button style={style.button} name="Kirim"
            color="#fff"
            fam='Nunito-Bold' size={24}
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
