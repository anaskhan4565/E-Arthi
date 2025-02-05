import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import Prod2 from "../../../assets/MainApp/EmarketPlace/Products/prod2.png";
import ButtonLess from "../../../assets/MainApp/EmarketPlace/Products/Buttons/LessButton.png";
import ButtonPlus from "../../../assets/MainApp/EmarketPlace/Products/Buttons/MoreButton.png";
import colors from "../../../../util/colors";
import Cart from "../../../assets/MainApp/ProductScreen/Cart.png";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { fonts } from '../../../../util/FontName';
import img1 from '../../../assets/MainApp/ProductScreen/product1.png'
import img2 from '../../../assets/MainApp/ProductScreen/product2.png'
import img3 from '../../../assets/MainApp/ProductScreen/product3.png'
import ScreensName from '../../../../util/ScreensName.ts';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../Navbar/Navbar';
import { useTranslation } from 'react-i18next';


const ProductScr = () => {
    const { t } = useTranslation();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [Count, SetCount] = useState(1);
    const [Price, setPrice] = useState(2080);
    const Navigation = useNavigation();
    const storage = new MMKV();
    const ProductClickInfo = new MMKV();

    const productData = ProductClickInfo.getString("selectedProduct");
    const ProductInfo = productData ? JSON.parse(productData) : null;

    const toggleSelection = (product) => {
        setSelectedOptions((prevOptions) => {
            let updatedOptions = [...prevOptions];
            let updatedPrice = Price;
    
            if (prevOptions.includes(product.name)) {
                updatedOptions = updatedOptions.filter((item) => item !== product.name);
                updatedPrice -= product.price;
            } else {
                updatedOptions.push(product.name);
                updatedPrice += product.price;
            }
    
            setPrice(updatedPrice);
            return updatedOptions;
        });
    };
    

    function configureCount(less) {
        let newCount = less ? Math.max(1, Count - 1) : Count + 1;
        SetCount(newCount);
    }

    const handleAddtoCart = () => {
        // Ensure qty and cost are initialized properly
        const currentQty = storage.getNumber("qty") ?? 0;
        const currentCost = storage.getNumber("cost") ?? 0;

        storage.set("qty", currentQty + Count);
        storage.set("cost", currentCost + Price * Count);

        // Navigation.navigate(ScreensName.EMarket);
        Navigation.navigate(ScreensName.MainTabNavigation, { screen: ScreensName.EMarket });
    };

    const products = [
        { name: "Agri Moss", image: img1, price: 250 },
        { name: "Agri - Humic Granules", image: img2, price: 275 },
        { name: "Agri - Aquagel", image: img3, price: 325 },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={{marginBottom: hp(1),flex: 0.3 }} >
                <Navbar  />
            </View>
            <View style={styles.topSection}>
                <View style={styles.imageContainer}>
                    <Image source={Prod2} style={styles.productImage} />
                </View>
                <View style={styles.productDetails}>
                    <Text style={styles.productTitle}>{t('Aries Agro Limited Agromin Gold')}</Text>
                    <View style={styles.priceContainer}>
                        <View style={styles.priceDetails}>
                            <Text style={styles.priceText}>Price: PKR 2080</Text>
                            <Text style={styles.discountedPrice}>3080</Text>
                            <Text style={styles.saveText}>Save: PKR 1000</Text>
                        </View>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity onPress={() => configureCount(1)}>
                                <Image source={ButtonLess} style={styles.quantityButton} />
                            </TouchableOpacity >
                            <Text style={styles.quantityText}>{Count < 10 && Count > 0 ? '0' + Count : Count > 0 ? Count : 0}</Text>
                            <TouchableOpacity onPress={() => configureCount()}>
                                <Image source={ButtonPlus} style={styles.quantityButton} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.description}>
                        {t('Brown the beef better. Lean ground beef – I like to use 85% lean angus. Garlic – use fresh chopped. Spices – chili powder, cumin, onion powder.')}
                    </Text>
                </View>
            </View>
            <View style={styles.addOnSection}>
                <Text style={styles.addOnTitle}>{t('Choices of Add On')}</Text>
                <View style={styles.addOnContainer}>
                    <View style={styles.addOnProducts}>
                        {products.map((product, key) => (
                            <View key={`product-${key}`} style={styles.addOnItem}>
                                <Image source={product.image} style={styles.addOnImage} />
                                <Text style={styles.addOnText}>{product.name}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.checkboxContainer}>
                        {["first", "second", "third"].map((value, third) => (
                            <View key={third} style={{ flexDirection: 'row', borderWidth: 0, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: hp(2), fontFamily: fonts.SemiBold }}>+Rs:{third + 124}</Text>
                                <TouchableOpacity
                                    style={styles.checkbox}
                                    onPress={() => toggleSelection(value)}
                                >
                                    <View
                                        style={[
                                            styles.checkboxInner,
                                            selectedOptions.includes(value) && styles.checkboxChecked
                                        ]}
                                    />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
            <View style={styles.addToCartSection}>
                <TouchableOpacity style={styles.addToCartButton} onPress={() => Navigation.navigate(ScreensName.MainTabNavigation)}>
                    <Image source={Cart} style={styles.cartIcon} />
                    <Text style={styles.cartText}>{t('Add to Cart')}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default ProductScr;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    topSection: {
        flex: 0.3,
    },
    imageContainer: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
    },
    productImage: {
        width: wp(35),
        height: wp(40),
        resizeMode: "contain",
        marginTop: hp(4),
    },
    productDetails: {
        flex: 0.5,
        padding: wp(5),
        marginTop: hp(4),
    },
    productTitle: {
        fontSize: wp(6),
        fontWeight: "bold",
        marginBottom: hp(2),
    },
    priceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    priceDetails: {
        flex: 0.6,
    },
    priceText: {
        fontSize: wp(4),
        fontWeight: "bold",
    },
    discountedPrice: {
        fontSize: wp(4),
        fontWeight: "200",
        textDecorationLine: "line-through",
    },
    saveText: {
        fontSize: wp(4),
        fontWeight: "bold",
    },
    quantityContainer: {
        flex: 0.4,
        flexDirection: "row",
        alignItems: "center",
    },
    quantityButton: {
        width: wp(8),
        height: wp(8),
        marginHorizontal: wp(1),
    },
    quantityText: {
        fontSize: wp(7),
        fontWeight: "bold",
        textAlign: "center",
    },
    description: {
        color: colors.BLACK,
        fontWeight: "400",
        marginTop: wp(3),
        fontSize: hp(1.6),
    },
    addOnSection: {
        flex: 0.3,
        padding: wp(5),
    },
    addOnTitle: {
        fontSize: wp(6),
        fontWeight: "600",
        marginBottom: hp(1),
    },
    addOnContainer: {
        flexDirection: "row",
        marginTop: wp(3),
    },
    addOnProducts: {
        flex: 0.8,
        justifyContent: "center",
    },
    addOnItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: wp(2),
    },
    addOnImage: {
        width: wp(14),
        height: wp(14),
        marginRight: wp(3),
    },
    addOnText: {
        fontSize: wp(4),
    },
    checkboxContainer: {
        flex: 0.2,
        justifyContent: "space-around",
    },
    checkbox: {
        width: wp(4.5),
        height: wp(4.5),
        borderRadius: wp(3),
        borderWidth: 2,
        marginHorizontal: wp(2),
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxInner: {
        width: wp(2.5),
        height: wp(2.5),
        borderRadius: wp(2),
        backgroundColor: "transparent",
    },
    checkboxChecked: {
        backgroundColor: "#34A853",
    },
    addToCartSection: {
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center",
    },
    addToCartButton: {
        backgroundColor: "#34A853",
        width: wp(40),
        height: hp(5.8),
        flexDirection: "row",
        alignItems: "center",
        borderRadius: hp(2.5),
        justifyContent: "center",
        marginBottom: hp(2),
    },
    cartIcon: {
        width: wp(7),
        height: wp(7),
        marginRight: wp(3),
    },
    cartText: {
        fontSize: wp(5),
        color: colors.WHITE,
    },
});
