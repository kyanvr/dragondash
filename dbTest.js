// import { SafeAreaProvider } from "react-native-safe-area-context";
// import Home from "./screens/Home";
import * as SQLite from "expo-sqlite";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

export default function App() {
	const db = SQLite.openDatabase("example.db");
	const [isLoading, setIsLoading] = useState(true);
	const [names, setNames] = useState([]);
	const [currentName, setCurrentName] = useState(undefined);

	useEffect(() => {
		db.transaction((tx) => {
			tx.executeSql(
				"CREATE TABLE IF NOT EXISTS names (id integer primary key AUTOINCREMENT, name TEXT);"
			);
		});

		db.transaction((tx) => {
			tx.executeSql("SELECT * FROM names;", null, (txObj, resultSet) => {
				setNames(resultSet.rows._array);
			});
			(txObj, error) => console.log(error);
		});

		setIsLoading(false);
	}, []);

	if (isLoading) {
		return (
			<View style={styles.container}>
				<Text>Loading...</Text>
			</View>
		);
	}

	const showNames = () => {
		return names.map((name, index) => {
			return (
				<View>
					<Text key={index}>{name.name}</Text>
					<Button
						title="Delete"
						onPress={() => deleteName(name.id)}
					/>
					<Button
						title="Update"
						onPress={() => updateName(name.id, name.name)}
					/>
				</View>
			);
		});
	};

	const addName = () => {
		db.transaction((tx) => {
			tx.executeSql(
				"INSERT INTO names (name) VALUES (?);",
				[currentName],
				(txObj, resultSet) => {
					let existingNames = [...names];
					existingNames.push({
						id: resultSet.insertId,
						name: currentName,
					});
					setNames(existingNames);
					setCurrentName(undefined);
				},
				(txObj, error) => console.log(error)
			);
		});
	};

	const deleteName = (id) => {
		db.transaction((tx) => {
			tx.executeSql(
				"DELETE FROM names WHERE id = ?;",
				[id],
				(txObj, resultSet) => {
					if (resultSet.rowsAffected > 0) {
						let existingNames = [...names];
						existingNames = existingNames.filter(
							(name) => name.id !== id
						);
						setNames(existingNames);
					}
				},
				(txObj, error) => console.log(error)
			);
		});
	};

	const updateName = (id, name) => {
		db.transaction((tx) => {
			tx.executeSql(
				"UPDATE names SET name = ? WHERE id = ?;",
				[currentName, id],
				(txObj, resultSet) => {
					if (resultSet.rowsAffected > 0) {
						let existingNames = [...names];
						const indexToUpdate = existingNames.findIndex(
							(name) => name.id === id
						);
						existingNames[indexToUpdate].name = currentName;
						setNames(existingNames);
						setCurrentName(undefined);
					}
				},
				(txObj, error) => console.log(error)
			);
		});
	};

	return (
		<View style={styles.container}>
			<Text>SQLite Example</Text>
			<TextInput
				value={currentName}
				onChangeText={setCurrentName}
				placeholder="Name"
			/>
			<Button title="Add Name" onPress={addName} />
			{showNames()}
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "stretch",
		justifyContent: "space-between",
		margin: 8,
	},
});
