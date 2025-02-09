import React from 'react';
import type { PropsWithChildren } from 'react';
import ECategories from '../../../../../util/E-Categories.js';
import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../util/colors.js';
import EWarehouseCrops from '../../../../../util/E-WarehouseCrops.js';
import EInventoryBoxes from '../../CustomComponent/EInventoryBoxes.jsx'


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
import Categorybox from '../../CustomComponent/Categorybox';
import EWarehouseMainStack from './E-WarehouseMainStack.tsx';



function CropSelect(): React.JSX.Element {
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
                <View style={styles.bodyContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{t('Select a Crop')}</Text>
                </View>
                    <View style={styles.scrollContainer}>
                        {EWarehouseCrops.map((Crop, index) => (
                            Crop.title.trim() !== '' && (
                                <View style={styles.itemBoxWrapper} key={index}>
                                    <Categorybox name={Crop.title} SourceGiven={Crop.img} isNavigation={true} screenName={ScreensName.EWarehouseNewSpaceWarehouseSelect} navigationName={ScreensName.EWarehouseMainStack}/>
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
        backgroundColor: colors.WHITE,

    },
    navbarContainer: {
        height: hp('8.5%'),
        backgroundColor: colors.WHITE,
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
        fontWeight: 'bold',
        fontSize: 25,
    },
    scrollContainer: {
        flexDirection: 'row', // Align items in a row
        flexWrap: 'wrap', // Allow wrapping to the next row
        justifyContent: 'center', // Center items horizontally
        paddingVertical: hp('2%'),

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
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

});



export default CropSelect;
