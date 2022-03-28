import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import {
	LineChart,
	BarChart,
	PieChart,
	ProgressChart,
	ContributionGraph,
	StackedBarChart,
} from "react-native-chart-kit";

import COLORS from "../config/stylesheet/colors";
const PresentationCtrl = require("./PresentationCtrl.js");

import { MaterialCommunityIcons } from "@expo/vector-icons";

function StatisticsScreen({ navigation, route }) {
	const { data } = route.params;
	const { coords } = route.params;
	const [tmpDades, setDades] = useState(null);
	let presentationCtrl = new PresentationCtrl();

	const setInterval = async (option) => {
		console.log(option);
		let tmp = await presentationCtrl.getDataStatistics(
			option,
			coords.latitude,
			coords.longitude
		);
		setDades(tmp);
	};

	const handleFilter = () => {};

	const IntervalOptionsBtn = (props) => {
		return (
			<TouchableOpacity
				onPress={setInterval.bind(this, props.option)}
				style={[styles.btn, styles.shadow]}
			>
				<Text
					style={{
						color: "white",
						textAlign: "center",
						fontWeight: "bold",
					}}
				>
					{props.value}
				</Text>
			</TouchableOpacity>
		);
	};

	function renderOptions() {
		return (
			<View
				style={{
					alignSelf: "center",
					flexDirection: "row",
					justifyContent: "center",
					padding: 10,
					marginTop: 10,
				}}
			>
				<IntervalOptionsBtn option={"24hours"} value="Last 24h" />
				<IntervalOptionsBtn option={"week"} value="Last Week" />
				<IntervalOptionsBtn option={"month"} value="Last Month" />
				<IntervalOptionsBtn option={"year"} value="Last Year" />
			</View>
		);
	}

	function renderLinearChart(dades) {
		const chartConfig = {
			backgroundGradientFrom: "#1E2923",
			backgroundGradientFromOpacity: 0,
			backgroundGradientTo: "#08130D",
			backgroundGradientToOpacity: 0,
			color: (opacity = 1) => "#8bc34a",
			strokeWidth: 2, // optional, default 3
			barPercentage: 0.5,
			useShadowColorFromDataset: false, // optional
		};
		const screenWidth = Dimensions.get("window").width;
		const data = {
			labels: [
				"00",
				"02",
				"04",
				"06",
				"08",
				"10",
				"12",
				"14",
				"16",
				"18",
				"20",
				"22",
			],
			datasets: [
				{
					data: Array.from(dades),
					color: (opacity = 1) => "#4d4d4d", // optional
					strokeWidth: 2, // optional
				},
			],
			//legend: ["Rainy Days"] // optional
		};
		return (
			<View style={{ alignItems: "center", justifyContent: "center" }}>
				<LineChart
					data={data}
					width={screenWidth}
					height={180}
					chartConfig={chartConfig}
					bezier
				/>
			</View>
		);
	}

	function renderPieChart(dades) {
		const chartConfig = {
			backgroundGradientFrom: "#1E2923",
			backgroundGradientFromOpacity: 0,
			backgroundGradientTo: COLORS.secondary,
			backgroundGradientToOpacity: 0,
			color: (opacity = 1) => COLORS.green1,
			strokeWidth: 2, // optional, default 3
			barPercentage: 0.5,
			useShadowColorFromDataset: false, // optional
		};
		const screenWidth = Dimensions.get("window").width;

		const data = Array.from(dades);

		let colorsPieChart = [
			"#F94144",
			"#277DA1",
			"#F3722C",
			"#4D908E",
			"#F8961E",
			"#90BE6D",
			"#F9844A",
			"#43AA8B",
			"#F9C74F",
			"#4D908E",
		];
		for (let i = 0; i < data.length; i++) {
			data[i].name += " (µg/m3)";
			data[i].color = colorsPieChart[i];
			data[i].legendFontColor = COLORS.darkGrey;
			data[i].legendFontSize = 13;
		}

		return (
			<View style={{ alignItems: "center" }}>
				<PieChart
					data={data}
					width={screenWidth}
					height={200}
					chartConfig={chartConfig}
					accessor={"quantity"}
					backgroundColor={"transparent"}
					paddingLeft={"0"}
					center={[0, 0]}
					absolute
				/>
			</View>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			<View style={{ marginVertical: 20, marginHorizontal: 20 }}>
				<View style={{ flexDirection: "row" }}>
					<Text style={styles.body}>
						Location-based data recorded over time
					</Text>
					<View style={[styles.containerFilter, styles.shadow]}>
						<TouchableOpacity onPress={handleFilter}>
							<MaterialCommunityIcons
								name="filter-menu"
								style={{ alignSelf: "center" }}
								color={COLORS.white}
								size={30}
							/>
						</TouchableOpacity>
					</View>
				</View>
				{renderOptions()}
				<Text style={[styles.body, { margin: 10 }]}>POLLUTION EVOLUTION</Text>
				{renderLinearChart(data[0])}
				<Text style={[styles.body, { margin: 10 }]}>POLLUTANT QUANTITY</Text>
				{renderPieChart(data[1])}
			</View>
		</SafeAreaView>
	);

	//canviar renderLinearChart(data[0]) => renderLinearChart(tmpDades[0]) i guess
}

const styles = StyleSheet.create({
	btn: {
		margin: 5,
		justifyContent: "center",
		borderRadius: 5,
		borderBottomWidth: 5,
		width: 80,
		height: 35,
		borderBottomColor: COLORS.green2,
		backgroundColor: COLORS.green1,
	},
	body: {
		alignSelf: "center",
		fontSize: 15,
		fontWeight: "bold",
		color: COLORS.secondary,
	},
	containerFilter: {
		backgroundColor: COLORS.green1,
		width: 45,
		height: 45,
		marginStart: 30,
		borderRadius: 12,
		justifyContent: "center",
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

export default StatisticsScreen;
