import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';

import Navbar from '../../Navbar/Navbar.jsx';
import { fonts } from '../../../../../util/Constants/FontName.js';
import colors from '../../../../../util/Constants/colors.js';
import ScreensName from '../../../../../util/Constants/ScreensName.ts';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
function AuctionHistoryDetails() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const route = useRoute();
    const { auctionData } = route.params;

    // Handle payment button press
    const handlePayNow = () => {
        navigation.navigate(ScreensName.AuctionHistoryPaymentMethod, { auctionData });
    };

    // Render auction product details
    const renderProductDetails = () => (
        <View style={styles.productDetailsCard}>
            <View style={styles.imageContainer}>
                {auctionData.image ? (
                    <Image source={auctionData.image} style={styles.productImage} />
                ) : (
                    <View style={styles.imagePlaceholder} />
                )}
            </View>
            <View style={styles.productDetails}>
                <Text style={styles.detailsTitle}>{t('Product Details')}</Text>
                <View style={styles.detailsRow}>
                    <View style={styles.detailColumn}>
                        <Text style={styles.detailLabel}>{t('Made By:')}</Text>
                        <Text style={styles.detailValue}>User</Text>
                    </View>
                    <View style={styles.verticalDivider} />
                    <View style={styles.detailColumn}>
                        <Text style={styles.detailLabel}>{t('Product Name:')}</Text>
                        <Text style={styles.detailValue}>{auctionData.productName}</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    // Render auction timing and pricing information
    const renderAuctionInfo = () => (
        <View style={styles.auctionInfoCard}>
            <View style={styles.auctionInfoRow}>
                <View style={styles.infoColumn}>
                    <Text style={styles.infoLabel}>{t('Auction starts at:')}</Text>
                    <Text style={styles.infoValue}>01/01/2025 06:13</Text>
                </View>
                <View style={styles.verticalDivider} />
                <View style={styles.infoColumn}>
                    <Text style={styles.infoLabel}>{t('Auction ends at:')}</Text>
                    <Text style={styles.infoValue}>{auctionData.endDate} {auctionData.endTime}</Text>
                </View>
            </View>
            <View style={styles.horizontalDivider} />
            <View style={styles.auctionInfoRow}>
                <View style={styles.infoColumn}>
                    <Text style={styles.infoLabel}>{t('Auction start price:')}</Text>
                    <Text style={styles.infoValue}>{auctionData.startPrice} Rs</Text>
                </View>
                <View style={styles.verticalDivider} />
                <View style={styles.infoColumn}>
                    <Text style={styles.infoLabel}>{t('Winning bid:')}</Text>
                    <Text style={styles.infoValue}>{auctionData.startPrice} Rs</Text>
                </View>
            </View>
        </View>
    );

    // Render status information
    const renderStatus = () => (
        <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>{t('Status')}:</Text>
            {auctionData.status === 'won' && (
                <View style={styles.wonContainer}>
                    <View style={styles.statusBadge}>
                        <Text style={styles.badgeText}>Won</Text>
                    </View>
                </View>
            )}
        </View>
    );

    // Render payment section
    const renderPayment = () => (
        <View style={styles.paymentContainer}>
            <Text style={styles.paymentLabel}>{t('Payment')}:</Text>
            <TouchableOpacity
                style={styles.payButton}
                onPress={handlePayNow}
            >
                <Text style={styles.payButtonText}>{t('Pay now')}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar hasBackButton={true} />
            </View>

            <View style={styles.searchContainer}>
                <CustomSearchApp placeholder={t("Search in here")} />

            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>{t('Auction 1')}</Text>
                    {auctionData.status === 'won' && (
                        <View style={styles.headerStatusBadge}>
                            <Text style={styles.headerBadgeText}>Won</Text>
                        </View>
                    )}
                </View>

                <Text style={styles.sectionTitle}>{t('Bidding Highlights')}</Text>

                {renderProductDetails()}
                {renderAuctionInfo()}
                {renderStatus()}
                {renderPayment()}
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
    searchInputContainer: {
        flexDirection: 'row',
        height: hp('6%'),
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: hp('3%'),
        alignItems: 'center',
        paddingHorizontal: wp('4%'),
    },
    searchInput: {
        flex: 1,
        height: hp('5%'),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
    searchIconContainer: {
        width: wp('8%'),
        height: wp('8%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchIcon: {
        fontSize: hp('2.5%'),
    },
    content: {
        flex: 1,
        padding: hp(2.5),
    },
    headerContainer: {
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
    headerStatusBadge: {
        backgroundColor: colors.GREEN,
        paddingHorizontal: wp(3),
        paddingVertical: hp(0.7),
        borderRadius: hp(2),
    },
    headerBadgeText: {
        color: colors.WHITE,
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
    },
    sectionTitle: {
        fontSize: hp(2.4),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp(2),
    },
    // Product details card styles
    productDetailsCard: {
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: 6,
        padding: hp(2),
        flexDirection: 'row',
        gap: wp(4),
        marginBottom: hp(2),
        elevation: 2,
    },
    imageContainer: {
        width: wp(30),
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePlaceholder: {
        width: wp(30),
        aspectRatio: 1,
        backgroundColor: colors.LIGHT_GRAY,
        borderRadius: hp(1),
    },
    productImage: {
        width: wp(30),
        aspectRatio: 1,
        borderRadius: hp(1),
    },
    productDetails: {
        flex: 1,
    },
    detailsTitle: {
        fontSize: hp(2.2),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp(2),
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailColumn: {
        flex: 1,
    },
    detailLabel: {
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.GRAY,
        marginBottom: hp(0.5),
    },
    detailValue: {
        fontSize: hp(1.8),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
    },
    // Auction Info Card styles
    auctionInfoCard: {
        backgroundColor: colors.WHITE,
        borderRadius: 6,
        padding: hp(2),
        marginBottom: hp(2),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
    },
    auctionInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoColumn: {
        flex: 1,
        paddingHorizontal: wp(2),
    },
    infoLabel: {
        fontSize: hp(1.6),
        fontFamily: fonts.Medium,
        color: colors.GRAY,
        marginBottom: hp(1),
    },
    infoValue: {
        fontSize: hp(1.6),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp(0.5),
    },
    verticalDivider: {
        width: 1,
        backgroundColor: colors.DARK_GREEN,
        marginHorizontal: wp(4),
        alignSelf: 'stretch',
    },
    horizontalDivider: {
        height: 1,
        backgroundColor: colors.DARK_GREEN,
        width: '100%',
        marginVertical: hp(2),
    },
    // Status styles
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(2),
    },
    statusLabel: {
        fontSize: hp(2),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        marginRight: wp(4),
    },
    wonContainer: {
        flex: 1,
    },
    statusBadge: {
        backgroundColor: colors.GREEN,
        paddingHorizontal: wp(3),
        paddingVertical: hp(0.5),
        borderRadius: hp(1),
        alignSelf: 'flex-start',
    },
    badgeText: {
        color: colors.WHITE,
        fontSize: hp(1.5),
        fontFamily: fonts.Medium,
    },
    // Payment styles
    paymentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: hp(4),
    },
    paymentLabel: {
        fontSize: hp(2),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
    },
    payButton: {
        backgroundColor: colors.GREEN,
        paddingHorizontal: wp(4),
        paddingVertical: hp(1),
        borderRadius: hp(1),
    },
    payButtonText: {
        color: colors.WHITE,
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
    },
});

export default AuctionHistoryDetails; 