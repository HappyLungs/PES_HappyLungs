import React, { useState, useRef, useEffect, useContext } from "react";

import {
	Text,
	StyleSheet,
	View,
	SafeAreaView,
	TouchableOpacity,
	Pressable,
	Image,
} from "react-native";

import COLORS from "../../config/stylesheet/colors";
import PinPreview from "../components/PinPreview";
import i18n from "../../config/translation";
import UserContext from "../../domainLayer/UserContext";
import {
	Ionicons,
	MaterialIcons,
	MaterialCommunityIcons,
	AntDesign,
} from "@expo/vector-icons";

import Modal from "react-native-modal";

import { LinearGradient } from "expo-linear-gradient";
import MapView, { Marker, Heatmap, PROVIDER_GOOGLE } from "react-native-maps";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

import * as Location from "expo-location";

const PresentationCtrl = require("../PresentationCtrl.js");

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
	const [pinsShown, setPinsShown] = useState(true);

	/**
	 *
	 */
	const [pinPreview, setPinPreview] = useState(false);

	/**
	 *
	 */
	const [pins, setPins] = useState([]);

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
			weight: 0.3,
		},
	]);

	/**
	 *
	 */
	useEffect(async () => {
		const unsubscribe = navigation.addListener("focus", async () => {
			console.log("map");
			const fetchPins = async () => {
				const data = await presentationCtrl.fetchTrendingPins(user.email);
				setPins(data);
				let fetchedMarkers = [];
				for (let marker of Object.keys(data)) {
					fetchedMarkers.push({
						latitude: data[marker].latitude,
						longitude: data[marker].longitude,
					});
				}
				setMarkers(fetchedMarkers);
			};

			await fetchPins();
		});
		const initHeatPoints = async () => {
			console.log("abans");
			let aux = await presentationCtrl.getHeatPoints();
			console.log(aux);
			setHeatpoints(aux);
			console.log(heatpoints);
		};
		await initHeatPoints();
		return unsubscribe;
	}, [navigation]);

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

	const isMyPin = (email) => {
		return user.email === email;
	};

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

	const [user] = useContext(UserContext);

	function renderHeader(user) {
		return (
			<View
				style={[
					{
						height: 70,
						width: "100%",
						paddingHorizontal: 20,
						alignItems: "center",
						flexDirection: "row",
						backgroundColor: COLORS.white,
						borderBottomLeftRadius: 20,
						borderBottomRightRadius: 20,
					},
					styles.shadow,
				]}
			>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("Profile");
					}}
					style={{}}
				>
					<Image
						source={{ uri: user.profilePicture }}
						style={[{ borderRadius: 20, width: 40, height: 40 }]}
					></Image>
				</TouchableOpacity>
				<Text
					style={[
						{
							fontSize: 20,
							fontWeight: "bold",
							color: COLORS.secondary,
							marginStart: 15,
						},
					]}
				>
					{user.name},
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
						{i18n.t("welcome")}
					</Text>
				</Text>
			</View>
		);
	}

	/**
	 *
	 */
	function renderFilter() {
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalFilterVisible}
				onRequestClose={() => {
					setModalFilterVisible(false);
				}}
				onBackdropPress={() => {
					setModalFilterVisible(false);
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
						<Text
							style={[
								styles.modalText,
								{ fontWeight: "bold", alignSelf: "center" },
							]}
						>
							{i18n.t("filter")}
						</Text>
						<Text
							style={[
								styles.modalText,
								{ fontWeight: "bold", color: COLORS.green1 },
							]}
						>
							{i18n.t("typeOfContamination")}
						</Text>
						{renderCheckList()}
						<Text
							style={[
								styles.modalText,
								{ fontWeight: "bold", color: COLORS.green1, marginTop: 10 },
							]}
						>
							{i18n.t("showPins")}
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
							onPress={() => setPinsShown(!pinsShown)}
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
							{i18n.t("filterByCertificate")}
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
								onPress={() => {
									setByCertificate(!byCertificate);
								}}
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

	function renderPinPreview() {
		return (
			<Modal
				visible={pinPreview}
				animationType="fade"
				transparent={true}
				onRequestClose={() => {
					setPinPreview(false);
				}}
				onBackdropPress={() => {
					setPinPreview(false);
				}}
			>
				<View
					style={{
						justifyContent: "center",
						alignSelf: "center",
					}}
				>
					<Pressable
						onPress={() => {
							navigation.navigate("DefaultPin", {
								pin: selected,
							});
							setPinPreview(false);
						}}
					>
						<PinPreview
							item={selected}
							saved={false}
							mine={isMyPin(selected.creatorEmail)}
						></PinPreview>
					</Pressable>
				</View>
			</Modal>
		);
	}

	/**
	 *
	 */
	function renderPinCreate() {
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalPinVisible}
				onRequestClose={() => {
					setModalPinVisible(false);
				}}
				onBackdropPress={() => {
					setModalPinVisible(false);
				}}
			>
				<View style={styles.centeredView}>
					<View style={[styles.modalView, styles.shadow]}>
						<Text style={[styles.modalText, { fontWeight: "bold" }]}>
							{i18n.t("selectedLocation")}
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
									{i18n.t("createPin")}
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
									{i18n.t("seeStatistics")}
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
								<Text style={[styles.subtitle, { marginStart: 5 }]}>
									{i18n.t("share")}
								</Text>
							</TouchableOpacity>
							<Text
								style={{
									fontSize: 13,
									fontWeight: "bold",
									color: COLORS.secondary,
								}}
							>
								{i18n.t("recommended1")}
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
					text={i18n.t("typeOfContamination1")}
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
					text={i18n.t("typeOfContamination2")}
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
					text={i18n.t("typeOfContamination3")}
				/>
			</View>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1, alignItems: "center" }}>
			<View
				style={{
					marginTop: 55,
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
					showsCompass={false}
					onLoad={onMapLoad}
				>
					{pinsShown &&
						markers.map((marker, idx) => (
							<Marker
								key={idx}
								coordinate={{
									latitude: marker.latitude,
									longitude: marker.longitude,
								}}
								onPress={() => {
									setPinPreview(true);
									setSelected(pins[idx]);
								}}
							/>
						))}

					<Heatmap
						points={heatpoints}
						radius={50}
						opacity={0.6}
						gradient={{
							colors: ["green", "yellow", "orange", "red", "purple"],
							startPoints: [0.15, 0.3, 0.6, 0.8, 0.99],
							colorMapSize: 200,
						}}
					/>
				</MapView>
			</View>
			{renderHeader(user)}
			<View
				style={{
					alignSelf: "flex-end",
					flexDirection: "column",
					justifyContent: "space-between",
					marginVertical: 25,
					marginEnd: 15,
					flex: 1,
				}}
			>
				<View style={[styles.container, styles.shadow]}>
					<TouchableOpacity onPress={() => setModalFilterVisible(true)}>
						<MaterialCommunityIcons
							name="filter-menu"
							color={COLORS.secondary}
							size={35}
						/>
					</TouchableOpacity>
				</View>
				<View style={[styles.container, styles.shadow, { marginBottom: 70 }]}>
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
			</View>
			{pinPreview && renderPinPreview()}
			{renderPinCreate()}
			{renderFilter()}
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
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	body: {
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
