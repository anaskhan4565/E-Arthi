import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
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
const loanData = [
    {
        id: 1,
        date: '09-02-2024',
        bank: 'Askari Bank',
        amount: '5,000',
        status: 'Completed',
        location: 'AgriFarm',
        time: '9:00 AM'
    },
    {
        id: 2,
        date: '09-02-2024',
        bank: 'Habib Bank',
        amount: '10,000',
        status: 'Completed',
        location: 'AgriFarm',
        time: '6:00 PM'
    },
    {
        id: 3,
        date: '09-02-2024',
        bank: 'Askari Bank',
        amount: '44,700',
        status: 'Completed',
        location: 'AgriFarm',
        time: '4:00 PM'
    },
    {
        id: 4,
        date: '09-02-2024',
        bank: 'Askari Bank',
        amount: '9,800',
        status: 'Completed',
        location: 'AgriFarm',
        time: '9:00 AM'
    },
    {
        id: 5,
        date: '09-02-2024',
        bank: 'Askari Bank',
        amount: '54,000',
        status: 'Completed',
        location: 'AgriFarm',
        time: '11:00 AM'
    },
];
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
    
    const StatusButton = ({ status }) => (
        <TouchableOpacity
            style={[
                styles.statusButton,
                { backgroundColor: status === 'Completed' ? colors.GREEN : colors.BLUE }
            ]}
        >
            <Text style={styles.statusText}>{status}</Text>
        </TouchableOpacity>
    );
   
    
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBank, setSelectedBank] = useState('');
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>

            <View style={styles.searchBarContainer}>
                <CustomSearchApp placeholder="Search in here" />
            </View>

            <Text style={styles.mainTitle}>Loan History</Text>
            {/* Updated dropdown container */}
            
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
                <View style={styles.rowContainer}>
                    {loanData.map((loan, index) => (
                        <View key={index} style={styles.columnItem}>
                            <ItemStatusBox
                                onPress={() => { navigation.navigate(ScreensName.ELoanEach, { loanId: loan.id, status: loan.status, bank: loan.bank, amount: loan.amount, date: loan.date, location: loan.location, time: loan.time }) }}
                                bodyData={[
                                    { label: "Date", data: loan.date },
                                    { label: "Bank", data: loan.bank },
                                    { label: "Amount", data: loan.amount },
                                ]}
                                name={"Loan: " + loan.id}
                                status={loan.status}
                                statusTrueText={loan.status}
                                statusFalseText={loan.status}
                            />
                        </View>
                    ))}
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
        width: wp('45%'), // Adjust this value to control item width
        marginBottom: hp('2%'),
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