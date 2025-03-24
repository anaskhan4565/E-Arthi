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
    ActivityIndicator,
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
    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const storage = new MMKV();
    const Navigation = useNavigation();
    const DefaultEndPoint = "https://eagri-backend.vercel.app/e_market/products/";
    
    const fetchProducts = async (url) => {
        setIsLoading(true);
        try {
            // Get the authentication token from storage
            const token = storage.getString('token');
            console.log("the token is ",token)
            // Set up headers with authorization token
            const headers = {
                'Content-Type': 'application/json',
            };
            
            // Add Authorization header if token exists
            if (token) {
                headers['Authorization'] = `Token ${token}`;
            }
            console.log("Request Headers:", headers);

            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            });
            console.log("the response is ",response)
            if(response.status === 200){
                const data = await response.json();
                setProductData(data);
                console.log("the data is ",data)
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            // Use TopProducts as fallback if API fails
            setProductData(TopProducts);
        } finally {
            setIsLoading(false);
            console.log("the error is ",error)
        }
    };

    // Initial fetch when component mounts
    useEffect(() => {
        fetchProducts(DefaultEndPoint);
    }, []);

    // Fetch products when category changes
    useEffect(() => {
        if (selectedCategory) {
            const categoryEndpoint = `https://eagri-backend.vercel.app/e_market/products/by-category/?category=${selectedCategory}`;
            fetchProducts(categoryEndpoint);
        } else {
            fetchProducts(DefaultEndPoint);
        }
    }, [selectedCategory]);

    const { t } = useTranslation();

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

    // Load cart data when screen gains focus
    useFocusEffect(
        useCallback(() => {
            const savedCart = storage.getString("cart");
            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
        }, [])
    );

    const formatNumber = (num) => new Intl.NumberFormat("en-US").format(num ?? 0);

    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalCost = cart.reduce((sum, item) => sum + item.quantity * parseInt(item.price?.replace(/,/g, '') || 0), 0);

    // Filter products based on search query
    const filteredProducts = productData.filter((product) => 
        product.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearch = (query) => {
        setSearchQuery(query);
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
                                            save={(product.discounted_price) - product.price}
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