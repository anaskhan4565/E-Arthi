import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    SafeAreaView,
} from "react-native";
import ButtonLess from "../../../assets/MainApp/EmarketPlace/Products/Buttons/LessButton.png";
import ButtonPlus from "../../../assets/MainApp/EmarketPlace/Products/Buttons/MoreButton.png";
import colors from "../../../../util/Constants/colors.js";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { fonts } from "../../../../util/Constants/FontName.js";
import HeartIcon from "../../../assets/MainApp/ProductScreen/Like.png";
import HeartFilledIcon from "../../../assets/MainApp/ProductScreen/likeF.png";

import { useNavigation } from "@react-navigation/native";
import Navbar from "../Navbar/Navbar";
import { MMKV } from "react-native-mmkv";

const ProductScr = () => {
    const [Count, SetCount] = useState(1);
    const [Price, setPrice] = useState(2080);
    const Navigation = useNavigation();
    const storage = new MMKV();
    const ProductClickInfo = new MMKV();
    const [isFavorite, setIsFavorite] = useState(false);

    const productData = ProductClickInfo.getString("selectedProduct");
    const ProductInfo = productData ? JSON.parse(productData) : null;
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = storage.getString("cart");
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }

    }, []);
    function configureCount(less) {
        let newCount = less ? Math.max(1, Count - 1) : Count + 1;
        SetCount(newCount);
    }

    const handleNotifyMe = () => {
        // Handle notification logic here
        console.log("Notify me for product:", ProductInfo?.name);
    };

    const handleAddtoCart = () => {
        if (!ProductInfo) return;

        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.name === ProductInfo.name);
            let updatedCart;
            if (existingItem) {
                updatedCart = prevCart.map((item) =>
                    item.name === ProductInfo.name ? { ...item, quantity: item.quantity + Count } : item
                );
            } else {
                updatedCart = [...prevCart, { ...ProductInfo, quantity: Count }];
            }

            storage.set("cart", JSON.stringify(updatedCart)); // Save to MMKV storage
            return updatedCart;
        });
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        console.log("New quantity:", totalQuantity);
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#f5f9f9" barStyle="dark-content" />

            {/* Custom Header */}
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>

            <ScrollView style={styles.scrollContainer}>
                {ProductInfo ? (
                    <View style={styles.productContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.productTitle}>
                                {ProductInfo.name || "Sona Urea"}
                            </Text>
                            <View style={styles.stockAndFavorite}>
                                <View style={styles.outOfStockBadge}>
                                    <Text style={styles.outOfStockText}>Out of Stock</Text>
                                </View>
                                <TouchableOpacity onPress={toggleFavorite}>
                                    <Image
                                        source={isFavorite ? HeartFilledIcon : HeartIcon}
                                        style={styles.favoriteIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: ProductInfo.SourceGiven }}
                                style={styles.productImage}
                            />
                        </View>

                        <View style={styles.infoCard}>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Vendor Name:</Text>
                                <Text style={styles.infoValue}>Fauji Fertilizers</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Category:</Text>
                                <Text style={styles.infoValue}>{ProductInfo.category}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Price:</Text>
                                <Text style={styles.infoValue}>Rs {ProductInfo.price || 4850}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Pack Size:</Text>
                                <Text style={styles.infoValue}>{ProductInfo.weight} Kg</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Expected Available Date:</Text>
                                <Text style={styles.infoValue}>Coming Soon</Text>
                            </View>

                            <View style={styles.quantityAndNotify}>
                                <View style={styles.quantityContainer}>
                                    <TouchableOpacity
                                        onPress={() => configureCount(true)}
                                        style={styles.quantityButton}
                                    >
                                        <Text style={styles.quantityButtonText}>−</Text>
                                    </TouchableOpacity>

                                    <Text style={styles.quantityText}>
                                        {Count < 10 ? "0" + Count : Count}
                                    </Text>

                                    <TouchableOpacity
                                        onPress={() => configureCount(false)}
                                        style={[styles.quantityButton, styles.plusButton]}
                                    >
                                        <Text style={styles.quantityButtonText}>+</Text>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    style={styles.notifyButton}
                                    onPress={handleNotifyMe}
                                >
                                    <Text style={styles.notifyButtonText}>Notify Me</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.descriptionContainer}>
                            <Text style={styles.descriptionTitle}>Product Description:</Text>
                            <Text style={styles.descriptionText}>
                               {ProductInfo.Description}
                            </Text>
                        </View>
                    </View>
                ) : (
                    <View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>Loading product information...</Text>
                    </View>
                )}
            </ScrollView>

            {/* Bottom Tab Bar */}
           
        </SafeAreaView>
    );
};

export default ProductScr;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.5),
        backgroundColor: '#f5f9f9',
    },
    headerIcon: {
        width: wp(7),
        height: wp(7),
        resizeMode: 'contain',
    },
    logoIcon: {
        width: wp(10),
        height: wp(7),
        resizeMode: 'contain',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginLeft: wp(3),
    },
    scrollContainer: {
        flex: 1,
    },
    productContainer: {
        padding: wp(4),
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(2),
    },
    productTitle: {
        fontSize: wp(6),
        fontWeight: 'bold',
        color: '#000',
        flex: 1,
    },
    stockAndFavorite: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    outOfStockBadge: {
        backgroundColor: '#ff3b30',
        paddingHorizontal: wp(2),
        paddingVertical: wp(1),
        borderRadius: wp(1),
        marginRight: wp(2),
    },
    outOfStockText: {
        color: '#fff',
        fontSize: wp(3),
        fontWeight: 'bold',
    },
    favoriteIcon: {
        width: wp(7),
        height: wp(7),
        resizeMode: 'contain',
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: hp(2),
    },
    productImage: {
        width: wp(50),
        height: wp(50),
        resizeMode: 'contain',
    },
    infoCard: {
        backgroundColor: '#f5f9f9',
        borderRadius: wp(3),
        padding: wp(4),
        marginBottom: hp(3),
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: hp(1),
    },
    navbarContainer: {
        height: hp("8.2%"),
        backgroundColor: "white",
        marginTop: hp("0.14%"),
    },
    infoLabel: {
        fontSize: wp(3.8),
        color: '#000',
        fontWeight: '600',
        marginRight: wp(2),
        minWidth: wp(30),
    },
    infoValue: {
        fontSize: wp(3.8),
        color: '#000',
        flex: 1,
    },
    quantityAndNotify: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp(2),
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        width: wp(8),
        height: wp(8),
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(1),
    },
    plusButton: {
        backgroundColor: '#09c18c',
    },
    quantityButtonText: {
        fontSize: wp(5),
        fontWeight: 'bold',
        color: '#000',
    },
    quantityText: {
        fontSize: wp(4.5),
        fontWeight: 'bold',
        marginHorizontal: wp(3),
    },
    notifyButton: {
        backgroundColor: '#09c18c',
        paddingHorizontal: wp(4),
        paddingVertical: hp(1),
        borderRadius: wp(1),
    },
    notifyButtonText: {
        color: '#fff',
        fontSize: wp(3.8),
        fontWeight: 'bold',
    },
    descriptionContainer: {
        marginBottom: hp(10),
    },
    descriptionTitle: {
        fontSize: wp(4.5),
        fontWeight: 'bold',
        color: '#000',
        marginBottom: hp(1),
    },
    descriptionText: {
        fontSize: wp(3.8),
        lineHeight: wp(5.5),
        color: '#333',
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: hp(1.5),
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabIcon: {
        width: wp(6),
        height: wp(6),
        resizeMode: 'contain',
        tintColor: '#09c18c',
    },
    tabText: {
        fontSize: wp(3),
        color: '#09c18c',
        marginTop: hp(0.5),
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp(4),
    },
    loadingText: {
        fontSize: wp(4),
        color: '#666',
    },
});