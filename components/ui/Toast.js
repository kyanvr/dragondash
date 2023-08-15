import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Animated } from "react-native";
import PropTypes from "prop-types";

const Toast = ({ message, isVisible, hideToast }) => {
	const [fadeAnim] = useState(new Animated.Value(0));

	useEffect(() => {
		if (isVisible) {
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}).start();

			const timer = setTimeout(() => {
				hideToast();
			}, 2000);

			return () => clearTimeout(timer);
		} else {
			fadeAnim.setValue(0);
		}
	}, [isVisible]);

	return (
		<Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
			<Text style={styles.toastText}>{message}</Text>
		</Animated.View>
	);
};

Toast.propTypes = {
	message: PropTypes.string.isRequired,
	isVisible: PropTypes.bool.isRequired,
	hideToast: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
	toastContainer: {
		position: "absolute",
		bottom: 20,
		left: 20,
		right: 20,
		backgroundColor: "#333",
		borderRadius: 8,
		padding: 10,
	},
	toastText: {
		color: "#fff",
		textAlign: "center",
	},
});

export default Toast;
