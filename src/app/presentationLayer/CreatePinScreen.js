import React, { useState } from "react";
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

import COLORS from "../config/stylesheet/colors";
import Input from "./components/Input";

import BouncyCheckbox from "react-native-bouncy-checkbox";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";
import { Rating } from "react-native-ratings";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
const PresentationCtrl = require("./PresentationCtrl.js");

function CreatePinScreen({ navigation, route }) {
	let presentationCtrl = new PresentationCtrl();

	const { coords } = route.params;
	const [date, setDate] = useState(new Date());
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
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [deleteMode, setDeleteMode] = useState(false);

	const validate = () => {
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
			presentationCtrl.createPin(
				inputs.title,
				coords,
				inputs.description,
				tmpMedia,
				rating,
				getDate(),
				status
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
				Alert.alert("You can only attach 2 pictures!");
			} else {
				tmpMedia.push(result.uri);
				setMedia([...media, result.uri]);
				if (!image1) setImage1(result.uri);
				else if (!image2) setImage2(result.uri);
			}
		}
	};

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirmDate = (date) => {
		setDate(date);
		hideDatePicker();
	};

	const getDate = () => {
		let tempDate = date.toString().split(" ");
		return date !== ""
			? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
			: "";
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

	function renderDateSelector() {
		return (
			<View
				style={{
					flexDirection: "row",
					paddingHorizontal: 10,
					paddingVertical: 5,
					alignItems: "center",
				}}
			>
				<TouchableOpacity onPress={showDatePicker}>
					<Ionicons
						name="md-calendar"
						style={{ alignSelf: "center" }}
						color={COLORS.secondary}
						size={25}
					/>
					<DateTimePickerModal
						//style={styles.datePickerStyle}
						mode="date"
						onConfirm={handleConfirmDate}
						onCancel={hideDatePicker}
						isVisible={isDatePickerVisible}
					/>
				</TouchableOpacity>
				<Text
					style={{
						textAlignVertical: "center",
						fontSize: 15,
						marginStart: 20,
						color: COLORS.secondary,
					}}
				>
					{" "}
					{getDate()}
				</Text>
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
					text={
						status
							? "This pin will be visible to other people."
							: "This pin will only be visible to you."
					}
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
				<Text style={[styles.subtitle, { marginTop: 0 }]}>Location</Text>
				<Text style={{ fontSize: 15, color: COLORS.green1 }}>
					{[coords.latitude, "   ", coords.longitude]}
				</Text>
				<Input
					onChangeText={(newTitle) => handleOnChange(newTitle, "title")}
					onFocus={() => handleError(null, "title")}
					iconName="title"
					label="Title"
					placeholder="Enter the pin title"
					error={errors.title}
				/>
				<Input
					onChangeText={(newTitle) => handleOnChange(newTitle, "description")}
					onFocus={() => handleError(null, "description")}
					iconName="description"
					label="Description"
					placeholder="Enter the pin event description"
					error={errors.description}
				/>
				<Text style={styles.subtitle}> Date</Text>
				{renderDateSelector()}
				<Text style={styles.subtitle}> Pictures</Text>
				{renderImageSelector()}
				<Text style={styles.subtitle}> Rate</Text>
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
				<Text style={styles.subtitle}> Allow others to view this pin?</Text>
				{renderPinStatusSelector()}
				<View style={{ flexDirection: "row" }}>
					<TouchableOpacity
						style={[styles.containerCancelBtn, styles.shadow]}
						onPress={() => navigation.navigate("MapScreen")}
					>
						<Text
							style={{
								textAlign: "center",
								fontWeight: "bold",
								fontSize: 15,
								color: COLORS.white,
							}}
						>
							Cancel
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.containerSaveBtn, styles.shadow]}
						onPress={validate}
					>
						<Text
							style={{
								textAlign: "center",
								fontWeight: "bold",
								fontSize: 15,
								color: COLORS.white,
							}}
						>
							Save pin
						</Text>
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
	containerSaveBtn: {
		width: 110,
		flexDirection: "row",
		alignItems: "center",
		alignContent: "center",
		justifyContent: "center",
		marginLeft: 50,
		marginTop: 10,
		padding: 10,
		borderRadius: 10,
		backgroundColor: COLORS.green1,
	},
	containerCancelBtn: {
		width: 110,
		flexDirection: "row",
		alignItems: "center",
		alignContent: "center",
		justifyContent: "center",
		marginLeft: 50,
		marginTop: 10,
		padding: 10,
		borderRadius: 10,
		backgroundColor: COLORS.red1,
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
