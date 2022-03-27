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

const COLORS  = require("../config/stylesheet/colors");

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

function renderPieChart(dades) {
  
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => "#8bc34a",
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
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
    "#4D908E"
  ];
  for (let i = 0; i < data.length; i++) {
    data[i].name += " (µg/m3)";
    data[i].color = colorsPieChart[i];
    data[i].legendFontColor = "#7F7F7F";
    data[i].legendFontSize = 13;
  }

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
        {renderLinearChart(data[0])}
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
        {renderPieChart(data[1])}
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