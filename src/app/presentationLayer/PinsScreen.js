import React, { useState, useEffect, useRef } from "react";
import {
	StyleSheet,
	View,
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	FlatList,
} from "react-native";

import COLORS from "../config/stylesheet/colors";
import PinList from "./components/PinList";
const PresentationCtrl = require("./PresentationCtrl.js");

import { MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

function PinsScreen({ navigation }) {
	let presentationCtrl = new PresentationCtrl();

	const [masterData, setMasterData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [auxiliarFilterData, setAuxiliarFilterData] = useState([]);
	const [auxiliarFilterData2, setAuxiliarFilterData2] = useState([]);
	const [search, setSearch] = useState("");
	const [dateFilter, setDateFilter] = useState(true);
	const [ratingFilter, setRatingFilter] = useState(false);
	const [createdFilter, setCreatedFilter] = useState(false);
	const [savedFilter, setSavedFilter] = useState(false);

	const AnimationRefFilter1 = useRef(null);
	const AnimationRefFilter2 = useRef(null);
	const AnimationRefFilter3 = useRef(null);
	const AnimationRefFilter4 = useRef(null);
	const isMyPin = [true, false, true, false, true, true];

	useEffect(() => {
		fetchPins();
		return () => {};
	}, []);

	const fetchPins = async () => {
		//get pins from db
		//ought to fetch them before navigate
		const data = await presentationCtrl.fetchPins();
		const sortedData = [...data].sort(function (item1, item2) {
			return standarizeDate(item1.date) <= standarizeDate(item2.date);
		});
		setMasterData(data);
		setFilteredData(sortedData);
		setAuxiliarFilterData(sortedData);
		//filterByDate(true);
	};

	const filterBySearch = (text) => {
		if (text) {
			if (savedFilter || createdFilter) {
				setSavedFilter(false);
				setCreatedFilter(false);
			}
			let newData = [];
			if (ratingFilter || dateFilter) {
				newData = filteredData.filter((item) => {
					const itemData = item.name
						? item.name.toUpperCase()
						: "".toUpperCase();
					const textData = text.toUpperCase();
					return itemData.indexOf(textData) > -1;
				});
			} else {
				newData = masterData.filter((item) => {
					const itemData = item.name
						? item.name.toUpperCase()
						: "".toUpperCase();
					const textData = text.toUpperCase();
					return itemData.indexOf(textData) > -1;
				});
				setAuxiliarFilterData(filteredData);
			}
			setFilteredData(newData);
			setSearch(text);
		} else {
			if (ratingFilter || dateFilter) {
				setFilteredData(auxiliarFilterData);
			} else {
				setFilteredData(masterData);
			}
			setSearch(text);
		}
	};

	const filterByDate = (selected) => {
		if (ratingFilter) {
			setRatingFilter(false);
		}
		if (selected) {
			let newData = [];
			if (createdFilter || savedFilter) {
				newData = [...filteredData].sort(function (item1, item2) {
					return standarizeDate(item1.date) <= standarizeDate(item2.date);
				});
			} else {
				newData = [...masterData].sort(function (item1, item2) {
					return standarizeDate(item1.date) <= standarizeDate(item2.date);
				});
				setAuxiliarFilterData(newData);
			}
			setFilteredData(newData);
		} else {
			if (createdFilter || savedFilter) {
				if (createdFilter || savedFilter) setFilteredData(auxiliarFilterData2);
				else setFilteredData(auxiliarFilterData);
			} else {
				setFilteredData(masterData);
				setAuxiliarFilterData(masterData);
			}
		}
		setDateFilter(!dateFilter);
	};

	const standarizeDate = (date) => {
		var standarizedDate = "";
		return standarizedDate.concat(
			date.slice(6, 10),
			"/",
			date.slice(3, 5),
			"/",
			date.slice(0, 2)
		);
	};

	const filterByRating = (selected) => {
		if (dateFilter) {
			setDateFilter(false);
			//zero filter
		}
		if (selected) {
			let newData = [];
			if (createdFilter || savedFilter) {
				newData = [...filteredData].sort(function (item1, item2) {
					return item1.rating <= item2.rating;
				});
			} else {
				newData = [...masterData].sort(function (item1, item2) {
					return item1.rating <= item2.rating;
				});
				setAuxiliarFilterData(newData);
			}
			setFilteredData(newData);
		} else {
			if (createdFilter || savedFilter) {
				if (createdFilter || savedFilter) setFilteredData(auxiliarFilterData2);
				else setFilteredData(auxiliarFilterData);
			} else {
				setFilteredData(masterData);
				setAuxiliarFilterData(masterData);
			}
		}
		setRatingFilter(!ratingFilter);
	};

	const filterCreated = (selected) => {
		if (selected) {
			let newData = [];
			if (dateFilter || ratingFilter || savedFilter) {
				if (savedFilter) {
					setSavedFilter(false);
					newData = auxiliarFilterData.filter((item, index) => {
						return isMyPin[index]; //fake, rn there's no way to check if a pin is mine => author attrib in pin
					});
				} else {
					newData = filteredData.filter((item, index) => {
						//return item.status === 'created'; //real
						return isMyPin[index]; //fake, rn there's no way to check if a pin is mine => author attrib in pin
					});
					if (dateFilter || ratingFilter) {
					}
				}
				setAuxiliarFilterData2(newData);
				//setAuxiliarFilterData(newData);
			} else {
				newData = masterData.filter((item, index) => {
					return isMyPin[index]; //fake, rn there's no way to check if a pin is mine => author attrib in pin
				});
				setAuxiliarFilterData(filteredData);
			}
			setFilteredData(newData);
		} else {
			if (ratingFilter || dateFilter) {
				setFilteredData(auxiliarFilterData);
			} else {
				setFilteredData(masterData);
				setAuxiliarFilterData(masterData);
			}
		}
		setCreatedFilter(!createdFilter);
	};

	const filterSaved = (selected) => {
		if (selected) {
			let newData = [];
			if (dateFilter || ratingFilter || createdFilter) {
				if (createdFilter) {
					setCreatedFilter(false);
					newData = auxiliarFilterData.filter((item, index) => {
						return !isMyPin[index]; //fake, rn there's no way to check if a pin is mine => author attrib in pin
					});
				} else {
					newData = filteredData.filter((item, index) => {
						return !isMyPin[index]; //fake, rn there's no way to check if a pin is mine => author attrib in pin
					});
					if (dateFilter || ratingFilter) {
					}
				}
				setAuxiliarFilterData2(newData);
				//setAuxiliarFilterData(newData);
			} else {
				newData = masterData.filter((item, index) => {
					return !isMyPin[index]; //fake, rn there's no way to check if a pin is mine => author attrib in pin
				});
				setAuxiliarFilterData(filteredData);
			}
			setFilteredData(newData);
		} else {
			if (ratingFilter || dateFilter) {
				setFilteredData(auxiliarFilterData);
			} else {
				setFilteredData(masterData);
				setAuxiliarFilterData(masterData);
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
					<Text
						style={[
							{
								fontSize: 20,
								fontWeight: "bold",
								color: COLORS.secondary,
								marginTop: 35,
								marginBottom: 10,
							},
						]}
					>
						My Pins
					</Text>
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
								placeholder={"Search"}
								onChangeText={(text) => filterBySearch(text)}
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
									marginHorizontal: 7,
								},
								dateFilter ? styles.shadowSelected : styles.shadow,
							]}
							onPress={() => {
								filterByDate(!dateFilter);
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
								onPress={{}}
							>
								<Text
									style={[
										styles.containerTxt,
										{ color: dateFilter ? COLORS.white : COLORS.secondary },
									]}
								>
									Most Recent
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
								filterByRating(!ratingFilter);
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
									Best Rated
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
								filterCreated(!createdFilter);
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
									Created
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
								filterSaved(!savedFilter);
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
									Saved
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
		elevation: 10,
		shadowColor: COLORS.green1,
	},
});

export default PinsScreen;
