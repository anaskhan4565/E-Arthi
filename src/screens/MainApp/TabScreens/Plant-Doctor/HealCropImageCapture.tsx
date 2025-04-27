import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Platform,
    Linking,
    PermissionsAndroid,
    BackHandler,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { 
    launchCamera, 
    launchImageLibrary, 
    CameraOptions, 
    ImageLibraryOptions, 
    MediaType 
} from 'react-native-image-picker';
import colors from "../../../../../util/Constants/colors.js";
import Navbar from "../../Navbar/Navbar.jsx";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/Constants/FontName.js";
// @ts-ignore
import captureButton from './AssetsPlantDr/HealCrop/button.png';
// @ts-ignore
import galleryButton from './AssetsPlantDr/HealCrop/gallery.png';
import ScreensName from "../../../../../util/Constants/ScreensName.ts";
import { MMKV } from "react-native-mmkv";
// @ts-ignore - Add this to suppress the env module error
import { PLANTIX_API_KEY } from '@env';

const HealCropImageCapture = () => {
    const { t, i18n } = useTranslation();
    const navigation = useNavigation<any>();
    const PlantDiagnosisData = new MMKV();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
    const [analysisError, setAnalysisError] = useState<string | null>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

    useEffect(() => {
        checkCameraPermission();
    }, []);

    const checkCameraPermission = async () => {
        try {
            if (Platform.OS === 'android') {
                const result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
                setHasCameraPermission(result);
            }
        } catch (err) {
            console.warn('Error checking camera permission:', err);
            setHasCameraPermission(false);
        }
    };

    const requestCameraPermission = async () => {
        try {
            if (Platform.OS === 'android') {
                // Try requesting through the Android permissions API first
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'EArthi needs camera access to diagnose plant health',
                        buttonPositive: 'Allow Camera',
                        buttonNegative: 'Cancel',
                    }
                );

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setHasCameraPermission(true);
                    handleCameraLaunch();
                } else {
                    // If permission is denied, try a different approach
                    Alert.alert(
                        'Camera Access Required',
                        'EArthi needs camera access to work properly. Please enable camera access in your device settings.',
                        [
                            {
                                text: 'Cancel',
                                style: 'cancel',
                                onPress: () => {
                                    // Optionally handle cancel
                                }
                            },
                            {
                                text: 'Enable Camera',
                                onPress: async () => {
                                    try {
                                        // Try to open app settings directly
                                        await Linking.openSettings();
                                        
                                        // When user comes back to app, check permission again
                                        const backHandler = BackHandler.addEventListener(
                                            'hardwareBackPress',
                                            () => {
                                                checkCameraPermission();
                                                backHandler.remove();
                                                return false;
                                            }
                                        );

                                        // Also check permission when app comes to foreground
                                        const timeout = setTimeout(() => {
                                            checkCameraPermission();
                                        }, 1000);

                                        return () => {
                                            clearTimeout(timeout);
                                            backHandler.remove();
                                        };
                                    } catch (error) {
                                        console.error('Failed to open settings:', error);
                                        Alert.alert(
                                            'Manual Setup Required',
                                            'Please follow these steps:\n\n' +
                                            '1. Open your phone Settings\n' +
                                            '2. Tap on Apps & notifications\n' +
                                            '3. Find and tap on EArthi\n' +
                                            '4. Tap on Permissions\n' +
                                            '5. Enable Camera permission'
                                        );
                                    }
                                }
                            }
                        ]
                    );
                }
            } else {
                // For iOS, try direct camera launch
                handleCameraLaunch();
            }
        } catch (err) {
            console.warn('Error requesting camera permission:', err);
            Alert.alert(
                'Permission Error',
                'Unable to request camera permission. Please enable camera access manually in your device settings.'
            );
        }
    };

    const handleCameraLaunch = () => {
        if (!hasCameraPermission && Platform.OS === 'android') {
            requestCameraPermission();
            return;
        }

        const options: CameraOptions = {
            mediaType: 'photo' as MediaType,
            quality: 1,
            includeBase64: false,
            saveToPhotos: false,
        };

        launchCamera(options)
            .then(response => {
                if (response.didCancel) {
                    return;
                }

                if (response.errorCode) {
                    if (response.errorCode === 'camera_unavailable') {
                        Alert.alert('Error', 'Camera is not available on this device');
                    } else if (response.errorCode === 'permission') {
                        setHasCameraPermission(false);
                        requestCameraPermission();
                    } else if (response.errorCode === 'others') {
                        Alert.alert('Error', response.errorMessage || 'Failed to access camera');
                    }
                    return;
                }

                if (response.assets && response.assets[0]?.uri) {
                    setSelectedImage(response.assets[0].uri);
                    setAnalysisError(null);
                }
            })
            .catch(error => {
                console.error('Camera launch error:', error);
                Alert.alert(
                    'Camera Error',
                    'Failed to launch camera. Please try again or use gallery option.'
                );
            });
    };

    // Handle Gallery launch
    const handleGalleryLaunch = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo' as MediaType,
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
                    setAnalysisError(null);
                }
            })
            .catch(error => {
                console.error('Gallery launch failed:', error);
                Alert.alert('Error', 'Failed to open gallery. Please try again.');
            });
    };

    // Function to analyze plant image with API
    const analyzePlantImage = async () => {
        if (!selectedImage) {
            setAnalysisError('No image selected');
            return;
        }

        setIsAnalyzing(true);
        setAnalysisError(null);

        // Get current language from i18n
        const currentLanguage = i18n.language || 'en';
        
        // Map our app language codes to API accepted language codes if needed
        const languageMap: {[key: string]: string} = {
            'en': 'en',
            'ur': 'ur',
            'sin': 'ur', // assuming Sindhi maps to 'sd' in API
            'psh': 'ur'  // assuming Pashto maps to 'ps' in API
        };
        
        // Use mapped language or default to English
        const apiLanguage = languageMap[currentLanguage] || 'en';
        
        console.log("Using language for API request:", apiLanguage);

        const formData = new FormData();
        formData.append('image', {
            uri: selectedImage,
            type: 'image/jpeg', // Changed from png to jpeg
            name: 'plant_image.jpg'
        } as any);
        formData.append('application_used_image_gallery', 'false');
        formData.append('application_id', 'EArthi');
        formData.append('application_end_user_id', 'FarmerUser');

        try {
            const response = await fetch('https://api.plantix.net/v2/image_analysis', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${PLANTIX_API_KEY}`,
                    'Accept': 'application/json',
                    'Accept-Language': apiLanguage
                },
                body: formData
            });

            const responseData = await response.json();

            if (response.status === 200) {
                // Check for errors array in the response
                if (responseData.errors && responseData.errors.length > 0) {
                    const error = responseData.errors[0];
                    let errorMessage = error.message;

                    // Add image feedback details if available
                    if (responseData.image_feedback) {
                        const feedback = responseData.image_feedback;
                        if (feedback.image_focus === 'bad') {
                            errorMessage += '\nThe image is too blurry. Please take a clearer photo.';
                        }
                        if (feedback.image_distance === 'bad') {
                            errorMessage += '\nPlease capture the image from an appropriate distance.';
                        }
                    }

                    // Handle specific error types
                    switch (error.type) {
                        case 'bad_image':
                            errorMessage = 'The image quality is too low. Please ensure the image is clear and well-lit.';
                            break;
                        case 'image_blurry':
                            errorMessage = 'The image is too blurry. Please take a clearer photo.';
                            break;
                        case 'distance_too_far':
                            errorMessage = 'You are too far from the plant. Please take a closer photo.';
                            break;
                        case 'non_plant':
                            errorMessage = 'No plant detected in the image. Please ensure the image contains a plant.';
                            break;
                        case 'crop_not_supported':
                            errorMessage = 'This crop type is not currently supported by our system.';
                            break;
                        case 'ornamental_plant':
                            errorMessage = 'Ornamental plants are not supported. Please only use agricultural crops.';
                            break;
                        case 'unknown_disease':
                            errorMessage = 'Unable to recognize these symptoms. This particular problem may not be supported yet.';
                            break;
                    }

                    setAnalysisError(errorMessage);
                    return; // Don't proceed to navigation if there's an error
                }

                // If no errors, proceed with navigation based on results
                if (responseData.predicted_diagnoses && responseData.predicted_diagnoses.length > 1) {
                    navigation.navigate(ScreensName.Fetch1, { 
                        analysisResults: responseData,
                        imageUri: selectedImage
                    });
                } else {
                    navigation.navigate(ScreensName.Diagnosis, { 
                        imageUri: selectedImage,
                        diagnosisResult: responseData.predicted_diagnoses && responseData.predicted_diagnoses.length === 1 ? 
                            responseData.predicted_diagnoses[0] : null
                    });
                }
            } else {
                // Handle non-200 status codes
                let errorMessage = '';
                
                if (response.status === 400) {
                    if (responseData.message?.includes('resolution')) {
                        errorMessage = "Image resolution is too low. Please use an image with higher resolution (min: 200x200px, max: 6000x6000px).";
                    } else {
                        errorMessage = responseData.message || "Invalid request. Please try again with a different image.";
                    }
                } else if (response.status === 401) {
                    errorMessage = "Authentication failed. Please try again later.";
                } else if (response.status === 413) {
                    errorMessage = "Image file is too large. Please use a smaller image.";
                } else if (response.status === 429) {
                    errorMessage = "Too many requests. Please try again later.";
                } else if (response.status === 500) {
                    errorMessage = "Server error. Please try again later.";
                } else {
                    errorMessage = responseData.message || `Error: ${response.status}`;
                }

                setAnalysisError(errorMessage);
                return; // Don't proceed to navigation
            }
        } catch (error: any) {
            console.error("Network Error:", error);
            setAnalysisError("Network error. Please check your internet connection and try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleProceed = () => {
        if (selectedImage) {
            if (PLANTIX_API_KEY && PLANTIX_API_KEY !== 'YOUR_PLANTIX_API_KEY') {
                analyzePlantImage();
            } else {
                setAnalysisError('API configuration error. Please contact support.');
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{t("Heal Your Crop")}</Text>
                    <Text style={styles.subtitle}>{t("Fit the damaged crop within the frame:")}</Text>
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
                                {t("Take a photo or select from gallery")}
                            </Text>
                        </View>
                    )}
                </View>

                {analysisError && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{analysisError}</Text>
                    </View>
                )}

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
                        onPress={requestCameraPermission}
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
                        (!selectedImage || isAnalyzing) && styles.proceedButtonDisabled
                    ]}
                    onPress={handleProceed}
                    disabled={!selectedImage || isAnalyzing}
                >
                    {isAnalyzing ? (
                        <ActivityIndicator color={colors.WHITE} size="small" />
                    ) : (
                        <Text style={styles.proceedButtonText}>{t("Proceed")}</Text>
                    )}
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
    errorContainer: {
        width: wp('90%'),
        padding: wp('4%'),
        backgroundColor: colors.LIGHT_GRAY,
        borderRadius: wp('2%'),
        marginBottom: hp('2%'),
        borderWidth: 1,
        borderColor: colors.RED,
    },
    errorText: {
        fontSize: hp('1.8%'),
        fontFamily: fonts.Medium,
        color: colors.RED,
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