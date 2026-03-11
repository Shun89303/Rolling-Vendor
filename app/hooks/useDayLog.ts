import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

// useDayLog.ts
export interface DayLog {
	preparedQty: number;
	soldQty: number;
	leftover: number;

	// financial fields
	preparedValue: number; // total value of prepared items
	soldValue: number; // total money earned from sold items
	wasteValue: number; // total money lost from leftover/wasted items
	netProfit: number; // soldValue - wasteValue
}

export default function useDayLog() {
	const [logs, setLogs] = useState<DayLog[]>([]);

	// Fetch logs from AsyncStorage
	useEffect(() => {
		const fetchLogs = async () => {
			const logsJSON = await AsyncStorage.getItem("logs");
			if (logsJSON) setLogs(JSON.parse(logsJSON));
		};
		fetchLogs();
	}, []);

	// Save a new day log with calculated financial values
	const saveDayLog = async (
		log: Omit<
			DayLog,
			"preparedValue" | "soldValue" | "wasteValue" | "netProfit"
		>
	) => {
		const pricePerMeal = 5000;
		const enrichedLog: DayLog = {
			...log,
			preparedValue: log.preparedQty * pricePerMeal,
			soldValue: log.soldQty * pricePerMeal,
			wasteValue: log.leftover * pricePerMeal,
			netProfit: log.soldQty * pricePerMeal - log.leftover * pricePerMeal,
		};

		const updatedLogs = [...logs, enrichedLog];
		await AsyncStorage.setItem("logs", JSON.stringify(updatedLogs));
		setLogs(updatedLogs);
	};

	const clearAll = async () => {
		try {
			await AsyncStorage.clear();
			setLogs([]);
		} catch (e) {
			console.error("Failed to clear AsyncStorage", e);
		}
	};

	// Averages
	const avgSold = logs.length
		? logs.reduce((a, l) => a + l.soldQty, 0) / logs.length
		: 0;
	const avgWaste = logs.length
		? logs.reduce((a, l) => a + l.leftover, 0) / logs.length
		: 0;

	// Totals in money terms
	const totalPreparedValue = logs.reduce(
		(sum, l) => sum + (l.preparedValue ?? 0),
		0
	);
	const totalSoldValue = logs.reduce((sum, l) => sum + (l.soldValue ?? 0), 0);
	const totalWasteValue = logs.reduce((sum, l) => sum + (l.wasteValue ?? 0), 0);
	const totalNetProfit = logs.reduce((sum, l) => sum + (l.netProfit ?? 0), 0);

	return {
		logs,
		saveDayLog,
		avgSold,
		avgWaste,
		totalPreparedValue,
		totalSoldValue,
		totalWasteValue,
		totalNetProfit,
		clearAll,
	};
}
