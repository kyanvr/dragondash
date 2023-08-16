import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { secondaryColor } from "../../constants/colors";

const CustomTooltip = ({ text, iconName }) => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleTooltip = () => {
		setIsVisible(!isVisible);
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={toggleTooltip}>
				<Ionicons name={isVisible ? iconName : `${iconName}-outline`} size={24} color={secondaryColor} />
			</TouchableOpacity>

			{isVisible && (
				<View style={styles.tooltip}>
					<Text style={styles.tooltipText}>{text}</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
        position: "relative",
		alignItems: "center",
		justifyContent: "center",
        zIndex: 1,
	},
	tooltip: {
		position: "absolute",
		backgroundColor: "rgba(0, 0, 0, 0.8)",
		padding: 8,
		borderRadius: 4,
		top: 30, // Adjust this value as needed
		left: 0, // Adjust this value as needed
        width: 300,
	},
	tooltipText: {
		color: "white",
		fontSize: 14,
	},
});

export default CustomTooltip;
