import React, { useEffect, useRef, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    Image
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
import { useNavigation, useRoute } from "@react-navigation/native";

import Navbar from "../../Navbar/Navbar.jsx";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp.jsx";
import CustomButton from "../../../../components/CustomButton.jsx";
import colors from "../../../../../util/Constants/colors.js";
import { fonts } from "../../../../../util/Constants/FontName.js";
import ScreensName from "../../../../../util/Constants/ScreensName.ts";

// Import SVG assets
const VISA = require("../../../../assets/MainApp/E-Order/PaymentMethods/VISA.png");
const MASTER = require("../../../../assets/MainApp/E-Order/PaymentMethods/Master.png");
const DEBIT = require("../../../../assets/MainApp/E-Order/PaymentMethods/Debit.png");
const APPLEPAY = require("../../../../assets/MainApp/E-Order/PaymentMethods/ApplePay.png");
const GOOGLEPAY = require("../../../../assets/MainApp/E-Order/PaymentMethods/GPay.png");
const RAAST = require("../../../../assets/MainApp/E-Order/PaymentMethods/Raast.png");

const paymentMethods = [
    { name: "VISA", image: VISA },
    { name: "AMEX", image: MASTER },
    { name: "MasterCard", image: MASTER },
    { name: "DEBIT", image: DEBIT },
    { name: "Apple Pay", image: APPLEPAY },
    { name: "Google Pay", image: GOOGLEPAY },
    { name: "Raast", image: RAAST }
];

function AuctionHistoryPaymentMethod() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const route = useRoute();
    const { auctionData } = route.params || { auctionData: { startPrice: "2430" } };
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("VISA");

    // Animation refs
    const translateY = useRef(new Animated.Value(hp(20))).current;
    const opacity = useRef(new Animated.Value(0)).current;

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

    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method);
    };

    const handleProceed = () => {
        // Navigate to Raast payment screen or handling the payment
        navigation.navigate(ScreensName.RaastPaymentScreen);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar hasBackButton={true} />
            </View>

            <View style={styles.searchContainer}>
                <CustomSearchApp placeholder={t("Search in here")} />
            </View>

            <View style={styles.content}>
                <Text style={styles.pageTitle}>{t("Payment Method")}</Text>

                <View style={styles.totalAmountContainer}>
                    <Text style={styles.totalLabel}>{t("Total")}</Text>
                    <Text style={styles.totalAmount}>PKR {auctionData.startPrice}</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
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
                                    <Image
                                        source={method.image}
                                        style={styles.paymentMethodImage}
                                        resizeMode="contain"
                                    />
                                </View>
                                <Text style={styles.paymentMethodName}>{method.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </Animated.View>
                </ScrollView>

                <View style={styles.buttonContainer}>
                    <CustomButton
                        name="Proceed"
                        MainText={t("Proceed")}
                        BgGiven={colors.GREEN}
                        txColor={colors.WHITE}
                        onPressG={handleProceed}
                        isNavigation={false}
                        b_end_only={false}
                    />
                </View>
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
        height: hp("8.5%"),
        backgroundColor: colors.WHITE,
        // borderBottomWidth: 1,
        // borderBottomColor: colors.LIGHT_GRAY,
    },
    searchContainer: {
        marginTop: hp("2%"),
        height: hp("7%"),
        marginHorizontal: hp(2),
    },
    content: {
        flex: 1,
        padding: hp(2.5),
    },
    pageTitle: {
        fontSize: hp(3),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp(2),
    },
    totalAmountContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.LIGHT_BLUE,
        borderRadius: hp(1),
        padding: hp(2),
        marginBottom: hp(3),
        backgroundColor: colors.LIGHT_BLUE_BACKGROUND,
    },
    totalLabel: {
        fontSize: hp(2.2),
        fontFamily: fonts.SemiBold,
        color: colors.GREEN,
    },
    totalAmount: {
        fontSize: hp(2.2),
        fontFamily: fonts.Bold,
        color: colors.BLACK,
    },
    paymentMethodsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: hp(2),
    },
    paymentMethodButton: {
        width: wp(43),
        height: hp(17),
        borderRadius: hp(1),
        backgroundColor: colors.WHITE,
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        padding: wp(3),
        marginBottom: hp(2.5),
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
        width: wp(30),
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
        fontSize: hp(1.8),
        color: colors.BLACK,
        textAlign: "center",
    },
    buttonContainer: {
        marginHorizontal: wp(5),
        marginBottom: hp(3),
        alignSelf: "center",
    },
});

export default AuctionHistoryPaymentMethod; 