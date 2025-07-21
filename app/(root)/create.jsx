import { View, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { useUser } from '@clerk/clerk-expo';
import { styles } from '../../assets/styles/create.styles';
import { useTransactions } from '../../hooks/useTransactions';
import { COLORS } from '../../constants/colors';
import { CATEGORIES } from '../../constants/categories';
import { ActivityIndicator } from 'react-native-web';

const CreateScreen = () => {
    const router = useRouter();
    const { user } = useUser();
    const { createTransaction, loading } = useTransactions(user.id);

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isExpense, setIsExpense] = useState(false);

    const handleCreate = async () => {
        if (!title.trim()) return Alert.alert("Error", "Please enter a transaction title");
        if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
            Alert.alert("Error", "Please enter a valid amount");
            return;
        }

        if (!selectedCategory) return Alert.alert("Error", "Please select a category");

        // Format the amount 
        const formattedAmount = isExpense
            ? -Math.abs(parseFloat(amount))
            : Math.abs(parseFloat(amount));

        await createTransaction({
            title: title.trim(),
            amount: formattedAmount,
            category: selectedCategory,
        })

        router.push("/");
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
                    style={[styles.saveButtonContainer, loading && styles.saveButtonDisabled]}
                    disabled={loading}
                >
                    <Text style={styles.saveButton}>{loading ? "Saving..." : "Save"}</Text>
                    {!loading && <Ionicons name="checkmark" size={20} color={COLORS.primary} />}
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

            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size={'large'} color={COLORS.primary} />
                </View>
            )}
        </View>
    )
}

export default CreateScreen;