import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import colors from '../../../../../util/colors.js';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../../../../util/FontName.js';
import AddBox from '../../../MainApp/CustomComponent/InventoryComponents/AddBox.jsx'
import Image3 from '../../../../assets/MainApp/E-Inventory/E-Inventory-Monitoring/image.png'
import InventoryProduct from '../../CustomComponent/InventoryComponents/InventoryProduct.jsx';

import ScreensName from '../../../../../util/ScreensName.ts';

const InventoryMonitoring = () => {
    const { t } = useTranslation()

    return (
        <View style={{ flex: 1, backgroundColor: colors.WHITE }}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>

            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingTop: hp('8%') }}>
                <View style={styles.contentContainer}>
                    <View style={styles.searchContainer}>
                        <CustomSearchApp placeholder={t('Search in here')} />
                    </View>

                    <View style={styles.bodyContainer}>
                        <AddBox SourceGiven={Image3} w={wp('45%')} h={hp('8%')} name={'New Inventory'} navigateName={ScreensName.EInventoryAddNew}/>
                        <AddBox SourceGiven={Image3} w={wp('45%')} h={hp('8%')} name={'New Group'} navigateName={ScreensName.EInventoryAddNewGroup}/>
                        <AddBox SourceGiven={Image3} w={wp('45%')} h={hp('8%')} name={'Inventory Reminder'} navigateName={ScreensName.EInventoryReminder}/>

                        <AddBox SourceGiven={Image3} w={wp('45%')} h={hp('8%')} name={'Manage Inventory'}  navigateName={ScreensName.EInventoryManageGroup}/>
                    </View>

                    {/* Section for Recommended Products */}
                    <View style={styles.recommendedProducts}>
                        <Text style={styles.recommendedTitle}>{t('Inventory')}</Text>
                        <View style={styles.productRow}>
                            <InventoryProduct name={'Product ABC'} price={1280} />
                            <InventoryProduct name={'Product ABC'} price={1000} />
                            <InventoryProduct name={'Product ABC'} price={1500} />
                            <InventoryProduct name={'Product ABC'} price={1400} />
                            <InventoryProduct name={'Product ABC'} price={1400} />
                            <InventoryProduct name={'Product ABC'} price={1400} />

                        </View>

                    </View>
                </View>
            </ScrollView >
        </View >
    );
};

export default InventoryMonitoring;

const styles = StyleSheet.create({
   
    navbarContainer: {
        height: hp('8.5%'),
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },

    searchContainer: {
        marginVertical: hp('3%'),
        height: hp('7%'),
    },
    contentContainer: {
        flex: 1,
        //marginTop: 10,
    },

    bodyContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    titleContainer: {
        padding: hp('1%'),
    },
    titleText: {
        fontFamily: fonts.SemiBold,
        fontSize: hp('3%'),
    },
    scrollContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingVertical: hp('3%'),
    },
    itemBoxWrapper: {
        width: wp('30%'),
        marginBottom: hp('2%'),
        alignItems: 'center',
    },
    recommendedProducts: {
        marginTop: hp('2%'),
        marginLeft: wp(2)
    },
    recommendedTitle: {
        fontSize: hp('3%'),
        fontFamily: fonts.SemiBold,
        marginBottom: hp('2%'),
    },
    productRow: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: hp('3%'),
    },
});
