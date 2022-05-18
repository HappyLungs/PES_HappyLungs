import React, { useContext, useState } from "react";

import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
	ImageBackground,
	Share,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Modal from "react-native-modal";

import COLORS from "../../config/stylesheet/colors";
import UserContext from "../../domainLayer/UserContext";
import i18n from "../../config/translation";

function ProfileScreen({ navigation, route }) {
	//should know userId, and then retrieve the user data (updated or not)

	const [user, setUser] = useContext(UserContext);

	function settings() {
		navigation.navigate("SettingsScreen");
	}

	function calendar() {
		//no se que ha de fer
	}

	function rewards() {
		navigation.navigate("RankingScreen");
	}

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
		});
		navigation.navigate("SignInScreen");
		// setUser(null);
	}

	async function share() {
		try {
			await Share.share({
				title: "Happy Lungs",
				message: "Breath Safely, Breath With Us",
				url: "https://happylungsproject.org/", //url és ios only
			});
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
					flexDirection: "row",
					paddingHorizontal: 20,
				}}
			>
				<View
					style={{
						flex: 2,
						alignItems: "center",
					}}
				>
					<ImageBackground
						source={{ uri: user.profilePicture }}
						style={[
							{
								borderRadius: 20,
								width: 100,
								height: 125,
								justifyContent: "flex-end",
							},
							styles.long_shadow,
						]}
						imageStyle={{
							borderRadius: 10,
							resizeMode: "cover",
						}}
					>
						<View
							style={[
								{
									backgroundColor: COLORS.light,
									alignSelf: "center",
									borderRadius: 5,
									top: 20,
									padding: 5,
									paddingHorizontal: 10,
								},
								styles.shadow,
							]}
						>
							<Text style={{ color: COLORS.secondary, fontWeight: "bold" }}>
								{user.name}
							</Text>
						</View>
					</ImageBackground>
				</View>
				<View
					style={{
						flex: 3,
						justifyContent: "flex-start",
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							marginTop: 10,
						}}
					>
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
								3
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
								{user.savedPins.length}
							</Text>
							<Text style={{ color: COLORS.darkGrey }}>
								{i18n.t("savedPins")}
							</Text>
						</View>
					</View>
					<TouchableOpacity
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
								{user.points}
							</Text>
							<Text style={[{ marginLeft: 3, color: COLORS.white }]}>
								{i18n.t("points")}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
			<View
				style={{
					alignSelf: "center",
					backgroundColor: COLORS.lightGrey,
					height: 6,
					marginTop: 35,
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
			<View
				style={{
					flex: 1,
					marginHorizontal: 30,
					alignItems: "flex-start",
					flexDirection: "column",
				}}
			>
				<TouchableOpacity
					onPress={() => settings()}
					style={styles.containerOption}
				>
					<Ionicons name="settings-outline" size={27} color={COLORS.green1} />
					<Text style={styles.textOption}>{i18n.t("settings")}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => calendar()}
					style={styles.containerOption}
				>
					<Ionicons name="md-calendar" size={27} color={COLORS.green1} />
					<Text style={styles.textOption}>{i18n.t("calendar")}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => rewards()}
					style={styles.containerOption}
				>
					<AntDesign name="Trophy" size={27} color={COLORS.green1} />
					<Text style={styles.textOption}>{i18n.t("ranking")}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => share()}
					style={styles.containerOption}
				>
					<Feather name="users" size={27} color={COLORS.green1} />
					<Text style={styles.textOption}>{i18n.t("shareOption")}</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
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
