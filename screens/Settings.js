import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { clearUserData } from "../utils/dataBaseUtils";
import Toast from "../components/ui/Toast";
import CustomButton from "../components/ui/Button";
import { SafeAreaView } from "react-native";
import { ImageBackground } from "react-native";
import backgroundImage from "../assets/background.png";
import { secondaryColor } from "../constants/colors";

const Settings = () => {
	const [userDataCleared, setUserDataCleared] = useState(false);

	const handleClearUserData = () => {
		// Clear the user data
		clearUserData();

		// Once user data is cleared, set the state to indicate it
		setUserDataCleared(true);
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<ImageBackground
				source={backgroundImage}
				style={styles.imageBackground}
			>
				<View
					style={styles.container}
				>
					<Text style={styles.heading}>Settings</Text>
					{userDataCleared && (
						<Text>User data has been cleared.</Text>
					)}
					<CustomButton
						title="Clear User Data"
						onPress={handleClearUserData}
						style={{ width: 200, marginTop: 20 }}
					/>
					<Toast
						message="User Data Cleared"
						isVisible={userDataCleared}
						hideToast={() => setUserDataCleared(false)}
					/>
				</View>
			</ImageBackground>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	heading: {
		fontSize: 32,
		fontFamily: "DragonHunter",
		marginTop: 50,
		color: secondaryColor,
		marginTop: 80,
	},
	safeArea: {
		flex: 1,
	},
	imageBackground: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center",
	},
	container: {
		flex: 1,
		alignItems: "center",
	},
});

export default Settings;
