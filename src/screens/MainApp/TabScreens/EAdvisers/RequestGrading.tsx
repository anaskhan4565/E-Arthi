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
import ScreensName from '../../../../../util/Constants/ScreensName';
import { fonts } from '../../../../../util/Constants/FontName';
import CustomButton from '../../../../components/CustomButton';

type RootStackParamList = {
    FertilizerAdvisorSelectedCrop: { crop: CropType };
    CropYield: { crop: CropType };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'FertilizerAdvisorSelectedCrop' | 'CropYield'>;

type CropType = {
    id: string;
    name: string;
    image: any;
};

const crops: CropType[] = [
    {
        id: '1',
        name: 'Wheat',
        image: require('./Images/Crops/wheat.png'),
        
    },
    {
        id: '2',
        name: 'Rice',
        image: require('./Images/Crops/rice.png'),
        
    },
    {
        id: '3',
        name: 'Corn',
        image: require('./Images/Crops/corn.png'),
        
    },
    {
        id: '4',
        name: 'Potato',
        image: require('./Images/Crops/potato.png'),
        
    },
];

const RequestGrading = () => {
    const navigation = useNavigation<NavigationProp>();

    const handleCropSelect = (crop: CropType) => {
      navigation.navigate(ScreensName.RequestGradingDone, { crop });
    };

    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>

            <ScrollView style={styles.content}>
                <Text style={styles.title}>Request Grading</Text>
                <Text style={styles.subtitle}>Choose the crop to request grading for:</Text>

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

                <View style={styles.bottomBarContainer}>    
                    <CustomButton
                        MainText={"Request Grading for other crops"}
                        BgGiven={colors.PRIMARY}
                        name={"Request Grading"}
                        isNavigation={true}
                        txColor={colors.WHITE}
                        wgiven={wp('80%')}
                    />W
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
        color: colors.BLACK,
        marginBottom: hp('1%'),
        fontFamily: fonts.Medium,
    },
    subtitle: {
        fontSize: wp('4%'),
        
        marginBottom: hp('3%'),
        fontFamily: fonts.Regular,
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
        borderRadius: wp('3%'),
        padding: wp('3%'),
        backgroundColor: colors.LIGHT_GREEN,
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
        fontFamily: fonts.Regular,
    },
    bottomBarContainer: {
        height: hp('8%'),
        backgroundColor: colors.WHITE,
        borderTopWidth: 1,
        borderTopColor: colors.LIGHT_GRAY,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default RequestGrading;   