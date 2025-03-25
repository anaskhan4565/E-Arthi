import React, { useCallback, useState } from "react";
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
    ActivityIndicator,
} from "react-native";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/Constants/FontName.js";
import { MMKV } from "react-native-mmkv";
import TopProducts from "../EMarketPlaceProducts/TopProducts.js";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ScreensName from "../../../../../util/Constants/ScreensName.ts";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsThunk } from '../../../../redux/emarketThunks.js';
import { setSelectedCategory, addToCart, setCart, setProducts } from '../../../../redux/emarketSlice';

const EMarket = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();
    const {
        products,
        loading: isLoading,
        selectedCategory,
        cart
    } = useSelector(state => state.emarket);
    const categoryEndpoints = {
        Seeds: "Seeds",
        Fertilizer: "Fertilizers",
        Herbicide: "Herbicides",
        Labour: "Labour",
        Machinery: "Machinery",
        Crops: "Crops",
        Fungicide: "Fungicides"
    };
    const storage = new MMKV();
    const Navigation = useNavigation();
    const { t } = useTranslation();
    const DefaultEndPoint = "https://eagri-backend.vercel.app/e_market/products/";

    React.useEffect(() => {
        const token = storage.getString("token");
        let endpoint = DefaultEndPoint;

        if (selectedCategory && categoryEndpoints[selectedCategory]) {
            endpoint = `https://eagri-backend.vercel.app/e_market/products/by-category/?category=${categoryEndpoints[selectedCategory]}`;
        }

        dispatch(fetchProductsThunk(endpoint, token));
    }, [selectedCategory, dispatch]);

    const handleCategorySelect = (category) => {
        if (selectedCategory === category) {
            dispatch(setProducts([]));
            dispatch(setSelectedCategory(""));
            return;
        }
        
        dispatch(setProducts([]));
        dispatch(setSelectedCategory(category));
    };

    const handleAddItem = (product) => {
        dispatch(addToCart(product));
        // Save to MMKV
        const updatedCart = [...cart, { ...product, quantity: 1 }];
        storage.set("cart", JSON.stringify(updatedCart));
    };

    useFocusEffect(
        useCallback(() => {
            const savedCart = storage.getString("cart");
            if (savedCart) {
                dispatch(setCart(JSON.parse(savedCart)));
            }
        }, [dispatch])
    );

    const formatNumber = (num) => new Intl.NumberFormat("en-US").format(num ?? 0);

    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalCost = cart.reduce((sum, item) =>
        sum + item.quantity * parseInt(item.price?.replace(/,/g, '') || 0), 0
    );

    const filteredProducts = products.filter((product) =>
        product.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    // const handleCategorySelect = (category) => {
    //     dispatch(setSelectedCategory(category));
    // };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.searchContainer}>
                    <CustomSearchApp
                        placeholder={t("Search in here")}
                        onChangeText={handleSearch}
                        value={searchQuery}
                    />
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
                                            setSelectedCategory={(category) => handleCategorySelect(Category.title)} // Use the exact category title
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

                        {isLoading ? (
                            <View style={styles.loaderContainer}>
                                <ActivityIndicator size="large" color={colors.GREEN} />
                                <Text style={styles.loaderText}>Loading products...</Text>
                            </View>
                        ) : filteredProducts.length > 0 ? (
                            <View style={styles.productContainer}>
                                {filteredProducts.map((product, index) => (
                                    <View style={styles.productBoxWrapper} key={index}>
                                        <ProductBox
                                            name={product.name}
                                            price={product.discounted_price}
                                            save={formatNumber(product.price - (product.discounted_price))}
                                            SourceGiven={product.image_url}
                                            old={product.price}
                                            isNavigation={0}
                                            onPressG={() => handleAddItem(product)}
                                        />
                                    </View>
                                ))}
                            </View>
                        ) : (
                            <View style={styles.noProductsContainer}>
                                <Text style={styles.noProductsText}>No products found</Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
            {cart.length > 0 && (
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
            )}
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
    loaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp(10),
    },
    loaderText: {
        marginTop: hp(2),
        fontSize: hp(1.8),
        fontFamily: fonts.Regular,
        color: colors.GRAY,
    },
    noProductsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp(10),
    },
    noProductsText: {
        fontSize: hp(2),
        fontFamily: fonts.SemiBold,
        color: colors.GRAY,
    },
});

export default EMarket;