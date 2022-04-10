import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Modal,
} from "react-native";

import COLORS from "../config/stylesheet/colors";

import { Rating } from "react-native-ratings";
import { ImageSlider } from "react-native-image-slider-banner";
import { Ionicons, Feather } from "@expo/vector-icons";

const PresentationCtrl = require("./PresentationCtrl.js");

function PinOwnerScreen({ navigation, route }) {
	let presentationCtrl = new PresentationCtrl();

	const { pin } = route.params;
	const media = Array.from(pin.media);

	const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
		useState(false);

	const handleSeeOnMap = () => {
		navigation.navigate("MapScreen", {
			latitude: pin.location.latitude,
			longitude: pin.location.longitude,
		});
	};

	const handleEdit = () => {
		navigation.navigate("EditPinScreen", { pin: pin });
	};
	const handleDelete = () => console.log("Delete clicked");
	const handleShare = () => console.log("Share clicked");

	function renderDeleteConfirmation() {
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={deleteConfirmationVisible}
				onRequestClose={() => {
					setDeleteConfirmationVisible(!deleteConfirmationVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={[styles.modalView, styles.shadow]}>
						<Text
							style={[styles.modalText, { fontWeight: "bold", fontSize: 16 }]}
						>
							Are you sure?
						</Text>
						<Text style={[styles.modalText, { fontSize: 15 }]}>
							Do you really want to delete this pin? This cannot be undone.
						</Text>
						<View
							style={{ flexDirection: "row", justifyContent: "space-evenly" }}
						>
							<TouchableOpacity
								style={[
									styles.containerBtn,
									{ backgroundColor: COLORS.secondary },
									styles.shadow,
								]}
								onPress={() =>
									setDeleteConfirmationVisible(!deleteConfirmationVisible)
								}
							>
								<Text style={styles.textStyle}>Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[
									styles.containerBtn,
									{ backgroundColor: COLORS.red1, marginStart: 15 },
									styles.shadow,
								]}
								onPress={() =>
									setDeleteConfirmationVisible(!deleteConfirmationVisible)
								}
							>
								<Text style={styles.textStyle}>Delete</Text>
							</TouchableOpacity>
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
									img: media[0],
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
				onItemChanged={(item) => console.log("item", item)}
				caroselImageStyle={{ height: 250 }}
				inActiveIndicatorStyle={{ backgroundColor: COLORS.lightGrey }}
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
				<View style={{ flexDirection: "row", height: 35 }}>
					<Text style={[styles.title, { width: "65%" }]}>{pin.name}</Text>
					<TouchableOpacity
						style={{ justifyContent: "center" }}
						onPress={() => setDeleteConfirmationVisible(true)}
					>
						<Feather name="trash-2" color={COLORS.red1} size={20} />
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							{
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
								width: 90,
								marginStart: 10,
								borderRadius: 5,
								backgroundColor: COLORS.secondary,
							},
							styles.shadow,
						]}
						onPress={handleEdit}
					>
						<Feather name="edit" size={24} color={COLORS.white} />
						<Text style={[styles.textStyle, { marginStart: 5 }]}> Edit</Text>
					</TouchableOpacity>
				</View>
				{renderDeleteConfirmation()}
				<Text style={[styles.body, { marginTop: 10 }]}>{pin.description}</Text>
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
					<Text style={[styles.body, { marginStart: 10 }]}>
						{pin.location.title}
					</Text>
				</View>
				<TouchableOpacity
					style={{ alignSelf: "flex-start", marginStart: 10 }}
					onPress={handleSeeOnMap}
				>
					<Text style={styles.highlight}>See on map</Text>
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
						justifyContent: "space-between",
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
						style={{ flexDirection: "column" }}
						onPress={async () => {
							let data = await presentationCtrl.getDataStatistics(
								"24hours",
								pin.location.latitude,
								pin.location.longitude
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
						<Text style={styles.highlight}>See Statistics</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: "bold",
		alignSelf: "center",
		color: COLORS.secondary,
	},
	body: {
		alignSelf: "center",
		fontSize: 15,
		color: COLORS.secondary,
	},
	highlight: {
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
		justifyContent: "flex-end",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		backgroundColor: COLORS.white,
		borderColor: COLORS.secondary,
		borderTopWidth: 2,
		padding: 15,
		backgroundColor: COLORS.white,
	},
	button: {
		elevation: 2,
	},
	containerBtn: {
		width: 90,
		padding: 10,
		borderRadius: 5,
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
