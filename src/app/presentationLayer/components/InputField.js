import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Feather } from "@expo/vector-icons";
import COLORS from "../../config/stylesheet/colors";

const InputField = ({
	label,
	defaultValue,
	iconName,
	error,
	editable,
	passwordChange,
	onFocus = () => {},
	...props
}) => {
	const [isMasked, setIsMasked] = useState(true);
	const [isFocused, setIsFocused] = useState(false);
	return (
		<View style={{ marginTop: 10 }}>
			<View style={{ flexDirection: "row" }}>
				<Text style={styles.label}>
					{label}
					<Text style={styles.highlight}> *</Text>
				</Text>
				{error && !passwordChange && (
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
					style={{
						fontSize: 22,
						color: COLORS.green1,
						marginRight: 10,
						paddingHorizontal: 15,
					}}
				/>
				<TextInput
					editable={editable}
					secureTextEntry={isMasked}
					autoCorrect={false}
					defaultValue={defaultValue}
					maxLength={label === "Title" ? 11 : 100}
					onFocus={() => {
						onFocus();
						setIsFocused(true);
					}}
					onChangeText={(text) => {}}
					onBlur={() => {
						setIsFocused(false);
					}}
					style={{ color: COLORS.secondary, flex: 1 }}
					{...props}
				/>
				{passwordChange && (
					<TouchableOpacity
						style={{
							backgroundColor: COLORS.lightGrey,
							height: 55,
							width: 30,
							alignItems: "center",
							justifyContent: "center",
							borderBottomRightRadius: 5,
							borderTopRightRadius: 5,
							borderTopWidth: isFocused ? 0.5 : 0,
							borderBottomWidth: isFocused ? 0.5 : 0,
						}}
						onPress={() => {
							setIsMasked(!isMasked);
						}}
					>
						<Feather
							name={isMasked ? "eye-off" : "eye"}
							style={{
								fontSize: 16,
								color: isMasked ? COLORS.darkGrey : COLORS.green1,
							}}
						/>
					</TouchableOpacity>
				)}
			</View>
			{error && passwordChange && (
				<Text
					style={{
						color: COLORS.red1,
						fontSize: 12,
						marginStart: 10,
						marginTop: 10,
					}}
				>
					{error}
				</Text>
			)}
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
		borderWidth: 0.5,
		alignItems: "center",
	},
});

export default InputField;
