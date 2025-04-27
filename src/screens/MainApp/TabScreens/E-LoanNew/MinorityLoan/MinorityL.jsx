import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import Navbar from '../../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../../CustomComponent/CustomSearchApp.jsx';
import colors from '../../../../../../util/Constants/colors.js';
import { fonts } from '../../../../../../util/Constants/FontName.js';
import { useNavigation } from '@react-navigation/native';
import ScreensName from '../../../../../../util/Constants/ScreensName.ts';
import { Picker } from '@react-native-picker/picker';

const userInfo = {
    name: 'ABC',
    cnic: '42201-12345-7',
    contact: '+92 123456789',
    email: 'abc@gmail.com',
    city: 'Karachi'
};

const MinorityL = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [loanType, setLoanType] = useState('');
    const [title, setTitle] = useState('');
    const [repaymentPeriod, setRepaymentPeriod] = useState('');
    const { height } = Dimensions.get("window");

  return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.searchBarContainer}>
                    <CustomSearchApp placeholder="Search in here" />
                </View>

                <Text style={styles.mainTitle}>{t("Request for Minority Loan")}</Text>

                <View style={styles.contentContainer}>
                    {/* User Info Section */}
                    <View style={styles.infoSection}>
                        <Text style={styles.infoText}>{t("Name")}: {userInfo.name}</Text>
                        <Text style={styles.infoText}>{t("CNIC")}: {userInfo.cnic}</Text>
                        <Text style={styles.infoText}>{t("Contact Number")}: {userInfo.contact}</Text>
                        <Text style={styles.infoText}>{t("Email")}: {userInfo.email}</Text>
                        <Text style={styles.infoText}>{t("City")}: {userInfo.city}</Text>
                    </View>

                    <Text style={styles.subTitle}>{t("Enter the following details:")}</Text>

                    {/* Form Section */}
                    <View style={styles.formContainer}>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>{t("Entity Name")}:</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder={t("Enter entity name")}
                                placeholderTextColor={colors.GRAY}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>{t("Yearly Crop Revenue")}:</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder={t("Enter yearly crop revenue")}
                                placeholderTextColor={colors.GRAY}
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>{t("Yearly Yield")}:</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder={t("Enter yearly yield")}
                                placeholderTextColor={colors.GRAY}
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>{t("Monthly Net Income")}:</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder={t("Enter monthly income")}
                                placeholderTextColor={colors.GRAY}
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>{t("Loan Type")}:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={loanType}
                                    onValueChange={(value) => setLoanType(value)}
                                    style={styles.picker}
                                    mode="dropdown"
                                    itemStyle={styles.pickerItem}
                                >
                                    <Picker.Item label={t("Select loan type")} value="" style={styles.pickerItem} />
                                    <Picker.Item label={t("Personal")} value="personal" style={styles.pickerItem} />
                                    <Picker.Item label={t("Agriculture")} value="agriculture" style={styles.pickerItem} />
                                    <Picker.Item label={t("Mortgage")} value="mortgage" style={styles.pickerItem} />
                                    <Picker.Item label={t("Business")} value="business" style={styles.pickerItem} />
                                </Picker>
                            </View>
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>{t("Title")}:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={title}
                                    onValueChange={(value) => setTitle(value)}
                                    style={styles.picker}
                                    mode="dropdown"
                                    itemStyle={styles.pickerItem}
                                >
                                    <Picker.Item label={t("Select title")} value="" style={styles.pickerItem} />
                                    <Picker.Item label={t("Mr.")} value="mr" style={styles.pickerItem} />
                                    <Picker.Item label={t("Mrs.")} value="mrs" style={styles.pickerItem} />
                                    <Picker.Item label={t("Miss")} value="miss" style={styles.pickerItem} />
                                    <Picker.Item label={t("Dr.")} value="dr" style={styles.pickerItem} />
                                </Picker>
                            </View>
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>{t("Loan Amount")}:</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder={t("Enter loan amount")}
                                placeholderTextColor={colors.GRAY}
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>{t("Desired Loan Repayment Period")}:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={repaymentPeriod}
                                    onValueChange={(value) => setRepaymentPeriod(value)}
                                    style={styles.picker}
                                    mode="dropdown"
                                    itemStyle={styles.pickerItem}
                                >
                                    <Picker.Item label={t("Select period")} value="" style={styles.pickerItem} />
                                    <Picker.Item label={t("1 Year")} value="1" style={styles.pickerItem} />
                                    <Picker.Item label={t("2 Years")} value="2" style={styles.pickerItem} />
                                    <Picker.Item label={t("3 Years")} value="3" style={styles.pickerItem} />
                                    <Picker.Item label={t("4 Years")} value="4" style={styles.pickerItem} />
                                    <Picker.Item label={t("5 Years")} value="5" style={styles.pickerItem} />
                                </Picker>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate(ScreensName.ELoanMinorityS2)}>
                        <Text style={styles.continueButtonText}>{t("Continue")}</Text>
                    </TouchableOpacity>
    </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    scrollView: {
        flex: 1,
    },
    navbarContainer: {
        height: hp('8.5%'),
        backgroundColor: colors.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GRAY,
    },
    searchBarContainer: {
        marginTop: hp('2%'),
        marginHorizontal: wp('2%'),
        height: hp('6%'),
    },
    mainTitle: {
        fontSize: hp('2.8%'),
        marginTop: hp('2%'),
        marginLeft: wp('4%'),
        marginBottom: hp('2%'),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
    },
    contentContainer: {
        paddingHorizontal: wp('4%'),
    },
    infoSection: {
        backgroundColor: colors.LIGHT_GREEN,
        padding: hp('2%'),
        borderRadius: hp('1%'),
        marginBottom: hp('3%'),
    },
    infoText: {
        fontSize: hp('1.8%'),
        marginBottom: hp('0.5%'),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
    subTitle: {
        fontSize: hp('2%'),
        marginBottom: hp('2%'),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
    },
    formContainer: {
        marginBottom: hp('3%'),
    },
    inputWrapper: {
        marginBottom: hp('2%'),
    },
    label: {
        fontSize: hp('1.8%'),
        marginBottom: hp('0.5%'),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
    },
    input: {
        height: hp('6%'),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        borderRadius: hp('1%'),
        paddingHorizontal: wp('3%'),
        fontSize: hp('1.8%'),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
    pickerContainer: {
        height: hp('6%'),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        borderRadius: hp('1%'),
        justifyContent: 'center',
        overflow: 'hidden',
    },
    picker: {
        height: hp('6%'),
        color: colors.BLACK,
        fontFamily: fonts.Regular,
    },
    pickerItem: {
        fontSize: hp('1.6'),
        fontFamily: fonts.Regular,
    },
    continueButton: {
        backgroundColor: colors.GREEN,
        height: hp('6%'),
        borderRadius: hp('1%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp('3%'),
    },
    continueButtonText: {
        color: colors.WHITE,
        fontSize: hp('2%'),
        fontFamily: fonts.Medium,
    },
});

export default MinorityL;