import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { API_URL } from "../constants/categories";

export const useTransactions = (userId) => {

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
                console.log(errorData);
                throw new Error(errorData.error || 'Failed to create transaction');
            }

            Alert.alert("Success", "Transaction created successfully");
        } catch (error) {
            console.error("Error creating transaction: ", error);
            Alert.alert("Error", "Failed to create transaction");
        } finally {
            setLoading(false);
        }
    }

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
        } finally {
            setLoading(false);
        }
    }

    return {
        transactions,
        summary,
        loading,
        loadData,
        createTransaction,
        deleteTransaction,
    };
}