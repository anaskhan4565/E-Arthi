import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import Navbar from '../../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../../CustomComponent/CustomSearchApp.jsx';
import colors from '../../../../../../util/Constants/colors.js';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { fonts } from '../../../../../../util/Constants/FontName.js';
import { useNavigation } from '@react-navigation/native';
import ScreensName from '../../../../../../util/Constants/ScreensName.ts';

const bankData = [
    {
        id: 1,
        name: "Habib Bank",
        image: require('../../../../../assets/ELoanNew/TakeLoan/BanksImgs/HBL.png')
    },
    {
        id: 2,
        name: "Bank of Punjab",
        image: require('../../../../../assets/ELoanNew/TakeLoan/BanksImgs/BOP.png')
    },
    {
        id: 3,
        name: "Zarai Tarakiyati Bank",
        image: require('../../../../../assets/ELoanNew/TakeLoan/BanksImgs/ZTBL.png')
    },
    {
        id: 4,
        name: "Meezan Bank",
        image: require('../../../../../assets/ELoanNew/TakeLoan/BanksImgs/Meezan.png')
    },
    {
        id: 5,
        name: "Askari Bank",
        image: require('../../../../../assets/ELoanNew/TakeLoan/BanksImgs/AskariBank.png')
    }
];


const specialPrograms = [
    {
        id: 1,
        title: 'Women Loan\nProgram',
        icon: require('../../../../../assets/ELoanNew/TakeLoan/1.png')
    },
    {
        id: 2,
        title: 'Madadgar',
        screen: ScreensName.ELoanMadadgar,
        icon: require('../../../../../assets/ELoanNew/TakeLoan/2.png')
    },
    {
        id: 3,
        title: 'Minority Loan\nProgram',
        icon: require('../../../../../assets/ELoanNew/TakeLoan/3.png')
    }
];

const NewLoan = () => {
    const [isSelected, setSelection] = useState(false);
    const { t } = useTranslation();
    const navigation = useNavigation();


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.searchBarContainer}>
                    <CustomSearchApp placeholder="Search in here" />
                </View>

                <Text style={styles.mainTitle}>New Loan</Text>

                <View style={styles.contentContainer}>
                    <Text style={styles.subTitle}>Choose the bank to take loan from:</Text>

                    <View style={styles.banksGrid}>
                        {bankData.map((bank, index) => (
                            <TouchableOpacity key={index} style={styles.bankItem} onPress={() => navigation.navigate(ScreensName.ELoanRequestNewLoan)}>
                                <View style={styles.bankLogoContainer}>
                                    <Image
                                        source={bank.image}
                                        style={styles.bankLogo}
                                        resizeMode="contain"
                                    />
                                </View>
                                <Text style={styles.bankName}>{bank.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>


                    <View style={styles.checkboxContainer}>
                        <BouncyCheckbox
                            size={hp(3)}
                            fillColor={colors.GREEN}
                            iconStyle={{ borderColor: colors.LIGHT_GRAY }}
                            style={styles.checkbox}
                            textComponent={true}
                            innerIconStyle={{ borderRadius: 5 }}
                        />
                        <Text style={styles.checkboxLabel}>Apply to all banks</Text>
                    </View>

                    <Text style={styles.specialProgramsTitle}>Special Programs</Text>

                    <View style={styles.specialProgramsContainer}>
                        {specialPrograms.map((program, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.programItem}
                                onPress={() => navigation.navigate(program.screen)}
                            >
                                <Image
                                    source={program.icon}
                                    style={styles.programIcon}
                                    resizeMode="contain"
                                />
                                <Text style={styles.programTitle}>{program.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollView: {
        flex: 1,
    },
    searchBarContainer: {
        marginTop: hp('2%'),
        marginHorizontal: wp('2%'),
        height: hp('6%'),
    },
    mainTitle: {
        fontSize: hp('3%'),
        fontWeight: '600',
        marginTop: hp('2%'),
        marginLeft: wp('4%'),
        marginBottom: hp('2%'),
        fontFamily: fonts.SemiBold
    },
    navbarContainer: {
        height: hp('8.5%'),
        backgroundColor: colors.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GRAY,
    },
    contentContainer: {
        paddingHorizontal: wp('4%'),
    },
    subTitle: {
        fontSize: hp('2%'),
        marginBottom: hp('2%'),
        fontFamily: fonts.Medium,
        color: '#000000',
    },
    banksGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: hp('3%'),
        marginHorizontal: wp('2%'),
    },
    bankItem: {
        width: wp('28%'),
        alignItems: 'center',
        marginBottom: hp('2%'),
        marginHorizontal: wp('0.5%'),
    },
    bankLogoContainer: {
        width: wp('24%'),
        height: hp('6%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
        marginBottom: hp('1%'),
    },
    bankLogo: {
        width: '100%',
        height: '100%',
        marginBottom: hp('1%'),
    },
    bankName: {
        fontSize: hp('1.5%'),
        color: '#000000',
        textAlign: 'center',
        fontFamily: fonts.SemiBold
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('3%'),
    },
    checkbox: {
        transform: [{ scale: 0.8 }],
    },
    checkboxLabel: {
        marginLeft: wp('2%'),
        fontSize: hp('1.8%'),
        color: '#000000',
        fontFamily: fonts.Medium
    },
    specialProgramsTitle: {
        fontSize: hp('2.5%'),
        fontWeight: '500',
        fontFamily: fonts.Medium,
        textAlign: 'center',
        marginBottom: hp('2%'),
    },
    specialProgramsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp('3%'),
        backgroundColor: colors.LIGHT_GREEN,
        padding: hp('3%'),
    },
    programItem: {
        width: wp('28%'),
        alignItems: 'center',
    },
    programIcon: {
        width: wp('20%'),
        height: wp('16%'),
        marginBottom: hp('1%'),
    },
    programTitle: {
        fontSize: hp('1.8%'),
        textAlign: 'center',
        color: '#000000',
        fontFamily: fonts.Medium
    }
});

export default NewLoan;