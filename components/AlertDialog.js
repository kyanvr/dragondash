import React from "react";
import { Button, Alert, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const AlertDialog = ({ title, message, btnText, onOKPress }) => {
	const showAlert = () => {
		Alert.alert(
			title,
			message,
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "OK",
					onPress: () => {
						if (onOKPress) {
							onOKPress();
						}
					},
				},
			],
			{ cancelable: false }
		);
	};

	return (
		<View style={styles.container}>
			<Button title={btnText} onPress={showAlert} />
		</View>
	);
};

AlertDialog.propTypes = {
	title: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	btnText: PropTypes.string.isRequired,
	onOKPress: PropTypes.func,
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	// Customize your dialog styles here
	dialogContainer: {
		backgroundColor: "#F0E6D2", // Light fantasy color
		padding: 20,
		borderRadius: 10,
		width: "80%",
		elevation: 5, // Add shadow for a card-like effect
	},
	dialogTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	dialogMessage: {
		fontSize: 16,
		marginBottom: 20,
	},
});

export default AlertDialog;
