import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { primaryColor, secondaryColor } from "../../constants/colors";
import PropTypes from "prop-types";

const CustomButton = ({ title, onPress, style }) => {
	return (
		<TouchableOpacity style={[styles.button, style]} onPress={onPress}>
			<Text style={styles.buttonText}>{title}</Text>
		</TouchableOpacity>
	);
};

CustomButton.propTypes = {
	title: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired,
	style: PropTypes.object,
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: primaryColor,
		padding: 20,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		color: secondaryColor,
		fontSize: 16,
		fontFamily: "DragonHunter",
	},
});

export default CustomButton;
