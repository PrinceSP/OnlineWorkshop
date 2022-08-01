import { StyleSheet, Text, View, Image, TextInput, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native'
import React,{useState} from 'react'
import {launchImageLibrary} from 'react-native-image-picker';
import { Button, Gap } from '../../components'

import { ArrowLeft, MotoLogo } from '../../assets'

const RegisterBengkelMotor = () => {

    const [photo, setPhoto] = useState('');
    const [hasPhoto, setHasPhoto] = useState(false);
    const getPhoto = async () => {
      const result = await launchImageLibrary({
        maxHeight: 200,
        maxWidth: 200,
        includeBase64: true,
      });
      if (result.didCancel) {
          if(!hasPhoto){
              setHasPhoto(false);
          }
      } else {
        setPhoto(result.assets[0].uri);
        setHasPhoto(true);
      }
    };

  return (
    <>
        <View style={styles.containerHeader}>
            <Gap height={20}/>
                <View style={styles.arrowLeft}>
                    <ArrowLeft height={13} widdth={14}/>
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
                <View  style={{flexDirection:'row',alignItems:'center'}}>
                    <View>
                        <MotoLogo height={61} width={64}/>
                    </View>
                    <Gap width={16}/>
                    <View style={styles.category}>
                            <Text style={{fontWeight: 'bold', color:'black'}}>Bengkel Motor</Text>
                    </View>
                </View>
                <View>
                    <View style={styles.containerImage}>
                        <View style={styles.avatarWrapper}>
                            <View style={styles.border}>
                                <TouchableOpacity onPress={getPhoto} activeOpacity={0.5}>
                                    {!hasPhoto && (
                                        <View style={styles.addPhoto}>
                                        <Text style={styles.addPhotoText}>Add Photo</Text>
                                    </View>
                                )}
                                    {hasPhoto && (
                                        <Image source={{uri: photo}} style={styles.avatar} />
                                )}
                                </TouchableOpacity>
                            </View>
                                <TouchableOpacity 
                                    onPress={()=>setHasPhoto(false)}
                                    style={{width:20, height:20, backgroundColor:'orange', borderRadius:10, borderWidth:0, position:'absolute', top:3, right:5, justifyContent:'center', alignItems:'center'}}>
                                    <Text style={{color:'white'}}>x</Text>
                                </TouchableOpacity>
                        </View>
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
    },

    addPhoto: {
        height: 90,
        width: 90,
        backgroundColor: '#E5E5E5',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 90,
      },
      avatar: {
        height: 90,
        width: 90,
        borderRadius: 90,
      },
      addPhotoText: {
        fontSize: 12,
        fontFamily: 'Inter',
        maxWidth: 40,
        textAlign: 'center',
      },
    
      border: {
        borderWidth: 1,
        borderColor: '8D92A3',
        width: 110,
        height: 110,
        borderRadius: 110,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'dashed',
      },
    
      avatarWrapper: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 1,
      }   
})
