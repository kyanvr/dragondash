import React, { useCallback } from "react";
import Navigation from "./components/Navigation";
import { SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

function App() {
	const [fontsLoaded, fontError] = useFonts({
		"DragonHunter": require("./assets/fonts/DragonHunter.otf"),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<SafeAreaView onLayout={onLayoutRootView} style={{ flex: 1 }}>
			<StatusBar style="auto" />
			<Navigation />
		</SafeAreaView>
	);
}

export default App;
