import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../Navbar/Navbar.jsx";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp.jsx";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/colors.js";
import { Animated, Image, TouchableOpacity } from "react-native";

import {
    SafeAreaView,
    ScrollView,
    TextInput,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/FontName.js";
import ScreensName from "../../../../../util/ScreensName.ts";
import { useNavigation } from "@react-navigation/native";
import { MMKV } from "react-native-mmkv";
import RAAST from '../../../../assets/MainApp/E-Order/PaymentMethods/Raast.png'
import DEBIT from '../../../../assets/MainApp/E-Order/PaymentMethods/Debit.png'
import MASTER from '../../../../assets/MainApp/E-Order/PaymentMethods/Master.png'
import VISA from '../../../../assets/MainApp/E-Order/PaymentMethods/VISA.png'
import AGRICARD from '../../../../assets/MainApp/E-Order/PaymentMethods/AgriCard.png'
import KISSANCARD from '../../../../assets/MainApp/E-Order/PaymentMethods/KisaanCard.png'
import InventoryProduct from "../../CustomComponent/WarehouseProduct.jsx";
import Wallet from './TempImgsOrder/image.png'
const paymentMethods = [
    { name: "Raast", image: RAAST },
    { name: "Debit Card", image: DEBIT },
    { name: "MasterCard", image: MASTER },
    { name: "VISA", image: VISA },
    { name: "Agri Card", image: AGRICARD },
    { name: "Kisaan Card", image: KISSANCARD },
];
function EOrderPlaceOrder(): React.JSX.Element {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const formatNumber = (num) =>
        new Intl.NumberFormat("en-US").format(num ?? 0);
    const storage = new MMKV();
    const savedCart = storage.getString("cart");
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];

    const PassedPayment = new MMKV();

    const NavigateToPayment = (passed) => {
        PassedPayment.set("PassedName", passed.name);
        PassedPayment.set("PassedImage", passed.image);

        navigation.navigate(ScreensName.RaastPaymentScreen)
    }


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



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.searchContainer}>
                    <CustomSearchApp placeholder={t("Search in here")} />
                </View>
                <View
                    style={{
                        marginBottom: hp(1.2),
                        marginTop: hp(0),
                        marginHorizontal: wp(5),
                    }}
                >
                    <Text
                        style={{
                            fontFamily: fonts.SemiBold,
                            fontSize: hp(2.9),
                            marginLeft: hp(1)
                        }}
                    >
                        {t("Payment Methods")}
                    </Text>
                </View>

                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>{t("Total")}</Text>
                    <Text style={styles.amountText}> PKR{'\u00A0'}
                        {formatNumber(
                            (
                                parsedCart.reduce(
                                    (acc, product) =>
                                        acc +
                                        parseInt(
                                            product.price.replace(/,/g, "")
                                        ) *
                                        product.quantity,
                                    0
                                ) * 1.13
                            ).toFixed(2)
                        )}
                    </Text>
                </View>
                <View style={{ flex: 1, marginLeft: hp(2) }}>
                    <Text style={{ fontSize: 20, fontFamily: fonts.Bold }}>Pay with your Card</Text>
                </View>
                <Animated.View style={[styles.imageGrid, {
                    transform: [{ translateY }], opacity
                }]}>
                    {paymentMethods.map((each, index) => (
                        <TouchableOpacity
                            onPress={() => NavigateToPayment(each)}
                            key={index}
                            style={styles.imageButton}
                        >
                            <View style={styles.imageWrapper}>
                                <Image source={each.image} style={styles.image} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </Animated.View>
                <View style={{ flex: 1, marginLeft: hp(2),marginBottom:hp(4) }}>
                    <Text style={{ fontSize: 20, fontFamily: fonts.Bold }}>Other options</Text>
                    <InventoryProduct
                        key={1}
                        name={"Line of credit"}
                        //price={product.price}
                        isNavigation={false}
                        AddIcon={true}
                        customImg={Wallet}
                        imgH={hp(4.6)}
                        navigateTo={undefined}
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
    },
    bodyContainer: {
        alignItems: "center",
        marginBottom: hp(4),
        padding: wp(5),

    },
    selectercontainer: {
        width: wp(100),
        height: hp(15),
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: hp(1),
    },
    headerRow: {
        marginTop: hp(2),
        marginBottom: hp(2),
    },
    headerText: {
        fontWeight: "bold",
        fontSize: hp(3),
        color: colors.DARK_GRAY,
    },

    itemBox: {
        width: wp(30),
        height: hp(5),
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#D3D3D3",
        borderRadius: 8,
        marginVertical: hp(0.5),
        marginHorizontal: wp(1),
    },
    selectedBox: {
        borderColor: colors.GREEN,
    },
    itemText: {
        color: "#000",
        fontSize: hp(2),
    },
    selectedText: {
        color: colors.GREEN,
        fontWeight: "bold",
    },
    recommendedProducts: {
        marginTop: hp("2%"),
        marginLeft: wp(2),
    },
    recommendedTitle: {
        fontSize: hp("3%"),
        fontFamily: fonts.SemiBold,
        marginBottom: hp("2%"),
    },
    productRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: hp("3%"),
        padding: wp(3),
        borderRadius: 10,
        backgroundColor: colors.LIGHT_BLUE,
        width: "100%",
    },
    productText: {
        color: colors.PRIMARY,
        fontSize: hp(2.5),
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: wp(30),
    },
    quantityButton: {
        backgroundColor: colors.PRIMARY,
        borderRadius: 5,
        padding: wp(2),
        marginHorizontal: wp(1),
        alignItems: "center",
    },
    quantityText: {
        fontSize: hp(2),
        color: colors.WHITE,
    },
    notesContainer: {
        marginTop: hp(3),
        width: "100%",
    },
    notesInput: {
        borderColor: colors.GRAY,
        borderWidth: 1,
        borderRadius: 5,
        padding: wp(2),
        height: hp(10),
        textAlignVertical: "top", // Ensures text starts at the top
    },
    summaryContainer: {
        marginTop: hp(3),
        width: "100%",
        padding: wp(3),
        borderRadius: 5,
    },

    totalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: wp(4),
        marginBottom: hp(2),
        borderBottomWidth: 1
    },
    totalText: {
        color: colors.GREEN,
        fontSize: hp(2),
        marginLeft: hp(2),
        fontFamily: fonts.Bold,
    },
    amountText: {
        color: "#000",
        fontSize: hp(2),
        marginRight: hp(2),
        fontFamily: fonts.Bold,
    },
    imageGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        padding: hp(1),
        backgroundColor: '#F4FEFF',
        margin: hp(2),
        borderRadius: hp(0.9)
        // marginBottom: hp(2),
        // maxHeight: hp(30),
    },
    imageButton: {
        width: wp(42),
        height: hp(10),
        marginBottom: hp(4),
        borderRadius: 8,
        backgroundColor: colors.WHITE,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    imageWrapper: {
        borderRadius: 8,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
});

export default EOrderPlaceOrder;
