import React, { useState, useEffect } from 'react';

import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    Keyboard,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import Navbar from '../../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../../CustomComponent/CustomSearchApp.jsx';
import colors from '../../../../../../util/Constants/colors.js';
import { fonts } from '../../../../../../util/Constants/FontName.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import ScreensName from '../../../../../../util/Constants/ScreensName.ts';
import { storage } from '../../../../../screens/InitialStartScreens/SignIn.jsx';
import Routes from '../../../../../../util/Constants/Routes';
import { Picker } from '@react-native-picker/picker';

const ELoanRequestNewLoan = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const route = useRoute();
    const { bankName } = route.params || {};

    const [isLoading, setIsLoading] = useState(false);
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
        entity_name: '',
        yearly_crop_revenue: '',
        yearly_yield: '',
        monthly_net_income: '',
        loan_type: '',
        title: '',
        loan_amount: '',
        desired_loan_period: ''
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

    const validateForm = () => {
        const requiredFields = [
            'entity_name',
            'yearly_crop_revenue',
            'yearly_yield',
            'monthly_net_income',
            'loan_type',
            'title',
            'loan_amount',
            'desired_loan_period'
        ];

        for (const field of requiredFields) {
            // if (!formData[field]) {
            //     setError(`Please fill in ${field.replace(/_/g, ' ')}`);
            //     return false;
            // }
        }
        setError('');
        return true;
    };

    const submitLoanApplication = async () => {
        try {
            if (!validateForm()) {
                return;
            }

            const token = storage.getString('token');
            const userId = storage.getString('userId');
            console.log(token);

            if (!token) {
                setError(t('You must be logged in to submit a loan application'));
                return;
            }

            if (!userId) {
                setError(t('User ID not found. Please login again.'));
                return;
            }

            setIsLoading(true);
            setError('');

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            };

            const numericFields = ['yearly_crop_revenue', 'yearly_yield', 'monthly_net_income', 'loan_amount', 'desired_loan_period'];
            const processedFormData = { ...formData };

            numericFields.forEach(field => {
                if (processedFormData[field]) {
                    processedFormData[field] = parseFloat(processedFormData[field]);
                }
            });

            // Ensure desired_loan_period is set from repaymentPeriod state
            processedFormData.desired_loan_period = repaymentPeriod ? parseInt(repaymentPeriod) : null;
            // Set title from the title state
            processedFormData.title = title;

            const loanData = {
                user: userId,
                bank_name: bankName,
                name: userInfo.name,
                cnic: userInfo.cnic,
                contact: userInfo.phone_number,
                email: userInfo.email,
                city: userInfo.city,
                ...processedFormData
            };

            const response = await fetch(Routes.e_loan_request, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(loanData)
            });

            const result = await response.json();
            console.log(result);
            if (response.ok) {
                navigation.navigate(ScreensName.ELoanRequest2);
            } else {
                setError(result.message || t(`Failed to submit loan application: ${response.status}`));
            }
        } catch (error) {
            console.log('Error submitting loan application:', error);
            setError(t('An error occurred while submitting your loan application'));
        } finally {
            setIsLoading(false);
        }
    };
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

                <Text style={styles.mainTitle}>{t("Request a New Loan from")} {bankName}</Text>

                <View style={styles.contentContainer}>
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

                    <View style={styles.formContainer}>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>{t("Entity Name")}:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={t("Enter entity name")}
                                placeholderTextColor={colors.GRAY}
                                value={formData.entity_name}
                                onChangeText={(text) => handleInputChange('entity_name', text)}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>{t("Yearly Crop Revenue")}:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={t("Enter yearly crop revenue")}
                                placeholderTextColor={colors.GRAY}
                                keyboardType="numeric"
                                value={formData.yearly_crop_revenue}
                                onChangeText={(text) => handleInputChange('yearly_crop_revenue', text)}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>{t("Yearly Yield")}:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={t("Enter yearly yield")}
                                placeholderTextColor={colors.GRAY}
                                keyboardType="numeric"
                                value={formData.yearly_yield}
                                onChangeText={(text) => handleInputChange('yearly_yield', text)}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>{t("Monthly Net Income")}:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={t("Enter monthly income")}
                                placeholderTextColor={colors.GRAY}
                                keyboardType="numeric"
                                value={formData.monthly_net_income}
                                onChangeText={(text) => handleInputChange('monthly_net_income', text)}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>{t("Loan Type")}:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={formData.loan_type}
                                    onValueChange={(value) => handleInputChange('loan_type', value)}
                                    style={styles.picker}
                                    mode="dropdown"
                                    itemStyle={styles.pickerItem}
                                >
                                    <Picker.Item label={t("Select loan type")} value="" style={styles.pickerItem} />
                                    <Picker.Item label={t("Personal")} value="Personal" style={styles.pickerItem} />
                                    <Picker.Item label={t("Agriculture")} value="Agriculture" style={styles.pickerItem} />
                                    <Picker.Item label={t("Mortgage")} value="Mortgage" style={styles.pickerItem} />
                                    <Picker.Item label={t("Business")} value="Business" style={styles.pickerItem} />
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
                                value={formData.loan_amount}
                                onChangeText={(text) => handleInputChange('loan_amount', text)}
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

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <TouchableOpacity
                        style={[styles.continueButton, isLoading && styles.disabledButton]}
                        onPress={submitLoanApplication}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color={colors.WHITE} />
                        ) : (
                            <Text style={styles.continueButtonText}>{t("Submit Application")}</Text>
                        )}
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
        fontSize: hp('1.6%'),
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
    errorText: {
        color: colors.RED,
        fontSize: hp('1.8%'),
        fontFamily: fonts.Regular,
        marginBottom: hp('2%'),
        textAlign: 'center',
    },
    disabledButton: {
        opacity: 0.7,
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

export default ELoanRequestNewLoan;