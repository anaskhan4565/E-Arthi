import React, { useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
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
import { PermissionsAndroid } from 'react-native';  // Import PermissionsAndroid
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
import { PLANTIX_API_KEY } from '@env';

const HealCropImageCapture = () => {
    const { t } = useTranslation();
    const navigation = useNavigation<any>();
    const PlantDiagnosisData = new MMKV();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
    const [analysisError, setAnalysisError] = useState<string | null>(null);

    // Request camera permission
    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'This app needs access to your camera to take photos',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Camera permission granted');
                handleCameraLaunch();  // Launch the camera after permission is granted
            } else {
                console.log('Camera permission denied');
                Alert.alert('Permission Denied', 'Camera permission is required to take a photo.');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    // Handle Camera launch
    const handleCameraLaunch = () => {
        const options: CameraOptions = {
            mediaType: 'photo' as MediaType,
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
                    setAnalysisError(null); // Clear any previous error
                }
            })
            .catch(error => {
                console.error('Camera launch failed:', error);
                Alert.alert('Error', 'Failed to launch camera. Please try again.');
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
                    setAnalysisError(null); // Clear any previous error
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

        const formData = new FormData();
        formData.append('image', {
            uri: selectedImage,
            type: 'image/png',
            name: 'plant_image.png'
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
                    'Accept-Language': 'en'
                },
                body: formData
            });

            // Check HTTP status code
            if (response.ok) {
                // Status 200-299 - success
                const result = await response.json();
                console.log("Plant & Disease Suggestions:", result);
                
                // Check if predicted_diagnoses exists and has more than 1 item
                if (result.predicted_diagnoses && result.predicted_diagnoses.length > 1) {
                    // Multiple diagnoses - go to Fetch1 screen for user to select
                    console.log(`Multiple diagnoses found (${result.predicted_diagnoses.length}), navigating to selection screen`);
                    navigation.navigate(ScreensName.Fetch1, { 
                        analysisResults: result,
                        imageUri: selectedImage
                    });
                } else {
                    // Single diagnosis or no diagnosis - go directly to Diagnosis
                    console.log('Single or no diagnosis, navigating to Diagnosis screen');
                    navigation.navigate(ScreensName.Diagnosis, { 
                        imageUri: selectedImage,
                        diagnosisResult: result.predicted_diagnoses && result.predicted_diagnoses.length === 1 ? 
                            result.predicted_diagnoses[0] : null
                    });
                }
            } else {
                // Handle errors based on status code
                let errorMessage = '';
                
                if (response.status === 400) {
                    errorMessage = "Bad Request: The request was invalid.";
                } else if (response.status === 404) {
                    errorMessage = "Not Found: The endpoint was not found.";
                } else if (response.status === 500) {
                    errorMessage = "Internal Server Error: There was a problem with the server.";
                } else {
                    errorMessage = `Error: Received status code ${response.status}`;
                }

                // Optionally, get more details about the error response
                try {
                    const errorDetails = await response.json();
                    console.error("Error Details:", errorDetails);
                    
                    // Add error details if available
                    if (errorDetails.message) {
                        errorMessage += ` - ${errorDetails.message}`;
                    }
                } catch (e) {
                    // If can't parse error response as JSON
                    console.error("Error parsing error response:", e);
                }
                
                setAnalysisError(errorMessage);
                
                // Also navigate to Diagnosis with the image for default app behavior
                navigation.navigate(ScreensName.Diagnosis, { imageUri: selectedImage });
            }
        } catch (error: any) {
            // Catch network errors (e.g., no internet, server unreachable)
            console.error("Network Error:", error);
            setAnalysisError(`Network Error: ${error.message || 'Unable to connect to server'}`);
            
            // Also navigate to Diagnosis with the image for default app behavior
            navigation.navigate(ScreensName.Diagnosis, { imageUri: selectedImage });
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleProceed = () => {
        if (selectedImage) {
            // Analyze the image if we have a valid API key
            if (PLANTIX_API_KEY && PLANTIX_API_KEY !== 'YOUR_PLANTIX_API_KEY') {
                analyzePlantImage();
            } else {
                // Fallback to default behavior if no API key
                console.log('No valid API key, using default behavior');
                navigation.navigate(ScreensName.Diagnosis, { imageUri: selectedImage });
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
                        onPress={requestCameraPermission}  // Request permission before launching camera
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
                    disabled={!selectedImage || isAnalyzing}  // Disable while analyzing
                >
                    {isAnalyzing ? (
                        <ActivityIndicator color={colors.WHITE} size="small" />
                    ) : (
                        <Text style={styles.proceedButtonText}>Proceed</Text>
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
        padding: wp('2%'),
        backgroundColor: colors.LIGHT_GRAY, // Use available color
        borderRadius: wp('2%'),
        marginBottom: hp('2%'),
    },
    errorText: {
        fontSize: hp('1.6%'),
        fontFamily: fonts.Regular,
        color: colors.RED, // Use available color
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