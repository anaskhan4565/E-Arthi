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
    
    // Get Agri Cash information 
    const agriCashAmount = storage.getString("AgriCashAmount") || "0";
    const regularCashAmount = storage.getString("RegularCashAmount") || "0";
    
    // Check if we're using both payment methods
    const hasBothPaymentTypes = parseFloat(agriCashAmount) > 0 && parseFloat(regularCashAmount) > 0;
    
    // Check if we're using only Agri Cash
    const isAgriCashOnly = storage.getString("IsAgriCashOnly") === "true";

    const translateY = useRef(new Animated.Value(hp(20))).current;
    const opacity = useRef(new Animated.Value(0)).current;
    
    // Animation values for the second message
    const [showDeliveryMessage, setShowDeliveryMessage] = useState(false);
    const deliveryMessageOpacity = useRef(new Animated.Value(0)).current;
    const successMessageOpacity = useRef(new Animated.Value(1)).current;
    const deliveryMessageTranslateY = useRef(new Animated.Value(hp(0))).current;

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
        if (!showDeliveryMessage) {
            setShowDeliveryMessage(true);
            
            // Fade out success message
            Animated.timing(successMessageOpacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
            
            // Animate delivery message
            Animated.parallel([
                Animated.timing(deliveryMessageOpacity, {
                    toValue: 1,
                    duration: 500,
                    delay: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(deliveryMessageTranslateY, {
                    toValue: 0,
                    duration: 600,
                    delay: 300,
                    useNativeDriver: true,
                })
            ]).start();
        } else {
            storage.clearAll();
            PassedPayment.clearAll();
            navigation.navigate(ScreensName.MainTabNavigation);
        }
    }

    // Determine the success message based on payment method
    const getSuccessMessage = () => {
        // Format amount with non-breaking space between PKR and the number
        const formatCurrency = (amount) => `PKR\u00A0${parseFloat(amount).toFixed(1)}`;
        
        if (isAgriCashOnly) {
            return `${t('You have successfully sent')} ${formatCurrency(finalPrice)} ${t('through Agri Cash')}.`;
        } else if (hasBothPaymentTypes) {
            return `${t('You have successfully paid')} ${formatCurrency(agriCashAmount)} ${t('through Agri Cash')} ${t('and')} ${formatCurrency(regularCashAmount)} ${t('through')} ${t(passedName)}.`;
        } else if (parseFloat(agriCashAmount) > 0) {
            return `${t('You have successfully paid')} ${formatCurrency(agriCashAmount)} ${t('through Agri Cash')}.`;
        } else if (parseFloat(regularCashAmount) > 0) {
            return `${t('You have successfully paid')} ${formatCurrency(regularCashAmount)} ${t('through')} ${t(passedName)}.`;
        } else {
            return `${t('You have successfully sent')} ${formatCurrency(finalPrice)} ${t('through')} ${t(passedName)}.`;
        }
    };

    // Get expected delivery date (current date + 1 week)
    const getExpectedDeliveryDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        return date.toLocaleDateString();
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
                    <View style={styles.textContainer}>
                        <Animated.Text style={[styles.successText, { opacity: successMessageOpacity }]}>
                            {getSuccessMessage()}
                        </Animated.Text>
                        <Animated.Text 
                            style={[
                                styles.successText, 
                                styles.deliveryText,
                                { 
                                    opacity: deliveryMessageOpacity,
                                    transform: [{ translateY: deliveryMessageTranslateY }]
                                }
                            ]}
                        >
                            {t('Your order will be delivered to your registered address soon!')}{'\n\n'}
                            {t('Your expected date is')} {getExpectedDeliveryDate()}
                        </Animated.Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 0.3, alignItems: 'center' }}>
                <CustomButton 
                    BgGiven={colors.GREEN}
                    onPressG={ResetDefaultsStore}
                    MainText= {t('Continue')}
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
    textContainer: {
        position: 'relative',
        height: hp(15),
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    successText: {
        fontSize: hp(2.5),
        textAlign: 'center',
        fontFamily: fonts.Medium,
        marginHorizontal: hp(3),
        lineHeight: hp(3.5),
    },
    deliveryText: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
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