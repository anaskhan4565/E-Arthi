import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';

import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import { fonts } from '../../../../../util/Constants/FontName.js';
import colors from '../../../../../util/Constants/colors.js';

// Import payment method SVGs
import VISA from '../../../../assets/MainApp/E-Order/PaymentMethods/visa-logo.svg';
import MASTER from '../../../../assets/MainApp/E-Order/PaymentMethods/Mastercard.svg';
import DEBIT from '../../../../assets/MainApp/E-Order/PaymentMethods/DEBIT.svg';
import RAAST from '../../../../assets/MainApp/E-Order/PaymentMethods/RAAST.svg';
import ApplePay from '../../../../assets/MainApp/E-Order/PaymentMethods/ApplePay.svg';
import GooglePay from '../../../../assets/MainApp/E-Order/PaymentMethods/GooglePay.svg';

// Sample payment history data
const PAYMENT_HISTORY = [
    {
        id: '1',
        date: '15 Aug 2023',
        amount: 2430,
        method: 'visa',
        status: 'completed',
        description: 'Auction Purchase #A1023'
    },
    {
        id: '2',
        date: '10 Jul 2023',
        amount: 1850,
        method: 'master',
        status: 'completed',
        description: 'Auction Purchase #A982'
    },
    {
        id: '3',
        date: '25 Jun 2023',
        amount: 3200,
        method: 'debit',
        status: 'failed',
        description: 'Auction Purchase #A965'
    },
    {
        id: '4',
        date: '18 May 2023',
        amount: 1650,
        method: 'raast',
        status: 'completed',
        description: 'Auction Purchase #A912'
    },
    {
        id: '5',
        date: '05 Apr 2023',
        amount: 2100,
        method: 'applepay',
        status: 'completed',
        description: 'Auction Purchase #A875'
    },
    {
        id: '6',
        date: '22 Mar 2023',
        amount: 1900,
        method: 'googlepay',
        status: 'pending',
        description: 'Auction Purchase #A843'
    }
];

function PaymentHistory() {
    const { t } = useTranslation();

    // Function to get the appropriate payment method icon
    const getPaymentMethodIcon = (method) => {
        switch (method) {
            case 'visa':
                return <VISA width={wp(10)} height={hp(3)} />;
            case 'master':
                return <MASTER width={wp(10)} height={hp(3)} />;
            case 'debit':
                return <DEBIT width={wp(10)} height={hp(3)} />;
            case 'raast':
                return <RAAST width={wp(10)} height={hp(3)} />;
            case 'applepay':
                return <ApplePay width={wp(10)} height={hp(3)} />;
            case 'googlepay':
                return <GooglePay width={wp(10)} height={hp(3)} />;
            default:
                return null;
        }
    };

    const renderPaymentItem = ({ item }) => (
        <TouchableOpacity style={styles.paymentItem}>
            <View style={styles.paymentIconContainer}>
                {getPaymentMethodIcon(item.method)}
            </View>
            <View style={styles.paymentDetails}>
                <Text style={styles.paymentDescription}>{item.description}</Text>
                <Text style={styles.paymentDate}>{item.date}</Text>
            </View>
            <View style={styles.amountContainer}>
                <Text style={styles.paymentAmount}>PKR {item.amount}</Text>
                <View style={[
                    styles.statusBadge,
                    item.status === 'completed' ? styles.completedBadge :
                        item.status === 'pending' ? styles.pendingBadge : styles.failedBadge
                ]}>
                    <Text style={styles.statusText}>
                        {t(item.status.charAt(0).toUpperCase() + item.status.slice(1))}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar hasBackButton={true} />
            </View>

            <View style={styles.searchContainer}>
                <CustomSearchApp placeholder={t('Search in here')} />
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>{t('Payment History')}</Text>

                <FlatList
                    data={PAYMENT_HISTORY}
                    renderItem={renderPaymentItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.paymentsList}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
}

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
    searchContainer: {
        marginTop: hp('2%'),
        height: hp('7%'),
        marginHorizontal: hp(2),
    },
    content: {
        flex: 1,
        padding: hp(3),
    },
    title: {
        fontSize: hp(3),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp(2),
    },
    paymentsList: {
        paddingBottom: hp(5),
    },
    paymentItem: {
        flexDirection: 'row',
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: hp(1.5),
        marginBottom: hp(2),
        padding: hp(2),
        alignItems: 'center',
        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    paymentIconContainer: {
        width: wp(15),
        height: hp(5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
        borderRadius: hp(1),
        padding: hp(1),
    },
    paymentDetails: {
        flex: 1,
        paddingLeft: wp(3),
    },
    paymentDescription: {
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        marginBottom: hp(0.5),
    },
    paymentDate: {
        fontSize: hp(1.6),
        fontFamily: fonts.Regular,
        color: colors.GRAY,
    },
    amountContainer: {
        alignItems: 'flex-end',
    },
    paymentAmount: {
        fontSize: hp(1.8),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp(0.8),
    },
    statusBadge: {
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.4),
        borderRadius: hp(1),
    },
    completedBadge: {
        backgroundColor: colors.GREEN,
    },
    pendingBadge: {
        backgroundColor: colors.ORANGE,
    },
    failedBadge: {
        backgroundColor: colors.RED,
    },
    statusText: {
        fontSize: hp(1.2),
        fontFamily: fonts.Medium,
        color: colors.WHITE,
    },
});

export default PaymentHistory; 