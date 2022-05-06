import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";

import COLORS from "../config/stylesheet/colors";
import i18n from "../config/translation";

import { Rating } from "react-native-ratings";
import ImageCarousel from "./components/ImageCarousel";
import { Ionicons } from "@expo/vector-icons";

const PresentationCtrl = require("./PresentationCtrl.js");

function PinDefaultScreen({ navigation, route }) {
	let presentationCtrl = new PresentationCtrl();

	const { pin } = route.params;
	const saved = route.params;
	const [bookmark, setBookmark] = useState(
		saved ? "bookmark" : "bookmark-outline"
	);
	const handleSeeOnMap = () => {
		navigation.navigate("MapScreen", {
			latitude: pin.location.latitude,
			longitude: pin.location.longitude,
		});
	};

	const handleShare = () => console.log("Share clicked");

	return (
		<SafeAreaView
			style={{
				flex: 1,
				flexDirection: "column",
				backgroundColor: COLORS.white,
			}}
		>
			<View
				style={[{ height: 250, borderBottomLeftRadius: 50 }, styles.shadow]}
			>
				<ImageCarousel media={pin.media} />
			</View>
			<View
				style={{
					flex: 1,
					marginTop: 15,
					marginHorizontal: 20,
				}}
			>
				<View style={{ flexDirection: "row", height: 35 }}>
					<Text style={[styles.title, { width: "85%" }]}>{pin.title}</Text>
					<TouchableOpacity
						style={{ justifyContent: "center" }}
						onPress={
							() =>
								setBookmark(
									bookmark === "bookmark" ? "bookmark-outline" : "bookmark"
								)
							//add/remove to/from pins list
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
					<Text style={[styles.body, { marginStart: 10 }]}>
						{pin.locationTitle}
					</Text>
				</View>
				<TouchableOpacity
					style={{ alignSelf: "flex-start", marginStart: 10 }}
					onPress={handleSeeOnMap}
				>
					<Text style={styles.highlight}>{i18n.t("seeOnMap")}</Text>
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
					<Text
						style={[styles.body, { marginStart: 10, alignSelf: "flex-start" }]}
					>
						{pin.date}
					</Text>
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
						<Text style={styles.highlight}>{i18n.t("seeStatistics")}</Text>
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
});

export default PinDefaultScreen;
