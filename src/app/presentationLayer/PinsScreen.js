import React from "react";
import {
	Text,
	StyleSheet,
	View,
	FlatList,
	TouchableOpacity,
	Image,
	SafeAreaView,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

import COLORS from "../config/stylesheet/colors";
import Pin from "../domainLayer/classes/Pin"; //elimnar fake

function PinsScreen({ navigation }) {
	const getDate = (date) => {
		let tempDate = date.toString().split(" ");
		return date !== ""
			? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
			: "";
	};

	//fake
	const items = [
		new Pin(
			"FIB UPC",
			{
				latitude: 41.38941,
				longitude: 2.113436,
				title:
					"Edifici B6 del Campus Nord, C/ Jordi Girona, 1-3, 08034 Barcelona",
			},
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit leo non vehicula consequat. Etiam lorem ",
			[
				"https://fisica.upc.edu/ca/graus/centres-i-estudis/imatges-escoles/fib.jpeg/@@images/image.jpeg",
				"https://pbs.twimg.com/media/Eh3E26xXYAITese.jpg",
			],
			4,
			getDate(new Date()),
			"Public"
		),
		new Pin(
			"PALAU REIAL",
			{
				latitude: 41.38941,
				longitude: 2.113436,
				title: "Av. Diagonal, 686, 08034 Barcelona",
			},
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit leo non vehicula consequat. Etiam lorem ",
			[
				"https://www.bcncatfilmcommission.com/sites/default/files/styles/fancybox/public/locations/Districte%20(3).jpg",
			],
			4,
			getDate(new Date()),
			"Private"
		),
		new Pin(
			"CAMP NOU",
			{
				latitude: 41.38941,
				longitude: 2.113436,
				title: "C. d'Arístides Maillol, 12, 08028 Barcelona",
			},
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit leo non vehicula consequat. Etiam lorem ",
			["https://cdn.getyourguide.com/img/tour/5cd031d5654c4.jpeg/148.jpg"],
			4,
			getDate(new Date()),
			"Public"
		),
		new Pin(
			"CAMP NOUu",
			{
				latitude: 41.38941,
				longitude: 2.113436,
				title: "C. d'Arístides Maillol, 12, 08028 Barcelona",
			},
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit leo non vehicula consequat. Etiam lorem ",
			["https://cdn.getyourguide.com/img/tour/5cd031d5654c4.jpeg/148.jpg"],
			4,
			getDate(new Date()),
			"Private"
		),
		new Pin(
			"CAMP NOUuu",
			{
				latitude: 41.38941,
				longitude: 2.113436,
				title: "C. d'Arístides Maillol, 12, 08028 Barcelona",
			},
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit leo non vehicula consequat. Etiam lorem ",
			["https://cdn.getyourguide.com/img/tour/5cd031d5654c4.jpeg/148.jpg"],
			4,
			getDate(new Date()),
			"Public"
		),
		new Pin(
			"CAMP NOUuuu",
			{
				latitude: 41.38941,
				longitude: 2.113436,
				title: "C. d'Arístides Maillol, 12, 08028 Barcelona",
			},
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit leo non vehicula consequat. Etiam lorem ",
			["https://cdn.getyourguide.com/img/tour/5cd031d5654c4.jpeg/148.jpg"],
			4,
			getDate(new Date()),
			"Public"
		),
	];

	const isMyPin = [true, false, true, false, true, true];

	const renderItem = ({ item, index }) => (
		<View
			style={[
				styles.shadow,
				{ borderRadius: 10, backgroundColor: COLORS.white },
			]}
		>
			<View style={{ flexDirection: "column" }}>
				<View style={{ flexDirection: "row" }}>
					<TouchableOpacity
						style={{
							flexDirection: "row",
							flex: 1,
							alignItems: "center",
						}}
						onPress={() => {
							if (isMyPin[index]) {
								navigation.navigate("OwnerPin", { pin: item });
							} else {
								navigation.navigate("DefaultPin", { pin: item, saved: true });
							}
						}}
					>
						<Image
							source={{ uri: item.media[0] }}
							style={{
								width: 85,
								height: 85,
								borderTopLeftRadius: 10,
								borderBottomLeftRadius: isMyPin[index] ? 0 : 10,
							}}
						/>
						<View
							style={{
								flex: 1,
								marginHorizontal: 10,
								alignSelf: "center",
							}}
						>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<Text style={styles.itemName}>{item.name}</Text>
								<View
									style={{
										backgroundColor: isMyPin[index]
											? COLORS.blue2
											: COLORS.green1,
										alignSelf: "flex-end",
										margin: 5,
										padding: 2,
										borderRadius: 5,
									}}
								>
									<Text
										style={[
											styles.itemName,
											{
												color: COLORS.white,
												fontSize: 12,
												fontWeight: "bold",
											},
										]}
									>
										{isMyPin[index] ? item.status : "Saved"}
									</Text>
								</View>
							</View>
							<View style={{ flexDirection: "row", marginVertical: 2 }}>
								<Ionicons
									name="location-sharp"
									style={{ alignSelf: "center" }}
									color={COLORS.secondary}
									size={13}
								/>
								<Text
									numberOfLines={1}
									style={[styles.itemCode, { flex: 1, flexWrap: "wrap" }]}
								>
									{item.location.title}
								</Text>
							</View>
							<View style={{ flexDirection: "row", marginVertical: 2 }}>
								<Ionicons
									name="md-calendar"
									style={{ alignSelf: "center" }}
									color={COLORS.secondary}
									size={13}
								/>
								<Text style={styles.itemCode}>{item.date}</Text>
							</View>
						</View>
					</TouchableOpacity>
				</View>
				{isMyPin[index] && (
					<View
						style={{
							height: 30,
							flexDirection: "row",
						}}
					>
						<TouchableOpacity
							style={{
								flex: 1.5,
								flexDirection: "row",
								backgroundColor: COLORS.secondary,
								borderBottomLeftRadius: 10,
								justifyContent: "center",
								alignItems: "center",
							}}
							onPress={() => {
								navigation.navigate("EditPinScreen", { pin: item });
							}}
						>
							<Feather name="edit" size={15} color={COLORS.white} />
							<Text style={styles.containerTxt}>Edit</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								flex: 1,
								flexDirection: "row",
								backgroundColor: COLORS.red1,
								borderBottomRightRadius: 10,
								justifyContent: "center",
								alignItems: "center",
							}}
							onPress={() => console.log("delete")}
						>
							<Feather name="trash-2" size={15} color={COLORS.white} />
							<Text style={styles.containerTxt}>Delete</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		</View>
	);

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: COLORS.light,
				flexDirection: "column",
				paddingHorizontal: 20,
			}}
		>
			<View style={[{ marginTop: 20, flex: 1 }]}>
				<FlatList
					stickyHeaderHiddenOnScroll={true}
					contentContainerStyle={{ padding: 10 }}
					scrollEnabled={true}
					data={items}
					keyExtractor={(item) => `${item.name}`}
					renderItem={renderItem}
					showsVerticalScrollIndicator={false}
					ItemSeparatorComponent={() => {
						return (
							<View
								style={{
									width: "100%",
									height: 20,
									backgroundColor: COLORS.light,
								}}
							></View>
						);
					}}
				></FlatList>
			</View>
		</SafeAreaView>
	);
}

//https://wix.github.io/react-native-navigation/docs/style-animations/

const styles = StyleSheet.create({
	containerTxt: {
		fontSize: 13,
		color: COLORS.white,
		fontWeight: "bold",
		marginHorizontal: 10,
	},
	itemName: {
		fontSize: 15,
		fontWeight: "bold",
		color: COLORS.secondary,
	},
	itemCode: {
		fontSize: 12,
		alignSelf: "flex-end",
		color: COLORS.darkGrey,
		marginHorizontal: 5,
	},
	status: {
		alignSelf: "center",
		fontSize: 10,
		fontWeight: "bold",
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

export default PinsScreen;
