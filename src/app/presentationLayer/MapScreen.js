import React, { useState, useRef, useEffect } from "react";

import {
	Text,
	StyleSheet,
	View,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
	Modal,
} from "react-native";

import COLORS from "../config/stylesheet/colors";
import {
	Ionicons,
	MaterialIcons,
	MaterialCommunityIcons,
	AntDesign,
} from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";
import MapView, {
	Marker,
	Heatmap,
	PROVIDER_GOOGLE,
	InfoWindow,
} from "react-native-maps";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete";

import * as Location from "expo-location";

import { formatRelative } from "date-fns";

const PresentationCtrl = require("./PresentationCtrl.js");

async function callGeocodeAPI(latitude, longitude) {
	const location = await fetch(
		`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&key=AIzaSyDdWVzzuo-fZWsgpyc8t2TykdvvtfBfR9c`
	);
	if (!location.ok) return "";
	const result = await location.json();
	return result.results[0].formatted_address;
}

/**
 * Map screen, with all its components
 * @param {navigation} [ parameter to navigate to the other screens or controllers ]
 * @param {route} [ route to navigate to the other screens or controllers ]
 */
function MapScreen({ navigation, route }) {
	/**
	 * Function to set a default location
	 */

	let presentationCtrl = new PresentationCtrl();

	/**
	 *
	 */
	const [modalPinVisible, setModalPinVisible] = useState(false);

	/**
	 *
	 */
	const [modalFilterVisible, setModalFilterVisible] = useState(false);

	/**
	 *
	 */
	const [trafficSelected, setTraffic] = useState(false);

	/**
	 *
	 */
	const [industrySelected, setIndustry] = useState(false);

	/**
	 *
	 */
	const [urbanSelected, setUrban] = useState(false);

	/**
	 *
	 */
	const [pinsShown, setPins] = useState(true);

	/**
	 *
	 */
	const [byCertificate, setByCertificate] = useState(false);

	const [markers, setMarkers] = useState([]);
	const [actualMarker, setActualMarker] = useState({
		latitude: 41.366531,
		longitude: 2.019336,
		title: "inexistente",
	});
	const [selected, setSelected] = useState(null);

	/**
	 * Function to set a default region
	 * @param {latitude} [ parameter to set a default latitude ]
	 * @param {longitude} [ parameter to set a default longitude ]
	 * @param {latitudeDelta} [ parameter to set a max distance to the central point in terms of latitude ]
	 * @param {longitudeDelta} [ parameter to set a max distance to the central point in terms of longitude ]
	 */
	const [region, setRegion] = useState({
		latitude: 41.366531,
		longitude: 2.019336,
		latitudeDelta: 0.3,
		longitudeDelta: 1.5,
	});

	//const [heatpoints] = useState(presentationCtrl.getMapData());

	/**
	 * Function to set a default hetpoint
	 * @param {latitude} [ parameter to set a default latitude ]
	 * @param {longitude} [ parameter to set a default longitude ]
	 * @param {weight} [  ]
	 */
	const [heatpoints, setHeatpoints] = useState([
		{
			latitude: 41.366531,
			longitude: 2.019336,
			weight: 3,
		},
	]);

	/**
	 *
	 */
	useEffect(async () => {
		const initHeatPoints = async () => {
			setHeatpoints(await presentationCtrl.getMapData());
		};
		//console.log('prevoius');
		await initHeatPoints();
		//console.log(heatpoints);
	}, []);

	//setHeatpoints(await presentationCtrl.getMapData());
	/*
    Params passats des de PinOwnerScreen al clicar a SeeOnMap
	*/
	/*
	const { latitude, longitude } = route.params;
	if (latitude && longitude) {
		const tmpLocation = {
		latitude: latitude,
		longitude: longitude,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
		}
		mapRef.current.animateToRegion(tmpLocation, 2.5 * 1000);
	}
	*/

	const onMapPress = React.useCallback((e) => {
		//e.persist()
		navigation.navigate("CreatePin", {
			coords: {
				latitude: actualMarker.latitude,
				longitude: actualMarker.longitude,
				title: actualMarker.title,
			},
		});
		//falta condicionar això perq només passi quan realment es crea un pin
		setMarkers((current) => [
			...current,
			{
				latitude: actualMarker.latitude,
				longitude: actualMarker.longitude,
				time: new Date(),
			},
		]);
		setModalPinVisible(!modalPinVisible);
	});

	const onModal = async (event) => {
		event.persist();
		const latitude = event.nativeEvent.coordinate.latitude;
		const longitude = event.nativeEvent.coordinate.longitude;
		const title = await callGeocodeAPI(latitude, longitude);
		setActualMarker({
			latitude,
			longitude,
			title,
		});
		setModalPinVisible(true);
	};

	/**
	 * Function to set a reference point of the map
	 */
	const mapRef = useRef(null);

	const onMapLoad = React.useCallback((map) => {
		mapRef.current = map;
	});

	/**
	 * Function to go with zoom in, to the requested location
	 * @param {lat} [ parameter to recive a latitude ]
	 * @param {lng} [ parameter to recive a longitude ]
	 */
	const panTo = React.useCallback(({ lat, lng }) => {
		const location = {
			latitude: lat,
			longitude: lng,
			latitudeDelta: 0.01,
			longitudeDelta: 0.01,
		};
		mapRef.current.animateToRegion(location, 2.5 * 1000);
	}, []);

	/**
	 *
	 */
	function renderModalPin() {
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalPinVisible}
				onRequestClose={() => {
					setModalPinVisible(!modalPinVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={[styles.modalView, styles.shadow]}>
						<TouchableOpacity
							style={{ alignSelf: "flex-end" }}
							onPress={() => setModalPinVisible(!modalPinVisible)}
						>
							<Ionicons name="close" color={COLORS.secondary} size={25} />
						</TouchableOpacity>
						<Text
							style={[styles.modalText, { fontWeight: "bold", bottom: 15 }]}
						>
							Selected location
						</Text>
						<Text style={styles.highlight}> {actualMarker.title}</Text>
						<View style={{ flexDirection: "column", marginTop: 10 }}>
							<TouchableOpacity
								style={{
									flexDirection: "row",
									margin: 5,
									alignItems: "center",
								}}
								onPress={onMapPress}
							>
								<AntDesign name="pushpino" size={35} color={COLORS.secondary} />
								<Text style={[styles.subtitle, { marginStart: 5 }]}>
									CREATE PIN
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									flexDirection: "row",
									margin: 5,
									alignItems: "center",
								}}
								onPress={async () => {
									let data = await presentationCtrl.getDataStatistics(
										"24hours",
										actualMarker.latitude,
										actualMarker.longitude
									);
									setModalPinVisible(!modalPinVisible);
									navigation.navigate("Statistics", {
										data: data,
										coords: {
											latitude: actualMarker.latitude,
											longitude: actualMarker.latitude,
										},
									});
								}}
							>
								<MaterialIcons
									name="scatter-plot"
									color={COLORS.secondary}
									size={35}
								/>
								<Text style={[styles.subtitle, { marginStart: 5 }]}>
									SEE STATISTICS
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									flexDirection: "row",
									margin: 5,
									alignItems: "center",
								}}
								onPress={() => setModalPinVisible(!modalPinVisible)}
							>
								<Ionicons
									name="share-social-sharp"
									style={{ alignSelf: "center" }}
									color={COLORS.secondary}
									size={35}
								/>
								<Text style={[styles.subtitle, { marginStart: 5 }]}>SHARE</Text>
							</TouchableOpacity>
							<Text
								style={{
									fontSize: 13,
									fontWeight: "bold",
									color: COLORS.secondary,
								}}
							>
								Recommended
							</Text>
							<View
								style={{
									marginTop: 10,
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<LinearGradient
									flex={1}
									colors={[
										"green",
										"yellow",
										"orange",
										"red",
										"purple",
										"brown",
									]}
									start={{ x: 0, y: 0.5 }}
									end={{ x: 1, y: 1 }}
									style={{ borderRadius: 5 }}
								>
									<View
										style={{
											backgroundColor: COLORS.secondary,
											alignSelf: "center",
											height: 20,
											width: 5,
											right: 45,
										}}
									/>
								</LinearGradient>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		);
	}

	function renderCheckList() {
		return (
			<View style={{ flexDirection: "column", marginStart: 20 }}>
				<BouncyCheckbox
					style={{ marginTop: 10 }}
					fillColor={COLORS.secondary}
					size={20}
					unfillColor={COLORS.white}
					iconStyle={{
						borderColor: !trafficSelected ? COLORS.lightGrey : COLORS.secondary,
						borderRadius: 7,
						borderWidth: 1.5,
					}}
					textStyle={{
						textDecorationLine: "none",
						fontWeight: "bold",
						color: !trafficSelected ? COLORS.lightGrey : COLORS.secondary,
					}}
					onPress={() => setTraffic(!trafficSelected)}
					text="Traffic"
				/>
				<BouncyCheckbox
					style={{ marginTop: 10 }}
					fillColor={COLORS.secondary}
					size={20}
					unfillColor={COLORS.white}
					iconStyle={{
						borderColor: !industrySelected
							? COLORS.lightGrey
							: COLORS.secondary,
						borderRadius: 7,
						borderWidth: 1.5,
					}}
					textStyle={{
						textDecorationLine: "none",
						fontWeight: "bold",
						color: !industrySelected ? COLORS.lightGrey : COLORS.secondary,
					}}
					onPress={() => setIndustry(!industrySelected)}
					text="Industry"
				/>
				<BouncyCheckbox
					style={{ marginTop: 10 }}
					fillColor={COLORS.secondary}
					size={20}
					unfillColor={COLORS.white}
					iconStyle={{
						borderColor: !urbanSelected ? COLORS.lightGrey : COLORS.secondary,
						borderRadius: 7,
						borderWidth: 1.5,
					}}
					textStyle={{
						textDecorationLine: "none",
						fontWeight: "bold",
						color: !urbanSelected ? COLORS.lightGrey : COLORS.secondary,
					}}
					onPress={() => setUrban(!urbanSelected)}
					text="Urban"
				/>
			</View>
		);
	}

	const fakeProfileData = {
		username: "Ricard",
		points: 200,
	};

	const [profile, setProfile] = useState(fakeProfileData);

	function renderHeader(profile) {
		return (
			<View
				style={[
					{
						height: 150,
						flexDirection: "row",
						paddingHorizontal: 20,
						alignItems: "center",
						backgroundColor: COLORS.white,
					},
					styles.shadow,
				]}
			>
				<View
					style={{
						flexDirection: "column",
					}}
				>
					<View
						style={{
							flexDirection: "row",
							marginTop: 25,
							marginBottom: 10,
						}}
					>
						<Text
							style={[
								{
									fontSize: 20,
									fontWeight: "bold",
									color: COLORS.secondary,
								},
							]}
						>
							{profile.username},
							<Text
								style={[
									{
										fontSize: 18,
										fontWeight: "normal",
										color: COLORS.secondary,
									},
								]}
							>
								{" "}
								Welcome Back!
							</Text>
						</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
						}}
					>
						<View
							style={[
								{
									backgroundColor: COLORS.lightGrey,
									width: "80%",
									height: 50,
									borderRadius: 12,
									flexDirection: "row",
								},
								styles.shadow,
							]}
						>
							<MaterialIcons
								name="search"
								style={{ alignSelf: "center", marginStart: 10 }}
								color={COLORS.secondary}
								size={35}
							/>
							<TextInput
								multiline={false}
								maxLength={30}
								style={styles.body}
								defaultValue={"Search a location"}
							/>
						</View>
						<View style={[styles.container, styles.shadow]}>
							<TouchableOpacity onPress={() => setModalFilterVisible(true)}>
								<MaterialCommunityIcons
									name="filter-menu"
									color={COLORS.secondary}
									size={35}
								/>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		);
	}

	/**
	 *
	 */
	function renderModalFilter() {
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalFilterVisible}
				onRequestClose={() => {
					setModalFilterVisible(!modalFilterVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View
						style={[
							styles.modalView,
							styles.shadow,
							{ alignItems: "flex-start" },
						]}
					>
						<TouchableOpacity
							style={{ alignSelf: "flex-end" }}
							onPress={() => setModalFilterVisible(!modalFilterVisible)}
						>
							<Ionicons name="close" color={COLORS.secondary} size={25} />
						</TouchableOpacity>
						<Text
							style={[
								styles.modalText,
								{ fontWeight: "bold", alignSelf: "center", bottom: 15 },
							]}
						>
							Filter
						</Text>
						<Text
							style={[
								styles.modalText,
								{ fontWeight: "bold", color: COLORS.green1 },
							]}
						>
							Type of contamination
						</Text>
						{renderCheckList()}
						<Text
							style={[
								styles.modalText,
								{ fontWeight: "bold", color: COLORS.green1, marginTop: 10 },
							]}
						>
							Show pins
						</Text>
						<TouchableOpacity
							style={{
								flexDirection: "row",
								backgroundColor: COLORS.secondary,
								borderRadius: 90,
								padding: 7,
								marginTop: 10,
								marginStart: 15,
								alignItems: "center",
							}}
							onPress={() => setPins(!pinsShown)}
						>
							<AntDesign
								name={pinsShown ? "pushpino" : "pushpin"}
								size={25}
								color={COLORS.white}
							/>
						</TouchableOpacity>
						<Text
							style={[
								styles.modalText,
								{ fontWeight: "bold", color: COLORS.green1, marginTop: 10 },
							]}
						>
							Filter buildings by energy certificate
						</Text>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<TouchableOpacity
								style={{
									flexDirection: "row",
									backgroundColor: COLORS.secondary,
									borderRadius: 90,
									padding: 7,
									marginTop: 10,
									marginEnd: 10,
									marginStart: 15,
									alignItems: "center",
								}}
								onPress={() => setByCertificate(!byCertificate)}
							>
								<Ionicons
									name={byCertificate ? "home" : "home-outline"}
									size={25}
									color={COLORS.white}
								/>
							</TouchableOpacity>
							<MultiSlider
								sliderLength={100}
								//onValuesChange={multiSliderValuesChange}
								min={0}
								max={7}
								step={1}
								snapped
								showSteps
								values={[0, 1]}
								//enableLabel
								//customLabel={CustomLabel}
								stepLabelStyle={{
									color: "blue",
								}}
								markerStyle={{
									backgroundColor: COLORS.green1,
									height: 10,
									width: 10,
									bottom: -3,
								}}
								stepLabel={{
									backgroundColor: "red",
									height: 20,
									width: 20,
									fontSize: 10,
								}}
								pressedMarkerStyle={{
									height: 10,
									width: 10,
								}}
								selectedStyle={{
									backgroundColor: COLORS.green1,
								}}
								unselectedStyle={{
									backgroundColor: COLORS.secondary,
								}}
								containerStyle={{
									height: 40,
									marginStart: 10,
								}}
								trackStyle={{
									height: 5,
									borderRadius: 2,
								}}
							/>
						</View>
					</View>
				</View>
			</Modal>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1, alignItems: "center" }}>
			<View
				style={{
					marginTop: 100,
					...StyleSheet.absoluteFillObject,
				}}
			>
				<MapView
					ref={mapRef}
					provider={PROVIDER_GOOGLE}
					style={{ ...StyleSheet.absoluteFillObject }}
					initialRegion={{
						latitude: 41.366531,
						longitude: 2.019336,
						latitudeDelta: 0.3,
						longitudeDelta: 1.5,
					}}
					onRegionChangeComplete={(region) => setRegion(region)}
					onPress={onModal}
					onLoad={onMapLoad}
				>
					{markers.map((marker) => (
						<Marker
							key={marker.time.toISOString()}
							coordinate={{
								latitude: marker.latitude,
								longitude: marker.longitude,
							}}
							onPress={() => {
								setSelected(marker);
							}}
						/>
					))}

					<Heatmap points={heatpoints} radius={50} />
				</MapView>
			</View>
			{renderHeader(profile)}

			<View
				style={[
					styles.container,
					styles.shadow,
					{ marginTop: 480, marginRight: 10, marginStart: 320 },
				]}
			>
				<TouchableOpacity
					onPress={() => {
						Location.installWebGeolocationPolyfill();
						navigator.geolocation.getCurrentPosition((position) => {
							panTo({
								lat: position.coords.latitude,
								lng: position.coords.longitude,
							});
						});
					}}
				>
					<MaterialCommunityIcons
						name="compass"
						color={COLORS.secondary}
						size={35}
					/>
				</TouchableOpacity>
			</View>
			{renderModalPin()}
			{renderModalFilter()}
		</SafeAreaView>
	);
}
/**
 * Function to define all the styles needed in this screen
 */
const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.white,
		width: 50,
		height: 50,
		marginStart: 20,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	body: {
		textAlignVertical: "center",
		alignSelf: "center",
		justifyContent: "center",
		fontSize: 15,
		marginStart: 10,
		color: COLORS.darkGrey,
	},
	highlight: {
		marginTop: 5,
		fontSize: 13,
		color: COLORS.green1,
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		width: "80%",
	},
	modalView: {
		margin: 20,
		backgroundColor: COLORS.white,
		borderRadius: 15,
		padding: 15,
		alignItems: "center",
	},
	textStyle: {
		color: COLORS.white,
		fontWeight: "bold",
		fontSize: 15,
		textAlign: "center",
	},
	subtitle: {
		color: COLORS.secondary,
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
		padding: 5,
	},
	modalText: {
		textAlign: "center",
		fontSize: 16,
	},
	shadow: {
		shadowColor: COLORS.black,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	btn: {
		justifyContent: "center",
		borderRadius: 5,
		borderBottomWidth: 5,
		width: 100,
		height: 50,
		borderBottomColor: COLORS.darkGrey,
		backgroundColor: COLORS.secondary,
	},
});

export default MapScreen;
