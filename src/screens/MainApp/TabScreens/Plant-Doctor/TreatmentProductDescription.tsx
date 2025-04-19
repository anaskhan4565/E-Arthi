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
import Ionicons from "react-native-vector-icons/Ionicons";
import ScreensName from "../../../../../util/Constants/ScreensName.ts";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    ProductScr: undefined;
    DosageCalculator: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const TreatmentProductDescription = () => {
    const navigation = useNavigation<NavigationProp>();
    const PlantDiagnosisData = new MMKV();
    const ProductClickInfo = new MMKV();
    const [isLoading, setIsLoading] = useState(false);
    
    // Get selected product data from MMKV
    const selectedProductStr = PlantDiagnosisData.getString("SelectedProduct");
    const selectedProduct = selectedProductStr ? JSON.parse(selectedProductStr) : null;
    const productName = selectedProduct ? `${selectedProduct.name} by ${selectedProduct.manufacturer}` : "Unknown Product";

    // Product data mapping
    const productDataMap: Record<number, {
        id: number;
        name: string;
        description: string;
        category: string;
        price: string;
        discounted_price: string;
        stock_quantity: number;
        weight: string;
        unit: string;
        SourceGiven: string;
    }> = {
        74: {
            id: 74,
            name: "PlantCare Plus by Terminix Pakistan",
            description: "PlantCare Plus is a broad-spectrum insecticide designed for all plant types. It effectively eliminates sap-sucking and leaf-eating insects, promoting healthy plant growth. Recommended dilution is 5–10 ml per liter of water.",
            category: "Insecticides",
            price: "3300.00",
            discounted_price: "3000.00",
            stock_quantity: 50,
            weight: "1.00",
            unit: "l",
            SourceGiven: "https://res.cloudinary.com/dgwkprjru/image/upload/v1744492799/eagri/products/stream_ulmtht.jpg"
        },
        75: {
            id: 75,
            name: "Acelan 20SL by FMC",
            description: "Acelan 20SL is a neonicotinoid insecticide containing Acetamiprid 20SL. It effectively controls sucking pests, especially aphids and whiteflies, by interrupting their neural transmission, leading to paralysis and death. Acelan is particularly effective on cotton, vegetables, orchards, and tobacco crops. The recommended dosage is 250 ml per acre.",
            category: "Insecticides",
            price: "1255.00",
            discounted_price: "1055.00",
            stock_quantity: 50,
            weight: "0.25",
            unit: "l",
            SourceGiven: "https://res.cloudinary.com/dgwkprjru/image/upload/v1744492989/eagri/products/stream_oe2dvi.jpg"
        },
        76: {
            id: 76,
            name: "Movento 240 SC by Bayer",
            description: "Movento 240 SC is a systemic insecticide containing Spirotetramat 240 g/L. It offers broad-spectrum control of sucking pests such as whiteflies, aphids, thrips, and scale insects. Suitable for various crops including vegetables, fruits, and field crops.",
            category: "Insecticides",
            price: "3005.00",
            discounted_price: "2755.00",
            stock_quantity: 50,
            weight: "0.25",
            unit: "l",
            SourceGiven: "https://res.cloudinary.com/dgwkprjru/image/upload/v1744493263/eagri/products/stream_mxdxrx.jpg"
        }
    };

    const handleBuyProduct = () => {
        if (!selectedProduct) return;
        
        setIsLoading(true);
        
        // Find the matching product data
        const productData = productDataMap[selectedProduct.id as keyof typeof productDataMap];
        
        if (productData) {
            // Create a complete product object with all required fields
            const completeProductData = {
                ...productData,
                Description: productData.description, // Add Description field
                name: productData.name,
                price: productData.price,
                discounted_price: productData.discounted_price,
                SourceGiven: productData.SourceGiven,
                weight: productData.weight,
                category: productData.category,
                stock_quantity: productData.stock_quantity
            };
            
            // Set the complete product data in MMKV
            ProductClickInfo.set('selectedProduct', JSON.stringify(completeProductData));
            
            // Navigate to ProductScr
            navigation.navigate(ScreensName.ProductScr as never);
            
            // Reset loading state after a short delay
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        } else {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>
            <ScrollView style={styles.contentContainer}>
                {/* Product Title */}
                <Text style={styles.title}>{productName}</Text>
                
                {/* Product Description */}
                {selectedProduct && productDataMap[selectedProduct.id as keyof typeof productDataMap] && (
                    <Text style={styles.description}>
                        {productDataMap[selectedProduct.id as keyof typeof productDataMap].description}
                    </Text>
                )}
                
                {/* Dosage Calculator Section */}
                <Text style={styles.sectionTitle}>Dosage Calculator</Text>
                <Text style={styles.description}>
                    Get the exact dosage, dilution, application frequency, and pre-harvest interval for your plot
                </Text>
                
                <TouchableOpacity 
                    style={styles.calculateButton} 
                    onPress={() => navigation.navigate(ScreensName.DosageCalculator as never)}
                >
                    <Text style={styles.calculateButtonText}>Calculate Dosage</Text>
                </TouchableOpacity>
                
                {/* Application Method */}
                <View style={styles.infoSection}>
                    <View style={styles.iconContainer}>
                        <Image 
                            source={require('./AssetsPlantDr/ProductDescription/spray.png')} 
                            style={styles.infoIcon}
                        />
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.infoTitle}>Application Method</Text>
                        <Text style={styles.infoValue}>Spray</Text>
                    </View>
                </View>
                
                <View style={styles.divider} />
                
                {/* Weather Conditions */}
                <View style={styles.infoSection}>
                    <View style={styles.iconContainer}>
                        <Image 
                            source={require('./AssetsPlantDr/ProductDescription/wind.png')} 
                            style={styles.infoIcon}
                        />
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.infoTitle}>Weather Conditions</Text>
                        <Text style={styles.infoValue}>
                            Do not apply product if it is windy or raining. Avoid application during the hottest hours of the day
                        </Text>
                    </View>
                </View>
                
                {/* Spraying Conditions */}
                <View style={styles.infoSection}>
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.infoTitle}>Spraying Conditions</Text>
                        <Text style={styles.infoValue}>Unfavorable until 7pm</Text>
                    </View>
                </View>
                
                <View style={styles.divider} />
                
                {/* Toxicity */}
                <View style={styles.infoSection}>
                    <View style={styles.iconContainer}>
                        <Image 
                            source={require('./AssetsPlantDr/ProductDescription/warning.png')} 
                            style={styles.infoIcon}
                        />
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.infoTitle}>Toxicity</Text>
                        <Text style={styles.infoValue}>Slightly toxic</Text>
                    </View>
                </View>
                
                <View style={styles.divider} />
                
                {/* Safety Precautions */}
                <View style={styles.safetyContainer}>
                <Text style={[styles.sectionTitle, { marginTop: hp('2%') }]}>Safety Precautions</Text>
                <View style={styles.safetyItem}>
                    <Text style={styles.safetyNumber}>1.</Text>
                    <Text style={styles.safetyText}>Keep it locked away and out of reach of children</Text>
                </View>
                <View style={styles.safetyItem}>
                    <Text style={styles.safetyNumber}>2.</Text>
                    <Text style={styles.safetyText}>Wash the hands and face with clean water after usage</Text>
                </View>
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

export default TreatmentProductDescription

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
    safetyContainer:{
        backgroundColor:'#F3FFFC',
        padding:wp('3%'),
        borderRadius:wp('2%'),
        marginBottom:hp('2%')

    },
    title: {
        fontSize: wp('5.5%'),
        fontWeight: 'bold',
        marginTop: hp('2%'),
        marginBottom: hp('3%'),
        color: '#000',
    },
    sectionTitle: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        marginBottom: hp('1%'),
        color: '#000',
    },
    description: {
        fontSize: wp('3.5%'),
        color: '#555',
        lineHeight: wp('5%'),
        marginBottom: hp('3%'),
    },
    calculateButton: {
        backgroundColor: '#00A67E',
        paddingVertical: hp('1.5%'),
        borderRadius: wp('2%'),
        alignItems: 'center',
        marginBottom: hp('3%'),
    },
    calculateButtonText: {
        color: colors.WHITE,
        fontSize: wp('4%'),
        fontWeight: '500',
    },
    infoSection: {
        flexDirection: 'row',
        marginBottom: hp('2%'),
    },
    iconContainer: {
        width: wp('12%'),
        alignItems: 'center',
    },
    infoIcon: {
        width: wp('8%'),
        height: wp('8%'),
        resizeMode: 'contain',
    },
    infoTextContainer: {
        flex: 1,
    },
    infoTitle: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
        color: '#000',
    },
    infoValue: {
        fontSize: wp('3.5%'),
        color: '#555',
    },
    divider: {
        height: 1,
        backgroundColor: '#00A980',
        marginVertical: hp('1%'),
        marginBottom: hp('2%'),
    },
    safetyItem: {
        flexDirection: 'row',
        marginBottom: hp('1%'),
        
    },
    safetyNumber: {
        width: wp('5%'),
        fontSize: wp('3.5%'),
        color: '#000',
    },
    safetyText: {
        flex: 1,
        fontSize: wp('3.5%'),
        color: '#555',
    },
    buyButton: {
        backgroundColor: colors.GREEN,
        paddingVertical: hp('2%'),
        borderRadius: wp('2%'),
        alignItems: 'center',
        marginTop: hp('3%'),
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