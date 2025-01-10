import React from 'react';
import type { PropsWithChildren } from 'react';
import ECategories from '../../../../util/E-Categories';
import Navbar from '../Navbar/Navbar.jsx';
import CustomSearchApp from '../CustomComponent/CustomSearchApp.jsx';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../util/colors.js';
import Categorybox from '../CustomComponent/Categorybox.jsx';
import ProductBox from '../CustomComponent/ProductBox.jsx';

import Image1 from '../../../assets/MainApp/EmarketPlace/Products/prod1.png';
import Image2 from '../../../assets/MainApp/EmarketPlace/Products/prod2.png';
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
import { fonts } from '../../../../util/FontName.js';



function EInventory(): React.JSX.Element {
    const {t}=useTranslation();

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <ScrollView style={styles.container}>

                <View style={styles.searchContainer}>
                    <CustomSearchApp placeholder={t('Search in here')} />
                </View>
                <View style={styles.bodyContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{t('E-Arthi Categories')}</Text>
                    </View>

                    <View style={styles.scrollContainer}>
                        {ECategories.map((Category, index) => (
                            Category.title.trim() !== '' && (
                                <View style={styles.itemBoxWrapper} key={index}>
                                    <Categorybox name={t(Category.title)} SourceGiven={Category.img} isNavigation={0} />
                                </View>
                            )
                        ))}
                    </View>

                    <View style={styles.recommendedProducts}>
                        <Text style={styles.recommendedTitle}>{t('Recommended Products')}</Text>
                        <View style={styles.productRow}>
                            <ProductBox name={"Agri-Protex"} price={"2050"} save={"1000"} SourceGiven={Image1} old={"3060"} isNavigation={0} />
                            <ProductBox name={"Agri-Protex"} price={"2050"} save={"1000"} SourceGiven={Image2} old={"3060"} isNavigation={0} />
                        </View>
                        <View style={styles.productRow}>
                            <ProductBox name={"Agri-Protex"} price={"2050"} save={"1000"} SourceGiven={Image1} old={"3060"} isNavigation={0} />
                            <ProductBox name={"Agri-Protex"} price={"2050"} save={"1000"} SourceGiven={Image2} old={"3060"} isNavigation={0} />
                        </View>
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
        flex: 1,
        margin: 20,

    },
    titleContainer: {
        padding: 10,
    },
    titleText: {
        fontFamily:fonts.SemiBold,
        fontSize: 25,
    },
    scrollContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: 'space-between',
        paddingVertical: hp('2%'),
        // backgroundColor: 'red',
        width: wp('95'),

    },
    itemBoxWrapper: {
        width: '30%',
        marginBottom: hp('2%'),
        marginHorizontal: wp('-3%'),
        alignItems: 'center',

    },
    recommendedProducts: {
        marginTop: 20,
    },
    recommendedTitle: {
        fontSize: 18,
        fontFamily:fonts.SemiBold,
        marginBottom: 10,
    },
    productRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

});

export default EInventory;
