import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";

import Navbar from '../../Navbar/Navbar.jsx';
import { fonts } from '../../../../../util/Constants/FontName.js';
import colors from '../../../../../util/Constants/colors.js';
import CustomInput from '../../../../components/CustomInput.jsx';
import CustomButton from '../../../../components/CustomButton.jsx';

function RequestForAuction() {
    const { t } = useTranslation();

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
        { bags: '1 Kg', price: '100 RS', quantity: 1, enabled: false },
        { bags: '5 Kg', price: '100 RS', quantity: 1, enabled: false },
        { bags: '10 Kg', price: '100 RS', quantity: 1, enabled: false },
        { bags: '20 Kg', price: '100 RS', quantity: 1, enabled: false },
    ]);
    const [totalAmount, setTotalAmount] = useState('0');

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

    // Quality discount handlers
    const toggleDiscountEnabled = (index) => {
        const newDiscounts = [...qualityDiscounts];
        newDiscounts[index].enabled = !newDiscounts[index].enabled;
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
                // Extract numeric part from the price (assuming format like "100 RS")
                const priceValue = parseInt(discount.price.split(' ')[0], 10);
                total += priceValue * discount.quantity;
            }
        });
        setTotalAmount(total.toString());
    };

    // Submit handler
    const handleSubmit = () => {
        // Implement form submission logic
        console.log('Form submitted');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar hasBackButton={true} />
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    <Text style={styles.title}>{t('Request For Auction')}</Text>

                    <View style={styles.formContainer}>
                        <Text style={styles.formLabel}>{t('Enter the following details:')}</Text>

                        <View style={styles.imageUploadContainer}>
                            <View style={styles.imageBox}>
                                {/* Placeholder for image upload */}
                            </View>
                            <View style={styles.formFields}>
                                <View style={styles.formField}>
                                    <Text style={styles.fieldLabel}>{t('Made By:')}</Text>
                                    <CustomInput
                                        placeholder="User"
                                        w={wp('45%')}
                                        value={madeBy}
                                        onChangeText={setMadeBy}
                                    />
                                </View>
                                <View style={styles.formField}>
                                    <Text style={styles.fieldLabel}>{t('Product Name:')}</Text>
                                    <CustomInput
                                        placeholder="Enter product name"
                                        w={wp('45%')}
                                        value={productName}
                                        onChangeText={setProductName}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.dateTimeContainer}>
                            <Text style={styles.fieldLabel}>{t('Auction starts at:')}</Text>
                            <View style={styles.dateTimeRow}>
                                <TouchableOpacity
                                    style={styles.dateTimePicker}
                                    onPress={() => setStartDatePickerVisible(true)}
                                >
                                    <Text style={styles.dateTimeText}>
                                        {startDate || 'DD/MM/YYYY'}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.dateTimePicker}
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
                                    style={styles.dateTimePicker}
                                    onPress={() => setEndDatePickerVisible(true)}
                                >
                                    <Text style={styles.dateTimeText}>
                                        {endDate || 'DD/MM/YYYY'}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.dateTimePicker}
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
                                <CustomInput
                                    placeholder="Enter price"
                                    w={wp('85%')}
                                    value={startPrice}
                                    onChangeText={setStartPrice}
                                    numericOnly={true}
                                />
                                <Text style={styles.currencyText}>Rs</Text>
                            </View>
                        </View>

                        <View style={styles.priceContainer}>
                            <Text style={styles.fieldLabel}>{t('Auction reserve price:')}</Text>
                            <View style={styles.priceInputContainer}>
                                <CustomInput
                                    placeholder="Enter reserve price"
                                    w={wp('85%')}
                                    value={reservePrice}
                                    onChangeText={setReservePrice}
                                    numericOnly={true}
                                />
                                <Text style={styles.currencyText}>Rs</Text>
                            </View>
                        </View>

                        <View style={styles.priceContainer}>
                            <Text style={styles.fieldLabel}>{t('Buy now price:')}</Text>
                            <View style={styles.priceInputContainer}>
                                <CustomInput
                                    placeholder="Enter buy now price"
                                    w={wp('85%')}
                                    value={buyNowPrice}
                                    onChangeText={setBuyNowPrice}
                                    numericOnly={true}
                                />
                                <Text style={styles.currencyText}>Rs</Text>
                            </View>
                        </View>

                        <View style={styles.descriptionContainer}>
                            <Text style={styles.fieldLabel}>{t('Enter product description:')}</Text>
                            <CustomInput
                                placeholder="Enter description"
                                w={wp('85%')}
                                h={hp('10%')}
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>

                        <View style={styles.pickerContainer}>
                            <Text style={styles.fieldLabel}>{t('Category:')}</Text>
                            <View style={styles.picker}>
                                <TouchableOpacity style={styles.pickerTouch}>
                                    <Text style={styles.pickerText}>{category || 'Enter category'}</Text>
                                    <Text style={styles.pickerDropdown}>▼</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.pickerContainer}>
                            <Text style={styles.fieldLabel}>{t('Quantity:')}</Text>
                            <View style={styles.picker}>
                                <TouchableOpacity style={styles.pickerTouch}>
                                    <Text style={styles.pickerText}>{quantity || 'Enter quantity/weight'}</Text>
                                    <Text style={styles.pickerDropdown}>▼</Text>
                                </TouchableOpacity>
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
                                />
                            </View>
                            <Text style={styles.certificateHelp}>{t('Don\'t have a certificate yet?')}</Text>
                            <View style={styles.certificateRow}>
                                <Text style={styles.fieldLabel}>{t('Request Grading Certificate:')}</Text>
                                <CustomButton
                                    MainText="Request"
                                    BgGiven={colors.GREEN}
                                    txColor={colors.WHITE}
                                    wgiven={wp('25%')}
                                    hgiven={hp('4%')}
                                />
                            </View>
                        </View>

                        <View style={styles.qualityDiscountsContainer}>
                            <Text style={styles.discountTitle}>{t('Quality Discounts')}</Text>

                            <View style={styles.discountHeaderRow}>
                                <Text style={styles.discountHeader}>{t('Bags')}</Text>
                                <Text style={styles.discountHeader}>{t('Price')}</Text>
                                <Text style={styles.discountHeader}>{t('Quantity')}</Text>
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
                                    <Text style={styles.discountText}>{discount.price}</Text>
                                    <View style={styles.quantityControls}>
                                        <TouchableOpacity
                                            style={styles.quantityButton}
                                            onPress={() => incrementQuantity(index)}
                                        >
                                            <Text style={styles.quantityButtonText}>+</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.quantityText}>{discount.quantity}</Text>
                                        <TouchableOpacity
                                            style={styles.quantityButton}
                                            onPress={() => decrementQuantity(index)}
                                        >
                                            <Text style={styles.quantityButtonText}>-</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </View>

                        <View style={styles.totalContainer}>
                            <Text style={styles.totalLabel}>{t('Total Amount:')}</Text>
                            <View style={styles.totalAmountContainer}>
                                <Text style={styles.totalAmount}>{totalAmount}</Text>
                                <Text style={styles.totalCurrency}>Rs</Text>
                            </View>
                        </View>

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
    scrollView: {
        flex: 1,
    },
    content: {
        padding: hp(3),
        paddingBottom: hp(5),
    },
    title: {
        fontSize: hp(3),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp(2),
    },
    formContainer: {
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: hp(1.5),
        padding: hp(2),
    },
    formLabel: {
        fontSize: hp(2),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        marginBottom: hp(2),
    },
    imageUploadContainer: {
        flexDirection: 'row',
        marginBottom: hp(2),
    },
    imageBox: {
        width: wp('27%'),
        height: hp('15%'),
        backgroundColor: colors.GRAY,
        borderRadius: hp(1),
        marginRight: wp(3),
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
    },
    dateTimeContainer: {
        marginBottom: hp(2),
    },
    dateTimeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateTimePicker: {
        width: wp('41%'),
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
    },
    currencyText: {
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        marginLeft: wp(2),
    },
    descriptionContainer: {
        marginBottom: hp(2),
    },
    pickerContainer: {
        marginBottom: hp(2),
    },
    picker: {
        width: wp('85%'),
        height: hp('5.5%'),
        backgroundColor: colors.WHITE,
        borderRadius: hp(0.5),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        justifyContent: 'center',
    },
    pickerTouch: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(2),
        justifyContent: 'space-between',
    },
    pickerText: {
        fontSize: hp(1.8),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
    pickerDropdown: {
        fontSize: hp(1.5),
        color: colors.GRAY,
    },
    certificateContainer: {
        marginBottom: hp(2),
    },
    certificateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(1),
    },
    certificateHelp: {
        fontSize: hp(1.6),
        fontFamily: fonts.Regular,
        color: colors.GRAY,
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
        textAlign: 'center',
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
});

export default RequestForAuction; 