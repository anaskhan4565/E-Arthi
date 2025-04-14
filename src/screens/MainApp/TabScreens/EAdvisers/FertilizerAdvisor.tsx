import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Navbar from '../../Navbar/Navbar';
// import BottomBar from '../../BottomBar/BottomBar';
import colors from '../../../../../util/Constants/colors';

type CropType = {
    id: string;
    name: string;
    image: string | null;
};

const FertilizerAdvisor = () => {
    const navigation = useNavigation();
    const [selectedCrop, setSelectedCrop] = useState<CropType | null>(null);

    const crops: CropType[] = [
        { id: '1', name: 'Wheat', image: null },
        { id: '2', name: 'Rice', image: null },
        { id: '3', name: 'Corn', image: null },
        { id: '4', name: 'Potato', image: null },
    ];

    const renderFertilizerRecommendations = () => {
        if (!selectedCrop) return null;

        return (
            <View style={styles.recommendationsContainer}>
                <Text style={styles.recommendationsTitle}>
                    Fertilizer Recommendations for {selectedCrop.name}
                </Text>

                <View style={styles.recommendationCard}>
                    <Text style={styles.recommendationHeader}>Primary Nutrients (NPK)</Text>
                    <Text style={styles.recommendationText}>• Nitrogen (N): 120-150 kg/ha</Text>
                    <Text style={styles.recommendationText}>• Phosphorus (P): 60-80 kg/ha</Text>
                    <Text style={styles.recommendationText}>• Potassium (K): 40-60 kg/ha</Text>
                </View>

                <View style={styles.recommendationCard}>
                    <Text style={styles.recommendationHeader}>Application Schedule</Text>
                    <Text style={styles.recommendationText}>• Base Application: Before sowing</Text>
                    <Text style={styles.recommendationText}>• First Top Dressing: 30 days</Text>
                    <Text style={styles.recommendationText}>• Second Top Dressing: 60 days</Text>
                </View>

                <View style={styles.recommendationCard}>
                    <Text style={styles.recommendationHeader}>Additional Nutrients</Text>
                    <Text style={styles.recommendationText}>• Zinc Sulfate: 25 kg/ha</Text>
                    <Text style={styles.recommendationText}>• Boron: 1-2 kg/ha</Text>
                </View>
            </View>
        );
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
                            style={[
                                styles.cropCard,
                                selectedCrop?.id === crop.id && styles.selectedCrop,
                            ]}
                            onPress={() => setSelectedCrop(crop)}
                        >
                            <View style={styles.cropImageContainer}>
                                {/* Crop Image Placeholder */}
                                <View style={styles.cropImagePlaceholder}>
                                    <Text style={styles.placeholderText}>Image</Text>
                                </View>
                            </View>
                            <Text style={styles.cropName}>{crop.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {renderFertilizerRecommendations()}
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
    selectedCrop: {
        borderWidth: 2,
        borderColor: colors.GREEN,
    },
    cropImageContainer: {
        width: wp('30%'),
        height: wp('30%'),
        marginBottom: hp('1%'),
    },
    cropImagePlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.LIGHT_GRAY,
        borderRadius: wp('2%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        fontSize: wp('3.5%'),
        color: colors.GRAY,
    },
    cropName: {
        fontSize: wp('4%'),
        color: colors.BLACK,
        textAlign: 'center',
    },
    recommendationsContainer: {
        marginTop: hp('2%'),
    },
    recommendationsTitle: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        color: colors.BLACK,
        marginBottom: hp('2%'),
    },
    recommendationCard: {
        backgroundColor: colors.WHITE,
        borderRadius: wp('3%'),
        padding: wp('4%'),
        marginBottom: hp('2%'),
        elevation: 2,
        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    recommendationHeader: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
        color: colors.BLACK,
        marginBottom: hp('1%'),
    },
    recommendationText: {
        fontSize: wp('3.8%'),
        color: colors.GRAY,
        marginBottom: hp('0.5%'),
        lineHeight: wp('5.5%'),
    },
    bottomBarContainer: {
        height: hp('8%'),
        backgroundColor: colors.WHITE,
        borderTopWidth: 1,
        borderTopColor: colors.LIGHT_GRAY,
    },
});

export default FertilizerAdvisor; 