import React, { useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import colors from "../../../../../util/Constants/colors.js";
import Navbar from "../../Navbar/Navbar.jsx";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/Constants/FontName.js";
import captureButton from './AssetsPlantDr/HealCrop/button.png';
import galleryButton from './AssetsPlantDr/HealCrop/gallery.png';
import ScreensName from "../../../../../util/Constants/ScreensName.ts";

const HealCropImageCapture = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState(null);

    const handleCameraLaunch = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            includeBase64: false,
            saveToPhotos: false,
        };

        launchCamera(options)
            .then(response => {
                if (response.didCancel) {
                    console.log('User cancelled camera');
                    return;
                }

                if (response.errorCode) {
                    console.error('ImagePicker Error:', response.errorMessage);
                    Alert.alert('Error', 'Failed to capture image. Please try again.');
                    return;
                }

                if (response.assets && response.assets[0]?.uri) {
                    setSelectedImage(response.assets[0].uri);
                }
            })
            .catch(error => {
                console.error('Camera launch failed:', error);
                Alert.alert('Error', 'Failed to launch camera. Please try again.');
            });
    };

    const handleGalleryLaunch = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            includeBase64: false,
        };

        launchImageLibrary(options)
            .then(response => {
                if (response.didCancel) {
                    console.log('User cancelled gallery picker');
                    return;
                }

                if (response.errorCode) {
                    console.error('ImagePicker Error:', response.errorMessage);
                    Alert.alert('Error', 'Failed to pick image. Please try again.');
                    return;
                }

                if (response.assets && response.assets[0]?.uri) {
                    setSelectedImage(response.assets[0].uri);
                }
            })
            .catch(error => {
                console.error('Gallery launch failed:', error);
                Alert.alert('Error', 'Failed to open gallery. Please try again.');
            });
    };

    const handleProceed = () => {
        //just remove !
        if (!selectedImage) {
            navigation.navigate(ScreensName.Diagnosis, { imageUri: selectedImage });
        }
    };

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

                <View style={styles.imagePreviewContainer}>
                    {selectedImage ? (
                        <Image
                            source={{ uri: selectedImage }}
                            style={styles.previewImage}
                            resizeMode="contain"
                        />
                    ) : (
                        <View style={styles.placeholderContainer}>
                            <Text style={styles.placeholderText}>
                                Take a photo or select from gallery
                            </Text>
                        </View>
                    )}
                </View>

                <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={handleGalleryLaunch}
                    >
                        <Image
                            source={galleryButton}
                            style={styles.buttonIcon}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={handleCameraLaunch}
                    >
                        <Image
                            source={captureButton}
                            style={styles.buttonIcon}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[
                        styles.proceedButton,
                        !selectedImage && styles.proceedButtonDisabled
                    ]}
                    onPress={handleProceed}
                    disabled={selectedImage}    //just add !
                >
                    <Text style={styles.proceedButtonText}>Proceed</Text>
                </TouchableOpacity>
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
        backgroundColor: colors.WHITE,
        marginTop: hp("0.14%"),
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        padding: wp('4%'),
    },
    titleContainer: {
        width: wp('90%'),
        marginBottom: hp('2%'),
    },
    title: {
        fontSize: hp('2.8%'),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp('1%'),
    },
    subtitle: {
        fontSize: hp('1.8%'),
        fontFamily: fonts.Regular,
        color: colors.GRAY,
    },
    imagePreviewContainer: {
        width: wp('90%'),
        height: hp('45%'),
        backgroundColor: colors.LIGHT_GRAY,
        borderRadius: wp('4%'),
        overflow: 'hidden',
        marginBottom: hp('3%'),
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    placeholderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('4%'),
    },
    placeholderText: {
        fontSize: hp('1.8%'),
        fontFamily: fonts.Regular,
        color: colors.GRAY,
        textAlign: 'center',
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('90%'),
        marginBottom: hp('3%'),
        gap: wp('10%'),
    },
    iconButton: {
        width: wp('15%'),
        height: wp('15%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonIcon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    proceedButton: {
        width: wp('90%'),
        height: hp('6%'),
        backgroundColor: colors.COMPLETE_GREEN,
        borderRadius: wp('2%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('2%'),
    },
    proceedButtonDisabled: {
        backgroundColor: colors.GRAY,
        opacity: 0.5,
    },
    proceedButtonText: {
        fontSize: hp('2%'),
        fontFamily: fonts.SemiBold,
        color: colors.WHITE,
    },
});

export default HealCropImageCapture;