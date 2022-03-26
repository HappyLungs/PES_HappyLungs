import { useState, useEffect, React } from 'react';
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

import COLORS from "../config/stylesheet/COLORS";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const onPress = (option) => {
  console.log(option);
};

const TimeOptionsBtn = (props) => {
  return (
    <TouchableOpacity
      onPress={onPress.bind(this, props.option)}
      style={styles.btn}
    >
      <Text style={styles.btnText}>{props.value}</Text>
    </TouchableOpacity>
  );
};

function renderOptions() {
  return (
    <View style={styles.containerBtn}>
      <TimeOptionsBtn option={"1"} value="Last 24h" />
      <TimeOptionsBtn option={"2"} value="Last Week" />
      <TimeOptionsBtn option={"3"} value="Last Month" />
      <TimeOptionsBtn option={"4"} value="Last Year" />
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

function renderPieChart() {
  const data = [
    {
      name: "PM10 (µg/m3)",
      quantity: 24,
      color: "#F94144",
      legendFontColor: "#7F7F7F",
      legendFontSize: 13,
    },
    {
      name: "NOX (µg/m3)",
      quantity: 13,
      color: "#F3722C",
      legendFontColor: "#7F7F7F",
      legendFontSize: 13,
    },
    {
      name: "O3 (µg/m3)",
      quantity: 57,
      color: "#F8961E",
      legendFontColor: "#7F7F7F",
      legendFontSize: 13,
    },
    {
      name: "SO2 (µg/m3)",
      quantity: 1,
      color: "#F9844A",
      legendFontColor: "#7F7F7F",
      legendFontSize: 13,
    },
    {
      name: "H2S (µg/m3)",
      quantity: 1.2,
      color: "#F9C74F",
      legendFontColor: "#7F7F7F",
      legendFontSize: 13,
    },
    {
      name: "CO  (mg/m3)",
      quantity: 0.2,
      color: "#90BE6D",
      legendFontColor: "#7F7F7F",
      legendFontSize: 13,
    },
    {
      name: "NO (µg/m3)",
      quantity: 2,
      color: "#43AA8B",
      legendFontColor: "#7F7F7F",
      legendFontSize: 13,
    },
    {
      name: "NO2 (µg/m3)",
      quantity: 11,
      color: "#4D908E",
      legendFontColor: "#7F7F7F",
      legendFontSize: 13,
    },
    {
      name: "PM2.5 (µg/m3)",
      quantity: 19,
      color: "#577590",
      legendFontColor: "#7F7F7F",
      legendFontSize: 13,
    },
  ];

  data.sort((a, b) => a.quantity < b.quantity);
  let colorsPieChart = [
    "#F94144",
    "#F3722C",
    "#F8961E",
    "#F9844A",
    "#F9C74F",
    "#90BE6D",
    "#43AA8B",
    "#4D908E",
    "#4D908E",
    "#277DA1",
  ];
  for (let i = 0; i < data.length; i++) {
    data[i].color = colorsPieChart[i];
  }

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

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
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

function StatisticsScreen({ navigation, route }) {
  const { data } = route.params;

  return (
    <SafeAreaView style={styles.background}>
      <View
        style={{ flexDirection: "row", alignSelf: "flex-start", marginTop: 10 }}
      >
        <Text style={styles.subtitle}>
          {" "}
          Location-based data recorded over time
        </Text>
        <View style={[styles.containerSphere, styles.shadow]}>
          <TouchableOpacity onPress={console.log("Filter clicked")}>
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
      <Text style={styles.subtitle}>
        {" "}
        Pollutants to which you have been most exposed
      </Text>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        <Text style={styles.subtitle}> POLLUTION EVOLUTION</Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {renderLinearChart(data)}
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        <Text style={styles.subtitle}> POLLUTANT QUANTITY</Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {renderPieChart()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  btn: {
    marginStart: 5,
    marginEnd: 5,
    justifyContent: "center",
    borderRadius: 5,
    borderBottomWidth: 5,
    borderRadius: 5,
    width: 80,
    height: 35,
    borderBottomColor: COLORS.green2,
    backgroundColor: COLORS.green1,
  },
  containerBtn: {
    alignSelf: "center",
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
  },
  subtitle: {
    textAlign: "left",
    alignSelf: "flex-start",
    fontSize: 15,
    paddingTop: 10,
    paddingStart: 25,
    fontWeight: "bold",
    color: COLORS.secondary,
  },
  body: {
    textAlign: "left",
    alignSelf: "flex-start",
    fontSize: 10,
    fontWeight: "bold",
    color: COLORS.secondary,
  },
  containerSphere: {
    backgroundColor: COLORS.green1,
    width: 45,
    height: 45,
    marginStart: 15,
    borderRadius: 12,
    justifyContent: "center",
  },
});

export default StatisticsScreen;