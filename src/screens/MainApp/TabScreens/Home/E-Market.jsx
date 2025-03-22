import React, { useCallback, useEffect, useState } from "react";
import ECategories from "../../../../../util/Data/E-Categories.js";
import Navbar from "../../Navbar/Navbar.jsx";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp.jsx";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/Constants/colors.js";
import Categorybox from "../../CustomComponent/Categorybox.jsx";
import ProductBox from "../../CustomComponent/ProductBox.jsx";

import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/Constants/FontName.js";
import { MMKV } from "react-native-mmkv";

import TopProducts from "../EMarketPlaceProducts/TopProducts.js";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ScreensName from "../../../../../util/Constants/ScreensName.ts";

const EMarket = () => {
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [productData, setProductData] = useState(TopProducts);

    const storage = new MMKV();
    const Navigation = useNavigation();

    const categoryFiles = {
        Herbicide: () => import("../EMarketPlaceProducts/Herbicide.js"),
        Labour: () => import("../EMarketPlaceProducts/Labour.js"),
        Machinery: () => import("../EMarketPlaceProducts/Machinery.js"),
        Seeds: () => import("../EMarketPlaceProducts/SeedsProducts.js"),
        Fertilizer: () => import("../EMarketPlaceProducts/Fertilizer.js"),
        Crops: () => import("../EMarketPlaceProducts/Crops.js"),
        Fungicide: () => import("../EMarketPlaceProducts/Fungicide.js"),
    };

    useEffect(() => {
        if (selectedCategory && categoryFiles[selectedCategory]) {
            categoryFiles[selectedCategory]()
                .then((module) => setProductData(module.default))
                .catch((error) => {
                    console.error("Error loading category file:", error);
                    setProductData(TopProducts);
                });
        } else {
            setProductData(TopProducts);
        }
    }, [selectedCategory]);

    const { t } = useTranslation();

    // useEffect(() => {
    //     const savedCart = storage.getString("cart");
    //     if (savedCart) {
    //         setCart(JSON.parse(savedCart));
    //     }
    // }, []);

    const handleAddItem = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.name === product.name);
            let updatedCart;
            if (existingItem) {
                updatedCart = prevCart.map((item) =>
                    item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                updatedCart = [...prevCart, { ...product, quantity: 1 }];
            }

            storage.set("cart", JSON.stringify(updatedCart)); // Save to MMKV
            return updatedCart;
        });
    };

    useFocusEffect(
        useCallback(() => {
            // console.log("opens")
            const savedCart = storage.getString("cart");
            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
        }, [])
    )
    const formatNumber = (num) => new Intl.NumberFormat("en-US").format(num ?? 0);

    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)
    const totalCost = cart.reduce((sum, item) => sum + item.quantity * parseInt(item.price.replace(/,/g, '')), 0)

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
                                    <View style={styles.itemBoxWrapper} key={index}>
                                        <Categorybox
                                            name={t(Category.title)}
                                            SourceGiven={Category.img}
                                            isNavigation={false}
                                            selectedCategory={selectedCategory}
                                            setSelectedCategory={setSelectedCategory}
                                            OnpressCustom={true}
                                        />
                                    </View>
                                )
                        )}
                    </View>

                    <View style={styles.recommendedProducts}>
                        <Text style={styles.recommendedTitle}>
                            {selectedCategory || "Top Products"}
                        </Text>

                        <View style={styles.productContainer}>
                            {productData.map((product, index) => (
                                <View style={styles.productBoxWrapper} key={index}>
                                    <ProductBox
                                        name={product.name}
                                        price={product.price}
                                        save={product.save}
                                        SourceGiven={product.img}
                                        old={product.old}
                                        isNavigation={0}
                                        onPressG={() => handleAddItem(product)}
                                    />
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.cartWrapper}>
                <TouchableOpacity
                    style={styles.cartButton}
                    onPress={() => Navigation.navigate(ScreensName.EOrderMainStack, { screen: ScreensName.EOrderCheckout })}
                >
                    <Text style={styles.cartText}>
                        {totalQuantity} Items . PKR {formatNumber(totalCost)}
                    </Text>
                    <Text style={styles.cartText}>Buy Now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    productBoxWrapper: {
        width: "48%",
        marginBottom: 20,
    },
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
        justifyContent: "space-between",
        paddingVertical: hp("2%"),
        width: "100%",
    },
    itemBoxWrapper: {
        width: "22%",
        marginBottom: hp("2%"),
        alignItems: "center",
    },
    recommendedProducts: {
        marginTop: hp(2),
        marginBottom: hp(4),
    },
    recommendedTitle: {
        fontSize: hp("2.5%"),
        fontFamily: fonts.SemiBold,
        marginBottom: hp("2%"),
    },
    cartWrapper: {
        position: "absolute",
        bottom: hp(2),
        alignSelf: "center",
        width: wp(80),
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
