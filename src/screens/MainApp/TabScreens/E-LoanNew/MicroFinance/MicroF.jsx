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

const MicroF = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [loanType, setLoanType] = useState('Personal');
    const [title, setTitle] = useState('Mr.');
    const [repaymentPeriod, setRepaymentPeriod] = useState('1 Year');
    const [loanAmount, setLoanAmount] = useState('');
    const [purpose, setPurpose] = useState('');
    const [fullName, setFullName] = useState('');
    const [cnic, setCnic] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
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

                <Text style={styles.mainTitle}>Request For Micro Finance</Text>

                <View style={styles.contentContainer}>
                    {/* User Info Section */}
                    <View style={styles.infoSection}>
                        <Text style={styles.infoText}>Name: {userInfo.name}</Text>
                        <Text style={styles.infoText}>CNIC: {userInfo.cnic}</Text>
                        <Text style={styles.infoText}>Contact: {userInfo.contact}</Text>
                        <Text style={styles.infoText}>Email: {userInfo.email}</Text>
                        <Text style={styles.infoText}>City: {userInfo.city}</Text>
                    </View>

                    <Text style={styles.subTitle}>Loan Details</Text>

                    {/* Form Section */}
                    <View style={styles.formContainer}>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Loan Type:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={loanType}
                                    onValueChange={(itemValue) => setLoanType(itemValue)}
                                    style={styles.picker}
                                    dropdownIconColor={colors.GRAY}
                                >
                                    <Picker.Item label="Personal" value="Personal" />
                                    <Picker.Item label="Agriculture" value="Agriculture" />
                                    <Picker.Item label="Mortgage" value="Mortgage" />
                                    <Picker.Item label="Business" value="Business" />
                                </Picker>
                            </View>
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Title:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={title}
                                    onValueChange={(itemValue) => setTitle(itemValue)}
                                    style={styles.picker}
                                    dropdownIconColor={colors.GRAY}
                                >
                                    <Picker.Item label="Mr." value="Mr." />
                                    <Picker.Item label="Mrs." value="Mrs." />
                                    <Picker.Item label="Miss" value="Miss" />
                                    <Picker.Item label="Dr." value="Dr." />
                                </Picker>
                            </View>
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Loan Amount (PKR):</Text>
                            <TextInput
                                style={[styles.input, { width: wp('44%') }]}
                                onChangeText={setLoanAmount}
                                value={loanAmount}
                                placeholder="Enter loan amount"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Desired Loan Repayment Period:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={repaymentPeriod}
                                    onValueChange={(itemValue) => setRepaymentPeriod(itemValue)}
                                    style={styles.picker}
                                    dropdownIconColor={colors.GRAY}
                                >
                                    <Picker.Item label="1 Year" value="1 Year" />
                                    <Picker.Item label="2 Years" value="2 Years" />
                                    <Picker.Item label="3 Years" value="3 Years" />
                                    <Picker.Item label="4 Years" value="4 Years" />
                                    <Picker.Item label="5 Years" value="5 Years" />
                                </Picker>
                            </View>
                        </View>

                        <View style={[styles.inputWrapper, { flexDirection: 'column' }]}>
                            <Text style={[styles.label, { width: '100%' }]}>Purpose of Loan:</Text>
                            <TextInput
                                style={[styles.input, { width: '100%', height: hp('10%'), textAlignVertical: 'top', paddingTop: hp('1%') }]}
                                onChangeText={setPurpose}
                                value={purpose}
                                placeholder="Enter purpose of loan"
                                multiline={true}
                            />
                        </View>
                    </View>

                    <Text style={styles.subTitle}>Personal Information</Text>

                    <View style={styles.formContainer}>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Full Name:</Text>
                            <TextInput
                                style={[styles.input, { width: wp('44%') }]}
                                onChangeText={setFullName}
                                value={fullName}
                                placeholder="Enter full name"
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>CNIC:</Text>
                            <TextInput
                                style={[styles.input, { width: wp('44%') }]}
                                onChangeText={setCnic}
                                value={cnic}
                                placeholder="Enter CNIC"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Mobile Number:</Text>
                            <TextInput
                                style={[styles.input, { width: wp('44%') }]}
                                onChangeText={setMobileNumber}
                                value={mobileNumber}
                                placeholder="Enter mobile number"
                                keyboardType="phone-pad"
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Email:</Text>
                            <TextInput
                                style={[styles.input, { width: wp('44%') }]}
                                onChangeText={setEmail}
                                value={email}
                                placeholder="Enter email"
                                keyboardType="email-address"
                            />
                        </View>

                        <View style={[styles.inputWrapper, { flexDirection: 'column' }]}>
                            <Text style={[styles.label, { width: '100%' }]}>Address:</Text>
                            <TextInput
                                style={[styles.input, { width: '100%', height: hp('10%'), textAlignVertical: 'top', paddingTop: hp('1%') }]}
                                onChangeText={setAddress}
                                value={address}
                                placeholder="Enter address"
                                multiline={true}
                            />
                        </View>
                    </View>

                    <TouchableOpacity 
                        style={styles.continueButton} 
                        onPress={() => navigation.navigate(ScreensName.ELoanMicroFS2)}
                    >
                        <Text style={styles.continueButtonText}>Continue</Text>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: hp('1.8%'),
        width: wp('44%'),
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
        width: wp('44%'),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        borderRadius: hp('1%'),
        justifyContent: 'center',
        overflow: 'hidden',
    },
    picker: {
        height: hp('6%'),
        width: wp('44%'),
        color: colors.BLACK,
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

export default MicroF;