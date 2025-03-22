import React from 'react';
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

const warehouseData = [
    {
        id: 1,
        date: '09-02-2024',
        entity: 'Wheat',
        amount: 5000,
        status: 'Silo'
    },
    {
        id: 2,
        date: '09-02-2024',
        bank: 'Grain',
        amount: 5000,
        status: 'Temp Controlled'
    },
    {
        id: 3,
        date: '09-02-2024',
        bank: 'Rice',
        amount: 5000,
        status: 'Cold Storage'
    },
    {
        id: 4,
        date: '09-02-2024',
        bank: 'Sugar Cane',
        amount: 5000,
        status: 'Dry Beds'
    },
    {
        id: 5,
        date: '09-02-2024',
        bank: 'Wheat',
        amount: 5000,
        status: 'Silo'
    },
];

const ELoanHistory = () => {
    const { t } = useTranslation();

    const StatusButton = ({ status }) => (
        <TouchableOpacity
            style={[
                styles.statusButton,
                { backgroundColor: status === 'Silo' ? colors.SILO_GREEN : status === 'Temp Controlled' ? colors.TEMP_RED : status === 'Cold Storage' ? colors.COLD_STORAGE_BLUE : status === 'Dry Beds' ? colors.DRY_BEDS_GRAY : colors.GREEN }
            ]}
        >
            <Text style={styles.statusText}>{status}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>

            <View style={styles.searchBarContainer}>
                <CustomSearchApp placeholder="Search in here" />
            </View>

            <Text style={styles.mainTitle}>Loan History</Text>

            <View style={styles.filterContainer}>
                <TouchableOpacity style={styles.filterButton}>
                    <Text style={styles.filterText}>Categories</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterButton}>
                    <Text style={styles.filterText}>Banks</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.rowContainer}>
                    {warehouseData.map((loan, index) => (
                        <View key={index} style={styles.columnItem}>
                            <ItemStatusBox
                                onPress={() => {navigate('ELoanDetails')}}
                                bodyData={[
                                    { label: "Date", data: loan.date },
                                    { label: "Entity", data: loan.bank },
                                    { label: "Amount", data: loan.amount },
                                ]}
                                name={"Rental " + loan.id}
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