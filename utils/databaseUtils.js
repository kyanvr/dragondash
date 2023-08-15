import * as SQLite from "expo-sqlite";
import formatDateToString from "./formatDateToString";
import { achievements } from "../constants/achievements";

const db = SQLite.openDatabase("example.db");

const initApp = () => {
	try {
		db.transaction((tx) => {
			tx.executeSql(
				"CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, xp INTEGER, level INTEGER, total_steps INTEGER);",
			);
		});

		db.transaction((tx) => {
			tx.executeSql(
				"INSERT INTO user (id, xp, level, total_steps) VALUES (?, ?, ?, ?);",
				[1, 0, 1, 0],
			);
		});

		db.transaction((tx) => {
			tx.executeSql(
				"CREATE TABLE IF NOT EXISTS step_count (steps NUMBER, date DATETIME);",
			);
		});

		db.transaction((tx) => {
			tx.executeSql(
				"CREATE TABLE IF NOT EXISTS achievement (id INTEGER PRIMARY KEY AUTOINCREMENT, total_steps INTEGER, description TEXT, title TEXT, xp INTEGER, completed INTEGER, imagePath TEXT);",
			);
		});

		// loop over every achievement and insert it into the database
		achievements.forEach((achievement) => {
			db.transaction((tx) => {
				tx.executeSql(
					"INSERT or REPLACE INTO achievement (id, total_steps, description, title, xp, completed, imagePath) VALUES (?, ?, ?, ?, ?, ?, ?);",
					[
						achievement.id,
						achievement.totalSteps,
						achievement.description,
						achievement.title,
						achievement.xp,
						0,
						achievement.imagePath,
					],
				);
			});
		});

		db.transaction((tx) => {
			tx.executeSql(
				"CREATE TABLE IF NOT EXISTS initialization_status (status INTEGER);",
			);
		});

		console.log("Database initialized successfully");
	} catch (error) {
		console.error("Error initializing app:", error);
	}
};

const setInitStatus = () => {
	db.transaction((tx) => {
		tx.executeSql(
			"INSERT INTO initialization_status (status) VALUES (?);",
			[1],
		);
	});
};

const fetchStepCountData = () => {
	db.transaction((tx) => {
		tx.executeSql(
			"SELECT * FROM step_count;",
			[],
		);
	});
};

const saveStepCountToDatabase = (steps, date) => {
	db.transaction((tx) => {
		tx.executeSql(
			"INSERT INTO step_count (steps, date) VALUES (?, ?);",
			[steps, formatDateToString(date)],
		);
	});

	addStepCountToUser(steps);
};

const addStepCountToUser = (steps) => {
	db.transaction((tx) => {
		tx.executeSql(
			"UPDATE user SET total_steps = total_steps + ? WHERE id = 1;",
			[steps],
		);
	});
};

const clearUserData = () => {
	db.transaction((tx) => {
		tx.executeSql("DROP TABLE IF EXISTS user;");
		console.log("User table cleared");
		tx.executeSql("DROP TABLE IF EXISTS step_count;");
		console.log("Step count table cleared");
		tx.executeSql("DROP TABLE IF EXISTS achievement;");
		console.log("Achievement table cleared");
		tx.executeSql("DROP TABLE IF EXISTS initialization_status;");
		console.log("Initialization status table cleared");
	});
};

const checkIfAlreadyInitialized = () => {
	return new Promise((resolve) => {
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT * FROM initialization_status WHERE status = ?;",
				[1],
				(_, resultSet) => {
					if (resultSet.rows.length > 0) {
						resolve(true);
					} else {
						resolve(false);
					}
				},
				(_, error) => {
					console.error("Database error:", error);
					resolve(false);
				}
			);
		});
	});
};

const fetchUserData = () => {
	return new Promise((resolve) => {
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT * FROM user;",
				[],
				(_, resultSet) => {
					resolve(resultSet.rows._array);
				},
				(_, error) => {
					console.error("Database error:", error);
					resolve([]);
				}
			);
		});
	});
};

const getTotalStepsFromUser = () => {
	return new Promise((resolve) => {
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT total_steps FROM user WHERE id = 1;",
				[],
				(_, resultSet) => {
					resolve(resultSet.rows._array[0].total_steps);
				},
				(_, error) => {
					console.error("Database error:", error);
					resolve(0);
				}
			);
		});
	});
};

const setAchievementCompleted = (achievementId) => {
	db.transaction((tx) => {
		tx.executeSql("UPDATE achievement SET completed = 1 WHERE id = ?;", [
			achievementId,
		]);
	});
};

const setLevel = (level) => {
	db.transaction((tx) => {
		tx.executeSql("UPDATE user SET level = ? WHERE id = 1;", [level]);
	});
};

const setXp = (achievementId, xp) => {
	db.transaction((tx) => {
		tx.executeSql(
			"SELECT * FROM achievement WHERE id = ?;",
			[achievementId],
			(_, resultSet) => {
				if (resultSet.rows._array[0].completed === 1) {
					db.transaction((tx) => {
						tx.executeSql(
							"UPDATE user SET xp = xp + ? WHERE id = 1;",
							[xp],
						);
					});
				}
			}
		);
	});
};

export {
	fetchStepCountData,
	clearUserData,
	saveStepCountToDatabase,
	checkIfAlreadyInitialized,
	initApp,
	setInitStatus,
	addStepCountToUser,
	fetchUserData,
	getTotalStepsFromUser,
	setAchievementCompleted,
	setLevel,
	setXp,
};
