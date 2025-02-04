import React, { useState } from 'react';
import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../util/colors.js';

import {
    SafeAreaView,
    ScrollView,
    TextInput,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,

} from 'react-native';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../../../../util/FontName.js';
import ScreensName from '../../../../../util/ScreensName';



function ETransportAddDetails(): React.JSX.Element {
    const { t } = useTranslation();
    const [selectedItem, setSelectedItem] = useState('');

    const items = ['Crop', 'Seeds', 'Medicines', 'Machinery', 'Fertilizers', 'Herbicide'];

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.navbarContainer}>
                <Navbar isbackSet={true} isBackTo={ScreensName.EInventorySupplier} />
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.searchContainer}>
                    <CustomSearchApp placeholder={t('Search in here')} />
                </View>

                <View style={styles.bodyContainer}>
                    <View style={styles.headerRow}>
                        <Text style={styles.headerText}>{t('Add New Transport')}</Text>
                    </View>
                    <View style={styles.selectercontainer}>{items.map((item) => (
                        <TouchableOpacity
                            key={item}
                            style={[
                                styles.itemBox,
                                selectedItem === item && styles.selectedBox,
                            ]}
                            onPress={() => setSelectedItem(item)}
                        >
                            <Text
                                style={[
                                    styles.itemText,
                                    selectedItem === item && styles.selectedText,
                                ]}
                            >
                                {t(item)}
                            </Text>
                        </TouchableOpacity>
                    ))}</View>
                    <View style={styles.locationdetailscontainer}>
                        <Text style={styles.locationdetailstext}>{t('Item Details')}</Text>
                    </View>

                    <View>

                    </View>
                    <View style={styles.detailsContainer}>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>{t('Weight')}</Text>
                            <TextInput
                                placeholder={t('Enter Here')}
                                style={[styles.value, {paddingHorizontal: wp(2)}]}
                            />
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>{t('Volume')}</Text>
                            <TextInput
                                placeholder={t('Enter Here')}
                                style={[styles.value, {paddingHorizontal: wp(2)}]}
                            />
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>{t('No of items')}</Text>
                            <TextInput
                                placeholder={t('Enter Here')}
                                 style={[styles.value, {paddingHorizontal: wp(2)}]}
                            />
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>{t('Amount')}</Text>
                            <TextInput
                                placeholder={t('Enter Here')}
                                 style={[styles.value, {paddingHorizontal: wp(2)}]}
                            />
                        </View>
                    </View>
                    <View style={styles.locationdetailscontainer}>
                        <Text style={styles.locationdetailstext}>{t('Location Details')}</Text>
                    </View>
                    <View style={styles.detailsContainer}>

                        <View style={styles.detailRow}>
                            <Text style={styles.label}>{t('City')}</Text>
                            <TextInput
                                placeholder={t('Enter Here')}
                                 style={[styles.value, {paddingHorizontal: wp(2)}]}
                            />
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>{t('Area')}</Text>
                            <TextInput
                                placeholder={t('Enter Here')}
                                  style={[styles.value, {paddingHorizontal: wp(2)}]}
                            />
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>{t('Pickup')}</Text>
                            <TextInput
                                placeholder={t('Enter Here')}
                                  style={[styles.value, {paddingHorizontal: wp(2)}]}
                            />
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>{t('DropOff')}</Text>
                            <TextInput
                                placeholder={t('Enter Here')}
                                  style={[styles.value, {paddingHorizontal: wp(2)}]}
                            />
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
        marginBottom: hp(4),
    },
    selectercontainer: {
        width: wp(100),
        height: hp(15),
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'center',
        marginTop: hp(1),

    },
    headerRow: {
        flex: 0.5,
        marginTop: hp(-3),
        flexDirection: 'row',
        marginLeft: wp(5),
        width: wp(100),
    },
    headerTextWrapper: {
        flex: 0.7,
        marginLeft: wp(6),
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: hp(3),
    },
    reorderButtonWrapper: {
        flex: 0.3,
        marginRight: wp(1.5),
    },
    reorderButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: colors.GREEN,
        width: wp("23%"),
        height: hp("3%"),
        backgroundColor: colors.GREEN,
        borderWidth: 1,
    },
    reorderButtonText: {
        color: colors.WHITE,
        fontSize: hp('1.6%'),
        textAlign: 'center',
    },
    detailsContainer: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(1),
    },
    detailRow: {
        flexDirection: 'row',
        marginTop: hp(2),
        flex: 1,
        alignItems: 'center',
    },
    label: {
        width: wp(35),
        marginLeft: wp(6),
        fontSize: hp(1.75),
    },
    value: {
        width: wp(60),
        fontSize: hp(1.5),
        fontFamily: fonts.Regular,
        marginRight: wp(5),
        height: hp(5),
        borderWidth: 1,
        borderRadius: 4,
        borderLeftColor: '#D3D3D3',
    },
    locationdetailscontainer: {
        marginTop: hp(2),
        justifyContent: 'flex-start',
        width: wp(100),
        marginLeft: wp(6),
    },
    locationdetailstext: {
        color: colors.GREEN,
        fontSize: hp(2),
        fontWeight: 'bold',
        fontFamily: fonts.SemiBold,


    },
    itemBox: {
        width: wp(30),
        height: hp(5),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: 8,
        marginVertical: hp(0.5),
        marginHorizontal: wp(1),
    },
    selectedBox: {
        borderColor: colors.GREEN,
    },
    itemText: {
        color: '#000',
        fontSize: hp(2),
    },
    selectedText: {
        color: colors.GREEN,
        fontWeight: 'bold',
    },

});

export default ETransportAddDetails;
