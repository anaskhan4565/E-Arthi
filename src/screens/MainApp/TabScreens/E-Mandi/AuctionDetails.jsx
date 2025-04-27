import React, { useState, useEffect, useRef } from 'react';
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
    const { auctionData: initialAuctionData } = route.params;

    // State to hold the latest auction data
    const [auctionData, setAuctionData] = useState(initialAuctionData);
    // Ref to track whether component is mounted
    const isMounted = useRef(true);

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
    const [timeLeft, setTimeLeft] = useState(null);
    const [auctionExpired, setAuctionExpired] = useState(false);

    // Additional auction data
    const [currentBid, setCurrentBid] = useState(
        initialAuctionData.currentBid || initialAuctionData.startPrice
    );

    // Determine if user is the top bidder
    const isTopBidder = userCurrentBid > 0 && userCurrentBid >= currentBid;
    const isLiveAuction = auctionData.status === 'ongoing';

    // Function to fetch the latest auction data
    const fetchAuctionData = async () => {
        if (!isMounted.current || !auctionData.id) return;

        try {
            const auctionRef = ref(database, `allAuctions/${auctionData.id}`);
            const snapshot = await get(auctionRef);

            if (snapshot.exists()) {
                const fetchedData = snapshot.val();
                if (isMounted.current) {
                    // Update the auction data state with the fetched data
                    setAuctionData(prevData => ({
                        ...prevData,
                        ...fetchedData,
                    }));

                    // Update current bid if it exists in the fetched data
                    const highestBids = fetchedData.highestBids || [];
                    const highestBidAmount = highestBids.length > 0
                        ? highestBids[0].bidAmount
                        : fetchedData.startPrice || initialAuctionData.startPrice;

                    setCurrentBid(highestBidAmount);
                }
            }
        } catch (error) {
            console.error('Error fetching auction data:', error);
        }
    };

    // Set up interval to fetch data every 3 seconds
    useEffect(() => {
        isMounted.current = true;

        // Fetch data immediately once
        fetchAuctionData();

        // Then set up interval for every 3 seconds
        const intervalId = setInterval(fetchAuctionData, 3000);

        // Clean up interval when component unmounts
        return () => {
            isMounted.current = false;
            clearInterval(intervalId);
        };
    }, []);

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
        const userName = storage.getString('userName') || storage.getString('userEmail')?.split('@')[0] || 'Anonymous User';

        // Validate bid is at least the start price
        if (bidValue < auctionData.startPrice) {
            Alert.alert(
                t('Bid Too Low'),
                t('Your bid must be at least the starting price of ') + auctionData.startPrice + ' Rs.',
                [{ text: t('OK'), style: 'default' }]
            );
            return;
        }

        // If there are existing bids, validate new bid is higher than current highest
        if (currentBid && bidValue <= currentBid) {
            Alert.alert(
                t('Bid Too Low'),
                t('Your bid must be higher than the current highest bid of ') + currentBid + ' Rs.',
                [{ text: t('OK'), style: 'default' }]
            );
            return;
        }

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
                    bids[existingBidIndex].userName = userName; // Update name in case it changed
                } else {
                    Alert.alert(t('Low Bid'), t('Your bid must be higher than your previous bid.'));
                    return;
                }
            } else {
                bids.push({
                    bidAmount: bidValue,
                    userId: userId,
                    userName: userName,
                    timestamp: new Date().toISOString()
                });
            }

            // Sort descending and keep top 3
            bids.sort((a, b) => b.bidAmount - a.bidAmount);
            bids = bids.slice(0, 3);

            // Always increment bid count
            bidCount += 1;

            // Store this auction in user's bid history
            await saveToUserBidHistory(userId, auctionData.id, bidValue);

            // Update DB
            await update(auctionRef, {
                highestBids: bids,
                numberOfBids: bidCount,
            });

            // Update local state for the current user's bid
            setUserCurrentBid(bidValue);
            setShowBidSuccessMessage(true);

            setTimeout(() => setShowBidSuccessMessage(false), 3000);

            // Fetch the latest data after placing bid
            fetchAuctionData();
        } catch (error) {
            console.error('Error placing bid:', error);
            Alert.alert('Error', 'Failed to place bid. Please try again.');
        }
    };

    // Save auction to user's bid history
    const saveToUserBidHistory = async (userId, auctionId, bidAmount) => {
        try {
            // Create a safe auction data object with default values for missing fields
            const safeAuctionData = {
                productName: auctionData.productName || 'Unknown Product',
                startPrice: auctionData.startPrice || 0,
                endDate: auctionData.endDate || 'N/A',
                endTime: auctionData.endTime || 'N/A',
                grading: auctionData.grading || 'N/A',
                imageUrl: auctionData.imageUrl || null,
                category: auctionData.category || auctionData.productName || 'N/A',
                status: auctionData.status || 'ongoing'
            };

            const userBidsRef = ref(database, `userBids/${userId}/${auctionId}`);

            // Save/update with latest bid info
            await update(userBidsRef, {
                auctionId: auctionId,
                lastBidAmount: bidAmount,
                lastBidTime: new Date().toISOString(),
                // Store auction data for easy retrieval with safe values
                auctionData: safeAuctionData
            });
        } catch (error) {
            console.error('Error saving to user bid history:', error);
            Alert.alert('Bid Placed', 'Your bid was placed, but there was an issue saving to history.');
        }
    };

    useEffect(() => {
        let interval = null;

        const calculateTimeLeft = () => {
            const now = new Date().getTime();

            // Combine date and time into ISO 8601 format, handling slash format
            const parseDateTime = (dateStr, timeStr) => {
                if (!dateStr || !timeStr) {
                    console.error("Missing date or time strings", { dateStr, timeStr });
                    return now;
                }

                try {
                    // Ensure timeStr has seconds
                    const timeWithSeconds = timeStr.length === 5 ? `${timeStr}:00` : timeStr;

                    // Handle different date formats - both slashes and hyphens
                    let dateParts;
                    if (dateStr.includes('/')) {
                        dateParts = dateStr.split('/'); // Handle DD/MM/YYYY
                        const [day, month, year] = dateParts;
                        // Create date using individual components to ensure correct parsing
                        const dateObj = new Date(year, parseInt(month) - 1, day);
                        dateObj.setHours(...timeWithSeconds.split(':'));
                        return dateObj.getTime();
                    } else if (dateStr.includes('-')) {
                        dateParts = dateStr.split('-');
                        // Assume DD-MM-YYYY format
                        if (dateParts[0].length !== 4) {
                            const [day, month, year] = dateParts;
                            const dateObj = new Date(year, parseInt(month) - 1, day);
                            dateObj.setHours(...timeWithSeconds.split(':'));
                            return dateObj.getTime();
                        } else {
                            // YYYY-MM-DD format
                            return new Date(`${dateStr}T${timeWithSeconds}`).getTime();
                        }
                    } else {
                        console.error("Unsupported date format", dateStr);
                        return now;
                    }
                } catch (err) {
                    console.error("Error parsing date", { dateStr, timeStr, error: err.message });
                    return now;
                }
            };

            const targetTime = isLiveAuction
                ? parseDateTime(auctionData.endDate, auctionData.endTime)
                : parseDateTime(auctionData.startDate || auctionData.endDate,
                    auctionData.startTime || auctionData.endTime);

            const difference = targetTime - now;

            if (difference <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                setAuctionExpired(true);
            } else {
                // Calculate total days, hours, minutes and seconds
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                if (isNaN(days) || isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
                    console.error("Invalid time calculations", { difference, days, hours, minutes, seconds });
                    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                } else {
                    setTimeLeft({ days, hours, minutes, seconds });
                }
            }
        };

        calculateTimeLeft();
        interval = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [auctionData, isLiveAuction]);

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
                                <Text style={styles.detailValue}>{auctionData.madeBy}</Text>
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
                    <Text style={styles.sectionValue}>{auctionData.startDate}              <Text style={styles.sectionValue1}>{auctionData.startTime}</Text></Text>

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
                        <Text style={styles.sectionValue}>{auctionData.reservePrice} Rs</Text>
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
    const renderAuctionTimer = () => {
        if (auctionExpired) {
            return (
                <View style={styles.timerContainer}>
                    <Text style={styles.timerHeading}>
                        {isLiveAuction ? t('Auction Ended') : t('Auction Not Started Yet')}
                    </Text>
                    <Text style={styles.timerText}>{t('No longer available')}</Text>
                </View>
            );
        }

        // Format time values safely
        const formatTime = (value) => {
            if (value === undefined || value === null || isNaN(value)) {
                return '00';
            }
            return String(value).padStart(2, '0');
        };

        const days = timeLeft?.days || 0;
        const hours = formatTime(timeLeft?.hours);
        const minutes = formatTime(timeLeft?.minutes);
        const seconds = formatTime(timeLeft?.seconds);

        // Format timer string based on days remaining
        let timerStr = '';
        if (days > 0) {
            timerStr = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
            timerStr = `${hours}h ${minutes}m ${seconds}s`;
        }

        return (
            <View style={styles.timerContainer}>
                <Text style={styles.timerHeading}>
                    {isLiveAuction ? t('⏰ Time to finish this auction') : t('⏳ Time for auction to begin')}
                </Text>
                <Text style={styles.timerText}>
                    {timerStr}
                </Text>
            </View>
        );
    };
    const renderProductDescription = () => (
        <View style={styles.descriptionContainer}>
            <Text style={styles.sectionLabel}>{t('Product Description')}</Text>
            <Text style={styles.descriptionText}>{t(auctionData.description)}</Text>
            <View style={styles.horizontalDivider} />
        </View>
    );

    const renderCategories = () => (
        <View style={styles.categoriesContainerNoTopPadding}>
            <View style={styles.categoryDivider}>
                <View style={styles.categoryColumn}>
                    <Text style={styles.sectionLabel}>{t('Category')}:</Text>
                    <Text style={styles.sectionValue}>{t(auctionData.category)}</Text>
                </View>
                <View style={styles.verticalDivider} />
                <View style={styles.categoryColumn}>
                    <Text style={styles.sectionLabel}>{t('Quantity')}</Text>
                    <Text style={styles.sectionValue}>{auctionData.quantity} KG</Text>
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

    const renderBuyNow = () => {
        const totalQuantity = auctionData.quantity || 150; // Default to 150kg if not specified
        const totalBuyNowPrice = auctionData.buyNowPrice * totalQuantity;

        const handleBuyNowPress = () => {
            Alert.alert(
                t('Confirm Purchase'),
                t(`You are about to buy ${auctionData.productName} directly:\n\nQuantity: ${totalQuantity} kg\nPrice per kg: ${auctionData.buyNowPrice} Rs\nTotal Amount: ${totalBuyNowPrice} Rs`),
                [
                    {
                        text: t('Cancel'),
                        style: 'cancel',
                    },
                    {
                        text: t('Buy'),
                        onPress: () => {
                            // Navigate to payment method
                            navigation.navigate(ScreensName.PaymentHistory, {
                                auctionData: auctionData,
                                totalQuantity: totalQuantity,
                                totalPrice: totalBuyNowPrice,
                                buyNowPrice: auctionData.buyNowPrice,
                                purchaseType: 'buyNow'
                            });
                        },
                    },
                ]
            );
        };

        return (
            <View style={styles.buyNowContainer}>
                <View style={styles.buyNowRow}>
                    <Text style={styles.buyNowLabel}>{t('Buy now price')}:</Text>
                    <Text style={styles.buyNowPrice}>{auctionData.buyNowPrice} Rs</Text>
                </View>
                <CustomButton
                    MainText={t('Buy it now')}
                    BgGiven={auctionExpired ? colors.LIGHT_GRAY : colors.GREEN}
                    txColor={colors.WHITE}
                    wgiven={wp('30%')}
                    hgiven={hp('5%')}
                    disabled={auctionExpired}
                    onPressG={handleBuyNowPress}
                />
            </View>
        );
    };


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
            {renderAuctionTimer()}

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
            {renderAuctionTimer()}

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
    timerContainer: {
        alignItems: 'center',
        paddingVertical: hp(2),
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: hp(1),
        marginBottom: hp(2),
    },
    timerHeading: {
        fontSize: hp(2.2),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp(1),
    },
    timerText: {
        fontSize: hp(2),
        fontFamily: fonts.Medium,
        color: colors.ORANGE,
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