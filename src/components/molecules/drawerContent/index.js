import React, {useContext} from 'react'
import {Text,View,StyleSheet,ScrollView,Switch,Image,Platform} from 'react-native'
import {DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer'
import Share from 'react-native-share'
import {AvatarProfile,Help,ShareIcon,SignOut,HistoryIcon} from '../../../assets'
import {AuthContext} from '../../../config/authContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DrawerContent = (props)=>{
  const {user:currentUser} = useContext(AuthContext)
  // console.log(currentUser._nativeData.doc.data.namaBengkel[1]);
  const style = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:"#fff"
    },
    section:{
      paddingTop:33,
      paddingBottom:20,
      paddingLeft:16,
      borderBottomWidth:1,
      borderBottomColor:'#F1DADA'
    },
    image:{
      width:90,
      height:90,
      borderRadius:35
    },
    title:{
      fontFamily:'Lato-Bold',
      color:"#000",
      fontSize:20,
      marginTop:14
    },
    desc:{
      fontFamily:'Lato-Regular',
      color:"#000",
      fontSize:16
    },
    menu:{
      fontSize:16,
      color:"#000"
    },
    // darkModeStyle:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:20,marginTop:10},
    drawerItemsContainer:{paddingVertical:18,borderBottomWidth:1,borderBottomColor:'#F1DADA'},
  })
  const {container,section,image,title,desc,menu,drawerItemsContainer} = style

  // const logoToShare ="https://github.com/PrinceSP"

  const shareBtn = async ()=>{
    const shareOptions = {
       message: `Find the road around you that damaded or in bad condition and report it with our application`,
       title:'Share Via',
       url:'https://github.com/princesp'
     }

     try {
       const ShareResponse = await Share.open(shareOptions);
       console.log(JSON.stringify(ShareResponse));
     } catch(error) {
       console.log('Error => ', error);
     }
   };

   const signOut=async()=> {
     try {
       props.navigation.navigate('LoginOptions')
       // await AsyncStorage.removeItem("@user")
     } catch (e) {
       console.log(e);
     }
   }
   // const changeTheme = ()=>updateTheme(theme.themeMode)
  return(
    <View style={container}>
      <DrawerContentScrollView {...props}>
        <View style={container}>
          <View style={section}>
            <View>
              <Text style={title}>{currentUser._nativeData.doc.data.namaBengkel[1]}</Text>
              <Text style={desc}>+62{`${currentUser._nativeData.doc.data.noHp[1]}`}</Text>
            </View>
          </View>
          <View style={drawerItemsContainer}>
            <DrawerItem labelStyle={menu}
              icon={()=><AvatarProfile height={28} width={28}/>}
              label="Profil"
              onPress={()=>{props.navigation.navigate('ProfileBengkel')}}/>
            <DrawerItem labelStyle={menu}
              icon={()=><HistoryIcon height={28} width={28}/>}
              label="Riwayat"
              onPress={()=>{props.navigation.navigate('HistoryPemesanan')}}/>
          </View>
          <View style={[drawerItemsContainer,{paddingTop:19}]}>
            <DrawerItem labelStyle={menu}
              icon={()=><ShareIcon height={26} width={26}/>}
              label="Undang Teman"
              onPress={shareBtn}/>
            <DrawerItem labelStyle={menu}
              icon={()=><Help height={28} width={28}/>}
              label="Tanggapan dan Saran"
              onPress={()=>{props.navigation.navigate('BengkelMelaporCustomer')}}/>
          </View>
          <DrawerItem labelStyle={menu}
            icon={()=><SignOut height={28} width={28}/>}
            label="Keluar"
            onPress={signOut}/>
        </View>
      </DrawerContentScrollView>
    </View>
  )
};

export default DrawerContent;
