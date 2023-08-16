import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
} from "react-native";
import { primaryColor, secondaryColor } from "../constants/colors";
import * as Progress from "react-native-progress";
import CustomModal from "./ui/Modal";
import { setAchievementCompleted, setXp } from "../utils/dataBaseUtils";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import screenWidth from "../constants/screenWidth";

const Achievement = ({
	id,
	achievementTitle,
	description,
	imageSource,
	totalSteps,
	steps,
	xp,
	completed,
}) => {
	const [modalVisible, setModalVisible] = useState(false);

	useEffect(() => {
		if (steps >= totalSteps && completed === 0) {
			setAchievementCompleted(id);
			setXp(id, xp);
		}
	}, [steps, totalSteps, completed, id, xp]);

	const handleOpenModal = () => {
		setModalVisible(true);
	};

	const handleCloseModal = () => {
		setModalVisible(false);
	};

	const progress = steps / totalSteps;

	return (
		<View style={[styles.cardContainer, completed === 1 && styles.completedCard]}>
			<Image
				source={imageSource}
				style={styles.image}
				resizeMode="cover"
			/>
			<View style={{ flex: 1 }}>
				<Text style={styles.achievementTitle}>{achievementTitle}</Text>
				{completed === 1 && (
					<View style={styles.completedContainer}>
						<Text style={styles.completedText}>Completed</Text>
						<Ionicons
							name="checkmark-circle"
							size={24}
							color="#00C871"
						/>
					</View>
				)}
			</View>

			<TouchableOpacity onPress={handleOpenModal}>
				<Text style={styles.button}>Details</Text>
			</TouchableOpacity>

			<CustomModal
				visible={modalVisible}
				onClose={handleCloseModal}
				title={achievementTitle}
			>
				<Image source={imageSource} style={styles.modalImage} />
				<Text style={styles.modalDescription}>{description}</Text>
				{steps <= totalSteps && (
					<Text style={styles.text}>
						{steps} steps of the {totalSteps}
					</Text>
				)}
				<Text style={styles.text}>{xp} XP</Text>

				<Progress.Bar
					progress={progress}
					width={screenWidth * 0.8}
					color={secondaryColor}
				/>
			</CustomModal>
		</View>
	);
};

Achievement.propTypes = {
	id: PropTypes.number.isRequired,
	achievementTitle: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	imageSource: PropTypes.number.isRequired,
	totalSteps: PropTypes.number.isRequired,
	steps: PropTypes.number.isRequired,
	xp: PropTypes.number.isRequired,
	completed: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
	cardContainer: {
		width: "80%",
		marginVertical: 10,
		borderRadius: 5,
		alignSelf: "center",
		backgroundColor: primaryColor,
	},
	image: {
		width: "100%",
		height: 150,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
	},
	achievementTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 10,
		paddingLeft: 10,
		color: "white",
	},
	button: {
		color: secondaryColor,
		marginTop: 5,
		textDecorationLine: "underline",
		alignSelf: "flex-end",
		paddingRight: 10,
		paddingBottom: 10,
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalTitle: {
		fontSize: 24,
		marginBottom: 10,
		fontFamily: "DragonHunter",
	},
	modalDescription: {
		fontSize: 16,
		marginBottom: 20,
		color: "white",
	},
	modalImage: {
		width: "100%",
		height: 200,
		marginBottom: 20,
		resizeMode: "contain",
	},
	completedCard: {
		opacity: 0.5,
	},
	completedContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		marginLeft: 10,
	},
	completedText: {
		color: "#00C871",
		fontSize: 16,
		marginRight: 5,
	},
	text: {
		color: "white",
		fontSize: 16,
		marginBottom: 10,
	},
});

export default Achievement;
