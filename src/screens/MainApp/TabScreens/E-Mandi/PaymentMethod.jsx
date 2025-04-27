import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation } from '@react-navigation/native';

import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import { fonts } from '../../../../../util/Constants/FontName.js';
import colors from '../../../../../util/Constants/colors.js';
import ScreensName from '../../../../../util/Constants/ScreensName.ts';

// Import Firebase
import { database } from '../../../../../firebase/firebase';
import { ref, remove, get, set } from 'firebase/database';
import { MMKV } from 'react-native-mmkv';

// Import payment method SVGs
import VISA from '../../../../assets/MainApp/E-Order/PaymentMethods/visa-logo.svg';
import MASTER from '../../../../assets/MainApp/E-Order/PaymentMethods/Mastercard.svg';
import DEBIT from '../../../../assets/MainApp/E-Order/PaymentMethods/DEBIT.svg';
import RAAST from '../../../../assets/MainApp/E-Order/PaymentMethods/RAAST.svg';
import CustomButton from '../../../../components/CustomButton.jsx';

const storage = new MMKV();

function PaymentMethod() {
    const { t } = useTranslation();
    const route = useRoute();
    const navigation = useNavigation();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('raast');
    const [showSuccess, setShowSuccess] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [winNumber, setWinNumber] = useState('');
    
    // Get data from route params
    const { auctionData, totalQuantity, totalPrice, purchaseType } = route.params || {};
    
    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method);
    };
    
    const generateWinNumber = () => {
        // Generate random 8-digit number
        return Math.floor(10000000 + Math.random() * 90000000).toString();
    };
    
    const handlePayment = async () => {
        if (!auctionData) {
            Alert.alert(t('Error'), t('Auction data not found.'));
            return;
        }
        
        setProcessing(true);
        try {
            // Generate win number
            const generatedWinNumber = generateWinNumber();
            setWinNumber(generatedWinNumber);
            
            // Get current user
            const userId = storage.getString('userId') || 'anonymous';
            const userName = storage.getString('userName') || 'User';
            
            // Save purchase record to database
            const purchaseRef = ref(database, `purchases/${generatedWinNumber}`);
            await set(purchaseRef, {
                purchaseId: generatedWinNumber,
                auctionId: auctionData.id,
                userId: userId,
                userName: userName,
                productName: auctionData.productName,
                quantity: totalQuantity,
                pricePerKg: auctionData.buyNowPrice || auctionData.startPrice,
                totalAmount: totalPrice,
                purchaseType: purchaseType || 'buyNow',
                paymentMethod: selectedPaymentMethod,
                purchaseDate: new Date().toISOString(),
                status: 'completed',
                userContact: storage.getString('userPhone') || 'N/A',
            });
            
            // Instead of deleting, update auction status to 'purchased'
            if (purchaseType === 'buyNow') {
                const auctionRef = ref(database, `allAuctions/${auctionData.id}`);
                
                // Get current auction data
                const auctionSnapshot = await get(auctionRef);
                const currentAuctionData = auctionSnapshot.val();
                
                if (currentAuctionData) {
                    // Update auction with purchased status
                    await set(auctionRef, {
                        ...currentAuctionData,
                        status: 'purchased',
                        purchaseType: 'buyNow',
                        purchasedBy: userId,
                        purchaseDate: new Date().toISOString(),
                        winNumber: generatedWinNumber,
                        visible: false // Hide from public auctions list
                    });
                    
                    // Also save to user's purchases for history
                    const userPurchaseRef = ref(database, `userPurchases/${userId}/${auctionData.id}`);
                    await set(userPurchaseRef, {
                        auctionId: auctionData.id,
                        purchaseId: generatedWinNumber,
                        productName: auctionData.productName,
                        purchaseDate: new Date().toISOString(),
                        status: 'purchased',
                        purchaseType: 'Pre-Auction',
                        totalAmount: totalPrice,
                        winNumber: generatedWinNumber
                    });
                }
            }
            
            // Show success screen
            setShowSuccess(true);
        } catch (error) {
            console.error('Payment processing error:', error);
            Alert.alert(t('Payment Error'), t('There was an error processing your payment. Please try again.'));
        } finally {
            setProcessing(false);
        }
    };
    
    const handleGoHome = () => {
        navigation.navigate(ScreensName.EMandiHomeScreen);
    };
    
    // Render success screen
    if (showSuccess) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.successContainer}>
                    <View style={styles.successCircle}>
                        <Text style={styles.successIcon}>✓</Text>
                    </View>
                    <Text style={styles.successTitle}>{t('Payment Successful!')}</Text>
                    <Text style={styles.successMessage}>
                        {t('You can collect your auction from Agri Auction house')}
                    </Text>
                    <Text style={styles.winNumberLabel}>{t('Your Auction Win Number')}:</Text>
                    <Text style={styles.winNumber}>{winNumber}</Text>
                    
                    <View style={styles.detailsBox}>
                        <Text style={styles.detailsTitle}>{t('Purchase Details')}</Text>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>{t('Product')}:</Text>
                            <Text style={styles.detailValue}>{auctionData?.productName}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>{t('Quantity')}:</Text>
                            <Text style={styles.detailValue}>{totalQuantity} kg</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>{t('Total Price')}:</Text>
                            <Text style={styles.detailValue}>{totalPrice} Rs</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>{t('Payment Method')}:</Text>
                            <Text style={styles.detailValue}>{selectedPaymentMethod}</Text>
                        </View>
                    </View>
                    
                    <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
                        <Text style={styles.homeButtonText}>{t('Go Back to Home')}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar hasBackButton={true} />
            </View>

            <View style={styles.searchContainer}>
                <CustomSearchApp placeholder={t('Search in here')} />
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.summaryContainer}>
                    <Text style={styles.summaryTitle}>{t('Purchase Summary')}</Text>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>{t('Product')}:</Text>
                        <Text style={styles.summaryValue}>{auctionData?.productName}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>{t('Quantity')}:</Text>
                        <Text style={styles.summaryValue}>{totalQuantity} kg</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>{t('Price per kg')}:</Text>
                        <Text style={styles.summaryValue}>{auctionData?.buyNowPrice || auctionData?.startPrice} Rs</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>{t('Total Amount')}:</Text>
                        <Text style={styles.totalValue}>{totalPrice} Rs</Text>
                    </View>
                </View>

                <Text style={styles.changeMethodText}>{t('Select payment method')}</Text>

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
            
            <View style={styles.paymentContainer}>
                <TouchableOpacity
                    style={styles.payButton}
                    onPress={handlePayment}
                    disabled={processing}
                >
                    {processing ? (
                        <ActivityIndicator color={colors.WHITE} size="small" />
                    ) : (
                        <Text style={styles.payButtonText}>{t('Pay now')}</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    paymentLabel: {
        fontSize: hp(2),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
    },
    paymentContainer: {
        width: wp(70),
        alignSelf:'center',
        
        marginBottom: hp(4),
    },
    payButton: {
        backgroundColor: colors.GREEN,
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.5),
        borderRadius: hp(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    payButtonText: {
        color: colors.WHITE,
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        alignSelf:'center',
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
        marginBottom: hp(4),
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
    },
    // Summary section styles
    summaryContainer: {
        backgroundColor: colors.LIGHT_GREEN,
        padding: hp(2),
        borderRadius: hp(1.5),
        marginBottom: hp(2),
    },
    summaryTitle: {
        fontSize: hp(2.2),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp(1.5),
        textAlign: 'center',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(1),
    },
    summaryLabel: {
        fontSize: hp(1.8),
        fontFamily: fonts.Regular,
        color: colors.DARK_GRAY,
    },
    summaryValue: {
        fontSize: hp(1.8),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp(1),
        paddingTop: hp(1),
        borderTopWidth: 1,
        borderTopColor: colors.GREEN,
    },
    totalLabel: {
        fontSize: hp(2),
        fontFamily: fonts.Medium,
        color: colors.DARK_GRAY,
    },
    totalValue: {
        fontSize: hp(2),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
    },
    // Success screen styles
    successContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: hp(3),
    },
    successCircle: {
        width: wp(25),
        height: wp(25),
        borderRadius: wp(12.5),
        backgroundColor: colors.GREEN,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: hp(3),
    },
    successIcon: {
        fontSize: hp(5),
        color: colors.WHITE,
        fontWeight: 'bold',
    },
    successTitle: {
        fontSize: hp(3),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp(2),
    },
    successMessage: {
        fontSize: hp(2),
        fontFamily: fonts.Regular,
        color: colors.DARK_GRAY,
        textAlign: 'center',
        marginBottom: hp(3),
    },
    winNumberLabel: {
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
    },
    winNumber: {
        fontSize: hp(3),
        fontFamily: fonts.Bold,
        color: colors.DARK_GREEN,
        marginBottom: hp(3),
    },
    detailsBox: {
        width: '100%',
        backgroundColor: colors.LIGHT_GREEN,
        padding: hp(2),
        borderRadius: hp(1.5),
        marginBottom: hp(3),
    },
    detailsTitle: {
        fontSize: hp(2),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp(1.5),
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(1),
    },
    detailLabel: {
        fontSize: hp(1.8),
        fontFamily: fonts.Regular,
        color: colors.DARK_GRAY,
    },
    detailValue: {
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
    },
    homeButton: {
        backgroundColor: colors.GREEN,
        paddingHorizontal: wp(6),
        paddingVertical: hp(1.5),
        borderRadius: hp(1),
    },
    homeButtonText: {
        color: colors.WHITE,
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
    },
});

export default PaymentMethod; 