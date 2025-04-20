import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import Navbar from '../../../Navbar/Navbar';
import CustomSearchApp from '../../../CustomComponent/CustomSearchApp';
import colors from '../../../../../../util/Constants/colors';
import { fonts } from '../../../../../../util/Constants/FontName';
import ItemStatusBox from '../../E-Warehouse/CustomStylesComp/ItemStatusBox';
import CustomDropdown from '../CustomComp/Dropdown.jsx';
import { useNavigation } from '@react-navigation/native';
import ScreensName from '../../../../../../util/Constants/ScreensName.ts';
import Routes from '../../../../../../util/Constants/Routes';
import axios from 'axios';
import { storage } from '../../../../../screens/InitialStartScreens/SignIn.jsx';


const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'pending':
            return '#FFA412';
        case 'approved':
            return '#52DC18';
        case 'rejected':
            return '#F62919CC';
        case 'under review':
            return '#1B7ED4';
        case 'document req':
            return '#FFA412';
        case 'completed':
            return '#52DC18';
        default:
            return '#1B7ED4';
    }
};

const categories = [
    "All Categories",
    "Personal Loan",
    "Business Loan",
    "Agriculture Loan"
];

const banks = [
    "All Banks",
    "Askari Bank",
    "Habib Bank",
    "Meezan Bank",
    "Bank of Punjab",
    "Zarai Tarakiyati Bank"
];
const ELoanHistory = () => {
    const { t } = useTranslation();
    const [loanData, setLoanData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const StatusButton = ({ status }) => (
        <TouchableOpacity
            style={[
                styles.statusButton,
                { backgroundColor: status === 'Completed' ? colors.GREEN : colors.BLUE }
            ]}
        >
            <Text style={styles.statusText}>{t(status)}</Text>
        </TouchableOpacity>
    );

    useEffect(() => {
        const fetchLoanData = async () => {
            try {
                // Get token from MMKV storage
                const token = storage.getString('token');

                if (!token) {
                    console.error('No token found in storage');
                    setError(t('Authentication error. Please login again.'));
                    setLoading(false);
                    return;
                }
                const userid = parseInt(storage.getString('userId'));

                console.log("User ID:", userid);
                const url = `https://eagri-backend.vercel.app/e_loan/get_loan/user/${userid}/`;
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });


                setLoanData(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching loan history:", err);
                setError(t("Failed to load loan history"));
                setLoading(false);
            }
        };

        fetchLoanData();
    }, []);

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBank, setSelectedBank] = useState('');
    const navigation = useNavigation();

    // Format date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); // DD-MM-YYYY format
    };

    // Format time for display
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    };

    // Format amount for display
    const formatAmount = (amount) => {
        return parseFloat(amount).toLocaleString();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>

            <View style={styles.searchBarContainer}>
                <CustomSearchApp placeholder="Search in here" />
            </View>

            <Text style={styles.mainTitle}>{t("Loan History")}</Text>

            <View style={styles.container2}>
                <CustomDropdown
                    label="categories"
                    options={categories}
                    selectedValue={selectedCategory}
                    onSelect={setSelectedCategory}
                />
                <CustomDropdown
                    label="banks"
                    options={banks}
                    selectedValue={selectedBank}
                    onSelect={setSelectedBank}
                />
            </View>

            <ScrollView style={styles.scrollView}>
                {loading ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color={colors.BLUE} />
                    </View>
                ) : error ? (
                    <Text style={styles.errorText}>{t(error)}</Text>
                ) : loanData.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>{t("No loan history found")}</Text>
                    </View>
                ) : (
                    <View style={styles.rowContainer}>
                        {loanData.map((loan, index) => {
                            const statusColor = getStatusColor(loan.status);
                            const createdDate = formatDate(loan.created_at);
                            const createdTime = formatTime(loan.created_at);

                            return (
                                <View key={index} style={styles.columnItem}>
                                    <ItemStatusBox
                                        onPress={() => {
                                            navigation.navigate(ScreensName.ELoanEach, {
                                                loanId: loan.id,
                                                status: loan.status,
                                                bank: loan.bank_name,
                                                amount: formatAmount(loan.loan_amount),
                                                date: createdDate,
                                                location: loan.city,
                                                time: createdTime,
                                                statusColor: statusColor,
                                                loanDetails: loan
                                            })
                                        }}
                                        bodyData={[
                                            { label: "Date", data: createdDate },
                                            { label: "Bank", data: loan.bank_name },
                                            { label: "Amount", data: formatAmount(loan.loan_amount) },
                                        ]}
                                        name={"Loan: " + loan.id}
                                        status={loan.status}
                                        bgGiven={statusColor}
                                        statusTrueText={loan.status}
                                        statusFalseText={loan.status}
                                    />
                                </View>
                            );
                        })}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    container2: {
        flexDirection: 'row',
        marginHorizontal: wp('4%'),
        marginBottom: hp('2%'),
        justifyContent: 'space-between',
    },
    navbarContainer: {
        height: hp('8.5%'),
        backgroundColor: colors.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GRAY,
    },
    searchBarContainer: {
        marginTop: hp('2%'),
        marginHorizontal: wp('4%'),
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
    filterContainer: {
        flexDirection: 'row',
        marginHorizontal: wp('4%'),
        marginBottom: hp('2%'),
    },
    filterButton: {
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1%'),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        borderRadius: hp('0.5%'),
        marginRight: wp('2%'),
    },
    filterText: {
        fontSize: hp('1.6%'),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: wp('5%'),
        marginTop: hp('2%'),
    },
    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    columnItem: {
        width: wp('45%'),
        marginBottom: hp('2%'),
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('10%'),
    },
    errorText: {
        textAlign: 'center',
        color: colors.RED,
        fontSize: hp('2%'),
        marginTop: hp('10%'),
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('10%'),
    },
    emptyText: {
        textAlign: 'center',
        color: colors.GRAY,
        fontSize: hp('2%'),
    },
    loanCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: hp('2%'),
        backgroundColor: colors.WHITE,
        borderRadius: hp('1%'),
        marginBottom: hp('2%'),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
    },
    loanInfo: {
        flex: 1,
    },
    loanDate: {
        fontSize: hp('1.6%'),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
        marginBottom: hp('0.5%'),
    },
    loanBank: {
        fontSize: hp('1.6%'),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
        marginBottom: hp('0.5%'),
    },
    loanAmount: {
        fontSize: hp('1.6%'),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
    statusButton: {
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1%'),
        borderRadius: hp('2%'),
    },
    statusText: {
        color: colors.WHITE,
        fontSize: hp('1.4%'),
        fontFamily: fonts.Medium,
    },
});

export default ELoanHistory;