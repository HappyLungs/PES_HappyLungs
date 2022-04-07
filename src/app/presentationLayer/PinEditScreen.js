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
	const locationName =
		"Edifici B6 del Campus Nord, C/ Jordi Girona, 1-3, 08034 Barcelona";
	console.log(pin);
	const [modalVisible, setModalVisible] = useState(false);
	const [date, setDate] = useState(pin.date);

	const [status, setStatus] = useState(pin.status);
	const [rating, setRating] = useState(pin.rating);
	const [media, setMedia] = useState(Array.from(pin.media));
	const [image1, setImage1] = useState(media[0]);
	const [image2, setImage2] = useState(media[1]);

	const [inputs, setInputs] = useState({
		title: "",
		description: "",
	});
	const [errors, setErrors] = useState({});

	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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
				<Text style={styles.subtitle}>Location</Text>
				<Text style={{ fontSize: 15, color: COLORS.green1 }}>
					{locationName}
				</Text>
				<Input
					onChangeText={(newTitle) => handleOnChange(newTitle, "title")}
					onFocus={() => handleError(null, "title")}
					iconName="title"
					label="Title"
					placeholder="Enter the pin title"
					error={errors.title}
				/>
				<Text style={styles.title}>{pin.name}</Text>
				<Text style={[styles.body, { marginTop: 20 }]}>{pin.description}</Text>
				<Text style={styles.subtitle}> Date</Text>
				<View
					style={{
						flexDirection: "row",
						padding: 10,
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
					<Text style={[styles.body, { marginStart: 10 }]}>{getDate()}</Text>
				</View>
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
				{renderPinStatusSelector()}
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
