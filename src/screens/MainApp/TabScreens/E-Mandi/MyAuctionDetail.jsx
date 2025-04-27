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
import { useState, useEffect } from 'react';
import { database } from '../../../../../firebase/firebase';
import { ref, get } from 'firebase/database';

function MyAuctionDetail({ route }) {
    const { t } = useTranslation();
    const { auctionData } = route.params;

    const renderDetailRow = (label, value) => (
        <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{label}</Text>
            <Text style={styles.detailValue}>{value}</Text>
        </View>
    );
    const getImageSource = (item) => {
        // Try multiple ways to get image source
        if (item.imageData && item.imageData.source) {
            return item.imageData.source;
        } else if (item.imageData && item.imageData.base64) {
            const mimeType = item.imageData.type || 'image/jpeg';
            return { uri: `data:${mimeType};base64,${item.imageData.base64}` };
        } else if (item.imageUrl) {
            return { uri: item.imageUrl };
        }
        // Fallback to a default image
        return require('./pics/ac1.png');
    };

    const [topBidders, setTopBidders] = useState([]);
    const [totalBids, setTotalBids] = useState(0);
    const [uniqueBidders, setUniqueBidders] = useState(0);

    useEffect(() => {
        const fetchTopBids = async () => {
            try {
                const auctionRef = ref(database, `allAuctions/${auctionData.id}`);
                const snapshot = await get(auctionRef);
                const auction = snapshot.val();
    
                if (auction?.highestBids && auction.highestBids.length > 0) {
                    // Process bids to show each user once with their highest bid
                    const uniqueUserBids = processUniqueBids(auction.highestBids);
                    setTopBidders(uniqueUserBids);
                    
                    // Set total number of bids
                    setTotalBids(auction.numberOfBids || 0);
                    
                    // Count unique bidders
                    const uniqueUserCount = new Set(auction.highestBids.map(bid => bid.userId)).size;
                    setUniqueBidders(uniqueUserCount);
                } else {
                    setTopBidders([]);
                    setTotalBids(0);
                    setUniqueBidders(0);
                }
            } catch (error) {
                console.error('Error fetching top bids:', error);
            }
        };
    
        fetchTopBids();
    }, [auctionData.id]);
    
    // Process bids to get only the highest bid per user
    const processUniqueBids = (bids) => {
        const userMap = new Map();
        
        // For each bid, keep only the highest per user
        bids.forEach(bid => {
            const { userId, bidAmount } = bid;
            
            // If user doesn't exist in map or has a lower bid, update
            if (!userMap.has(userId) || userMap.get(userId).bidAmount < bidAmount) {
                // Try to get a user-friendly name
                const userName = getUserName(userId);
                userMap.set(userId, { ...bid, userName });
            }
        });
        
        // Convert map to array and sort by bid amount (highest first)
        return Array.from(userMap.values())
            .sort((a, b) => b.bidAmount - a.bidAmount)
            .slice(0, 3); // Keep only top 3
    };
    
    // Function to get a user-friendly name
    const getUserName = (userId) => {
        try {
            // Try to find user info in the bid data
            const bidWithUserInfo = topBidders.find(bid => bid.userId === userId && bid.userName);
            if (bidWithUserInfo && bidWithUserInfo.userName) {
                return bidWithUserInfo.userName;
            }
            
            // Extract from email if possible
            if (userId && userId.includes("@")) {
                return userId.split("@")[0];
            }
            
            return `Bidder ${userId.substring(0, 5)}`;
        } catch (error) {
            return "Unknown Bidder";
        }
    };
    
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
                    <Image source={getImageSource(auctionData)} style={styles.productImage} />
                    <View style={styles.productDetails}>
                        <Text style={styles.detailsTitle}>{t('Product Details')}</Text>
                        <View style={styles.detailsRow}>
                            <View style={styles.detailColumn}>
                                <Text style={styles.detailLabel}>{t('Made By:')}</Text>
                                <Text style={styles.detailValue}>{auctionData?.madeBy || 'User'}</Text>
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
                            <Text style={styles.infoLabel}>{t('Number of bids:')}</Text>
                            <Text style={styles.infoValue}>{totalBids} ({uniqueBidders} {t('unique bidders')})</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.biddersSection}>
                    <Text style={styles.sectionTitle}>{t('Top bidders')}</Text>
                    <View style={styles.biddersCard}>
                        <View style={styles.biddersHeader}>
                            <Text style={styles.headerText}>{t('Bidder')}</Text>
                            <Text style={styles.headerText}>{t('Bid Amount')}</Text>
                        </View>
                        <View style={styles.biddersList}>
                            {topBidders.length === 0 ? (
                                <View style={styles.bidderRow}>
                                    <Text style={styles.bidderText}>{t('No bids yet')}</Text>
                                </View>
                            ) : (
                                topBidders.map((bid, index) => (
                                    <View key={index} style={[
                                        styles.bidderRow,
                                        index === 0 && styles.topBidderRow
                                    ]}>
                                        <Text style={[
                                            styles.bidderText,
                                            index === 0 && styles.topBidderText
                                        ]}>
                                            {bid.userName || `User ${index + 1}`}
                                        </Text>
                                        <Text style={[
                                            styles.bidAmount,
                                            index === 0 && styles.topBidderAmount
                                        ]}>
                                            {bid.bidAmount} Rs
                                        </Text>
                                    </View>
                                ))
                            )}
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
        width: '90%',
        alignSelf: 'center',
        elevation: 2,
        overflow: 'hidden',
    },
    biddersHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp(8),
        paddingVertical: hp(2),
        backgroundColor: colors.GREEN,
    },
    headerText: {
        fontSize: hp(1.9),
        fontFamily: fonts.Medium,
        color: colors.WHITE,
    },
    biddersList: {
        paddingVertical: hp(1),
    },
    bidderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp(8),
        paddingVertical: hp(1.5),
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    topBidderRow: {
        backgroundColor: 'rgba(0,169,128,0.1)',
        paddingVertical: hp(2),
    },
    bidderText: {
        fontSize: hp(1.8),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
    topBidderText: {
        fontFamily: fonts.SemiBold,
        fontSize: hp(2),
    },
    bidAmount: {
        fontSize: hp(2),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
    topBidderAmount: {
        fontFamily: fonts.SemiBold,
        color: colors.GREEN,
    },
    productImage: {
        width: wp(30),
        height: wp(30),
        borderRadius: hp(1),
        resizeMode: 'cover',
    },
});

export default MyAuctionDetail; 