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

import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as ImagePicker from "expo-image-picker";
import { Rating } from "react-native-ratings";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";

import COLORS from "../../config/stylesheet/colors";
import InputField from "../components/InputField";
import i18n from "../../config/translation";
import UserContext from "../../domainLayer/UserContext";

const PresentationCtrl = require("../PresentationCtrl");

function CreatePinScreen({ navigation, route }) {
	let presentationCtrl = new PresentationCtrl();

	const [user] = useContext(UserContext);

	const { coords } = route.params;
	const [status, setStatus] = useState(false);
	const [rating, setRating] = useState(3);
	const [media, setMedia] = useState([]);
	const [image1, setImage1] = useState(null);
	const [image2, setImage2] = useState(null);
	const [inputs, setInputs] = useState({
		title: "",
		description: "",
	});
	const [errors, setErrors] = useState({});
	const [deleteMode, setDeleteMode] = useState(false);

	const validate = () => {
		Keyboard.dismiss();
		let isValid = true;
		const tmpMedia = [...media];

		if (!inputs.title) {
			handleError(i18n.t("titleText"), "title");
			isValid = false;
		}
		if (!inputs.description) {
			handleError(i18n.t("titleText"), "description");
			isValid = false;
		}
		if (isValid) {
			presentationCtrl.createPin(
				inputs.title,
				coords,
				coords.title,
				inputs.description,
				tmpMedia,
				rating,
				status ? "Public" : "Private",
				user.email,
				user.name
			);
			navigation.navigate("MapScreen");
		}
	};

	const handleError = (error, input) => {
		setErrors((prevState) => ({ ...prevState, [input]: error }));
	};

	const handleOnChange = (text, input) => {
		setInputs((prevState) => ({ ...prevState, [input]: text }));
	};

	const pickImage = async () => {
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
					iconStyle={{ borderColor: COLORS.secondary }}
					textStyle={{ textDecorationLine: "none", color: COLORS.secondary }}
					onPress={() => setStatus(!status)}
					text={status ? i18n.t("allowOption1") : i18n.t("allowOption2")}
				/>
			</View>
		);
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: COLORS.white,
				flexDirection: "column",
				paddingHorizontal: 20,
			}}
		>
			<View style={{ marginVertical: 20 }}>
				<Text style={[styles.subtitle, { marginTop: 0 }]}>
					{i18n.t("location")}
				</Text>
				<Text style={{ fontSize: 15, color: COLORS.green1 }}>
					{[coords.latitude, "   ", coords.longitude]}
				</Text>
				<InputField
					onChangeText={(newTitle) => handleOnChange(newTitle, "title")}
					onFocus={() => handleError(null, "title")}
					iconName="title"
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
					startingValue={3}
					ratingBackgroundColor={COLORS.secondary}
					ratingColor={COLORS.green1}
					tintColor={COLORS.white}
					style={{ padding: 10, alignSelf: "flex-start" }}
					onFinishRating={(newRating) => setRating(newRating)}
				/>
				<Text style={styles.subtitle}>{i18n.t("allowOption")}</Text>
				{renderPinStatusSelector()}
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-around",
						marginTop: 10,
					}}
				>
					<TouchableOpacity
						style={[
							styles.containerBtn,
							styles.shadow,
							{ backgroundColor: COLORS.red1 },
						]}
						onPress={() => navigation.navigate("MapScreen")}
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
						<Text style={styles.containerTxt}>{i18n.t("createPin")}</Text>
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
		width: 120,
		padding: 10,
		borderRadius: 5,
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

export default CreatePinScreen;
