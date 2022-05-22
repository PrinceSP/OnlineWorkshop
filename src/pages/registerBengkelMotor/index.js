import { StyleSheet, Text, View, Image, TextInput, ScrollView, SafeAreaView} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import React from 'react'
import { Button, Gap } from '../../components'

const RegisterBengkelMotor = () => {
  return (
    <>
        <View style={styles.containerHeader}>
                <View style={styles.arrowLeft}>
                <AntDesign name ="arrowleft" size={25} color='black'/>
                </View>
                <View>
                    <Text style={styles.titleHeader}>Lengkapi Profil</Text>
                </View>
            </View>
            <View style={{borderBottomColor: 'black',borderBottomWidth: 2, opacity: 0.2, marginVertical:12 }}/> 
            <View style={styles.content}>
                <View>
                    <Text style={{fontWeight: 'bold', color:'black'}}>Jenis Bengkel yang dipilih</Text>    
                </View>
                <Gap height={20}/>
                <View style={styles.category}>
                        <Text style={{fontWeight: 'bold', color:'black'}}>Bengkel Motor</Text>
                </View>
                <View>
                <View style={styles.containerImage}>
                    <Image
                        source={require('../../assets/images/fotoprofil.jpg')} //Change your icon image here
                        style={styles.ImageStyle}
                        />
                </View>
                </View>
        </View>
          
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
            <View style={styles.containerInput}>
                <Text style={styles.textTitle}>Nama Bengkel</Text>
                <TextInput
                    style={styles.input}
                    />
            </View>
            <Gap height={20}/>
            <View style={styles.containerInput}>
                <Text style={styles.textTitle}>Alamat</Text>
                <TextInput
                    style={styles.input}
                    />
            </View>
            <Gap height={20}/>
            <View style={styles.containerInput}>
                <Text style={styles.textTitle}>Nama Bengkel</Text>
                <TextInput
                    style={styles.input}
                />
            </View>
            <Gap height={20}/>
            <View style={styles.containerInput}>
                <Text style={styles.textTitle}>Email</Text>
                <TextInput
                    style={styles.input}
                />
            </View>
            <Gap height={20}/>
            <View style={styles.containerInput}>
                <Text style={styles.textTitle}>Nomor HP</Text>
                <TextInput
                    style={styles.input}
                />
            </View>
            <Gap height={20}/>
            <View style={styles.containerInput}>
                <Text style={styles.textTitle}>Password</Text>
                <TextInput
                    style={styles.input}
                    />
            </View>
            <Gap height={20}/>
            <View style={styles.containerInput}>
                <Text style={styles.textTitle}>Konfirmasi Password</Text>
                <TextInput
                    style={styles.input}
                />
            </View>
            <Gap height={20}/>

            <Button 
            style={styles.button}
            name='Lanjut'
            size = {24}
            weight = 'bold'
            color ='white'
            />
        </ScrollView>
        <Gap height={20}/>  
    </>
  )
}

export default RegisterBengkelMotor

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
  },
    containerHeader:{
        // backgroundColor: 'red',
        flexDirection: 'column',
        justifyContent: 'space-between',  
        marginLeft: 10,  
        marginRight: 20  
    },
    textTitle:{
        fontWeight:'500',
        marginBottom:10,
        color: 'black'
    },
    titleHeader:{
        fontSize: 36,
        color: 'black',
        fontWeight: '500'
    },
    content:{
        flexDirection: 'column',
        marginLeft: 36,
        fontSize: 18,
        fontWeight: '700'
    },
    category:{
        flexDirection: 'row',
    },
    containerImage:{
        alignItems:'center', 
        justifyContent:'center'
      },
      ImageStyle: {
        padding: 10,
        marginTop: 40,
        marginBottom: 35,
        height: 87,
        width: 87,
        borderRadius:43.5,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    input:{
        borderWidth:1,
        borderColor: '#020202',
        borderRadius: 8,
        paddingLeft: 10,
        paddingHorizontal: 10
    },
    containerInput:{
        marginHorizontal: 16
    },
    button:{
        marginHorizontal: 10,
        height: 50,
        backgroundColor: '#5E6B73',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    }
    
    
})
