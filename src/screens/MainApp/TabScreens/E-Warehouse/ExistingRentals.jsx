import React, { useState, useEffect } from 'react';
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
            date: '14-03-2025',
            type: 'Silo',
            entity: 'Corn',
            amount: '1750 KG',
            status: 'Active',
            color: '#7AAC50',
            time: '8:30 AM',
            warehouse: 'Silo',
            distance: '12 KM'
        },
        {
            id: 2,
            date: '21-04-2025',
            type: 'Temp Controlled',
            entity: 'Vegetable Seeds',
            amount: '620 KG',
            status: 'Active',
            color: '#D85D5D',
            time: '10:15 AM',
            warehouse: 'Temp Controlled',
            distance: '2 KM'
        },
        {
            id: 3,
            date: '07-03-2025',
            type: 'Cold Storage',
            entity: 'Apples',
            amount: '1150 KG',
            status: 'Active',
            color: '#78A2AD',
            time: '11:00 AM',
            warehouse: 'Cold Storage',
            distance: '12 KM'
        },
        {
            id: 4,
            date: '16-1-2025',
            type: 'Dry Beds',
            entity: 'Coffee Beans',
            amount: '980 KG',
            status: 'Active',
            color: '#A3A3A3',
            time: '7:45 AM',
            warehouse: 'Dry Beds',
            distance: '12 KM'
        },
        {
            id: 5,
            date: '25-01-2025',
            type: 'Silo',
            entity: 'Wheat',
            amount: '2100 KG',
            status: 'Active',
            color: '#7AAC50',
            time: '9:50 AM',
            warehouse: 'Silo',
            distance: '21 KM'
        },
        {
            id: 6,
            date: '02-04-2025',
            type: 'Cold Storage',
            entity: 'Potatoes',
            amount: '1600 KG',
            status: 'Active',
            color: '#78A2AD',
            time: '6:30 AM',
            warehouse: 'Cold Storage',
            distance: '20 KM'
        },
        {
            id: 7,
            date: '18-02-2025',
            type: 'Temp Controlled',
            entity: 'Honey',
            amount: '540 KG',
            status: 'Active',
            color: '#D85D5D',
            time: '1:20 PM',
            warehouse: 'Temp Controlled',
            distance: '7 KM'
        },
        {
            id: 8,
            date: '25-04-2025',
            type: 'Dry Beds',
            entity: 'Dried Chilies',
            amount: '1350 KG',
            status: 'Active',
            color: '#A3A3A3',
            time: '4:00 PM',
            warehouse: 'Dry Beds',
            distance: '5 KM'
        },
        {
            id: 9,
            date: '26-04-2025',
            type: 'Silo',
            entity: 'Basmati Rice',
            amount: '200 KG',
            status: 'Active',
            color: '#7AAC50',
            time: '4:00 PM',
            warehouse: 'Silo',
            distance: '24 KM' 
        }
    
    
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
    "Temp Controlled",
    "Dry Beds"
];

const ExistingRentals = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedWarehouse, setSelectedWarehouse] = useState('All Warehouse');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRentals, setFilteredRentals] = useState(rentalData);

    // Filter rentals based on warehouse selection and search query
    useEffect(() => {
        let filtered = rentalData;
        
        // Filter by warehouse type
        if (selectedWarehouse && selectedWarehouse !== 'All Warehouse') {
            filtered = filtered.filter(rental => rental.warehouse === selectedWarehouse);
        }
        
        // Filter by search query (if provided)
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(rental => 
                rental.entity.toLowerCase().includes(query) || 
                rental.type.toLowerCase().includes(query) ||
                rental.warehouse.toLowerCase().includes(query)
            );
        }
        
        setFilteredRentals(filtered);
    }, [selectedWarehouse, searchQuery]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>

            <View style={styles.searchBarContainer}>
                <CustomSearchApp 
                    placeholder="Search by name" 
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                />
            </View>

            <Text style={styles.mainTitle}>Existing Rentals</Text>

            <View style={styles.container2}>
                <CustomDropdown
                    label="warehouse"
                    options={warehouse}
                    selectedValue={selectedWarehouse}
                    onSelect={setSelectedWarehouse}
                />
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.rowContainer}>
                    {filteredRentals.length > 0 ? (
                        filteredRentals.map((rental, index) => (
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
                                            color: rental.color,
                                            distance: rental.distance
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
                        ))
                    ) : (
                        <View style={styles.noResultsContainer}>
                            <Text style={styles.noResultsText}>No rentals found</Text>
                        </View>
                    )}
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
    noResultsContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: hp('10%'),
    },
    noResultsText: {
        fontFamily: fonts.Medium,
        fontSize: hp('2%'),
        color: colors.GRAY_DARK,
    },
});

export default ExistingRentals; 