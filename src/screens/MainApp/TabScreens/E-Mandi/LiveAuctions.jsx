import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
    Image,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { MMKV } from 'react-native-mmkv';
import { database } from '../../../../../firebase/firebase';
import { ref, onValue } from 'firebase/database';

import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import { fonts } from '../../../../../util/Constants/FontName.js';
import colors from '../../../../../util/Constants/colors.js';
import ScreensName from '../../../../../util/Constants/ScreensName.ts';

const storage = new MMKV();

function LiveAuctions() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const currentUserId = storage.getString('userId') || 'anonymous';
        setUserId(currentUserId);

        const allAuctionsRef = ref(database, 'allAuctions');

        const unsubscribe = onValue(allAuctionsRef, snapshot => {
            const data = snapshot.val();
            if (data) {
                console.log(data,"is data for auctions");
                const auctionList = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key],
                    isOwnAuction: data[key].userId === currentUserId,
                })).filter(auction => 
                    // Only show ongoing or pre_auction auctions
                    (auction.status === 'ongoing' || auction.status === 'pre_auction') &&
                    // Don't show purchased auctions
                    auction.status !== 'purchased' &&
                    // Don't show auctions marked as not visible
                    auction.visible !== false
                );
                setAuctions(auctionList);
            } else {
                setAuctions([]);
            }
            setLoading(false);
        }, error => {
            console.error('Error fetching auctions:', error);
            Alert.alert('Error', 'Failed to load auctions.');
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleSearch = (text) => setSearchQuery(text);

    const filteredAuctions = searchQuery
        ? auctions.filter(auction =>
            auction.productName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            auction.category?.toLowerCase().includes(searchQuery.toLowerCase()))
        : auctions;

    const handleAuctionPress = (item) => {
        if (item.isOwnAuction) {
            Alert.alert(
                t('Your Auction'),
                t('This is your own auction. You cannot place bids on your own auctions.'),
                [{ text: t('OK'), style: 'default' }]
            );
            return;
        }
        navigation.navigate(ScreensName.AuctionDetails, { auctionData: item });
    };

    const getImageSource = (item) => {
        if (item.imageData && item.imageData.base64) {
            return { uri: `data:${item.imageData.type};base64,${item.imageData.base64}` };
        }
        return null;
    };

    // Calculate the highest bid for an auction
    const getHighestBid = (auction) => {
        if (auction.highestBids && auction.highestBids.length > 0) {
            return auction.highestBids[0].bidAmount;
        }
        return auction.startPrice; // Default to start price if no bids
    };

    const renderAuctionItem = ({ item }) => {
        const highestBid = getHighestBid(item);
        const hasHighestBid = item.highestBids && item.highestBids.length > 0;
        
        return (
            <TouchableOpacity
                style={[styles.auctionItem, item.isOwnAuction && styles.ownAuctionItem]}
                onPress={() => handleAuctionPress(item)}
            >
                <View style={styles.auctionImageContainer}>
                    {getImageSource(item) ? (
                        <Image source={getImageSource(item)} style={styles.productImage} />
                    ) : (
                        <View style={styles.placeholderImage} />
                    )}
                </View>
                <View style={styles.auctionDetails}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.auctionTitle} numberOfLines={1} ellipsizeMode="tail">
                            {item.productName || 'N/A'}
                        </Text>
                    </View>
                    <Text style={styles.auctionDetail}>{t('Start Price')}: {item.startPrice} Rs</Text>
                    {hasHighestBid && (
                        <Text style={styles.highestBidText}>
                            {t('Highest Bid')}: <Text style={styles.bidAmount}>{highestBid} Rs</Text>
                        </Text>
                    )}
                    <Text style={styles.auctionDetail}>{t('Category')}: {item.category || 'N/A'}</Text>
                    <Text style={styles.auctionDetail}>{t('Ends at')}: {item.endDate} {item.endTime}</Text>
                </View>
                <View style={styles.statusBadgeContainer}>
                    {item.isOwnAuction ? (
                        <View style={styles.yourAuctionBadge}>
                            <Text style={styles.statusText}>{t('Your Auction')}</Text>
                        </View>
                    ) : item.status === 'pre_auction' ? (
                        <View style={styles.preAuctionBadge}>
                            <Text style={styles.statusText}>{t('Pre Auction')}</Text>
                        </View>
                    ) : (
                        <View style={styles.ongoingBadge}>
                            <Text style={styles.statusText}>{t('Ongoing')}</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
            <Navbar hasBackButton={true} />

            </View>
            <View style={styles.searchContainer}>
                <CustomSearchApp
                    placeholder={t('Search in here')}
                    onChangeText={handleSearch}
                    value={searchQuery}
                />
            </View>
            <View style={styles.content}>
                <Text style={styles.screenTitle}>{t('Live Auctions')}</Text>
                {loading ? (
                    <ActivityIndicator size="large" color={colors.GREEN} />
                ) : auctions.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>{t('No live auctions found.')}</Text>
                        <TouchableOpacity
                            style={styles.createButton}
                            onPress={() => navigation.navigate(ScreensName.RequestForAuction)}
                        >
                            <Text style={styles.createButtonText}>{t('Create Auction')}</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <FlatList
                        data={filteredAuctions}
                        renderItem={renderAuctionItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.listContainer}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.WHITE },
    searchContainer: { marginTop: hp(2), height: hp(3), marginHorizontal: hp(2) },
    content: { flex: 1, paddingHorizontal: wp(5) },
    screenTitle: { fontSize: hp(3), fontFamily: fonts.SemiBold, color: colors.BLACK, marginBottom: hp(2),marginTop:hp(4) },
    auctionItem: {
        flexDirection: 'row',
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: hp(1),
        marginBottom: hp(2),
        padding: hp(1.5),
        alignItems: 'center',
        position: 'relative',
    },
    headerContainer: {
        height: hp('8.5%'),
        backgroundColor: colors.WHITE,
    },
    ownAuctionItem: { borderWidth: 2, borderColor: colors.GREEN, backgroundColor: colors.LIGHT_GREEN + '80' },
    auctionImageContainer: { width: wp(25), height: wp(25), justifyContent: 'center', alignItems: 'center' },
    placeholderImage: { width: wp(20), height: wp(20), backgroundColor: colors.LIGHT_GRAY, borderRadius: hp(1) },
    productImage: { width: wp(20), height: wp(20), borderRadius: hp(1), resizeMode: 'cover' },
    auctionDetails: { 
        flex: 1, 
        paddingLeft: wp(4),
        paddingRight: wp(16), // Add padding for badge
    },
    titleContainer: { 
        flexDirection: 'row', 
        alignItems: 'center',
        width: '100%',
        marginBottom: hp(0.5),
    },
    auctionTitle: { 
        fontSize: hp(2), 
        fontFamily: fonts.Medium, 
        color: colors.BLACK, 
        marginBottom: hp(0.5),
        flexShrink: 1, // Allow text to shrink
    },
    auctionDetail: { 
        fontSize: hp(1.8), 
        fontFamily: fonts.Regular, 
        color: colors.BLACK,
        marginBottom: hp(0.3), 
    },
    highestBidText: { 
        fontSize: hp(1.8), 
        fontFamily: fonts.Regular, 
        color: colors.BLACK,
        marginBottom: hp(0.3),
    },
    bidAmount: { 
        fontSize: hp(1.8), 
        fontFamily: fonts.Medium, 
        color: colors.GREEN 
    },
    statusBadgeContainer: { 
        position: 'absolute', 
        top: hp(1.5), 
        right: wp(2),
        zIndex: 1,
    },
    yourAuctionBadge: { 
        backgroundColor: colors.BLUE || '#3498db', 
        paddingHorizontal: wp(2), 
        paddingVertical: hp(0.4), 
        borderRadius: hp(1) 
    },
    preAuctionBadge: { 
        backgroundColor: colors.SKY || '#3498db', 
        paddingHorizontal: wp(2), 
        paddingVertical: hp(0.4), 
        borderRadius: hp(1) 
    },
    ongoingBadge: { 
        backgroundColor: colors.ORANGE, 
        paddingHorizontal: wp(2), 
        paddingVertical: hp(0.4), 
        borderRadius: hp(1) 
    },
    statusText: { 
        fontSize: hp(1.4), 
        fontFamily: fonts.Medium, 
        color: colors.WHITE 
    },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { fontSize: hp(2), fontFamily: fonts.Medium, color: colors.GRAY, marginBottom: hp(2) },
    createButton: { backgroundColor: colors.GREEN, paddingHorizontal: wp(5), paddingVertical: hp(1.5), borderRadius: hp(1) },
    createButtonText: { fontSize: hp(2), fontFamily: fonts.Medium, color: colors.WHITE },
    listContainer: { paddingBottom: hp(5) },
});

export default LiveAuctions;
