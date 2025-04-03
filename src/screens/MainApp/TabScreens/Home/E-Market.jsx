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
    Alert,
    Animated,
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
    const [activeTab, setActiveTab] = useState('products');
    const [tabIndicatorPosition] = useState(new Animated.Value(0));
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
    const storage = new MMKV();
    const AGRI_CASH_LIMIT = 100000; // 1 Lakh rupees

    const {
        products,
        loading: isLoading,
        selectedCategory,
        cart
    } = useSelector(state => state.emarket);
    const categoryEndpoints = {
        Seeds: "Seeds",
        Fertilizers: "Fertilizers",
        Herbicide: "Herbicides",
        Labour: "Labour",
        Machinery: "Machinery",
        Crops: "Crops",
        Fungicide: "Fungicides"
    };
    const Navigation = useNavigation();
    const { t } = useTranslation();
    const DefaultEndPoint = "https://eagri-backend.vercel.app/e_market/products/";

    // Mock data for counts - will be replaced with API data later
    const favoritesCount = 0;
    const notifiedCount = 0;

    React.useEffect(() => {
        const token = storage.getString("token");
        console.log("token", token);
        let endpoint = DefaultEndPoint;

        if (selectedCategory && categoryEndpoints[selectedCategory]) {
            endpoint = `https://eagri-backend.vercel.app/e_market/products/by-category/?category=${categoryEndpoints[selectedCategory]}`;
        }

        dispatch(fetchProductsThunk(endpoint, token));
    }, [selectedCategory, dispatch]);

    const handleCategorySelect = (category) => {
        console.log("category", category);
        if (selectedCategory === category) {
            dispatch(setProducts([]));
            dispatch(setSelectedCategory(""));
            return;
        }
        
        dispatch(setProducts([]));
        dispatch(setSelectedCategory(category));
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN').format(price || 0);
    };

    const checkAgriCashLimit = (newItem, quantity = 1) => {
        const itemPrice = parseFloat(newItem.discounted_price?.replace(/,/g, '') || 0);
        const newItemTotal = itemPrice * quantity;

        // Calculate current cart total for Agri-Cash purchases
        const currentCartTotal = cart.reduce((sum, item) => {
            const itemPrice = parseFloat(item.discounted_price?.replace(/,/g, '') || 0);
            return sum + (itemPrice * item.quantity);
        }, 0);

        // Check if adding this item would exceed the limit
        return (currentCartTotal + newItemTotal) <= AGRI_CASH_LIMIT;
    };

    const handleAddItem = (product) => {
        if (product.stock_quantity === 0) {
            Alert.alert("Out of Stock", "This product is currently out of stock.");
            return;
        }
        if (product.stock_quantity < 0) {
            Alert.alert("Coming Soon", "This product is currently not listed.");
            return;
        }

        // Check Agri-Cash limit before adding
        if (!checkAgriCashLimit(product)) {
            Alert.alert(
                "Agri-Cash Limit Exceeded",
                `Adding this item would exceed your Agri-Cash limit of Rs ${formatPrice(AGRI_CASH_LIMIT)}.`
            );
            return;
        }

        const existingItemIndex = cart.findIndex(item => item.name === product.name);

        if (existingItemIndex !== -1) {
            // Update existing item
            const updatedCart = cart.map((item, index) => {
                if (index === existingItemIndex) {
                    // Check if increasing quantity would exceed limit
                    if (!checkAgriCashLimit(item, item.quantity + 1)) {
                        Alert.alert(
                            "Agri-Cash Limit Exceeded",
                            `Increasing quantity would exceed your Agri-Cash limit of Rs ${formatPrice(AGRI_CASH_LIMIT)}.`
                        );
                        return item;
                    }
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            dispatch(setCart(updatedCart));
            storage.set("cart", JSON.stringify(updatedCart));
        } else {
            // Add new item
            const updatedCart = [...cart, { ...product, quantity: 1 }];
            dispatch(setCart(updatedCart));
            storage.set("cart", JSON.stringify(updatedCart));
        }
    };

    useFocusEffect(
        useCallback(() => {
            const savedCart = storage.getString("cart");
            if (savedCart) {
                dispatch(setCart(JSON.parse(savedCart)));
            }
        }, [dispatch])
    );

    const formatNumber = (num) => {
        if (!num) return "0";
        return new Intl.NumberFormat("en-IN").format(num);
    };

    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalCost = cart.reduce((sum, item) => {
        const price = parseFloat(item.discounted_price?.replace(/,/g, '') || 0);
        return sum + (price * item.quantity);
    }, 0);

    const filteredProducts = products.filter((product) =>
        product.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleTabPress = (tab) => {
        setActiveTab(tab);
        const position = tab === 'products' ? 0 : tab === 'favorites' ? 1 : 2;
        Animated.spring(tabIndicatorPosition, {
            toValue: position,
            useNativeDriver: true,
        }).start();
    };

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
                                            setSelectedCategory={(category) => handleCategorySelect(Category.title)}
                                            OnpressCustom={true}
                                        />
                                    </View>
                                )
                        )}
                    </View>

                    <View style={styles.tabsContainer}>
                        <View style={styles.tabsWrapper}>
                            <TouchableOpacity 
                                style={[styles.tab, activeTab === 'products' && styles.activeTab]} 
                                onPress={() => handleTabPress('products')}
                            >
                                <Text style={[styles.tabText, activeTab === 'products' && styles.activeTabText]}>
                                    Products
                                </Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={[styles.tab, activeTab === 'favorites' && styles.activeTab]} 
                                onPress={() => handleTabPress('favorites')}
                            >
                                <Text style={[styles.tabText, activeTab === 'favorites' && styles.activeTabText]}>
                                    Favorites ({favoritesCount})
                                </Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={[styles.tab, activeTab === 'notified' && styles.activeTab]} 
                                onPress={() => handleTabPress('notified')}
                            >
                                <Text style={[styles.tabText, activeTab === 'notified' && styles.activeTabText]}>
                                    Notified ({notifiedCount})
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Animated.View 
                            style={[
                                styles.tabIndicator,
                                {
                                    transform: [{
                                        translateX: tabIndicatorPosition.interpolate({
                                            inputRange: [0, 1, 2],
                                            outputRange: [0, wp(33.33), wp(66.66)],
                                        })
                                    }]
                                }
                            ]}
                        />
                    </View>

                    <View style={styles.recommendedProducts}>
                        {activeTab === 'products' && (
                            <>
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
                                                    price={product.price}
                                                    discounted_price={product.discounted_price}
                                                    SourceGiven={product.image_url}
                                                    category={product.category}
                                                    Description={product.description}
                                                    isNavigation={0}
                                                    stock_quantity={product.stock_quantity}
                                                    weight={product.weight}
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
                            </>
                        )}

                        {activeTab === 'favorites' && (
                            <View style={styles.centeredContent}>
                                <Text style={styles.recommendedTitle}>Favorite Products</Text>
                                {/* Favorites will be implemented later */}
                                <Text style={styles.placeholderText}>Your favorite products will appear here</Text>
                            </View>
                        )}

                        {activeTab === 'notified' && (
                            <View style={styles.centeredContent}>
                                <Text style={styles.recommendedTitle}>Notified Products</Text>
                                {/* Notified products will be implemented later */}
                                <Text style={styles.placeholderText}>Products you're notified about will appear here</Text>
                            </View>
                        )}
                    </View>
                    {errorMessage ? (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{errorMessage}</Text>
                        </View>
                    ) : null}
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
        marginTop: hp(1),
        gap: hp(1),
        justifyContent: "space-between",
        paddingHorizontal: wp(3),


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
        marginVertical: hp("2%"),
        height: hp("7%"),
        marginHorizontal: hp(2),
        alignSelf: "flex-start",
    },
    bodyContainer: {
        flex: 1,
    },
    titleContainer: {
        marginLeft: hp(1),
        marginBottom: hp(2),
    },
    titleText: {
        fontWeight: "bold",
        fontSize: hp(3),
        color: colors.BLACK,
        fontFamily: fonts.Bold,
    },
    scrollContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingVertical: hp("1%"),
        width: "100%",
        backgroundColor: colors.WHITE,
        borderRadius: 15,
        paddingHorizontal: hp(1),
        marginBottom: hp(2),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    itemBoxWrapper: {
        width: "22%",
        marginBottom: hp("2%"),
        alignItems: "center",
    },
    recommendedProducts: {
        marginTop: hp(1),
        marginBottom: hp(4),

    },
    recommendedTitle: {
        fontSize: hp("2.2%"),
        fontFamily: fonts.SemiBold,
        marginBottom: hp("2%"),
        color: colors.BLACK,
        marginLeft: hp(2),
    },
    cartWrapper: {
        position: "absolute",
        bottom: hp(2),
        left: 0,
        right: 0,
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: wp(5),
    },
    cartButton: {
        width: "100%",
        height: hp(5),
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: hp(1),
        alignItems: "center",
        backgroundColor: colors.GREEN,
        borderColor: colors.GREEN,
        paddingHorizontal: wp(5),
        maxWidth: wp(85),
    },
    cartText: {
        fontFamily: fonts.SemiBold,
        fontSize: hp(1.6),
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
        backgroundColor: colors.WHITE,
        borderRadius: 15,
        marginHorizontal: hp(2),
    },
    noProductsText: {
        fontSize: hp(2),
        fontFamily: fonts.SemiBold,
        color: colors.GRAY,
    },
    tabsContainer: {
        marginTop: hp(2),
        marginHorizontal: hp(1),
        marginBottom: hp(1),
    },
    tabsWrapper: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    tab: {
        flex: 1,
        paddingVertical: hp(1.5),
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: colors.GREEN,
    },
    tabText: {
        fontSize: wp(3.8),
        fontFamily: fonts.Regular,
        color: colors.GRAY,
    },
    activeTabText: {
        color: colors.GREEN,
        fontFamily: fonts.SemiBold,
    },
    tabIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: wp(33.33),
        height: 2,
        backgroundColor: colors.GREEN,
    },
    centeredContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: hp(10),
    },
    placeholderText: {
        fontSize: wp(3.5),
        color: colors.GRAY,
        textAlign: 'center',
        marginTop: hp(2),
    },
});

export default EMarket;