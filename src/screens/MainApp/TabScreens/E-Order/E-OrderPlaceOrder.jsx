import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../../Navbar/Navbar.jsx";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp.jsx";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/Constants/colors.js";

import {
    SafeAreaView,
    ScrollView,
    TextInput,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/Constants/FontName.js";
import ScreensName from "../../../../../util/Constants/ScreensName.ts";
import CustomButton from "../../../../components/CustomButton.jsx";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import InventoryProduct from "../../CustomComponent/InventoryComponents/InventoryProduct.jsx";
import {
    crops,
    seeds,
    medicines,
    machinery,
    fertilizers,
    herbicides,
} from "../../../../../util/Data/E-Order.js";
import Crops from "../EMarketPlaceProducts/Crops.js";
import Fertilizer from "../EMarketPlaceProducts/Fertilizer.js";
import Herbicide from "../EMarketPlaceProducts/Herbicide.js";
import Machinery from "../EMarketPlaceProducts/Machinery.js";
import Medicine from "../EMarketPlaceProducts/Medicine.js";
import SeedsProducts from "../EMarketPlaceProducts/SeedsProducts.js";
import { MMKV } from "react-native-mmkv";

const EOrderPlaceOrder = () => {
    const { t } = useTranslation();
    const [selectedItem, setSelectedItem] = useState("Crop");
    const navigation = useNavigation();
    const [cart, setCart] = useState([]);

    const [qty, setqty] = useState(0);
    const [cost, setcost] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("");
    // const [productData, setProductData] = useState(TopProducts);

    const items = [
        "Crop",
        "Seeds",
        "Medicines",
        "Machinery",
        "Fertilizers",
        "Herbicide",
    ];

    const storage = new MMKV();

    const categoryMap = {
        Crop: Crops,
        Seeds: SeedsProducts,
        Medicines: Medicine,
        Machinery: Machinery,
        Fertilizers: Fertilizer,
        Herbicide: Herbicide,
    };

    const selectedProducts = categoryMap[selectedItem] || [];


    useEffect(() => {
        setqty(storage.getNumber("qty") ? storage.getNumber("qty") : 0);
        setcost(storage.getNumber("cost") ? storage.getNumber("cost") : 0);
    }, []);

    // const handleAddItem = (givePrice) => {
    //     setqty((prevQty) => {
    //         const newQty = prevQty + 1;
    //         storage.set("qty", newQty);
    //         return newQty;
    //     });

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


        // setcost((prevCost) => {
        //     const newCost = prevCost + givePrice;
        //     storage.set("cost", newCost);
        //     return newCost;
        // });
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
                    <View style={styles.headerRow}>
                        <Text style={styles.headerText}>
                            {t("Place Order")}
                        </Text>
                    </View>

                    {/* Category Selector */}
                    <View style={styles.selectercontainer}>
                        {items.map((item) => (
                            <TouchableOpacity
                                key={item}
                                style={[
                                    styles.itemBox,
                                    selectedItem === item && styles.selectedBox,
                                ]}
                                onPress={() => setSelectedItem(item)}
                            >
                                <Text
                                    style={[
                                        styles.itemText,
                                        selectedItem === item &&
                                        styles.selectedText,
                                    ]}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Render Products Based on Selected Category */}
                    <View style={styles.recommendedProducts}>
                        <View style={styles.productRow}>
                            {selectedProducts.map((product, index) => (
                                <InventoryProduct
                                    key={index}
                                    name={product.title}
                                    price={product.price}
                                    isNavigation={0}
                                    description={product.name}
                                    AddIcon={true}
                                    onPressG={() =>
                                        handleAddItem(product)
                                    }
                                    navigateTo={undefined}
                                />
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.cartWrapper}>
                <TouchableOpacity
                    style={styles.cartButton}
                    onPress={() => navigation.navigate(ScreensName.EOrderMainStack, { screen: ScreensName.EOrderCheckout })}
                >
                    <Text style={styles.cartText}>
                        {totalQuantity} Items . PKR {formatNumber(totalCost)}
                    </Text>
                    <Text style={styles.cartText}>Buy Now</Text>
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
    navbarContainer: {
        height: hp("8.2%"),
        backgroundColor: "white",
        marginTop: hp("0.14%"),
    },
    searchContainer: {
        marginVertical: hp("3.2%"),
        height: hp("7%"),
    },
    bodyContainer: {
        alignItems: "center",
        marginBottom: hp(4),
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
        flex: 0.5,
        marginTop: hp(-3),
        flexDirection: "row",
        marginLeft: wp(5),
        width: wp(100),
    },
    headerTextWrapper: {
        flex: 0.7,
        marginLeft: wp(6),
    },
    headerText: {
        fontWeight: "bold",
        fontSize: hp(3),
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
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom: hp("3%"),
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

export default EOrderPlaceOrder;