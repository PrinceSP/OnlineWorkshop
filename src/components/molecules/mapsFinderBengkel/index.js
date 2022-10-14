import React, {useState,useRef,useEffect} from "react"
import {StyleSheet, Text, View, TextInput, TouchableOpacity,PermissionsAndroid,PlatForm } from "react-native"
import {CustomMarker} from '../../../assets'
import MapView, { Callout, Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps"
import Geocoder from 'react-native-geocoding';
import MapViewDirections from 'react-native-maps-directions';

const MapFinderBengkelTwo = ({getGeometrics,regions,flags})=>{
	// console.log(regions);
	const [ region, setRegion ] = useState({
		latitude: regions?.toBengkel[1].location[1].region[1].latitude[1] || 1.4730796311491023,
		longitude: regions?.toBengkel[1].location[1].region[1].longitude[1] || 124.8540263923278,
		latitudeDelta: regions?.toBengkel[1].location[1].region[1].latitudeDelta[1] || 0.0922,
		longitudeDelta: regions?.toBengkel[1].location[1].region[1].longitudeDelta[1] || 0.0421,
	})
	const [destination,setDestination] = useState({
		latitude:  regions?.location[1].region[1].latitude[1] ||  1.4730796311491023,
		longitude:  regions?.location[1].region[1].longitude[1] ||  124.8540263923278,
		latitudeDelta:  regions?.location[1].region[1].latitudeDelta[1] ||  0.0922,
		longitudeDelta:  regions?.location[1].region[1].longitudeDelta[1] ||  0.0421,
	})

  const [desc,setDetails] = useState(regions?.toBengkel[1].location[1].desc[1])
  const [descTwo,setDetailsTwo] = useState(regions?.location[1].desc[1])
  const [distance,setDistance] = useState('')
  const [time,setTime] = useState('')
	const [isTracing,setIsTracing] = useState(false)

  const datas = {region,desc}
  const mapRef = useRef(region)
	const queryRef = useRef(null)
	const queryRefTwo = useRef(null)
	const markerRef = useRef(null)

	const goToCurrentRegion=()=>{
		mapRef.current.animateToRegion(region,300)
	}

  const clearing=()=>{
    queryRef.current?.clear()
  }

	const edgePadding={top:50,right:50,bottom:50,left:50}

	const trace=()=>{
		if (region && destination) {
			setIsTracing(true)
			mapRef.current.fitToCoordinates([region,destination],{edgePadding})
			// console.log(mapRef.current.fitToCoordinates);
		}
	}

	// console.log(mapRef);

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
				{region && <Marker coordinate={region} ref={markerRef}
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
					image={CustomMarker}
					title="I'm Here"
					description={desc}
				/>
			</MapView>
			<View style={style.placesContainer}>
				<Text style={{fontFamily:"Nunito-Bold",color:"#444"}}>From</Text>
				<Text style={{width:'100%',fontFamily:"Nunito-Bold",color:"#444",height:60,borderRadius:6,borderColor:"#888",borderWidth:1,padding:10}}>{desc}</Text>
				<Text style={{fontFamily:"Nunito-Bold",color:"#444"}}>Destination</Text>
				<Text style={{width:'100%',fontFamily:"Nunito-Bold",color:"#444",height:60,borderRadius:6,borderColor:"#888",borderWidth:1,padding:10}}>{descTwo}</Text>
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
		top:30,
	},
	listView:{minHeight:50,color:'#000'},
	pointer:{
    position:"absolute",top:"33%",right:"7%",
    shadowOffset: { width: 0, height: 2 },shadowColor:"#000",
    shadowOpacity: 0.9,
    shadowRadius:3.84,
    elevation:10
  },
})

export default MapFinderBengkelTwo
