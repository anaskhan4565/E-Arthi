import React from 'react';
import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../util/colors.js';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import CustomButton from '../../../../components/CustomButton.jsx';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import ScreensName from '../../../../../util/ScreensName.ts';

function EInventoryReminder(): React.JSX.Element {
    const { t } = useTranslation();
    const [selectedValue, setSelectedValue] = useState('all');
    const [selectedFrequency, setSelectedFrequency] = useState('daily');
    const [textMessage, setTextMessage] = useState('');
    const [email, setEmail] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.searchContainer}>
                    <CustomSearchApp placeholder={t('Search In Here')} />
                </View>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>{t('Inventory Reminder')}</Text>
                </View>
                <View style={styles.filterContainer}>
                    <Text style={styles.skuText}>{t('SKU Item')}</Text>
                    <View style={styles.dropdownContainer}>
                        <Picker
                            selectedValue={selectedValue}
                            onValueChange={(itemValue) => setSelectedValue(itemValue)}
                            style={styles.dropdown}
                            itemStyle={styles.pickerItem}
                        >
                            <Picker.Item 
                                label={t('search SKU item#')} 
                                value="" 
                                style={styles.pickerItemText} 
                            />
                            <Picker.Item 
                                label={t('All')} 
                                value="all" 
                                style={styles.pickerItemText} 
                            />
                            <Picker.Item 
                                label={t('Low Stock')} 
                                value="low" 
                                style={styles.pickerItemText} 
                            />
                            <Picker.Item 
                                label={t('Out of Stock')} 
                                value="out" 
                                style={styles.pickerItemText} 
                            />
                        </Picker>
                    </View>
                </View>
                <View style={styles.frequencyBox}>
                    <Text style={styles.frequencyTitle}>Frequency</Text>
                    <View style={styles.checkboxContainer}>
                        {['Daily', 'Weekly', 'Monthly', 'Custom'].map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={styles.checkboxRow}
                                onPress={() => setSelectedFrequency(option.toLowerCase())}
                            >
                                <View style={styles.checkbox}>
                                    {selectedFrequency === option.toLowerCase() && (
                                        <View style={styles.checkboxInner} />
                                    )}
                                </View>
                                <Text style={styles.checkboxLabel}>{t(option)}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <View style={styles.reminderBox}>
                    <Text style={styles.reminderTitle}>{t('Reminder sent via')}</Text>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputRow}>
                            <Text style={styles.inputLabel}>{t('Text Message')}</Text>
                            <TextInput
                                style={styles.input}
                                value={textMessage}
                                onChangeText={setTextMessage}
                                placeholder={t('Enter phone number')}
                                keyboardType="phone-pad"
                            />
                        </View>
                        <View style={styles.inputRow}>
                            <Text style={styles.inputLabel}>{t('Email')}</Text>
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder={t('Enter email address')}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton 
                        MainText={t('Save')}
                        BgGiven={colors.GREEN}
                        name={ScreensName.InventoryMonitoring}
                        txColor={colors.WHITE}
                        isNavigation={true}
                    />
                </View>
                <View style={styles.bodyContainer}>
                    <View style={styles.scrollContainer}>
                        
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
        height: hp('8.2%'),
        backgroundColor: 'white',
        marginTop: hp('0.14%'),
    },
    searchContainer: {
        marginTop: hp('3.2%'),
        // marginBottom: hp('1.2%'),
        height: hp('7%'),
    },
    bodyContainer: {
        alignItems: 'center',

    },
    titleContainer: {
        padding: 10,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: wp('6%'),
    },
    scrollContainer: {
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingVertical: hp('2%'),
        // backgroundColor: 'red',
        alignItems: 'center',

    },
    itemBoxWrapper: {
        width: '30%',
        marginBottom: hp('2%'),
        marginHorizontal: wp('-3%'),
        alignItems: 'center',

    },
    recommendedProducts: {
        marginTop: hp('2.5%'),
    },
    recommendedTitle: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        marginBottom: hp('1.25%'),
    },
    productRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('2.5%'),
    },
    headingContainer: {
        paddingHorizontal: wp('5%'),
        marginBottom: hp('2%'),
    },
    headingText: {
        fontSize: wp('5%'),
        fontFamily: 'Poppins Bold',
        color: colors.BLACK,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp('5%'),
        marginBottom: hp('2%'),
    },
    skuText: {
        fontSize: wp('4%'),
        fontFamily: 'Poppins Medium',
        color: colors.BLACK,
        width: wp('25%'),
    },
    dropdownContainer: {
        width: wp('65%'),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        borderRadius: 8,
        overflow: 'hidden',
        height: hp('5%'),
        justifyContent: 'center',
    },
    dropdown: {
        width: '100%',
        height: hp('6%'),
        fontSize: wp('3%'),
        fontFamily: 'Poppins Regular',
        // marginTop: -hp('1%'),
        // marginBottom: -hp('1%'),
        // paddingHorizontal: wp('1%'),
    },
    frequencyBox: {
        backgroundColor: colors.WHITE,
        marginHorizontal: wp('5%'),
        marginVertical: hp('2%'),
        padding: wp('3%'),
        borderRadius: 10,
        shadowColor: colors.BLACK,
        shadowOffset: {
            width: 0,
            height: hp('0.25%'),
        },
        shadowOpacity: 0.25,
        shadowRadius: wp('1%'),
        elevation: 5,
    },
    frequencyTitle: {
        fontSize: wp('4%'),
        fontFamily: 'Poppins Bold',
        color: colors.BLACK,
        marginBottom: hp('1%'),
    },
    checkboxContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '45%',
        marginBottom: hp('1%'),
    },
    checkbox: {
        width: wp('4.5%'),
        height: wp('4.5%'),
        borderRadius: wp('2.25%'),
        borderWidth: 2,
        borderColor: colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp('2%'),
    },
    checkboxInner: {
        width: wp('2.5%'),
        height: wp('2.5%'),
        borderRadius: wp('1.25%'),
        backgroundColor: colors.PRIMARY,
    },
    checkboxLabel: {
        fontSize: wp('3.5%'),
        fontFamily: 'Poppins Regular',
        color: colors.BLACK,
    },
    reminderBox: {
        backgroundColor: colors.WHITE,
        marginHorizontal: wp('5%'),
        marginVertical: hp('2%'),
        padding: wp('3%'),
        borderRadius: 10,
        shadowColor: colors.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    reminderTitle: {
        fontSize: wp('4%'),
        fontFamily: 'Poppins Bold',
        color: colors.BLACK,
        marginBottom: hp('1%'),
    },
    inputContainer: {
        gap: hp('1%'),
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: hp('0.5%'),
    },
    inputLabel: {
        fontSize: wp('3.5%'),
        fontFamily: 'Poppins Regular',
        color: colors.BLACK,
        width: wp('25%'),
    },
    input: {
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        borderRadius: 8,
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('1%'),
        fontSize: wp('3.5%'),
        fontFamily: 'Poppins Regular',
        color: colors.BLACK,
        width: wp('55%'),
    },
    buttonContainer: {
        alignItems: 'center',
        marginVertical: hp('2%'),
    },
    pickerItem: {
        fontSize: wp('3.5%'),
        fontFamily: 'Poppins Regular',
    },
    pickerItemText: {
        fontSize: wp('3.5%'),
        fontFamily: 'Poppins Regular',
        color: colors.BLACK,
    },
});



export default EInventoryReminder;
