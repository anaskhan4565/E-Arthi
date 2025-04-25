import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/Constants/colors.js";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Navbar from "../../Navbar/Navbar.jsx";
import ScreensName from "../../../../../util/Constants/ScreensName.ts";
import { useNavigation } from "@react-navigation/native";
import { MMKV } from "react-native-mmkv";
import fert from './Assets/fert2.png'
import plant from './Assets/plant.png'
import sp2 from './Assets/sp2.png'
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



const SeedsFertilizers = () => {
    const navigation = useNavigation();
    const ProductData = new MMKV();

    // Define the seeds list
    const seeds: ProductType[] = [

        {
            name: "NK Brand Wheat Seeds",
            manufacturer: "Syngenta",
            type: "Wheat Seeds",
            id: 102,
            description: "NK Brand Wheat Seeds by Syngenta are high-yielding wheat varieties developed with advanced genetics to maximize farm productivity. These premium seeds offer excellent disease resistance, drought tolerance, and consistent performance across diverse growing conditions.",
            price: "3800.00",
            discounted_price: "3500.00",
            stock_quantity: 50,
            weight: "10.00",
            unit: "kg",
            imageUrl: "https://res.cloudinary.com/dgwkprjru/image/upload/v1744498301/eagri/products/wheat-seeds_bvnq5i.jpg"
        },

    ];

    // Define the fertilizers list
    const fertilizers: ProductType[] = [
        {
            name: "Syngenta NutriPlus",
            manufacturer: "Syngenta",
            type: "NPK Fertilizer",
            id: 201,
            description: "Syngenta NutriPlus is a premium NPK fertilizer formulated to provide balanced nutrition for all crop types. With an optimal blend of nitrogen, phosphorus, and potassium (20-20-20), it supports robust vegetative growth, flowering, and fruiting. Enhanced with micronutrients for comprehensive plant health.",
            price: "3500.00",
            discounted_price: "3200.00",
            stock_quantity: 100,
            weight: "25.00",
            unit: "kg",
            imageUrl: "https://res.cloudinary.com/dgwkprjru/image/upload/v1744498301/eagri/products/npk-fertilizer_ublk6f.jpg"
        },
        {
            name: "Syngenta Foliar Max",
            manufacturer: "Syngenta",
            type: "Foliar Fertilizer",
            id: 202,
            description: "Syngenta Foliar Max is a high-concentration liquid fertilizer designed for direct leaf application. This specialized formulation allows rapid nutrient absorption to quickly address deficiencies and boost plant vigor. Contains a balanced blend of macro and micronutrients for immediate plant response.",
            price: "2800.00",
            discounted_price: "2500.00",
            stock_quantity: 100,
            weight: "5.00",
            unit: "l",
            imageUrl: "https://res.cloudinary.com/dgwkprjru/image/upload/v1744498301/eagri/products/foliar-fertilizer_xfvnj2.jpg"
        },
        {
            name: "Syngenta GreenStart",
            manufacturer: "Syngenta",
            type: "Starter Fertilizer",
            id: 203,
            description: "Syngenta GreenStart is a specialized starter fertilizer designed to promote rapid seedling establishment and early-season growth. With a high phosphorus content and essential micronutrients, it stimulates root development and enhances nutrient uptake in young plants for a strong foundation.",
            price: "4200.00",
            discounted_price: "3900.00",
            stock_quantity: 100,
            weight: "20.00",
            unit: "kg",
            imageUrl: "https://res.cloudinary.com/dgwkprjru/image/upload/v1744498301/eagri/products/starter-fertilizer_r2q1zm.jpg"
        }
    ];

    const handleProductPress = (product: ProductType) => {
        ProductData.set("SelectedSeedFertilizer", JSON.stringify(product));
        navigation.navigate(ScreensName.SeedsFertilizersProductDescription as any);
    };

    return ( 
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} /> 
            </View>
            <ScrollView style={styles.contentContainer}>
                {/* Title */}
                <Text style={styles.title}>Seeds & Fertilizers</Text>

                {/* Recommended Seeds Section */}
                <Text style={styles.sectionTitle}>Recommended Seeds:</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>Select high-quality seeds suitable for your specific growing conditions.</Text>
                </View>

                {/* Seeds List */}
                {seeds.map((seed, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={styles.productItem} 
                        onPress={() => handleProductPress(seed)}
                    >
                        <View style={styles.productIconContainer}>
                            <Image 
                                source={fert} 
                                style={styles.productIcon} 
                            />
                        </View>
                        <View style={styles.productInfo}>
                            <Text style={styles.productType}>{seed.type}</Text>
                            <Text style={styles.productName}>{seed.name} by {seed.manufacturer}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.buyButton} onPress={() => handleProductPress(seed)}>
                                <Text style={styles.buyButtonText}>View</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))}

                {/* Recommended Fertilizers Section */}
                <Text style={[styles.sectionTitle, styles.fertilizerTitle]}>Recommended Fertilizers:</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>Choose appropriate fertilizers based on your crop's nutritional needs.</Text>
                </View>

                {/* Fertilizers List */}
                {fertilizers.map((fertilizer, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={styles.productItem} 
                        onPress={() => handleProductPress(fertilizer)}
                    >
                        <View style={styles.productIconContainer}>
                            <Image 
                                source={sp2} 
                                style={styles.productIcon} 
                            />
                        </View>
                        <View style={styles.productInfo}>
                            <Text style={styles.productType}>{fertilizer.type}</Text>
                            <Text style={styles.productName}>{fertilizer.name} by {fertilizer.manufacturer}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.buyButton} onPress={() => handleProductPress(fertilizer)}>
                                <Text style={styles.buyButtonText}>View</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default SeedsFertilizers;

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
        marginBottom: hp('2%'),
        color: '#000',
    },
    sectionTitle: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        marginBottom: hp('1%'),
        color: '#000',
    },
    fertilizerTitle: {
        marginTop: hp('3%'),
    },
    infoContainer: {
        backgroundColor: '#F3FFFC',
        borderRadius: wp('2%'),
        padding: wp('3%'),
        marginBottom: hp('2%'),
    },
    infoText: {
        fontSize: wp('3.5%'),
        color: '#333',
    },
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F9F9',
        padding: wp('3%'),
        marginBottom: hp('1.5%'),
        borderRadius: wp('2%'),
    },
    productIconContainer: {
        marginRight: wp('3%'),
    },
    productIcon: {
        width: wp('13%'),
        height: wp('13%'),
        resizeMode: 'contain',
    },
    productInfo: {
        flex: 1,
    },
    productType: {
        fontSize: wp('3.5%'),
        color: '#666',
    },
    productName: {
        fontSize: wp('4%'),
        fontWeight: '500',
        color: '#000',
    },
    buttonContainer: {
        marginLeft: wp('2%'),
    },
    buyButton: {
        backgroundColor: colors.GREEN,
        paddingVertical: hp('0.8%'),
        paddingHorizontal: wp('3%'),
        borderRadius: wp('1%'),
    },
    buyButtonText: {
        color: colors.WHITE,
        fontSize: wp('3.5%'),
        fontWeight: '500',
    },
}); 