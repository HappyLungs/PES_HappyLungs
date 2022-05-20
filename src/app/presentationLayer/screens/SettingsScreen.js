import React, { useState, useContext } from "react";
import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
	Image,
	Dimensions,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";

import COLORS from "../../config/stylesheet/colors";
import i18n from "../../config/translation";
import { setLanguage } from "../../config/translation";
import UserContext from "../../domainLayer/UserContext";
const PresentationCtrl = require("../PresentationCtrl.js");

function SettingsScreen({ navigation }) {
	let presentationCtrl = new PresentationCtrl();
	const width = Dimensions.get("window").width;
	const [user, setUser] = useContext(UserContext);
	const [inputs, setInputs] = useState({
		language: user.language,
		notifications: user.notifications,
	});

	const validate = async () => {
		let updatedUser = await presentationCtrl.updateUser(
			user.name,
			user.email,
			user.points,
			inputs.language,
			user.healthStatus,
			inputs.notifications,
			user.profilePicture
		);
		if (user.language !== inputs.language) {
			setLanguage(inputs.language);
		}
		setUser(updatedUser);
	};

	const [state1, setState1] = useState(false);
	const [state2, setState2] = useState(false);
	const [state3, setState3] = useState(true);

	const [state4, setState4] = useState(false);
	const [state5, setState5] = useState(true);

	const [modalDeleteAccountVisible, setModalDeleteAccountVisible] =
		useState(false);

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
								{ fontWeight: "bold", alignSelf: "center", marginVertical: 5 },
							]}
						>
							{i18n.t("deleteAccountConfirmation1")}
						</Text>
						<Text
							style={[
								styles.modalText,
								{ fontWeight: "bold", alignSelf: "center", marginVertical: 5 },
							]}
						>
							{i18n.t("deleteAccountConfirmation2")}
						</Text>
						<View
							style={{
								flexDirection: "row",
								marginVertical: 15,
							}}
						>
							<View
								style={{
									flex: 1,
									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								<TouchableOpacity
									activeOpacity={0.8}
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
									activeOpacity={0.8}
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
				flex: 1,
				flexDirection: "column",
				backgroundColor: COLORS.white,
			}}
		>
			<View
				style={{
					flexDirection: "column",
					padding: 5,
					paddingHorizontal: 20,
				}}
			>
				<View
					style={{
						marginVertical: 20,
					}}
				>
					<Text style={[styles.textOption, { fontSize: 17 }]}>
						{i18n.t("language")}
					</Text>
					<View
						style={{
							flexDirection: "row",
							marginTop: 15,
						}}
					>
						<View style={{ alignItems: "center", paddingHorizontal: 20 }}>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => {
									if (!state1 && (state3 || state2)) {
										setState3(false);
										setState2(false);
									}
									setState1(true);
									setInputs({
										language: "es",
										notifications: inputs.notifications,
									});
								}}
								style={[
									styles.containerState,
									styles.shadow,
									{
										backgroundColor:
											inputs.language == "es"
												? COLORS.green1
												: COLORS.secondary,
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
						<View style={{ alignItems: "center", paddingHorizontal: 20 }}>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => {
									if (!state2 && (state3 || state1)) {
										setState3(false);
										setState1(false);
									}
									setState2(true);
									setInputs({
										language: "ca",
										notifications: inputs.notifications,
									});
								}}
								style={[
									styles.containerState,
									styles.shadow,
									{
										backgroundColor:
											inputs.language == "ca"
												? COLORS.green1
												: COLORS.secondary,
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
						<View
							style={{
								paddingHorizontal: 20,
							}}
						>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => {
									if (!state3 && (state2 || state1)) {
										setState2(false);
										setState1(false);
									}
									setState3(true);
									setInputs({
										language: "en",
										notifications: inputs.notifications,
									});
								}}
								style={[
									styles.containerState,
									styles.shadow,
									{
										backgroundColor:
											inputs.language == "en"
												? COLORS.green1
												: COLORS.secondary,
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
				</View>
				<View
					style={{
						alignSelf: "center",
						backgroundColor: COLORS.lightGrey,
						height: 6,
						width: width,
					}}
				/>
				<View
					style={{
						marginTop: 20,
					}}
				>
					<Text style={[styles.textOption, { fontSize: 17 }]}>
						{i18n.t("notifications")}
					</Text>
					<View
						style={{
							flexDirection: "row",
							marginVertical: 15,
						}}
					>
						<View style={{ alignItems: "center", paddingHorizontal: 20 }}>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => {
									if (!state4 && state5) setState5(false);
									setState4(true);
									setInputs({
										language: inputs.language,
										notifications: true,
									});
								}}
								style={[
									styles.containerState,
									styles.shadow,
									{
										backgroundColor: inputs.notifications
											? COLORS.green1
											: COLORS.secondary,
									},
								]}
							>
								<Ionicons name="notifications" size={27} color={COLORS.white} />
							</TouchableOpacity>
							<Text style={styles.textState}>{i18n.t("on")}</Text>
						</View>
						<View style={{ alignItems: "center", paddingHorizontal: 20 }}>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => {
									if (!state5 && state4) setState4(false);
									setState5(true);
									setInputs({
										language: inputs.language,
										notifications: false,
									});
								}}
								style={[
									styles.containerState,
									styles.shadow,
									{
										backgroundColor: !inputs.notifications
											? COLORS.green1
											: COLORS.secondary,
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
					<View
						style={{
							alignSelf: "center",
							backgroundColor: COLORS.lightGrey,
							height: 6,
							width: width,
						}}
					/>
				</View>
			</View>
			<View
				style={{
					flex: 1,
					alignItems: "flex-start",
					paddingHorizontal: 20,
				}}
			>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => setModalDeleteAccountVisible()}
					style={styles.containerOption}
				>
					<MaterialIcons name="delete" size={27} color={COLORS.red1} />
					<Text style={styles.textOption}>{i18n.t("deleteAccount")}</Text>
				</TouchableOpacity>
			</View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					marginVertical: 20,
				}}
			>
				<TouchableOpacity
					activeOpacity={0.8}
					style={[
						styles.containerBtn,
						styles.shadow,
						{ backgroundColor: COLORS.red1 },
					]}
					onPress={() => navigation.navigate("ProfileScreen")}
				>
					<Text style={styles.containerTxt}>{i18n.t("cancel")}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.8}
					style={[
						styles.containerBtn,
						styles.shadow,
						{ backgroundColor: COLORS.green1 },
					]}
					onPress={() => {
						validate();
						navigation.navigate("ProfileScreen", { toastSettings: true });
					}}
				>
					<Text style={styles.containerTxt}>{i18n.t("update")}</Text>
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
		width: 100,
		padding: 10,
		borderRadius: 5,
		marginHorizontal: 25,
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
		backgroundColor: COLORS.white,
		borderRadius: 15,
		padding: 20,
	},
	modalText: {
		textAlign: "center",
		fontSize: 16,
	},
});

export default SettingsScreen;
