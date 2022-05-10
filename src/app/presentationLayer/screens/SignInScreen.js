import React, { useContext, useState } from "react";

import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	StyleSheet,
	StatusBar,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Axios from "axios";

import COLORS from "../../config/stylesheet/colors";
import i18n from "../../config/translation";
import UserContext from "../../domainLayer/UserContext";

const PresentationCtrl = require("../PresentationCtrl.js");

function SignInScreen({ navigation, route }) {
	let presentationCtrl = new PresentationCtrl();

	const [data, setData] = useState({
		email: "",
		password: "",
		errorMsg: "",
		checkEmailInputChange: false,
		secureTextEntry: true,
	});

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

	// const { user, setUser } = useContext(useUserContextState);
	const [user, setUser] = useContext(UserContext);

	const loginUser = async () => {
		const { email, password } = data;
		let response = await presentationCtrl.loginUser(email, password);
		if (response.status == 200) {
			setUser(response.data);
			navigation.navigate("AppTabs", { screen: "Map" });
			console.log(user);
		} else {
			errorMsgChange(response.message);
		}
	};

	const renderMessage = () => {
		if (data.errorMsg != "") {
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
										color: COLORS.primary,
									},
								]}
								autoCapitalize="none"
								onChangeText={(val) => emailChange(val)}
							/>
						</View>
						{data.checkTextInputChange ? (
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
				<TouchableOpacity>
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
						onPress={() => navigation.navigate("SignUpScreen")}
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
