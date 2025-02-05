import React, { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import ECategories from "../../../../util/E-Categories";
import Navbar from "../Navbar/Navbar.jsx";
import CustomSearchApp from "../CustomComponent/CustomSearchApp.jsx";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../util/colors.js";
import Categorybox from "../CustomComponent/Categorybox.jsx";
import ProductBox from "../CustomComponent/ProductBox.jsx";

import Image1 from "../../../assets/MainApp/EmarketPlace/Products/prod1.png";
import Image2 from "../../../assets/MainApp/EmarketPlace/Products/prod2.png";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../util/FontName.js";
import { MMKV } from "react-native-mmkv";

function EMarket(): React.JSX.Element {
    const [qty, setqty] = useState(0);
    const [cost, setcost] = useState(0);
    const storage = new MMKV();

    useEffect(() => {
        setqty(storage.getNumber("qty") ? storage.getNumber("qty") : 0);
        setcost(storage.getNumber("cost") ? storage.getNumber("cost") : 0);
    }, []);

    const { t } = useTranslation();

    const handleAddItem = () => {
        setqty(qty+ 1);
        setcost(cost + 2300);
        storage.set("qty", qty);
        storage.set("cost", cost);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.searchContainer}>
                    <CustomSearchApp placeholder={t("Search in here")} />
                </View>
                <View style={styles.bodyContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>
                            {t("E-Agri Products")}
                        </Text>
                    </View>

                    <View style={styles.scrollContainer}>
                        {ECategories.map(
                            (Category, index) =>
                                Category.title.trim() !== "" && (
                                    <View
                                        style={styles.itemBoxWrapper}
                                        key={index}
                                    >
                                        <Categorybox
                                            name={t(Category.title)}
                                            SourceGiven={Category.img}
                                            isNavigation={0}
                                        />
                                    </View>
                                )
                        )}
                    </View>

                    <View style={styles.recommendedProducts}>
                        <Text style={styles.recommendedTitle}>
                            {t("Top Products")}
                        </Text>
                        <View style={styles.productRow}>
                            <ProductBox
                                name={"Agri-Protex"}
                                price={"2050"}
                                save={"1000"}
                                SourceGiven={Image1}
                                old={"3060"}
                                isNavigation={0}
                                onPressG={handleAddItem}
                            />
                            <ProductBox
                                name={"Agri-Protex"}
                                price={"2050"}
                                save={"1000"}
                                SourceGiven={Image2}
                                old={"3060"}
                                isNavigation={0}
                                onPressG={handleAddItem}
                            />
                        </View>
                        <View style={styles.productRow}>
                            <ProductBox
                                name={"Agri-Protex"}
                                price={"2050"}
                                save={"1000"}
                                SourceGiven={Image1}
                                old={"3060"}
                                isNavigation={0}
                                onPressG={handleAddItem}
                            />
                            <ProductBox
                                name={"Agri-Protex"}
                                price={"2050"}
                                save={"1000"}
                                SourceGiven={Image2}
                                old={"3060"}
                                isNavigation={0}
                                onPressG={handleAddItem}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.cartWrapper}>
                <View style={styles.cartFrosted}>
                    <TouchableOpacity style={styles.cartButton}>
                        <Text style={styles.cartText}>
                            {qty} Items . PKR {cost}
                        </Text>
                        <Text style={styles.cartText}>Buy Now</Text>
                    </TouchableOpacity>
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
        height: hp("8.2%"),
        backgroundColor: "white",
        marginTop: hp("0.14%"),
    },
    searchContainer: {
        marginVertical: hp("3.2%"),
        height: hp("7%"),
        marginLeft: hp(1),
        alignSelf: "flex-start",
    },
    bodyContainer: {
        flex: 1,
        margin: 20,
    },
    titleContainer: {
        marginLeft: hp(0.6),
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 25,
    },
    scrollContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between", // Spreads items evenly in each row
        paddingVertical: hp("2%"),
        width: "100%", // Ensures it spans the full width
    },
    itemBoxWrapper: {
        width: "22%", // Fits 4 items per row with proper spacing
        marginBottom: hp("2%"),
        alignItems: "center",
    },
    recommendedProducts: {
        marginTop: hp(2),
        marginBottom:hp(4)
    },
    recommendedTitle: {
        fontSize: hp("2.5%"),
        fontFamily: fonts.SemiBold,
        marginBottom: hp("2%"),
    },
    productRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    cartWrapper: {
        position: "absolute",
        bottom: hp(2),
        alignSelf: "center",
        width: wp(80),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, // Android shadow
    },
    cartButton: {
        width: "100%",
        height: hp(4.75),
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: hp(1),
        alignItems: "center",
        backgroundColor: colors.GREEN,
        borderColor: colors.GREEN,
        paddingHorizontal: wp(4),
    },
    cartText: {
        fontFamily: fonts.SemiBold,
        fontSize: hp(1.5),
        color: colors.WHITE,
    },
});

export default EMarket;
