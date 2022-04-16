import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../config/stylesheet/colors";

const InputField = ({
	label,
	defaultValue,
	iconName,
	error,
	onFocus = () => {},
	...props
}) => {
	const [isFocused, setIsFocused] = useState(false);
	return (
		<View style={{ marginTop: 10 }}>
			<View style={{ flexDirection: "row" }}>
				<Text style={styles.label}>
					{label}
					<Text style={styles.highlight}> *</Text>
				</Text>
				{error && (
					<Text style={{ color: COLORS.red1, fontSize: 12, marginStart: 10 }}>
						{error}
					</Text>
				)}
			</View>
			<View
				style={[
					styles.inputContainer,
					{
						borderColor: error
							? COLORS.red1
							: isFocused
							? COLORS.secondary
							: COLORS.lightGrey,
						alignItems: "center",
					},
				]}
			>
				<Icon
					name={iconName}
					style={{ fontSize: 22, color: COLORS.green1, marginRight: 10 }}
				/>
				<TextInput
					autoCorrect={false}
					defaultValue={defaultValue}
					maxLength={label === "Title" ? 11 : 100}
					onFocus={() => {
						onFocus();
						setIsFocused(true);
					}}
					onBlur={() => {
						setIsFocused(false);
					}}
					style={{ color: COLORS.secondary, flex: 1 }}
					{...props}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	label: {
		marginBottom: 5,
		fontSize: 14,
		color: COLORS.secondary,
		fontWeight: "bold",
	},
	highlight: {
		marginBottom: 5,
		fontSize: 14,
		color: COLORS.green1,
		fontWeight: "bold",
	},
	inputContainer: {
		borderRadius: 5,
		height: 55,
		backgroundColor: COLORS.light,
		flexDirection: "row",
		paddingHorizontal: 15,
		borderWidth: 0.5,
		alignItems: "center",
	},
});

export default InputField;
