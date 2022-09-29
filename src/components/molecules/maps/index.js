import React, {useState,useRef,useEffect} from "react"
import {StyleSheet, Text, View, TextInput, TouchableOpacity,PermissionsAndroid,PlatForm } from "react-native"
import {CustomMarker,Pointer,ArrowLeft} from '../../../assets'
import MapView, { Callout, Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps"
import Geocoder from 'react-native-geocoding';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service'

const MapFinder = ({getGeometrics,regions,flags})=>{
	const [ region, setRegion ] = useState({
		latitude: regions?.latitude[1] || 1.4730796311491023,
		longitude: regions?.longitude[1] || 124.8540263923278,
		latitudeDelta: regions?.latitudeDelta[1] || 0.0922,
		longitudeDelta: regions?.longitudeDelta[1] || 0.0421,
	})
	const [destination,setDestination] = useState({
		latitude:  1.4730796311491023,
		longitude:  124.8540263923278,
		latitudeDelta:  0.0922,
		longitudeDelta:  0.0421,
	})
  const [desc,setDetails] = useState(null)
  const [descTwo,setDetailsTwo] = useState(null)
	const [distance,setDistance] = useState('')
	const [time,setTime] = useState('')
	const [isTracing,setIsTracing] = useState(false)

	// console.log(distance.toFixed(2),Math.ceil(time));
	// console.log(distance.toFixed(1)*3.85,Math.ceil(time));

  const datas = {region,desc,distance,time}
	// console.log(regions);
  const mapRef = useRef(region)
	const queryRef = useRef(null)
	const queryRefTwo = useRef(null)
	// console.log(queryRef.current.getAddressText());
	// console.log(queryRefTwo.current.getAddressText());
// console.log(mapRef);
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

	const locationPermission=()=>{
		new Promise(async (resolve,reject)=>{
				if (PlatForm.OS==="ios") {
					try {
						const permissionStatus = await Geolocation.requestAuthorization('whenInUse')
						if (permissionStatus==='granted') {
							return resolve('granted')
						}
						reject("permission not granted")
					} catch (e) {
						return reject(e)
					}
				}
				return PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				).then((granted)=>{
					if (granted===PermissionsAndroid.RESULTS.GRANTED) {
						resolve('granted')
					}
					return reject('Location Permission Denied')
				}).catch(e=>{
					return reject(e)
				})
			})
	}


	const edgePadding={top:50,right:50,bottom:50,left:50}

	const trace=()=>{
		if (region && destination) {
			setIsTracing(true)
			mapRef.current.fitToCoordinates([region,destination],{edgePadding})
			// console.log(mapRef.current.fitToCoordinates);
		}
	}

  useEffect(()=>{
    getGeometrics(datas)
		// console.log(datas);
  },[desc,descTwo,distance,time])

  useEffect(()=>{
    return ()=> console.log('clean up');
  },[])

	return (
		<View style={style.mapContainer}>
			<MapView
				ref={map=>mapRef.current=map}
				style={style.map}
        initialRegion={region}
				provider={PROVIDER_GOOGLE}
				onPress={goToCurrentRegion}
				userLocationUpdateInterval={700}
				showsUserLocation={true}
				showsMyLocationButton={true}
			>
				{region && <Marker coordinate={region}
				title="I'm Here"
				description={desc}
				image={CustomMarker}/>}
				{destination && <Marker coordinate={destination}
				title="I'm Here"
				description={descTwo} />}
				{isTracing && region && destination && <MapViewDirections
	          origin={region}
	          destination={destination}
	          apikey="AIzaSyB-lpOPCdsdF7SluzBjETaOIfT-ZDgX2ZA" // insert your API Key here
	          strokeWidth={4}
	          strokeColor="#7799ff"
						onReady={(args)=>{
							if (args) {
								setDistance(args.distance)
								setTime(args.duration)
							}
						}}
						timePrecision='now'
	        />}
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
			<View style={style.placesContainer}>
				<Text style={{fontFamily:"Nunito-Bold",color:"#444"}}>From</Text>
				<GooglePlacesAutocomplete
					ref={queryRef}
					placeholder={desc?desc:"Search your location here...."}
					returnKeyType={'search'}
					autoFocus={true}
					listViewDisplayed='auto'
					fetchDetails={true}
					renderDescription={row=>row.description}
					GooglePlacesSearchQuery={{
						rankby: "distance"
					}}
					GooglePlacesDetailsQuery={{
						fields:['formatted_address','geometry']
					}}
					enablePoweredByContainer={false}
					onPress={(data, details = null) => {
						// 'details' is provided when fetchDetails = true
						// update the region by its latitude and longitude
						setRegion({...region,
							latitude: details.geometry.location.lat,
							longitude: details.geometry.location.lng,
						})
						setDetails(data?.description)
						getGeometrics(datas)
						console.log(details.geometry.location);
						// console.log('data from query: '+data?.description);
					}}
					query={{
						key: "AIzaSyB-lpOPCdsdF7SluzBjETaOIfT-ZDgX2ZA",
						language: "en",
						components: "country:id",
						types: "establishment",
						radius: 30000,
						location: `${region.latitude}, ${region.longitude}`
					}}
					textInputProps={{
						placeholderTextColor: '#899',
						InputComp: TextInput,
					}}
					styles={{
						listView:style.listView,
						textInputContainer: {
							alignItems:'center',
							justifyContent:'space-between'
						},
						textInput:{color:'#000',borderColor:"#888",borderWidth:1},
						description:{
							fontWeight:'bold',
							color:'#000',
						}
					}}
				/>
				<Text style={{fontFamily:"Nunito-Bold",color:"#444"}}>Destination</Text>
				<GooglePlacesAutocomplete
					ref={queryRefTwo}
					placeholder={descTwo?descTwo:"Search your location here...."}
					returnKeyType={'search'}
					autoFocus={true}
					listViewDisplayed='auto'
					fetchDetails={true}
					renderDescription={row=>row.description}
					GooglePlacesSearchQuery={{
						rankby: "distance"
					}}
					GooglePlacesDetailsQuery={{
						fields:['formatted_address','geometry']
					}}
					enablePoweredByContainer={false}
					onPress={(data, details = null) => {
						// 'details' is provided when fetchDetails = true
						// update the region by its latitude and longitude
						setDestination({...destination,
							latitude: details.geometry.location.lat,
							longitude: details.geometry.location.lng,
						})
						setDetailsTwo(data.description)
						console.log(details.geometry.location);

						// getGeometrics(datas)
						// console.log('data from query: '+data?.description);
					}}
					query={{
						key: "AIzaSyB-lpOPCdsdF7SluzBjETaOIfT-ZDgX2ZA",
						language: "en",
						components: "country:id",
						types: "establishment",
						radius: 30000,
						location: `${destination.latitude}, ${destination.longitude}`
					}}
					textInputProps={{
						placeholderTextColor: '#899',
						InputComp: TextInput,
					}}
					styles={{
						listView:style.listView,
						textInputContainer: {
							alignItems:'center',
							justifyContent:'space-between'
						},
						textInput:{color:'#000',borderColor:"#888",borderWidth:1},
						description:{
							fontWeight:'bold',
							color:'#000',
						}
					}}
				/>
			<TouchableOpacity onPress={trace} style={{width:'100%',height:40,backgroundColor:"#5E6B73",borderRadius:6,alignItems:'center',justifyContent:'center'}}>
				<Text style={{fontFamily:"Nunito-Bold",color:"#fff",fontSize:16}}>Trace Route</Text>
			</TouchableOpacity>
			</View>

		</View>
	)
}

const style = StyleSheet.create({
	mapContainer:{flex:1,alignItems:'center',justifyContent:'center'},
  map: {
    ...StyleSheet.absoluteFill,
		// marginBottom:0
  },
	placesContainer: {
		position:'absolute',
		width: "90%",
		backgroundColor:"#fff",
		shadowColor:"#000",
		shadowOffset:{
			width:2,
			height:2
		},
		shadowOpacity:0.4,
		shadowRadius:4,
		elevation:4,
		padding:8,
		borderRadius:8,
		top:30
	},
	listView:{minHeight:50,color:'#000'}
})

export default MapFinder
