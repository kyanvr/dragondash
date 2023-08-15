import React, { useCallback, useEffect, useState } from "react";
import Navigation from "./navigation/Navigation";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { initApp } from "./utils/dataBaseUtils";
import * as SplashScreen from "expo-splash-screen";

import useFonts from "./hooks/useFonts";

function App() {
	const [appIsReady, setAppIsReady] = useState(false);

	useEffect(() => {
		async function prepare() {
			try {
				// Pre-load fonts, make any API calls you need to do here
				await useFonts();
				initApp();
			} catch (e) {
				console.warn(e);
			} finally {
				// Tell the application to render
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			// This tells the splash screen to hide immediately! If we call this after
			// `setAppIsReady`, then we may see a blank screen while the app is
			// loading its initial state and rendering its first pixels. So instead,
			// we hide the splash screen once we know the root view has already
			// performed layout.
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	return (
		<SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
			<StatusBar style="auto" />
			<Navigation />
		</SafeAreaView>
	);
}

export default App;
