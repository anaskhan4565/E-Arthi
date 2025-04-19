import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    FlatList,
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

// Sample auction history data
const AUCTION_HISTORY = [
    {
        id: '1',
        productName: 'Fruits',
        startPrice: 100,
        grading: 'A+',
        region: 'Karachi',
        endDate: '01/01/2025',
        endTime: '06:13',
        status: 'won',
    },
    {
        id: '2',
        productName: 'Fruits',
        startPrice: 100,
        grading: 'B',
        region: 'Lahore',
        endDate: '01/01/2025',
        endTime: '06:13',
        status: 'ongoing',
    },
    {
        id: '3',
        productName: 'Fruits',
        startPrice: 100,
        grading: 'A',
        region: 'Islamabad',
        endDate: '01/01/2025',
        endTime: '06:13',
        status: 'won',
    }
];

function AuctionHistory() {
    const { t } = useTranslation();
    const navigation = useNavigation();

    const handleAuctionPress = (auction) => {
        navigation.navigate(ScreensName.AuctionHistoryDetails, { auctionData: auction });
    };



    const renderAuctionItem = ({ item }) => (
        <TouchableOpacity
            style={styles.auctionItem}
            onPress={() => handleAuctionPress(item)}
        >
            <View style={styles.auctionImageContainer}>
                <View style={styles.placeholderImage} />
            </View>
            <View style={styles.auctionDetails}>
                <Text style={styles.auctionPrice}>{t('Product Name')}: {t(item.productName)}</Text>
                <Text style={styles.auctionPrice}>{t('Auction Start Price')}: {item.startPrice} Rs</Text>
                <Text style={styles.auctionGrading}>{t('Grading')}: {item.grading}</Text>
                <Text style={styles.auctionRegion}>{t('Region')}: {t(item.region)}</Text>
                <Text style={styles.auctionEndsAt}>{t('Auction ends at')}:</Text>
                <View style={styles.dateTimeContainer}>
                    <Text style={styles.auctionDate}>{item.endDate}</Text>
                    <Text style={styles.auctionTime}>{item.endTime}</Text>
                </View>
            </View>
            <View style={styles.statusBadgeContainer}>
                <View style={[
                    styles.statusBadge,
                    item.status === 'won' ? styles.wonBadge : styles.ongoingBadge
                ]}>
                    <Text style={styles.statusText}>
                        {item.status === 'won' ? t('Won') : t('On going')}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar hasBackButton={true} />
            </View>

            <View style={styles.searchContainer}>
                <CustomSearchApp placeholder={t('Search in here')} />
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>{t('History')}</Text>

                <FlatList
                    data={AUCTION_HISTORY}
                    renderItem={renderAuctionItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.auctionsList}
                    showsVerticalScrollIndicator={false}
                />
            </View>
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
    content: {
        flex: 1,
        padding: hp(3),
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(2),
    },
    title: {
        fontSize: hp(3),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
    },
    paymentHistoryButton: {
        backgroundColor: colors.GREEN,
        paddingHorizontal: wp(3),
        paddingVertical: hp(1),
        borderRadius: hp(1),
    },
    paymentHistoryButtonText: {
        color: colors.WHITE,
        fontFamily: fonts.Medium,
        fontSize: hp(1.5),
    },
    auctionsList: {
        paddingBottom: hp(5),
    },
    auctionItem: {
        flexDirection: 'row',
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: hp(1.5),
        marginBottom: hp(3),
        padding: hp(1.5),
        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
    },
    auctionImageContainer: {
        width: wp(25),
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderImage: {
        width: wp(20),
        height: wp(20),
        backgroundColor: colors.LIGHT_GRAY,
        borderRadius: hp(1),
    },
    auctionDetails: {
        flex: 1,
        paddingLeft: wp(2),
        justifyContent: 'center',
        marginTop: hp(4),
    },
    auctionPrice: {
        fontSize: hp(1.5),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        marginBottom: hp(0.1),
    },
    auctionGrading: {
        fontSize: hp(1.5),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        marginBottom: hp(0.3),
    },
    auctionRegion: {
        fontSize: hp(1.5),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        marginBottom: hp(0.3),
    },
    auctionEndsAt: {
        fontSize: hp(1.5),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        marginBottom: hp(0.3),
    },
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp(35),
    },
    auctionDate: {
        fontSize: hp(1.5),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        backgroundColor: colors.WHITE,
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.5),
        borderRadius: hp(1),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
    },
    auctionTime: {
        fontSize: hp(1.5),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        backgroundColor: colors.WHITE,
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.5),
        borderRadius: hp(1),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
    },
    statusBadgeContainer: {
        position: 'absolute',
        top: hp(1.5),
        right: wp(4),
    },
    statusBadge: {
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.4),
        borderRadius: hp(1),
    },
    wonBadge: {
        backgroundColor: colors.GREEN,
    },
    ongoingBadge: {
        backgroundColor: colors.ORANGE,
    },
    statusText: {
        fontSize: hp(1.4),
        fontFamily: fonts.Medium,
        color: colors.WHITE,
    },
});

export default AuctionHistory; 