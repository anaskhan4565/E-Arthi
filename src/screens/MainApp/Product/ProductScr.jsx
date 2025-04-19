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
    ActivityIndicator,
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
    const [CashCount, SetCashCount] = useState(0);
    const [Price, setPrice] = useState(2080);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const Navigation = useNavigation();
    const storage = new MMKV();
    const ProductClickInfo = new MMKV();
    const [isFavorite, setIsFavorite] = useState(false);
    const [cart, setCart] = useState([]);

    const productData = ProductClickInfo.getString("selectedProduct");
    const ProductInfo = productData ? JSON.parse(productData) : null;
    console.log("ProductInfo infoss",ProductInfo.stock_quantity);
    useEffect(() => {
        const savedCart = storage.getString("cart");
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const isProductAvailable = ProductInfo?.stock_quantity > 0;
    const AGRI_CASH_LIMIT = 100000; // 1 Lakh rupees
    const MAX_AGRI_CASH_QUANTITY = 5; // Maximum quantity with Agri-Cash

    function configureCount(less, isCash = false) {
        if (!isProductAvailable) return;
        
        if (isCash) {
            let newCount = less ? Math.max(0, CashCount - 1) : CashCount + 1;
            SetCashCount(newCount);
        } else {
            let newCount = less ? Math.max(0, Count - 1) : Count + 1;
            
            if (newCount <= MAX_AGRI_CASH_QUANTITY) {
        SetCount(newCount);
                if (newCount < MAX_AGRI_CASH_QUANTITY) {
                    setErrorMessage("");
                }
            } else {
                setErrorMessage(`You can only purchase up to ${MAX_AGRI_CASH_QUANTITY} units with Agri-Cash. Additional units can be purchased with Cash.`);
            }
        }
    }

    const getStockStatus = () => {
        if (!ProductInfo) return {};
        
        if (ProductInfo.stock_quantity === 0) {
            return {
                text: "Out of Stock",
                color: "#FF0000",
                backgroundColor: "#FFE5E5"
            };
        } else if (ProductInfo.stock_quantity === -1) {
            return {
                text: "Coming Soon",
                color: "#800080",
                backgroundColor: "#F5E6FA"
            };
        } else {
            return {
                text: "In Stock",
                color: "#09c18c",
                backgroundColor: "#E5F9F2"
            };
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN').format(price || 0);
    };

    const handleNotifyMe = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            Navigation.goBack();
        }, 1500);
    };

    const updateCart = (newItem, isCash = false) => {
        const quantity = isCash ? CashCount : Count;
        const price = isCash ? ProductInfo.price : ProductInfo.discounted_price;

        setCart((prevCart) => {
            const existingItem = prevCart.find(item => 
                item.name === newItem.name && item.isCashPurchase === isCash
            );

            let updatedCart;
            if (existingItem) {
                updatedCart = prevCart.map(item =>
                    item.name === newItem.name && item.isCashPurchase === isCash
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                updatedCart = [...prevCart, { 
                    ...newItem, 
                    quantity, 
                    price,
                    isCashPurchase: isCash 
                }];
            }

            storage.set("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const checkAgriCashLimit = (price, quantity) => {
        // Calculate total price for this purchase
        const totalPrice = price * quantity;

        // Calculate current cart total for Agri-Cash purchases
        const currentCartTotal = cart.reduce((sum, item) => {
            if (!item.isCashPurchase) {
                return sum + (item.price * item.quantity);
            }
            return sum;
        }, 0);

        // Check if adding this item would exceed the limit
        return (currentCartTotal + totalPrice) <= AGRI_CASH_LIMIT;
    };

    const handleIndividualPurchase = async () => {
        if (!ProductInfo) return;

        // Check Agri-Cash limit for the current quantity
        if (!checkAgriCashLimit(ProductInfo.discounted_price, Count)) {
            setErrorMessage(`Cannot add items. Total would exceed Agri-Cash limit of Rs ${formatPrice(AGRI_CASH_LIMIT)}`);
            return;
        }

        setErrorMessage("");
        setIsLoading(true);

        try {
            const agriCashItem = {
                ...ProductInfo,
                quantity: Count,
                price: ProductInfo.discounted_price,
                isCashPurchase: false
            };
            
            updateCart(agriCashItem, false);
            
            setTimeout(() => {
                setIsLoading(false);
                Navigation.goBack();
            }, 1500);
        } catch (error) {
            setErrorMessage("Failed to add items to cart");
            setIsLoading(false);
        }
    };

    const handleCashPurchase = async () => {
        if (!ProductInfo) return;

        setErrorMessage("");
        setIsLoading(true);

        try {
            const cashItem = {
                ...ProductInfo,
                quantity: CashCount,
                price: ProductInfo.price,
                isCashPurchase: true
            };
            
            updateCart(cashItem, true);
            
            setTimeout(() => {
                setIsLoading(false);
                Navigation.goBack();
            }, 1500);
        } catch (error) {
            setErrorMessage("Failed to add items to cart");
            setIsLoading(false);
        }
    };

    const handleCombinedPurchase = async () => {
        if (!ProductInfo) return;

        // Check Agri-Cash limit for the Agri-Cash units
        if (Count > 0 && !checkAgriCashLimit(ProductInfo.discounted_price, Count)) {
            setErrorMessage(`Cannot add items. Total would exceed Agri-Cash limit of Rs ${formatPrice(AGRI_CASH_LIMIT)}`);
            return;
        }

        setErrorMessage("");
        setIsLoading(true);

        try {
            // Add Agri-Cash units if any
            if (Count > 0) {
                const agriCashItem = {
                    ...ProductInfo,
                    quantity: Count,
                    price: ProductInfo.discounted_price,
                    isCashPurchase: false
                };
                updateCart(agriCashItem, false);
            }
            
            // Add cash units if any
            if (CashCount > 0) {
                const cashItem = {
                    ...ProductInfo,
                    quantity: CashCount,
                    price: ProductInfo.price,
                    isCashPurchase: true
                };
                updateCart(cashItem, true);
            }
            
            setTimeout(() => {
                setIsLoading(false);
                Navigation.goBack();
            }, 1500);
        } catch (error) {
            setErrorMessage("Failed to add items to cart");
            setIsLoading(false);
        }
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    const handlePreOrder = () => {
        // Implement pre-order logic here
        console.log("Pre-order for product:", ProductInfo?.name);
    };

    const calculateDiscount = () => {
        if (!ProductInfo?.price || !ProductInfo?.discounted_price) return 0;
        const discount = ((ProductInfo.price - ProductInfo.discounted_price) / ProductInfo.price) * 100;
        return Math.round(discount);
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
                                <View style={[
                                    styles.stockBadge,
                                    { backgroundColor: getStockStatus().backgroundColor }
                                ]}>
                                    <Text style={[styles.stockText, { color: getStockStatus().color }]}>
                                        {getStockStatus().text}
                                    </Text>
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
                                <Text style={styles.infoValue}>
                                    Rs {formatPrice(ProductInfo.discounted_price)}
                                </Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Pack Size:</Text>
                                <Text style={styles.infoValue}>{ProductInfo.weight} Kg</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Discount with Agri-Cash:</Text>
                                <Text style={[styles.infoValue, styles.discountText]}>
                                    {calculateDiscount()}% OFF
                                </Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Expected Available Date:</Text>
                                <Text style={styles.infoValue}>Coming Soon</Text>
                            </View>

                            {errorMessage ? (
                                <View style={styles.errorContainer}>
                                    <Text style={styles.errorText}>{errorMessage}</Text>
                                </View>
                            ) : null}

                            <View style={styles.actionsContainer}>
                                <Text style={styles.sectionTitle}>Purchase with Agri-Cash</Text>
                                <View style={styles.quantityAndCartContainer}>
                                    <View style={[
                                        styles.quantitySelector,
                                        !isProductAvailable && styles.quantitySelectorDisabled
                                    ]}>
                                    <TouchableOpacity
                                        onPress={() => configureCount(true)}
                                            disabled={!isProductAvailable}
                                            style={[styles.quantityButton, styles.minusButton]}
                                    >
                                        <Text style={styles.quantityButtonText}>−</Text>
                                    </TouchableOpacity>

                                    <Text style={styles.quantityText}>
                                        {Count < 10 ? "0" + Count : Count}
                                    </Text>

                                    <TouchableOpacity
                                        onPress={() => configureCount(false)}
                                            disabled={!isProductAvailable}
                                            style={[
                                                styles.quantityButton,
                                                styles.plusButton,
                                                Count >= MAX_AGRI_CASH_QUANTITY && styles.disabledPlusButton
                                            ]}
                                        >
                                            <Text style={styles.quantityButtonText}>+</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {isProductAvailable ? (
                                        <TouchableOpacity
                                            style={[
                                                styles.addToCartButton,
                                                isLoading && styles.buttonLoading,
                                                Count === 0 && styles.disabledButton
                                            ]}
                                            onPress={handleIndividualPurchase}
                                            disabled={isLoading || Count === 0}
                                        >
                                            {isLoading ? (
                                                <ActivityIndicator color="#FFFFFF" />
                                            ) : (
                                                <Text style={styles.addToCartText}>
                                                    Buy {Count} with Agri-Cash
                                                </Text>
                                            )}
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            style={[
                                                styles.notifyButton,
                                                isLoading && styles.buttonLoading
                                            ]}
                                            onPress={handleNotifyMe}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <ActivityIndicator color="#FFFFFF" />
                                            ) : (
                                                <Text style={styles.notifyButtonText}>Notify Me</Text>
                                            )}
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>

                        {/* Cash Purchase Section - Always Visible */}
                        <View style={styles.cashPurchaseContainer}>
                            <View style={styles.cashPurchaseSection}>
                                <View style={styles.priceInfoContainer}>
                                    <Text style={styles.cashTitle}>Buy with Cash</Text>
                                    <Text style={styles.priceInfo}>
                                        Price: Rs {formatPrice(ProductInfo.price)}
                                    </Text>
                                    <Text style={styles.packSizeInfo}>
                                        Pack Size: {ProductInfo.weight} Kg
                                    </Text>
                                </View>

                                <View style={styles.quantityAndCartContainer}>
                                    <View style={styles.quantitySelector}>
                                        <TouchableOpacity
                                            onPress={() => configureCount(true, true)}
                                            style={[styles.quantityButton, styles.minusButton]}
                                        >
                                            <Text style={styles.quantityButtonText}>−</Text>
                                        </TouchableOpacity>

                                        <Text style={styles.quantityText}>
                                            {CashCount < 10 ? "0" + CashCount : CashCount}
                                        </Text>

                                        <TouchableOpacity
                                            onPress={() => configureCount(false, true)}
                                        style={[styles.quantityButton, styles.plusButton]}
                                    >
                                        <Text style={styles.quantityButtonText}>+</Text>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                        style={[
                                            styles.addToCartButton,
                                            styles.combinedButton,
                                            CashCount === 0 && styles.disabledButton
                                        ]}
                                        onPress={handleCashPurchase}
                                        disabled={isLoading || CashCount === 0}
                                    >
                                        {isLoading ? (
                                            <ActivityIndicator color="#FFFFFF" />
                                        ) : (
                                            <Text style={styles.addToCartText}>
                                                Buy {CashCount} with Cash
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {/* Combined Purchase Option - Only shown when both methods are used */}
                        {(Count > 0 && CashCount > 0) && (
                            <View style={styles.combinedPurchaseContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.addToCartButton,
                                        styles.combinedButton,
                                        isLoading && styles.buttonLoading
                                    ]}
                                    onPress={handleCombinedPurchase}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <ActivityIndicator color="#FFFFFF" />
                                    ) : (
                                        <Text style={styles.addToCartText}>
                                            Buy Total Items: {Count} + {CashCount}
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        )}

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
    stockBadge: {
        paddingHorizontal: wp(2),
        paddingVertical: wp(1),
        borderRadius: wp(1),
        marginRight: wp(2),
    },
    stockText: {
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
        alignItems: 'center',
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
    actionsContainer: {
        marginTop: hp(2),
    },
    quantityAndCartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: wp(3),
    },
    quantitySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: wp(1),
        backgroundColor: '#FFFFFF',
        padding: wp(1),
    },
    quantitySelectorDisabled: {
        opacity: 0.6,
        backgroundColor: '#F5F5F5',
    },
    quantityButton: {
        width: wp(8),
        height: wp(8),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(1),
    },
    minusButton: {
        backgroundColor: '#F5F5F5',
    },
    plusButton: {
        backgroundColor: '#09c18c',
    },
    quantityButtonText: {
        fontSize: wp(5),
        fontWeight: 'bold',
        color: '#000000',
    },
    quantityText: {
        fontSize: wp(4.5),
        fontWeight: 'bold',
        marginHorizontal: wp(3),
        color: '#000000',
    },
    addToCartButton: {
        flex: 1,
        backgroundColor: '#09c18c',
        paddingVertical: hp(1.5),
        borderRadius: wp(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    addToCartText: {
        color: '#FFFFFF',
        fontSize: wp(4),
        fontWeight: 'bold',
    },
    notifyButton: {
        flex: 1,
        backgroundColor: '#09c18c',
        paddingVertical: hp(1.5),
        borderRadius: wp(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    notifyButtonText: {
        color: '#FFFFFF',
        fontSize: wp(4),
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
    comingSoonButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: wp(2),
    },
    preOrderButton: {
        backgroundColor: '#800080',
    },
    cashPurchaseContainer: {
        marginTop: hp(3),
        backgroundColor: '#FFFFFF',
        borderRadius: wp(2),
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#800080',
    },
    limitWarning: {
        backgroundColor: '#F5E6FA',
        padding: wp(3),
        marginBottom: hp(2),
    },
    warningText: {
        color: '#800080',
        fontSize: wp(3.5),
        lineHeight: wp(5),
    },
    cashPurchaseSection: {
        padding: wp(3),
    },
    priceInfoContainer: {
        marginBottom: hp(2),
    },
    cashTitle: {
        fontSize: wp(4.5),
        fontWeight: 'bold',
        color: '#800080',
        marginBottom: hp(1),
    },
    priceInfo: {
        fontSize: wp(3.8),
        color: '#666666',
        marginBottom: hp(0.5),
    },
    packSizeInfo: {
        fontSize: wp(3.8),
        color: '#666666',
    },
    combinedButton: {
        backgroundColor: '#800080',
        flex: 1,
    },
    disabledPlusButton: {
        backgroundColor: '#E0E0E0',
        opacity: 0.5,
    },
    discountText: {
        color: '#09c18c',
        fontWeight: 'bold',
    },
    errorContainer: {
        backgroundColor: '#FFE5E5',
        padding: wp(3),
        borderRadius: wp(1),
        marginVertical: hp(1),
    },
    errorText: {
        color: '#FF0000',
        fontSize: wp(3.5),
        textAlign: 'center',
    },
    buttonLoading: {
        opacity: 0.7,
    },
    disabledButton: {
        opacity: 0.5,
    },
    sectionTitle: {
        fontSize: wp(4.5),
        fontWeight: 'bold',
        color: '#000',
        marginBottom: hp(1),
    },
    combinedPurchaseContainer: {
        marginTop: hp(2),
        backgroundColor: '#FFFFFF',
        borderRadius: wp(2),
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#800080',
    },
});