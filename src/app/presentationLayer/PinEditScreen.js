import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	SafeAreaView,
	Keyboard,
	Image,
	TouchableOpacity,
	Modal,
	Alert,
	Pressable,
} from "react-native";

import COLORS from "../config/stylesheet/colors";

import BouncyCheckbox from "react-native-bouncy-checkbox";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";
import { Rating } from "react-native-ratings";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Input from "./components/Input";

const PresentationCtrl = require("./PresentationCtrl.js");

function PinEditScreen({ navigation, route }) {
	let presentationCtrl = new PresentationCtrl();

	const { pin } = route.params;
	const locationName = "Edifici B6 del Campus Nord, C/ Jordi Girona";
	console.log(pin);
	const [modalVisible, setModalVisible] = useState(false);
	const [date, setDate] = useState(pin.date);

	const [status, setStatus] = useState(pin.status);
	const [rating, setRating] = useState(pin.rating);
	const [media, setMedia] = useState(Array.from(pin.media));
	const [image1, setImage1] = useState(media[0]);
	const [image2, setImage2] = useState(media[1]);

	const [inputs, setInputs] = useState({
		title: pin.name,
		description: pin.description,
	});
	const [errors, setErrors] = useState({});

	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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
			let editedPin = presentationCtrl.editPin(
				inputs.title,
				pin.location,
				inputs.description,
				tmpMedia,
				rating,
				getDate(),
				status
			);
			console.log(inputs.title);
			navigation.navigate("OwnerPin", { pin: editedPin });
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
			console.log(result.uri);
			const tmpMedia = [...media];
			if (tmpMedia.length >= 2) {
				Alert.alert("Max 2 images!");
			} else {
				tmpMedia.push(result.uri);
				setMedia([...media, result.uri]);
				console.log(
					"media size: " +
						tmpMedia.length +
						" content: " +
						tmpMedia[tmpMedia.length - 1]
				);
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
				}}
			>
				<TouchableOpacity onPress={pickImage} style={{ flexDirection: "row" }}>
					<MaterialIcons
						name="library-add"
						size={25}
						color={COLORS.secondary}
					/>
				</TouchableOpacity>
				<TouchableOpacity style={{ flexDirection: "row" }}>
					{media[0] && (
						<Image source={{ uri: media[0] }} style={styles.selectedImages} />
					)}
				</TouchableOpacity>
				<TouchableOpacity style={{ flexDirection: "row" }}>
					{media[1] && (
						<Image source={{ uri: media[1] }} style={styles.selectedImages} />
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
					isChecked={status}
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
				flexDirection: "column",
				backgroundColor: COLORS.white,
				paddingHorizontal: 20,
			}}
		>
			<View style={{ marginVertical: 20 }}>
				<Text style={[styles.subtitle, { marginTop: 0 }]}>Location</Text>
				<Text style={{ fontSize: 15, color: COLORS.green1 }}>
					{locationName}
				</Text>
				<Input
					onChangeText={(newTitle) => handleOnChange(newTitle, "title")}
					onFocus={() => handleError(null, "title")}
					iconName="title"
					defaultValue={pin.name}
					label="Title"
					error={errors.title}
				/>
				<Input
					onChangeText={(newTitle) => handleOnChange(newTitle, "description")}
					onFocus={() => handleError(null, "description")}
					iconName="description"
					defaultValue={pin.description}
					label="Description"
					error={errors.description}
				/>
				<Text style={styles.subtitle}> Date</Text>
				{renderDateSelector()}
				<Text style={styles.subtitle}> Images</Text>
				{renderImageSelector()}
				<Text style={styles.subtitle}> Rate</Text>
				<Rating
					type={"custom"}
					imageSize={20}
					fractions={0}
					startingValue={rating}
					ratingBackgroundColor={COLORS.secondary}
					ratingColor={COLORS.green1}
					tintColor={COLORS.white}
					style={{
						padding: 10,
						alignSelf: "flex-start",
					}}
					onFinishRating={(newRating) => setRating(newRating)}
				/>
				<Text style={styles.subtitle}> Allow others to view this pin?</Text>
				{renderPinStatusSelector()}
				<View style={{ flexDirection: "row", marginTop: 20 }}>
					<TouchableOpacity
						style={[styles.containerCancelBtn, styles.shadow]}
						onPress={() => navigation.navigate("OwnerPin", { pin: pin })}
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
						style={[styles.containerSaveChanges, styles.shadow]}
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
							Save changes
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 22,
		fontWeight: "bold",
		color: COLORS.secondary,
	},
	subtitle: {
		textAlign: "left",
		alignSelf: "flex-start",
		fontSize: 15,
		fontWeight: "bold",
		marginTop: 10,
		color: COLORS.secondary,
	},
	body: {
		alignSelf: "center",
		fontSize: 15,
		color: COLORS.secondary,
	},
	greenHighlight: {
		fontSize: 15,
		fontWeight: "bold",
		color: COLORS.green1,
	},
	containerSaveChanges: {
		width: 120,
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
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: COLORS.white,
		borderRadius: 15,
		padding: 15,
		alignItems: "center",
	},
	button: {
		borderRadius: 10,
		padding: 10,
		elevation: 2,
	},
	textStyle: {
		color: COLORS.white,
		fontWeight: "bold",
		fontSize: 15,
		textAlign: "center",
		alignSelf: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
});

export default PinEditScreen;
