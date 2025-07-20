import {useCallback, useState} from "react";
import {Alert} from "react-native";

export const useTransactions = (userId) => {
    const API_URL = "https://wallet-mobile-app.onrender.com/api"
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState({
        balance: 0,
        income: 0,
        expense: 0,
    });
    const [loading, setLoading] = useState(true);

    const fetchTransactions = useCallback(
        async () => {
            try {
                const response = await fetch(`${API_URL}/transactions/${userId}`);
                const data = await response.json();
                setTransactions(data);
            } catch (e) {
                console.error("Error fetching transactions: ", e);
            } finally {
                setLoading(false);
            }
        },
        [userId],
    );

    const fetchSummary = useCallback(
        async () => {
            try {
                const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
                const data = await response.json();
                setSummary(data);
            } catch (e) {
                console.error("Error fetching summary: ", e);
            } finally {
                setLoading(false);
            }
        },
        [userId],
    );

    const loadData = useCallback(
        async () => {
            try {
                await Promise.all([fetchTransactions(), fetchSummary()]);
            } catch (e) {
                console.error("Error loading data: ", e);
            } finally {
                setLoading(false);
            }
        },
        [fetchTransactions, fetchSummary, userId],
    );

    const deleteTransaction = async (id) => {
        try {
            const response = await fetch(`${API_URL}/transactions/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete transaction');
            }

            await loadData();
            Alert.alert("Success", "Transaction deleted successfully");
        } catch (e) {
            console.error("Error deleting data: ", e);
            Alert.alert("Error", "Failed to delete transaction");
        }
    }

    return {
        transactions,
        summary,
        loading,
        loadData,
        deleteTransaction,
    };
}