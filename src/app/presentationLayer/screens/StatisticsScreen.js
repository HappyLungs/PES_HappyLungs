import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";

import COLORS from "../../config/stylesheet/colors";
import i18n from "../../config/translation";
const PresentationCtrl = require("../PresentationCtrl.js");

function StatisticsScreen({ navigation, route }) {
	let i = 0;
	const { coords } = route.params;
	const [loaded, setLoaded] = useState(false);
	const [tmpDades, setDades] = useState([]);
	const [selectedInterval, setSelectedInterval] = useState("24hours");
	let presentationCtrl = new PresentationCtrl();

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", async () => {
			setInterval("24hours");
		});
		return unsubscribe;
	}, []);

	const setInterval = async (ops) => {
		setSelectedInterval(ops);
		let tmp = await presentationCtrl
			.getDataStatistics(selectedInterval, coords.latitude, coords.longitude)
			.then((dades) => {
				let i = 0;
				setDades(dades);
				setLoaded(true);
			})
			.catch((error) => {
				console.log("error¿?", error);
			});
	};

	const IntervalOptionsBtn = (props) => {
		return (
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() => {
					setLoaded(false);
					setInterval(props.option);
				}}
				style={[
					styles.btn,
					styles.shadow,
					{
						backgroundColor:
							selectedInterval === props.option
								? COLORS.darkGrey
								: COLORS.green1,
						borderBottomColor:
							selectedInterval === props.option
								? COLORS.secondary
								: COLORS.green2,
					},
				]}
			>
				<Text
					style={{
						color: "white",
						textAlign: "center",
						fontWeight: "bold",
						fontSize: 13,
					}}
				>
					{props.value}
				</Text>
			</TouchableOpacity>
		);
	};

	function renderOptions() {
		return (
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				style={{
					alignSelf: "center",
					flexDirection: "row",
					padding: 10,
					marginTop: 10,
				}}
				contentContainerStyle={{
					justifyContent: "center",
				}}
			>
				<IntervalOptionsBtn
					option={"24hours"}
					value={i18n.t("statisticsFilter1")}
				/>
				<IntervalOptionsBtn
					option={"week"}
					value={i18n.t("statisticsFilter2")}
				/>
				<IntervalOptionsBtn
					option={"month"}
					value={i18n.t("statisticsFilter3")}
				/>
				<IntervalOptionsBtn
					option={"year"}
					value={i18n.t("statisticsFilter4")}
				/>
			</ScrollView>
		);
	}

	function renderLinearChart() {
		const chartConfig = {
			backgroundGradientFrom: "#1E2923",
			backgroundGradientFromOpacity: 0,
			backgroundGradientTo: "#08130D",
			backgroundGradientToOpacity: 0,
			color: (opacity = 1) => "#8bc34a",
			useShadowColorFromDataset: false, // optional
		};
		const screenWidth = Dimensions.get("window").width;
		let j = 0;
		const data = {
			labels: tmpDades[0].tags,
			datasets: [
				{
					data: tmpDades[0].levels,
					color: (opacity = 1) => "#4d4d4d", // optional
					strokeWidth: 2, // optional
				},
				{
					data: [0], // min
				},
				{
					data: [6], // max
				},
			],
		};
		return (
			<View
				style={{
					alignItems: "center",
					justifyContent: "center",
					marginTop: 10,
				}}
			>
				<LineChart
					data={data}
					width={screenWidth}
					height={180}
					chartConfig={chartConfig}
					bezier
					yAxisInterval={1}
				/>
			</View>
		);
	}

	function renderPieChart() {
		let dades = tmpDades[1];

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

		let colorsPieChart = [
			"#669900",
			"#006699",
			"#990066",
			"#FFCC00",
			"#FF6600",
			"#99CC33",
			"#3399CC",
			"#CC3399",
			"#CCEE66",
			"#FF9900",
		];

		for (let i = 0; i < dades.length; i++) {
			dades[i].color = colorsPieChart[i];
			dades[i].legendFontColor = COLORS.darkGrey;
			dades[i].legendFontSize = 13;
			dades[i].quantity = parseInt(dades[i].quantity);
		}

		return (
			<View style={{ alignItems: "center" }}>
				<PieChart
					data={dades}
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

	if (!loaded) {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
				<View style={{ marginVertical: 20, marginHorizontal: 20 }}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text style={styles.body}>{i18n.t("loading")}</Text>
					</View>
				</View>
			</SafeAreaView>
		);
	} else {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
				<View style={{ marginVertical: 20, marginHorizontal: 10 }}>
					<Text style={styles.body}>{i18n.t("statisticsSubTitle")}</Text>
					{renderOptions()}
					<Text style={[styles.body, { margin: 10 }]}>
						{i18n.t("statisticsChart1").toUpperCase()}
					</Text>
					{renderLinearChart()}
					<Text style={[styles.body, { marginTop: 30 }]}>
						{i18n.t("statisticsChart2").toUpperCase()}
					</Text>
					<Text style={[styles.body, { fontSize: 14, fontWeight: "normal" }]}>
						({i18n.t("perDay")})
					</Text>
					{renderPieChart()}
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	btn: {
		margin: 5,
		justifyContent: "center",
		borderRadius: 5,
		borderBottomWidth: 5,
		padding: 5,
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
	spinner: {
		marginBottom: 50,
	},
});

export default StatisticsScreen;
