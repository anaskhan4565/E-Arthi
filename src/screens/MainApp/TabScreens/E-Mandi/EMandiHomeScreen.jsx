import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import { fonts } from '../../../../../util/Constants/FontName.js';
import colors from '../../../../../util/Constants/colors.js';
import ScreensName from '../../../../../util/Constants/ScreensName.ts';

// Import SVG icons
import AuctionSvg from '../../../../assets/MainApp/E-MandiNew/Auction.svg';
import MyAuctionSvg from '../../../../assets/MainApp/E-MandiNew/MyAuction.svg';
import LiveAuctionSvg from '../../../../assets/MainApp/E-MandiNew/LiveAuction.svg';
import RentalsSvg from '../../../../assets/MainApp/E-MandiNew/Rentals.svg';

const mandiOptions = [
    {
        title: "Request for Auction",
        screen: ScreensName.RequestForAuction,
        SvgIcon: AuctionSvg,
    },
    {
        title: "My Auctions",
        screen: ScreensName.MyAuctions,
        SvgIcon: MyAuctionSvg,
    },
    {
        title: "Live Auctions",
        screen: ScreensName.LiveAuctions,
        SvgIcon: LiveAuctionSvg,
        isLarger: true, // Flag to make this icon larger
    },
    {
        title: "History",
        screen: ScreensName.AuctionHistory,
        SvgIcon: RentalsSvg,
    }
];

function EMandiHomeScreen() {
    const { t } = useTranslation();
    const navigation = useNavigation();

    const handleNavigation = (screenName) => {
        navigation.navigate(ScreensName.EMandiMainStack, { screen: screenName });
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
                    <Text style={styles.titleText}>{t('E-Mandi')}</Text>
                </View>

                <View style={styles.bodyContainer}>
                    <View style={styles.scrollContainer}>
                        {mandiOptions.map((option, index) => {
                            const IconComponent = option.SvgIcon;
                            // Default and larger sizes for icons
                            const iconSize = option.isLarger
                                ? { width: wp(22), height: hp(11) }
                                : { width: wp(16), height: hp(7) };

                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.itemBox}
                                    onPress={() => handleNavigation(option.screen)}
                                >
                                    <View style={[styles.iconContainer, option.isLarger && { marginTop: hp(-3) }]}>
                                        <IconComponent
                                            width={iconSize.width}
                                            height={iconSize.height}
                                        />
                                    </View>
                                    <Text style={[
                                        styles.itemText,
                                        option.isLarger && { marginTop: hp(-1.5) }
                                    ]}>
                                        {t(option.title)}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
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
        // No left margin
    },
    scrollContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: hp(2),
        paddingVertical: hp("1%"),
        width: '100%',
    },
    itemBox: {
        width: wp("23%"),
        height: hp("14%"),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
        borderRadius: hp(2),
        marginBottom: hp("2%"),
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(0.5),
    },
    itemText: {
        textAlign: 'center',
        fontSize: hp('1.8%'),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
    },
});

export default EMandiHomeScreen; 