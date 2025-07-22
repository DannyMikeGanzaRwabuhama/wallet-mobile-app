import {View, Text, TouchableOpacity, Alert, TextInput, ActivityIndicator} from 'react-native'
import { useRouter } from 'expo-router'
import { useUser } from '@clerk/clerk-expo';
import { styles } from '../../assets/styles/create.styles';
import { useTransactions } from '../../hooks/useTransactions';
import { COLORS } from '../../constants/colors';
import { CATEGORIES } from '../../constants/categories';
import {useState} from "react";
import {Ionicons} from "@expo/vector-icons";

const CreateScreen = () => {
    const router = useRouter();
    const { user } = useUser();
    // Destructure only createTransaction from useTransactions, as its loading state is now managed locally
    const { createTransaction } = useTransactions(user.id);

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isExpense, setIsExpense] = useState(true);
    // New local loading state for the create operation
    const [isLoading, setIsLoading] = useState(false);

    const handleCreate = async () => {
        if (!title.trim()) {
            Alert.alert("Error", "Please enter a transaction title");
            return;
        }
        if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
            Alert.alert("Error", "Please enter a valid amount");
            return;
        }

        if (!selectedCategory) {
            Alert.alert("Error", "Please select a category");
            return;
        }

        setIsLoading(true); // Start local loading

        try {
            // Format the amount
            const formattedAmount = isExpense
                ? -Math.abs(parseFloat(amount))
                : Math.abs(parseFloat(amount));

            const success = await createTransaction({
                title: title.trim(),
                amount: formattedAmount,
                category: selectedCategory,
            });

            if (success) {
                router.push("/"); // Navigate only on successful creation
            }
        } catch (error) {
            console.error("Error during transaction creation process: ", error);
            // Alert is already handled by useTransactions, so no need for another here
        } finally {
            setIsLoading(false); // End local loading
        }
    }
    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>New Transaction</Text>
                <TouchableOpacity
                    onPress={handleCreate}
                    // Use the new local isLoading state
                    style={[styles.saveButtonContainer, isLoading && styles.saveButtonDisabled]}
                    disabled={isLoading} // Disable button while loading
                >
                    <Text style={styles.saveButton}>{isLoading ? "Saving..." : "Save"}</Text>
                    {!isLoading && <Ionicons name="checkmark" size={20} color={COLORS.primary} />}
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <View style={styles.typeSelector}>
                    {/* EXPENSE SELECTOR */}
                    <TouchableOpacity
                        style={[styles.typeButton, isExpense && styles.typeButtonActive]}
                        onPress={() => setIsExpense(true)}
                    >
                        <Ionicons
                            name="arrow-down-circle"
                            size={22}
                            color={isExpense ? COLORS.white : COLORS.expense}
                            style={styles.typeIcon}
                        />
                        <Text style={[styles.typeButtonText, isExpense && styles.typeButtonTextActive]}>
                            Expense
                        </Text>
                    </TouchableOpacity>

                    {/* INCOME SELECTOR */}
                    <TouchableOpacity
                        style={[styles.typeButton, !isExpense && styles.typeButtonActive]}
                        onPress={() => setIsExpense(false)}
                    >
                        <Ionicons
                            name="arrow-up-circle"
                            size={22}
                            color={!isExpense ? COLORS.white : COLORS.income}
                            style={styles.typeIcon}
                        />
                        <Text style={[styles.typeButtonText, !isExpense && styles.typeButtonTextActive]}>
                            Income
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* AMOUNT CONTAINER */}
                <View style={styles.amountContainer}>
                    <Text style={styles.currencySymbol}>$</Text>
                    <TextInput
                        style={styles.amountInput}
                        placeholder="0.00"
                        placeholderTextColor={COLORS.textLight}
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                        editable={!isLoading} // Disable input while loading
                    />
                </View>

                {/* INPUT CONTAINER */}
                <View style={styles.inputContainer}>
                    <Ionicons
                        name="create-outline"
                        size={22}
                        color={COLORS.textLight}
                        style={styles.inputIcon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Transaction Title"
                        placeholderTextColor={COLORS.textLight}
                        value={title}
                        onChangeText={setTitle}
                        editable={!isLoading} // Disable input while loading
                    />
                </View>

                {/* TITLE */}
                <Text style={styles.sectionTitle}>
                    <Ionicons name="pricetag-outline" size={16} color={COLORS.text} /> Category
                </Text>

                <View style={styles.categoryGrid}>
                    {CATEGORIES.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={[
                                styles.categoryButton,
                                selectedCategory === category.name && styles.categoryButtonActive,
                            ]}
                            onPress={() => setSelectedCategory(category.name)}
                            disabled={isLoading} // Disable category buttons while loading
                        >
                            <Ionicons
                                name={category.icon}
                                size={20}
                                color={selectedCategory === category.name ? COLORS.white : COLORS.text}
                                style={styles.categoryIcon}
                            />
                            <Text
                                style={[
                                    styles.categoryButtonText,
                                    selectedCategory === category.name && styles.categoryButtonTextActive,
                                ]}
                            >
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Use the new local isLoading state for the ActivityIndicator */}
            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size={'large'} color={COLORS.primary} />
                </View>
            )}
        </View>
    )
}

export default CreateScreen;
