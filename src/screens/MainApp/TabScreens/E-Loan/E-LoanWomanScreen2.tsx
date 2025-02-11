import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Dimensions, Image, Alert, TouchableOpacity } from 'react-native';
import colors from '../../../../../util/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomButton from '../../../../components/CustomButton';
import ScreensName from '../../../../../util/ScreensName';
import { fonts } from '../../../../../util/FontName';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';
import WomanFarmer from '../../../../../src/assets/MainApp/E-Loan/womanfarmer.svg';
import Navbar from '../../Navbar/Navbar';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp';

const { height, width } = Dimensions.get("window");

const ELoanWoanScreen2 = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <View style={styles.searchContainer}>
                <CustomSearchApp placeholder={t("Search in here")} />
            </View>
            <View style={styles.Header}>
                <Text style={styles.Heading}>{t('Woman Special Loan Program')}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.imageWrapper}>
                    <WomanFarmer style={styles.image} />
                </View>
                <View style={styles.maintextcontainer}>
                    <Text style={styles.maintext}>
                        Pakistan’s farming sector consists of 68% of women. We aim to provide assistance to them for an enhanced experience.
                    </Text>
                </View>


                <CustomButton
                    MainText={t('Continue')}
                    BgGiven={colors.GREEN}
                    txColor={colors.WHITE}
                    isNavigation={true}
                    name={ScreensName.ELoanNewBank}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    navbarContainer: {
        height: hp("8.5%"),
        backgroundColor: colors.WHITE,
    },
    searchContainer: {
        marginTop: hp("3.2%"),
        height: hp("7%"),
        marginLeft: hp(1),
        alignSelf: "center",
    },
    Header: {
        marginTop: hp(2),
        justifyContent: 'flex-start',
        marginLeft: wp('4.5%'),

    },
    Heading: {
        fontSize: hp(2.3),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
    },
    image: {
        width: wp(100),
        height: hp(50),
        resizeMode: 'contain',
        marginBottom: hp(3),
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: hp('5%'),
    },
    buttonSpacing: {
        height: hp('2%'),
    },
    maintextcontainer: {
        width: wp(80),
        alignSelf: 'center',
        marginBottom: hp(3),

    },
    maintext: {
        fontFamily: fonts.Regular,
        fontSize: hp(2),
        textAlign: 'center',
    },
});


export default ELoanWoanScreen2;