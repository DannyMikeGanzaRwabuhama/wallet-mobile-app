import { useCallback, useState } from "react";
import { Alert } from "react-native";

export const useTransactions = (userId) => {

    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState({
        balance: 0,
        income: 0,
        expense: 0,
    });
    // This 'loading' state now primarily reflects the loading of transactions and summary data.
    const [loading, setLoading] = useState(true);

    const fetchTransactions = useCallback(
        async () => {
            setLoading(true); // Start loading for data fetch
            try {
                const response = await fetch(`${API_URL}/transactions/${userId}`);
                const data = await response.json();
                setTransactions(data);
            } catch (e) {
                console.error("Error fetching transactions: ", e);
            } finally {
                setLoading(false); // End loading for data fetch
            }
        },
        [userId, API_URL],
    );

    const fetchSummary = useCallback(
        async () => {
            setLoading(true); // Start loading for data fetch
            try {
                const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
                const data = await response.json();
                setSummary(data);
            } catch (e) {
                console.error("Error fetching summary: ", e);
            } finally {
                setLoading(false); // End loading for data fetch
            }
        },
        [userId, API_URL],
    );

    const loadData = useCallback(
        async () => {
            setLoading(true); // Start loading for overall data load
            try {
                await Promise.all([fetchTransactions(), fetchSummary()]);
            } catch (e) {
                console.error("Error loading data: ", e);
            } finally {
                setLoading(false); // End loading for overall data load
            }
        },
        [fetchTransactions, fetchSummary],
    );

    const createTransaction = async ({ title, amount, category }) => {
        try {
            const response = await fetch(`${API_URL}/transactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    title,
                    amount,
                    category,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("API Error creating transaction: ", errorData); // Use console.error for clarity
                Alert.alert("Error", errorData.error || 'Failed to create transaction'); // Show specific error if available
                return false; // Indicate failure
            }

            Alert.alert("Success", "Transaction created successfully");
            return true; // Indicate success
        } catch (error) {
            console.error("Network or unexpected error creating transaction: ", error); // Differentiate error types
            Alert.alert("Error", "Failed to create transaction due to a network issue or unexpected error.");
            return false; // Indicate failure
        }
    }

    const deleteTransaction = async (id) => {
        try {
            const response = await fetch(`${API_URL}/transactions/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                // If response is not ok, it's an API error, no need to throw
                console.error("API Error deleting transaction: ", response.status, response.statusText);
                Alert.alert("Error", 'Failed to delete transaction');
                return false; // Indicate failure
            }

            await loadData(); // Reload data after deletion
            Alert.alert("Success", "Transaction deleted successfully");
            return true; // Indicate success
        } catch (e) {
            console.error("Network or unexpected error deleting transaction: ", e);
            Alert.alert("Error", "Failed to delete transaction due to a network issue or unexpected error.");
            return false; // Indicate failure
        }
    }

    return {
        transactions,
        summary,
        loading, // This 'loading' is for overall data fetch
        loadData,
        createTransaction,
        deleteTransaction,
    };
}
