import React from "react";
import { View, StyleSheet } from "react-native";
import { primaryColor } from "../constants/colors";
import PropTypes from "prop-types";

const PaginationDots = ({ totalDots, activeIndex }) => {
	return (
		<View style={styles.container}>
			{Array.from({ length: totalDots }, (_, index) => (
				<View
					key={index}
					style={[
						styles.dot,
						index === activeIndex
							? styles.activeDot
							: styles.inactiveDot,
					]}
				/>
			))}
		</View>
	);
};

PaginationDots.propTypes = {
	totalDots: PropTypes.number.isRequired,
	activeIndex: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 40,
		width: "100%",
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "center",
		marginVertical: 10,
	},
	dot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		marginHorizontal: 5,
	},
	activeDot: {
		backgroundColor: primaryColor
	},
	inactiveDot: {
		backgroundColor: "rgba(0, 0, 0, 0.4)",
	},
});

export default PaginationDots;
