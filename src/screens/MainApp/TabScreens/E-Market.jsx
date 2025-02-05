import React, { useEffect, useState } from "react";
import ECategories from "../../../../util/E-Categories.js";
import Navbar from "../Navbar/Navbar.jsx";
import CustomSearchApp from "../CustomComponent/CustomSearchApp.jsx";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../util/colors.js";
import Categorybox from "../CustomComponent/Categorybox.jsx";
import ProductBox from "../CustomComponent/ProductBox.jsx";

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

// Import TopProducts as default
import TopProducts from "./EMarketPlaceProducts/TopProducts.js";

const EMarket = () => {
    const [qty, setqty] = useState(0);
    const [cost, setcost] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [productData, setProductData] = useState(TopProducts);

    const storage = new MMKV();

    // Category mapping
    const categoryFiles = {
        Herbicide: () => import("./EMarketPlaceProducts/Herbicide.js"),
        Labour: () => import("./EMarketPlaceProducts/Labour.js"),
        Machinery: () => import("./EMarketPlaceProducts/Machinery.js"),
        Seeds: () => import("./EMarketPlaceProducts/SeedsProducts.js"),
        Fertilizer: () => import("./EMarketPlaceProducts/Fertilizer.js"),
        Crops: () => import("./EMarketPlaceProducts/Crops.js"),
        Fungicide: () => import("./EMarketPlaceProducts/Fungicide.js"),
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


    useEffect(() => {
        setqty(storage.getNumber("qty") ? storage.getNumber("qty") : 0);
        setcost(storage.getNumber("cost") ? storage.getNumber("cost") : 0);
    }, []);

    const handleAddItem = (givePrice) => {
        setqty(qty + 1);
        setcost(cost + givePrice);
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
                                        onPressG={()=>handleAddItem(product.price)}
                    
                                    />
                                </View>
                            ))}
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
    

    productContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    
    productBoxWrapper: {
        width: "48%", // Ensures two products per row
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
    productRow: {
        flexDirection: "row",
        flexWrap: 'wrap',
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
        elevation: 5,
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
