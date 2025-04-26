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

function LiveAuctions() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [filterStatus, setFilterStatus] = useState('');
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Get the user ID from storage
        const currentUserId = storage.getString('userId') || 'anonymous';
        setUserId(currentUserId);
        
        // Function to fetch auctions
        const fetchAuctions = async () => {
            try {
                setLoading(true);
                
                // Get only ongoing auctions
                const auctionsCollection = await firestore()
                    .collection('auctions')
                    .where('status', '==', 'ongoing')
                    .orderBy('createdAt', 'desc')
                    .get();
                
                if (auctionsCollection.empty) {
                    console.log("No live auctions found");
                    setAuctions([]);
                    setLoading(false);
                    return;
                }
                
                const auctionsData = auctionsCollection.docs.map(doc => {
                    const auctionData = doc.data();
                    // Mark auctions that belong to the current user
                    const isOwnAuction = auctionData.userId === currentUserId;
                    
                    return {
                        id: doc.id,
                        ...auctionData,
                        isOwnAuction: isOwnAuction,
                        // For date fields that come from Firestore Timestamp
                        createdAt: auctionData.createdAt 
                            ? new Date(auctionData.createdAt.toMillis()).toLocaleDateString() 
                            : 'N/A',
                    };
                });
                
                console.log(`Found ${auctionsData.length} live auctions`);
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
            .where('status', '==', 'ongoing')
            .onSnapshot(
                snapshot => {
                    const updatedAuctions = snapshot.docs.map(doc => {
                        const auctionData = doc.data();
                        const isOwnAuction = auctionData.userId === currentUserId;
                        
                        return {
                            id: doc.id,
                            ...auctionData,
                            isOwnAuction: isOwnAuction,
                            createdAt: auctionData.createdAt 
                                ? new Date(auctionData.createdAt.toMillis()).toLocaleDateString() 
                                : 'N/A',
                        };
                    });
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

    const handleSearch = (text) => {
        setSearchQuery(text);
    };

    const renderFilterButton = (label, value) => (
        <TouchableOpacity
            style={[
                styles.filterButton,
                filterStatus === value ? { backgroundColor: colors.GREEN } : {}
            ]}
            onPress={() => setFilterStatus(filterStatus === value ? '' : value)}
        >
            <Text
                style={[
                    styles.filterButtonText,
                    filterStatus === value ? { color: colors.WHITE } : {}
                ]}
            >
                {t(label)}
            </Text>
        </TouchableOpacity>
    );

    const handleAuctionPress = (item) => {
        // If it's the user's own auction, show a message
        if (item.isOwnAuction) {
            Alert.alert(
                t('Your Auction'),
                t('This is your own auction. You cannot place bids on your own auctions.'),
                [{ text: t('OK'), style: 'default' }]
            );
            return;
        }
        
        // Otherwise navigate to auction details
        navigation.navigate(ScreensName.AuctionDetails, { auctionData: item });
    };

    // Filter auctions based on selected filter and search query
    const filteredAuctions = auctions.filter(auction => {
        // First apply category filter if active
        if (filterStatus && filterStatus !== 'starting_soon' && filterStatus !== 'expiring_soon') {
            if (filterStatus === 'region' && !auction.region?.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }
            if (filterStatus === 'grading' && !auction.grading?.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }
            if (filterStatus === 'products' && !auction.productName?.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }
        }
        
        // Then apply search filter if there's a search query
        if (searchQuery) {
            const matchesProduct = auction.productName?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = auction.category?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesRegion = auction.region?.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesProduct || matchesCategory || matchesRegion;
        }
        
        // Special filters for time-based filtering
        if (filterStatus === 'starting_soon') {
            // Apply logic for auctions starting soon
            // This is a simplified example - you might want more complex date comparison
            return auction.status === 'pre_auction';
        }
        if (filterStatus === 'expiring_soon') {
            // Apply logic for auctions expiring soon
            // This is a simplified example - you might want more complex date comparison
            const now = new Date();
            // Logic for expiring soon would go here
            return true;
        }
        
        return true;
    });

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
                item.isOwnAuction && styles.ownAuctionItem
            ]}
            onPress={() => handleAuctionPress(item)}
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
                <Text style={styles.auctionPrice}>{t('Product Name')}: {t(item.productName || 'N/A')}</Text>
                <Text style={styles.auctionPrice}>{t('Auction Start Price')}: {item.startPrice || 0} Rs</Text>
                <Text style={styles.auctionGrading}>{t('Category')}: {item.category || 'N/A'}</Text>
                <Text style={styles.auctionRegion}>{t('Region')}: {t(item.region || 'N/A')}</Text>
                <Text style={styles.auctionEndsAt}>{t('Auction ends at')}:</Text>
                <View style={styles.dateTimeContainer}>
                    <Text style={styles.auctionDate}>{item.endDate || 'N/A'}</Text>
                    <Text style={styles.auctionTime}>{item.endTime || 'N/A'}</Text>
                </View>
            </View>
            <View style={styles.statusBadgeContainer}>
                {item.isOwnAuction ? (
                    <View style={styles.yourAuctionBadge}>
                        <Text style={styles.statusText}>{t('Your Auction')}</Text>
                    </View>
                ) : (
                    <View style={[
                        styles.statusBadge,
                        item.status === 'pre_auction' ? styles.preAuctionBadge : styles.ongoingBadge
                    ]}>
                        <Text style={styles.statusText}>
                            {item.status === 'pre_auction' ? t('Pre auction') : t('On going')}
                        </Text>
                    </View>
                )}
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
                <Text style={styles.title}>{t('Live Auctions')}</Text>

                <View style={styles.filtersContainer}>
                    {renderFilterButton('Starting soon', 'starting_soon')}
                    {renderFilterButton('Expiring soon', 'expiring_soon')}
                    {renderFilterButton('Products', 'products')}
                    {renderFilterButton('Grading', 'grading')}
                    {renderFilterButton('Region', 'region')}
                </View>

                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={colors.GREEN} />
                        <Text style={styles.loadingText}>{t('Loading auctions...')}</Text>
                    </View>
                ) : auctions.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>{t('No live auctions available.')}</Text>
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
    filtersContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: hp(2),
    },
    filterButton: {
        marginHorizontal: wp(2),
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.8),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        borderRadius: hp(1),
        marginRight: wp(2),
        marginBottom: hp(1),
    },
    filterButtonText: {
        fontSize: hp(1.6),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
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
    ownAuctionItem: {
        borderWidth: 2,
        borderColor: colors.GREEN,
        backgroundColor: colors.LIGHT_GREEN + '80', // Adding transparency
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
    ongoingBadge: {
        backgroundColor: colors.ORANGE,
    },
    preAuctionBadge: {
        backgroundColor: colors.GREEN,
    },
    yourAuctionBadge: {
        backgroundColor: colors.BLUE || '#3498db',
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.4),
        borderRadius: hp(1),
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
});

export default LiveAuctions; 