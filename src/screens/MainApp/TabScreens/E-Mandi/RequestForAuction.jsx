import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
    Platform,
    Modal,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { MMKV } from 'react-native-mmkv';
import { launchImageLibrary } from 'react-native-image-picker';
import ScreensName from '../../../../../util/Constants/ScreensName.ts';

import Navbar from '../../Navbar/Navbar.jsx';
import { fonts } from '../../../../../util/Constants/FontName.js';
import colors from '../../../../../util/Constants/colors.js';
import CustomInput from '../../../../components/CustomInput.jsx';
import CustomButton from '../../../../components/CustomButton.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import { firestore } from '../../../../../firebase/firebase';

// Initialize MMKV storage
const storage = new MMKV();

function RequestForAuction() {
    const { t } = useTranslation();
    const navigation = useNavigation();

    // Form state
    const [madeBy, setMadeBy] = useState('');
    const [productName, setProductName] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [startPrice, setStartPrice] = useState('');
    const [reservePrice, setReservePrice] = useState('');
    const [buyNowPrice, setBuyNowPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [qualityDiscounts, setQualityDiscounts] = useState([
        { bags: '1 Kg', price: '100', quantity: 1, enabled: false },
        { bags: '5 Kg', price: '100', quantity: 1, enabled: false },
        { bags: '10 Kg', price: '100', quantity: 1, enabled: false },
        { bags: '20 Kg', price: '100', quantity: 1, enabled: false },
    ]);
    const [totalAmount, setTotalAmount] = useState('0');
    const [productImage, setProductImage] = useState(null);
    const [uploadedCertificate, setUploadedCertificate] = useState(null);
    
    // Category options
    const categoryOptions = [
        'Fruit',
        'Vegetable',
        'Machinery',
        'Insecticides',
        'Herbicides',
        'Seeds',
        'Fertilizers',
        'Tools',
        'Other'
    ];

    // Date picker visibility states
    const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
    const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);

    // Date picker handlers
    const handleStartDateConfirm = (date) => {
        setStartDate(formatDate(date));
        setStartDatePickerVisible(false);
    };

    const handleStartTimeConfirm = (time) => {
        setStartTime(formatTime(time));
        setStartTimePickerVisible(false);
    };

    const handleEndDateConfirm = (date) => {
        setEndDate(formatDate(date));
        setEndDatePickerVisible(false);
    };

    const handleEndTimeConfirm = (time) => {
        setEndTime(formatTime(time));
        setEndTimePickerVisible(false);
    };

    // Format functions
    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatTime = (time) => {
        const hours = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    // Image picker function
    const handleImagePicker = () => {
        const options = {
            mediaType: 'photo',
            quality: 0.8,
            maxWidth: 800,
            maxHeight: 800,
            includeBase64: true,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorCode);
                Alert.alert('Error', 'Failed to pick image. Please try again.');
            } else if (response.assets && response.assets.length > 0) {
                console.log('Image selected successfully');
                setProductImage({
                    uri: response.assets[0].uri,
                    type: response.assets[0].type,
                    name: response.assets[0].fileName,
                    base64: response.assets[0].base64,
                });
            }
        });
    };
    
    // Certificate upload handler
    const handleCertificateUpload = () => {
        const options = {
            mediaType: 'photo',
            quality: 0.8,
            maxWidth: 800,
            maxHeight: 800,
            includeBase64: true,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled certificate picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorCode);
                Alert.alert('Error', 'Failed to pick certificate. Please try again.');
            } else if (response.assets && response.assets.length > 0) {
                console.log('Certificate selected successfully');
                setUploadedCertificate({
                    uri: response.assets[0].uri,
                    type: response.assets[0].type,
                    name: response.assets[0].fileName,
                    base64: response.assets[0].base64,
                });
            }
        });
    };
    
    const handleRequestGrading = () => {
        navigation.navigate(ScreensName.RequestGrading);
    };
    
    const handleRemoveCertificate = () => {
        setUploadedCertificate(null);
    };

    // Quality discount handlers
    const toggleDiscountEnabled = (index) => {
        const newDiscounts = [...qualityDiscounts];
        newDiscounts[index].enabled = !newDiscounts[index].enabled;
        setQualityDiscounts(newDiscounts);
        calculateTotal(newDiscounts);
    };

    const updateDiscountPrice = (index, value) => {
        const newDiscounts = [...qualityDiscounts];
        newDiscounts[index].price = value;
        setQualityDiscounts(newDiscounts);
        calculateTotal(newDiscounts);
    };
    
    const incrementQuantity = (index) => {
        const newDiscounts = [...qualityDiscounts];
        newDiscounts[index].quantity += 1;
        setQualityDiscounts(newDiscounts);
        calculateTotal(newDiscounts);
    };

    const decrementQuantity = (index) => {
        const newDiscounts = [...qualityDiscounts];
        if (newDiscounts[index].quantity > 1) {
            newDiscounts[index].quantity -= 1;
            setQualityDiscounts(newDiscounts);
            calculateTotal(newDiscounts);
        }
    };

    const calculateTotal = (discounts) => {
        let total = 0;
        discounts.forEach(discount => {
            if (discount.enabled) {
                // Extract numeric part from the price
                const priceValue = parseInt(discount.price, 10);
                total += priceValue * discount.quantity;
            }
        });
        setTotalAmount(total.toString());
    };

    // Submit handler
    const handleSubmit = async () => {
        if (!productName || !startPrice) {
            alert('Please fill in at least Product Name and Start Price!');
            return;
        }
    
        try {
            // Get the user ID from storage
            const userId = storage.getString('userId') || 'anonymous';
            console.log("Creating auction for user ID:", userId);
            
            // Create auction data object
            const auctionData = {
                madeBy,
                productName,
                startDate,
                startTime,
                endDate,
                endTime,
                startPrice,
                reservePrice,
                buyNowPrice,
                description,
                category,
                quantity,
                qualityDiscounts: qualityDiscounts.filter(discount => discount.enabled),
                totalAmount,
                createdAt: firestore.FieldValue.serverTimestamp(),
                status:createdAt==Date.now() ? 'ongoing' : 'pre-auction',
                userId: userId, // Use the user ID from storage
            };
            
            // Add image data if available
            if (productImage && productImage.base64) {
                auctionData.imageData = {
                    base64: productImage.base64,
                    type: productImage.type
                };
            }
            
            await firestore()
                .collection('auctions')
                .add(auctionData);
            
            navigation.navigate(ScreensName.AuctionSubmissionSuccess);
        } catch (error) {
            console.error('Error adding auction:', error);
            alert('Failed to submit auction. Please try again.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar hasBackButton={true} />
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    <Text style={styles.title}>{t('Mandi - Create Auction')}</Text>

                    <View style={styles.formContainer}>
                        <View style={styles.formFieldsContainer}>
                            <Text style={styles.formLabel}>{t('Enter the following details:')}</Text>

                            <View style={styles.imageUploadContainer}>
                                <TouchableOpacity 
                                    style={styles.imageBox}
                                    onPress={handleImagePicker}
                                >
                                    {productImage ? (
                                        <Image 
                                            source={{ uri: productImage.uri }} 
                                            style={styles.productImage} 
                                        />
                                    ) : (
                                        <View style={styles.imageHint}>
                                            <Text style={styles.imageHintText}>+</Text>
                                            <Text style={styles.imageHintSubtext}>{t('Upload Image')}</Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                                <View style={styles.formFields}>
                                    <View style={styles.formField}>
                                        <Text style={styles.fieldLabel}>{t('Made By:')}</Text>
                                        <CustomInput
                                            placeholder="Your Name"
                                            w={wp('45%')}
                                            h={hp('5.5%')}
                                            value={madeBy}
                                            onChangeText={setMadeBy}
                                            bg_give={colors.WHITE}
                                        />
                                    </View>
                                    <View style={styles.formField}>
                                        <Text style={styles.fieldLabel}>{t('Product Name:')}</Text>
                                        <CustomInput
                                            placeholder="Enter product name"
                                            w={wp('45%')}
                                            h={hp('5.5%')}
                                            value={productName}
                                            onChangeText={setProductName}
                                            bg_give={colors.WHITE}
                                        />
                                    </View>
                                </View>
                            </View>

                        </View>

                        <View style={styles.dateTimeContainer}>
                            <Text style={styles.fieldLabel}>{t('Auction starts at:')}</Text>
                            <View style={styles.dateTimeRow}>
                                <TouchableOpacity
                                    style={styles.dateInputPicker}
                                    onPress={() => setStartDatePickerVisible(true)}
                                >
                                    <Text style={styles.dateTimeText}>
                                        {startDate || 'DD/MM/YYYY'}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.timeInputPicker}
                                    onPress={() => setStartTimePickerVisible(true)}
                                >
                                    <Text style={styles.dateTimeText}>
                                        {startTime || 'HH:MM'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.dateTimeContainer}>
                            <Text style={styles.fieldLabel}>{t('Auction ends at:')}</Text>
                            <View style={styles.dateTimeRow}>
                                <TouchableOpacity
                                    style={styles.dateInputPicker}
                                    onPress={() => setEndDatePickerVisible(true)}
                                >
                                    <Text style={styles.dateTimeText}>
                                        {endDate || 'DD/MM/YYYY'}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.timeInputPicker}
                                    onPress={() => setEndTimePickerVisible(true)}
                                >
                                    <Text style={styles.dateTimeText}>
                                        {endTime || 'HH:MM'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.priceContainer}>
                            <Text style={styles.fieldLabel}>{t('Auction start price:')}</Text>
                            <View style={styles.priceInputContainer}>
                                <View style={styles.currencyContainer}>
                                    <Text style={styles.currencyText}>PKR</Text>
                                </View>
                                <CustomInput
                                    placeholder="Enter price"
                                    w={wp('80%')}
                                    value={startPrice}
                                    h={hp('5.5%')}
                                    onChangeText={setStartPrice}
                                    numericOnly={true}
                                    bg_give={colors.WHITE}
                                    AllowNumberOnly={true}
                                />
                            </View>
                        </View>

                        <View style={styles.priceContainer}>
                            <Text style={styles.fieldLabel}>{t('Auction reserve price:')}</Text>
                            <View style={styles.priceInputContainer}>
                                <View style={styles.currencyContainer}>
                                    <Text style={styles.currencyText}>PKR</Text>
                                </View>
                                <CustomInput
                                    placeholder="Enter reserve price"
                                    w={wp('80%')}
                                    h={hp('5.5%')}
                                    value={reservePrice}
                                    onChangeText={setReservePrice}
                                    numericOnly={true}
                                    bg_give={colors.WHITE}
                                    AllowNumberOnly={true}
                                />
                            </View>
                        </View>

                        <View style={styles.priceContainer}>
                            <Text style={styles.fieldLabel}>{t('Buy now price:')}</Text>
                            <View style={styles.priceInputContainer}>
                                <View style={styles.currencyContainer}>
                                    <Text style={styles.currencyText}>PKR</Text>
                                </View>
                                <CustomInput
                                    placeholder="Enter buy now price"
                                    w={wp('80%')}
                                    h={hp('5.5%')}
                                    value={buyNowPrice}
                                    onChangeText={setBuyNowPrice}
                                    numericOnly={true}
                                    bg_give={colors.WHITE}
                                    AllowNumberOnly={true}
                                />
                            </View>
                        </View>

                        <View style={styles.pickerContainer}>
                            <Text style={styles.fieldLabel}>{t('Category')}:</Text>
                            <View style={styles.picker}>
                                <Picker
                                    selectedValue={category}
                                    onValueChange={(itemValue) => setCategory(itemValue)}
                                    mode="dropdown"
                                    itemStyle={styles.pickerItem}
                                >
                                    <Picker.Item
                                        label={t('Select category')}
                                        value=""
                                        style={styles.pickerItem}
                                    />
                                    {categoryOptions.map((item, index) => (
                                        <Picker.Item
                                            key={index}
                                            label={item}
                                            value={item}
                                            style={styles.pickerItem}
                                        />
                                    ))}
                                </Picker>
                            </View>
                        </View>

                        <View style={styles.pickerContainer}>
                            <Text style={styles.fieldLabel}>{t('Enter quantity available(In Kg)')}:</Text>
                            <CustomInput
                                placeholder="Enter quantity"
                                w={wp('90%')}
                                h={hp('5.5%')}
                                value={quantity}
                                onChangeText={setQuantity}
                                bg_give={colors.WHITE}
                                AllowNumberOnly={true}
                            />
                        </View>

                        <View style={styles.descriptionContainer}>
                            <Text style={styles.fieldLabel}>{t('Enter product description:')}</Text>
                            <View style={styles.descriptionInputContainer}>
                                <CustomInput
                                    placeholder="Enter description"
                                    w={wp('90%')}
                                    h={hp('12%')}
                                    value={description}
                                    onChangeText={setDescription}
                                    bg_give={colors.WHITE}
                                    customStyle={{textAlignVertical: 'top'}}
                                    multiline={true}
                                    numberOfLines={4}
                                />
                            </View>
                        </View>
                        
                        <View style={styles.certificateContainer}>
                            <View style={styles.certificateRow}>
                                <Text style={styles.fieldLabel}>{t('Upload Grading Certificate:')}</Text>
                                <CustomButton
                                    MainText="Upload"
                                    BgGiven={colors.GREEN}
                                    txColor={colors.WHITE}
                                    wgiven={wp('25%')}
                                    hgiven={hp('4%')}
                                    onPressG={handleCertificateUpload}
                                />
                            </View>
                            
                            {uploadedCertificate && (
                                <View style={styles.uploadedFileRow}>
                                    <Text style={styles.uploadedFileText}>
                                        {t('Certificate Uploaded!')}
                                    </Text>
                                    <TouchableOpacity onPress={handleRemoveCertificate}>
                                        <Text style={styles.removeText}>{t('Remove')}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            
                            <Text style={styles.certificateHelp}>{t('Don\'t have a certificate yet?')}</Text>
                            <View style={styles.certificateRow}>
                                <Text style={styles.fieldLabel}>{t('Request Grading Certificate:')}</Text>
                                <CustomButton
                                    MainText="Request"
                                    BgGiven={colors.GREEN}
                                    txColor={colors.WHITE}
                                    wgiven={wp('25%')}
                                    hgiven={hp('4%')}
                                    onPressG={handleRequestGrading}
                                />
                            </View>
                        </View>

                        <View style={styles.qualityDiscountsContainer}>
                            <Text style={styles.discountTitle}>{t('Quantity Discounts')}</Text>

                            <View style={styles.discountHeaderRow}>
                                <Text style={styles.discountHeader}>{t('Bags')}</Text>
                                <Text style={styles.discountHeader}>{t('Price')}</Text>
                            </View>

                            {qualityDiscounts.map((discount, index) => (
                                <View key={index} style={styles.discountRow}>
                                    <View style={styles.checkboxContainer}>
                                        <TouchableOpacity
                                            style={[styles.checkbox, discount.enabled && styles.checkboxChecked]}
                                            onPress={() => toggleDiscountEnabled(index)}
                                        >
                                            {discount.enabled && <Text style={styles.checkmark}>✓</Text>}
                                        </TouchableOpacity>
                                        <Text style={styles.discountText}>{discount.bags}</Text>
                                    </View>
                                    <View style={styles.discountPriceContainer}>
                                        <CustomInput 
                                            w={wp('25%')}
                                            h={hp('5%')}
                                            bg_give={colors.WHITE}
                                            value={0}
                                            onChangeText={(value) => updateDiscountPrice(index, value)}
                                            AllowNumberOnly={true}
                                        />
                                        <Text style={styles.discountUnit}>RS</Text>
                                    </View>
                                </View>
                            ))}
                        </View>

                        <View style={styles.buttonContainer}>
                            <CustomButton
                                MainText="Submit"
                                BgGiven={colors.GREEN}
                                txColor={colors.WHITE}
                                wgiven={wp('85%')}
                                hgiven={hp('5%')}
                                onPressG={handleSubmit}
                            />
                        </View>

                    </View>
                </View>
            </ScrollView>

            {/* Date/Time Pickers */}
            <DateTimePickerModal
                isVisible={isStartDatePickerVisible}
                mode="date"
                onConfirm={handleStartDateConfirm}
                onCancel={() => setStartDatePickerVisible(false)}
            />
            <DateTimePickerModal
                isVisible={isStartTimePickerVisible}
                mode="time"
                onConfirm={handleStartTimeConfirm}
                onCancel={() => setStartTimePickerVisible(false)}
            />
            <DateTimePickerModal
                isVisible={isEndDatePickerVisible}
                mode="date"
                onConfirm={handleEndDateConfirm}
                onCancel={() => setEndDatePickerVisible(false)}
            />
            <DateTimePickerModal
                isVisible={isEndTimePickerVisible}
                mode="time"
                onConfirm={handleEndTimeConfirm}
                onCancel={() => setEndTimePickerVisible(false)}
            />
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
    scrollView: {
        flex: 1,
    },
    content: {
        paddingBottom: hp(5),
    },
    title: {
        fontSize: hp(3),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp(2),
        marginLeft: hp(2),
    },
    formContainer: {
        backgroundColor: colors.WHITE,
        borderRadius: hp(1.5),
        padding: hp(2),
    },
    formLabel: {
        fontSize: hp(2),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        marginBottom: hp(2),
    },
    formFieldsContainer: {
        backgroundColor: colors.LIGHT_GREEN,
        marginBottom: hp(2),
    },
    imageUploadContainer: {
        flexDirection: 'row',
        marginBottom: hp(2),
        padding: hp(1.5),
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: hp(1),
    },
    imageBox: {
        width: wp('27%'),
        height: hp('15%'),
        backgroundColor: colors.GRAY,
        borderRadius: hp(1),
        marginRight: wp(3),
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imageHint: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageHintText: {
        fontSize: hp(4),
        color: colors.WHITE,
        fontWeight: 'bold',
    },
    imageHintSubtext: {
        fontSize: hp(1.4),
        color: colors.WHITE,
        marginTop: hp(0.5),
    },
    formFields: {
        flex: 1,
        justifyContent: 'space-between',
    },
    formField: {
        marginBottom: hp(1),
    },
    fieldLabel: {
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        marginBottom: hp(0.5),
        marginLeft: hp(1),
        marginRight: hp(1),
        marginTop: hp(1),
        marginHorizontal: hp(1),
        marginBottom: hp(1),
    },
    dateTimeContainer: {
        marginBottom: hp(2),
    },
    dateTimeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateInputPicker: {
        width: wp('70%'),
        height: hp('5.5%'),
        backgroundColor: colors.WHITE,
        borderRadius: hp(0.5),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        justifyContent: 'center',
        paddingHorizontal: wp(2),
    },
    timeInputPicker: {
        width: wp('23%'),
        height: hp('5.5%'),
        backgroundColor: colors.WHITE,
        borderRadius: hp(0.5),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        justifyContent: 'center',
        paddingHorizontal: wp(2),
    },
    dateTimeText: {
        fontSize: hp(1.8),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
    priceContainer: {
        marginBottom: hp(2),
    },
    priceInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    currencyContainer: {
        height: hp('5.5%'),
        backgroundColor: colors.GREEN,
        borderTopLeftRadius: hp(0.5),
        borderBottomLeftRadius: hp(0.5),
        justifyContent: 'center',
        paddingHorizontal: wp(3),
        marginRight: -2,
    },
    currencyText: {
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.WHITE,
    },
    descriptionContainer: {
        marginBottom: hp(2),
    },
    descriptionInputContainer: {
        height: hp('12%'),
    },
    pickerContainer: {
        marginBottom: hp(2),
        alignSelf: 'center',
    },
    picker: {
        width: wp('90%'),
        height: hp('5.5%'),
        backgroundColor: colors.WHITE,
        borderRadius: hp(0.5),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        justifyContent: 'center',
    },
    pickerItem: {
        fontSize: hp(1.8),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
    certificateContainer: {
        marginTop: hp(2),
        marginBottom: hp(2),
    },
    certificateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(1),
    },
    uploadedFileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: hp(1),
        marginBottom: hp(1),
    },
    uploadedFileText: {
        fontSize: hp(1.6),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
        marginRight: wp(2),
    },
    removeText: {
        fontSize: hp(1.6),
        fontFamily: fonts.Regular,
        color: colors.GREEN,
    },
    certificateHelp: {
        fontSize: hp(1.6),
        fontFamily: fonts.Regular,
        color: colors.GRAY,
        marginBottom: hp(1),
        marginLeft: hp(1),
        marginRight: hp(1),
        marginTop: hp(1),
        marginHorizontal: hp(1),
        marginBottom: hp(1),
    },
    qualityDiscountsContainer: {
        marginVertical: hp(2),
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: hp(1),
        padding: hp(1.5),
    },
    discountTitle: {
        fontSize: hp(2),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp(1.5),
        textAlign: 'center',
    },
    discountHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GRAY,
        paddingBottom: hp(0.5),
        marginBottom: hp(1),
    },
    discountHeader: {
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        flex: 1,
        textAlign: 'center',
    },
    discountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(1),
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    checkbox: {
        width: hp(2.5),
        height: hp(2.5),
        borderWidth: 1,
        borderColor: colors.GRAY,
        marginRight: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: colors.GREEN,
        borderColor: colors.GREEN,
    },
    checkmark: {
        color: colors.WHITE,
        fontSize: hp(1.5),
    },
    discountText: {
        fontSize: hp(1.8),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
        flex: 1,
    },
    discountPriceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
    },
    discountUnit: {
        fontSize: hp(1.8),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
        marginLeft: wp(1),
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    quantityButton: {
        width: hp(2.5),
        height: hp(2.5),
        backgroundColor: colors.GREEN,
        borderRadius: hp(0.5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        color: colors.WHITE,
        fontSize: hp(1.8),
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: hp(1.8),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(3),
    },
    totalLabel: {
        fontSize: hp(2),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
    },
    totalAmountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        borderRadius: hp(0.5),
        paddingHorizontal: wp(3),
        paddingVertical: hp(0.5),
        backgroundColor: colors.WHITE,
    },
    totalAmount: {
        fontSize: hp(2),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
    },
    totalCurrency: {
        fontSize: hp(1.8),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
        marginLeft: wp(1),
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: hp(2),
    },
});

export default RequestForAuction; 