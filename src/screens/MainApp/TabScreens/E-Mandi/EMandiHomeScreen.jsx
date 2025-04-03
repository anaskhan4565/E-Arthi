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

import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import EInventoryBoxes from '../../CustomComponent/EInventoryBoxes.jsx';
import { fonts } from '../../../../../util/Constants/FontName.js';
import colors from '../../../../../util/Constants/colors.js';
import ScreensName from '../../../../../util/Constants/ScreensName.ts';

const mandiOptions = [
    {
        title: "Request for Auction",
        screen: ScreensName.RequestForAuction,
        img: require("../../../../assets/MainApp/E-MandiNew/Auction.png"),
    },
    {
        title: "My Auctions",
        screen: ScreensName.MyAuctions,
        img: require("../../../../assets/MainApp/E-MandiNew/MyAuction.png"),
    },
    {
        title: "Auctions",
        screen: ScreensName.Auctions,
        img: require("../../../../assets/MainApp/E-MandiNew/LiveAuction.png"),
    },
    {
        title: "History",
        screen: ScreensName.AuctionHistory,
        img: require("../../../../assets/MainApp/E-MandiNew/Rentals.png"),
    }
];

function EMandiHomeScreen() {
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
                    <Text style={styles.titleText}>{t('E-Mundi')}</Text>
                </View>

                <View style={styles.bodyContainer}>
                    <View style={styles.scrollContainer}>
                        {mandiOptions.map((option, index) => (
                            <View style={styles.itemBoxWrapper} key={index}>
                                <EInventoryBoxes
                                    name={t(option.title)}
                                    screenName={option.screen}
                                    navigationName={ScreensName.EMandiMainStack}
                                    SourceGiven={option.img}
                                    isNavigation={1}
                                    w={wp("23%")}
                                    h={hp("14%")}
                                    img_size_h={hp(7)}
                                    img_size_w={wp(16)}
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
        marginBottom: hp(2),
    },
    titleText: {
        fontSize: hp(3.2),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        letterSpacing: hp(0.1),
    },
    bodyContainer: {
        // marginLeft: hp(3),
    },
    scrollContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: hp(2),
        paddingVertical: hp("1%"),
        width: '100%',
    },
    itemBoxWrapper: {
        marginBottom: hp("2%"),
    },
});

export default EMandiHomeScreen; 