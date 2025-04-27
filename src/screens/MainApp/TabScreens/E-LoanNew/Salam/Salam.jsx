import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import Navbar from '../../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../../CustomComponent/CustomSearchApp.jsx';
import colors from '../../../../../../util/Constants/colors.js';
import { fonts } from '../../../../../../util/Constants/FontName.js';
import { useNavigation } from '@react-navigation/native';
import ScreensName from '../../../../../../util/Constants/ScreensName.ts';
import { storage } from '../../../../../screens/InitialStartScreens/SignIn.jsx';
import Routes from '../../../../../../util/Constants/Routes';

const Salam = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    
    const [isUserDataLoading, setIsUserDataLoading] = useState(true);
    const [error, setError] = useState('');
    const [userInfo, setUserInfo] = useState({
        id: null,
        name: '',
        username: '',
        email: '',
        phone_number: '',
        cnic: '42101-467672-3', // Default CNIC as requested
        city: 'Karachi' // Default city
    });

    const [formData, setFormData] = useState({
        crop_name: '',
        crop_quantity: '',
        crop_year: '',
        monthly_income: '',
        loan_amount: '',
        monthly_yield: ''
    });

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        try {
            setIsUserDataLoading(true);
            const token = storage.getString('token');

            if (!token) {
                setError(t('You must be logged in to view this page'));
                setIsUserDataLoading(false);
                return;
            }

            const headers = {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            };

            const response = await fetch(Routes.UserInfo, {
                method: 'GET',
                headers: headers
            });

            const result = await response.json();
            console.log(result);

            if (response.ok) {
                const userData = result.data;
                setUserInfo({
                    id: userData.id,
                    name: `${userData.first_name} ${userData.last_name}`,
                    username: userData.username,
                    email: userData.email,
                    phone_number: userData.phone_number,
                    cnic: '42101-467672-3', // Default CNIC as requested
                    city: t('Karachi') // Default city
                });
            } else {
                setError(result.message || t('Failed to fetch user information'));
            }
        } catch (error) {
            console.log('Error fetching user info:', error);
            setError(t('An error occurred while fetching user information'));
        } finally {
            setIsUserDataLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.searchBarContainer}>
                    <CustomSearchApp placeholder="Search in here" />
                </View>

                <Text style={styles.mainTitle}>{t("Apply for Salam Loan")}</Text>

                <View style={styles.contentContainer}>
                    {/* User Info Section */}
                    {isUserDataLoading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color={colors.GREEN} />
                            <Text style={styles.loadingText}>{t("Loading user information...")}</Text>
                        </View>
                    ) : (
                        <View style={styles.infoSection}>
                            <Text style={styles.infoText}>{t("Name")}: {userInfo.name}</Text>
                            <Text style={styles.infoText}>{t("CNIC")}: {userInfo.cnic}</Text>
                            <Text style={styles.infoText}>{t("Contact Number")}: {userInfo.phone_number}</Text>
                            <Text style={styles.infoText}>{t("Email")}: {userInfo.email}</Text>
                            <Text style={styles.infoText}>{t("City")}: {userInfo.city}</Text>
                        </View>
                    )}

                    <Text style={styles.subTitle}>{t("Enter the following details:")}</Text>

                    {/* Form Section */}
                    <View style={styles.formContainer}>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>{t("Crop Name")}:</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder={t("Enter crop name")}
                                placeholderTextColor={colors.GRAY}
                                value={formData.crop_name}
                                onChangeText={(text) => handleInputChange('crop_name', text)}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>{t("Crop Quantity (in kg)")}:</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder={t("Enter crop quantity")}
                                placeholderTextColor={colors.GRAY}
                                keyboardType="numeric"
                                value={formData.crop_quantity}
                                onChangeText={(text) => handleInputChange('crop_quantity', text)}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>{t("Crop Year")}:</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder={t("Enter crop year")}
                                placeholderTextColor={colors.GRAY}
                                keyboardType="numeric"
                                value={formData.crop_year}
                                onChangeText={(text) => handleInputChange('crop_year', text)}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>{t("Monthly Net Income (in PKR)")}:</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder={t("Enter monthly net income")}
                                placeholderTextColor={colors.GRAY}
                                keyboardType="numeric"
                                value={formData.monthly_income}
                                onChangeText={(text) => handleInputChange('monthly_income', text)}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>{t("Loan Amount (in PKR)")}:</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder={t("Enter loan amount")}
                                placeholderTextColor={colors.GRAY}
                                keyboardType="numeric"
                                value={formData.loan_amount}
                                onChangeText={(text) => handleInputChange('loan_amount', text)}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>{t("Monthly Yield (in kg)")}:</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder={t("Enter monthly yield")}
                                placeholderTextColor={colors.GRAY}
                                keyboardType="numeric"
                                value={formData.monthly_yield}
                                onChangeText={(text) => handleInputChange('monthly_yield', text)}
                            />
                        </View>
                    </View>

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate(ScreensName.ELoanSalamS2)}>
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
    errorText: {
        color: colors.RED,
        fontSize: hp('1.8%'),
        fontFamily: fonts.Regular,
        marginBottom: hp('2%'),
        textAlign: 'center',
    },
    loadingContainer: {
        padding: hp('2%'),
        borderRadius: hp('1%'),
        marginBottom: hp('3%'),
        alignItems: 'center',
        justifyContent: 'center',
        height: hp('10%'),
        backgroundColor: colors.LIGHT_GREEN,
    },
    loadingText: {
        marginTop: hp('1%'),
        fontSize: hp('1.8%'),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
});

export default Salam;