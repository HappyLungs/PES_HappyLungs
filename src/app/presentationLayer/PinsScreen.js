import React from "react";

import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

import COLORS from "../config/stylesheet/colors";
import { Pin } from "../domainLayer/classes/Pin";

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

	let locationName =
		"Edifici B6 del Campus Nord, C/ Jordi Girona, 1-3, 08034 Barcelona";
	return (
		<View style={styles.background}>
			<Text style={{ marginTop: 300 }}> Pins Screen</Text>
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
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: COLORS.white,
		justifyContent: "flex-start",
		paddingTop: Platform.OS === "android" ? 30 : 0,
		alignItems: "center",
	},
	btn: {
		marginTop: 25,
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
});

export default PinsScreen;
