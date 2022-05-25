import React, { useState, useContext } from "react";
import {
	StyleSheet,
	View,
	Text,
	SafeAreaView,
	Keyboard,
	TouchableOpacity,
	Alert,
	ImageBackground,
} from "react-native";

import COLORS from "../../config/stylesheet/colors";
import InputField from "../components/InputField";
import i18n from "../../config/translation";
import UserContext from "../../domainLayer/UserContext";

import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as ImagePicker from "expo-image-picker";
import { Rating } from "react-native-ratings";
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";

const PresentationCtrl = require("../PresentationCtrl.js");

function PinEditScreen({ navigation, route }) {
	let presentationCtrl = new PresentationCtrl();
	const [user] = useContext(UserContext);
	const { pin } = route.params;
	const locationName = "Edifici B6 del Campus Nord, C/ Jordi Girona";
	const [status, setStatus] = useState(pin.status === "Public");
	const [rating, setRating] = useState(pin.rating);
	const [media, setMedia] = useState(Array.from(pin.media));
	const [image1, setImage1] = useState(media[0]);
	const [image2, setImage2] = useState(media[1]);
	const [inputs, setInputs] = useState({
		title: pin.title,
		description: pin.description,
	});
	const [errors, setErrors] = useState({});
	const [deleteMode, setDeleteMode] = useState(false);

	const validate = async () => {
		Keyboard.dismiss();
		let isValid = true;
		const tmpMedia = [...media];

		if (!inputs.title) {
			handleError("Please insert the title", "title");
			isValid = false;
		}
		if (!inputs.description) {
			handleError("Please insert a description", "description");
			isValid = false;
		}
		if (isValid) {
			let editedPin = await presentationCtrl.editPin(
				pin._id,
				inputs.title,
				{ latitude: pin.latitude, longitude: pin.longitude },
				pin.locationTitle,
				inputs.description,
				tmpMedia,
				rating,
				status ? "Public" : "Private",
				user.email
			);
			navigation.replace("OwnerPin", { pin: editedPin, toast: true });
		}
	};

	const handleError = (error, input) => {
		setErrors((prevState) => ({ ...prevState, [input]: error }));
	};

	const handleOnChange = (text, input) => {
		setInputs((prevState) => ({ ...prevState, [input]: text }));
	};

	const pickImage = async () => {
		if (media.length >= 2) {
			Alert.alert(i18n.t("picturesError"));
		} else {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				aspect: [4, 3],
				quality: 1,
			});
			if (!result.cancelled) {
				const tmpMedia = [...media];
				if (tmpMedia.length >= 2) {
					Alert.alert(i18n.t("picturesError"));
				} else {
					tmpMedia.push(result.uri);
					setMedia([...media, result.uri]);
					if (!image1) setImage1(result.uri);
					else if (!image2) setImage2(result.uri);
				}
			}
		}
	};

	function renderImageSelector() {
		return (
			<View
				style={{
					flexDirection: "row",
					paddingHorizontal: 10,
					paddingVertical: 5,
					alignItems: "center",
				}}
			>
				<TouchableOpacity onPress={pickImage} style={{ flexDirection: "row" }}>
					<MaterialIcons
						name="library-add"
						size={25}
						color={COLORS.secondary}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onLongPress={() => {
						setDeleteMode(!deleteMode);
					}}
					style={[
						{
							flexDirection: "row",
							marginStart: 35,
							width: 75,
							height: 75,
						},
						styles.shadow,
					]}
				>
					{media[0] && (
						<ImageBackground
							source={{ uri: media[0] }}
							style={{
								width: 75,
								height: 75,
								alignItems: "flex-end",
							}}
							imageStyle={{ borderRadius: 5, resizeMode: "cover" }}
						>
							{deleteMode && (
								<Entypo
									style={{ left: 10, bottom: 10 }}
									name="circle-with-cross"
									size={20}
									color={COLORS.red1}
									onPress={() => {
										setImage1(null);
										media.splice(0, 1);
									}}
								/>
							)}
						</ImageBackground>
					)}
				</TouchableOpacity>

				<TouchableOpacity
					onLongPress={() => {
						setDeleteMode(!deleteMode);
					}}
					style={[
						{
							flexDirection: "row",
							marginStart: 35,
							width: 75,
							height: 75,
						},
						styles.shadow,
					]}
				>
					{media[1] && (
						<ImageBackground
							source={{ uri: media[1] }}
							style={{
								width: 75,
								height: 75,
								alignItems: "flex-end",
							}}
							imageStyle={{ borderRadius: 5, resizeMode: "cover" }}
						>
							{deleteMode && (
								<Entypo
									style={{ left: 10, bottom: 10 }}
									name="circle-with-cross"
									size={20}
									color={COLORS.red1}
									onPress={() => {
										media.splice(1, 1);
										setImage2(null);
									}}
								/>
							)}
						</ImageBackground>
					)}
				</TouchableOpacity>
			</View>
		);
	}

	function renderPinStatusSelector() {
		return (
			<View style={{ padding: 10 }}>
				<BouncyCheckbox
					fillColor={COLORS.green1}
					size={25}
					unfillColor={COLORS.white}
					isChecked={status}
					iconStyle={{ borderColor: COLORS.secondary }}
					textStyle={{ textDecorationLine: "none", color: COLORS.secondary }}
					onPress={() => setStatus(!status)}
					activeOpacity={0.8}
					text={status ? i18n.t("allowOption1") : i18n.t("allowOption2")}
				/>
			</View>
		);
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
				flexDirection: "column",
				backgroundColor: COLORS.white,
				paddingHorizontal: 20,
			}}
		>
			<View
				style={{
					marginVertical: 20,
					flex: 1,
					justifyContent: "space-between",
				}}
			>
				<View>
					<Text style={[styles.subtitle, { marginTop: 0 }]}>
						{i18n.t("location")}
					</Text>
					<Text style={{ fontSize: 15, color: COLORS.green1 }}>
						{locationName}
					</Text>
					<InputField
						onChangeText={(newTitle) => handleOnChange(newTitle, "title")}
						onFocus={() => handleError(null, "title")}
						iconName="title"
						defaultValue={pin.title}
						label={i18n.t("title")}
						placeholder={i18n.t("titlePlaceholder")}
						error={errors.title}
						editable={true}
						passwordChange={false}
					/>
					<InputField
						onChangeText={(newTitle) => handleOnChange(newTitle, "description")}
						onFocus={() => handleError(null, "description")}
						iconName="description"
						defaultValue={pin.description}
						label={i18n.t("description")}
						placeholder={i18n.t("descriptionPlaceholder")}
						error={errors.description}
						editable={true}
						passwordChange={false}
					/>
					<Text style={styles.subtitle}> {i18n.t("pictures")}</Text>
					{renderImageSelector()}
					<Text style={styles.subtitle}> {i18n.t("rate")}</Text>
					<Rating
						type={"custom"}
						imageSize={20}
						fractions={0}
						startingValue={rating}
						ratingBackgroundColor={COLORS.secondary}
						ratingColor={COLORS.green1}
						tintColor={COLORS.white}
						style={{ padding: 10, alignSelf: "flex-start" }}
						onFinishRating={(newRating) => setRating(newRating)}
					/>
					<Text style={styles.subtitle}> {i18n.t("allowOption")}</Text>
					{renderPinStatusSelector()}
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-around",
						marginTop: 10,
					}}
				>
					<TouchableOpacity
						activeOpacity={0.8}
						style={[
							styles.containerBtn,
							styles.shadow,
							{ backgroundColor: COLORS.red1, width: 100 },
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
						<Text style={styles.containerTxt}>{i18n.t("saveChanges")}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	subtitle: {
		textAlign: "left",
		alignSelf: "flex-start",
		fontSize: 15,
		fontWeight: "bold",
		marginTop: 10,
		color: COLORS.secondary,
	},
	containerBtn: {
		padding: 10,
		borderRadius: 5,
		justifyContent: "center",
	},
	containerTxt: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 15,
		color: COLORS.white,
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
});

export default PinEditScreen;
