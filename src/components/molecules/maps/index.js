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
		latitude: 1.4730796311491023,
		longitude: 124.8540263923278,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	})
	const [destination,setDestination] = useState({
		latitude:  regions?.region.latitude[1] ||  1.4730796311491023,
		longitude:  regions?.region.longitude[1] ||  124.8540263923278,
		latitudeDelta:  regions?.region.latitudeDelta[1] ||  0.0922,
		longitudeDelta:  regions?.region.longitudeDelta[1] ||  0.0421,
	})
  const [desc,setDetails] = useState(null)
  const [descTwo,setDetailsTwo] = useState(regions.desc)
	const [distance,setDistance] = useState('')
	const [time,setTime] = useState('')
	const [isTracing,setIsTracing] = useState(false)

  const datas = {region,desc,distance,time}
	// console.log(regions);
  const mapRef = useRef(region)
	const queryRef = useRef(null)
	const queryRefTwo = useRef(null)
	// console.log(queryRef.current.getAddressText());
	// console.log(queryRefTwo.current.getAddressText());
// console.log(mapRef);
  // Geocoder.init("AIzaSyB-lpOPCdsdF7SluzBjETaOIfT-ZDgX2ZA",{language : "en"}); // use a valid API key
  // Geocoder.from(region)
  // 		.then(res => {
  //       const addressComponent = res.results[0].formatted_address;
  //       const address = addressComponent.split(',').splice(1,5).join(',')
  // 			setDetails(address);
  //       // console.log('data from address: '+address);
  // 		})
  // 		.catch(error => console.warn(error));

	const goToCurrentRegion=()=>{
		mapRef.current.animateToRegion(region,300)
	}

  const clearing=()=>{
    queryRef.current?.clear()
  }

	const getCurrentLocation = () =>
   new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
	    position => {
	        const cords = {
	            latitude: position.coords.latitude,
	            longitude: position.coords.longitude,
	            heading: position?.coords?.heading,
	        };
	        resolve(cords);
	    },
	    error => {
	        reject(error.message);
	    },
	    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    )
	})

	const locationPermission = () => new Promise(async (resolve, reject) => {
	    if (Platform.OS === 'ios') {
	        try {
	            const permissionStatus = await Geolocation.requestAuthorization('whenInUse');
	            if (permissionStatus === 'granted') {
	                return resolve("granted");
	            }
	            reject('Permission not granted');
	        } catch (error) {
	            return reject(error);
	        }
	    }
	    return PermissionsAndroid.request(
	        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
	    ).then((granted) => {
	        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
	            resolve("granted");
	        }
	        return reject('Location Permission denied');
	    }).catch((error) => {
	        console.log('Ask Location permission error: ', error);
	        return reject(error);
	    });
	});

	const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission()
    if (locPermissionDenied) {
      const { latitude, longitude, heading } = await getCurrentLocation()
      console.log("get live location after 4 second",heading)
      animate(latitude, longitude);
      updateState({
        heading: heading,
        curLoc: { latitude, longitude },
        coordinate: new AnimatedRegion({
	        latitude: latitude,
	        longitude: longitude,
	        latitudeDelta: 0.0922,
	        longitudeDelta: 0.0421
      	})
     })
    }
  }


	const edgePadding={top:50,right:50,bottom:50,left:50}

	const trace=()=>{
		if (region && destination) {
			setIsTracing(true)
			mapRef.current.fitToCoordinates([region,destination],{edgePadding})
			// console.log(mapRef.current.fitToCoordinates);
		}
	}

	console.log(mapRef);

  useEffect(()=>{
		Geocoder.init("AIzaSyB-lpOPCdsdF7SluzBjETaOIfT-ZDgX2ZA",{language : "en"}); // use a valid API key
	  Geocoder.from(region)
	  		.then(res => {
	        const addressComponent = res.results[0].formatted_address;
	        const address = addressComponent.split(',').splice(1,5).join(',')
	  			setDetails(address);
	        // console.log('data from address: '+address);
	  		})
	  		.catch(error => console.warn(error));
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
						// console.log(details.geometry.location);
						// console.log('data from query: '+data?.description);
					}}
					renderRightButton={() => (
            (desc!=null ?
                 <TouchableOpacity onPress={clearing}>
                           <Text style={{color:"#000"}}>x</Text>
								 </TouchableOpacity>
               :
                null )	)}
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
						InputComp: TextInput
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
				<Text style={{width:'100%',fontFamily:"Nunito-Bold",color:"#444",height:60,borderRadius:6,borderColor:"#888",borderWidth:1,padding:10}}>{regions.desc}</Text>
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
