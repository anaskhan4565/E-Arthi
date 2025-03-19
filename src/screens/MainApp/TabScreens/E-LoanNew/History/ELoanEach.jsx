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
const ELoanEach = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const route = useRoute();
    const { loanId, status, bank, amount, date, location, time, statusColor="rgb(14, 174, 45)" } = route.params;
     // Correct way to get params

    console.log(loanId)
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
                        <Text style={styles.loanTitle}>Loan {loanId}</Text>
                        <View style={[styles.statusContainer, { backgroundColor: statusColor }]}>
                            <Text style={styles.statusText}>{status}</Text>
                        </View>
                    </View>

                    <View style={styles.detailsContainer}>
                        <DetailRow label="Date" value={date} />
                        <DetailRow label="Location" value={location} />
                        <DetailRow label="Time" value={time}/>
                        <DetailRow label="Bank" value={bank} />
                        <DetailRow 
                            label="Total amount" 
                            value={`${amount} Rupees`}
                            isLast={true}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const DetailRow = ({ label, value, isLast = false }) => (
    <View style={[styles.detailRow, !isLast && styles.borderBottom]}>
        <Text style={styles.labelText}>{label}:</Text>
        <Text style={styles.valueText}>{value}</Text>
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
    detailsContainer: {
        backgroundColor: colors.WHITE,
    },
    detailRow: {
        flexDirection: 'row',
        paddingVertical: hp('1.2%'),
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