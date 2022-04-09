import React from "react";
import {
	Text,
	StyleSheet,
	View,
	FlatList,
	TouchableOpacity,
	ImageBackground,
	Image,
	SafeAreaView,
} from "react-native";

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
	let pin = new Pin(
		"FIB UPC",
		{ latitude: 41.38941, longitude: 2.113436 },
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit leo non vehicula consequat. Etiam lorem ",
		[
			"https://fisica.upc.edu/ca/graus/centres-i-estudis/imatges-escoles/fib.jpeg/@@images/image.jpeg",
			"https://pbs.twimg.com/media/Eh3E26xXYAITese.jpg",
		],
		4,
		getDate(new Date()),
		true
	);
	const items = [
		{ name: "UPC FIB", code: COLORS.secondary, date: pin.date },
		{ name: "PALAU REIAL", code: COLORS.secondary, date: pin.date },
		{ name: "CAMP NOU", code: COLORS.secondary, date: pin.date },
	];

	const renderItem = ({ item }) => (
		<View
			style={[
				styles.shadow,
				{ borderRadius: 10, backgroundColor: COLORS.white },
			]}
		>
			<TouchableOpacity
				style={{
					flexDirection: "row",
					alignItems: "center",
				}}
				onPress={() => console.log("item")}
			>
				<Image
					source={{ uri: pin.media[0] }}
					style={{
						width: 85,
						height: 85,
						borderTopLeftRadius: 10,
						borderBottomLeftRadius: 10,
					}}
				/>
				<View style={{ margin: 10, alignSelf: "flex-start" }}>
					<Text style={styles.itemName}>{item.name}</Text>
					<Text style={styles.itemCode}>{item.date} </Text>
				</View>
			</TouchableOpacity>
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
			<View style={{ flexDirection: "row" }}>
				<TouchableOpacity
					style={styles.btn}
					onPress={() => navigation.navigate("OwnerPin", { pin: pin })}
				>
					<Text style={styles.btnText}>Pin Owner View</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.btn}
					onPress={() => navigation.navigate("DefaultPin", { pin: pin })}
				>
					<Text style={styles.btnText}>Pin Default View</Text>
				</TouchableOpacity>
			</View>
			<View style={[{ marginTop: 20, flex: 1 }]}>
				<FlatList
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
	btn: {
		justifyContent: "center",
		borderRadius: 5,
		borderBottomWidth: 5,
		borderRadius: 5,
		width: 100,
		height: 50,
		borderBottomColor: COLORS.darkGrey,
		backgroundColor: COLORS.secondary,
	},
	btnText: {
		color: COLORS.white,
		textAlign: "center",
		fontWeight: "bold",
	},
	gridView: {
		marginTop: 10,
		flex: 1,
	},
	itemContainer: {
		borderRadius: 5,
		height: 150,
		width: 180,
	},
	itemName: {
		fontSize: 17,
		fontWeight: "bold",
		color: COLORS.secondary,
	},
	itemCode: {
		fontSize: 12,
		color: COLORS.darkGrey,
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
