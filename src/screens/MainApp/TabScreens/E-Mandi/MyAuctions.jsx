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

function MyAuctions() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const userId = storage.getString('userId') || 'anonymous';
        const userAuctionsRef = ref(database, `users/${userId}/auctions`);

        const unsubscribe = onValue(userAuctionsRef, snapshot => {
            const data = snapshot.val();
            if (data) {
                const auctionList = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key],
                }));
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

    const filteredAuctions = searchQuery
        ? auctions.filter(auction =>
            auction.productName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            auction.category?.toLowerCase().includes(searchQuery.toLowerCase()))
        : auctions;

    const handleSearch = (text) => setSearchQuery(text);

    const renderAuctionItem = ({ item }) => (
        <TouchableOpacity
            style={styles.auctionItem}
            onPress={() => navigation.navigate(ScreensName.MyAuctionDetail, { auctionData: item })}
        >
            <View style={styles.imageContainer}>
                {item.imageData && item.imageData.base64 ? (
                    <Image
                        source={{ uri: `data:${item.imageData.type};base64,${item.imageData.base64}` }}
                        style={styles.productImage}
                    />
                ) : (
                    <View style={styles.placeholderImage} />
                )}
            </View>
            <View style={styles.details}>
                <Text style={styles.titleText}>{item.productName || 'N/A'}</Text>
                <Text style={styles.detailText}>{t('Start Price')}: {item.startPrice} Rs</Text>
                <Text style={styles.detailText}>{t('Category')}: {item.category}</Text>
                <Text style={styles.detailText}>{t('Status')}: {item.status}</Text>
            </View>
        </TouchableOpacity>
    );

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
                <Text style={styles.screenTitle}>{t('My Auctions')}</Text>
                {loading ? (
                    <ActivityIndicator size="large" color={colors.GREEN} />
                ) : auctions.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>{t('No auctions found.')}</Text>
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
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    searchContainer: {
        marginTop: hp(2),
        height: hp(7),
        marginHorizontal: hp(2),
    },
    headerContainer: {
        height: hp('8.5%'),
        backgroundColor: colors.WHITE,
    },
    content: {
        flex: 1,
        paddingHorizontal: wp(5),
    },
    screenTitle: {
        fontSize: hp(3),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp(2),
    },
    auctionItem: {
        flexDirection: 'row',
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: hp(1),
        marginBottom: hp(2),
        padding: hp(1),
        alignItems: 'center',
    },
    imageContainer: {
        width: wp(25),
        height: wp(25),
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
    details: {
        flex: 1,
        paddingLeft: wp(4),
    },
    titleText: {
        fontSize: hp(2),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        marginBottom: hp(0.5),
    },
    detailText: {
        fontSize: hp(1.8),
        fontFamily: fonts.Regular,
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
        color: colors.GRAY,
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
    listContainer: {
        paddingBottom: hp(5),
    },
});

export default MyAuctions;
