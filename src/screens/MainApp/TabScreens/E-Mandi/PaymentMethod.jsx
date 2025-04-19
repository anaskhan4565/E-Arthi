import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
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

function PaymentMethod({ navigation }) {
    const { t } = useTranslation();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const totalAmount = 2430; // Example amount

    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar hasBackButton={true} />
            </View>

            <View style={styles.searchContainer}>
                <CustomSearchApp placeholder={t('Search in here')} />
            </View>

            <ScrollView style={styles.content}>
                <Text style={styles.changeMethodText}>{t('Or change payment method')}</Text>

                <View style={styles.paymentMethodsContainer}>
                    <View style={styles.paymentMethodsRow}>
                        <TouchableOpacity
                            style={[styles.paymentMethodCard, selectedPaymentMethod === 'raast' && styles.selectedMethod]}
                            onPress={() => handlePaymentMethodSelect('raast')}
                        >
                            <RAAST width={wp(15)} height={hp(6)} />
                            <Text style={styles.paymentMethodLabel}>{t('Raast')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.paymentMethodCard, selectedPaymentMethod === 'debit' && styles.selectedMethod]}
                            onPress={() => handlePaymentMethodSelect('debit')}
                        >
                            <View style={styles.debitTextContainer}>
                                <Text style={styles.debitText}>DEBIT</Text>
                            </View>
                            <Text style={styles.paymentMethodLabel}>{t('Debit Card')}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.paymentMethodsRow}>
                        <TouchableOpacity
                            style={[styles.paymentMethodCard, selectedPaymentMethod === 'mastercard' && styles.selectedMethod]}
                            onPress={() => handlePaymentMethodSelect('mastercard')}
                        >
                            <MASTER width={wp(15)} height={hp(4)} />
                            <Text style={styles.paymentMethodLabel}>{t('MasterCard')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.paymentMethodCard, selectedPaymentMethod === 'visa' && styles.selectedMethod]}
                            onPress={() => handlePaymentMethodSelect('visa')}
                        >
                            <VISA width={wp(15)} height={hp(4)} />
                            <Text style={styles.paymentMethodLabel}>{t('VISA')}</Text>
                        </TouchableOpacity>
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
        height: hp('8.5%'),
        backgroundColor: colors.WHITE,
    },
    searchContainer: {
        marginTop: hp('2%'),
        height: hp('7%'),
        marginHorizontal: hp(2),
    },
    content: {
        flex: 1,
        padding: hp(2),
    },
    changeMethodText: {
        fontSize: hp(2.5),
        fontFamily: fonts.Medium,
        color: colors.DARK_GRAY,
        marginVertical: hp(2),
        textAlign: 'center',
    },
    paymentMethodsContainer: {
        flex: 1,
        marginTop: hp(1),
    },
    paymentMethodsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(2),
    },
    paymentMethodCard: {
        width: wp(42),
        height: hp(18),
        backgroundColor: colors.WHITE,
        borderRadius: hp(2),
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    selectedMethod: {
        borderWidth: 2,
        borderColor: colors.GREEN,
    },
    paymentMethodLabel: {
        fontSize: hp(2.2),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        marginTop: hp(1),
    },
    debitTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    debitText: {
        fontSize: hp(4),
        fontFamily: fonts.Bold,
        color: colors.BLACK,
        fontWeight: 'bold',
    }
});

export default PaymentMethod; 