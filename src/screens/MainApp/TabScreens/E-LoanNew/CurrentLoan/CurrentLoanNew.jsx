import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import Navbar from '../../../Navbar/Navbar';
import CustomSearchApp from '../../../CustomComponent/CustomSearchApp';
import colors from '../../../../../../util/Constants/colors';
import { fonts } from '../../../../../../util/Constants/FontName';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const CurrentLoanNew = () => {
    const { t } = useTranslation();

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

                <View style={styles.summaryContainer}>
                    <Text style={styles.sectionTitle}>Loan Summary</Text>
                    <Text style={styles.summaryText}>Loan taken on: 09-02-2025</Text>
                    <Text style={styles.summaryText}>Loan amount: 50,000 Rupees</Text>

                    <View style={styles.mainProgressContainer}>
                        <AnimatedCircularProgress
                            size={wp('40%')}
                            width={10}
                            fill={60}
                            tintColor={colors.GREEN}
                            backgroundColor={colors.LIGHT_GRAY}
                            rotation={0}
                        >
                            {() => (
                                <View style={styles.progressTextContainer}>
                                    <Text style={styles.progressMainText}>30,000 Rupees</Text>
                                    <Text style={styles.progressSubText}>is cash</Text>
                                    <Text style={styles.progressMainText}>20,000 Rupees</Text>
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
                                fill={70}
                                tintColor={colors.ORANGE}
                                backgroundColor={colors.LIGHT_ORANGE}
                            >
                                {() => (
                                    <View>
                                        <Text style={styles.smallProgressText}>20,000 Rupees</Text>
                                        <Text style={styles.smallSubText}>spent</Text>
                                        <Text style={styles.smallProgressText}>10,000 Rupees</Text>
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
                                fill={75}
                                tintColor={colors.PURPLE}
                                backgroundColor={colors.LIGHT_PURPLE}
                            >
                                {() => (
                                    <View>
                                        <Text style={styles.smallProgressText}>15,000 Rupees</Text>
                                        <Text style={styles.smallSubText}>spent</Text>
                                        <Text style={styles.smallProgressText}>5,000 Rupees</Text>
                                        <Text style={styles.smallSubText}>remaining</Text>
                                    </View>
                                )}
                            </AnimatedCircularProgress>
                        </View>
                    </View>
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.sectionTitle}>Loan Details</Text>
                    <DetailRow label="Seeds" value="17500 Rupees" />
                    <DetailRow label="Fertilizer" value="5000 Rupees" />
                    <DetailRow label="Pesticides" value="2500 Rupees" />
                    <DetailRow label="Labor" value="15000 Rupees" />
                    <DetailRow label="Transport" value="18000 Rupees" isLast={true} />
                </View>
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
});

export default CurrentLoanNew;