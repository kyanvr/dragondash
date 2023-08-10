import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import { clearUserData, getAllTables } from "../utils/databaseUtils";
import Toast from "../components/ui/Toast";

const Settings = () => {
	const [userDataCleared, setUserDataCleared] = useState(false);

	const handleClearUserData = () => {
		// Clear the user data
		clearUserData();

		// Once user data is cleared, set the state to indicate it
		setUserDataCleared(true);
	};

	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<Text style={{ fontSize: 20, fontFamily: "DragonHunter" }}>Settings</Text>
			{userDataCleared && <Text>User data has been cleared.</Text>}
			<Button title="Clear User Data" onPress={handleClearUserData} />
            <Button title="Get All Tables" onPress={getAllTables} />

			{/* Show the CustomToast component */}
			<Toast
				message="User Data Cleared"
				isVisible={userDataCleared}
				hideToast={() => setUserDataCleared(false)}
			/>
		</View>
	);
};

export default Settings;
