import React from "react";
import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
	ImageBackground,
} from "react-native";
import { FlatGrid } from "react-native-super-grid";

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
	const [items, setItems] = React.useState([
		{ name: "UPC FIB", code: COLORS.secondary, date: pin.date },
		{ name: "PALAU REIAL", code: COLORS.secondary, date: pin.date },
		{ name: "CAMP NOU", code: COLORS.secondary, date: pin.date },
	]);

	return (
		<View style={styles.background}>
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
			<FlatGrid
				itemDimension={130}
				data={items}
				style={styles.gridView}
				// staticDimension={300}
				// fixed
				spacing={10}
				renderItem={({ item }) => (
					<View
						style={[
							styles.itemContainer,
							{ borderWidth: 2, borderColor: item.code },
						]}
					>
						<ImageBackground
							source={{
								uri: pin.media[0],
							}}
							style={{
								width: 175,
								height: 145,
								justifyContent: "flex-end",
							}}
							imageStyle={{ borderRadius: 5 }}
						>
							<View
								style={{
									alignSelf: "flex-start",
									padding: 3,
									paddingHorizontal: 10,
									width: "100%",
									borderTopRightRadius: 3,
									borderTopLeftRadius: 3,
									backgroundColor: COLORS.white,
								}}
							>
								<Text style={styles.itemName}>{item.name}</Text>
								<Text style={styles.itemCode}>{item.date}</Text>
							</View>
							<View
								style={{
									position: "absolute",
									right: "-1%",
									bottom: "86%",
									width: 50,
									borderBottomWidth: 1,
									borderLeftWidth: 1,
									backgroundColor: "#3498db",
									borderColor: item.code,
									borderRadius: 3,
									padding: 3,
								}}
							>
								<Text style={styles.status}>PRIVATE</Text>
							</View>
						</ImageBackground>
					</View>
				)}
			/>
		</View>
	);
}

//https://wix.github.io/react-native-navigation/docs/style-animations/

const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: COLORS.white,
		justifyContent: "flex-start",
		paddingTop: Platform.OS === "android" ? 30 : 0,
		alignItems: "center",
	},
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
		fontSize: 15,
		fontWeight: "bold",
		color: COLORS.secondary,
	},
	itemCode: {
		fontSize: 12,
		fontWeight: "bold",
		color: COLORS.green1,
	},
	status: {
		alignSelf: "center",
		fontSize: 10,
		fontWeight: "bold",
		color: COLORS.white,
	},
});

export default PinsScreen;
