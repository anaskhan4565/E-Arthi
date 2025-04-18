import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';

import Navbar from '../../Navbar/Navbar.jsx';
import { fonts } from '../../../../../util/Constants/FontName.js';
import colors from '../../../../../util/Constants/colors.js';

function MyAuctionDetail({ route }) {
    const { t } = useTranslation();
    const { auctionData } = route.params;

    const renderDetailRow = (label, value) => (
        <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{label}</Text>
            <Text style={styles.detailValue}>{value}</Text>
        </View>
    );

    const renderBidderRow = (user, bid) => (
        <View style={styles.bidderRow}>
            <Text style={styles.bidderName}>{user}</Text>
            <Text style={styles.bidAmount}>{bid} Rs</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar hasBackButton={true} />
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>{auctionData?.title || t('Auction')}</Text>
                    <View style={[styles.statusBadge, auctionData?.status === 'ended' ? styles.endedBadge : styles.activeBadge]}>
                        <Text style={styles.statusText}>{auctionData?.status === 'ended' ? t('Ended') : t('Active')}</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>{t('Bidding Highlights')}</Text>

                <View style={styles.productDetailsCard}>
                    <View style={styles.imagePlaceholder} />
                    <View style={styles.productDetails}>
                        <Text style={styles.detailsTitle}>{t('Product Details')}</Text>
                        <View style={styles.detailsRow}>
                            <View style={styles.detailColumn}>
                                <Text style={styles.detailLabel}>{t('Made By:')}</Text>
                                <Text style={styles.detailValue}>{auctionData?.sellerName || 'User'}</Text>
                            </View>
                            <View style={styles.verticalDivider} />
                            <View style={styles.detailColumn}>
                                <Text style={styles.detailLabel}>{t('Product Name:')}</Text>
                                <Text style={styles.detailValue}>{auctionData?.productName || 'Product X'}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.auctionInfoCard}>
                    <View style={styles.auctionInfoRow}>
                        <View style={styles.infoColumn}>
                            <Text style={styles.infoLabel}>{t('Auction starts at:')}</Text>
                            <Text style={styles.infoValue}>{auctionData?.startDate||'18/04/2025'} {auctionData?.startTime||'10:00'}</Text>
                        </View>
                        <View style={styles.verticalDivider} />
                        <View style={styles.infoColumn}>
                            <Text style={styles.infoLabel}>{t('Auction ends at:')}</Text>
                            <Text style={styles.infoValue}>{auctionData?.endDate||'18/04/2025'} {auctionData?.endTime||'10:00 AM'}</Text>
                        </View>
                    </View>
                    <View style={styles.horizontalDivider} />
                    <View style={styles.auctionInfoRow}>
                        <View style={styles.infoColumn}>
                            <Text style={styles.infoLabel}>{t('Auction start price:')}</Text>
                            <Text style={styles.infoValue}>{auctionData?.startPrice} Rs</Text>
                        </View>
                        <View style={styles.verticalDivider} />
                        <View style={styles.infoColumn}>
                            <Text style={styles.infoLabel}>{t('Number of bids')}</Text>
                            <Text style={styles.infoValue}>{auctionData?.numberOfBids || '0'}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.biddersSection}>
                    <Text style={styles.sectionTitle}>{t('Top three highest bidders:')}</Text>
                    <View style={styles.biddersCard}>
                        <View style={styles.biddersHeader}>
                            <Text style={styles.headerText}>Users</Text>
                            <Text style={styles.headerText}>Bids</Text>
                        </View>
                        <View style={styles.biddersList}>
                            <View style={styles.bidderRow}>
                                <Text style={styles.bidderText}>User 1</Text>
                                <Text style={styles.bidAmount}>1000</Text>
                            </View>
                            <View style={[styles.bidderRow, styles.middleRow]}>
                                <Text style={styles.bidderText}>User 1</Text>
                                <Text style={styles.bidAmount}>1000</Text>
                            </View>
                            <View style={styles.bidderRow}>
                                <Text style={styles.bidderText}>User 1</Text>
                                <Text style={styles.bidAmount}>1000</Text>
                            </View>
                        </View>
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
    content: {
        flex: 1,
        padding: hp(2.5),
    },
    header: {
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
    statusBadge: {
        backgroundColor: colors.RED,
        paddingHorizontal: wp(4),
        paddingVertical: hp(0.7),
        borderRadius: hp(2),
    },
    endedBadge: {
        backgroundColor: colors.RED,
    },
    activeBadge: {
        backgroundColor: colors.GREEN,
    },
    statusText: {
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
    productDetailsCard: {
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: 6,
        padding: hp(2),
        flexDirection: 'row',
        gap: wp(4),
        marginBottom: hp(2),
        elevation: 2,
    },
    imagePlaceholder: {
        width: wp(30),
        aspectRatio: 1,
        backgroundColor: colors.LIGHT_GRAY,
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
    biddersSection: {
        marginBottom: hp(6),
    },
    biddersCard: {
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: 6,
        width: '80%',
        alignSelf: 'center',
        elevation: 2,
    },
    biddersHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp(8),
        paddingVertical: hp(2),

    },
    headerText: {
        fontSize: hp(1.9),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
    },
    biddersList: {
    
    },
    bidderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp(8),
        paddingVertical: hp(1),

    },
    middleRow: {
 
    },
    bidderText: {
        fontSize: hp(1.8),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
    bidAmount: {
        fontSize: hp(2),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
    statusSection: {
        marginTop: hp(2),
    },
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    paymentLabel: {
        fontSize: hp(2),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
    pendingText: {
        fontSize: hp(2),
        fontFamily: fonts.Regular,
        color: colors.ORANGE,
    },
});

export default MyAuctionDetail; 