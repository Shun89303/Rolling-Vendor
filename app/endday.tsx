// app/endday.tsx
import { useLocalSearchParams, useRouter } from "expo-router";
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

export default function EndDayScreen() {
	const { preparedQty, soldQty } = useLocalSearchParams();
	const preparedNum = Number(preparedQty);
	const soldNum = Number(soldQty);
	const [leftover, setLeftover] = useState<number>(preparedNum - soldNum);
	const router = useRouter();
	const { saveDayLog } = useDayLog();

	const pricePerMeal = 5000;
	const totalPreparedValue = preparedNum * pricePerMeal;
	const revenue = soldNum * pricePerMeal;
	const wasteValue = leftover * pricePerMeal;

	const handleSave = async () => {
		await saveDayLog({
			preparedQty: preparedNum,
			soldQty: soldNum,
			leftover,
		});
		router.push("/weekly");
	};

	return (
		<SafeAreaView style={styles.safe}>
			<StatusBar barStyle="dark-content" backgroundColor="#fefefe" />
			<View style={styles.container}>
				<Text style={styles.title}>End of Day</Text>

				<Text style={styles.label}>Leftover Meals:</Text>
				<TextInput
					style={styles.input}
					keyboardType="numeric"
					value={String(leftover)}
					onChangeText={(text) => {
						// Allow empty input as 0
						if (text === "") {
							setLeftover(0);
							return;
						}
						const num = parseInt(text, 10);
						if (!isNaN(num) && num >= 0) setLeftover(num);
					}}
				/>

				<Text style={styles.label}>Sold: {soldNum}</Text>
				<Text style={styles.label}>Waste: {leftover}</Text>
				<Text style={styles.label}>
					Total Prepared Value: {totalPreparedValue.toLocaleString()} MMK
				</Text>
				<Text style={styles.label}>
					Sold Value: {revenue.toLocaleString()} MMK
				</Text>
				<Text style={styles.label}>
					Waste Value: {wasteValue.toLocaleString()} MMK
				</Text>

				<TouchableOpacity style={styles.saveButton} onPress={handleSave}>
					<Text style={styles.saveButtonText}>Save & View Weekly</Text>
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
	label: { fontSize: 18, marginVertical: 5, color: "#555" },
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		width: 100,
		height: 50,
		borderRadius: 8,
		textAlign: "center",
		fontSize: 20,
		marginVertical: 15,
		backgroundColor: "#fff",
		color: "#333",
	},
	saveButton: {
		backgroundColor: "#ff9800",
		paddingVertical: 15,
		paddingHorizontal: 40,
		borderRadius: 10,
		marginTop: 20,
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 3,
	},
	saveButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
