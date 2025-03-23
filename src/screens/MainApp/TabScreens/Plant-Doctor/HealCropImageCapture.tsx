import React, { useState, useEffect, useRef } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
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
    const devices = useCameraDevices();
    const device = devices.back;
    const cameraRef = useRef(null);

    const [hasPermission, setHasPermission] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const status = await Camera.requestCameraPermission();
                setHasPermission(status === 'authorized');
            } catch (error) {
                console.error("Error requesting camera permission:", error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePhoto();
                console.log("Photo taken:", photo);
                navigation.navigate(ScreensName.Diagnosis, { imageUri: photo.path });
            } catch (error) {
                console.error("Error taking photo:", error);
            }
        }
    };

    if (isLoading) return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>
            <View style={[styles.contentContainer, styles.centerContent]}>
                <Text style={styles.loadingText}>Loading camera...</Text>
            </View>
        </SafeAreaView>
    );

    if (!device || !hasPermission) return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>
            <View style={[styles.contentContainer, styles.centerContent]}>
                <Text style={styles.errorText}>
                    {!hasPermission ? "Camera permission denied. Please enable camera access in settings." : "Camera not available on this device."}
                </Text>
            </View>
        </SafeAreaView>
    );

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
                    {hasPermission ? (
                        <Camera
                            ref={cameraRef}
                            style={styles.camera}
                            device={device}
                            isActive={true}
                            photo={true}
                        />
                    ) : (
                        <Text>No Camera Permission</Text>
                    )}
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.galleryButton}>
                        <Image style={styles.galleryButtonImage} source={galleryButton} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
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
        resizeMode: 'contain',
    },
    captureButtonImage: {
        width: wp('15%'),
        height: wp('15%'),
        resizeMode: 'contain',
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
        justifyContent: 'space-between',
        alignItems: 'center',
        width: wp('60%'),
    },
    galleryButton: {
        width: wp('15%'),
        height: wp('15%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButton: {
        width: wp('15%'),
        height: wp('15%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: hp('2%'),
        fontFamily: fonts.Regular,
        textAlign: 'center',
    },
    errorText: {
        fontSize: hp('2%'),
        fontFamily: fonts.Regular,
        textAlign: 'center',
        color: colors.RED,
        padding: wp('5%'),
    },
});

export default HealCropImageCapture;
