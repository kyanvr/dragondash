import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Home from "../screens/Home";
import Achievements from "../screens/Achievements";
import { NavigationContainer } from "@react-navigation/native";
import Statistics from "../screens/Statistics";
import { primaryColor, black } from "../constants/colors";
import Settings from "../screens/Settings";

const Tab = createBottomTabNavigator();

const Navigation = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="Start"
				screenOptions={({ route }) => ({
					tabBarShowLabel: false,
					tabBarStyle: { backgroundColor: black, borderTopColor: black },
					headerShown: false, // Hide the header for all screens
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;

						if (route.name === "Home") {
							iconName = focused
								? "running"
								: "running";
						} else if (route.name === "Achievements") {
							iconName = focused
								? "trophy"
								: "trophy";
						} else if (route.name === "Statistics") {
							iconName = focused
								? "stats-chart"
								: "stats-chart";
						} else if (route.name === "Settings") {
							iconName = focused
								? "settings-sharp"
								: "settings-sharp";
						}

						if (route.name === "Home") {
							return (
								<FontAwesome5
									name={iconName}
									size={size}
									color={color}
								/>
							);
						}

						return (
							<Ionicons
								name={iconName}
								size={size}
								color={color}
							/>
						);
					},
					tabBarActiveTintColor: primaryColor,
					tabBarInactiveTintColor: "gray",
				})}
			>
				<Tab.Screen name="Home" component={Home} />
				<Tab.Screen name="Achievements" component={Achievements} />
				<Tab.Screen name="Statistics" component={Statistics} />
				<Tab.Screen name="Settings" component={Settings} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default Navigation;
