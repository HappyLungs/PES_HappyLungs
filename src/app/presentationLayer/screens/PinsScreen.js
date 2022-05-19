import React, { useState, useEffect, useRef, useContext } from "react";
import {
	StyleSheet,
	View,
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
} from "react-native";

import COLORS from "../../config/stylesheet/colors";
import PinList from "../components/PinList";
const PresentationCtrl = require("../PresentationCtrl.js");
import i18n from "../../config/translation";
import UserContext from "../../domainLayer/UserContext";

import { MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

function PinsScreen({ navigation }) {
	let presentationCtrl = new PresentationCtrl();

	const [user] = useContext(UserContext);

	const [masterData, setMasterData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [savedPins, setSavedPins] = useState([]);
	const [createdPins, setCreatedPins] = useState([]);
	const [search, setSearch] = useState("");
	const [dateFilter, setDateFilter] = useState(true);
	const [ratingFilter, setRatingFilter] = useState(false);
	const [createdFilter, setCreatedFilter] = useState(false);
	const [savedFilter, setSavedFilter] = useState(false);

	const AnimationRefFilter1 = useRef(null);
	const AnimationRefFilter2 = useRef(null);
	const AnimationRefFilter3 = useRef(null);
	const AnimationRefFilter4 = useRef(null);

	useEffect(async () => {
		const unsubscribe = navigation.addListener("focus", async () => {
			// The screen is focused
			// Call any action and update data
			const fetchPins = async () => {
				const data = await presentationCtrl.fetchPins(user.email);
				console.log(data);
				setMasterData([...data.pins, ...data.savedPins]);
				setFilteredData([...data.pins, ...data.savedPins]);
				setCreatedPins(data.pins);
				setSavedPins(data.savedPins);
			};
			await fetchPins();
		});

		// Return the function to unsubscribe from the event so it gets removed on unmount

		return unsubscribe;
	}, [navigation]);

	const filterBySearch = (text) => {
		if (text) {
			setFilteredData(
				masterData.filter((item) => {
					const itemData = item.title
						? item.title.toUpperCase()
						: "".toUpperCase();
					const textData = text.toUpperCase();
					return itemData.indexOf(textData) > -1;
				})
			);
		} else {
			setFilteredData(masterData);
		}
		setSearch(text);
	};

	const filterByDate = () => {
		if (!dateFilter) {
			if (createdFilter) {
				setFilteredData(createdPins);
			} else if (savedFilter) {
				setFilteredData(savedPins);
			} else {
				setFilteredData(masterData);
			}
		} else {
			if (createdFilter) {
				setFilteredData(createdPins);
			} else if (savedFilter) {
				setFilteredData(savedPins);
			} else {
				setFilteredData(masterData);
			}
		}
		setDateFilter(!dateFilter);
	};

	const filterByRatingAuxiliar = (data) => {
		return [...data].sort(function (item1, item2) {
			return item1.rating <= item2.rating;
		});
	};

	const filterByRating = () => {
		if (!ratingFilter) {
			if (createdFilter) {
				setFilteredData(filterByRatingAuxiliar(createdPins));
			} else if (savedFilter) {
				setFilteredData(filterByRatingAuxiliar(savedPins));
			} else {
				setFilteredData(filterByRatingAuxiliar(masterData));
			}
		} else {
			if (createdFilter) {
				setFilteredData(createdPins);
			} else if (savedFilter) {
				setFilteredData(savedPins);
			} else {
				setFilteredData(masterData);
			}
		}
		setRatingFilter(!ratingFilter);
	};

	const filterCreated = () => {
		if (!createdFilter) {
			if (savedFilter) {
				setSavedFilter(false);
			}
			if (ratingFilter) {
				setFilteredData(filterByRatingAuxiliar(createdPins));
			} else {
				setFilteredData(createdPins);
			}
		} else {
			if (ratingFilter) {
				setFilteredData(filterByRatingAuxiliar(masterData));
			} else {
				setFilteredData(masterData);
			}
		}
		setCreatedFilter(!createdFilter);
	};

	const filterSaved = () => {
		if (!savedFilter) {
			if (createdFilter) {
				setCreatedFilter(false);
			}
			if (ratingFilter) {
				setFilteredData(filterByRatingAuxiliar(savedPins));
			} else {
				setFilteredData(savedPins);
			}
		} else {
			if (ratingFilter) {
				setFilteredData(filterByRatingAuxiliar(masterData));
			} else {
				setFilteredData(masterData);
			}
		}
		setSavedFilter(!savedFilter);
	};

	function renderHeader() {
		return (
			<View
				style={[
					{
						flexDirection: "row",
						paddingHorizontal: 20,
						alignItems: "center",
						paddingTop: 15,
						backgroundColor: COLORS.white,
						borderBottomLeftRadius: 20,
						borderBottomRightRadius: 20,
					},
					styles.shadow,
				]}
			>
				<View
					style={{
						flex: 1,
						flexDirection: "column",
					}}
				>
					<View
						style={{
							flexDirection: "row",
						}}
					>
						<View
							style={[
								{
									backgroundColor: COLORS.lightGrey,
									height: 40,
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
								width={175}
								value={search}
								style={[styles.body, { marginStart: 10 }]}
								placeholder={i18n.t("search")}
								onChangeText={(text) => {
									setDateFilter(false);
									setRatingFilter(false);
									setCreatedFilter(false);
									setSavedFilter(false);
									filterBySearch(text);
								}}
							/>
						</View>
					</View>
					<ScrollView
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						style={{
							flexDirection: "row",
							marginVertical: 15,
							height: 40,
						}}
						contentContainerStyle={{
							justifyContent: "space-evenly",
							alignItems: "center",
						}}
					>
						<TouchableOpacity
							style={[
								{
									borderRadius: 12,
									borderColor: COLORS.lightGrey,
									borderWidth: 1,
								},
								dateFilter ? styles.shadowSelected : styles.shadow,
							]}
							onPress={() => {
								setSearch("");
								setRatingFilter(false);
								filterByDate();
								AnimationRefFilter1.current?.pulse(1000);
							}}
						>
							<Animatable.View
								ref={AnimationRefFilter1}
								style={{
									backgroundColor: dateFilter ? COLORS.green1 : COLORS.white,
									borderRadius: 12,
									height: 30,
									justifyContent: "center",
									alignItems: "center",
									paddingHorizontal: 15,
								}}
								animation="pulse"
								duration={1000}
							>
								<Text
									style={[
										styles.containerTxt,
										{ color: dateFilter ? COLORS.white : COLORS.secondary },
									]}
								>
									{i18n.t("mostRecent")}
								</Text>
							</Animatable.View>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								{
									borderRadius: 12,
									borderColor: COLORS.lightGrey,
									borderWidth: 1,
									marginHorizontal: 7,
								},
								ratingFilter ? styles.shadowSelected : styles.shadow,
							]}
							onPress={() => {
								setSearch("");
								setDateFilter(false);
								filterByRating();
								AnimationRefFilter2.current?.pulse(1000);
							}}
						>
							<Animatable.View
								ref={AnimationRefFilter2}
								style={{
									backgroundColor: ratingFilter ? COLORS.green1 : COLORS.white,
									height: 30,
									paddingHorizontal: 15,
									borderRadius: 12,
									justifyContent: "center",
									alignItems: "center",
								}}
								animation="pulse"
								duration={1000}
							>
								<Text
									style={[
										styles.containerTxt,
										{ color: ratingFilter ? COLORS.white : COLORS.secondary },
									]}
								>
									{i18n.t("bestRated")}
								</Text>
							</Animatable.View>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								{
									borderRadius: 12,
									borderColor: COLORS.lightGrey,
									borderWidth: 1,
									marginHorizontal: 7,
								},
								createdFilter ? styles.shadowSelected : styles.shadow,
							]}
							onPress={() => {
								setSearch("");
								filterCreated();
								AnimationRefFilter3.current?.pulse(1000);
							}}
						>
							<Animatable.View
								ref={AnimationRefFilter3}
								style={{
									backgroundColor: createdFilter ? COLORS.green1 : COLORS.white,
									height: 30,
									paddingHorizontal: 15,
									borderRadius: 12,
									justifyContent: "center",
									alignItems: "center",
								}}
								animation="pulse"
								duration={1000}
							>
								<Text
									style={[
										styles.containerTxt,
										{ color: createdFilter ? COLORS.white : COLORS.secondary },
									]}
								>
									{i18n.t("created")}
								</Text>
							</Animatable.View>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								{
									borderRadius: 12,
									borderColor: COLORS.lightGrey,
									borderWidth: 1,
									marginHorizontal: 7,
								},
								savedFilter ? styles.shadowSelected : styles.shadow,
							]}
							onPress={() => {
								setSearch("");
								filterSaved();
								AnimationRefFilter4.current?.pulse(1000);
							}}
						>
							<Animatable.View
								ref={AnimationRefFilter4}
								style={{
									backgroundColor: savedFilter ? COLORS.green1 : COLORS.white,
									height: 30,
									paddingHorizontal: 15,
									borderRadius: 12,
									justifyContent: "center",
									alignItems: "center",
								}}
								animation="pulse"
								duration={1000}
								onPress={{}}
							>
								<Text
									style={[
										styles.containerTxt,
										{ color: savedFilter ? COLORS.white : COLORS.secondary },
									]}
								>
									{i18n.t("saved")}
								</Text>
							</Animatable.View>
						</TouchableOpacity>
					</ScrollView>
				</View>
			</View>
		);
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: COLORS.light,
				flexDirection: "column",
			}}
		>
			{renderHeader()}
			<View style={[{ flex: 1, paddingHorizontal: 20 }]}>
				<PinList pinList={filteredData} navigation={navigation}></PinList>
			</View>
		</SafeAreaView>
	);
}

//https://wix.github.io/react-native-navigation/docs/style-animations/

const styles = StyleSheet.create({
	body: {
		fontSize: 15,
		color: COLORS.darkGrey,
	},
	containerTxt: {
		fontSize: 13,
		fontWeight: "bold",
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
	shadowSelected: {
		elevation: 5,
		shadowColor: COLORS.green1,
	},
});

export default PinsScreen;
