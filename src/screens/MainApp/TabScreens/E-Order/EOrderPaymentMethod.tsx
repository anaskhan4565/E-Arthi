import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar.jsx";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp.jsx";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/colors.js";
import { Image, TouchableOpacity } from "react-native";

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
import CustomButton from "../../../../components/CustomButton.jsx";
import { useNavigation } from "@react-navigation/native";
import { MMKV } from "react-native-mmkv";
const imageList = [
    require("../../../../assets/MainApp/E-Order/PaymentMethods/Raast.png"),
    require("../../../../assets/MainApp/E-Order/PaymentMethods/GPay.png"),
    require("../../../../assets/MainApp/E-Order/PaymentMethods/ApplePay.png"),
    require("../../../../assets/MainApp/E-Order/PaymentMethods/Debit.png"),
    require("../../../../assets/MainApp/E-Order/PaymentMethods/Master.png"),
    require("../../../../assets/MainApp/E-Order/PaymentMethods/VISA.png"),
];

function EOrderPlaceOrder(): React.JSX.Element {
    const { t } = useTranslation();
    const [selectedItem, setSelectedItem] = useState("Crop");
    const navigation = useNavigation();
    const formatNumber = (num) =>
        new Intl.NumberFormat("en-US").format(num ?? 0);
    const storage = new MMKV();
    const savedCart = storage.getString("cart");
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];

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
                            fontSize: hp(2.4),
                        }}
                    >
                        {t("Payment Methods")}
                    </Text>
                </View>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>{t("Total")}</Text>
                    <Text style={styles.amountText}>
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
                <View style={styles.imageGrid}>
                    {imageList.map((image, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.imageButton}
                        >
                            <View style={styles.imageWrapper}>
                                <Image source={image} style={styles.image} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.bodyContainer}></View>
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
    summaryText: {
        fontSize: hp(2.5),
        color: colors.DARK_GRAY,
        marginVertical: hp(1),
    },
    totalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: wp(5),
        marginBottom: hp(2),
    },
    totalText: {
        color: colors.GREEN,
        fontSize: hp(1.8),
        fontFamily: fonts.Bold,
    },
    amountText: {
        color: "#000",
        fontSize: hp(1.8),
        fontFamily: fonts.Bold,
    },
    imageGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginHorizontal: wp(5),
        marginVertical: wp(4),
        padding: wp(1),
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
