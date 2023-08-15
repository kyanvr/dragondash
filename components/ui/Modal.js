import React from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";
import { primaryColor, secondaryColor } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

const CustomModal = ({ visible, onClose, title, children }) => {
	return (
		<Modal transparent visible={visible} animationType="slide">
			<View style={styles.overlay}>
				<View style={styles.modalContainer}>
					<Text style={styles.modalTitle}>{title}</Text>
					<View style={styles.content}>{children}</View>
					<TouchableOpacity onPress={onClose} style={styles.button}>
						<Ionicons
							name="close"
							size={24}
							color={secondaryColor}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

CustomModal.propTypes = {
	visible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
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
		marginTop: 10,
        color: secondaryColor,
	},
	content: {
		marginBottom: 20,
		width: "100%",
		alignItems: "center",
	},
	button: {
		position: "absolute",
		top: 10,
		right: 10,
	},
});

export default CustomModal;
