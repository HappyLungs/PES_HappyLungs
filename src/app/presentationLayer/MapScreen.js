import React, { useState, useRef } from "react";

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
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";
import MapView, {
	Marker,
	Heatmap,
	PROVIDER_GOOGLE,
	ProviderPropType,
} from "react-native-maps";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete";

import * as Location from "expo-location";

import { PresentationCtrl } from "./PresentationCtrl.js";

function MapScreen({ navigation, route }) {
	const [modalPinVisible, setModalPinVisible] = useState(false);
	const [modalFilterVisible, setModalFilterVisible] = useState(false);
	const location =
		"Edifici B6 del Campus Nord, C/ Jordi Girona, 1-3, 08034 Barcelona";
	const [trafficSelected, setTraffic] = useState(false);
	const [industrySelected, setIndustry] = useState(false);
	const [urbanSelected, setUrban] = useState(false);
	const [pinsShown, setPins] = useState(true);
	const [byCertificate, setByCertificate] = useState(false);
	const [markers, setMarkers] = useState([]);
	const [region, setRegion] = useState({
		latitude: 41.366531,
		longitude: 2.019336,
		latitudeDelta: 0.3,
		longitudeDelta: 1.5,
	});

	let presentationCtrl = new PresentationCtrl();

	const [heatpoints, setHeatpoints] = useState([
		{
			latitude: 43.366531,
			longitude: 2.019336,
			weight: 1,
		},
		{
			latitude: 42.366531,
			longitude: 2.019336,
			weight: 2,
		},
		{
			latitude: 41.366531,
			longitude: 2.019336,
			weight: 3,
		},
	]);
	const mapRef = useRef(null);

	/*
    Params passats des de PinOwnerScreen al clicar a SeeOnMap
  */
	/*
  const { tmpLat, tmpLng } = route.params;
  if (tmpLat && tmpLng) {
    const tmpLocation = {
      latitude: tmpLat,
      longitude: tmpLng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }
    mapRef.current.animateToRegion(tmpLocation, 2.5 * 1000);
  }
  */

	const [selected, setSelected] = React.useState(null);

	/*const onMapPress = React.useCallback((event) => {
      setMarkers((current) => [
        ...current,
        {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          time: new Date(),
        },
      ]);
    }, []); */

	const onMapPress = React.useCallback(({ lat, lng }) => {
		setMarkers((current) => [
			...current,
			{
				latitude: lat,
				longitude: lng,
			},
		]);
	}, []);

	const panTo = React.useCallback(({ lat, lng }) => {
		const location = {
			latitude: lat,
			longitude: lng,
			latitudeDelta: 0.01,
			longitudeDelta: 0.01,
		};
		mapRef.current.animateToRegion(location, 2.5 * 1000);
	}, []);

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
							style={[styles.modalText, { fontWeight: "bold", bottom: 10 }]}
						>
							Selected location
						</Text>
						<Text style={styles.greenHighlight}> {location}</Text>
						<View style={{ flexDirection: "column", marginTop: 10 }}>
							<TouchableOpacity
								style={{
									flexDirection: "row",
									margin: 5,
									alignItems: "center",
								}}
								onPress={() => {
									setModalPinVisible(!modalPinVisible),
										navigation.navigate("CreatePin", {
											coords: { latitude: 41.366531, longitude: 2.019336 },
										});
								}}
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
									let data = await presentationCtrl.getDataStatistics();
									setModalPinVisible(!modalPinVisible);
									navigation.navigate("Statistics", { data: data });
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
									<View style={[styles.stroke]} />
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
			<View style={styles.checkList}>
				<BouncyCheckbox
					style={styles.checkBox}
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
					style={styles.checkBox}
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
					style={styles.checkBox}
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
								{ fontWeight: "bold", alignSelf: "center", bottom: 10 },
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
								margin: 5,
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
									margin: 5,
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
		<SafeAreaView style={styles.background}>
			<View style={styles.container}>
				<MapView
					ref={mapRef}
					provider={PROVIDER_GOOGLE}
					style={styles.map}
					initialRegion={{
						latitude: 41.366531,
						longitude: 2.019336,
						latitudeDelta: 0.3,
						longitudeDelta: 1.5,
					}}
					onRegionChangeComplete={(region) => setRegion(region)}
					onPress={onMapPress}
				>
					{markers.map((marker) => (
						<Marker
							key={`${marker.latitude}-${marker.longitude}`}
							coordinate={{
								latitude: marker.latitude,
								longitude: marker.longitude,
							}}
							onPress={() => {
								setSelected(marker);
							}}
						/>
					))}
					<Heatmap points={heatpoints} />
				</MapView>
			</View>
			<View style={styles.rowContainer}>
				<View style={[styles.containerSearch, styles.shadow]}>
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

				<View style={[styles.containerSphere, styles.shadow]}>
					<TouchableOpacity onPress={() => setModalFilterVisible(true)}>
						<MaterialCommunityIcons
							name="filter-menu"
							style={{ alignSelf: "center" }}
							color={COLORS.secondary}
							size={35}
						/>
					</TouchableOpacity>
				</View>
			</View>

			<TouchableOpacity
				style={styles.btn}
				onPress={() => setModalPinVisible(true)}
			>
				<Text style={styles.btnText}>Pin Example</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.Compass}
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
					style={{ alignSelf: "center" }}
					color={COLORS.white}
					size={35}
				/>
			</TouchableOpacity>
			{renderModalPin()}
			{renderModalFilter()}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	stroke: {
		backgroundColor: COLORS.secondary,
		alignSelf: "center",
		height: 20,
		width: 5,
		right: 45,
	},
	background: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
	},
	containerSearch: {
		backgroundColor: COLORS.white,
		width: "80%",
		height: 50,
		borderRadius: 12,
		flexDirection: "row",
	},
	containerSphere: {
		backgroundColor: COLORS.white,
		width: 50,
		height: 50,
		marginStart: 20,
		borderRadius: 12,
		justifyContent: "center",
	},
	rowContainer: {
		flexDirection: "row",
		alignSelf: "flex-start",
		alignItems: "center",
		alignContent: "center",
		justifyContent: "flex-start",
		margin: 10,
	},
	body: {
		textAlignVertical: "center",
		alignSelf: "center",
		justifyContent: "center",
		fontSize: 17,
		marginStart: 10,
		color: COLORS.darkGrey,
	},
	greenHighlight: {
		marginTop: 5,
		fontSize: 13,
		color: COLORS.green1,
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		marginTop: 22,
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
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	btn: {
		marginTop: 25,
		justifyContent: "center",
		borderRadius: 5,
		borderBottomWidth: 5,
		width: 100,
		height: 50,
		borderBottomColor: COLORS.darkGrey,
		backgroundColor: COLORS.secondary,
	},
	btnText: {
		color: "white",
		textAlign: "center",
		fontWeight: "bold",
	},
	container: {
		...StyleSheet.absoluteFillObject,
		height: "100%",
		width: "100%",
		justifyContent: "flex-end",
		//position:'absolute',
		alignItems: "center",
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
	checkList: {
		flexDirection: "column",
		marginStart: 20,
	},
	checkBox: {
		marginTop: 10,
	},
	Compass: {
		marginTop: 460,
		marginRight: 10,
		marginStart: 320,
		justifyContent: "center",
		borderRadius: 5,
		borderBottomWidth: 5,
		width: 50,
		height: 50,
		borderBottomColor: COLORS.darkGrey,
		backgroundColor: COLORS.secondary,
	},
	CompassText: {
		color: "white",
		textAlign: "center",
		fontWeight: "bold",
	},
});

export default MapScreen;
