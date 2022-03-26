import React from "react";

import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

import COLORS from "../config/stylesheet/colors";

function PinsScreen({ navigation }) {
  return (
    <View style={styles.background}>
      <Text style={{ marginTop: 300 }}> Pins Screen</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("OwnerPin")}
      >
        <Text style={styles.btnText}>Pin Owner View</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("DefaultPin")}
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
