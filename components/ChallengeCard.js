import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Button,
	Image,
	StyleSheet,
} from "react-native";
import { primaryColor, secondaryColor } from "../constants/colors";
import ProgressBar from "react-native-progress/Bar";
import CustomModal from "./ui/Modal";

const ChallengeCard = ({ challengeTitle, description, imageSource, totalSteps, completedSteps }) => {
	const [modalVisible, setModalVisible] = useState(false);

	const handleOpenModal = () => {
		setModalVisible(true);
	};

	const handleCloseModal = () => {
		setModalVisible(false);
	};

	const handleStartChallenge = () => {
		// Add your logic to start the challenge here
	};

    const progress = completedSteps / totalSteps;

	return (
		<View style={styles.cardContainer}>
			<Image
				source={imageSource}
				style={styles.image}
				resizeMode="cover"
			/>
			<Text style={styles.challengeTitle}>{challengeTitle}</Text>
			<ProgressBar progress={progress} width={null} color="#00C871" />
			<TouchableOpacity onPress={handleOpenModal}>
				<Text style={styles.button}>Details</Text>
			</TouchableOpacity>

			<CustomModal
				visible={modalVisible}
				onClose={handleCloseModal}
				title={challengeTitle}
			>
				<Text style={styles.modalDescription}>{description}</Text>
				<Button
					title="Start Challenge"
					onPress={handleStartChallenge}
				/>
			</CustomModal>
		</View>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		width: "80%",
		marginVertical: 10,
		borderRadius: 5,
		alignSelf: "center",
        backgroundColor: primaryColor
	},
	image: {
		width: "100%",
		height: 150, // Set the desired height for the image
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
	},
	challengeTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 10,
        paddingLeft: 10,
	},
	button: {
		color: secondaryColor,
		marginTop: 5,
        textDecorationLine: "underline",
        alignSelf: "flex-end",
        paddingRight: 10,
        paddingBottom: 10
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	modalDescription: {
		fontSize: 16,
		marginBottom: 20,
	},
});

export default ChallengeCard;
