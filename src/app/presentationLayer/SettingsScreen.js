import React, { useState } from "react";

import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
	ImageBackground,
	Keyboard,
    Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import Icon from 'react-native-ico-flags/src/data';

import COLORS from "../config/stylesheet/colors";
import InputField from "./components/InputField";

import { Ionicons } from "@expo/vector-icons";

import Modal from "react-native-modal";

const PresentationCtrl = require("./PresentationCtrl.js");

function SettingsScreen({ navigation }) {
	let presentationCtrl = new PresentationCtrl();
	//should pass userId, and then retrieve the updated data

    const fakeUserData = {
		username: "Username",
		email: "username@email.com",
		password: "**********",
		points: 200,
		healthState: [false, false, true, false, true],
		picture:
			"https://www.congresodelasemfyc.com/assets/imgs/default/default-logo.jpg",
	};
	const [user, setUser] = useState(fakeUserData);
	
	const [state1, setState1] = useState(user.healthState[0]);
	const [state2, setState2] = useState(user.healthState[1]);
	const [state3, setState3] = useState(user.healthState[2]);
    const [state4, setState4] = useState(user.healthState[3]);
	const [state5, setState5] = useState(user.healthState[4]);

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
                 
				<Text style={[styles.textOption, { fontSize: 17 }]}>Language</Text>
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
								{ backgroundColor: state1 ? COLORS.green1 : COLORS.secondary },
							]}
						>
                        <Image
                            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Spain_flag_300.png' }}
                                style={{
                                width: 45,
                                height: 30,
                                borderRadius: 5,

                            }}
                        /> 
                    	</TouchableOpacity>
						<Text style={styles.textState}>Spanish</Text>
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
								{ backgroundColor: state2 ? COLORS.green1 : COLORS.secondary },
							]}
						>
						<Image
                            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Flag_of_Catalonia_in_PNG.png' }}
                                style={{
                                width: 45,
                                height: 30,
                                borderRadius: 5,

                            }}
                        /> 
						</TouchableOpacity>
						<Text style={styles.textState}>Catalan</Text>
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
								{ backgroundColor: state3 ? COLORS.green1 : COLORS.secondary },
							]}
						>
						<Image
                            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_the_United_Kingdom_clo.png' }}
                                style={{
                                width: 45,
                                height: 30,
                                borderRadius: 5,

                            }}
                        /> 
						</TouchableOpacity>
						<Text style={styles.textState}>English</Text>
					</View>
                    
				</View>
                <Text style={[styles.textOption, { fontSize: 17 }]}>Notifications</Text>
				<View
					style={{
						flexDirection: "row",
						marginVertical: 15,
					}}
				>
					<View style={{ alignItems: "center", width: 115 }}>
						<TouchableOpacity
							onPress={() => {
								if (!state4 && state5 ) setState5(false);
								setState4(!state4);
                               //changeLanguage();
							}}
							style={[
								styles.containerState,
								styles.shadow,
								{ backgroundColor: state4 ? COLORS.green1 : COLORS.secondary },
							]}
						>
                        <Ionicons name="notifications" size={27} color={COLORS.white} /> 
                    	</TouchableOpacity>
						<Text style={styles.textState}>On</Text>
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
								{ backgroundColor: state5 ? COLORS.green1 : COLORS.secondary },
							]}
						>
						<Ionicons name="notifications-off" size={27} color={COLORS.white} /> 
						</TouchableOpacity>
						<Text style={styles.textState}>Off</Text>
					</View>
				</View>
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
		height: 400,
		width: 240,
		backgroundColor: COLORS.white,
		borderRadius: 15,
		padding: 20,
		alignItems: "center",
	},
});

export default SettingsScreen;
