import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import Navbar from '../../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../../CustomComponent/CustomSearchApp.jsx';
import colors from '../../../../../../util/Constants/colors.js';
import { fonts } from '../../../../../../util/Constants/FontName.js';
import { useNavigation } from '@react-navigation/native';
import ScreensName from '../../../../../../util/Constants/ScreensName.ts';

const userInfo = {
    name: 'ABC',
    cnic: '42201-12345-7',
    contact: '+92 123456789',
    email: 'abc@gmail.com',
    city: 'Karachi'
};


const MadadgarHome = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.searchBarContainer}>
                    <CustomSearchApp placeholder="Search in here" />
                </View>

                <Text style={styles.mainTitle}>Request For Madadgar Grant</Text>

                <View style={styles.contentContainer}>
                    {/* User Info Section */}
                    <View style={styles.infoSection}>
                        <Text style={styles.infoText}>Name: {userInfo.name}</Text>
                        <Text style={styles.infoText}>CNIC: {userInfo.cnic}</Text>
                        <Text style={styles.infoText}>Contact Number: {userInfo.contact}</Text>
                        <Text style={styles.infoText}>Email: {userInfo.email}</Text>
                        <Text style={styles.infoText}>City: {userInfo.city}</Text>
                    </View>

                    <Text style={styles.subTitle}>Enter the following details:</Text>

                    {/* Form Section */}
                    <View style={styles.formContainer}>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Entity Name:</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder="Enter entity name"
                                placeholderTextColor={colors.GRAY}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Yearly Crop Revenue:</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder="Enter yearly crop revenue"
                                placeholderTextColor={colors.GRAY}
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Yearly Yield:</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder="Enter yearly yield"
                                placeholderTextColor={colors.GRAY}
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Monthly Net Income:</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder="Enter monthly income"
                                placeholderTextColor={colors.GRAY}
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Loan Type:</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder="Select loan type"
                                placeholderTextColor={colors.GRAY}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Title:</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder="Select title"
                                placeholderTextColor={colors.GRAY}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Loan Amount:</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder="Enter loan amount"
                                placeholderTextColor={colors.GRAY}
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Desired Loan Repayment Period:</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder="Select duration"
                                placeholderTextColor={colors.GRAY}
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate(ScreensName.ELoanMadadgarS2)}>
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

export default MadadgarHome;