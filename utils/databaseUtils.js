import * as SQLite from "expo-sqlite";
import { useState } from "react";

const db = SQLite.openDatabase("example.db");

const fetchStepCountData = (callback) => {
	db.transaction((tx) => {
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT * FROM step_count;",
				null,
				(txObj, resultSet) => {
					return callback(resultSet.rows._array);
				}
			);
			(txObj, error) => console.log(error);
		});
	});
};

const clearUserData = () => {
	db.transaction((tx) => {
		tx.executeSql(
			'SELECT name FROM sqlite_master WHERE type="table"',
			[],
			(tx, results) => {
				const tableNames = results.rows._array.map((row) => row.name);
				console.log(tableNames);

				tableNames.forEach((tableName) => {
					tx.executeSql(
						`DELETE FROM ${tableName}`,
						[],
						() => {
							console.log(
								`${tableName} data cleared successfully`
							);
						},
						(error) => {
							console.error(
								`Error clearing ${tableName} data:`,
								error
							);
						}
					);
				});
			}
		);
	});

};

getAllTables = () => {
	db.transaction((tx) => {
		tx.executeSql(
			'SELECT name FROM sqlite_schema WHERE type=table ORDER BY name;',
			[],
			(tx, results) => {
				console.log(results);
			}
		);
	});
};

export { fetchStepCountData, clearUserData };
