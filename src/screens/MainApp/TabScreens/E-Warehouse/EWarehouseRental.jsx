import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import { fonts } from '../../../../../util/Constants/FontName.js';
import colors from '../../../../../util/Constants/colors.js';
import ScreensName from '../../../../../util/Constants/ScreensName.ts';

const warehouseTypes = [
    {
        title: "Silo",
        screen: ScreensName.ESiloRental2,
        img: require("../../../../assets/MainApp/E-Warehouse/Silo.png"),
        location: "95 Km away",
        description: "Grain storage silos for bulk agricultural commodities"
    },
    {
        title: "Temperature Controlled",
        screen: ScreensName.EColdStorageRental,
        img: require("../../../../assets/MainApp/E-Warehouse/TemperatureInside.png"),
        location: "120 Km away",
        description: "Climate-controlled storage for perishable goods"
    },
    {
        title: "Cold Storage",
        screen: ScreensName.EColdStorageRental,
        img: require("../../../../assets/MainApp/E-Warehouse/ColdStorage.png"),
        location: "85 Km away",
        description: "Low temperature storage for frozen products"
    },
    {
        title: "Dry Beds",
        screen: ScreensName.EColdStorageRental,
        img: require("../../../../assets/MainApp/E-Warehouse/DryBeds.png"),
        location: "65 Km away",
        description: "Moisture-free storage beds for dry goods"
    }
];

function EWarehouseRental() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    
    const handleStoragePress = (item) => {
        console.log('Navigating to', item.screen, 'with params:', {
            storageType: item.title,
            location: item.location,
            description: item.description
        });
        
        navigation.navigate(item.screen, {
            storageType: item.title,
            location: item.location,
            description: item.description,
            imageSource: item.img
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>

            <ScrollView style={styles.container}>
                <View style={styles.searchContainer}>
                    <CustomSearchApp placeholder={t('Search in here')} />
                </View>

                <View style={styles.titleWrapper}>
                    <Text style={styles.titleText}>{t('Warehouse Rental')}</Text>
                </View>

                <View style={styles.subtitleWrapper}>
                    <Text style={styles.subtitleText}>{t('Choose the warehouse you need')}</Text>
                </View>

                <View style={styles.scrollContainer}>
                    {warehouseTypes.map((type, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.storageBox}
                            onPress={() => handleStoragePress(type)}
                        >
                            <Image 
                                source={type.img}
                                style={styles.storageImage}
                                resizeMode="contain"
                            />
                            <Text style={styles.storageTitle}>{t(type.title)}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

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
    searchContainer: {
        marginTop: hp('2%'),
        height: hp('7%'),
        marginHorizontal: hp(2),
    },
    titleWrapper: {
        marginHorizontal: hp(4),
        marginTop: hp(1),
        marginBottom: hp(0.5),
    },
    titleText: {
        fontSize: hp(3.2),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        letterSpacing: hp(0.1),
    },
    subtitleWrapper: {
        marginHorizontal: hp(4),
        marginBottom: hp(2),
    },
    subtitleText: {
        fontSize: hp(2),
        fontFamily: fonts.Regular,
        color: colors.DARK_GRAY,
    },
    scrollContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingVertical: hp("1%"),
        paddingHorizontal: wp("4%"),
        width: '100%',
    },
    storageBox: {
        marginBottom: hp("2%"),
        width: wp("40%"),
        backgroundColor: colors.WHITE,
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        borderRadius: hp(2),
        padding: hp(2),
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,
    },
    storageImage: {
        width: wp(20),
        height: hp(10),
        marginBottom: hp(1),
    },
    storageTitle: {
        fontSize: hp(1.8),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        textAlign: 'center',
    },
});

export default EWarehouseRental; 