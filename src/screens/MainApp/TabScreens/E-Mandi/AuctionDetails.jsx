import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    Alert,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';

import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import CustomButton from '../../../../components/CustomButton.jsx';
import { fonts } from '../../../../../util/Constants/FontName.js';
import colors from '../../../../../util/Constants/colors.js';
import ScreensName from '../../../../../util/Constants/ScreensName.ts';

import { database } from '../../../../../firebase/firebase';
import { ref, get, update } from 'firebase/database';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();
function AuctionDetails() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const route = useRoute();
    const { auctionData } = route.params;

    const [selectedQuantities, setSelectedQuantities] = useState({
        '1': 1,
        '5': 1,
        '10': 1,
        '20': 1
    });
    const [selectedBags, setSelectedBags] = useState({
        '1': false,
        '5': false,
        '10': false,
        '20': false
    });
    const [totalAmount, setTotalAmount] = useState(0);
    const [maxBid, setMaxBid] = useState('100');
    const [calculatedBid, setCalculatedBid] = useState(0);
    const [userCurrentBid, setUserCurrentBid] = useState(0);
    const [showBidSuccessMessage, setShowBidSuccessMessage] = useState(false);

    // Additional auction data not present in the list view
    const reservePrice = auctionData.reservePrice;
    const quantity = auctionData.quantity || '100';
    const description = auctionData.description || 'This product is made from this and that and this and that.';
    const madeBy = auctionData.madeBy || 'User';
    const category = auctionData.category || auctionData.productName;
    const buyNowPrice = auctionData.buyNowPrice || (auctionData.startPrice * 1.5);
    const startDate = auctionData.startDate || auctionData.endDate;
    const startTime = auctionData.startTime || auctionData.endTime;
    const [currentBid, setCurrentBid] = useState(auctionData.currentBid || auctionData.startPrice);
    
    // Determine if user is the top bidder
    const isTopBidder = userCurrentBid > 0 && userCurrentBid >= currentBid;
    
    auctionData.status = auctionData.status || 'ongoing';
    const isLiveAuction = auctionData.status === 'ongoing';

    // Update total amount when quantities or selected bags change
    useEffect(() => {
        let total = 0;
        Object.keys(selectedBags).forEach(bag => {
            if (selectedBags[bag]) {
                total += parseInt(bag) * selectedQuantities[bag] * auctionData.startPrice;
            }
        });
        setTotalAmount(total);
    }, [selectedBags, selectedQuantities, auctionData]);
    
    useEffect(() => {
        const bidValue = parseInt(maxBid) || 0;
        setCalculatedBid(bidValue);
    }, [maxBid]);

    const handlePlaceBid = async () => {
        const bidValue = parseInt(maxBid) || 0;
        const userId = storage.getString('userId') || 'anonymous';
    
        if (bidValue <= 0) {
            Alert.alert(t('Invalid Bid'), t('Please enter a valid bid amount.'));
            return;
        }
    
        const auctionRef = ref(database, `allAuctions/${auctionData.id}`);
    
        try {
            const snapshot = await get(auctionRef);
            const auction = snapshot.val();
            let bids = auction?.highestBids || [];
            let bidCount = auction?.numberOfBids || 0;
    
            // Check if user already exists in highestBids
            const existingBidIndex = bids.findIndex((bid) => bid.userId === userId);
    
            if (existingBidIndex !== -1) {
                if (bidValue > bids[existingBidIndex].bidAmount) {
                    bids[existingBidIndex].bidAmount = bidValue;
                } else {
                    Alert.alert(t('Low Bid'), t('Your bid must be higher than your previous bid.'));
                    return;
                }
            } else {
                bids.push({ bidAmount: bidValue, userId: userId });
            }
    
            // Sort descending and keep top 3
            bids.sort((a, b) => b.bidAmount - a.bidAmount);
            bids = bids.slice(0, 3);
    
            // Always increment bid count
            bidCount += 1;
    
            // Update DB
            await update(auctionRef, {
                highestBids: bids,
                numberOfBids: bidCount,
            });
    
            // 🟢 After successful bid, refetch the highest bid
            await fetchCurrentBid();
    
            // Update local state for the current user’s bid
            setUserCurrentBid(bidValue);
            setShowBidSuccessMessage(true);
    
            setTimeout(() => setShowBidSuccessMessage(false), 3000);
        } catch (error) {
            console.error('Error placing bid:', error);
            Alert.alert('Error', 'Failed to place bid. Please try again.');
        }
    };
    
    const fetchCurrentBid = async () => {
        const auctionRef = ref(database, `allAuctions/${auctionData.id}`);
        try {
            const snapshot = await get(auctionRef);
            const auction = snapshot.val();
            const highestBids = auction?.highestBids || [];
    
            // Get the highest bid amount from the top of the sorted list
            const highestBidAmount = highestBids.length > 0 ? highestBids[0].bidAmount : auctionData.startPrice;
    
            setCurrentBid(highestBidAmount);
        } catch (error) {
            console.error('Error fetching current bid:', error);
        }
    };
    
    useEffect(() => {
        fetchCurrentBid();
    }, []);
    
    const handleQuantityChange = (bag, value) => {
        const newValue = Math.max(1, parseInt(value) || 1);
        setSelectedQuantities(prev => ({
            ...prev,
            [bag]: newValue
        }));
    };

    const handleIncreaseQuantity = (bag) => {
        setSelectedQuantities(prev => ({
            ...prev,
            [bag]: prev[bag] + 1
        }));
    };

    const handleDecreaseQuantity = (bag) => {
        if (selectedQuantities[bag] > 1) {
            setSelectedQuantities(prev => ({
                ...prev,
                [bag]: prev[bag] - 1
            }));
        }
    };

    const handleBagSelection = (bag) => {
        setSelectedBags(prev => ({
            ...prev,
            [bag]: !prev[bag]
        }));
    };

    const renderProductDetails = () => {
        // Try multiple methods to get a valid image source
        let imageSource = null;
        
        // Method 1: Use direct URL if available
        if (auctionData.imageUrl) {
            imageSource = { uri: auctionData.imageUrl };
        } 
        // Method 2: Use base64 data with mime type if available
        else if (auctionData.imageData && auctionData.imageData.base64) {
            const mimeType = auctionData.imageData.type || 'image/jpeg';
            imageSource = { uri: `data:${mimeType};base64,${auctionData.imageData.base64}` };
        }
        
        return (
            <View style={styles.productDetailsCard}>
                <Text style={styles.productDetailsTitle}>{t('Product Details')}</Text>

                <View style={styles.productContentContainer}>
                    <View style={styles.imageContainer}>
                        {imageSource ? (
                            <Image 
                                source={imageSource}
                                style={styles.productImage}
                                resizeMode="cover"
                            />
                        ) : (
                            // Fallback to test image to ensure something displays
                            <Image 
                                source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                                style={styles.productImage}
                                resizeMode="cover"
                            />
                        )}
                    </View>

                    <View style={styles.verticalDivider} />

                    <View style={styles.detailsContainer}>
                        <View style={styles.detailDivider}>
                            <View style={styles.detailColumn}>
                                <Text style={styles.detailLabel}>{t('Made By')}:</Text>
                                <Text style={styles.detailValue}>{madeBy}</Text>
                            </View>
                            <View style={styles.verticalDivider} />
                            <View style={styles.detailColumn}>
                                <Text style={styles.detailLabel}>{t('Product Name')}:</Text>
                                <Text style={styles.detailValue}>{t(auctionData.productName)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    const renderTitle = () => (
        <View style={styles.header}>
            <View style={styles.titleContainer}>
            <Text style={styles.title}>{t('Auction')} {auctionData.productName}</Text>
            <View style={[
                styles.statusBadge,
                isLiveAuction ? styles.ongoingBadge : styles.preAuctionBadge
            ]}>
                <Text style={styles.statusText}>
                    {isLiveAuction ? t('On going') : t('Pre auction')}
                </Text>
            </View>
            </View>

        </View>
    );

    const renderAuctionTimings = () => (
        <View style={styles.sectionContainerNoTopPadding}>
            <View style={styles.sectionDivider}>
                <View style={styles.sectionColumn}>
                    <Text style={styles.sectionLabel}>{t('Auction starts at')}:</Text>
                    <Text style={styles.sectionValue}>{startDate}              <Text style={styles.sectionValue1}>{startTime}</Text></Text>

                </View>
                <View style={styles.verticalDivider} />
                <View style={styles.sectionColumn}>
                    <Text style={styles.sectionLabel}>{t('Auction ends at')}:</Text>
                    <Text style={styles.sectionValue}>{auctionData.endDate}               <Text style={styles.sectionValue1}>{auctionData.endTime}</Text>
                    </Text>

                </View>
            </View>
        </View>
    );

    const renderAuctionPrices = () => (
        <View style={styles.sectionContainerNoTopPadding}>
            <View style={styles.horizontalDivider} />
            <View style={styles.sectionDivider}>
                <View style={styles.sectionColumn}>
                    <Text style={styles.sectionLabel}>{t('Auction start price')}:</Text>
                    <Text style={styles.sectionValue}>{auctionData.startPrice} Rs</Text>
                </View>
                <View style={styles.verticalDivider} />
                {!isLiveAuction && (
                    <View style={styles.sectionColumn}>
                        <Text style={styles.sectionLabel}>{t('Auction reserve price')}:</Text>
                        <Text style={styles.sectionValue}>{reservePrice} Rs</Text>
                    </View>
                )}
                {isLiveAuction && (
                    <View style={styles.sectionColumn}>
                        <Text style={styles.sectionLabel}>{t('Current highest bid')}:</Text>
                        <Text style={styles.sectionValue}>{currentBid} Rs</Text>
                    </View>
                )}
            </View>
            <View style={styles.horizontalDivider} />
        </View>
    );

    const renderProductDescription = () => (
        <View style={styles.descriptionContainer}>
            <Text style={styles.sectionLabel}>{t('Product Description')}</Text>
            <Text style={styles.descriptionText}>{t(description)}</Text>
            <View style={styles.horizontalDivider} />
        </View>
    );

    const renderCategories = () => (
        <View style={styles.categoriesContainerNoTopPadding}>
            <View style={styles.categoryDivider}>
                <View style={styles.categoryColumn}>
                    <Text style={styles.sectionLabel}>{t('Category')}:</Text>
                    <Text style={styles.sectionValue}>{t(category)}</Text>
                </View>
                <View style={styles.verticalDivider} />
                <View style={styles.categoryColumn}>
                    <Text style={styles.sectionLabel}>{t('Quantity')}</Text>
                    <Text style={styles.sectionValue}>{quantity} KG</Text>
                </View>
                <View style={styles.verticalDivider} />
                <View style={styles.categoryColumn}>
                    <Text style={styles.sectionLabel}>{t('Grading')}</Text>
                    <Text style={styles.sectionValue}>{auctionData.grading}</Text>
                </View>
            </View>
            <View style={styles.horizontalDivider} />
        </View>
    );

    const renderBuyNow = () => (
        <View style={styles.buyNowContainer}>
            <View style={styles.buyNowRow}>
                <Text style={styles.buyNowLabel}>{t('Buy now price')}:</Text>
                <Text style={styles.buyNowPrice}>{buyNowPrice} Rs</Text>
            </View>
            <CustomButton
                MainText={t('Buy it now')}
                BgGiven={colors.GREEN}
                txColor={colors.WHITE}
                wgiven={wp('30%')}
                hgiven={hp('5%')}
            />
        </View>
    );

    const renderCurrentBid = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.currentBidLabel}>{t('Current bid')}</Text>
            <Text style={styles.currentBidValue}>{currentBid} Rs/KG</Text>
            
            {showBidSuccessMessage && (
                <View style={styles.bidSuccessMessage}>
                    <Text style={styles.bidSuccessText}>
                        {t('Your bid is the highest bid currently!')}
                    </Text>
                </View>
            )}
        </View>
    );

    const renderPlaceBid = () => (
        <View style={styles.placeBidContainer}>
            <View style={styles.maxBidRow}>
                <Text style={styles.maxBidLabel}>{t('Your max bid')}</Text>
                <View style={styles.bidInputContainer}>
                    <TextInput
                        style={styles.bidInput}
                        value={maxBid}
                        onChangeText={setMaxBid}
                        keyboardType="numeric"
                    />
                    <Text style={styles.bidInputLabel}>Rs</Text>
                    <View style={styles.placeBidButtonContainer}>
                        <CustomButton
                            MainText={t('Place bid')}
                            BgGiven={colors.GREEN}
                            txColor={colors.WHITE}
                            wgiven={wp('25%')}
                            hgiven={hp('4%')}
                            onPressG={handlePlaceBid}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.totalBidRow}>
                <Text style={styles.totalBidLabel}>{t('Your bid:')}</Text>
                <Text style={[
                    styles.totalBidValue,
                    isTopBidder && styles.topBidderValue
                ]}>
                    {calculatedBid} Rs
                </Text>
            </View>
            <Text style={styles.bidIncrementText}>{t('Increase bid in increments of 100 Rs')}</Text>
        </View>
    );

    const renderQualityDiscounts = () => (
        <View style={styles.offerContainer}>
            <Text style={styles.offerTitle}>{t('Quality Discounts')}</Text>

            <View style={styles.offerTableHeader}>
                <Text style={styles.offerHeaderItem}>{t('Bags')}</Text>
                <Text style={styles.offerHeaderItem}>{t('Price')}</Text>
                <Text style={styles.offerHeaderItem}>{t('Quantity')}</Text>
            </View>

            {Object.keys(selectedQuantities).map((bag) => (
                <View key={bag} style={styles.offerTableRow}>
                    <View style={styles.checkboxContainer}>
                        <TouchableOpacity
                            style={[
                                styles.checkbox,
                                selectedBags[bag] && styles.checkboxChecked
                            ]}
                            onPress={() => handleBagSelection(bag)}
                        />
                        <Text style={styles.bagText}>{bag} Kg</Text>
                    </View>

                    <Text style={styles.priceText}>{auctionData.startPrice} RS</Text>

                    <View style={styles.quantityContainer}>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => handleDecreaseQuantity(bag)}
                        >
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>

                        <TextInput
                            style={styles.quantityInput}
                            value={selectedQuantities[bag].toString()}
                            onChangeText={(value) => handleQuantityChange(bag, value)}
                            keyboardType="numeric"
                        />

                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => handleIncreaseQuantity(bag)}
                        >
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}

            <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>{t('Total Amount')}:</Text>
                <View style={styles.totalValueContainer}>
                    <TextInput
                        style={styles.totalInput}
                        value={totalAmount.toString()}
                        editable={false}
                    />
                    <Text style={styles.totalCurrency}>Rs</Text>
                </View>
            </View>
            <View style={styles.submitButtonContainer}>
                <CustomButton
                    MainText={t('Submit')}
                    BgGiven={colors.GREEN}
                    txColor={colors.WHITE}
                    wgiven={wp('80%')}
                    hgiven={hp('5%')}
                    isNavigation={true}
                    name={ScreensName.AuctionSubmissionSuccess}
                />
            </View>
        </View>


    );

    const renderMakeAnOffer = () => {
        const qualityDiscounts = auctionData.qualityDiscounts || [];
    
        if (!qualityDiscounts.length) {
            return null; 
        }
    
        return (
            <View style={styles.offerContainer}>
                <Text style={styles.offerTitle}>{t('Make An Offer')}</Text>
    
                <View style={styles.offerTableHeader}>
                    <Text style={styles.offerHeaderItem}>{t('Bags')}</Text>
                    <Text style={styles.offerHeaderItem}>{t('Price')}</Text>
                    <Text style={styles.offerHeaderItem}>{t('Quantity')}</Text>
                </View>
    
                {qualityDiscounts.map((discount, index) => {
                    const bagWeight = discount.bags;
                    const price = discount.price;
    
                    return (
                        <View key={index} style={styles.offerTableRow}>
                            <View style={styles.checkboxContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.checkbox,
                                        selectedBags[bagWeight] && styles.checkboxChecked
                                    ]}
                                    onPress={() => handleBagSelection(bagWeight)}
                                />
                                <Text style={styles.bagText}>{bagWeight}</Text>
                            </View>
    
                            <Text style={styles.priceText}>{price} Rs</Text>
    
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => handleDecreaseQuantity(bagWeight)}
                                >
                                    <Text style={styles.quantityButtonText}>-</Text>
                                </TouchableOpacity>
    
                                <TextInput
                                    style={styles.quantityInput}
                                    value={(selectedQuantities[bagWeight] || 1).toString()}
                                    onChangeText={(value) => handleQuantityChange(bagWeight, value)}
                                    keyboardType="numeric"
                                />
    
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => handleIncreaseQuantity(bagWeight)}
                                >
                                    <Text style={styles.quantityButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                })}
    
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>{t('Total Amount')}:</Text>
                    <View style={styles.totalValueContainer}>
                        <TextInput
                            style={styles.totalInput}
                            value={totalAmount.toString()}
                            editable={false}
                        />
                        <Text style={styles.totalCurrency}>Rs</Text>
                    </View>
                </View>
    
                <View style={styles.submitButtonContainer}>
                    <CustomButton
                        MainText={t('Submit')}
                        BgGiven={colors.GREEN}
                        txColor={colors.WHITE}
                        wgiven={wp('80%')}
                        hgiven={hp('5%')}
                        isNavigation={true}
                        name={ScreensName.AuctionSubmissionSuccess}
                    />
                </View>
            </View>
        );
    };
    

    const renderLiveAuctionContent = () => (
        <>
            {renderTitle()}
            {renderProductDetails()}
            {renderAuctionTimings()}
            {renderAuctionPrices()}
            {renderProductDescription()}
            {renderCategories()}
            {renderCurrentBid()}
            {renderPlaceBid()}
            
        </>
    );

    const renderPreAuctionContent = () => (
        <>
            {renderTitle()}
            {renderProductDetails()}
            {renderAuctionTimings()}
            {renderAuctionPrices()}
            {renderProductDescription()}
            {renderCategories()}
            {renderBuyNow()}
            {renderMakeAnOffer()}
        </>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar hasBackButton={true} />
            </View>

            <View style={styles.searchContainer}>
                <CustomSearchApp placeholder={t('Search in here')} />
            </View>

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.content}>
                    {isLiveAuction ? renderLiveAuctionContent() : renderPreAuctionContent()}
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
    scrollContainer: {
        flex: 1,
    },
    content: {
        padding: hp(3),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(2),
    },
    title: {
        fontSize: hp(3.5),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp(3),
    },
    titleContainer: {
        flexDirection: 'column',
    },
    statusBadge: {
        paddingHorizontal: wp(4),
        paddingVertical: hp(0.7),
        borderRadius: hp(1),
        width: wp('30%'),   
        height: hp('5%'),
    },
    ongoingBadge: {
        backgroundColor: colors.ORANGE,
    },
    preAuctionBadge: {
        backgroundColor: colors.SKY,
    },
    statusText: {
        color: colors.WHITE,
        fontFamily: fonts.Medium,
        fontSize: hp(1.7),
    },
    productDetailsCard: {
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: hp(1.5),
        padding: hp(2),
        marginBottom: hp(3),
        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    productDetailsTitle: {
        fontSize: hp(2.2),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp(2),
        textAlign: 'center',
    },
    productContentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    imageContainer: {
        flex: 0.45,
        alignItems: 'center',
        justifyContent: 'center',
        padding: hp(1),
    },
    placeholderImage: {
        width: wp(20),
        height: wp(20),
        backgroundColor: colors.LIGHT_GRAY,
        borderRadius: hp(1),
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        fontSize: hp(1.6),
        fontFamily: fonts.Medium,
        color: colors.DARK_GRAY,
    },
    detailsContainer: {
        flex: 0.5,
        marginLeft: wp(2),
    },
    detailDivider: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: colors.GREEN,
        paddingTop: hp(1.5),
    },
    verticalDivider: {
        width: 1,
        backgroundColor: colors.GREEN,
        marginHorizontal: wp(1),
    },
    horizontalDivider: {
        height: 1,
        backgroundColor: colors.GREEN,
        marginVertical: hp(1.5),
    },
    detailColumn: {
        flex: 1,
        paddingHorizontal: wp(1),
    },
    detailLabel: {
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.DARK_GRAY,
        marginBottom: hp(0.5),
    },
    detailValue: {
        fontSize: hp(1.3),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
    },
    sectionContainer: {
        paddingVertical: hp(2),
    },
    sectionContainerNoTopPadding: {
        // paddingBottom: hp(1.5),
    },
    sectionDivider: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sectionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sectionColumn: {
        flex: 1,
        paddingHorizontal: wp(1),
    },
    categoriesContainerNoTopPadding: {
        paddingBottom: hp(1.5),
    },
    categoryDivider: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    categoryColumn: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: wp(2),
    },
    sectionLabel: {
        fontSize: hp(1.7),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
        marginBottom: hp(0.5),
    },
    sectionValue: {
        fontSize: hp(1.4),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
    },
    sectionValue1: {
        fontSize: hp(1.7),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginLeft: wp(6),
    },
    descriptionContainer: {
        paddingVertical: hp(1.5),
    },
    descriptionText: {
        fontSize: hp(1.8),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
        lineHeight: hp(2.5),
        marginVertical: hp(1),
    },
    buyNowContainer: {
        borderTopWidth: 1,
        borderTopColor: colors.GREEN,
        paddingVertical: hp(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buyNowRow: {
        flexDirection: 'column',
    },
    buyNowLabel: {
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.DARK_GRAY,
    },
    buyNowPrice: {
        fontSize: hp(2.2),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
    },
    currentBidLabel: {
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.DARK_GRAY,
        marginBottom: hp(0.5),
        textAlign: 'center',
    },
    currentBidValue: {
        fontSize: hp(2.2),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        textAlign: 'center',
    },
    placeBidContainer: {
        borderTopWidth: 1,
        borderTopColor: colors.GREEN,
        paddingVertical: hp(2),
    },
    maxBidRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(1),
    },
    maxBidLabel: {
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.DARK_GRAY,
    },
    bidInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bidInput: {
        width: wp(25),
        height: hp(5),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        borderRadius: hp(0.5),
        paddingHorizontal: wp(2),
        textAlign: 'right',
    },
    bidInputLabel: {
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        marginLeft: wp(2),
        marginRight: hp(0.5),
    },
    bidIncrementText: {
        fontSize: hp(1.6),
        fontFamily: fonts.Regular,
        color: colors.DARK_GRAY,
        marginBottom: hp(2),
    },
    placeBidButtonContainer: {
        alignItems: 'flex-end',
    },
    offerContainer: {
        borderTopWidth: 1,
        borderTopColor: colors.GREEN,
        paddingVertical: hp(2),
    },
    offerTitle: {
        fontSize: hp(2.2),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp(2),
    },
    offerTableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: hp(1),
        borderBottomWidth: 1,
        borderBottomColor: colors.GREEN,
    },
    offerHeaderItem: {
        flex: 1,
        textAlign: 'center',
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.DARK_GRAY,
    },
    offerTableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: hp(1.5),
        borderBottomWidth: 1,
        borderBottomColor: colors.GREEN,
    },
    checkboxContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkbox: {
        width: wp(5),
        height: wp(5),
        borderWidth: 2,
        borderColor: colors.GREEN,
        borderRadius: 4,
        marginRight: wp(2),
    },
    checkboxChecked: {
        backgroundColor: colors.GREEN,
    },
    bagText: {
        fontSize: hp(1.8),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
    priceText: {
        flex: 1,
        textAlign: 'center',
        fontSize: hp(1.8),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
    quantityContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityButton: {
        width: wp(7),
        height: wp(7),
        backgroundColor: colors.GREEN,
        borderRadius: wp(3.5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        color: colors.WHITE,
        fontSize: hp(2),
        fontWeight: 'bold',
    },
    quantityInput: {
        width: wp(10),
        height: hp(5),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        borderRadius: 4,
        textAlign: 'center',
        marginHorizontal: wp(1),
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp(2),
    },
    totalLabel: {
        fontSize: hp(2),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
    },
    totalValueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    totalInput: {
        width: wp(30),
        height: hp(5),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        borderRadius: 4,
        textAlign: 'right',
        paddingRight: wp(2),
    },
    totalCurrency: {
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        marginLeft: wp(2),
    },
    submitButtonContainer: {
        alignItems: 'center',
        marginTop: hp(3),
    },
    totalBidRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(1),
    },
    totalBidLabel: {
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.DARK_GRAY,
    },
    totalBidValue: {
        fontSize: hp(2.2),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
    },
    topBidderValue: {
        fontSize: hp(2.2),
        fontFamily: fonts.SemiBold,
        color: colors.GREEN,
    },
    bidSuccessMessage: {
        backgroundColor: colors.GREEN,
        padding: hp(2),
        borderRadius: hp(0.5),
        marginTop: hp(2),
    },
    bidSuccessText: {
        color: colors.WHITE,
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
    },
    productImage: {
        width: wp(30),
        height: wp(30),
        borderRadius: hp(1),
    },
});

export default AuctionDetails; 