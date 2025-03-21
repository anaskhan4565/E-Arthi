import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';
import ScreensName from '../../../../../util/Constants/ScreensName';

const Settlements = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();

    // This data object would be fetched from an API in the future
    const settlementData = {
        loan: {
            takenOn: '08-02-2025',
            amount: '50,000',
            breakdown: {
                cash: {
                    amount: '30,000',
                    percentage: 60
                },
                lineOfCredit: {
                    amount: '20,000',
                    percentage: 40
                }
            }
        },
        utilization: {
            cash: {
                spent: '20,000',
                remaining: '10,000',
                percentage: 65
            },
            lineOfCredit: {
                spent: '15,000',
                remaining: '5,000',
                percentage: 75
            }
        },
        settlement: {
            cropSoldFor: '60,000',
            loanPaidOff: '50,000',
            farmerProfit: '10,000'
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>

            <View style={styles.searchBarContainer}>
                <CustomSearchApp placeholder="Search in here" />
            </View>

            <ScrollView style={styles.contentContainer}>
                <Text style={styles.title}>Settlements</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Loan Details</Text>
                    <View style={styles.loanDetails}>
                        <Text style={styles.loanText}>Loan taken on: <Text style={styles.loanTextBold}>{settlementData.loan.takenOn}</Text></Text>
                        <Text style={styles.loanText}>Loan amount: <Text style={styles.loanTextBold}>{settlementData.loan.amount} Rupees</Text>     </Text>
                    </View>

                    <View style={styles.graphContainer}>
                        <AnimatedCircularProgress
                            size={wp('20%')}
                            width={wp('4%')}
                            fill={settlementData.loan.breakdown.cash.percentage}
                            tintColor={colors.GREEN}
                            backgroundColor="#e0e0e0"
                            rotation={0}
                        />
                        <View style={styles.loanBreakdown}>
                            <View style={styles.loanBreakdownItem}>
                                <Text style={styles.greenAmount}>{settlementData.loan.breakdown.cash.amount} Rupees</Text>
                                <Text style={styles.greenDescription}>is cash</Text>
                            </View>
                            <View style={styles.loanBreakdownItem}>
                                <Text style={styles.blueAmount}>{settlementData.loan.breakdown.lineOfCredit.amount} Rupees</Text>
                                <Text style={styles.blueDescription}>is line of credit</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.utilization}>
                        <View style={styles.cashUtilization}>
                            <Text style={styles.cashTitle}>Cash</Text>
                            <AnimatedCircularProgress
                                size={wp('20%')}
                                width={wp('4%')}
                                fill={settlementData.utilization.cash.percentage}
                                tintColor="#FF9966"
                                backgroundColor="#e0e0e0"
                                rotation={0}
                            />
                            <View style={styles.utilizationText}>
                                <Text style={styles.spentText1}>{settlementData.utilization.cash.spent} Rupees <Text style={styles.spentLabel}>spent</Text></Text>
                                <Text style={styles.remainingText}>{settlementData.utilization.cash.remaining} Rupees <Text style={styles.remainingLabel}>remaining</Text></Text>
                            </View>
                        </View>
                        <View style={styles.line}></View>       

                        <View style={styles.creditUtilization}>
                            <Text style={styles.creditTitle}>Line of Credit</Text>
                            <AnimatedCircularProgress
                                size={wp('20%')}
                                width={wp('4%')}
                                fill={settlementData.utilization.lineOfCredit.percentage}
                                tintColor="#9966FF"
                                backgroundColor="#e0e0e0"
                                rotation={0}
                            />
                            <View style={styles.utilizationText}>
                                <Text style={styles.spentText2}>{settlementData.utilization.lineOfCredit.spent} Rupees <Text style={styles.spentLabel}>spent</Text></Text>
                                <Text style={styles.remainingText}>{settlementData.utilization.lineOfCredit.remaining} Rupees <Text style={styles.remainingLabel}>remaining</Text></Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Settlement Details</Text>
                    <View style={styles.settlementDetails}>
                        <Text style={styles.settlementText}>Crop sold for: <Text style={styles.settlementTextBold}>{settlementData.settlement.cropSoldFor} Rupees</Text></Text>
                        <Text style={styles.settlementText}>Loan paid off: <Text style={styles.settlementTextBold}>{settlementData.settlement.loanPaidOff} Rupees</Text></Text>
                        <Text style={styles.settlementText}>Farmer profit: <Text style={styles.settlementTextBold}>{settlementData.settlement.farmerProfit} Rupees</Text></Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.summaryButton}
                    onPress={() => navigation.navigate(ScreensName.SummaryOfSpendingsScr)}
                >
                    <Text style={styles.summaryButtonText}>View Summary of Spendings</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    navbarContainer: {
        height: hp(8.5),
        backgroundColor: colors.WHITE,
    },
    searchBarContainer: {
        marginTop: hp('2%'),
        paddingHorizontal: wp('5%'),
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: wp('5%'),
        marginTop: hp('2%'),
    },
    title: {
        fontSize: hp('3%'),
        fontFamily: fonts.SemiBold,
        fontWeight: '400',
        color: colors.BLACK,
        marginTop: hp('1%'),
        marginBottom: hp('2%'),
    },
    section: {
        marginBottom: hp('3%'),
        backgroundColor: colors.LIGHT_GREEN,
    },
    sectionTitle: {
        fontSize: hp('2.2%'),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp('1%'),
        marginTop: hp('1%'),
    },
    loanDetails: {
        marginBottom: hp('2%'),
    },
    loanText: {
        fontSize: hp('1.7%'),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
        marginBottom: hp('0.5%'),
    },
    loanTextBold: {
        fontFamily: fonts.SemiBold,
    },
    graphContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('2%'),
        paddingVertical: hp('1%'),
        borderBottomWidth: 1,
        borderBottomColor: colors.GREEN,
    },
    loanBreakdown: {
        marginLeft: wp('5%'),
    },
    loanBreakdownItem: {
        flexDirection: 'row',

        marginBottom: hp('1%'),
        // marginRight: wp('5%'),

    },
    greenAmount: {
        fontSize: hp('1.7%'),
        fontFamily: fonts.SemiBold,
        color: colors.GREEN,
    },
    greenDescription: {
        fontSize: hp('1.7%'),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
     
        marginLeft: wp('4%'),
    },
    blueAmount: {
        fontSize: hp('1.7%'),
        fontFamily: fonts.SemiBold,
        color: colors.GRAY,
    },
    blueDescription: {
        fontSize: hp('1.7%'),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
        marginLeft: wp('4%'),
    },
    utilization: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('2%'),
    },
    cashUtilization: {
        flex: 1,
        // flexDirection: 'row',
        alignItems: 'center',
        paddingRight: wp('2%'),
    },
    creditUtilization: {
        flex: 1,
        // flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: wp('2%'),
    },
    utilizationText: {
        marginLeft: wp('3%'),
    },
    cashTitle: {
        fontSize: hp('1.8%'),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp('0.5%'),
    },
    creditTitle: {
        fontSize: hp('1.8%'),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp('0.5%'),
    },
    spentText1: {
        fontSize: hp('1.5%'),
        fontFamily: fonts.Medium,
        color: '#FF9966' ,
        marginTop: hp('1%'),
    },
    spentText2: {
        fontSize: hp('1.5%'),
        fontFamily: fonts.Medium,
        color: '#9966FF',
        marginTop: hp('1%'),
    },
    spentLabel: {
        fontFamily: fonts.Regular,
        color: colors.GRAY,
    },
    remainingText: {
        fontSize: hp('1.5%'),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
    },
    remainingLabel: {
        fontFamily: fonts.Regular,
        color: colors.GRAY,
    },
    settlementDetails: {
        marginTop: hp('1%'),
    },
    settlementText: {
        fontSize: hp('1.6%'),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
        marginBottom: hp('0.5%'),
    },
    summaryButton: {
        backgroundColor: colors.GREEN,
        padding: hp('1.8%'),
        borderRadius: hp('1%'),
        alignItems: 'center',
        marginBottom: hp('5%'),
    },
    summaryButtonText: {
        color: colors.WHITE,
        fontFamily: fonts.Medium,
        fontSize: hp('1.8%'),
    },
    line: {
        width: 1,
        height: '100%',
        backgroundColor: colors.GREEN,
    },
    settlementTextBold: {
        fontFamily: fonts.SemiBold,
    },
});
export default Settlements; 