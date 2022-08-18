import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { ArrowLeft, Edit } from '../../assets';
import { Button, Gap } from '../../components';

const BengkelMelaporCustomer = ({navigation}) => {

  const [text, onChangeText] = React.useState("");

  return (
    <View style={{flex: 1}}>
       <View style={styles.header}>
          <View style={styles.headerBackButton}>
              <ArrowLeft height={20} width={18} onPress={()=>navigation.navigate("HistoryPemesanan")}/>
          </View>
          <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitleText}>Lapor</Text>
          </View>
      </View>
      <Gap height={17}/>
      <View style={{borderBottomColor: 'black',borderBottomWidth: 2, opacity: 0.2}}/>
      <Gap height={23}/>
      <View style={styles.content}>
        <View>
        <View style={{flexDirection:'row'}}>
          <View>
            <Text style={{fontFamily:'Nunito', fontWeight:'700', fontSize: 18, color: 'black'}}>Laporkan jika ada masalah</Text>
          </View>
        <Gap width={7}/>
          <View>
            <Edit width={20}/>
          </View>
        </View>
        <Gap height={5}/>
        <View>
          <TextInput
             style={styles.textInputStyle}
             onChangeText={onChangeText}
             value={text}
            />
        </View>
        </View>
          <View style={styles.button}>
            <Button
              name='Kirim'
              size = {24}
              weight = 'bold'
              color ='white'
            />
         </View>
        </View>
        <Gap height={16}/>
    </View>
  )
}

export default BengkelMelaporCustomer;

const styles = StyleSheet.create({

  header:{
    flexDirection: 'row',
  },
  headerBackButton:{
    justifyContent:'center',
    marginLeft: 20,
  },
  headerTitleContainer:{
    marginHorizontal: 120
  },
  headerTitleText:{
    fontSize: 36,
    color:'black',
    fontFamily:'Nunito',
    fontSize: 36
  },
  textInputStyle:{
    borderWidth: 2,
    borderColor:'black',
    height: 132,
    width: '100%',
    borderRadius: 10
  },
  content:{
    marginHorizontal: 15,
    flex: 1,
    flexDirection:'column',
    // backgroundColor: 'blue',
    justifyContent: 'space-between',
  },
  button:{
    height: 50,
    backgroundColor: '#5E6B73',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
}
})
