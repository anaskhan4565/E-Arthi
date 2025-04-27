import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import Navbar from "../../Navbar/Navbar.jsx";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp.jsx";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import colors from "../../../../../util/Constants/colors.js";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/Constants/FontName.js";
import ScreensName from "../../../../../util/Constants/ScreensName.ts";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import axios from 'axios';
import { storage } from '../../../InitialStartScreens/SignIn.jsx';

function EmunshiLineOfCredit() {
    const { t } = useTranslation();
    const [walletData, setWalletData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWalletData = async () => {
            try {
                // Get token from MMKV storage
                const token = storage.getString('token');
                const userId = storage.getString('userId');

                if (!token) {
                    console.error(t('No token found in storage'));
                    setError(t('Authentication error. Please login again.'));
                    setLoading(false);
                    return;
                }

                if (!userId) {
                    console.error(t('No user ID found in storage'));
                    setError(t('User ID not found. Please login again.'));
                    setLoading(false);
                    return;
                }

                // Make API call with token in header
                const url = 'https://eagri-backend.vercel.app/users/wallet/balance';
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data.status === "success") {
                    setWalletData(response.data.data);
                } else {
                    // Initialize with zeros if response unsuccessful
                    setWalletData({
                        current_balances: { cash_balance: '0', line_of_credit: '0', total_balance: '0' },
                        cash_balance_history: { total_spent: '0', remaining: '0', total_received: '0' },
                        line_of_credit_history: { total_spent: '0', remaining: '0', total_received: '0' }
                    });
                    setError(t("Failed to load wallet data"));
                }

                setLoading(false);
            } catch (err) {
                console.error("Error fetching wallet data:", err);
                // Initialize with zeros if API call fails
                setWalletData({
                    current_balances: { cash_balance: '0', line_of_credit: '0', total_balance: '0' },
                    cash_balance_history: { total_spent: '0', remaining: '0', total_received: '0' },
                    line_of_credit_history: { total_spent: '0', remaining: '0', total_received: '0' }
                });
                setError(t("Failed to load wallet data"));
                setLoading(false);
            }
        };

        fetchWalletData();
    }, []);

    // Format amounts for display
    const formatAmount = (amount) => {
        if (!amount) return "0";
        return parseFloat(amount).toLocaleString();
    };

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); // DD-MM-YYYY format
    };

    // Get current date
    const getCurrentDate = () => {
        return formatDate(new Date().toString());
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.navbarContainer}>
                    <Navbar gobackOnly={true} />
                </View>
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={colors.BLUE} />
                </View>
            </SafeAreaView>
        );
    }

    // Ensure walletData exists with default values if not
    const safeWalletData = walletData || {
        current_balances: { cash_balance: '0', line_of_credit: '0', total_balance: '0' },
        cash_balance_history: { total_spent: '0', remaining: '0', total_received: '0' },
        line_of_credit_history: { total_spent: '0', remaining: '0', total_received: '0' }
    };

    // Safely access nested properties
    const currentBalances = safeWalletData.current_balances || { cash_balance: '0', line_of_credit: '0', total_balance: '0' };
    const cashHistory = safeWalletData.cash_balance_history || { total_spent: '0', remaining: '0', total_received: '0' };
    const locHistory = safeWalletData.line_of_credit_history || { total_spent: '0', remaining: '0', total_received: '0' };

    // Calculate cash spending percentage
    const cashTotalAmount = parseFloat(currentBalances.cash_balance || '0');
    const cashSpent = parseFloat(cashHistory.total_spent || '0');
    const cashRemaining = parseFloat(cashHistory.remaining || '0');
    const cashTotalReceived = parseFloat(cashHistory.total_received || '1'); // Default to 1 to avoid division by zero
    const cashSpentPercentage = cashTotalReceived > 0 ? (cashSpent / cashTotalReceived) * 100 : 0;

    // Calculate line of credit (agri cash) spending percentage
    const locTotalAmount = parseFloat(currentBalances.line_of_credit || '0');
    const locSpent = parseFloat(locHistory.total_spent || '0');
    const locRemaining = parseFloat(locHistory.remaining || '0');
    const locTotalReceived = parseFloat(locHistory.total_received || '1'); // Default to 1 to avoid division by zero
    const locSpentPercentage = locTotalReceived > 0 ? (locSpent / locTotalReceived) * 100 : 0;

    // Total loan amount
    const totalLoanAmount = parseFloat(currentBalances.total_balance || '0');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.searchContainer}>
                    <CustomSearchApp
                        placeholder={t("Search in here")}
                        value=""
                        onChangeText={() => { }}
                    />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{t("Line of Credit")}</Text>
                </View>
                <View style={styles.summaryContainer}>
                    <View style={styles.summaryCard}>
                        <Text style={styles.cardTitle}>Summary of Loan</Text>
                        <Text>Loan taken on: <Text style={styles.boldText}>{getCurrentDate()}</Text></Text>
                        <Text>Loan amount: <Text style={styles.boldText}>{formatAmount(totalLoanAmount)} Rupees</Text></Text>
                        <View style={styles.mainProgressContainer}>
                            <AnimatedCircularProgress
                                size={wp(45)}
                                width={15}
                                fill={100} // Full circle
                                tintColor={colors.GREEN}
                                backgroundColor={colors.LIGHT_GRAY}
                                rotation={0}
                                lineCap="round"
                                children={(fill) => (
                                    <View style={styles.centerTextContainer}>
                                        <Text style={[styles.percentageText, { color: colors.GREEN }]}>100%</Text>
                                        <Text style={styles.labelText}>Complete</Text>
                                    </View>
                                )}
                            />
                            <View style={styles.progressTextContainer}>
                                <View style={styles.progressTextRow}>
                                    <Text style={styles.progressMainText}>
                                        {formatAmount(cashTotalAmount)} Rupees
                                    </Text>
                                    <Text style={styles.progressSubText}>is cash</Text>
                                </View>
                                <View style={styles.progressTextRow}>
                                    <Text style={styles.progressMainText}>
                                        {formatAmount(locTotalAmount)} Rupees
                                    </Text>
                                    <Text style={styles.progressSubText}>is line of credit</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.summaryCard}>
                        <Text style={styles.cardTitle}>Summary of Cash</Text>
                        <View style={styles.progressItem}>
                            <View style={styles.graphRow}>
                                <AnimatedCircularProgress
                                    size={wp(35)}
                                    width={8}
                                    fill={cashSpentPercentage}
                                    tintColor={colors.ORANGE}
                                    backgroundColor={'#FFF0E0'}
                                    lineCap="round"
                                    children={(fill) => (
                                        <View style={styles.centerTextContainer}>
                                            <Text style={[styles.percentageText, { color: colors.ORANGE }]}>{Math.round(cashSpentPercentage)}%</Text>
                                            <Text style={styles.labelText}>Used</Text>
                                        </View>
                                    )}
                                />
                                <View style={styles.sideTextContainer}>
                                    <View style={styles.textRow}>
                                        <Text style={styles.smallProgressText}>
                                            {formatAmount(cashSpent)} Rupees
                                        </Text>
                                        <Text style={styles.smallSubText}>spent</Text>
                                    </View>
                                    <View style={styles.textRow}>
                                        <Text style={styles.smallProgressText}>
                                            {formatAmount(cashRemaining)} Rupees
                                        </Text>
                                        <Text style={styles.smallSubText}>remaining</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.summaryCard}>
                        <Text style={styles.cardTitle}>Summary of Agri Cash</Text>
                        <View style={styles.progressItem}>
                            <View style={styles.graphRow}>
                                <AnimatedCircularProgress
                                    size={wp(35)}
                                    width={8}
                                    fill={locSpentPercentage}
                                    tintColor={colors.PURPLE}
                                    backgroundColor={colors.LIGHT_PURPLE}
                                    lineCap="round"
                                    children={(fill) => (
                                        <View style={styles.centerTextContainer}>
                                            <Text style={[styles.percentageText, { color: colors.PURPLE }]}>{Math.round(locSpentPercentage)}%</Text>
                                            <Text style={styles.labelText}>Used</Text>
                                        </View>
                                    )}
                                />
                                <View style={styles.sideTextContainer}>
                                    <View style={styles.textRow}>
                                        <Text style={styles.smallProgressText}>
                                            {formatAmount(locSpent)} Rupees
                                        </Text>
                                        <Text style={styles.smallSubText}>spent</Text>
                                    </View>
                                    <View style={styles.textRow}>
                                        <Text style={styles.smallProgressText}>
                                            {formatAmount(locRemaining)} Rupees
                                        </Text>
                                        <Text style={styles.smallSubText}>remaining</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    navbarContainer: {
        height: hp("8.2%"),
        backgroundColor: "white",
        marginTop: hp("0.14%"),
    },
    searchContainer: {
        marginTop: hp("3.2%"),
        height: hp("7%"),
        alignSelf: "flex-start",
        marginLeft: hp(1),
    },
    titleContainer: {
        marginHorizontal: hp(1),
    },
    titleText: {
        fontSize: hp(3),
        fontFamily: fonts.SemiBold,
        marginLeft: hp(2),
    },
    summaryContainer: {
        paddingHorizontal: hp(2),
        alignSelf: 'center',
    },
    summaryCard: {
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: 20,
        padding: hp(3),
        marginBottom: hp(2),
        marginVertical: hp(2),
        width: wp(90),
        alignSelf: 'center',
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    cardTitle: {
        fontSize: hp(2.5),
        fontFamily: fonts.SemiBold,
        marginBottom: hp(1),
    },
    boldText: {
        fontFamily: fonts.Bold,
    },
    // New styles for circular progress
    mainProgressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: hp(3),
        paddingHorizontal: wp(2),
    },
    progressTextContainer: {
        flex: 1,
        marginLeft: wp(4),
        justifyContent: 'center',
    },
    progressTextRow: {
        marginBottom: hp(1),
    },
    progressMainText: {
        fontSize: hp(1.6),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
    },
    progressSubText: {
        fontSize: hp(1.4),
        fontFamily: fonts.Regular,
        color: colors.GRAY,
    },
    progressItem: {
        alignItems: 'center',
        marginTop: hp(1),
    },
    graphRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around',
        paddingHorizontal: wp(1),
    },
    sideTextContainer: {
        flex: 1,
        marginLeft: wp(3),
        justifyContent: 'center',
    },
    textRow: {
        marginBottom: hp(0.5),
    },
    smallProgressText: {
        fontSize: hp(1.4),
        fontFamily: fonts.SemiBold,
    },
    smallSubText: {
        fontSize: hp(1.2),
        fontFamily: fonts.Regular,
        color: colors.GRAY,
    },
    centerTextContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: wp(1),
    },
    percentageText: {
        fontSize: hp(3),
        fontFamily: fonts.Bold,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    labelText: {
        fontSize: hp(1.3),
        fontFamily: fonts.Regular,
        color: colors.GRAY,
        textAlign: 'center',
        marginTop: hp(0.2),
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: colors.RED,
        fontSize: hp(2),
        fontFamily: fonts.Bold,
        marginBottom: hp(2),
    },
});

export default EmunshiLineOfCredit;