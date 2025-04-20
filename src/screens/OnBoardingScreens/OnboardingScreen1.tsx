import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FarmerSvg from '../../assets/MainApp/OnBoarding/Farmer.svg';
import ScreensName from '../../../util/Constants/ScreensName';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomSearchApp from '../MainApp/CustomComponent/CustomSearchApp';
import Navbar from '../MainApp/Navbar/Navbar';
import colors from '../../../util/Constants/colors';
import { fonts } from '../../../util/Constants/FontName';

const OnboardingScreen1 = () => {
    const navigation = useNavigation();

    const handleStart = () => {
        navigation.navigate(ScreensName.OnboardingScreen2);
    };

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={false} />

            </View>
            <View style={styles.contentContainer}>
                <View style={styles.imageContainer}>
                    <FarmerSvg width={wp(90)} height={hp(30)} />
                </View>

                <View style={styles.separator} />

                <Text style={styles.title}>Farmer!</Text>
                <Text style={styles.description}>
                    Welcome to E-Agri, where the future of farming meets convenience—solutions for every need, all in one app.
                </Text>
            </View>


            <TouchableOpacity style={styles.button} onPress={handleStart}>
                <Text style={styles.buttonText}>Let's start</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
        paddingHorizontal: wp(5),
     
    },
    navbarContainer: {
        height: hp("8.2%"),
        backgroundColor: "white",
        marginTop: hp("0.2%"),
        width:'100%',
    },
    searchContainer: {
        marginTop: hp(2),
    },
    contentContainer: {
        backgroundColor: colors.LIGHT_GREEN,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(5),
        
    },

    menuContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuIcon: {
        width: 24,
        height: 24,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 20,
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: 8,
        padding: 10,
        height: 220,
    },

    title: {
        fontSize: hp(3),
        fontFamily: fonts.Bold,
        color: colors.BLACK,
        textAlign: 'center',
        marginBottom: 10,
        marginTop: hp(1),
    },
    description: {
        fontSize: hp(2),
        fontFamily: fonts.Regular,
        color: colors.DARK_GRAY,
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 10,
        lineHeight: 22,
    },
    button: {
        backgroundColor: colors.GREEN,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: hp(5),
    },
    buttonText: {
        color: colors.WHITE,
        fontSize: hp(2),
        fontFamily: fonts.SemiBold,
    },
});

export default OnboardingScreen1; 