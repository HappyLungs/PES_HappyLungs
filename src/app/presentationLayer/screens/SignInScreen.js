import React, { useContext, useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	StyleSheet,
	StatusBar,
	Alert,
	Modal,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import COLORS from "../../config/stylesheet/colors";
import i18n from "../../config/translation";
import UserContext from "../../domainLayer/UserContext";
import axios from "axios";
import { setLanguage } from "../../config/translation";

import Socket from "../Socket";

const PresentationCtrl = require("../PresentationCtrl.js");

WebBrowser.maybeCompleteAuthSession();

function SignInScreen({ navigation, route }) {
	let presentationCtrl = new PresentationCtrl();

	const [accessToken, setAccessToken] = useState();
	const [user, setUser] = useContext(UserContext);
	const [data, setData] = useState({
		email: "",
		password: "",
		errorMsg: "",
		checkEmailInputChange: false,
		secureTextEntry: true,
	});

	const [request, response, promptAsync] = Google.useAuthRequest({
		expoClientId:
			"437928972313-1c9p775pneiu2q3rk64fpmmh85vfr8vj.apps.googleusercontent.com",
		androidClientId:
			"437928972313-81301tfl1gjdcjb854mtkmfnr3umah5h.apps.googleusercontent.com",
	});

	useEffect(() => {
		if (response?.type === "success") {
			const { authentication } = response;
			getGoogleUserInfo(authentication.accessToken);
		}
	}, [response]);

	const getGoogleUserInfo = async (accessToken) => {
		try {
			let userRequestInfo = await axios.get(
				"https://www.googleapis.com/oauth2/v2/userinfo",
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			loginGoogle(userRequestInfo.data, accessToken);
		} catch (error) {
			errorMsgChange(error);
		}
	};

	const loginGoogle = async (userGoogleData, accessToken) => {
		let response = await presentationCtrl.loginGoogleUser(userGoogleData);
		if (response.status == 200) {
      new Socket(userGoogleData.email);
			response.data.accessToken = accessToken;      
			setUser(response.data);
			navigation.navigate("AppTabs", { screen: "Map" });
			errorMsgChange("");
		} else {
			errorMsgChange(response.message);
		}
	};

	const [modalRestorePasswordVisible, setModalRestorePasswordVisible] =
		useState(false);
	const [errorMsgVisible, setErrorMsgVisible] = useState(false);

	const renderModalRestorePassword = () => {
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalRestorePasswordVisible}
				onRequestClose={() => {
					setModalRestorePasswordVisible(!modalRestorePasswordVisible);
				}}
				onBackdropPress={() => {
					setModalRestorePasswordVisible(!modalRestorePasswordVisible);
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
							{i18n.t("restorePasswordConfirmation")}
						</Text>
						<View>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-around",
									alignSelf: "center",
									marginTop: 30,
									marginHorizontal: 20,
									width: 220,
								}}
							>
								<TouchableOpacity
									style={[
										styles.containerBtn2,
										styles.shadow,
										{ backgroundColor: COLORS.red1 },
									]}
									onPress={() => setModalRestorePasswordVisible(false)}
								>
									<Text style={styles.containerTxt}>{i18n.t("no")}</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={[
										styles.containerBtn2,
										styles.shadow,
										{ backgroundColor: COLORS.green1 },
									]}
									onPress={() => restorePassword()}
								>
									<Text style={styles.containerTxt}>{i18n.t("yes")}</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		);
	};

	const validateEmail = (emailAdress) => {
		let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		return emailAdress.match(regexEmail);
	};
	const emailChange = (val) => {
		if (validateEmail(val)) {
			setData({
				...data,
				email: val,
				checkEmailInputChange: true,
			});
		} else {
			setData({
				...data,
				email: val,
				checkEmailInputChange: false,
			});
		}
	};
	const passwordChange = (val) => {
		setData({
			...data,
			password: val,
		});
	};
	const updateSecureTextEntry = () => {
		setData({
			...data,
			secureTextEntry: !data.secureTextEntry,
		});
	};
	const errorMsgChange = (val) => {
		setData({
			...data,
			errorMsg: val,
		});
	};

	const loginUser = async () => {
		const { email, password } = data;
		let response = await presentationCtrl.loginUser(email, password);
		if (response.status == 200) {
			let socket = new Socket(email);
			let s = socket.getSocket();
			let i=3;
			setUser(response.data);
			setLanguage(response.data.language);
			navigation.navigate("AppTabs", { screen: "Map" });
			setErrorMsgVisible(false);
		} else {
			errorMsgChange(response.message);
			setErrorMsgVisible(true);
		}
	};

	const restorePassword = async () => {
		setModalRestorePasswordVisible(false);
		if (!data.checkEmailInputChange) {
			errorMsgChange(i18n.t("invalidEmail"));
			setErrorMsgVisible(true);
		} else {
			const { email } = data;
			let response = await presentationCtrl.restorePassword(email);
			if (response.status == 200) {
				setErrorMsgVisible(false);
				Alert.alert(
					i18n.t("passwordRestoredTitle"),
					i18n.t("passwordRestoredText"),
					["OK"]
				);
			} else {
				if (response.status == 204) errorMsgChange(i18n.t("signInError2"));
				else if (response.status == 422) errorMsgChange(response.message);
				else errorMsgChange(i18n.t("restorePasswordError"));
				setErrorMsgVisible(true);
			}
		}
	};

	const renderMessage = () => {
		if (errorMsgVisible) {
			return <Text style={styles.errorMsg}>{data.errorMsg}</Text>;
		}
		return;
	};

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={COLORS.green1} barStyle="light-content" />
			<View style={styles.header}>
				<Text style={styles.text_header}>{i18n.t("welcome2")}</Text>
			</View>
			<Animatable.View animation="zoomInUp" style={styles.footer}>
				<View>{renderMessage()}</View>
				<View style={styles.action}>
					<Text
						style={[
							styles.text_footer,
							{
								color: COLORS.primary,
							},
						]}
					>
						{i18n.t("email")}
					</Text>
					<View style={styles.style1}>
						<View style={{ flexDirection: "row" }}>
							<FontAwesome name="user-o" color={COLORS.primary} size={20} />
							<TextInput
								placeholder={i18n.t("emailPlaceholder")}
								placeholderTextColor={COLORS.darkGrey}
								style={[
									styles.textInput,
									{
										width: 300,
										color: COLORS.primary,
									},
								]}
								keyboardType="email-address"
								autoCapitalize="none"
								onChangeText={(val) => emailChange(val)}
							/>
						</View>
						{data.checkEmailInputChange ? (
							<Animatable.View animation="bounceIn">
								<Feather name="check-circle" color="green" size={20} />
							</Animatable.View>
						) : null}
					</View>
				</View>
				<View style={styles.action}>
					<Text
						style={[
							styles.text_footer,
							{
								color: COLORS.primary,
							},
						]}
					>
						{i18n.t("password")}
					</Text>
					<View style={styles.style1}>
						<View style={{ flexDirection: "row" }}>
							<Feather name="lock" color={COLORS.primary} size={20} />
							<TextInput
								placeholder={i18n.t("passwordPlaceholder")}
								placeholderTextColor={COLORS.darkGrey}
								secureTextEntry={data.secureTextEntry ? true : false}
								style={[
									styles.textInput,
									{
										width: 280,
										color: COLORS.primary,
									},
								]}
								autoCapitalize="none"
								onChangeText={(val) => passwordChange(val)}
							/>
						</View>

						<TouchableOpacity onPress={updateSecureTextEntry}>
							{data.secureTextEntry ? (
								<Feather name="eye-off" color="grey" size={20} />
							) : (
								<Feather name="eye" color="grey" size={20} />
							)}
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity onPress={() => setModalRestorePasswordVisible()}>
					<Text style={{ color: COLORS.green1, marginTop: 15 }}>
						{i18n.t("passwordForgot")}
					</Text>
				</TouchableOpacity>
				<View style={styles.button}>
					<TouchableOpacity
						onPress={() => loginUser()}
						style={[
							styles.signIn,
							{
								borderColor: COLORS.green1,
								borderWidth: 1,
								marginTop: 15,
							},
						]}
					>
						<Text
							style={[
								styles.textSign,
								{
									color: COLORS.green1,
								},
							]}
						>
							{i18n.t("signIn")}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							promptAsync({ showInRevents: true });
						}}
						style={[
							styles.signIn,
							{
								borderColor: COLORS.green1,
								borderWidth: 1,
								marginTop: 15,
								flexDirection: "row",
								justifyContent: "space-evenly",
							},
						]}
					>
						<FontAwesome name="google" color={COLORS.green1} size={20} />
						<Text
							style={[
								styles.textSign,
								{
									color: COLORS.green1,
								},
							]}
						>
							{i18n.t("googleLogin")}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("SignUpScreen");
							setErrorMsgVisible(false);
						}}
						style={[
							styles.signIn,
							{
								borderColor: COLORS.green1,
								borderWidth: 1,
								marginTop: 15,
							},
						]}
					>
						<Text
							style={[
								styles.textSign,
								{
									color: COLORS.green1,
								},
							]}
						>
							{i18n.t("signUp")}
						</Text>
					</TouchableOpacity>
				</View>
			</Animatable.View>
			{renderModalRestorePassword()}
		</View>
	);
}

SignInScreen.navigationOptions = (nav) => {
	return {
		headerTitle: "Login",
	};
};

const styles = StyleSheet.create({
	style1: {
		flexDirection: "row",
		marginTop: 10,
		justifyContent: "space-between",
	},
	container: {
		flex: 1,
		backgroundColor: COLORS.green1,
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
	header: {
		flex: 1,
		justifyContent: "flex-end",
		paddingHorizontal: 20,
		paddingBottom: 50,
	},
	footer: {
		flex: 3,
		backgroundColor: COLORS.white,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingHorizontal: 20,
		paddingVertical: 30,
	},
	text_header: {
		color: COLORS.white,
		fontWeight: "bold",
		fontSize: 30,
	},
	text_footer: {
		color: "#05375a",
		fontSize: 18,
	},
	modalText: {
		textAlign: "center",
		fontSize: 16,
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
	action: {
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.light,
		paddingBottom: 5,
	},
	actionError: {
		flexDirection: "row",
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#FF0000",
		paddingBottom: 5,
	},
	modalView: {
		margin: 25,
		backgroundColor: COLORS.white,
		borderRadius: 15,
		padding: 20,
		alignItems: "center",
	},
	textInput: {
		marginTop: -5,
		paddingLeft: 10,
		color: "#05375a",
	},
	errorMsg: {
		color: "#FF0000",
		fontSize: 14,
	},
	button: {
		alignItems: "center",
		marginTop: 20,
	},
	signIn: {
		width: "100%",
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
	},
	textSign: {
		fontSize: 18,
		fontWeight: "bold",
	},
});

export default SignInScreen;
