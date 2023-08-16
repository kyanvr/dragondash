import React from "react";
import { Text, StyleSheet } from "react-native";
import { primaryColor, secondaryColor } from "../constants/colors";
import CustomModal from "./ui/Modal";
import PropTypes from "prop-types";

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

StepCountPopup.propTypes = {
	visible: PropTypes.bool.isRequired,
	steps: PropTypes.number.isRequired,
	onClose: PropTypes.func.isRequired,
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
		marginTop: 20,
		color: secondaryColor,
	},
});

export default StepCountPopup;
