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

import COLORS, {
	green1,
	green2,
	green3,
	red1,
} from "../../config/stylesheet/colors";
import i18n from "../../config/translation";
import UserContext from "../../domainLayer/UserContext";

import * as Progress from "react-native-progress";

const PresentationCtrl = require("../PresentationCtrl.js");

function RankingScreen({ navigation, route }) {
	let presentationCtrl = new PresentationCtrl();
	const scrollToUser = route.params.scroll;

	const [user, setUser] = useContext(UserContext);
	const [masterData, setMasterData] = useState([]);

	const [statePins, setStatePins] = useState([0]);
	const [numPins, setNumPins] = useState([0]);
	const [progressPins, setProgressPins] = useState([0]);
	const [stateConversations, setStateConversations] = useState([0]);
	const [numConversations, setNumConversations] = useState([0]);
	const [progressConversations, setProgressConversations] = useState([0]);

	let trophies = [
		"https://i.ibb.co/HzVDSLq/nada.png",
		"https://i.ibb.co/02vY7w7/bronce.png",
		"https://i.ibb.co/mcZ8BMf/plata.png",
		"https://i.ibb.co/vz5W0Wx/oro.png",
	];

	let maxValues = [1, 5, 10, 10];

	useEffect(async () => {
		const getAll = async () => {
			const userStats = await presentationCtrl.fetchUserStats(user.email);
			setNumPins(userStats.pins);
			setNumConversations(userStats.chats);
		};
		getStatePins();
		getStateConversations();
		await getAll();
	});

	const getStatePins = () => {
		if (numPins < 1) {
			setStatePins(0);
			setProgressPins((numPins / maxValues[statePins]) * 100);
		} else if (numPins >= 1 && numPins < 5) {
			setStatePins(1);
			setProgressPins((numPins / maxValues[statePins]) * 100);
		} else if (numPins >= 5 && numPins < 10) {
			setStatePins(2);
			setProgressPins((numPins / maxValues[statePins]) * 100);
		} else if (numPins >= 10) {
			setStatePins(3);
			setProgressPins(100);
		}
	};

	const getStateConversations = () => {
		if (numConversations < 1) {
			setStateConversations(0);
			setProgressConversations(
				(numConversations / maxValues[stateConversations]) * 100
			);
		} else if (numConversations >= 1 && numConversations < 5) {
			setStateConversations(1);
			setProgressConversations(
				(numConversations / maxValues[stateConversations]) * 100
			);
		} else if (numConversations >= 5 && numConversations < 10) {
			setStateConversations(2);
			setProgressConversations(
				(numConversations / maxValues[stateConversations]) * 100
			);
		} else if (numConversations >= 10) {
			setStateConversations(3);
			setProgressConversations(100);
		}
	};

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
			<Leaderboard
				usersList={masterData}
				navigation={navigation}
				email={user.email}
				scroll={scrollToUser}
			></Leaderboard>
		</View>
	);

	/*
	 */
	const SecondRoute = () => (
		<View
			style={{ flex: 1, backgroundColor: "white", flexDirection: "column" }}
		>
			<View
				style={{
					flexDirection: "row",
					marginTop: 20,
					marginLeft: 30,
				}}
			>
				<View
					style={{
						flexDirection: "column",
					}}
				>
					<View
						style={{
							backgroundColor: COLORS.lightGrey,
							height: 30,
							width: 300,
							borderRadius: 5,
							justifyContent: "center",
							alignItems: "center",
							marginVertical: 10,
						}}
					>
						{/*getStatePins()*/}
						<Text style={[styles.containerTxt2, { color: COLORS.black }]}>
							{i18n.t("createdPins")}
						</Text>
					</View>
					<Progress.Bar
						progress={progressPins / 100}
						width={300}
						height={40}
						backgroundColor={green3}
						color={green1}
						maxValue={100}
						borderWidth={0}
					/>
				</View>
				<View
					style={{
						flexDirection: "column",
					}}
				>
					<View
						style={{
							backgroundColor: COLORS.lightGrey,
							height: 30,
							width: 40,
							borderRadius: 5,
							justifyContent: "center",
							alignItems: "center",
							marginVertical: 10,
							marginLeft: 5,
						}}
					>
						<Text style={[styles.containerTxt2, { color: COLORS.black }]}>
							{numPins}/{maxValues[statePins]}
						</Text>
					</View>
					<Image
						source={{
							uri: trophies[statePins],
						}}
						style={{
							width: 40,
							height: 40,
							borderRadius: 5,
							marginLeft: 5,
						}}
					/>
				</View>
			</View>
			<View
				style={{
					flexDirection: "row",
					marginTop: 20,
					marginLeft: 30,
				}}
			>
				<View
					style={{
						flexDirection: "column",
					}}
				>
					<View
						style={{
							backgroundColor: COLORS.lightGrey,
							height: 30,
							width: 300,
							borderRadius: 5,
							justifyContent: "center",
							alignItems: "center",
							marginVertical: 10,
						}}
					>
						{/*getStateConversations()*/}
						<Text style={[styles.containerTxt, { color: COLORS.black }]}>
							{i18n.t("createdConversations")}
						</Text>
					</View>
					<Progress.Bar
						progress={progressConversations / 100}
						width={300}
						height={40}
						backgroundColor={green3}
						color={green1}
						maxValue={100}
						borderWidth={0}
					/>
				</View>
				<View
					style={{
						flexDirection: "column",
					}}
				>
					<View
						style={{
							backgroundColor: COLORS.lightGrey,
							height: 30,
							width: 40,
							borderRadius: 5,
							justifyContent: "center",
							alignItems: "center",
							marginVertical: 10,
							marginLeft: 5,
						}}
					>
						<Text style={[styles.containerTxt2, { color: COLORS.black }]}>
							{numConversations}/{maxValues[stateConversations]}
						</Text>
					</View>
					<Image
						source={{
							uri: trophies[stateConversations],
						}}
						style={{
							width: 40,
							height: 40,
							borderRadius: 5,
							marginLeft: 5,
						}}
					/>
				</View>
			</View>
		</View>
	);

	const renderScene = SceneMap({
		first: FirstRoute,
		second: SecondRoute,
	});

	useEffect(() => {
		if (masterData !== []) {
			fetchUsers();
		}
		return () => {};
	}, []);

	const fetchUsers = async () => {
		const data = await presentationCtrl.fetchRanking();
		setMasterData(Array.from(data.data));
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

	containerTxt2: {
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
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

export default RankingScreen;
