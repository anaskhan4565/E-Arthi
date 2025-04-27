import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/Constants/FontName";
import Navbar from "../../Navbar/Navbar";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/Constants/colors";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp";
import { useNavigation } from "@react-navigation/native";
import ScreensName from "../../../../../util/Constants/ScreensName";
import Routes from "../../../../../util/Constants/Routes";
import axios from "axios";
import { storage } from "../../../../screens/InitialStartScreens/SignIn.jsx";

function CashFlow() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            setLoading(true);

            // Get token and userId from storage
            const token = storage.getString('token');
            const userId = storage.getString('userId');

            if (!token) {
                console.error('No token found in storage');
                setError('Authentication error. Please login again.');
                setLoading(false);
                return;
            }

            if (!userId) {
                console.error('No user ID found in storage');
                setError('User ID not found. Please login again.');
                setLoading(false);
                return;
            }

            // Make API request with authorization header
            const response = await fetch(`https://eagri-backend.vercel.app/users/${userId}/transactions/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setTransactions(data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching transactions:", err);
            setError("Failed to load transactions. " + (err.message || "Unknown error"));
            setLoading(false);
        }
    };

    // Convert API transaction format to display format
    const formatTransactionForDisplay = (transaction) => {
        const formattedDate = new Date(transaction.transaction_date).toISOString().split('T')[0];
        const items = transaction.items_array || [];

        return {
            id: transaction.id,
            number: transaction.id,
            status: transaction.status === "completed" ? "Complete" : "Active",
            Date: formattedDate,
            Location: transaction.source === "wallet" ? "E-Wallet Transaction" : "Bank Transfer",
            Time: new Date(transaction.transaction_date).toLocaleTimeString().substring(0, 5),
            Items: items.map(item => ({
                name: item.name,
                qty: item.quantity,
                price: item.price
            })),
            Vendor: transaction.transaction_type === "market_purchase" ? "Agri Market" : "Bank Service",
        };
    };

    const filteredTransactions = transactions.filter(transaction => {
        if (!searchQuery) return true;
        const searchLower = searchQuery.toLowerCase();
        return (
            transaction.purpose.toLowerCase().includes(searchLower) ||
            transaction.transaction_type.toLowerCase().includes(searchLower) ||
            transaction.status.toLowerCase().includes(searchLower)
        );
    }).map(formatTransactionForDisplay);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>
            <View style={{ flex: 7 }}>
                <View style={styles.searchbar}>
                    <CustomSearchApp
                        placeholder={"Search in here"}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <View style={styles.HeaderRow}>
                    <Text style={styles.headerText}>{t("Cash Flow")}</Text>
                </View>

                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={colors.BRIGHTGREEN} />
                        <Text style={styles.loadingText}>Loading transactions...</Text>
                    </View>
                ) : error ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity
                            style={styles.retryButton}
                            onPress={fetchTransactions}
                        >
                            <Text style={styles.retryText}>Retry</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.gridContainer}>
                        {filteredTransactions.length > 0 ?
                            filteredTransactions.map((transaction, index) => (
                                <TouchableOpacity
                                    key={transaction.id}
                                    style={styles.rectangle}
                                    onPress={() => {
                                        navigation.navigate(ScreensName.EmunshiTransactionDetail, {
                                            transactiondata: transaction
                                        })
                                    }}
                                >
                                    <View style={styles.RectangleheaderRow}>
                                        <Text style={[styles.transactionText, styles.transactionLabel]}>
                                            Transaction {index + 1}
                                        </Text>
                                        <View style={[styles.statusContainer, { backgroundColor: transaction.status === "Active" ? colors.BRIGHTGREEN : colors.BLUE }]}>
                                            <Text style={[styles.transactionText, styles.statusText]}>
                                                {transaction.status}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={styles.transactionText}>Date: {transaction.Date}</Text>
                                    <Text style={styles.transactionText}>
                                        Items: {transaction.Items.length > 0 ?
                                            transaction.Items.reduce((total, item) => total + item.qty, 0) : 0}
                                    </Text>
                                    <Text style={styles.transactionText}>Vendor: {transaction.Vendor}</Text>
                                    <Text style={styles.transactionText}>
                                        Amount: {transaction.Items.length > 0 ?
                                            transaction.Items.reduce((total, item) => total + (item.qty * item.price), 0) :
                                            parseFloat(transactions.find(t => t.id === transaction.id)?.amount || "0").toFixed(2)
                                        } Rs
                                    </Text>
                                </TouchableOpacity>
                            )) :
                            <Text style={styles.transactionText2}>No transactions found</Text>
                        }
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    navbarContainer: {
        height: hp(8.5),
        backgroundColor: colors.WHITE,
    },
    transactionText2: {
        fontFamily: fonts.Medium,
        fontSize: hp(2.4),
        color: colors.GRAY,
        marginTop: hp(1),
        marginBottom: hp(1),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',

        marginHorizontal: wp(15),
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    searchbar: {
        marginTop: hp(1.3),
        height: hp("7%"),
    },
    HeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: wp(4),
        height: hp(5),
        marginTop: hp(2),
    },
    RectangleheaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    headerText: {
        fontFamily: fonts.SemiBold,
        fontSize: hp(2.4)
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: wp(5),
    },
    rectangle: {
        width: wp(43),
        marginBottom: hp(2),
        padding: wp(2),
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 4,
        backgroundColor: colors.LIGHT_GREEN,
    },
    transactionText: {
        fontFamily: fonts.Regular,
        fontSize: hp(1.4),
    },
    transactionLabel: {
        fontFamily: fonts.SemiBold,
        fontSize: hp(1.4),
    },
    statusText: {
        fontFamily: fonts.Regular,
        fontSize: hp(1.1),
        color: colors.WHITE,
        padding: wp(0.5),
    },
    statusContainer: {
        backgroundColor: colors.BRIGHTGREEN,
        borderRadius: 3,
        paddingHorizontal: wp(1),
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: hp(10),
    },
    loadingText: {
        fontFamily: fonts.Medium,
        fontSize: hp(1.8),
        color: colors.GRAY,
        marginTop: hp(1),
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: hp(10),
    },
    errorText: {
        fontFamily: fonts.Medium,
        fontSize: hp(1.8),
        color: colors.RED,
        marginBottom: hp(1),
        textAlign: 'center',
    },
    retryButton: {
        backgroundColor: colors.BRIGHTGREEN,
        paddingHorizontal: wp(4),
        paddingVertical: hp(1),
        borderRadius: 5,
    },
    retryText: {
        fontFamily: fonts.Medium,
        fontSize: hp(1.6),
        color: colors.WHITE,
    },
});

export default CashFlow;
