import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';

import Navbar from '../../Navbar/Navbar';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';

const RentalDetails = ({ route }) => {
    const { t } = useTranslation();
    const {
        rentalId,
        date,
        type,
        entity,
        amount,
        status,
        time,
        warehouse,
        color
    } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>

            <View style={styles.searchBarContainer}>
                <CustomSearchApp placeholder="Search in here" />
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Rental {rentalId}</Text>
                    <View style={[styles.badge, { backgroundColor: color }]}>
                        <Text style={styles.badgeText}>{type}</Text>
                    </View>
                </View>

                <View style={styles.detailsContainer}>
                    <DetailItem label="Rented Date" value={date} />
                    <DetailItem label="Time" value={time} />
                    <DetailItem label="Type" value={type} />
                    <DetailItem label="Warehouse" value={warehouse} />
                    <DetailItem label="Entity" value={entity} />
                    <DetailItem label="Amount Reserved" value={amount} />
                </View>
            </View>
        </SafeAreaView>
    );
};

const DetailItem = ({ label, value }) => (
    <View style={styles.detailItem}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);

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
    contentContainer: {
        padding: wp('4%'),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('3%'),
    },
    title: {
        fontSize: hp('2.8%'),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
    },
    badge: {
        marginLeft: hp(0.5),
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: hp(0.7),
        paddingVertical: hp(0.8),
        paddingHorizontal: wp(4),
    },
    badgeText: {
        color: colors.WHITE,
        fontSize: hp('1.6%'),
        fontFamily: fonts.Medium,
    },
    detailsContainer: {
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: hp('2%'),
        padding: wp('4%'),
    },
    detailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('2%'),
    },
    label: {
        fontSize: hp('2%'),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
    },
    value: {
        fontSize: hp('2%'),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
});

export default RentalDetails; 