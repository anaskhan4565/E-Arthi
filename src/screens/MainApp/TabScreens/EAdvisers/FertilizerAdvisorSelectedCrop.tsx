import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Navbar from '../../Navbar/Navbar';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';
import ScreensName from '../../../../../util/Constants/ScreensName';
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

type RootStackParamList = {
    FertilizerAdvisorSelectedCrop: { crop: CropType };
};

type FertilizerAdvisorSelectedCropRouteProp = RouteProp<RootStackParamList, 'FertilizerAdvisorSelectedCrop'>;

const FertilizerAdvisorSelectedCrop = () => {
    const navigation = useNavigation();
    const route = useRoute<FertilizerAdvisorSelectedCropRouteProp>();
    const { crop } = route.params;

    if (!crop) {
        return (
            <View style={styles.container}>
                <Navbar gobackOnly={true} />
                <Text style={styles.errorText}>No crop data available</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>
            <ScrollView style={styles.content}>
                <Text style={styles.title}>{crop.name}</Text>

                <View style={styles.imageContainer}>
                    <Image
                        source={crop.image}
                        style={styles.cropImage}
                        resizeMode="cover"
                    />
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.sectionTitle}>Crop Details:</Text>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Growth Duration:</Text>
                        <Text style={styles.detailValue}>{crop.growthDuration || '110-130 days'}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Water Requirement:</Text>
                        <Text style={styles.detailValue}>{crop.waterRequirement || 'Medium'}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Soil Type:</Text>
                        <Text style={styles.detailValue}>{crop.soilType || 'Sandy or Clay-loam'}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Expected Yield:</Text>
                        <Text style={styles.detailValue}>{crop.expectedYield || '2,500-3,500 kg per acre'}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Seed Requirement:</Text>
                        <Text style={styles.detailValue}>{crop.seedRequirement || '57 kg of seed per acre'}</Text>
                    </View>
                </View>

                <View style={styles.fertilizerContainer}>
                    <Text style={styles.sectionTitle}>Ideal Fertilizer:</Text>
                    <Text style={styles.fertilizerName}>{crop.idealFertilizer.name}</Text>
                    <Text style={styles.fertilizerDescription}>
                        {crop.idealFertilizer.description}
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} 
                    onPress={() => {navigation.navigate(ScreensName.ApplicationInstructions)}}>
                        <Text style={styles.buttonText}>View Application Instructions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button]}
                        onPress={() => {navigation.navigate(ScreensName.EMarketMainStack)}}
                    >
                        <Text style={styles.buttonText}>View Product in Marketplace</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    content: {
        flex: 1,
        padding: wp('4%'),
    },
    errorText: {
        fontSize: wp('4%'),
        color: colors.RED,
        textAlign: 'center',
        marginTop: hp('2%'),
    },
    title: {
        fontSize: wp('6%'),
        fontWeight: 'bold',
        color: colors.BLACK,
        marginBottom: hp('2%'),
    },
    imageContainer: {
        width: '100%',
        height: hp('25%'),
        borderRadius: wp('3%'),
        overflow: 'hidden',
        marginBottom: hp('3%'),
    },
    cropImage: {
        width: '100%',
        height: '100%',
    },
    detailsContainer: {
        backgroundColor: colors.WHITE,
        borderRadius: wp('3%'),
        padding: wp('4%'),
        marginBottom: hp('2%'),
    },
    sectionTitle: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        color: colors.BLACK,
        marginBottom: hp('2%'),
    },
    detailRow: {
        flexDirection: 'row',
        marginBottom: hp('1%'),
    },
    detailLabel: {
        fontSize: wp('4%'),
        marginRight: wp('2%'),
    },
    detailValue: {
        fontSize: wp('4%'),
        color: colors.BLACK,
        fontWeight: '600',
        flex: 1,
    },
    fertilizerContainer: {
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: wp('3%'),
        padding: wp('4%'),
        marginBottom: hp('2%'),
    },
    fertilizerName: {
        fontSize: wp('4.5%'),
        fontWeight: '600',
        color: colors.BLACK,
        marginBottom: hp('1%'),
        textAlign: 'center',
    },
    fertilizerDescription: {
        fontSize: wp('4%'),
        color: colors.BLACK,
        fontFamily: fonts.Regular,
        lineHeight: wp('5.5%'),
    },
    buttonContainer: {
        gap: hp('2%'),
        marginBottom: hp('4%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: colors.GREEN,
        borderRadius: wp('2%'),
        padding: wp('4%'),
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        
    },
    
    buttonText: {
        color: colors.WHITE,
        fontSize: wp('4%'),
        fontWeight: '600',
        fontFamily: fonts.Regular,
        textAlign: 'center',
    },
    navbarContainer: {
      height: hp('8.5%'),
      backgroundColor: colors.WHITE,
      borderBottomWidth: 1,
      borderBottomColor: colors.LIGHT_GRAY,
  },
});

export default FertilizerAdvisorSelectedCrop;