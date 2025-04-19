import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Navbar from '../../Navbar/Navbar';
// import BottomBar from '../../BottomBar/BottomBar';
import colors from '../../../../../util/Constants/colors';

type RootStackParamList = {
    FertilizerAdvisorSelectedCrop: { crop: CropType };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'FertilizerAdvisorSelectedCrop'>;

type CropType = {
    id: string;
    name: string;
    image: any;
    growthDuration: string;
    waterRequirement: string;
    soilType: string;
    expectedYield: string;
    seedRequirement: string;
    idealFertilizer: {
        name: string;
        description: string;
    };
};

const crops: CropType[] = [
    {
        id: '1',
        name: 'Wheat',
        image: require('./Images/Crops/wheat.png'),
        growthDuration: '110-130 days',
        waterRequirement: 'Medium',
        soilType: 'Sandy or Clay-loam',
        expectedYield: '2,500-3,500 kg per acre',
        seedRequirement: '57 kg of seed per acre',
        idealFertilizer: {
            name: 'Diammonium Phosphate (DAP)',
            description: 'DAP provides Nitrogen (N) and Phosphorus (P), the two most essential nutrients for wheat growth. It supports strong root development and early plant establishment, and enhances tillering (more shoots per plant) for a higher yield.'
        }
    },
    {
        id: '2',
        name: 'Rice',
        image: require('./Images/Crops/rice.png'),
        growthDuration: '120-150 days',
        waterRequirement: 'High',
        soilType: 'Clay soil',
        expectedYield: '2,000-3,000 kg per acre',
        seedRequirement: '30-35 kg per acre',
        idealFertilizer: {
            name: 'NPK 15-15-15',
            description: 'A balanced fertilizer providing equal amounts of Nitrogen, Phosphorus, and Potassium. This supports overall plant growth, root development, and grain filling in rice plants.'
        }
    },
    {
        id: '3',
        name: 'Corn',
        image: require('./Images/Crops/corn.png'),
        growthDuration: '90-120 days',
        waterRequirement: 'Medium-High',
        soilType: 'Well-drained loam',
        expectedYield: '3,000-4,000 kg per acre',
        seedRequirement: '8-10 kg per acre',
        idealFertilizer: {
            name: 'Urea',
            description: 'High nitrogen content fertilizer essential for corn growth. Supports leaf development and protein synthesis, leading to better grain development and higher yields.'
        }
    },
    {
        id: '4',
        name: 'Potato',
        image: require('./Images/Crops/potato.png'),
        growthDuration: '90-120 days',
        waterRequirement: 'Medium',
        soilType: 'Sandy loam',
        expectedYield: '8,000-10,000 kg per acre',
        seedRequirement: '800-1000 kg per acre',
        idealFertilizer: {
            name: 'NPK 5-10-5',
            description: 'Specialized potato fertilizer with higher phosphorus content. Promotes tuber development and overall plant health while providing balanced nutrition throughout the growing season.'
        }
    },
];

const FertilizerAdvisor = () => {
    const navigation = useNavigation<NavigationProp>();

    const handleCropSelect = (crop: CropType) => {
        navigation.navigate('FertilizerAdvisorSelectedCrop', { crop });
    };

    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>

            <ScrollView style={styles.content}>
                <Text style={styles.title}>Fertilizer Advisor</Text>
                <Text style={styles.subtitle}>Choose the crop to view best fertilizer for:</Text>

                <View style={styles.cropsGrid}>
                    {crops.map((crop) => (
                        <TouchableOpacity
                            key={crop.id}
                            style={styles.cropCard}
                            onPress={() => handleCropSelect(crop)}
                        >
                            <View style={styles.cropImageContainer}>
                                <Image 
                                    source={crop.image}
                                    style={styles.cropImage}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={styles.cropName}>{crop.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
{/* 
            <View style={styles.bottomBarContainer}>
                <BottomBar />
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    navbarContainer: {
        height: hp('8.5%'),
        backgroundColor: colors.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GRAY,
    },
    content: {
        flex: 1,
        padding: wp('4%'),
    },
    title: {
        fontSize: wp('6%'),
        fontWeight: 'bold',
        color: colors.BLACK,
        marginBottom: hp('1%'),
    },
    subtitle: {
        fontSize: wp('4%'),
        color: colors.GRAY,
        marginBottom: hp('3%'),
    },
    cropsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: wp('4%'),
        marginBottom: hp('3%'),
    },
    cropCard: {
        width: wp('43%'),
        backgroundColor: colors.WHITE,
        borderRadius: wp('3%'),
        padding: wp('3%'),
        elevation: 2,
        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        alignItems: 'center',
    },
    cropImageContainer: {
        width: wp('30%'),
        height: wp('30%'),
        marginBottom: hp('1%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    cropImage: {
        width: '90%',
        height: '90%',
    },
    cropName: {
        fontSize: wp('4%'),
        color: colors.BLACK,
        textAlign: 'center',
    },
    bottomBarContainer: {
        height: hp('8%'),
        backgroundColor: colors.WHITE,
        borderTopWidth: 1,
        borderTopColor: colors.LIGHT_GRAY,
    },
});

export default FertilizerAdvisor; 