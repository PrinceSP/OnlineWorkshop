import React from 'react'
import {View,Text,StyleSheet,TextInput} from 'react-native'
import {Gap} from '../../atoms'

const FeedbackForm =({desc,onChangeText})=>{
  return(
    <View style={feedbackContainer}>
      <Gap height={37}/>
      <View style={feedbackTextContainer}>
        <TextInput style={textArea}
          underlineColorAndroid="transparent"
          placeholderTextColor="#C0A8C2"
          numberOfLines={10}
          multiline={true}
          defaultValue={desc}
          placeholder={`leave me any suggestions, doubts or claims to improve:)`}
          onChangeText={onChangeText}/>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  feedbackContainer:{shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius:20,
    elevation: 7,
    alignItems:'center',
    paddingTop:28,
    borderRadius:20,
    backgroundColor : "#fff",
    height:328,
    width:339
  },
  headingWrapper:{flexDirection:'row'},
  headingText:{fontSize:16,fontFamily:'Poppins-SemiBold'},
  comment:{textAlign:'center',width:230,marginTop:5,color:'#999'},
  feedbackTextContainer:{height:170,marginBottom:20,width:300,borderRadius:6,backgroundColor:'#FBEFEF'},
  textArea: {
    textAlignVertical: 'top',
    fontSize:18,
    paddingHorizontal:15,
    color:'#000'
  }
})

const {textArea,mainWrapper,innerWrapper,feedbackContainer,headingWrapper,headingText,comment,feedbackTextContainer,modalBg,modalContainer} = style

export default FeedbackForm
