import React from 'react';

import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../util/colors.js';
import EInventoryBoxes from '../../CustomComponent/EInventoryBoxes.jsx'
import { ETransportMaindet } from '../../../../../util/E-Transport.js';

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

function ETransportMain(): React.JSX.Element {
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

                    <View style={styles.scrollContainer}>
                        {ETransportMaindet.map((Category, index) => (
                            Category.title.trim() !== '' && (
                                <View style={styles.itemBoxWrapper} key={index}>
                                    <EInventoryBoxes name={t(Category.title)} screenName={Category.screen} navigationName={t(ScreensName.ETransportStack)} SourceGiven={Category.img} isNavigation={1} w={wp('80%')} h={hp('18%')} />
                                </View>
                            )
                        ))}
                    </View>
                    <CustomButton MainText={t('Add New Transport')} BgGiven={colors.GREEN} txColor={colors.WHITE} isNavigation={1} name={ScreensName.ETransportNewTransport} />
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
        fontWeight: 'bold',
        fontSize: 25,
    },
    scrollContainer: {
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingVertical: hp('2%'),
        // backgroundColor: 'red',
        alignItems: 'center',

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

export default ETransportMain;
