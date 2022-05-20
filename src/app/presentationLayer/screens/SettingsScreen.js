import React, { useState, useContext } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Modal from "react-native-modal";

import COLORS from "../../config/stylesheet/colors";
import i18n from "../../config/translation";
import UserContext from "../../domainLayer/UserContext";
const PresentationCtrl = require("../PresentationCtrl.js");

function SettingsScreen({ navigation }) {
	let presentationCtrl = new PresentationCtrl();
	//should pass userId, and then retrieve the updated data
	// const fakeUserData = {
	// 	username: "Username",
	// 	email: "username@email.com",
	// 	password: "**********",
	// 	points: 200,
	// 	healthState: [false, false, true],
	// 	picture:
	// 		"https://www.congresodelasemfyc.com/assets/imgs/default/default-logo.jpg",
	// };
	// const [user, setUser] = useState(fakeUserData);

	const [state1, setState1] = useState(false);
	const [state2, setState2] = useState(false);
	const [state3, setState3] = useState(true);
	const [state4, setState4] = useState(false);
	const [state5, setState5] = useState(true);

	const [modalDeleteAccountVisible, setModalDeleteAccountVisible] =
		useState(false);

	const [user, setUser] = useContext(UserContext);

	const deleteUser = async () => {
		let response = await presentationCtrl.deleteUser(user.email);
		if (response.status == 200) {
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
		} else {
			errorMsgChange(response.message);
		}
	};

	function renderModalDeleteAccount() {
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalDeleteAccountVisible}
				onRequestClose={() => {
					setModalDeleteAccountVisible(!modalDeleteAccountVisible);
				}}
				onBackdropPress={() => {
					setModalDeleteAccountVisible(!modalDeleteAccountVisible);
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
							{i18n.t("deleteAccountConfirmation1")}
						</Text>
						<Text
							style={[
								styles.modalText,
								{ fontWeight: "bold", alignSelf: "center", bottom: -10 },
							]}
						>
							{i18n.t("deleteAccountConfirmation2")}
						</Text>
						<View>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-around",
									alignSelf: "center",
									marginTop: 30,
									marginHorizontal: 0,
									width: 200,
								}}
							>
								<TouchableOpacity
									style={[
										styles.containerBtn2,
										styles.shadow,
										{ backgroundColor: COLORS.red1 },
									]}
									onPress={() => setModalDeleteAccountVisible(false)}
								>
									<Text style={styles.containerTxt}>{i18n.t("no")}</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={[
										styles.containerBtn2,
										styles.shadow,
										{ backgroundColor: COLORS.green1 },
									]}
									onPress={() => deleteUser()}
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
					marginTop: 15,
				}}
			>
				<View
					style={{
						flex: 3,
						alignSelf: "center",
						borderRadius: 5,
						padding: 5,
					}}
				>
					<Text style={[styles.textOption, { fontSize: 17 }]}>
						{i18n.t("language")}
					</Text>
					<View
						style={{
							flexDirection: "row",
							marginVertical: 15,
						}}
					>
						<View style={{ alignItems: "center", width: 115 }}>
							<TouchableOpacity
								onPress={() => {
									if (!state1 && (state3 || state2)) {
										setState3(false);
										setState2(false);
									}
									setState1(!state1);
									//changeLanguage();
								}}
								style={[
									styles.containerState,
									styles.shadow,
									{
										backgroundColor: state1 ? COLORS.green1 : COLORS.secondary,
									},
								]}
							>
								<Image
									source={{
										uri: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Spain_flag_300.png",
									}}
									style={{
										width: 45,
										height: 30,
										borderRadius: 5,
									}}
								/>
							</TouchableOpacity>
							<Text style={styles.textState}>{i18n.t("spanish")}</Text>
						</View>
						<View style={{ alignItems: "center", width: 115 }}>
							<TouchableOpacity
								onPress={() => {
									if (!state2 && (state3 || state1)) {
										setState3(false);
										setState1(false);
									}
									setState2(!state2);
									//changeLanguage();
								}}
								style={[
									styles.containerState,
									styles.shadow,
									{
										backgroundColor: state2 ? COLORS.green1 : COLORS.secondary,
									},
								]}
							>
								<Image
									source={{
										uri: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Flag_of_Catalonia_in_PNG.png",
									}}
									style={{
										width: 45,
										height: 30,
										borderRadius: 5,
									}}
								/>
							</TouchableOpacity>
							<Text style={styles.textState}>{i18n.t("catalan")}</Text>
						</View>
						<View style={{ alignItems: "center", width: 115 }}>
							<TouchableOpacity
								onPress={() => {
									if (!state3 && (state2 || state1)) {
										setState2(false);
										setState1(false);
									}
									setState3(!state3);
									//changeLanguage();
								}}
								style={[
									styles.containerState,
									styles.shadow,
									{
										backgroundColor: state3 ? COLORS.green1 : COLORS.secondary,
									},
								]}
							>
								<Image
									source={{
										uri: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_the_United_Kingdom_clo.png",
									}}
									style={{
										width: 45,
										height: 30,
										borderRadius: 5,
									}}
								/>
							</TouchableOpacity>
							<Text style={styles.textState}>{i18n.t("english")}</Text>
						</View>
					</View>
					<Text style={[styles.textOption, { fontSize: 17 }]}>
						{i18n.t("notifications")}
					</Text>
					<View
						style={{
							flexDirection: "row",
							marginVertical: 15,
						}}
					>
						<View style={{ alignItems: "center", width: 115 }}>
							<TouchableOpacity
								onPress={() => {
									if (!state4 && state5) setState5(false);
									setState4(!state4);
									//changeLanguage();
								}}
								style={[
									styles.containerState,
									styles.shadow,
									{
										backgroundColor: state4 ? COLORS.green1 : COLORS.secondary,
									},
								]}
							>
								<Ionicons name="notifications" size={27} color={COLORS.white} />
							</TouchableOpacity>
							<Text style={styles.textState}>{i18n.t("on")}</Text>
						</View>
						<View style={{ alignItems: "center", width: 115 }}>
							<TouchableOpacity
								onPress={() => {
									if (!state5 && state4) setState4(false);
									setState5(!state5);
									//changeLanguage();
								}}
								style={[
									styles.containerState,
									styles.shadow,
									{
										backgroundColor: state5 ? COLORS.green1 : COLORS.secondary,
									},
								]}
							>
								<Ionicons
									name="notifications-off"
									size={27}
									color={COLORS.white}
								/>
							</TouchableOpacity>
							<Text style={styles.textState}>{i18n.t("off")}</Text>
						</View>
					</View>
				</View>
			</View>
			<View
				style={{
					flexDirection: "column",
					flex: 1,
					alignItems: "flex-end",
					justifyContent: "flex-end",
					backgroundColor: COLORS.white,
				}}
			>
				<TouchableOpacity
					onPress={() => setModalDeleteAccountVisible()}
					style={[
						styles.containerOption,
						{ marginHorizontal: 30, marginBottom: 20 },
					]}
				>
					<Feather name="power" size={27} color={COLORS.red1} />
					<Text style={styles.textOption}>{i18n.t("deleteAccount")}</Text>
				</TouchableOpacity>
			</View>
			{renderModalDeleteAccount()}
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
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 15,
		color: COLORS.white,
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
