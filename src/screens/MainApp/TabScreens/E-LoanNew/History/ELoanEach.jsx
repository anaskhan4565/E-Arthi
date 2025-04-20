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
import { useNavigation, useRoute } from '@react-navigation/native';
import ScreensName from '../../../../../../util/Constants/ScreensName.ts';
import { t } from 'i18next';

const ELoanEach = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const route = useRoute();
    const {
        loanId,
        status,
        bank,
        amount,
        date,
        location,
        time,
        statusColor = "rgb(14, 174, 45)",
        loanDetails
    } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>

            <View style={styles.searchBarContainer}>
                <CustomSearchApp placeholder="Search in here" />
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.loanContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.loanTitle}>{loanDetails?.title || `Loan ${loanId}`}</Text>
                        <View style={[styles.statusContainer, { backgroundColor: statusColor }]}>
                            <Text style={styles.statusText}>{t(status)}</Text>
                        </View>
                    </View>

                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>{t("Basic Information")}</Text>
                        <View style={styles.detailsContainer}>
                            <DetailRow label="Loan ID" value={loanId.toString()} />
                            <DetailRow label="Status" value={status} />
                            <DetailRow label="Date" value={date} />
                            <DetailRow label="Time" value={time} />
                            <DetailRow label="Location" value={location} />
                            <DetailRow label="Loan Type" value={loanDetails?.loan_type || '-'} isLast={true} />
                        </View>
                    </View>

                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>{t("Financial Details")}</Text>
                        <View style={styles.detailsContainer}>
                            <DetailRow label="Bank" value={bank} />
                            <DetailRow label="Amount" value={`${amount} Rupees`} />
                            <DetailRow label="Period" value={`${loanDetails?.desired_loan_period || '-'} months`} />
                            <DetailRow label="Monthly Income" value={`${parseFloat(loanDetails?.monthly_net_income || 0).toLocaleString()} Rupees`} />
                            <DetailRow label="Yearly Revenue" value={`${parseFloat(loanDetails?.yearly_crop_revenue || 0).toLocaleString()} Rupees`} />
                            <DetailRow label="Yearly Yield" value={`${parseFloat(loanDetails?.yearly_yield || 0).toLocaleString()}`} isLast={true} />
                        </View>
                    </View>

                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>{t("Personal Information")}</Text>
                        <View style={styles.detailsContainer}>
                            <DetailRow label="Name" value={loanDetails?.name || '-'} />
                            <DetailRow label="CNIC" value={loanDetails?.cnic || '-'} />
                            <DetailRow label="Contact" value={loanDetails?.contact || '-'} />
                            <DetailRow label="Email" value={loanDetails?.email || '-'} />
                            <DetailRow label="Entity Name" value={loanDetails?.entity_name || '-'} isLast={true} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const DetailRow = ({ label, value, isLast = false }) => (
    <View style={[styles.detailRow, !isLast && styles.borderBottom]}>
        <Text style={styles.labelText}>{t(label)}:</Text>
        <Text style={styles.valueText}>{t(value)}</Text>
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
    loanContainer: {
        marginHorizontal: wp('4%'),
        marginTop: hp('2%'),
        marginBottom: hp('4%'),
        backgroundColor: colors.WHITE,
        borderRadius: hp('1%'),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        padding: wp('4%'),
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('2%'),
    },
    loanTitle: {
        fontSize: hp('2.4%'),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        flex: 1,
    },
    statusContainer: {
        backgroundColor: colors.GREEN,
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('0.5%'),
        borderRadius: hp('2%'),
    },
    statusText: {
        color: colors.WHITE,
        fontSize: hp('1.6%'),
        fontFamily: fonts.Medium,
    },
    sectionContainer: {
        marginTop: hp('2%'),
    },
    sectionTitle: {
        fontSize: hp('2%'),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp('1%'),
    },
    detailsContainer: {
        backgroundColor: colors.WHITE,
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        borderRadius: hp('1%'),
    },
    detailRow: {
        flexDirection: 'row',
        paddingVertical: hp('1.2%'),
        paddingHorizontal: wp('3%'),
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GRAY,
    },
    labelText: {
        fontSize: hp('1.8%'),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
        width: wp('35%'),
    },
    valueText: {
        fontSize: hp('1.8%'),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
        flex: 1,
    },
});

export default ELoanEach;