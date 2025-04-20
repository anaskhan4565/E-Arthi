import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import colors from '../../../../../util/Constants/colors.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import Success from './TempImgsOrder/Success.png';
import CustomButton from '../../../../components/CustomButton';
import ScreensName from '../../../../../util/Constants/ScreensName.ts';
import { useTranslation } from 'react-i18next';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { fonts } from '../../../../../util/Constants/FontName.js';
import { MMKV } from 'react-native-mmkv';
import { useNavigation } from '@react-navigation/native';

const AboutMore = () => {
    const { t } = useTranslation();
    const storage = new MMKV();
    const PassedPayment = new MMKV();
    const navigation = useNavigation();

    // Get payment details from storage
    const finalPrice = storage.getString("FinalPrice") || "0";
    const passedName = PassedPayment.getString("PassedName") || "";
    
    // Get Agri Cash information that was stored in E-OrderCheckout
    const agriCashAmount = storage.getString("AgriCashAmount") || "0";
    const isAgriCashOnly = storage.getString("IsAgriCashOnly") === "true";

    const translateY = useRef(new Animated.Value(hp(20))).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        // Set payment completion flag
        storage.set("PaymentCompleted", "true");
    }, []);

    const ResetDefaultsStore = () => {
        storage.clearAll();
        PassedPayment.clearAll();
        navigation.navigate(ScreensName.MainTabNavigation);
    }

    // Calculate the remaining amount paid through other method
    const otherPaymentAmount = parseFloat(finalPrice) - parseFloat(agriCashAmount);

    // Determine the success message based on payment method
    const getSuccessMessage = () => {
        // Format amount with non-breaking space between PKR and the number
        const formatCurrency = (amount) => `PKR\u00A0${parseFloat(amount).toFixed(1)}`;
        
        if (isAgriCashOnly) {
            return `${t('You have successfully sent')} ${formatCurrency(finalPrice)} ${t('through Agri Cash')}.`;
        } else if (parseFloat(agriCashAmount) > 0) {
            return `${t('You have successfully paid')} ${formatCurrency(agriCashAmount)} ${t('through Agri Cash')} ${t('and')} ${formatCurrency(otherPaymentAmount)} ${t('through')} ${t(passedName)}.`;
        } else {
            return `${t('You have successfully sent')} ${formatCurrency(finalPrice)} ${t('through')} ${t(passedName)}.`;
        }
    };

    return (
        <SafeAreaView style={styles.MainContainer}>
            <View style={{ flex: 0.74, backgroundColor: colors.WHITE }}>
                <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center', marginTop: hp(10), gap: hp(2) }}>

                    <Animated.Image
                        source={Success}
                        resizeMode="contain"
                        style={[
                            styles.image,
                            { transform: [{ translateY }], opacity },
                        ]}
                    />
                    <Text style={styles.successText}>
                        {getSuccessMessage()}
                    </Text>
                </View>
            </View>
            <View style={{ flex: 0.3, alignItems: 'center' }}>
                <CustomButton 
                    BgGiven={colors.GREEN}
                    onPressG={ResetDefaultsStore}
                    MainText={t('Continue')}
                    name={ScreensName.SignUp}
                    isNavigation={true}
                    txColor={colors.WHITE}
                />
            </View>
        </SafeAreaView>
    );
};

export default AboutMore;

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    image: {
        height: hp(15),
        width: wp(180),
        marginLeft: hp(2.2),
    },
    successText: {
        fontSize: hp(2.5),
        textAlign: 'center',
        fontFamily: fonts.Medium,
        marginHorizontal: hp(3),
        lineHeight: hp(3.5),
    },
    card: {
        flex: 1,
        marginHorizontal: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        width: wp('30%'),
        height: hp('13%'),
    },
});