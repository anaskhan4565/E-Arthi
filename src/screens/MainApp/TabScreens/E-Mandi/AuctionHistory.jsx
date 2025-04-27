import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import { fonts } from '../../../../../util/Constants/FontName.js';
import colors from '../../../../../util/Constants/colors.js';
import ScreensName from '../../../../../util/Constants/ScreensName.ts';
import { database } from '../../../../../firebase/firebase';
import { ref, get } from 'firebase/database';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

// Fallback auction history data in case no history exists
const FALLBACK_AUCTION_HISTORY = [
    {
        id: '1',
        productName: 'Apples',
        startPrice: 140,
        winprice: 150,
        grading: 'A+',
        region: 'Karachi',
        endDate: '01/01/2025',
        endTime: '06:13',
        status: 'won',
        imageData: {
            source: require('./pics/ac1.png'),
        },
        madeby: 'Izaan Mali',
    },
    // other fallback data...
];

function AuctionHistory() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchUserBidHistory();
    }, []);

    const fetchUserBidHistory = async () => {
        setLoading(true);
        try {
            const userId = storage.getString('userId');
            if (!userId) {
                // No user logged in, use fallback data
                setAuctions(FALLBACK_AUCTION_HISTORY);
                setLoading(false);
                return;
            }

            let auctionsArray = [];
            
            // 1. Fetch all auctions user has bid on
            const userBidsRef = ref(database, `userBids/${userId}`);
            const bidsSnapshot = await get(userBidsRef);
            const userBids = bidsSnapshot.val();

            if (userBids) {
                for (const auctionId in userBids) {
                    // Fetch current auction data to get latest status
                    const auctionRef = ref(database, `allAuctions/${auctionId}`);
                    const auctionSnapshot = await get(auctionRef);
                    const auctionData = auctionSnapshot.val();
                    
                    // Combine user bid data with auction data
                    const userBid = userBids[auctionId];
                    
                    // Determine if user won the auction
                    let bidStatus = 'participated';
                    let isHighestBidder = false;
                    
                    if (auctionData && auctionData.highestBids && auctionData.highestBids.length > 0) {
                        // Check if user is the top bidder
                        if (auctionData.highestBids[0].userId === userId) {
                            isHighestBidder = true;
                        }
                        
                        // Check if auction has ended
                        const now = new Date().getTime();
                        const endTime = new Date(`${auctionData.endDate}T${auctionData.endTime}`).getTime();
                        
                        if (now > endTime) {
                            bidStatus = isHighestBidder ? 'won' : 'lost';
                        } else {
                            bidStatus = isHighestBidder ? 'winning' : 'outbid';
                        }
                    }
                    
                    // Create auction history item
                    auctionsArray.push({
                        id: auctionId,
                        productName: userBid.auctionData?.productName || 'Unknown Product',
                        startPrice: userBid.auctionData?.startPrice || 0,
                        winprice: userBid.lastBidAmount,
                        grading: userBid.auctionData?.grading || 'N/A',
                        region: userBid.auctionData?.region || 'N/A',
                        endDate: userBid.auctionData?.endDate || 'N/A',
                        endTime: userBid.auctionData?.endTime || 'N/A',
                        status: bidStatus,
                        imageData: {
                            source: userBid.auctionData?.imageUrl 
                                ? { uri: userBid.auctionData.imageUrl } 
                                : require('./pics/ac1.png')
                        },
                        madeby: auctionData?.madeBy || 'Unknown',
                        lastBidTime: userBid.lastBidTime,
                        isPurchased: false,
                        // Add more fields as needed
                    });
                }
            }
            
            // 2. Fetch user's direct purchases (Buy Now)
            const userPurchasesRef = ref(database, `userPurchases/${userId}`);
            const purchasesSnapshot = await get(userPurchasesRef);
            const userPurchases = purchasesSnapshot.val();
            
            if (userPurchases) {
                for (const auctionId in userPurchases) {
                    const purchase = userPurchases[auctionId];
                    
                    // Fetch the complete auction data if available
                    const auctionRef = ref(database, `allAuctions/${auctionId}`);
                    const auctionSnapshot = await get(auctionRef);
                    const auctionData = auctionSnapshot.val() || {};
                    
                    auctionsArray.push({
                        id: auctionId,
                        productName: purchase.productName || auctionData.productName || 'Unknown Product',
                        startPrice: auctionData.startPrice || 0,
                        winprice: purchase.totalAmount || auctionData.buyNowPrice || 0,
                        grading: auctionData.grading || 'N/A',
                        region: auctionData.region || 'N/A',
                        endDate: auctionData.endDate || 'N/A',
                        endTime: auctionData.endTime || 'N/A',
                        status: 'purchased',
                        imageData: {
                            source: auctionData.imageUrl 
                                ? { uri: auctionData.imageUrl } 
                                : require('./pics/ac1.png')
                        },
                        madeby: auctionData.madeBy || 'Unknown',
                        lastBidTime: purchase.purchaseDate || new Date().toISOString(),
                        isPurchased: true,
                        purchaseType: purchase.purchaseType || 'Pre-Auction',
                        winNumber: purchase.winNumber
                    });
                }
            }
            
            // Sort by most recent bid/purchase
            auctionsArray.sort((a, b) => new Date(b.lastBidTime) - new Date(a.lastBidTime));
            
            setAuctions(auctionsArray.length > 0 ? auctionsArray : FALLBACK_AUCTION_HISTORY);
        } catch (error) {
            console.error('Error fetching bid history:', error);
            setAuctions(FALLBACK_AUCTION_HISTORY);
        } finally {
            setLoading(false);
        }
    };

    const handleAuctionPress = (auction) => {
        // If the auction is purchased or won, navigate to history details
        if (auction.status === 'purchased' || auction.status === 'won') {
            navigation.navigate(ScreensName.AuctionHistoryDetails, { auctionData: auction });
            return;
        }
        
        // For all other cases (ongoing auctions, outbid, etc.), navigate to auction details
        // where user can still place bids if the auction is active
        const auctionId = auction.id;
        
        // Fetch the most up-to-date auction data from the database
        const fetchCurrentAuctionData = async () => {
            try {
                const auctionRef = ref(database, `allAuctions/${auctionId}`);
                const snapshot = await get(auctionRef);
                const currentAuctionData = snapshot.val();
                
                if (currentAuctionData) {
                    // Navigate to AuctionDetails with the current data
                    navigation.navigate(ScreensName.AuctionDetails, { 
                        auctionData: {
                            id: auctionId,
                            ...currentAuctionData
                        }
                    });
                } else {
                    // If auction not found in database, use the history data
                    navigation.navigate(ScreensName.AuctionDetails, { 
                        auctionData: auction
                    });
                }
            } catch (error) {
                console.error('Error fetching current auction data:', error);
                // Fallback to using history data
                navigation.navigate(ScreensName.AuctionDetails, { 
                    auctionData: auction
                });
            }
        };
        
        fetchCurrentAuctionData();
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const filteredAuctions = searchQuery 
        ? auctions.filter(auction => 
            auction.productName.toLowerCase().includes(searchQuery.toLowerCase()))
        : auctions;

    const getStatusBadgeStyle = (status) => {
        switch (status) {
            case 'won':
                return styles.wonBadge;
            case 'winning':
                return styles.winningBadge;
            case 'lost':
                return styles.lostBadge;
            case 'outbid':
                return styles.outbidBadge;
            case 'purchased':
                return styles.purchasedBadge;
            default:
                return styles.participatedBadge;
        }
    };

    const getStatusText = (status, purchaseType) => {
        switch (status) {
            case 'won':
                return t('Won');
            case 'winning':
                return t('Winning');
            case 'lost':
                return t('Lost');
            case 'outbid':
                return t('Outbid');
            case 'purchased':
                return purchaseType ? `${t('Paid')} | ${t(purchaseType)}` : t('Purchased');
            case 'participated':
                return t('Participated');
            default:
                return t('On going');
        }
    };

    const renderAuctionItem = ({ item }) => (
        <TouchableOpacity
            style={styles.auctionItem}
            onPress={() => handleAuctionPress(item)}
        >
            <View style={styles.auctionImageContainer}>
                <Image 
                    source={
                        typeof item.imageData.source === 'object' 
                            ? item.imageData.source 
                            : item.imageData.source
                    } 
                    style={styles.auctionImage} 
                />
            </View>
            <View style={styles.auctionDetails}>
                <Text style={styles.auctionPrice}>{t('Product Name')}: {t(item.productName)}</Text>
                <Text style={styles.auctionPrice}>{t('Auction Start Price')}: {item.startPrice} Rs</Text>
                <Text style={styles.auctionPrice}>{t('Your Bid')}: {item.winprice} Rs</Text>
                <Text style={styles.auctionGrading}>{t('Grading')}: {item.grading}</Text>
                <Text style={styles.auctionRegion}>{t('Region')}: {t(item.region)}</Text>
                
                {item.isPurchased && item.winNumber && (
                    <Text style={styles.winNumberText}>
                        {t('Win Number')}: {item.winNumber}
                    </Text>
                )}
                
                <Text style={styles.auctionEndsAt}>{t('Auction ends at')}:</Text>
                <View style={styles.dateTimeContainer}>
                    <Text style={styles.auctionDate}>{item.endDate}</Text>
                    <Text style={styles.auctionTime}>{item.endTime}</Text>
                </View>
            </View>
            <View style={styles.statusBadgeContainer}>
                <View style={[
                    styles.statusBadge,
                    getStatusBadgeStyle(item.status)
                ]}>
                    <Text style={styles.statusText}>
                        {getStatusText(item.status, item.purchaseType)}
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
                <CustomSearchApp 
                    placeholder={t('Search in here')} 
                    onSearch={handleSearch}
                />
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>{t('Auction History')}</Text>

                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={colors.GREEN} />
                        <Text style={styles.loadingText}>{t('Loading your auction history...')}</Text>
                    </View>
                ) : (
                    <FlatList
                        data={filteredAuctions}
                        renderItem={renderAuctionItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.auctionsList}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>{t('No auction history found')}</Text>
                            </View>
                        }
                    />
                )}
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
    auctionImage:{
        width: wp('25%'),
        height: wp('25%'),
        borderRadius: hp(1),
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: hp(2),
        fontSize: hp(2),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
    },
    emptyContainer: {
        padding: hp(5),
        alignItems: 'center',
    },
    emptyText: {
        fontSize: hp(2),
        fontFamily: fonts.Medium,
        color: colors.GRAY,
        textAlign: 'center',
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
    winningBadge: {
        backgroundColor: colors.SKY,
    },
    lostBadge: {
        backgroundColor: colors.RED,
    },
    outbidBadge: {
        backgroundColor: colors.ORANGE,
    },
    participatedBadge: {
        backgroundColor: colors.PURPLE,
    },
    purchasedBadge: {
        backgroundColor: colors.GREEN,
    },
    statusText: {
        fontSize: hp(1.4),
        fontFamily: fonts.Medium,
        color: colors.WHITE,
    },
    winNumberText: {
        fontSize: hp(1.4),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        marginBottom: hp(0.1),
    },
});

export default AuctionHistory; 