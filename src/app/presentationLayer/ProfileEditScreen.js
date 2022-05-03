import React, { useState } from "react";

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

import COLORS from "../config/stylesheet/colors";
import InputField from "./components/InputField";
import i18n from "../config/translation";

const PresentationCtrl = require("./PresentationCtrl.js");

function ProfileEditScreen({ navigation }) {
	let presentationCtrl = new PresentationCtrl();
	//should pass userId, and then retrieve the updated data

	const fakeUserData = {
		username: "Username",
		email: "username@email.com",
		password: "**********",
		points: 200,
		healthState: [true, false, true],
		picture:
			"https://www.congresodelasemfyc.com/assets/imgs/default/default-logo.jpg",
	};
	const [user, setUser] = useState(fakeUserData);
	const [profilePicture, setProfilePicture] = useState(fakeUserData.picture);
	const [state1, setState1] = useState(user.healthState[0]);
	const [state2, setState2] = useState(user.healthState[1]);
	const [state3, setState3] = useState(user.healthState[2]);

	const [inputs, setInputs] = useState({
		username: user.username,
		email: user.email,
		password: user.password,
	});
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

	const validate = () => {
		Keyboard.dismiss();
		let isValid = true;
		if (!inputs.username) {
			handleError("Please add a valid username", "username");
			isValid = false;
		}
		if (!inputs.email) {
			handleError("Please add a valid email", "email");
			isValid = false;
		}
		if (!inputs.password) {
			handleError("Please add a valid password", "password");
			isValid = false;
		}
		if (isValid) {
			let updatedUser = presentationCtrl.updateUser(
				inputs.username,
				inputs.email,
				inputs.password,
				user.points,
				[state1, state2, state3],
				profilePicture
			);
			navigation.popToTop();
			navigation.navigate("ProfileScreen", { user: updatedUser }); //not correct, should pass userId and then retrieve the data
			//navigation.navigate("ProfileScreen", { userId: updatedUser.username });
		}
	};

	const [byCertificate, setByCertificate] = useState(false);

	const [modalChangePassword, setModalChangePassword] = useState(false);

	function renderModalChangePassword() {
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalChangePassword}
				onRequestClose={() => {
					setModalChangePassword(false);
				}}
				onBackdropPress={() => {
					setModalChangePassword(false);
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
						<View
							style={{
								width: 200,
								height: 200,
								alignSelf: "center",
								borderRadius: 5,
								padding: 5,
							}}
						>
							<InputField
								onChangeText={(newPassword) =>
									handleOnChange(newPassword, "password")
								}
								onFocus={() => handleError(null, "password")}
								iconName="lock"
								defaultValue={user.password}
								label={i18n.t("actualPassword")}
								error={errors.password}
							/>
							<InputField
								onChangeText={(newPassword) =>
									handleOnChange(newPassword, "password")
								}
								onFocus={() => handleError(null, "password")}
								iconName="lock"
								defaultValue={user.password}
								label={i18n.t("newPassword")}
								error={errors.password}
							/>
							<InputField
								onChangeText={(newPassword) =>
									handleOnChange(newPassword, "password")
								}
								onFocus={() => handleError(null, "password")}
								iconName="lock"
								defaultValue={user.password}
								label={i18n.t("confirmNewPassword")}
								error={errors.password}
							/>
						</View>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-around",
								alignSelf: "center",
								marginTop: 100,
								marginHorizontal: 5,
								width: 240,
							}}
						>
							<TouchableOpacity
								style={[
									styles.containerBtn2,
									styles.shadow,
									{ backgroundColor: COLORS.red1 },
								]}
								onPress={() => setModalChangePassword(false)}
							>
								<Text style={styles.containerTxt}>{i18n.t("cancel")}</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[
									styles.containerBtn2,
									styles.shadow,
									{ backgroundColor: COLORS.green1 },
								]}
								//onPress={validate}
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
						alignSelf: "center",
						borderRadius: 5,
						padding: 5,
					}}
				>
					<InputField
						onChangeText={(newUsername) =>
							handleOnChange(newUsername, "username")
						}
						onFocus={() => handleError(null, "username")}
						iconName="person"
						defaultValue={user.username}
						label={i18n.t("username")}
						error={errors.username}
					/>
					<InputField
						onChangeText={(newEmail) => handleOnChange(newEmail, "email")}
						onFocus={() => handleError(null, "email")}
						iconName="email"
						defaultValue={user.email}
						label={i18n.t("email")}
						error={errors.email}
					/>
					<InputField
						onChangeText={(newPassword) =>
							handleOnChange(newPassword, "password")
						}
						onFocus={() => handleError(null, "password")}
						iconName="lock"
						defaultValue={user.password}
						label={i18n.t("password")}
						error={errors.password}
					/>
				</View>
				<View
					style={{
						flex: 2,
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
					<TouchableOpacity onPress={pickImage}>
						<Text style={[styles.textState, { color: COLORS.green1 }]}>
							{i18n.t("upload")}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							flexDirection: "row",
							backgroundColor: COLORS.green1,
							borderRadius: 90,
							padding: 7,
							marginTop: 64,
							marginStart: -75,
							alignItems: "center",
						}}
						onPress={() => setModalChangePassword(true)}
					>
						<MaterialIcons name={"edit"} size={30} color={COLORS.white} />
					</TouchableOpacity>
				</View>
				{renderModalChangePassword()}
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
						<TouchableOpacity
							onPress={() => {
								setState1(!state1);
							}}
							style={[
								styles.containerState,
								styles.shadow,
								{ backgroundColor: state1 ? COLORS.green1 : COLORS.secondary },
							]}
						>
							<FontAwesome5 name="lungs" size={35} color={COLORS.white} />
						</TouchableOpacity>
						<Text style={styles.textState}>{i18n.t("healthState1")}</Text>
					</View>
					<View style={{ alignItems: "center", width: 115 }}>
						<TouchableOpacity
							onPress={() => {
								if (!state2 && state3) setState3(false);
								setState2(!state2);
							}}
							style={[
								styles.containerState,
								styles.shadow,
								{ backgroundColor: state2 ? COLORS.green1 : COLORS.secondary },
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
							onPress={() => {
								if (!state3 && state2) setState2(false);
								setState3(!state3);
							}}
							style={[
								styles.containerState,
								styles.shadow,
								{ backgroundColor: state3 ? COLORS.green1 : COLORS.secondary },
							]}
						>
							<MaterialIcons name="elderly" size={35} color={COLORS.white} />
						</TouchableOpacity>
						<Text style={styles.textState}>{i18n.t("healthState3")}</Text>
					</View>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-evenly",
						marginTop: 50,
					}}
				>
					<TouchableOpacity
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
		width: 95,
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
		height: 400,
		width: 240,
		backgroundColor: COLORS.white,
		borderRadius: 15,
		padding: 20,
		alignItems: "center",
	},
});

export default ProfileEditScreen;
