import React from 'react';
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
import colors from '../../../../../../util/Constants/colors.js';
import { fonts } from '../../../../../../util/Constants/FontName.js';
import Navbar from '../../../Navbar/Navbar.jsx';
import { useNavigation } from '@react-navigation/native';
import ScreensName from '../../../../../../util/Constants/ScreensName.ts';

const SalamSuccess = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.contentContainer}>
                    <Image 
                        source={require('./Success.png')} 
                        style={styles.successImage} 
                        resizeMode="contain"
                    />
                    
                    <Text style={styles.title}>{t("Application Submitted!")}</Text>
                    
                    <Text style={styles.message}>
                        {t("Your Salam loan application has been successfully submitted. We will review your application and get back to you shortly.")}
                    </Text>
                    
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoLabel}>{t("Application ID:")}</Text>
                        <Text style={styles.infoValue}>SLM-2023-78945</Text>
                    </View>
                    
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoLabel}>{t("Date Submitted:")}</Text>
                        <Text style={styles.infoValue}>{new Date().toLocaleDateString()}</Text>
                    </View>
                    
                    <TouchableOpacity
                        style={styles.homeButton}
                        onPress={() => navigation.navigate(ScreensName.ELoanNew)}
                    >
                        <Text style={styles.homeButtonText}>{t("Back to Home")}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    navbarContainer: {
        height: hp('8.5%'),
        backgroundColor: colors.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GRAY,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: wp('5%'),
        alignItems: 'center',
        paddingVertical: hp('3%'),
    },
    successImage: {
        height: hp('20%'),
        width: wp('40%'),
        marginBottom: hp('3%'),
    },
    title: {
        fontSize: hp('3%'),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp('2%'),
        textAlign: 'center',
    },
    message: {
        fontSize: hp('2%'),
        fontFamily: fonts.Regular,
        color: colors.DARK_GRAY,
        marginBottom: hp('4%'),
        textAlign: 'center',
        lineHeight: hp('3%'),
    },
    infoContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingVertical: hp('1.5%'),
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GRAY,
    },
    infoLabel: {
        width: '40%',
        fontSize: hp('1.8%'),
        fontFamily: fonts.Medium,
        color: colors.DARK_GRAY,
    },
    infoValue: {
        width: '60%',
        fontSize: hp('1.8%'),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
    },
    homeButton: {
        backgroundColor: colors.GREEN,
        paddingVertical: hp('2%'),
        width: '100%',
        borderRadius: wp('2%'),
        alignItems: 'center',
        marginTop: hp('5%'),
    },
    homeButtonText: {
        color: colors.WHITE,
        fontSize: hp('2%'),
        fontFamily: fonts.Medium,
    },
});

export default SalamSuccess; 