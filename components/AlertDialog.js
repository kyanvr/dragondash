import React from "react";
import { Alert, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import CustomButton from "./ui/Button";

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
			<CustomButton title={btnText} onPress={showAlert} />
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
});

export default AlertDialog;
