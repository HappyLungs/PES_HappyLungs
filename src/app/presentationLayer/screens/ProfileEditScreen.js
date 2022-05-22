import React, { useState, useContext, useEffect } from "react";

import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
	ImageBackground,
	Keyboard,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Modal from "react-native-modal";

import COLORS from "../../config/stylesheet/colors";
import InputField from "../components/InputField";
import UserContext from "../../domainLayer/UserContext";
import i18n from "../../config/translation";

const PresentationCtrl = require("../PresentationCtrl.js");

function ProfileEditScreen({ navigation }) {
	let presentationCtrl = new PresentationCtrl();

	const [user, setUser] = useContext(UserContext);

	const [profilePicture, setProfilePicture] = useState(user.profilePicture);
	const [state1, setState1] = useState(user.healthStatus[0]);
	const [state2, setState2] = useState(user.healthStatus[1]);
	const [state3, setState3] = useState(user.healthStatus[2]);

	const [inputs, setInputs] = useState({
		username: user.name,
		email: user.email,
		password: user.password,
		oldPassword: "",
		newPassword1: "",
		newPassword2: "",
	});

	const [inputsPasswordChange, setInputsPasswordChange] = useState({});
	const [errors, setErrors] = useState({});

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.cancelled) {
			setProfilePicture(result.uri);
		}
	};

	const handleError = (error, input) => {
		setErrors((prevState) => ({ ...prevState, [input]: error }));
	};

	const handleOnChange = (text, input) => {
		setInputs((prevState) => ({ ...prevState, [input]: text }));
	};

	const handleOnChangePassword = (text, input) => {
		setInputsPasswordChange((prevState) => ({ ...prevState, [input]: text }));
	};

	const validate = async () => {
		Keyboard.dismiss();
		if (!inputs.username) {
			handleError(i18n.t("usernameError"), "username");
		} else if (!inputs.email) {
			handleError("", "email");
		} else if (!inputs.password) {
			handleError("", "password");
		} else {
			let updatedUser = await presentationCtrl.updateUser(
				inputs.username,
				user.email,
				user.points,
				user.language,
				[state1, state2, state3],
				user.notifications,
				profilePicture
			);
			navigation.popToTop();
			setUser(updatedUser);
			navigation.navigate("ProfileScreen", { toastProfile: true });
		}
	};

	const validatePasswordChange = async () => {
		Keyboard.dismiss();
		if (!inputsPasswordChange.oldPassword) {
			handleError(i18n.t("passwordError"), "oldPassword");
		} else if (!inputsPasswordChange.newPassword1) {
			handleError(i18n.t("passwordError"), "newPassword1");
		} else if (!inputsPasswordChange.newPassword2) {
			handleError(i18n.t("passwordError"), "newPassword2");
		} else if (
			inputsPasswordChange.newPassword1 !== inputsPasswordChange.newPassword2
		) {
			handleError(i18n.t("passwordMatch"), "newPassword1");
			handleError(" ", "newPassword2");
		} else if (
			inputsPasswordChange.oldPassword === inputsPasswordChange.newPassword1
		) {
			handleError(i18n.t("passwordNoChange"), "newPassword1");
			handleError(" ", "newPassword2");
		} else if (inputsPasswordChange.newPassword1.length < 6) {
			handleError(i18n.t("signUpError1"), "newPassword1");
			handleError(" ", "newPassword2");
		} else {
			let response = await presentationCtrl.changePassword(
				user.email,
				inputsPasswordChange.oldPassword,
				inputsPasswordChange.newPassword1
			);
			if (response.status == 200) {
				setInputsPasswordChange({});
				setErrors({});
				navigation.popToTop();
				setUser(response.data);
				navigation.navigate("ProfileScreen");
			} else {
				if (response.status == 401)
					handleError(i18n.t("passwordError"), "oldPassword");
				else handleError(response.message, "oldPassword"); //handleError(i18n.t("passwordError"), "oldPassword");
			}
		}
	};

	const [modalChangePassword, setModalChangePassword] = useState(false);

	function renderModalChangePassword() {
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalChangePassword}
				onRequestClose={() => {
					setModalChangePassword(false);
					setErrors({});
					setInputs({});
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
							style={{
								fontWeight: "bold",
								color: COLORS.secondary,
								fontSize: 16,
								alignSelf: "center",
							}}
						>
							{i18n.t("passwordUpdate")}
						</Text>
						<Text
							style={{
								color: COLORS.darkGrey,
								fontSize: 13,
								marginTop: 10,
								textAlign: "center",
								alignSelf: "center",
							}}
						>
							{i18n.t("passwordUpdateText")}
						</Text>
						<View
							style={{
								width: 200,
								height: 200,
								marginTop: 10,
								alignSelf: "center",
								borderRadius: 5,
							}}
						>
							<InputField
								onChangeText={(oldPassword) =>
									handleOnChangePassword(oldPassword, "oldPassword")
								}
								onFocus={() => handleError(null, "oldPassword")}
								iconName="lock"
								defaultValue={""}
								label={i18n.t("actualPassword")}
								error={errors.oldPassword}
								editable={true}
								passwordChange={true}
							/>
							<InputField
								onChangeText={(newPassword1) =>
									handleOnChangePassword(newPassword1, "newPassword1")
								}
								onFocus={() => handleError(null, "newPassword1")}
								iconName="lock"
								defaultValue={""}
								label={i18n.t("newPassword")}
								error={errors.newPassword1}
								editable={true}
								passwordChange={true}
							/>
							<InputField
								onChangeText={(newPassword2) =>
									handleOnChangePassword(newPassword2, "newPassword2")
								}
								onFocus={() => handleError(null, "newPassword2")}
								iconName="lock"
								defaultValue={""}
								label={i18n.t("confirmNewPassword")}
								error={errors.newPassword2}
								editable={true}
								passwordChange={true}
							/>
						</View>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-around",
								alignSelf: "center",
								marginTop: 120,
								marginHorizontal: 5,
								width: 240,
							}}
						>
							<TouchableOpacity
								activeOpacity={0.8}
								style={[
									styles.containerBtn2,
									styles.shadow,
									{ backgroundColor: COLORS.red1 },
								]}
								onPress={() => {
									setErrors({});
									setModalChangePassword(false);
								}}
							>
								<Text style={styles.containerTxt}>{i18n.t("cancel")}</Text>
							</TouchableOpacity>
							<TouchableOpacity
								activeOpacity={0.8}
								style={[
									styles.containerBtn2,
									styles.shadow,
									{ backgroundColor: COLORS.green1 },
								]}
								onPress={validatePasswordChange}
							>
								<Text style={styles.containerTxt}>{i18n.t("accept")}</Text>
							</TouchableOpacity>
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
						alignSelf: "flex-start",
						borderRadius: 5,
						paddingEnd: 30,
					}}
				>
					<InputField
						onChangeText={(newUsername) =>
							handleOnChange(newUsername, "username")
						}
						onFocus={() => handleError(null, "username")}
						iconName="person"
						defaultValue={user.name}
						label={i18n.t("username")}
						error={errors.username}
						editable={true}
						passwordChange={false}
					/>
					<InputField
						onChangeText={(newEmail) => handleOnChange(newEmail, "email")}
						onFocus={() => handleError(null, "email")}
						iconName="email"
						defaultValue={user.email}
						label={i18n.t("email")}
						error={errors.email}
						editable={false}
						passwordChange={false}
					/>
					<TouchableOpacity
						activeOpacity={0.8}
						style={{
							marginTop: 20,
							flexDirection: "row",
							alignItems: "center",
						}}
						onPress={() => {
							setModalChangePassword(true);
						}}
					>
						<Text style={[styles.textOption2, { marginEnd: 10 }]}>
							{i18n.t("passwordChange")}
						</Text>
						<MaterialIcons name={"edit"} size={20} color={COLORS.green1} />
					</TouchableOpacity>
				</View>
				<View
					style={{
						flex: 1.5,
						alignItems: "center",
						marginTop: 10,
					}}
				>
					<ImageBackground
						source={{ uri: profilePicture }}
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
					/>
					<TouchableOpacity activeOpacity={0.8} onPress={pickImage}>
						<Text style={[styles.textState, { color: COLORS.green1 }]}>
							{i18n.t("upload")}
						</Text>
					</TouchableOpacity>
				</View>
				{renderModalChangePassword()}
			</View>
			<View
				style={{
					alignSelf: "center",
					backgroundColor: COLORS.lightGrey,
					height: 6,
					marginTop: 20,
					width: "100%",
				}}
			/>
			<View
				style={{
					alignSelf: "center",
					marginVertical: 20,
					justifyContent: "space-between",
					flex: 1,
				}}
			>
				<View>
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
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => {
									setState1(!state1);
								}}
								style={[
									styles.containerState,
									styles.shadow,
									{
										backgroundColor: state1 ? COLORS.green1 : COLORS.secondary,
									},
								]}
							>
								<FontAwesome5 name="lungs" size={35} color={COLORS.white} />
							</TouchableOpacity>
							<Text style={styles.textState}>{i18n.t("healthState1")}</Text>
						</View>
						<View style={{ alignItems: "center", width: 115 }}>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => {
									if (!state2 && state3) setState3(false);
									setState2(!state2);
								}}
								style={[
									styles.containerState,
									styles.shadow,
									{
										backgroundColor: state2 ? COLORS.green1 : COLORS.secondary,
									},
								]}
							>
								<MaterialIcons
									name="pregnant-woman"
									size={35}
									color={COLORS.white}
								/>
							</TouchableOpacity>
							<Text style={styles.textState}>{i18n.t("healthState2")}</Text>
						</View>
						<View style={{ alignItems: "center", width: 115 }}>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => {
									if (!state3 && state2) setState2(false);
									setState3(!state3);
								}}
								style={[
									styles.containerState,
									styles.shadow,
									{
										backgroundColor: state3 ? COLORS.green1 : COLORS.secondary,
									},
								]}
							>
								<MaterialIcons name="elderly" size={35} color={COLORS.white} />
							</TouchableOpacity>
							<Text style={styles.textState}>{i18n.t("healthState3")}</Text>
						</View>
					</View>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-around",
					}}
				>
					<TouchableOpacity
						activeOpacity={0.8}
						style={[
							styles.containerBtn,
							styles.shadow,
							{ backgroundColor: COLORS.red1 },
						]}
						onPress={() => navigation.popToTop()}
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
						onPress={validate}
					>
						<Text style={styles.containerTxt}>{i18n.t("update")}</Text>
					</TouchableOpacity>
				</View>
			</View>
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
	textOption2: {
		fontSize: 15,
		fontWeight: "bold",
		color: COLORS.green1,
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
	},
	containerBtn2: {
		width: 100,
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
		marginTop: 60,
		height: 500,
		width: 270,
		backgroundColor: COLORS.white,
		borderRadius: 15,
		padding: 20,
		alignItems: "center",
	},
});

export default ProfileEditScreen;
