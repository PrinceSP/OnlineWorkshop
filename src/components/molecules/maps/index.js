import React, {useState,useRef,useEffect} from "react"
import {StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native"
import MapView, { Callout, Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps"
import {CustomMarker} from '../../../assets'
import Geocoder from 'react-native-geocoding';

const MapFinder = ({getGeometrics,navigation})=>{
	const [ region, setRegion ] = useState({
		latitude: 1.4730796311491023,
		longitude: 124.85402639232787,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	})
  const [desc,setDetails] = useState(null)

  const datas = {region,desc}

  const mapRef = useRef(region)
	const queryRef = useRef(null)

  Geocoder.init("AIzaSyB-lpOPCdsdF7SluzBjETaOIfT-ZDgX2ZA",{language : "en"}); // use a valid API key
  Geocoder.from(region)
  		.then(res => {
        const addressComponent = res.results[0].formatted_address;
        const address = addressComponent.split(',').splice(1,5).join(',')
  			setDetails(address);
        // console.log('data from address: '+address);
  		})
  		.catch(error => console.warn(error));

	const goToCurrentRegion=()=>{
		mapRef.current.animateToRegion(region,300)
	}

  const clearing=()=>{
    queryRef.current?.clear()
  }

  useEffect(()=>{
    getGeometrics(datas)
		console.log(datas);
  },[desc])

  useEffect(()=>{
    return ()=> console.log('clean up');
  },[])

	return (
		<View style={{flex:1}}>
			<View style={style.mapContainer}>
				<MapView
					ref={map=>mapRef.current=map}
					style={style.map}
          initialRegion={region}
					provider={PROVIDER_GOOGLE}
					onPress={goToCurrentRegion}
				>
					<Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} image={CustomMarker} title="I'm Here"
					description={desc}/>
					<Marker
						coordinate={region}
						draggable={true}
            onDragEnd={(e) => {
              setRegion({
                ...region,
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              })
              getGeometrics(datas)
            }}
						image={CustomMarker}
						title="I'm Here"
						description={desc}
					/>
				</MapView>
			</View>
		</View>
	)
}

const style = StyleSheet.create({
	mapContainer:{flex:1},
  map: {
    ...StyleSheet.absoluteFill,
		marginBottom:0
  },
	placesContainer: {width: "95%",position:'absolute',top:20,left:"3%"},
	listView:{minHeight:50,color:'#000'}
})

export default MapFinder
