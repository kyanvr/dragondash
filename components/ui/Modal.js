import React from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";
import { primaryColor, secondaryColor } from "../../constants/colors";

const CustomModal = ({ visible, onClose, title, children }) => {
	return (
		<Modal transparent visible={visible} animationType="slide">
			<View style={styles.overlay}>
				<View style={styles.modalContainer}>
					<Text style={styles.modalTitle}>{title}</Text>
					<View style={styles.content}>{children}</View>
					<Button title="Close" onPress={onClose} />
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContainer: {
		backgroundColor: primaryColor,
		padding: 20,
		borderRadius: 10,
		alignItems: "center",
		elevation: 5,
		width: "80%",
	},
	modalTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
        color: secondaryColor,
	},
	content: {
		marginBottom: 20,
	},
});

export default CustomModal;
