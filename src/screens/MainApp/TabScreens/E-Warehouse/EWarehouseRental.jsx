import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import EInventoryBoxes from '../../CustomComponent/EInventoryBoxes.jsx';
import { fonts } from '../../../../../util/Constants/FontName.js';
import colors from '../../../../../util/Constants/colors.js';
import ScreensName from '../../../../../util/Constants/ScreensName.ts';

const warehouseTypes = [
    {
        title: "Silo",
        screen: ScreensName.ESiloRental2,
        img: require("../../../../assets/MainApp/E-Warehouse/Silo.png"),
    },
    {
        title: "Temperature Controlled",
        screen: ScreensName.EWarehouseNewSpaceConfirmWarehouse,
        img: require("../../../../assets/MainApp/E-Warehouse/TemperatureInside.png"),
    },
    {
        title: "Cold Storage",
        screen: ScreensName.EColdStorageRental,
        img: require("../../../../assets/MainApp/E-Warehouse/ColdStorage.png"),
    },
    {
        title: "Dry Beds",
        screen: ScreensName.EWarehouseNewSpaceConfirmWarehouse,
        img: require("../../../../assets/MainApp/E-Warehouse/DryBeds.png"),
    }
];

function EWarehouseRental() {
    const { t } = useTranslation();

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

                <View style={styles.bodyContainer}>
                    <View style={styles.scrollContainer}>
                        {warehouseTypes.map((type, index) => (
                            <View style={styles.itemBoxWrapper} key={index}>
                                <EInventoryBoxes
                                    name={t(type.title)}
                                    screenName={type.screen}
                                    navigationName={ScreensName.EWarehouseMainStack}
                                    SourceGiven={type.img}
                                    isNavigation={1}
                                    w={wp("26%")}
                                    h={hp("14%")}
                                    img_size_h={hp(6.5)}
                                    img_size_w={wp(14)}
                                    font_Size={hp('1.8%')}
                                    isLightBold={true}
                                    fontcolor={colors.BLACK}
                                    backgroundColor={colors.WHITE}
                                    elevation={0}
                                    borderRadius={hp(2)}
                                />
                            </View>
                        ))}
                    </View>
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
    bodyContainer: {
        // marginHorizontal: hp(2),
        // marginLeft: hp(2),
    },
    scrollContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingVertical: hp("1%"),
        width: '100%',
    },
    itemBoxWrapper: {
        marginBottom: hp("2%"),
        // width: wp(44),
        // backgroundColor: "red",

    },
});

export default EWarehouseRental; 