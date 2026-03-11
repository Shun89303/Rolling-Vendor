// app/prep.tsx
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useDayLog from "./hooks/useDayLog";

export default function PrepScreen() {
	const [preparedQty, setPreparedQty] = useState<number>(30);
	const router = useRouter();
	const { logs } = useDayLog();

	return (
		<SafeAreaView style={styles.safe}>
			<StatusBar barStyle="dark-content" backgroundColor="#fefefe" />
			<View style={styles.container}>
				<Text style={styles.title}>Rolling Vendor</Text>
				<Text style={styles.label}>Today&apos;s Prep: Main Meal</Text>
				<Text style={styles.info}>Previous days logged: {logs.length}</Text>

				<View style={styles.counter}>
					{/* Minus Button */}
					<TouchableOpacity
						style={[styles.button, styles.minusButton]}
						onPress={() => setPreparedQty(Math.max(0, preparedQty - 1))}
					>
						<Text style={styles.buttonText}>−</Text>
					</TouchableOpacity>

					{/* Numeric Input */}
					<TextInput
						style={styles.input}
						keyboardType="numeric"
						value={String(preparedQty)}
						onChangeText={(text) => {
							const num = parseInt(text, 10);
							if (!isNaN(num) && num >= 0) setPreparedQty(num);
							else if (text === "") setPreparedQty(0);
						}}
					/>

					{/* Plus Button */}
					<TouchableOpacity
						style={[styles.button, styles.plusButton]}
						onPress={() => setPreparedQty(preparedQty + 1)}
					>
						<Text style={styles.buttonText}>+</Text>
					</TouchableOpacity>
				</View>

				{/* Start Selling Button */}
				<TouchableOpacity
					style={styles.startButton}
					onPress={() =>
						router.push({ pathname: "/sales", params: { preparedQty } })
					}
				>
					<Text style={styles.startButtonText}>Start Selling</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safe: { flex: 1, backgroundColor: "#fefefe" },
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	title: { fontSize: 28, fontWeight: "bold", marginBottom: 10, color: "#333" },
	label: { fontSize: 18, marginBottom: 5, color: "#555" },
	info: { fontSize: 14, marginBottom: 30, color: "#777" },
	counter: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 40,
	},
	button: {
		width: 60,
		height: 60,
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 10,
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 3, // for Android shadow
	},
	minusButton: { backgroundColor: "#bbb" },
	plusButton: { backgroundColor: "#4caf50" },
	buttonText: { fontSize: 28, color: "#fff", fontWeight: "bold" },
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		width: 80,
		height: 60,
		textAlign: "center",
		fontSize: 24,
		borderRadius: 8,
		color: "#333",
		backgroundColor: "#fff",
	},
	startButton: {
		backgroundColor: "#ff9800",
		paddingVertical: 15,
		paddingHorizontal: 40,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 3,
	},
	startButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
