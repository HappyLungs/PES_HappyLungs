import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Modal,
	Pressable,
} from "react-native";

import COLORS from "../config/stylesheet/colors";

import { Rating } from "react-native-ratings";
import { ImageSlider } from "react-native-image-slider-banner";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const PresentationCtrl = require("./PresentationCtrl.js");

function PinOwnerScreen({ navigation, route }) {
	let presentationCtrl = new PresentationCtrl();

	const { pin } = route.params;
	const media = Array.from(pin.media);
	const locationName =
		"Edifici B6 del Campus Nord, C/ Jordi Girona, 1-3, 08034 Barcelona";

	const lat = 41.363094;
	const lng = 2.112971;
	const [modalVisible, setModalVisible] = useState(false);
	const handleSeeOnMap = () => {
		navigation.navigate("MapScreen", { lat: lat, lgn: lng });
	};

	const handleEdit = () => {
		navigation.navigate("EditPinScreen", { pin: pin });
	};
	const handleDelete = () => console.log("Delete clicked");
	const handleShare = () => console.log("Share clicked");

	function renderModal() {
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={[styles.modalView, styles.shadow]}>
						<Text style={[styles.modalText, { fontWeight: "bold" }]}>
							Are you sure?
						</Text>
						<Text style={styles.modalText}>
							Do you really want to delete this pin? This process cannot be
							undone.
						</Text>
						<View style={{ flexDirection: "row" }}>
							<Pressable
								style={[
									styles.button,
									{ backgroundColor: COLORS.secondary },
									styles.shadow,
								]}
								onPress={() => setModalVisible(!modalVisible)}
							>
								<Text style={styles.textStyle}>Cancel</Text>
							</Pressable>
							<Pressable
								style={[
									styles.button,
									{ backgroundColor: COLORS.red1, marginStart: 15 },
									styles.shadow,
								]}
								onPress={() => setModalVisible(!modalVisible)}
							>
								<Text style={styles.textStyle}>Delete</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>
		);
	}

	function renderImageCarousel() {
		return (
			<ImageSlider
				data={
					media.length > 1
						? [
								{
									img: media[0],
								},
								{
									img: media[1],
								},
						  ]
						: media.length > 0
						? [
								{
									img: media[1],
								},
						  ]
						: [
								{
									img: "https://retodiario.com/wp-content/uploads/2021/01/no-image.png",
								},
						  ]
				}
				backgroundColor={COLORS.green1}
				showHeader
				showIndicator
				closeIconColor={COLORS.white}
				headerRightComponent={
					<Feather
						name="trash-2"
						color={COLORS.white}
						size={30}
						onPress={() => handleDelete()}
					/>
				}
				headerStyle={{ padding: 5 }}
				onItemChanged={(item) => console.log("item", item)}
				caroselImageStyle={{ height: 250 }}
				inActiveIndicatorStyle={{ backgroundColor: COLORS.lightgrey }}
				activeIndicatorStyle={{ backgroundColor: COLORS.white }}
				indicatorContainerStyle={{ top: 15 }}
			/>
		);
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
				flexDirection: "column",
				backgroundColor: COLORS.white,
			}}
		>
			<View
				style={[
					{
						height: 250,
						borderBottomColor: COLORS.secondary,
						borderBottomWidth: 2,
					},
					styles.shadow,
				]}
			>
				{renderImageCarousel()}
			</View>
			<View
				style={{
					flex: 1,
					marginTop: 15,
					marginHorizontal: 20,
				}}
			>
				<View style={{ flexDirection: "row" }}>
					<Text style={styles.title}>{pin.name}</Text>
					<TouchableOpacity
						style={{ marginStart: 15, justifyContent: "center" }}
						onPress={() => setModalVisible(true)}
					>
						<Feather
							name="trash-2"
							style={{ alignSelf: "center" }}
							color={COLORS.red1}
							size={25}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							{
								flexDirection: "row",
								justifyContent: "center",
								width: 90,
								marginLeft: 125,
								borderRadius: 7,
								padding: 5,
								backgroundColor: COLORS.green1,
							},
							styles.shadow,
						]}
						onPress={handleEdit}
					>
						<Feather name="edit" size={24} color={COLORS.white} />
						<Text style={[styles.textStyle, { marginStart: 5 }]}> Edit</Text>
					</TouchableOpacity>
				</View>
				{renderModal()}
				<Text style={[styles.body, { marginTop: 20 }]}>{pin.description}</Text>
				<View
					style={{
						flexDirection: "row",
						padding: 10,
						marginTop: 10,
					}}
				>
					<Ionicons
						name="location-sharp"
						size={30}
						style={{ alignSelf: "center" }}
						color={COLORS.secondary}
					/>
					<Text style={[styles.body, { marginStart: 10 }]}>{locationName}</Text>
				</View>
				<TouchableOpacity
					style={{ alignSelf: "flex-start", marginStart: 10 }}
					onPress={handleSeeOnMap}
				>
					<Text style={styles.greenHighlight}>See on map</Text>
				</TouchableOpacity>
				<View
					style={{
						flexDirection: "row",
						padding: 10,
						marginTop: 10,
					}}
				>
					<Ionicons
						name="md-calendar"
						style={{ alignSelf: "center" }}
						color={COLORS.secondary}
						size={30}
					/>
					<Text style={[styles.body, { marginStart: 10 }]}>{pin.date}</Text>
				</View>
				<Rating
					type={"custom"}
					imageSize={20}
					fractions={0}
					startingValue={pin.rating}
					ratingBackgroundColor={COLORS.secondary}
					ratingColor={COLORS.green1}
					tintColor={COLORS.white}
					readonly={true}
					style={{
						padding: 10,
						marginTop: 10,
						alignSelf: "flex-start",
					}}
				/>
				<View
					style={{
						flexDirection: "row",
						padding: 10,
						alignItems: "center",
					}}
				>
					<TouchableOpacity onPress={handleShare}>
						<Ionicons
							name="share-social-sharp"
							style={{ alignSelf: "center" }}
							color={COLORS.secondary}
							size={35}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={{ marginStart: 180, flexDirection: "column" }}
						onPress={async () => {
							let data = await presentationCtrl.getDataStatistics(
								"24hours",
								lat,
								lng
							);
							navigation.navigate("Statistics", { data: data });
						}}
					>
						<Ionicons
							name="bar-chart"
							style={{ alignSelf: "center" }}
							color={COLORS.green1}
							size={35}
						/>
						<Text style={styles.greenHighlight}>See Statistics</Text>
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
	body: {
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

export default PinOwnerScreen;
