import React from 'react';
import type { PropsWithChildren } from 'react';
import ECategories from '../../../../../util/E-Categories.js';
import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../util/colors.js';
import { EloanDet } from '../../../../../util/E-Loan.js';
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



function EInventory(): React.JSX.Element {
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
                <View style={{ marginHorizontal: hp(1) }} >
                    <Text style={{ fontSize: hp(3.5), fontFamily: fonts.SemiBold, marginLeft: hp(2), letterSpacing: hp(0.6) }}>{t('E-Loan')}</Text>
                </View>
                <View style={styles.bodyContainer}>

                    <View style={styles.scrollContainer}>
                        {EloanDet.map(
                            (Category, index) =>
                                Category.title.trim() !== "" && (
                                    <View style={styles.itemBoxWrapper} key={index}>
                                        <EInventoryBoxes
                                            name={t(Category.title)}
                                            screenName={Category.screen}
                                            navigationName={Category.screen}
                                            SourceGiven={Category.img}
                                            SecondaryText={Category.SecondaryTitle?Category.SecondaryTitle:null}
                                            isNavigation={1}
                                            w={wp("38%")}
                                            h={hp("16%")}
                                            img_size_h={hp(5)}
                                            img_size_w={hp(20)}
                                            font_Size={hp('2%')}
                                            isLightBold={false}
                                            fontcolor={colors.GREEN}
                                            amount={Category.amount}
                                        />
                                    </View>
                                )
                        )}
                    </View>
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
        marginTop: hp('3.2%'),
        height: hp('7%'),
        marginLeft: hp(1),
        alignSelf: 'flex-start'

    },
    bodyContainer: {
        marginHorizontal: hp(4),

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
        justifyContent: "space-between",
        paddingVertical: hp("2%"),
        alignSelf: "center",
        flexDirection: 'row',
        alignItems: "center",
        // backgroundColor: 'red',
        width: wp(90),
      },
      itemBoxWrapper: {
        // width: "30%",
        marginBottom: hp("2%"),
        marginHorizontal: wp("0"),
        alignItems: "center",
        flexDirection: "row",
    
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



export default EInventory;
