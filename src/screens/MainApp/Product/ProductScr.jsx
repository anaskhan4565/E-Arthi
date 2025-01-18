import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Prod2 from '../../../assets/MainApp/EmarketPlace/Products/prod2.png';
import ButtonLess from '../../../assets/MainApp/EmarketPlace/Products/Buttons/LessButton.png';
import ButtonPlus from '../../../assets/MainApp/EmarketPlace/Products/Buttons/MoreButton.png';
import colors from '../../../../util/colors';
import { RadioButton } from 'react-native-paper';
import Cart from '../../../assets/MainApp/ProductScreen/Cart.png';
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

const ProductScr = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [Count, SetCount] = useState(1);
    const Navigation = useNavigation()
    const toggleSelection = (value) => {
        if (selectedOptions.includes(value)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== value));
        } else {
            setSelectedOptions([...selectedOptions, value]);
        }
    };

    function configureCount(less) {
        let newCount;
        if (Count > 0) {
            newCount = less ? Count - 1 : Count + 1;
        }
        console.log(Count);
        SetCount(newCount);
    }
    const products = [
        { name: "Agri Moss", image: img1 },
        { name: "Agri - Humic Granules", image: img2 },
        { name: "Agri - Aquagel", image: img3 },
    ];

    return (
        <View style={styles.container}>
            <View style={{flex:0.13,marginBottom:hp(1)}} >
                <Navbar isbackSet={true}/>
            </View>
            <View style={styles.topSection}>
                <View style={styles.imageContainer}>
                    <Image source={Prod2} style={styles.productImage} />
                </View>
                <View style={styles.productDetails}>
                    <Text style={styles.productTitle}>Aries Agro Limited Agromin Gold</Text>
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
                        Brown the beef better. Lean ground beef – I like to use 85% lean angus. Garlic – use fresh chopped. Spices – chili powder, cumin, onion powder.
                    </Text>
                </View>
            </View>
            <View style={styles.addOnSection}>
                <Text style={styles.addOnTitle}>Choices of Add On</Text>
                <View style={styles.addOnContainer}>
                    <View style={styles.addOnProducts}>
                        {products.map((product) => (
                            <View key={product.name} style={styles.addOnItem}>
                                <Image source={product.image} style={styles.addOnImage} />
                                <Text style={styles.addOnText}>{product.name}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.radioContainer}>
                        {["first", "second", "third"].map((value, third) => (
                            <View style={{ flexDirection: 'row', borderWidth: 0, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: hp(1.6), fontFamily: fonts.SemiBold }}>+Rs:{third + 124}</Text>
                                <RadioButton
                                    key={value}
                                    value={value}
                                    status={selectedOptions.includes(value) ? 'checked' : 'unchecked'}
                                    onPress={() => toggleSelection(value)}
                                /></View>
                        ))}
                    </View>
                </View>
            </View>
            <View style={styles.addToCartSection}>
                <TouchableOpacity style={styles.addToCartButton} onPress={() => Navigation.navigate(ScreensName.MainTabNavigation)}>
                    <Image source={Cart} style={styles.cartIcon} />
                    <Text style={styles.cartText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProductScr;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    topSection: {
        flex: 0.6,
    },
    imageContainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productImage: {
        width: wp(40),
        height: wp(40),
    },
    productDetails: {
        flex: 0.5,
        padding: wp(5),
    },
    productTitle: {
        fontSize: wp(6),
        fontWeight: 'bold',
        marginBottom: hp(2)
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceDetails: {
        flex: 0.6,
    },
    priceText: {
        fontSize: wp(4),
        fontWeight: 'bold',
    },
    discountedPrice: {
        fontSize: wp(4),
        fontWeight: '200',
        textDecorationLine: 'line-through',
    },
    saveText: {
        fontSize: wp(4),
        fontWeight: 'bold',
    },
    quantityContainer: {
        flex: 0.4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        width: wp(8),
        height: wp(8),
        marginHorizontal: wp(1)
    },
    quantityText: {
        fontSize: wp(7),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    description: {
        color: colors.BLACK,
        fontWeight: '400',
        marginTop: wp(3),
        fontSize: hp(1.6)
    },
    addOnSection: {
        flex: 0.3,
        padding: wp(5),
    },
    addOnTitle: {
        fontSize: wp(6),
        fontWeight: '600',
        marginBottom: hp(1)
    },
    addOnContainer: {
        flexDirection: 'row',
        marginTop: wp(3),
    },
    addOnProducts: {
        flex: 0.8,
        justifyContent: 'center',
    },
    addOnItem: {
        flexDirection: 'row',
        alignItems: 'center',
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
    radioContainer: {
        flex: 0.2,
        justifyContent: 'space-around',
    },
    addToCartSection: {
        flex: 0.2,
        marginTop: hp(3),
        justifyContent: 'center',
        alignItems: 'center',
    },
    addToCartButton: {
        backgroundColor: '#34A853',
        width: wp(40),
        height: hp(5.8),
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: hp(2.5),
        justifyContent: 'center',
    },
    cartIcon: {
        width: wp(8),
        height: wp(8),
        marginRight: wp(3),
    },
    cartText: {
        fontSize: wp(4),
        color: colors.WHITE,
    },
});