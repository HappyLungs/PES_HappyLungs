import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";

import COLORS from "../config/stylesheet/colors";
import PinList from "./components/PinList";
const PresentationCtrl = require("./PresentationCtrl.js");

import { MaterialIcons } from "@expo/vector-icons";

function PinsScreen({ navigation }) {
	let presentationCtrl = new PresentationCtrl();

	const [filteredData, setFilteredData] = useState([]);
	const [masterData, setMasterData] = useState([]);
	const [search, setSearch] = useState("");
	const [recentFilter, setRecentFilter] = useState(false);
	const [privacyFilter, setPrivacyFilter] = useState("All");
	const [typeFilter, setTypeFilter] = useState("All");

	const isMyPin = [true, false, true, false, true, true];

	useEffect(() => {
		fetchPins();
		return () => {};
	}, []);

	const fetchPins = async () => {
		//get pins from db
		//ought to fetch them before navigate
		const data = await presentationCtrl.fetchPins();
		setMasterData(data);
		setFilteredData(data);
	};

	const customFilter = (filter) => {
		console.log(filter);
	};

	const filterByPrivacy = () => {
		let privacy = "All";
		if (privacyFilter === "All") privacy = "Public";
		else if (privacyFilter === "Public") privacy = "Private";
		setPrivacyFilter(privacy);
		if (privacy === "All") {
			setFilteredData(masterData);
		} else if (privacy === "Public") {
			const newData = masterData.filter((item, index) => {
				return (item.status === "Public") & isMyPin[index];
			});
			setFilteredData(newData);
		} else {
			const newData = masterData.filter((item, index) => {
				return (item.status === "Private") & isMyPin[index];
			});
			setFilteredData(newData);
		}
	};
	const filterByType = () => {
		let type = "All";
		if (typeFilter === "All") type = "Created";
		else if (typeFilter === "Created") type = "Saved";
		setTypeFilter(type);
		if (type === "All") {
			setFilteredData(masterData);
		} else if (type === "Created") {
			const newData = masterData.filter((item, index) => {
				//return item.status === "Created"; //real
				return isMyPin[index]; //fake
			});
			setFilteredData(newData);
		} else {
			const newData = masterData.filter((item, index) => {
				//return item.status === "Saved"; 	//real
				return !isMyPin[index]; //fake
			});
			setFilteredData(newData);
		}
		//searchFilter might be necessary
		//searchFilter(search);
	};

	const searchFilter = (text) => {
		if (text) {
			const newData = masterData.filter((item) => {
				const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
				const textData = text.toUpperCase();
				return itemData.indexOf(textData) > -1;
			});
			setFilteredData(newData);
			setSearch(text);
		} else {
			setFilteredData(masterData);
			setSearch(text);
		}
	};

	function renderPinList() {
		return <PinList pinList={filteredData} navigation={navigation}></PinList>;
	}

	function renderHeader() {
		return (
			<View
				style={[
					{
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
								width={175}
								value={search}
								style={[styles.body, { marginStart: 10 }]}
								placeholder={"Search"}
								onChangeText={(text) => searchFilter(text)}
							/>
						</View>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-evenly",
							marginVertical: 15,
						}}
					>
						<TouchableOpacity
							style={[
								{
									backgroundColor: recentFilter
										? COLORS.green1
										: COLORS.secondary,
									height: 40,
									width: 80,
									borderRadius: 12,
									paddingHorizontal: 5,
									justifyContent: "center",
									alignItems: "center",
								},
								styles.shadow,
							]}
							onPress={() => {
								setRecentFilter(!recentFilter);
								customFilter("recentFilter");
							}}
						>
							<Text style={styles.containerTxt}>Recent</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								{
									backgroundColor:
										privacyFilter === "All" ? COLORS.secondary : COLORS.green1,
									height: 40,
									width: 80,
									paddingHorizontal: 5,
									borderRadius: 12,
									justifyContent: "center",
									alignItems: "center",
								},
								styles.shadow,
							]}
							onPress={() => {
								setPrivacyFilter(
									privacyFilter === "All"
										? "Public"
										: privacyFilter === "Public"
										? "Private"
										: "All"
								);
								filterByPrivacy();
							}}
						>
							<Text style={styles.containerTxt}>{privacyFilter}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								{
									backgroundColor:
										typeFilter === "All" ? COLORS.secondary : COLORS.green1,
									height: 40,
									width: 80,
									paddingHorizontal: 5,
									borderRadius: 12,
									justifyContent: "center",
									alignItems: "center",
								},
								styles.shadow,
							]}
							onPress={() => {
								filterByType();
							}}
						>
							<Text style={styles.containerTxt}>{typeFilter}</Text>
						</TouchableOpacity>
					</View>
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
			<View style={[{ marginTop: 20, flex: 1, paddingHorizontal: 20 }]}>
				{renderPinList()}
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
		color: COLORS.white,
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
});

export default PinsScreen;
