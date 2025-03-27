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
import axios from 'axios';
import { PLANTIX_API_KEY } from '@env';

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
        if (!selectedImage) {
            navigation.navigate(ScreensName.Diagnosis, { imageUri: selectedImage });
        }
    };

    const analyzePlantImage = async () => {
        const apiKey = PLANTIX_API_KEY
     
        const testImagePath = Image.resolveAssetSource(require('./AssetsPlantDr/Diagnosis/wheat.png')).uri;

        const formData = new FormData();

        formData.append('image', {
            uri: testImagePath,
            type: 'image/png',
            name: 'plant_image.png'
        });
        formData.append('application_used_image_gallery', 'false');

        formData.append('crop', 'wheat');

        formData.append('application_id', 'YourAppName');
        formData.append('application_end_user_id', 'TestUser001');

        try {
            console.log('Sending API request...');

            console.log('FormData entries:');
            for (const pair of formData._parts) {
                console.log(pair[0] + ': ' + JSON.stringify(pair[1]));
            }

            const response = await fetch('https://api.plantix.net/v2/image_analysis', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Accept-Language': 'en'
                },
                body: formData
            });

            const responseText = await response.text();
            console.log('Response status:', response.status);
            console.log('Response text:', responseText);

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}: ${responseText}`);
            }

            const responseData = JSON.parse(responseText);
            console.log('Crop health:', responseData.crop_health);
            console.log('Detected crops:', responseData.crops);

            if (responseData.predicted_diagnoses && responseData.predicted_diagnoses.length > 0) {
                console.log('Diagnosis:', responseData.predicted_diagnoses[0].common_name);
                console.log('Likelihood:', responseData.predicted_diagnoses[0].diagnosis_likelihood);
            }

            return responseData;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
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
                        onPress={analyzePlantImage}
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
                    disabled={selectedImage}
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