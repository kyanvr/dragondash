import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { primaryColor, secondaryColor } from "../constants/colors";
import CustomModal from "./Modal";

const StepCountPopup = ({ visible, steps, onClose }) => {
	return (
		<CustomModal
			visible={visible}
			onClose={onClose}
			title="Congratulations!"
		>
			<Text style={styles.stepCountText}>
				You have taken {steps} steps.
			</Text>
		</CustomModal>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		backgroundColor: primaryColor,
		padding: 20,
		borderRadius: 10,
		alignItems: "center",
	},
	congratsText: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
		color: secondaryColor,
	},
	stepCountText: {
		fontSize: 18,
		marginBottom: 20,
		color: secondaryColor,
	},
});

export default StepCountPopup;
