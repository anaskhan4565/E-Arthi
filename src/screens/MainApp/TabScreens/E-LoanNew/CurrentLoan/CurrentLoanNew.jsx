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
    const [currentLoan, setCurrentLoan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCurrentLoan = async () => {
            try {
                // Get token from MMKV storage
                const token = storage.getString('token');

                if (!token) {
                    console.error('No token found in storage');
                    setError('Authentication error. Please login again.');
                    setLoading(false);
                    return;
                }

                // Make API call with token in header
                const response = await axios.get(Routes.get_loan, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });

                // Filter to get the current active loan (fulfilled or in-progress status)
                const fulfilledLoans = response.data.filter(loan =>
                    loan.status.toLowerCase() === 'fulfilled' ||
                    loan.status.toLowerCase() === 'in progress'
                );

                if (fulfilledLoans.length > 0) {
                    // Use the most recent fulfilled loan as the current loan
                    const sortedLoans = fulfilledLoans.sort((a, b) =>
                        new Date(b.created_at) - new Date(a.created_at)
                    );
                    setCurrentLoan(sortedLoans[0]);
                }

                setLoading(false);
            } catch (err) {
                console.error("Error fetching current loan:", err);
                setError("Failed to load current loan");
                setLoading(false);
            }
        };

        fetchCurrentLoan();
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

    // Calculate the cash and line of credit split (for demo purposes)
    const calculateLoanSplit = (totalAmount) => {
        const cashAmount = Math.round(totalAmount * 0.6); // 60% cash
        const lineOfCreditAmount = totalAmount - cashAmount; // 40% line of credit

        return {
            cashAmount,
            lineOfCreditAmount,
            cashPercentage: 60,
            lineOfCreditPercentage: 40
        };
    };

    // Calculate spending (for demo purposes since we don't have real spending data)
    const calculateSpending = (amount) => {
        const spent = Math.round(amount * 0.7); // 70% spent
        const remaining = amount - spent; // 30% remaining

        return {
            spent,
            remaining,
            percentage: 70
        };
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>

            <View style={styles.searchBarContainer}>
                <CustomSearchApp placeholder="Search in here" />
            </View>

            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>Current Loan</Text>

                {loading ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color={colors.BLUE} />
                    </View>
                ) : error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : !currentLoan ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>You don't have any active loans</Text>
                    </View>
                ) : (
                    <>
                        <View style={styles.summaryContainer}>
                            <Text style={styles.sectionTitle}>Loan Summary</Text>
                            <Text style={styles.summaryText}>Loan taken on: {formatDate(currentLoan.created_at)}</Text>
                            <Text style={styles.summaryText}>Loan amount: {formatAmount(currentLoan.loan_amount)} Rupees</Text>

                            {/* Calculate loan splits for demo purposes */}
                            {(() => {
                                const loanAmount = parseFloat(currentLoan.loan_amount);
                                const loanSplit = calculateLoanSplit(loanAmount);
                                const cashSpending = calculateSpending(loanSplit.cashAmount);
                                const creditSpending = calculateSpending(loanSplit.lineOfCreditAmount);

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
                                                            {formatAmount(loanSplit.cashAmount)} Rupees
                                                        </Text>
                                                        <Text style={styles.progressSubText}>is cash</Text>
                                                        <Text style={styles.progressMainText}>
                                                            {formatAmount(loanSplit.lineOfCreditAmount)} Rupees
                                                        </Text>
                                                        <Text style={styles.progressSubText}>is line of credit</Text>
                                                    </View>
                                                )}
                                            </AnimatedCircularProgress>
                                        </View>

                                        <View style={styles.splitProgressContainer}>
                                            <View style={styles.progressItem}>
                                                <Text style={styles.progressLabel}>Cash</Text>
                                                <AnimatedCircularProgress
                                                    size={wp('30%')}
                                                    width={4}
                                                    fill={cashSpending.percentage}
                                                    tintColor={colors.ORANGE}
                                                    backgroundColor={colors.LIGHT_ORANGE}
                                                >
                                                    {() => (
                                                        <View>
                                                            <Text style={styles.smallProgressText}>
                                                                {formatAmount(cashSpending.spent)} Rupees
                                                            </Text>
                                                            <Text style={styles.smallSubText}>spent</Text>
                                                            <Text style={styles.smallProgressText}>
                                                                {formatAmount(cashSpending.remaining)} Rupees
                                                            </Text>
                                                            <Text style={styles.smallSubText}>remaining</Text>
                                                        </View>
                                                    )}
                                                </AnimatedCircularProgress>
                                            </View>

                                            <View style={styles.progressItem}>
                                                <Text style={styles.progressLabel}>Line of Credit</Text>
                                                <AnimatedCircularProgress
                                                    size={wp('30%')}
                                                    width={5}
                                                    fill={creditSpending.percentage}
                                                    tintColor={colors.PURPLE}
                                                    backgroundColor={colors.LIGHT_PURPLE}
                                                >
                                                    {() => (
                                                        <View>
                                                            <Text style={styles.smallProgressText}>
                                                                {formatAmount(creditSpending.spent)} Rupees
                                                            </Text>
                                                            <Text style={styles.smallSubText}>spent</Text>
                                                            <Text style={styles.smallProgressText}>
                                                                {formatAmount(creditSpending.remaining)} Rupees
                                                            </Text>
                                                            <Text style={styles.smallSubText}>remaining</Text>
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
                            <Text style={styles.sectionTitle}>Loan Details</Text>
                            <DetailRow label="Bank" value={currentLoan.bank_name} />
                            <DetailRow label="Title" value={currentLoan.title} />
                            <DetailRow label="Loan Type" value={currentLoan.loan_type} />
                            <DetailRow label="Loan Period" value={`${currentLoan.desired_loan_period} months`} />
                            <DetailRow label="Entity Name" value={currentLoan.entity_name} isLast={true} />
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
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('10%'),
        marginHorizontal: wp('4%'),
    },
    emptyText: {
        textAlign: 'center',
        color: colors.GRAY,
        fontSize: hp('2%'),
    },
});

export default CurrentLoanNew;