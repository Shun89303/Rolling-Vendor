// app/sales.tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useDayLog from "./hooks/useDayLog";

export default function SalesScreen() {
	const { preparedQty } = useLocalSearchParams();
	const preparedNum = Number(preparedQty);
	const [soldQty, setSoldQty] = useState<number>(0);
	const router = useRouter();
	const { logs } = useDayLog();

	const remaining = preparedNum - soldQty;

	return (
		<SafeAreaView style={styles.safe}>
			<StatusBar barStyle="dark-content" backgroundColor="#fefefe" />
			<View style={styles.container}>
				<Text style={styles.title}>Rolling Vendor</Text>

				<Text style={styles.counterText}>
					Sold: {soldQty} / Prepared: {preparedNum} / Remaining: {remaining}
				</Text>
				<Text style={styles.info}>Past days logged: {logs.length}</Text>

				<View style={styles.buttonsContainer}>
					{/* Undo sale */}
					<TouchableOpacity
						style={[styles.button, styles.minusButton]}
						onPress={() => {
							if (soldQty > 0) setSoldQty(soldQty - 1);
						}}
					>
						<Text style={styles.buttonText}>−</Text>
					</TouchableOpacity>

					{/* Sell meal */}
					<TouchableOpacity
						style={[styles.button, styles.plusButton]}
						onPress={() => {
							if (soldQty < preparedNum) setSoldQty(soldQty + 1);
						}}
					>
						<Text style={styles.buttonText}>+</Text>
					</TouchableOpacity>
				</View>

				{/* End Day */}
				<TouchableOpacity
					style={styles.endDayButton}
					onPress={() =>
						router.push({
							pathname: "/endday",
							params: { preparedQty: preparedNum, soldQty },
						})
					}
				>
					<Text style={styles.endDayButtonText}>End Day</Text>
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
		padding: 20,
	},
	title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#333" },
	counterText: {
		fontSize: 18,
		marginBottom: 10,
		color: "#555",
		textAlign: "center",
	},
	info: { fontSize: 14, marginBottom: 20, color: "#777" },
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: 180,
		marginVertical: 20,
	},
	button: {
		width: 70,
		height: 70,
		borderRadius: 35,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 3,
	},
	minusButton: { backgroundColor: "#bbb" },
	plusButton: { backgroundColor: "#4caf50" },
	buttonText: { fontSize: 32, color: "#fff", fontWeight: "bold" },
	endDayButton: {
		backgroundColor: "#ff9800",
		paddingVertical: 15,
		paddingHorizontal: 50,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 3,
		marginTop: 20,
	},
	endDayButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
