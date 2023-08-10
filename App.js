import React from "react";
import Navigation from "./components/Navigation";
import { SafeAreaView } from "react-native";

function App() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Navigation />
		</SafeAreaView>
	);
}

export default App;
