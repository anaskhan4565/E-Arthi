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
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from '../../../../redux/emarketSlice';

const AboutMore = () => {
    const { t } = useTranslation();
    const storage = new MMKV();
    const PassedPayment = new MMKV();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // Get cart from Redux if available
    const reduxCart = useSelector((state) => state?.emarket?.cart || []);
    const savedCart = storage.getString("cart");
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];
    const cartItems = reduxCart.length > 0 ? reduxCart : parsedCart;

    console.log("cartItems", cartItems);

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

    // State for order placement
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderError, setOrderError] = useState(null);

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

        // Place order after payment is completed
        placeOrder();
    }, []);

    const placeOrder = async () => {
        try {
            // Get necessary data from storage
            const token = storage.getString('token');
            const userId = storage.getString('userId');

            // Debug log to identify cart items
            console.log('Cart items for order placement:', cartItems);

            // Check if we have cart items
            if (!cartItems || cartItems.length === 0) {
                console.error('No cart items found for order placement');
                setOrderError('No items in cart');
                return;
            }

            // Skip the rest if we don't have authentication
            if (!token || !userId) {
                console.error('Missing authentication data for order placement', {
                    token: !!token,
                    userId: !!userId
                });
                setOrderError('Missing authentication data');
                return;
            }

            // Get shipping address and contact from storage or use defaults
            const shippingAddress = storage.getString('shippingAddress') || "123 Green Valley, Bangalore, Karnataka - 560001";
            const contactNumber = storage.getString('contactNumber') || "+91 9876543210";

            // Get payment method (lowercase for API)
            const paymentMethod = passedName.toLowerCase() || "cod";

            // Track successful and failed orders
            let successfulOrders = 0;
            let failedOrders = 0;

            console.log(`Placing orders for ${cartItems.length} cart items`);

            // Place order for each item in cart
            const orderPromises = cartItems.map(async (product, index) => {
                try {
                    // Ensure we have a product ID (product.id or product.product_id)
                    const productId = product.id || product.product_id;

                    if (!productId) {
                        console.error(`Product ID missing for item ${index}:`, product.name || 'unknown product');
                        failedOrders++;
                        return null;
                    }

                    const cartOrderData = {
                        product_id: productId,
                        quantity: product.quantity || 1,
                        payment_type: isAgriCashOnly ? "WALLET" : (hasBothPaymentTypes ? "MIXED" : paymentMethod),
                        shipping_address: shippingAddress,
                        contact_number: contactNumber
                    };

                    console.log(`Placing order ${index + 1}/${cartItems.length}:`, cartOrderData);

                    // Make API call to place order
                    const response = await axios.post(
                        'https://eagri-backend.vercel.app/e_market/place-order/',
                        cartOrderData,
                        {
                            headers: {
                                'Authorization': `Token ${token}`,
                                'Content-Type': 'application/json'
                            }
                        }
                    );

                    console.log(`Order ${index + 1} placed successfully:`, response.data);
                    successfulOrders++;
                    return response;
                } catch (error) {
                    console.error(`Error placing order for item ${index}:`, error.message);
                    failedOrders++;
                    return null;
                }
            });

            // Wait for all order promises to complete
            const results = await Promise.all(orderPromises);
            const validResults = results.filter(result => result !== null);

            console.log(`Order placement summary: ${successfulOrders} successful, ${failedOrders} failed`);

            if (validResults.length > 0) {
                console.log(`Successfully placed ${validResults.length} orders`);
                setOrderPlaced(true);

                // Clear cart immediately after successful order placement
                clearCart();
            } else {
                setOrderError('Failed to place any orders');
            }
        } catch (error) {
            console.error('Error in order placement process:', error);
            setOrderError(error.message || 'Failed to place orders');
        }
    };

    // Function to clear cart data from both storage and redux
    const clearCart = () => {
        // Clear cart from storage
        storage.delete("cart");

        // Clear cart from Redux store
        dispatch(setCart([]));

        console.log("Cart cleared successfully");
    };

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
            // Make sure cart is cleared again when navigating away
            clearCart();

            // Clear other temporary data
            storage.delete("FinalPrice");
            storage.delete("AgriCashAmount");
            storage.delete("RegularCashAmount");
            storage.delete("IsAgriCashOnly");
            storage.delete("updatedCart");
            storage.delete("PaymentCompleted");

            // Only clear payment-related keys instead of all keys
            // This prevents authentication token from being deleted
            PassedPayment.delete("PassedName");

            // Navigate back to main screen
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
                    MainText={t('Continue')}
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