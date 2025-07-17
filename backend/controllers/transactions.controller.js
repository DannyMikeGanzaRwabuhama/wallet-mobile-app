import {sql} from "../config/db.js";

export async function getTransactionsByUserId(req, res) {
    try {
        const {userId} = req.params;

        const transactions = await sql`
            SELECT *
            FROM transactions
            WHERE user_id = ${userId}
            ORDER BY created_at DESC`;

        // Check if transactions exist
        if (transactions.length === 0) {
            return res.status(404).json({error: "No transactions found for this user"});
        } else {
            res.status(200).json(transactions);

        }
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

export async function createTransaction(req, res) {
    try {
        const {title, amount, category, user_id} = req.body;

        if (!title || amount === undefined || !category || !user_id) {
            return res.status(400).json({error: "All fields are required"});
        }

        const transaction = await sql`
            INSERT INTO transactions (title, amount, category, user_id)
            VALUES (${title}, ${amount}, ${category}, ${user_id}) RETURNING *`;
        res.status(201).json(transaction);
    } catch (error) {
        console.error("Error creating transaction:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

export async function deleteTransaction(req, res) {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({error: "Transaction ID is required"});
        }

        if (isNaN(id)) {
            return res.status(400).json({error: "Transaction ID must be a number"});
        }

        const result = await sql`
            DELETE
            FROM transactions
            WHERE id = ${id} RETURNING *`;

        if (result.length === 0) {
            return res.status(404).json({error: "Transaction not found"});
        } else {
            res.status(200).json({message: "Transaction deleted successfully", transaction: result[0]});
        }
    } catch (error) {
        console.error("Error deleting transaction:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

export async function getSummaryByUserId(req, res) {
    try {
        const {userId} = req.params;

        const balanceResult = await sql`
            SELECT COALESCE(SUM(amount), 0) AS balance
            FROM transactions
            WHERE user_id = ${userId}`;

        const incomeResult = await sql`
            SELECT COALESCE(SUM(amount), 0) AS income
            FROM transactions
            WHERE user_id = ${userId}
              AND amount > 0`;

        const expenseResult = await sql`
            SELECT COALESCE(SUM(amount), 0) AS expense
            FROM transactions
            WHERE user_id = ${userId}
              AND amount < 0`;

        const summary = {
            balance: balanceResult[0].balance,
            income: incomeResult[0].income,
            expense: expenseResult[0].expense
        }

        res.status(200).json(summary);
    } catch (error) {
        console.error("Error fetching summary:", error);
        res.status(500).json({error: "Internal server error"});
    }
}