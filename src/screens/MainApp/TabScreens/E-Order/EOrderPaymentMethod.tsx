import React, { useEffect, useRef, useState, useMemo } from "react";
import Navbar from "../../Navbar/Navbar.jsx";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp.jsx";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/Constants/colors.js";
import { Animated, Image, TouchableOpacity } from "react-native";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/Constants/FontName.js";
import ScreensName from "../../../../../util/Constants/ScreensName.ts";
import { useNavigation } from "@react-navigation/native";
import { MMKV } from "react-native-mmkv";
import CustomButton from "../../../../components/CustomButton.jsx";

// Import your assets
import RAAST from "../../../../assets/MainApp/E-Order/PaymentMethods/RAAST.svg";
import DEBIT from "../../../../assets/MainApp/E-Order/PaymentMethods/DEBIT.svg";
import MASTER from "../../../../assets/MainApp/E-Order/PaymentMethods/Mastercard.svg";
import VISA from "../../../../assets/MainApp/E-Order/PaymentMethods/visa-logo.svg";
import AGRICARD from "../../../../assets/MainApp/E-Order/PaymentMethods/AgriCard.png";
import KISSANCARD from "../../../../assets/MainApp/E-Order/PaymentMethods/KisaanCard.png";
import InventoryProduct from "../../CustomComponent/WarehouseProduct.jsx";
import Wallet from './TempImgsOrder/image.png'
import { RadioButton } from "react-native-paper";
import { useSelector } from "react-redux";

const paymentMethods = [
    { name: "Raast", image: RAAST },
    { name: "Debit Card", image: DEBIT },
    { name: "MasterCard", image: MASTER },
    { name: "VISA", image: VISA },
    { name: "Kisaan Card", image: KISSANCARD },
];

function EOrderPaymentMethod(): React.JSX.Element {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Raast");
    const storage = new MMKV();
    const savedCart = storage.getString("cart");
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];
    const CREDIT_LIMIT = 100000; // Example credit limit: 1 Lakh

    // Animation refs
    const translateY = useRef(new Animated.Value(hp(20))).current;
    const opacity = useRef(new Animated.Value(0)).current;

    // Get cart from Redux if available
    const reduxCart = useSelector((state) => state?.emarket?.cart || []);
    const cartItems = reduxCart.length > 0 ? reduxCart : parsedCart;

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 700,
            useNativeDriver: true,
        }).start();

        Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    // Separate Agri-Cash and regular cash items
    const { agriCashItems, cashItems, agriCashTotal, cashTotal, grandTotal } = useMemo(() => {
        const agriItems = cartItems.filter(item => !item.isCashPurchase);
        const regularItems = cartItems.filter(item => item.isCashPurchase);
        
        const agriTotal = agriItems.reduce((acc, item) => {
            const price = parseFloat(item.discounted_price?.replace(/,/g, '') || 0);
            return acc + (price * item.quantity);
        }, 0);
        
        const regTotal = regularItems.reduce((acc, item) => {
            const price = parseFloat(item.price?.replace(/,/g, '') || 0);
            return acc + (price * item.quantity);
        }, 0);
        
        // Add tax (13%)
        const agriWithTax = agriTotal * 1.13;
        const cashWithTax = regTotal * 1.13;
        const total = agriWithTax + cashWithTax;
        
        return {
            agriCashItems: agriItems,
            cashItems: regularItems, 
            agriCashTotal: agriWithTax,
            cashTotal: cashWithTax,
            grandTotal: total
        };
    }, [cartItems]);

    // Format numbers with commas
    const formatNumber = (num) => new Intl.NumberFormat("en-US").format(num?.toFixed(2) ?? 0);

    // Calculate remaining credit
    const remainingCredit = CREDIT_LIMIT - agriCashTotal;

    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method);
        // Store selected payment method
        storage.set("selectedPaymentMethod", method);
    };

    const handleProceed = () => {
        // Store the selected payment method before navigating
        storage.set("selectedPaymentMethod", selectedPaymentMethod);
        navigation.navigate(ScreensName.RaastPaymentScreen);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.searchContainer}>
                    <CustomSearchApp placeholder={t("Search in here")} value="" onChangeText={() => {}} />
                </View>
                
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>{t("Payment Methods")}</Text>
                </View>

                {/* Summary section */}
                <View style={styles.summaryContainer}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>{t("Grand Total")}</Text>
                        <Text style={styles.totalValue}>PKR {formatNumber(grandTotal)}</Text>
                    </View>
                    
                    {/* Divider */}
                    <View style={styles.divider}></View>
                    
                    {agriCashItems.length > 0 && (
                        <View style={styles.totalRow}>
                            <Text style={styles.subtotalLabel}>{t("Agri-Cash Items")}</Text>
                            <Text style={styles.subtotalValue}>PKR {formatNumber(agriCashTotal)}</Text>
                        </View>
                    )}
                    
                    {cashItems.length > 0 && (
                        <View style={styles.totalRow}>
                            <Text style={styles.subtotalLabel}>{t("Cash Items")}</Text>
                            <Text style={styles.subtotalValue}>PKR {formatNumber(cashTotal)}</Text>
                        </View>
                    )}
                </View>

                {/* Agri-Cash section - only show if there are Agri-Cash items */}
                {agriCashItems.length > 0 && (
                    <View style={styles.paymentSection}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>{t("Agri-Cash Payment")}</Text>
                        </View>
                        
                        <View style={styles.creditInfoContainer}>
                            <Text style={styles.creditInfoText}>
                                {t("Credit Limit")}: PKR {formatNumber(CREDIT_LIMIT)}
                            </Text>
                            <Text style={styles.creditInfoText}>
                                {t("Remaining Credit")}: PKR {formatNumber(remainingCredit)}
                            </Text>
                        </View>
                        
                        <View style={styles.paymentOption}>
                            <View style={styles.paymentRadioContainer}>
                                <RadioButton
                                    value="LineOfCredit"
                                    status="checked"
                                    color={colors.GREEN}
                                    disabled
                                />
                                <Text style={styles.paymentOptionText}>{t("Line of Credit")}</Text>
                            </View>
                            
                            <View style={styles.paymentImageContainer}>
                                <Image 
                                    source={Wallet} 
                                    style={styles.paymentOptionImage} 
                                    resizeMode="contain"
                                />
                            </View>
                            
                            <Text style={styles.paymentAmountText}>
                                PKR {formatNumber(agriCashTotal)}
                            </Text>
                        </View>
                    </View>
                )}

                {/* Cash Payment Section - only show if there are Cash items */}
                {cashItems.length > 0 && (
                    <View style={styles.paymentSection}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>{t("Cash Payment")}</Text>
                        </View>
                        
                        <View style={styles.defaultPaymentMethod}>
                            <View style={styles.paymentRadioContainer}>
                                <RadioButton
                                    value="Raast"
                                    status={selectedPaymentMethod === "Raast" ? "checked" : "unchecked"}
                                    onPress={() => handlePaymentMethodSelect("Raast")}
                                    color={colors.GREEN}
                                />
                                <Text style={styles.paymentOptionText}>{t("Raast")}</Text>
                            </View>
                            
                            {selectedPaymentMethod === "Raast" && (
                                <Text style={styles.paymentAmountText}>
                                    PKR {formatNumber(cashTotal)}
                                </Text>
                            )}
                        </View>
                        
                        <Text style={styles.changePaymentText}>{t("Or change payment method")}</Text>
                        
                        <Animated.View
                            style={[
                                styles.paymentMethodsGrid,
                                {
                                    transform: [{ translateY }],
                                    opacity: opacity,
                                },
                            ]}
                        >
                            {paymentMethods.map((method, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.paymentMethodButton,
                                        selectedPaymentMethod === method.name && styles.selectedPaymentMethod,
                                    ]}
                                    onPress={() => handlePaymentMethodSelect(method.name)}
                                >
                                    <View style={styles.paymentMethodImageWrapper}>
                                        {typeof method.image === "function" ? (
                                            <method.image
                                                width={wp(16)}
                                                height={hp(8)}
                                                style={styles.paymentMethodImage}
                                            />
                                        ) : (
                                            <Image
                                                source={method.image}
                                                style={styles.paymentMethodImage}
                                                resizeMode="contain"
                                            />
                                        )}
                                    </View>
                                    <Text style={styles.paymentMethodName}>{method.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </Animated.View>
                    </View>
                )}

                {/* Proceed Button */}
                <View style={styles.buttonContainer}>
                    <CustomButton
                        MainText={t("Proceed")}
                        BgGiven={colors.GREEN}
                        txColor={colors.WHITE}
                        onPressG={handleProceed}
                    />
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
        height: hp("8.2%"),
        backgroundColor: colors.LIGHT_GRAY,
        marginTop: hp("0.14%"),
        justifyContent: "center",
        alignItems: "center",
    },
    searchContainer: {
        marginVertical: hp("3.2%"),
        height: hp("7%"),
        marginHorizontal: wp(4),
    },
    headerContainer: {
        marginBottom: hp(2),
        marginHorizontal: wp(5),
    },
    headerText: {
        fontFamily: fonts.SemiBold,
        fontSize: hp(2.9),
        color: colors.BLACK,
    },
    summaryContainer: {
        marginHorizontal: wp(5),
        borderRadius: hp(1),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        padding: wp(4),
        marginBottom: hp(3),
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: hp(0.5),
    },
    totalLabel: {
        fontFamily: fonts.Bold,
        fontSize: hp(2.2),
        color: colors.GREEN,
    },
    totalValue: {
        fontFamily: fonts.Bold,
        fontSize: hp(2.2),
        color: colors.BLACK,
    },
    subtotalLabel: {
        fontFamily: fonts.Medium,
        fontSize: hp(1.8),
        color: colors.BLACK,
    },
    subtotalValue: {
        fontFamily: fonts.Medium,
        fontSize: hp(1.8),
        color: colors.BLACK,
    },
    divider: {
        height: 1,
        backgroundColor: colors.GRAY,
        marginVertical: hp(1.5),
    },
    paymentSection: {
        marginHorizontal: wp(5),
        marginBottom: hp(3),
        backgroundColor: colors.WHITE,
        borderRadius: hp(1),
        padding: wp(4),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
    },
    sectionHeader: {
        marginBottom: hp(2),
    },
    sectionTitle: {
        fontFamily: fonts.SemiBold,
        fontSize: hp(2.2),
        color: colors.BLACK,
    },
    creditInfoContainer: {
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: hp(1),
        borderColor: colors.GREEN,
        borderWidth: 1,
        padding: wp(3),
        marginBottom: hp(2),
    },
    creditInfoText: {
        fontFamily: fonts.Medium,
        fontSize: hp(1.8),
        color: colors.BLACK,
        marginVertical: hp(0.3),
    },
    paymentOption: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.LIGHT_GREEN,
        borderColor: colors.GREEN,
        borderWidth: 1,
        borderRadius: hp(1),
        padding: wp(3),
    },
    paymentRadioContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    paymentOptionText: {
        fontFamily: fonts.Medium,
        fontSize: hp(1.8),
        color: colors.BLACK,
        marginLeft: wp(2),
    },
    paymentImageContainer: {
        width: wp(10),
        height: wp(10),
        justifyContent: "center",
        alignItems: "center",
    },
    paymentOptionImage: {
        width: "100%",
        height: "100%",
    },
    paymentAmountText: {
        fontFamily: fonts.SemiBold,
        fontSize: hp(1.8),
        color: colors.BLACK,
    },
    defaultPaymentMethod: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.LIGHT_GREEN,
        borderColor: colors.GREEN,
        borderWidth: 1,
         borderRadius: hp(1),
        padding: wp(3),
        marginBottom: hp(2),
    },
    changePaymentText: {
        fontFamily: fonts.Medium,
        fontSize: hp(1.8),
        color: colors.GRAY,
        marginVertical: hp(1.5),
        textAlign: "center",
    },
    paymentMethodsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
    },
    paymentMethodButton: {
        width: wp(28),
        height: hp(15),
        borderRadius: hp(1),
        backgroundColor: colors.WHITE,
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        padding: wp(2),
        marginBottom: hp(2),
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    selectedPaymentMethod: {
        borderColor: colors.GREEN,
        borderWidth: 2,
        elevation: 4,
    },
    paymentMethodImageWrapper: {
        width: wp(20),
        height: hp(8),
        justifyContent: "center",
        alignItems: "center",
        marginBottom: hp(1),
    },
    paymentMethodImage: {
        width: "100%",
        height: "100%",
    },
    paymentMethodName: {
        fontFamily: fonts.Medium,
        fontSize: hp(1.5),
        color: colors.BLACK,
        textAlign: "center",
    },
    buttonContainer: {
        marginHorizontal: wp(5),
        marginBottom: hp(5),
        alignSelf: "center",
    },
});

export default EOrderPaymentMethod;
