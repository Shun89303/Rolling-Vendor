// app/weekly.tsx

import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	FlatList,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useDayLog from "./hooks/useDayLog";

export default function WeeklyScreen() {
	const router = useRouter();
	const {
		logs,
		avgSold,
		avgWaste,
		clearAll,
		totalPreparedValue,
		totalSoldValue,
		totalWasteValue,
		totalNetProfit,
	} = useDayLog();

	const [showTotals, setShowTotals] = useState(false);

	return (
		<SafeAreaView style={styles.safe}>
			<StatusBar barStyle="dark-content" backgroundColor="#fefefe" />
			<View style={styles.container}>
				<Text style={styles.title}>Weekly Summary</Text>

				<FlatList
					data={logs}
					keyExtractor={(_, i) => String(i)}
					renderItem={({ item, index }) => (
						<View style={styles.card}>
							<Text style={styles.cardText}>Day {index + 1}:</Text>
							<Text style={styles.cardText}>
								Prepared: {item.preparedQty} (
								{(item.preparedValue ?? 0).toLocaleString()} MMK)
							</Text>
							<Text style={styles.cardText}>
								Sold: {item.soldQty} ({(item.soldValue ?? 0).toLocaleString()}{" "}
								MMK)
							</Text>
							<Text style={styles.cardText}>
								Waste: {item.leftover} (
								{(item.wasteValue ?? 0).toLocaleString()} MMK)
							</Text>
							<Text style={[styles.cardText, styles.netProfit]}>
								Net Profit: {(item.netProfit ?? 0).toLocaleString()} MMK
							</Text>
						</View>
					)}
					contentContainerStyle={{ paddingBottom: 20 }}
				/>

				<View style={styles.averages}>
					<Text style={styles.avgText}>Avg Sold: {avgSold.toFixed(1)}</Text>
					<Text style={styles.avgText}>Avg Waste: {avgWaste.toFixed(1)}</Text>

					<TouchableOpacity
						style={styles.totalsToggle}
						onPress={() => setShowTotals(!showTotals)}
					>
						<Text style={styles.totalsToggleText}>
							{showTotals ? "Hide Totals ▲" : "View Totals ▼"}
						</Text>
					</TouchableOpacity>

					{showTotals && (
						<View style={styles.totalsCard}>
							<Text style={styles.totalsTitle}>Totals</Text>

							<Text style={styles.totalsText}>
								Total Prepared Value: {totalPreparedValue.toLocaleString()} MMK
							</Text>

							<Text style={styles.totalsText}>
								Total Sold Value: {totalSoldValue.toLocaleString()} MMK
							</Text>

							<Text style={styles.totalsText}>
								Total Waste Value: {totalWasteValue.toLocaleString()} MMK
							</Text>

							<Text style={[styles.totalsText, styles.netProfit]}>
								Total Net Profit: {totalNetProfit.toLocaleString()} MMK
							</Text>
						</View>
					)}
				</View>

				<View style={styles.buttonsContainer}>
					<TouchableOpacity
						style={[styles.button, styles.newDayButton]}
						onPress={() => router.push("/")}
					>
						<Text style={styles.buttonText}>Start New Day</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.button, styles.clearButton]}
						onPress={clearAll}
					>
						<Text style={styles.buttonText}>Clear All Storage</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safe: { flex: 1, backgroundColor: "#fefefe" },
	container: { flex: 1, padding: 20 },
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#333",
		textAlign: "center",
	},
	card: {
		backgroundColor: "#fff",
		padding: 15,
		borderRadius: 10,
		marginBottom: 10,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 2,
	},
	cardText: { fontSize: 16, color: "#555" },
	averages: { marginTop: 10, marginBottom: 20 },
	avgText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#333",
		textAlign: "center",
	},
	buttonsContainer: { flexDirection: "row", justifyContent: "space-between" },
	button: {
		flex: 1,
		paddingVertical: 15,
		borderRadius: 10,
		marginHorizontal: 5,
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 3,
		alignItems: "center",
	},
	newDayButton: { backgroundColor: "#4caf50" },
	clearButton: { backgroundColor: "#f44336" },
	buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
	totalsCard: {
		backgroundColor: "#ffe082", // soft yellow for emphasis
		padding: 15,
		borderRadius: 10,
		marginVertical: 10,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 2,
		alignItems: "center",
	},
	totalsTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 10,
	},
	totalsText: {
		fontSize: 16,
		fontWeight: "600",
		color: "#444",
		marginVertical: 2,
	},
	netProfit: {
		fontSize: 18,
		fontWeight: "bold",
	},
	totalsToggle: {
		backgroundColor: "#2196f3",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 8,
		alignSelf: "center",
		marginTop: 10,
	},

	totalsToggleText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
});
