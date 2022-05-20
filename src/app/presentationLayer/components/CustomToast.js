import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../config/stylesheet/colors";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import i18n from "../../config/translation";

/*
  1. Create the config
*/
const toastConfig = {
	/*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
	success: (props) => (
		<BaseToast
			{...props}
			style={{ borderLeftColor: "pink" }}
			contentContainerStyle={{ paddingHorizontal: 15 }}
			text1Style={{
				fontSize: 15,
				fontWeight: "400",
			}}
		/>
	),
	/*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
	error: (props) => (
		<ErrorToast
			{...props}
			text1Style={{
				fontSize: 17,
			}}
			text2Style={{
				fontSize: 15,
			}}
		/>
	),
	/*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
	successToast: ({ text1, props }) => (
		<View
			style={[
				{
					flexDirection: "row",
					alignItems: "center",
					paddingHorizontal: 15,
					justifyContent: "flex-start",
					height: 50,
					width: "80%",
					borderLeftColor: COLORS.green4,
					borderLeftWidth: 6,
					borderTopLeftRadius: 5,
					borderBottomLeftRadius: 5,
					borderTopRightRadius: 10,
					borderBottomRightRadius: 10,
					backgroundColor: COLORS.light,
				},
				styles.shadow,
			]}
		>
			<Feather name="check-circle" size={24} color={COLORS.green4} />
			<Text style={styles.message}>{text1}</Text>
			<Text style={styles.result}> {i18n.t("successfully")}</Text>
		</View>
	),
	failureToast: ({ text1, props }) => (
		<View
			style={[
				{
					flexDirection: "row",
					alignItems: "center",
					paddingHorizontal: 15,
					justifyContent: "flex-start",
					height: 50,
					width: "80%",
					borderLeftColor: COLORS.red1,
					borderLeftWidth: 6,
					borderTopLeftRadius: 5,
					borderBottomLeftRadius: 5,
					borderTopRightRadius: 10,
					borderBottomRightRadius: 10,
					backgroundColor: COLORS.light,
				},
				styles.shadow,
			]}
		>
			<AntDesign name="closecircleo" size={24} color={COLORS.red1} />
			<Text style={styles.message}>{text1}</Text>
			<Text style={styles.result}> {i18n.t("fail")}</Text>
		</View>
	),
};

const CustomToast = ({ proops }) => {
	return <Toast config={toastConfig} />;
};

const styles = StyleSheet.create({
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
	result: {
		textAlignVertical: "center",
		fontSize: 17,
		fontWeight: "bold",
		color: COLORS.secondary,
	},
	message: {
		paddingLeft: 10,
		textAlignVertical: "center",
		fontSize: 17,
		color: COLORS.secondary,
	},
});

/*
  2. Pass the config as prop to the Toast component instance
*/
export default CustomToast;
