import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { MMKV } from 'react-native-mmkv';

import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import { fonts } from '../../../../../util/Constants/FontName.js';
import colors from '../../../../../util/Constants/colors.js';
import ScreensName from '../../../../../util/Constants/ScreensName.ts';
import { firestore } from '../../../../../firebase/firebase';

// Initialize MMKV storage
const storage = new MMKV();

// Helper function to get human-readable status text
const getStatusString = (status) => {
    switch (status) {
        case 'pre_auction':
            return 'Upcoming';
        case 'ongoing':
            return 'Ongoing';
        case 'closed':
            return 'Closed';
        case 'cancelled':
            return 'Cancelled';
        default:
            return 'Unknown';
    }
};

function MyAuctions() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Get the user ID from storage
        const currentUserId = storage.getString('userId') || 'anonymous';
        setUserId(currentUserId);
        
        // Function to fetch user's auctions
        const fetchAuctions = async () => {
            try {
                setLoading(true);
                
                console.log("Fetching auctions for user ID:", currentUserId);
                
                const auctionsCollection = await firestore()
                    .collection('auctions')
                    .where('userId', '==', currentUserId)
                    .orderBy('createdAt', 'desc')
                    .get();
                
                if (auctionsCollection.empty) {
                    console.log("No auctions found for this user");
                    setAuctions([]);
                    setLoading(false);
                    return;
                }
                
                const auctionsData = auctionsCollection.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    // For date fields that come from Firestore Timestamp, convert to readable format
                    createdAt: doc.data().createdAt ? new Date(doc.data().createdAt.toMillis()).toLocaleDateString() : 'N/A',
                }));
                
                console.log(`Found ${auctionsData.length} auctions for user`);
                setAuctions(auctionsData);
                
            } catch (error) {
                console.error('Error fetching auctions:', error);
                Alert.alert('Error', 'Failed to load auctions. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        // Fetch auctions when component mounts
        fetchAuctions();
        
        // Set up real-time listener for updates
        const unsubscribe = firestore()
            .collection('auctions')
            .where('userId', '==', currentUserId)
            .onSnapshot(
                snapshot => {
                    const updatedAuctions = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                        createdAt: doc.data().createdAt ? new Date(doc.data().createdAt.toMillis()).toLocaleDateString() : 'N/A',
                    }));
                    setAuctions(updatedAuctions);
                    setLoading(false);
                },
                error => {
                    console.error('Listening error:', error);
                    setLoading(false);
                }
            );
        
        // Cleanup listener on component unmount
        return () => unsubscribe();
    }, []);

    // Filter auctions based on search query
    const filteredAuctions = searchQuery
        ? auctions.filter(auction => 
            auction.productName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            auction.category?.toLowerCase().includes(searchQuery.toLowerCase()))
        : auctions;

    const handleSearch = (text) => {
        setSearchQuery(text);
    };

    // Function to get image source - either from base64 data or a placeholder
    const getImageSource = (item) => {
        if (item.imageData && item.imageData.base64) {
            return { uri: `data:${item.imageData.type};base64,${item.imageData.base64}` };
        }
        return null;
    };

    const renderAuctionItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.auctionItem,
                // Visual indicator of auction status
                item.status === 'pre_auction' && styles.preAuctionItem,
                item.status === 'ongoing' && styles.ongoingItem,
                item.status === 'closed' && styles.closedItem,
                item.status === 'cancelled' && styles.cancelledItem,
            ]}
            onPress={() => navigation.navigate(ScreensName.MyAuctionDetail, { auctionData: item })}
        >
            <View style={styles.auctionImageContainer}>
                {getImageSource(item) ? (
                    <Image 
                        source={getImageSource(item)} 
                        style={styles.productImage} 
                    />
                ) : (
                    <View style={styles.placeholderImage} />
                )}
            </View>
            <View style={styles.auctionDetails}>
                <Text style={styles.auctionTitle}>{t(item.productName || 'N/A')}</Text>
                <Text style={styles.auctionPrice}>{t('Start Price')}: {item.startPrice || 0} Rs</Text>
                <Text style={styles.auctionDetail}>{t('Category')}: {item.category || 'N/A'}</Text>
                <Text style={styles.auctionDetail}>{t('Start Date')}: {item.startDate || 'N/A'}</Text>
                <Text style={styles.auctionDetail}>{t('End Date')}: {item.endDate || 'N/A'}</Text>
                {item.highestBid > 0 && (
                    <Text style={styles.auctionHighestBid}>{t('Highest Bid')}: {item.highestBid} Rs</Text>
                )}
            </View>
            <View style={styles.statusBadgeContainer}>
                <View style={[
                    styles.statusBadge,
                    item.status === 'pre_auction' && styles.preAuctionBadge,
                    item.status === 'ongoing' && styles.ongoingBadge,
                    item.status === 'closed' && styles.closedBadge,
                    item.status === 'cancelled' && styles.cancelledBadge,
                ]}>
                    <Text style={styles.statusText}>
                        {t(getStatusString(item.status))}
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
                    onChangeText={handleSearch}
                    value={searchQuery}
                />
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>{t('My Auctions')}</Text>

                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={colors.GREEN} />
                        <Text style={styles.loadingText}>{t('Loading auctions...')}</Text>
                    </View>
                ) : auctions.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>{t('You have no auctions yet.')}</Text>
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
                        contentContainerStyle={styles.auctionsList}
                        showsVerticalScrollIndicator={false}
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
    content: {
        flex: 1,
        padding: hp(3),
    },
    title: {
        fontSize: hp(3),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp(2),
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
    productImage: {
        width: wp(20),
        height: wp(20),
        borderRadius: hp(1),
        resizeMode: 'cover',
    },
    auctionDetails: {
        flex: 1,
        paddingLeft: wp(2),
        justifyContent: 'center',
        marginTop: hp(4),
    },
    auctionTitle: {
        fontSize: hp(1.5),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        marginBottom: hp(0.1),
    },
    auctionPrice: {
        fontSize: hp(1.5),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        marginBottom: hp(0.3),
    },
    auctionDetail: {
        fontSize: hp(1.5),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        marginBottom: hp(0.3),
    },
    auctionHighestBid: {
        fontSize: hp(1.5),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        marginBottom: hp(0.3),
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
    preAuctionBadge: {
        backgroundColor: colors.ORANGE,
    },
    ongoingBadge: {
        backgroundColor: colors.ORANGE,
    },
    closedBadge: {
        backgroundColor: colors.RED,
    },
    cancelledBadge: {
        backgroundColor: colors.RED,
    },
    statusText: {
        fontSize: hp(1.4),
        fontFamily: fonts.Medium,
        color: colors.WHITE,
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: hp(2),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        marginBottom: hp(2),
    },
    createButton: {
        backgroundColor: colors.GREEN,
        paddingHorizontal: wp(5),
        paddingVertical: hp(1.5),
        borderRadius: hp(1),
    },
    createButtonText: {
        fontSize: hp(2),
        fontFamily: fonts.Medium,
        color: colors.WHITE,
    },
    preAuctionItem: {
        backgroundColor: colors.ORANGE,
    },
    ongoingItem: {
        backgroundColor: colors.ORANGE,
    },
    closedItem: {
        backgroundColor: colors.RED,
    },
    cancelledItem: {
        backgroundColor: colors.RED,
    },
});

export default MyAuctions; 