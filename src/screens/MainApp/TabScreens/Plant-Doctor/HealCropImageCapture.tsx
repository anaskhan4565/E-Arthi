import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import { RNCamera } from "react-native-camera";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/Constants/colors.js";
import Navbar from "../../Navbar/Navbar.jsx";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/Constants/FontName.js";
import captureButton from './AssetsPlantDr/HealCrop/button.png';
import galleryButton from './AssetsPlantDr/HealCrop/gallery.png';
import ScreensName from "../../../../../util/Constants/ScreensName.ts";
import { useNavigation } from "@react-navigation/native";
const HealCropImageCapture = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                <Text style={styles.title}>Heal Your Crop</Text>
                <Text style={styles.subtitle}>Fit the damaged crop within the frame:</Text>
                </View>
                <View style={styles.cameraContainer}>
                    <RNCamera
                        style={styles.camera}
                        type={RNCamera.Constants.Type.back}
                        captureAudio={false}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.galleryButton}>
                        <Image style={styles.galleryButtonImage} source={galleryButton} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.captureButton} onPress={() => navigation.navigate(ScreensName.Diagnosis)}>
                        <Image source={captureButton} style={styles.captureButtonImage} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    navbarContainer: {
        height: hp("8.2%"),
        backgroundColor: "white",
        marginTop: hp("0.14%"),
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        padding: wp('4%'),
    },
    titleContainer: {
        width: wp('80%'),
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    galleryButtonImage: {
        width: wp('15%'),
        height: wp('15%'),
        justifyContent: 'center',
        resizeMode: 'contain',

    },
    
    captureButtonImage: {
        width: wp('15%'),
        height: wp('15%'),
        resizeMode: 'contain',
        justifyContent: 'center',
    },
    title: {
        fontSize: hp('2.5%'),
        fontFamily: fonts.SemiBold,
        marginVertical: hp('1%'),
    },
    subtitle: {
        fontSize: hp('1.7%'),
        fontFamily: fonts.Regular,
        marginBottom: hp('2%'),
    },
    cameraContainer: {
        width: wp('80%'),
        height: hp('40%'),
        backgroundColor: colors.LIGHT_GRAY,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp('2%'),
    },
    camera: {
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: hp(10),
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: wp('10%'),
    },
    galleryButton: {
        width: wp('15%'),
        height: wp('15%'),
        borderRadius: wp('7.5%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButton: {
        width: wp('15%'),
        height: wp('15%'),
        
        borderRadius: wp('7.5%'),
        // backgroundColor: colors.GREEN,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: hp('2.5%'),
        color: colors.WHITE,
    },
});

export default HealCropImageCapture;