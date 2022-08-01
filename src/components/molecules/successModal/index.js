import React, {useEffect,useState} from 'react'
import {View,Text,StyleSheet,Modal} from 'react-native'

const ModalSuccess = ({visible,children})=>{
  const [show,setShow] = useState(visible)
  useEffect(()=>{
    toggleModal()
  },[visible])

  const toggleModal = ()=>{
    if (visible) {
      setShow(true)
    }else{
      setShow(false)
    }
  }

  return(
    <Modal transparent visible={show}>
      <View style={modalBg}>
        {children}
      </View>
    </Modal>
  )
}

const style = StyleSheet.create({
  modalBg:{
    flex:1,
    backgroundColor:'rgba(0, 0, 0, 0.43)',
    alignItems:'center',
    justifyContent:'center'
  }
})

const {modalBg} = style

export default ModalSuccess
