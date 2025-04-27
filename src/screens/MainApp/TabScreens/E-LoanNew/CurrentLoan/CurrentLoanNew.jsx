import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import Navbar from '../../../Navbar/Navbar';
import CustomSearchApp from '../../../CustomComponent/CustomSearchApp';
import colors from '../../../../../../util/Constants/colors';
import { fonts } from '../../../../../../util/Constants/FontName';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Routes from '../../../../../../util/Constants/Routes';
import axios from 'axios';
import { storage } from '../../../../../screens/InitialStartScreens/SignIn.jsx';

const CurrentLoanNew = () => {
    const { t } = useTranslation();
    const [walletData, setWalletData] = useState(null);
    const [loanData, setLoanData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get token from MMKV storage
                const token = storage.getString('token');
                const userId = storage.getString('userId');
                console.log(token, userId);

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

                // Fetch wallet data
                const walletUrl = 'https://eagri-backend.vercel.app/users/wallet/balance';
                const walletResponse = await axios.get(walletUrl, {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                console.log(walletResponse.data);

                if (walletResponse.data.status === "success") {
                    setWalletData(walletResponse.data.data);
                } else {
                    console.error("API returned error status for wallet data");
                    setError(t("Failed to load wallet data"));
                }

                // Fetch loan data
                const loanUrl = `https://eagri-backend.vercel.app/e_loan/get_loan/user/${userId}/`;
                const loanResponse = await axios.get(loanUrl, {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                console.log(loanResponse.data);

                if (loanResponse.data && loanResponse.data.length > 0) {
                    // Filter loans with approved status
                    const approvedLoans = loanResponse.data.filter(loan => loan.status === "approved");

                    if (approvedLoans.length > 0) {
                        // If multiple approved loans exist, select the one with the largest amount
                        if (approvedLoans.length > 1) {
                            // Sort approved loans by approved_amount in descending order
                            approvedLoans.sort((a, b) => parseFloat(b.approved_amount) - parseFloat(a.approved_amount));
                        }
                        setLoanData(approvedLoans[0]);
                    } else {
                        // If no approved loans, use the first loan in the original response
                        setLoanData(loanResponse.data[0]);
                    }
                } else {
                    console.error("No loan data available or empty response");
                }

                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(t("Failed to load data"));
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); // DD-MM-YYYY format
    };

    // Format amount for display
    const formatAmount = (amount) => {
        if (!amount) return "0";
        return parseFloat(amount).toLocaleString();
    };

    // Calculate the cash and line of credit split (30% cash, 70% line of credit)
    const calculateLoanSplit = (totalAmount) => {
        const cashAmount = Math.round(totalAmount * 0.3); // 30% cash
        const lineOfCreditAmount = totalAmount - cashAmount; // 70% line of credit

        return {
            cashAmount,
            lineOfCreditAmount,
            cashPercentage: 30,
            lineOfCreditPercentage: 70
        };
    };

    // Calculate spending with random values
    const calculateSpending = (amount) => {
        // Random spending percentage between 40% and 85%
        const spendingPercentage = Math.floor(Math.random() * (85 - 40 + 1)) + 40;
        const spent = Math.round(amount * (spendingPercentage / 100));
        const remaining = amount - spent;

        return {
            spent,
            remaining,
            percentage: spendingPercentage
        };
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>

            <View style={styles.searchBarContainer}>
                <CustomSearchApp placeholder={t("Search in here")} />
            </View>

            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>{t("Current Loan")}</Text>

                {loading ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color={colors.BLUE} />
                    </View>
                ) : (
                    <>
                        {error && (
                            <View style={styles.errorIndicator}>

                            </View>
                        )}
                        <View style={styles.summaryContainer}>
                            <Text style={styles.sectionTitle}>{t("Loan Summary")}</Text>
                            <Text style={styles.summaryText}>{t("Loan taken on")}: {formatDate(loanData?.created_at || new Date())}</Text>
                            <Text style={styles.summaryText}>{t("Loan amount")}: {formatAmount(walletData?.current_balances?.total_balance || 0)} {t("Rupees")}</Text>

                            {/* Calculate loan splits */}
                            {(() => {
                                const loanAmount = parseFloat(walletData?.current_balances?.total_balance || 0);

                                // Default data when no loan exists
                                const defaultData = {
                                    cashAmount: 0,
                                    lineOfCreditAmount: 0,
                                    cashPercentage: 30,
                                    lineOfCreditPercentage: 70,
                                    cashSpending: {
                                        spent: 0,
                                        remaining: 0,
                                        percentage: 100
                                    },
                                    creditSpending: {
                                        spent: 0,
                                        remaining: 0,
                                        percentage: 100
                                    }
                                };

                                // Use actual data if available, otherwise use defaults
                                const loanSplit = walletData ? {
                                    cashAmount: parseFloat(walletData.current_balances?.cash_balance || 0),
                                    lineOfCreditAmount: parseFloat(walletData.current_balances?.line_of_credit || 0),
                                    cashPercentage: 30,
                                    lineOfCreditPercentage: 70
                                } : defaultData;

                                const cashSpending = walletData ? {
                                    spent: parseFloat(walletData.cash_balance_history?.total_spent || 0),
                                    remaining: parseFloat(walletData.cash_balance_history?.remaining || 0),
                                    percentage: walletData.cash_balance_history?.total_received > 0 ?
                                        100 - (parseFloat(walletData.cash_balance_history?.total_spent || 0) / parseFloat(walletData.cash_balance_history?.total_received)) * 100 : 100
                                } : defaultData.cashSpending;

                                const creditSpending = walletData ? {
                                    spent: parseFloat(walletData.line_of_credit_history?.total_spent || 0),
                                    remaining: parseFloat(walletData.line_of_credit_history?.remaining || 0),
                                    percentage: walletData.line_of_credit_history?.total_received > 0 ?
                                        100 - (parseFloat(walletData.line_of_credit_history?.total_spent || 0) / parseFloat(walletData.line_of_credit_history?.total_received)) * 100 : 100
                                } : defaultData.creditSpending;

                                return (
                                    <>
                                        <View style={styles.mainProgressContainer}>
                                            <AnimatedCircularProgress
                                                size={wp('40%')}
                                                width={10}
                                                fill={100} // Full circle
                                                tintColor={colors.GREEN}
                                                backgroundColor={colors.LIGHT_GRAY}
                                                rotation={0}
                                            >
                                                {() => (
                                                    <View style={styles.progressTextContainer}>
                                                        <Text style={styles.progressMainText}>
                                                            {formatAmount(loanSplit.cashAmount)} {t("Rupees")}
                                                        </Text>
                                                        <Text style={styles.progressSubText}>{t("is cash")}</Text>
                                                        <Text style={styles.progressMainText}>
                                                            {formatAmount(loanSplit.lineOfCreditAmount)} {t("Rupees")}
                                                        </Text>
                                                        <Text style={styles.progressSubText}>{t("is line of credit")}</Text>
                                                    </View>
                                                )}
                                            </AnimatedCircularProgress>
                                        </View>

                                        <View style={styles.splitProgressContainer}>
                                            <View style={styles.progressItem}>
                                                <Text style={styles.progressLabel}>{t("Cash")}</Text>
                                                <AnimatedCircularProgress
                                                    size={wp('30%')}
                                                    width={8}
                                                    fill={cashSpending.percentage}
                                                    tintColor={colors.ORANGE}
                                                    backgroundColor={colors.LIGHT_ORANGE}
                                                >
                                                    {() => (
                                                        <View>
                                                            <Text style={styles.smallProgressText}>
                                                                {formatAmount(cashSpending.spent)} Rupees
                                                            </Text>
                                                            <Text style={styles.smallSubText}>{t("spent")}</Text>
                                                            <Text style={styles.smallProgressText}>
                                                                {formatAmount(cashSpending.remaining)} Rupees
                                                            </Text>
                                                            <Text style={styles.smallSubText}>{t("remaining")}</Text>
                                                        </View>
                                                    )}
                                                </AnimatedCircularProgress>
                                            </View>

                                            <View style={styles.progressItem}>
                                                <Text style={styles.progressLabel}>{t("Line of Credit")}</Text>
                                                <AnimatedCircularProgress
                                                    size={wp('30%')}
                                                    width={8}
                                                    fill={creditSpending.percentage}
                                                    tintColor={colors.PURPLE}
                                                    backgroundColor={colors.LIGHT_PURPLE}
                                                >
                                                    {() => (
                                                        <View>
                                                            <Text style={styles.smallProgressText}>
                                                                {formatAmount(creditSpending.spent)} Rupees
                                                            </Text>
                                                            <Text style={styles.smallSubText}>{t("spent")}</Text>
                                                            <Text style={styles.smallProgressText}>
                                                                {formatAmount(creditSpending.remaining)} {t("Rupees")}
                                                            </Text>
                                                            <Text style={styles.smallSubText}>{t("remaining")}</Text>
                                                        </View>
                                                    )}
                                                </AnimatedCircularProgress>
                                            </View>
                                        </View>
                                    </>
                                );
                            })()}
                        </View>

                        <View style={styles.detailsContainer}>
                            <Text style={styles.sectionTitle}>{t("Loan Details")}</Text>
                            <DetailRow label={t("Bank")} value={loanData?.bank_name || "N/A"} />
                            <DetailRow label={t("Title")} value={loanData?.title || "N/A"} />
                            <DetailRow label={t("Loan Type")} value={loanData?.loan_type || "N/A"} />
                            <DetailRow label={t("Loan Period")} value={`${loanData?.desired_loan_period || "N/A"} ${t("months")}`} />
                            <DetailRow label={t("Entity Name")} value={loanData?.entity_name || "N/A"} />
                            <DetailRow label={t("Approved Amount")} value={`${formatAmount(loanData?.approved_amount || 0)} ${t("Rupees")}`} />
                            <DetailRow label={t("Interest Rate")} value={`${loanData?.interest_rate || 0}%`} />
                            <DetailRow label={t("Repayment Terms")} value={loanData?.repayment_terms || "N/A"} />
                            <DetailRow label={t("Amount Payable")} value={`${formatAmount(loanData?.amount_payable || 0)} ${t("Rupees")}`} />
                            <DetailRow label={t("Status")} value={loanData?.status || "N/A"} isLast={true} />
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const DetailRow = ({ label, value, isLast }) => (
    <View style={[styles.detailRow, !isLast && styles.borderBottom]}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    navbarContainer: {
        height: hp('8.5%'),
        backgroundColor: colors.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GRAY,
    },
    searchBarContainer: {
        marginTop: hp('2%'),
        marginHorizontal: wp('4%'),
        height: hp('6%'),
    },
    scrollView: {
        flex: 1,
    },
    title: {
        fontSize: hp('2.8%'),
        fontFamily: fonts.SemiBold,
        marginVertical: hp('2%'),
        marginHorizontal: wp('4%'),
    },
    summaryContainer: {
        marginHorizontal: wp('4%'),
        backgroundColor: colors.WHITE,
        borderRadius: hp('1%'),
        padding: wp('4%'),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        backgroundColor: colors.LIGHT_GREEN,
    },
    sectionTitle: {
        fontSize: hp('2.2%'),
        fontFamily: fonts.SemiBold,
        marginBottom: hp('1%'),
    },
    summaryText: {
        fontSize: hp('1.8%'),
        fontFamily: fonts.Regular,
        marginBottom: hp('0.5%'),
    },
    mainProgressContainer: {
        alignItems: 'center',
        marginVertical: hp('2%'),
    },
    progressTextContainer: {
        alignItems: 'center',
    },
    progressMainText: {
        fontSize: hp('1.6%'),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
    },
    progressSubText: {
        fontSize: hp('1.4%'),
        fontFamily: fonts.Regular,
        color: colors.GRAY,
        marginBottom: hp('0.5%'),
    },
    splitProgressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: hp('2%'),
    },
    progressItem: {
        alignItems: 'center',
    },
    progressLabel: {
        fontSize: hp('1.8%'),
        fontFamily: fonts.Medium,
        marginBottom: hp('1%'),
    },
    smallProgressText: {
        fontSize: hp('1.4%'),
        fontFamily: fonts.SemiBold,
        textAlign: 'center',
    },
    smallSubText: {
        fontSize: hp('1.2%'),
        fontFamily: fonts.Regular,
        color: colors.GRAY,
        textAlign: 'center',
        marginBottom: hp('0.3%'),
    },
    detailsContainer: {
        marginTop: hp('2%'),
        marginHorizontal: wp('4%'),
        backgroundColor: colors.WHITE,
        borderRadius: hp('1%'),
        padding: wp('4%'),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: hp('4%'),
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: hp('1.2%'),
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GRAY,
    },
    detailLabel: {
        fontSize: hp('1.8%'),
        fontFamily: fonts.Regular,
    },
    detailValue: {
        fontSize: hp('1.8%'),
        fontFamily: fonts.Medium,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('10%'),
    },
    errorText: {
        textAlign: 'center',
        color: colors.RED,
        fontSize: hp('2%'),
        marginTop: hp('10%'),
        marginHorizontal: wp('4%'),
    },
    errorIndicator: {
        backgroundColor: colors.LIGHT_RED,
        padding: hp('0.8%'),
        marginHorizontal: wp('4%'),
        borderRadius: hp('0.5%'),
        marginBottom: hp('1%'),
    },
    errorIndicatorText: {
        color: colors.RED,
        textAlign: 'center',
        fontSize: hp('1.6%'),
        fontFamily: fonts.Medium,
    }
});

export default CurrentLoanNew;