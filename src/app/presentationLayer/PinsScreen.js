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

import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

function PinsScreen({ navigation }) {
	let presentationCtrl = new PresentationCtrl();

	const [filteredData, setFilteredData] = useState([]);
	const [masterData, setMasterData] = useState([]);
	const [search, setSearch] = useState("");

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

	const searchFilter = (text) => {
		if (text) {
			const newData = masterData.filter((item) => {
				console.log(item.name);
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
							My Pins
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
								value={search}
								style={styles.body}
								placeholder={"Search"}
								onChangeText={(text) => searchFilter(text)}
							/>
						</View>
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
			<View style={{ backgroundColor: COLORS.light }}>
				<Text>Most Recent</Text>
			</View>
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
		marginStart: 10,
		color: COLORS.darkGrey,
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
