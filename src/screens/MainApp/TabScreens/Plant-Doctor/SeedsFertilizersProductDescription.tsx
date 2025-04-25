import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar.jsx";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/Constants/colors.js";
import { MMKV } from "react-native-mmkv";

import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ScreensName from "../../../../../util/Constants/ScreensName.ts";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    ProductScr: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ProductType {
    id: number;
    name: string;
    manufacturer: string;
    type: string;
    description: string;
    price: string;
    discounted_price: string;
    stock_quantity: number;
    weight: string;
    unit: string;
    imageUrl: string;
}

const SeedsFertilizersProductDescription = () => {
    const navigation = useNavigation<NavigationProp>();
    const ProductData = new MMKV();
    const ProductClickInfo = new MMKV();
    const [isLoading, setIsLoading] = useState(false);
    
    // Get selected product data from MMKV
    const selectedProductStr = ProductData.getString("SelectedSeedFertilizer");
    const selectedProduct: ProductType | null = selectedProductStr ? JSON.parse(selectedProductStr) : null;
    const productName = selectedProduct ? `${selectedProduct.name}` : "Unknown Product";
    const manufacturer = selectedProduct ? selectedProduct.manufacturer : "";
    const productType = selectedProduct?.type || "";
    const isSeeds = productType.toLowerCase().includes("seed");

    const handleBuyProduct = () => {
        if (!selectedProduct) return;
        
        setIsLoading(true);
        
        // Create a complete product object with all required fields for the ProductScr
        const completeProductData = {
            id: selectedProduct.id,
            name: selectedProduct.name,
            Description: selectedProduct.description, 
            category: productType,
            price: selectedProduct.price,
            discounted_price: selectedProduct.discounted_price,
            stock_quantity: selectedProduct.stock_quantity,
            weight: selectedProduct.weight,
            unit: selectedProduct.unit,
            SourceGiven: selectedProduct.imageUrl
        };
        
        // Set the complete product data in MMKV for ProductScr to use
        ProductClickInfo.set('selectedProduct', JSON.stringify(completeProductData));
        
        // Navigate to ProductScr
        navigation.navigate(ScreensName.ProductScr as never);
        
        // Reset loading state after a short delay
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>
            <ScrollView style={styles.contentContainer}>
                {/* Product Title */}
                <Text style={styles.title}>{productName}</Text>
                <Text style={styles.subtitle}>by {manufacturer}</Text>
                
                {/* Product Image */}
                <View style={styles.imageContainer}>
                    <Image 
                        source={require('./Assets/nutriplus.jpg')} 
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                </View>
                
                {/* Product Description */}
                {selectedProduct && (
                    <Text style={styles.description}>
                        {selectedProduct.description}
                    </Text>
                )}
                
                {/* Product Information */}
                <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Category:</Text>
                        <Text style={styles.infoValue}>{"Syngenta products"}</Text>
                    </View>
                    
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Price:</Text>
                        <Text style={styles.infoValue}>
                            Rs {selectedProduct?.discounted_price}
                        </Text>
                    </View>
                    
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Pack Size:</Text>
                        <Text style={styles.infoValue}>{selectedProduct?.weight} {selectedProduct?.unit}</Text>
                    </View>
                    
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>In Stock:</Text>
                        <Text style={styles.infoValue}>{selectedProduct?.stock_quantity} packages available</Text>
                    </View>
                </View>
                
                {/* Usage Guidelines */}
                <View style={styles.guidelinesSection}>
                    <Text style={styles.sectionTitle}>Usage Guidelines</Text>
                    {isSeeds ? (
                        <View>
                            <View style={styles.guidelineItem}>
                                <Icon name="seed" size={wp('5%')} color={colors.GREEN} style={styles.guidelineIcon} />
                                <Text style={styles.guidelineText}>
                                    Plant at a depth of 2-3 cm in well-prepared soil
                                </Text>
                            </View>
                            <View style={styles.guidelineItem}>
                                <Icon name="water" size={wp('5%')} color={colors.GREEN} style={styles.guidelineIcon} />
                                <Text style={styles.guidelineText}>
                                    Keep soil moist but not waterlogged during germination
                                </Text>
                            </View>
                            <View style={styles.guidelineItem}>
                                <Icon name="ruler" size={wp('5%')} color={colors.GREEN} style={styles.guidelineIcon} />
                                <Text style={styles.guidelineText}>
                                    Maintain appropriate spacing between plants for optimal growth
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <View>
                            <View style={styles.guidelineItem}>
                                <Text style={styles.guidelineText}>
                                    Apply as directed based on crop and growth stage
                                </Text>
                            </View>
                            <View style={styles.guidelineItem}>
                                <Text style={styles.guidelineText}>
                                    Best applied early morning or late evening
                                </Text>
                            </View>
                            <View style={styles.guidelineItem}>
                                <Text style={styles.guidelineText}>
                                    Wear protective equipment during application
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
                
                {/* Buy Button */}
                <TouchableOpacity 
                    style={[styles.buyButton, isLoading && styles.buttonLoading]} 
                    onPress={handleBuyProduct}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color={colors.WHITE} />
                    ) : (
                        <Text style={styles.buyButtonText}>Buy This Product</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SeedsFertilizersProductDescription;

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
    contentContainer: {
        flex: 1,
        paddingHorizontal: wp('5%'),
    },
    title: {
        fontSize: wp('5.5%'),
        fontWeight: 'bold',
        marginTop: hp('2%'),
        marginBottom: hp('0.5%'),
        color: '#000',
    },
    subtitle: {
        fontSize: wp('4%'),
        color: '#666',
        marginBottom: hp('2%'),
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: hp('2%'),
    },
    productImage: {
        width: wp('60%'),
        height: wp('60%'),
    },
    description: {
        fontSize: wp('3.5%'),
        color: '#555',
        lineHeight: wp('5%'),
        marginBottom: hp('3%'),
    },
    infoCard: {
        backgroundColor: '#F5F9F9',
        borderRadius: wp('3%'),
        padding: wp('4%'),
        marginBottom: hp('3%'),
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: hp('1%'),
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: wp('3.8%'),
        fontWeight: 'bold',
        color: '#000',
        width: wp('30%'),
    },
    infoValue: {
        fontSize: wp('3.8%'),
        color: '#333',
        flex: 1,
    },
    sectionTitle: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        marginBottom: hp('2%'),
        color: '#000',
    },
    guidelinesSection: {
        marginBottom: hp('3%'),
    },
    guidelineItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('1.5%'),
    },
    guidelineIcon: {
        marginRight: wp('3%'),
    },
    guidelineText: {
        fontSize: wp('3.5%'),
        color: '#333',
        flex: 1,
    },
    buyButton: {
        backgroundColor: colors.GREEN,
        paddingVertical: hp('2%'),
        borderRadius: wp('2%'),
        alignItems: 'center',
        marginBottom: hp('3%'),
    },
    buyButtonText: {
        color: colors.WHITE,
        fontSize: wp('4%'),
        fontWeight: 'bold',
    },
    buttonLoading: {
        opacity: 0.7,
    },
}); 