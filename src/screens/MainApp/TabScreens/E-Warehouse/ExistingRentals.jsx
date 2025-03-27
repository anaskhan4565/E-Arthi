import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import Navbar from '../../Navbar/Navbar';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp';
import ItemStatusBox from './CustomStylesComp/ItemStatusBox';
import CustomDropdown from '../E-LoanNew/CustomComp/Dropdown.jsx';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';
import ScreensName from '../../../../../util/Constants/ScreensName';

const rentalData = [
    {
        id: 1,
        date: '09-02-2025',
        type: 'Silo',
        entity: 'Wheat',
        amount: '1000 KG',
        status: 'Active',
        color: '#7AAC50',
        time: '9:00 AM',
        warehouse: 'Silo'
    },
    {
        id: 2,
        date: '09-02-2025',
        type: 'Temp Controlled',
        entity: '5000 Rupees',
        amount: '1000 KG',
        status: 'Active',
        color: '#D85D5D',
        time: '9:00 AM',
        warehouse: 'Silo'
    },
    {
        id: 3,
        date: '09-02-2025',
        type: 'Cold Storage',
        entity: '5000 Rupees',
        amount: '1000 KG',
        status: 'Active',
        color: '#78A2AD',
        time: '9:00 AM',
        warehouse: 'Cold Storage'
    },
    {
        id: 4,
        date: '09-02-2025',
        type: 'Dry Beds',
        entity: '5000 Rupees',
        amount: '1000 KG',
        status: 'Active',
        color: '#A3A3A3',
        time: '9:00 AM',
        warehouse: 'Dry Beds'
    },
    {
        id: 5,
        date: '09-02-2025',
        type: 'Silo',
        entity: '5000 Rupees',
        amount: '1000 KG',
        status: 'Active',
        color: '#7AAC50',
        time: '9:00 AM',
        warehouse: 'Silo'
    },
    // Add more rental data as needed
];

const categories = [
    "All Categories",
    "Silo",
    "Cold Storage",
    "Dry Storage"
];

const warehouse = [
    "All Warehouse",
    "Silo",
    "Cold Storage",
    "Dry Beds"
];

const ExistingRentals = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedWarehouse, setSelectedWarehouse] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>

            <View style={styles.searchBarContainer}>
                <CustomSearchApp placeholder="Search in here" />
            </View>

            <Text style={styles.mainTitle}>Existing Rentals</Text>

            <View style={styles.container2}>
                <CustomDropdown
                    label="categories"
                    options={categories}
                    selectedValue={selectedCategory}
                    onSelect={setSelectedCategory}
                />
                <CustomDropdown
                    label="warehouse"
                    options={warehouse}
                    selectedValue={selectedWarehouse}
                    onSelect={setSelectedWarehouse}
                />
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.rowContainer}>
                    {rentalData.map((rental, index) => (
                        <View key={index} style={styles.columnItem}>
                            <ItemStatusBox
                                onPress={() => {
                                    navigation.navigate(ScreensName.RentalDetails, {
                                        rentalId: rental.id,
                                        date: rental.date,
                                        type: rental.type,
                                        entity: rental.entity,
                                        amount: rental.amount,
                                        status: rental.status,
                                        time: rental.time,
                                        warehouse: rental.warehouse,
                                        color: rental.color
                                    });
                                }}
                                bodyData={[
                                    { label: "Rented Date", data: rental.date },
                                    { label: "Entity", data: rental.entity },
                                    { label: "Amount", data: rental.amount },
                                ]}
                                name={"Rental " + rental.id}
                                status={rental.type}
                                bgGiven={rental.color}
                                statusTrueText={rental.type}
                                statusFalseText={rental.type}
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
});

export default ExistingRentals; 