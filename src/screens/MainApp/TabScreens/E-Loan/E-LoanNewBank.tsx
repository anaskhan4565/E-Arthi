import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import ECategories from '../../../../../util/E-Categories.js';
import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../util/colors.js';
import { EInventoryDet } from '../../../../../util/E-Inventory.js';
import EInventoryBoxes from '../../CustomComponent/EInventoryBoxes.jsx'
import { ELoanBank } from '../../../../../util/E-Loan.js';


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
import SwitchButtonCustom from './NewLoanComponents/SwitchButton.jsx';
import GenericSelection from './NewLoanComponents/GenericComp/GenericSelection.jsx';
import CustomInputAndText from './NewLoanComponents/CustomInputAndText.jsx';
import MainNewLoan from './NewLoanMainScreen/MainNewLoan.jsx';



function ELoanNewBank(): React.JSX.Element {
    const { t } = useTranslation();
    const [selectedOption, setSelectedOption] = useState("Generic");

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <ScrollView style={styles.container}>

                <View style={styles.searchContainer}>
                    <CustomSearchApp placeholder={t('Search in here')} />
                </View>
                <View style={{ marginHorizontal: hp(2.5) }} >
                    <Text style={{ fontSize: hp(2.5), fontFamily: fonts.SemiBold, letterSpacing: hp(0.1),marginLeft:hp(1) }}>{t('Request A New Loan')}</Text>
                </View>
                <View style={[styles.bodyContainer]}>
                    <SwitchButtonCustom selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                    {
                        selectedOption !== "Generic" ? <GenericSelection />
                            :
                        <MainNewLoan />
                    }
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
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



export default ELoanNewBank;
