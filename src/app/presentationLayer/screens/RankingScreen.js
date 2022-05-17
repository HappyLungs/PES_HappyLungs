import React, { useState, useContext, useEffect } from "react";
import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
	Image,
	ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Leaderboard from "../components/Leaderboard";

import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import COLORS from "../../config/stylesheet/colors";
import i18n from "../../config/translation";
import UserContext from "../../domainLayer/UserContext";
const PresentationCtrl = require("../PresentationCtrl.js");

function SettingsScreen({ navigation }) {
	let presentationCtrl = new PresentationCtrl();

	const [user, setUser] = useContext(UserContext);
	const [masterData, setMasterData] = useState([]);

	function renderLeaderboardHeader() {
		return (
			<View
				style={[
					{
						flexDirection: "row",
						paddingHorizontal: 10,
						alignItems: "center",
						backgroundColor: COLORS.light,
						padding: 10,
						marginVertical: 10,
					},
				]}
			>
				<View
					style={{
						backgroundColor: COLORS.secondary,
						height: 30,
						width: 90,
						borderRadius: 5,
						justifyContent: "center",
						alignItems: "center",
						marginHorizontal: 5,
					}}
				>
					<Text style={[styles.containerTxt, { color: COLORS.white }]}>
						{i18n.t("rank")}
					</Text>
				</View>

				<View
					style={{
						backgroundColor: COLORS.secondary,
						height: 30,
						width: 150,
						paddingHorizontal: 15,
						borderRadius: 5,
						justifyContent: "center",
						marginHorizontal: 5,
					}}
				>
					<Text style={[styles.containerTxt, { color: COLORS.white }]}>
						{i18n.t("user")}
					</Text>
				</View>
				<View
					style={{
						backgroundColor: COLORS.secondary,
						height: 30,
						width: 105,
						paddingHorizontal: 15,
						borderRadius: 5,
						justifyContent: "center",
						alignItems: "center",
						marginHorizontal: 5,
					}}
				>
					<Text style={[styles.containerTxt, { color: COLORS.white }]}>
						{i18n.t("score")}
					</Text>
				</View>
			</View>
		);
	}

	const FirstRoute = () => (
		<View style={{ flex: 1, backgroundColor: COLORS.light }}>
			{renderLeaderboardHeader()}
			<View
				style={{
					borderWidth: 1.3,
					borderStyle: "dashed",
					borderRadius: 1,
					borderColor: COLORS.green2,
				}}
			></View>
			<Leaderboard chatsList={masterData} navigation={navigation}></Leaderboard>
		</View>
	);

	const SecondRoute = () => (
		<View style={{ flex: 1, backgroundColor: "white" }} />
	);

	const renderScene = SceneMap({
		first: FirstRoute,
		second: SecondRoute,
	});

	useEffect(() => {
		fetchChats();
		return () => {};
	}, []);

	const fetchChats = async () => {
		//get chats from db
		//ought to fetch them before navigate
		const data = await presentationCtrl.fetchNewConversations(user.email);
		setMasterData(data);
	};

	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: "first", title: i18n.t("leaderboard") },
		{ key: "second", title: i18n.t("trophies") },
	]);

	const renderTabBar = (props) => (
		<TabBar
			{...props}
			indicatorStyle={[
				{ backgroundColor: COLORS.green2, height: 3 },
				styles.shadow,
			]}
			style={[{ backgroundColor: COLORS.white }, styles.shadow]}
			renderLabel={({ route, focused, color }) => (
				<Text
					style={{
						fontSize: 15,
						width: 100,
						color: COLORS.green1,
						fontWeight: focused ? "bold" : "normal",
						textAlign: "center",
					}}
				>
					{route.title}
				</Text>
			)}
			renderIcon={({ route, focused, color }) => (
				<MaterialCommunityIcons
					name={
						route.key === "first"
							? focused
								? "trophy"
								: "trophy-outline"
							: focused
							? "bullseye-arrow"
							: "bullseye"
					}
					size={23}
					color={COLORS.green2}
				/>
			)}
		/>
	);
	return (
		<TabView
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={{ width: "100%" }}
			renderTabBar={renderTabBar}
		/>
	);
}

const styles = StyleSheet.create({
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
	long_shadow: {
		shadowColor: COLORS.black,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 25,
	},
	containerOption: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 15,
	},
	textOption: {
		color: COLORS.secondary,
		fontWeight: "bold",
		fontSize: 15,
		marginHorizontal: 10,
	},
	containerState: {
		flexDirection: "column",
		width: 60,
		height: 60,
		marginHorizontal: 10,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 20,
	},
	textState: {
		color: COLORS.secondary,
		fontWeight: "bold",
		fontSize: 14,
		textAlign: "center",
		marginTop: 5,
	},
	containerBtn: {
		width: 110,
		padding: 10,
		borderRadius: 5,
	},
	containerBtn2: {
		width: 85,
		padding: 10,
		borderRadius: 5,
	},
	containerTxt: {
		textAlign: "left",
		fontWeight: "bold",
		fontSize: 14,
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		width: "80%",
	},
	modalView: {
		margin: 25,
		height: 200,
		width: 240,
		backgroundColor: COLORS.white,
		borderRadius: 15,
		padding: 20,
		alignItems: "center",
	},
	modalText: {
		textAlign: "center",
		fontSize: 16,
	},
});

export default SettingsScreen;
