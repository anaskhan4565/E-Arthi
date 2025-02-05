import React from 'react';

import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../util/colors.js';
import ItemBox from '../../CustomComponent/ItemBox.jsx';
import { ETransportTruckdet } from '../../../../../util/E-Transport.js';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../../../../util/FontName.js';
import ScreensName from '../../../../../util/ScreensName.ts';
import CustomButton from '../../../../components/CustomButton.jsx';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import TransportTypeBox from '../../CustomComponent/TransportTypeBox.jsx';

function ETransportTruck(): React.JSX.Element {
    const { t } = useTranslation();

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <ScrollView style={styles.container}>

                <View style={styles.searchContainer}>
                    <CustomSearchApp placeholder={t('Search in here')} />
                </View>
                <Text style={styles.titleText}>{t('Select Vehicle Type')}</Text>
                <View style={styles.bodyContainer}>

                    <View style={styles.scrollContainer}>
                        {ETransportTruckdet.map((data, index) => (
                            data.title.trim() !== '' && (
                                <View style={styles.itemBoxWrapper} key={index}>
                                    <TransportTypeBox w={wp(40)} h={hp(12)} name={t(data.title)} SourceGiven={require('../../../../../src/assets/MainApp/E-Transport/Truck.png')} isNavigation={true} screen={ScreensName.ETransportAddDetails} />
                                </View>
                            )
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: colors.WHITE,

    },
    navbarContainer: {
        height: hp('8.2%'),
        backgroundColor: 'white',
        marginTop: hp('0.14%'),
    },
    searchContainer: {
        marginVertical: hp('3.2%'),
        height: hp('7%'),
    },
    bodyContainer: {
        alignItems: 'center',

    },
    titleContainer: {
        padding: 10,
    },
    titleText: {
        fontSize: hp('2.3%'),
        marginLeft: wp(5),
        fontFamily: fonts.SemiBold,
    },
    scrollContainer: {
        flexWrap: 'wrap',
        //justifyContent: 'center',
        paddingVertical: hp('2%'),
        alignItems: 'center',
        height:hp('50')

    },
    itemBoxWrapper: {
        width: '30%',
        marginBottom: hp('2%'),
        marginHorizontal: wp('-1%'),
        marginVertical:hp('1'),
        alignItems: 'center',

    },
    recommendedProducts: {
        marginTop: 20,
    },
    recommendedTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

});

export default ETransportTruck;
