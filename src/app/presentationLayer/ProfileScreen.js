import React from "react";

import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

import colors from "../config/stylesheet/colors";

function ProfileScreen({ navigation }, props) {
  return (
    <View style={styles.background}>
      <Text style={{ marginTop: 300 }}> Profile Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "flex-start",
    paddingTop: Platform.OS === "android" ? 30 : 0,
    alignItems: "center",
  },
});

export default ProfileScreen;
