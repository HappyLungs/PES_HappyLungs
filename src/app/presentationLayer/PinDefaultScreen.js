import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";

import COLORS from "../config/stylesheet/colors";

import { Rating } from "react-native-ratings";
import { ImageSlider } from "react-native-image-slider-banner";
import { Ionicons } from "@expo/vector-icons";

const PresentationCtrl = require("./PresentationCtrl.js");

function PinDefaultScreen({ navigation, route }) {
	let presentationCtrl = new PresentationCtrl();

	const { pin } = route.params;
	const media = Array.from(pin.media);
	const locationName =
		"Edifici B6 del Campus Nord, C/ Jordi Girona, 1-3, 08034 Barcelona";

	const lat = 41.363094;
	const lng = 2.112971;
	const [bookmark, setBookmark] = useState("bookmark-outline");
	const handleSeeOnMap = () => {
		navigation.navigate("MapScreen", { lat: lat, lgn: lng });
	};

	const handleShare = () => console.log("Share clicked");

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
				<View style={{ flexDirection: "row", height: 35 }}>
					<Text style={[styles.title, { width: "85%" }]}>{pin.name}</Text>
					<TouchableOpacity
						style={{ justifyContent: "center" }}
						onPress={() =>
							setBookmark(
								bookmark === "bookmark" ? "bookmark-outline" : "bookmark"
							)
						}
					>
						<Ionicons
							name={bookmark}
							style={{ alignSelf: "center" }}
							color={COLORS.secondary}
							size={30}
						/>
					</TouchableOpacity>
				</View>
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
		alignSelf: "center",
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
});

export default PinDefaultScreen;
