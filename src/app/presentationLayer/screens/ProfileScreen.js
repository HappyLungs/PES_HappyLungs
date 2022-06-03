import React, { useContext, useState, useEffect } from "react";

import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
	ImageBackground,
	Share,
	ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";
import CustomToast from "../components/CustomToast";

import COLORS from "../../config/stylesheet/colors";
import UserContext from "../../domainLayer/UserContext";
import i18n from "../../config/translation";

const PresentationCtrl = require("../PresentationCtrl.js");

function ProfileScreen({ navigation, route }) {
	let presentationCtrl = new PresentationCtrl();
	const toastProfile = route.params.toastProfile;
	const toastSettings = route.params.toastSettings;
	const [user, setUser] = useContext(UserContext);

	const [numPins, setNumPins] = useState([0]);
	const [points, setPoints] = useState([0]);
	const [savedPins, setSavedPins] = useState([0]);

	const showToast = () => {
		Toast.show({
			position: "bottom",
			type: toastProfile ? "successToast" : "configToast",
			text1: toastProfile
				? i18n.t("profileSuccess")
				: i18n.t("settingsSuccess"),
		});
	};

	useEffect(() => {
		if (toastProfile || toastSettings) {
			showToast();
			navigation.setParams({ toastProfile: false, toastSettings: false });
		}
	});

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", async () => {
			const getAll = async () => {
				const userStats = await presentationCtrl.fetchUserStats(user.email);
				setNumPins(userStats.pins);
				setPoints(userStats.points);
				setSavedPins(userStats.savedPins);
			};
			await getAll();
		});
		return unsubscribe;
	}, []);

	function logOut() {
		setUser({
			__v: 0,
			_id: "",
			birthdate: "",
			createdAt: "",
			email: "",
			healthStatus: "",
			language: "",
			name: "",
			password: "",
			points: 0,
			savedPins: [],
			updatedAt: "",
			accessToken: "",
		});
		navigation.navigate("SignInScreen");
		// setUser(null);
	}

	async function share() {
		try {
			await Share.share(
				{
					message:
						"Download Happy Lungs \n\nBreath Safely, Breath With Us \n\nhttps://expo.dev/artifacts/80ab14c9-88cd-47b5-b6f6-a54d202b82a3",
				},
				{
					dialogTitle: "Happy Lungs",
				}
			);
		} catch (err) {}
	}

	const [modalLogoutVisible, setModalLogoutVisible] = useState(false);

	function renderModalLogout() {
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalLogoutVisible}
				onRequestClose={() => {
					setModalLogoutVisible(!modalLogoutVisible);
				}}
				onBackdropPress={() => {
					setModalLogoutVisible(!modalLogoutVisible);
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
								{ fontWeight: "bold", alignSelf: "center", bottom: -3 },
							]}
						>
							{i18n.t("logOutConfirmation")}
						</Text>
						<View>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-around",
									alignSelf: "center",
									marginTop: 30,
									marginHorizontal: 5,
									width: 220,
								}}
							>
								<TouchableOpacity
									activeOpacity={0.8}
									style={[
										styles.containerBtn2,
										styles.shadow,
										{ backgroundColor: COLORS.red1 },
									]}
									onPress={() => setModalLogoutVisible(false)}
								>
									<Text style={styles.containerTxt}>{i18n.t("no")}</Text>
								</TouchableOpacity>
								<TouchableOpacity
									activeOpacity={0.8}
									style={[
										styles.containerBtn2,
										styles.shadow,
										{ backgroundColor: COLORS.green1 },
									]}
									onPress={logOut}
								>
									<Text style={styles.containerTxt}>{i18n.t("yes")}</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		);
	}

	return (
		<View
			style={{
				flexDirection: "column",
				flex: 1,
				alignItems: "flex-start",
				justifyContent: "flex-start",
				backgroundColor: COLORS.white,
			}}
		>
			<View
				style={{
					paddingHorizontal: 20,
					backgroundColor: "blue",
				}}
			></View>
			<View
				style={{
					flexDirection: "row",
					paddingHorizontal: 20,
					//marginTop: 20,
				}}
			>
				<View style={{ flexDirection: "row", flex: 1 }}>
					<View
						style={{
							flex: 2,
							alignItems: "center",
							flexDirection: "column",
						}}
					>
						<ImageBackground
							source={{ uri: user.profilePicture }}
							style={[
								{
									marginTop: 15,
									borderRadius: 30,
									borderColor: COLORS.green1,
									borderBottomWidth: 2,
									width: 90,
									height: 115,
									justifyContent: "flex-start",
									marginBottom: 5,
								},
								styles.long_shadow,
							]}
							imageStyle={{
								borderRadius: 20,
								resizeMode: "cover",
							}}
						></ImageBackground>
						<Text
							style={{
								alignItems: "center",
								marginLeft: 0,
								color: COLORS.secondary,
								fontWeight: "bold",
								fontSize: 19,
								textAlign: "center",
								textAlignVertical: "center",
							}}
						>
							{user.name}
						</Text>
					</View>
					<View
						style={{
							flex: 3,
							justifyContent: "center",
							//marginStart: 10,
						}}
					>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<View
								style={{
									alignItems: "center",
									marginLeft: 0,
								}}
							>
								<Text
									style={{
										fontWeight: "bold",
										fontSize: 23,
										color: COLORS.secondary,
									}}
								>
									{numPins}
								</Text>
								<Text style={{ color: COLORS.darkGrey }}>
									{i18n.t("createdPins")}
								</Text>
							</View>
							<View
								style={{
									alignSelf: "center",
									backgroundColor: COLORS.lightGrey,
									height: "80%",
									width: 2,
									marginHorizontal: 5,
								}}
							></View>
							<View
								style={{
									alignItems: "center",
								}}
							>
								<Text
									style={{
										fontWeight: "bold",
										fontSize: 23,
										color: COLORS.secondary,
									}}
								>
									{savedPins}
								</Text>
								<Text style={{ color: COLORS.darkGrey }}>
									{i18n.t("savedPins")}
								</Text>
							</View>
						</View>
						<TouchableOpacity
							activeOpacity={0.8}
							style={[
								{
									backgroundColor: COLORS.green1,
									height: 40,
									width: 125,
									borderRadius: 12,
									marginTop: 20,
									alignSelf: "center",
								},
								styles.shadow,
							]}
							onPress={() => {
								navigation.navigate("RankingScreen", { scroll: true });
							}}
						>
							<View
								style={{
									flex: 1,
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<View
									style={{
										width: 25,
										height: 25,
										alignItems: "center",
										justifyContent: "center",
										borderRadius: 20,
										backgroundColor: COLORS.green2,
									}}
								>
									<AntDesign name="Trophy" size={18} color={COLORS.white} />
								</View>
								<Text
									style={[
										{ fontWeight: "bold", marginLeft: 10, color: COLORS.white },
									]}
								>
									{points}
								</Text>
								<Text style={[{ marginLeft: 3, color: COLORS.white }]}>
									{i18n.t("points")}
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<View
				style={{
					alignSelf: "center",
					backgroundColor: COLORS.lightGrey,
					height: 6,
					marginTop: 20,
					marginBottom: 15,
					width: "100%",
				}}
			/>
			<View
				style={{
					alignSelf: "center",
					marginHorizontal: 30,
					alignItems: "flex-start",
					flexDirection: "column",
				}}
			>
				<Text style={[styles.textOption, { fontSize: 17 }]}>
					{i18n.t("healthState")}
				</Text>
				<View
					style={{
						flexDirection: "row",
						marginVertical: 15,
					}}
				>
					<View style={{ alignItems: "center", width: 115 }}>
						<View
							style={[
								styles.containerState,
								styles.shadow,
								{
									backgroundColor: user.healthStatus[0]
										? COLORS.green1
										: COLORS.secondary,
								},
							]}
						>
							<FontAwesome5 name="lungs" size={35} color={COLORS.white} />
						</View>
						<Text style={styles.textState}>{i18n.t("healthState1")}</Text>
					</View>
					<View style={{ alignItems: "center", width: 115 }}>
						<View
							style={[
								styles.containerState,
								styles.shadow,
								{
									backgroundColor: user.healthStatus[1]
										? COLORS.green1
										: COLORS.secondary,
								},
							]}
						>
							<MaterialIcons
								name="pregnant-woman"
								size={35}
								color={COLORS.white}
							/>
						</View>
						<Text style={styles.textState}>{i18n.t("healthState2")}</Text>
					</View>
					<View style={{ alignItems: "center", width: 115 }}>
						<View
							style={[
								styles.containerState,
								styles.shadow,
								{
									backgroundColor: user.healthStatus[2]
										? COLORS.green1
										: COLORS.secondary,
								},
							]}
						>
							<MaterialIcons name="elderly" size={35} color={COLORS.white} />
						</View>
						<Text style={styles.textState}>{i18n.t("healthState3")}</Text>
					</View>
				</View>
			</View>
			<View
				style={{
					alignSelf: "center",
					backgroundColor: COLORS.lightGrey,
					height: 6,
					marginBottom: 15,
					width: "100%",
				}}
			/>
			<ScrollView
				style={{
					flex: 1,
					marginHorizontal: 30,
					flexDirection: "column",
				}}
				contentContainerStyle={{ alignItems: "flex-start" }}
			>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => {
						navigation.navigate("SettingsScreen");
					}}
					style={styles.containerOption}
				>
					<Ionicons name="settings-outline" size={27} color={COLORS.green1} />
					<Text style={styles.textOption}>{i18n.t("settings")}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => {
						navigation.navigate("RankingScreen", { scroll: false });
					}}
					style={styles.containerOption}
				>
					<AntDesign name="Trophy" size={27} color={COLORS.green1} />
					<Text style={styles.textOption}>{i18n.t("ranking")}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => share()}
					style={styles.containerOption}
				>
					<Feather name="users" size={27} color={COLORS.green1} />
					<Text style={styles.textOption}>{i18n.t("shareOption")}</Text>
				</TouchableOpacity>
			</ScrollView>
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() => setModalLogoutVisible()}
				style={[
					styles.containerOption,
					{ marginHorizontal: 30, marginBottom: 20 },
				]}
			>
				<Feather name="power" size={27} color={COLORS.red1} />
				<Text style={styles.textOption}>{i18n.t("logOut")}</Text>
			</TouchableOpacity>
			{renderModalLogout()}
			<CustomToast />
		</View>
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
		marginVertical: 10,
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
		backgroundColor: COLORS.white,
		borderRadius: 15,
		padding: 20,
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
	containerBtn2: {
		width: 85,
		padding: 10,
		borderRadius: 5,
	},
	containerTxt: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 15,
		color: COLORS.white,
	},
});

export default ProfileScreen;
