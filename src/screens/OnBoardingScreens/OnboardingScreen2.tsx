import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, NativeSyntheticEvent, NativeScrollEvent, Platform, Alert, Linking, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CardsSvg from '../../assets/MainApp/OnBoarding/Cards.svg';
import MapSvg from '../../assets/MainApp/OnBoarding/Map.svg';
import MapSvg2 from '../../assets/MainApp/OnBoarding/MapUr.svg';
// Import using require to avoid typescript path issues
const mp3 = require('./assets/img2.png');
import ScreensName from '../../../util/Constants/ScreensName';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../util/Constants/colors';
import { fonts } from '../../../util/Constants/FontName';
import Navbar from '../MainApp/Navbar/Navbar';
import CustomSearchApp from '../MainApp/CustomComponent/CustomSearchApp';
import Geolocation from '@react-native-community/geolocation';
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('window');

const OnboardingScreen2 = () => {
    const navigation = useNavigation<any>();
    const scrollViewRef = useRef<ScrollView>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
    const [isCheckingPermission, setIsCheckingPermission] = useState(false);
    const { t, i18n } = useTranslation();
    
    // Check if current language is Urdu and add debug logging
    const isUrduLanguage = i18n.language === 'ur';
    
    // Debug log to see current language
    useEffect(() => {
        console.log('Current language:', i18n.language);
        console.log('Is Urdu language:', isUrduLanguage);
    }, [i18n.language]);

    // Request permission when component mounts
    useEffect(() => {
        checkLocationPermission();
    }, []);

    const checkLocationPermission = () => {
        setIsCheckingPermission(true);
        Geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log('Your coordinates:', latitude, longitude);
                setLocationPermissionGranted(true);
                setIsCheckingPermission(false);
            },
            (error) => {
                console.log('Location permission status:', error?.code, error?.message);
                setLocationPermissionGranted(false);
                setIsCheckingPermission(false);

                // If error is because location service is disabled
                if (error.code === 2) {  // POSITION_UNAVAILABLE usually means location is off
                    promptEnableLocationServices();
                }
            },
            { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
        );
    };

    const promptEnableLocationServices = () => {
        Alert.alert(
            "Location Services Disabled",
            "Please enable location services on your device for this app to work properly.",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Open Settings", onPress: openLocationSettings }
            ]
        );
    };

    const openLocationSettings = () => {
        if (Platform.OS === 'ios') {
            Linking.openURL('App-Prefs:Privacy&path=LOCATION');
        } else {
            Linking.openSettings();
        }
    };

    const requestLocationPermission = () => {
        if (isCheckingPermission) return;

        setIsCheckingPermission(true);

        if (Platform.OS === 'ios') {
            // For iOS, request authorization then get location
            Geolocation.requestAuthorization();
            Geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    console.log('Your coordinates:', latitude, longitude);
                    setLocationPermissionGranted(true);
                    setIsCheckingPermission(false);
                    navigation.navigate(ScreensName.DashboardInitialization);
                },
                (error) => {
                    setIsCheckingPermission(false);
                    // Check if the error is because location service is disabled
                    if (error.code === 2) {  // POSITION_UNAVAILABLE
                        promptEnableLocationServices();
                    } else {
                        handleLocationPermissionError(error);
                    }
                },
                { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
            );
        } else {
            // For Android
            Geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    console.log('Your coordinates:', latitude, longitude);
                    setLocationPermissionGranted(true);
                    setIsCheckingPermission(false);
                    navigation.navigate(ScreensName.DashboardInitialization);
                },
                (error) => {
                    setIsCheckingPermission(false);
                    // Check if the error is because location service is disabled
                    if (error.code === 2) {  // POSITION_UNAVAILABLE
                        promptEnableLocationServices();
                    } else {
                        handleLocationPermissionError(error);
                    }
                },
                { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
            );
        }
    };

    const handleLocationPermissionError = (error?: any) => {
        const errorCode = error?.code || 'unknown';
        const errorMessage = error?.message || 'Location permission denied';

        console.log('Location permission error:', errorCode, errorMessage);

        Alert.alert(
            "Location Access Required",
            "Please enable location services to use this feature. Location tracking helps provide accurate farm data and weather information.",
            [
                { text: "Not Now", style: "cancel" },
                { text: "Open Settings", onPress: openAppSettings }
            ]
        );
    };

    const openAppSettings = () => {
        if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:');
        } else {
            Linking.openSettings();
        }
    };

    const handleAllowLocation = () => {
        requestLocationPermission();
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const page = Math.round(offsetX / width);
        setCurrentPage(page);
    };

    const goToPage = (pageIndex: number) => {
        scrollViewRef.current?.scrollTo({ x: pageIndex * width, animated: true });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={false} />
            </View>

            <View style={styles.mainContent}>
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={handleScroll}
                    style={styles.scrollView}
                >

                    <View style={[styles.slide, { width }]}>
                        <View style={styles.contentContainer}>
                            <View style={styles.iconContainer}>
                                <CardsSvg width={wp(120)} height={hp(53)} />
                            </View>
                            <View style={styles.titleContainer}>
                                <Text style={styles.slideDescription}>
                                    {t("Let's start with getting your dashboard set up. Track your farm's performance in real time, make smarter decisions, and stay on top of everything—all from one place.")}
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[styles.button, isCheckingPermission && styles.buttonDisabled]}
                            onPress={handleAllowLocation}
                            disabled={isCheckingPermission}
                        >
                            <Text style={styles.buttonText}>
                                {isCheckingPermission ? t('Checking...') : t('Allow location')}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Second Slide */}
                    <View style={[styles.slide, { width }]}>
                        <View style={styles.contentContainer}>

                            <View style={styles.mapContainer}>
                                {/* Conditionally render map based on language */}
                                {isUrduLanguage ? (
                                    <Image 
                                        source={mp3} 
                                        style={{ width: wp(130), height: hp(45) }} 
                                        resizeMode="contain"
                                    />
                                ) : (
                                    <MapSvg width={wp(130)} height={hp(45)} />
                                )}
                            </View>
                            <View style={[styles.titleContainer, { marginTop: hp(4) }]}>
                                <Text style={styles.slideDescription}>
                                    {t("Let's start with getting your dashboard set up. Track your farm's performance in real time, make smarter decisions, and stay on top of everything—all from one place.")}
                                </Text>
                            </View>


                        </View>

                        <TouchableOpacity
                            style={[styles.button, isCheckingPermission && styles.buttonDisabled]}
                            onPress={handleAllowLocation}
                            disabled={isCheckingPermission}
                        >
                            <Text style={styles.buttonText}>
                                {isCheckingPermission ? t('Checking...') : t('Allow location')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <View style={styles.paginationContainer}>
                    {[0, 1].map((index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.dot,
                                currentPage === index && styles.activeDot
                            ]}
                            onPress={() => goToPage(index)}
                        />
                    ))}
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
    mainContent: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: wp(4),
    },
    navbarContainer: {
        height: hp("8.2%"),
        backgroundColor: "white",
        marginTop: hp("0.2%"),
        width: '100%',
    },
    searchContainer: {
        marginTop: hp(2),
    },
    iconContainer: {
        alignItems: 'center',
        marginTop: hp(-10),
    },
    menuContainer: {
        width: wp(10),
        height: hp(5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuIcon: {
        width: wp(6),
        height: wp(6),
    },
    slide: {
        flex: 1,
        padding: wp(4),
        justifyContent: 'space-between',
    },
    titleContainer: {
        marginTop: hp(-2),
        backgroundColor: colors.LIGHT_GREEN,
        padding: wp(4),
        paddingBottom: hp(-2),
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp(4),
    },
    title: {
        fontSize: hp(2),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        textAlign: 'center',
        marginBottom: hp(3.5),
    },
    iconLabel: {
        fontSize: hp(2.3),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginTop: hp(1.2),
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: hp(2.5),
    },
    statItem: {
        alignItems: 'center',
        marginHorizontal: wp(5),
    },
    statValue: {
        fontSize: hp(4),
        fontFamily: fonts.Bold,
        color: colors.BLACK,
    },
    statUnit: {
        fontSize: hp(2),
        fontFamily: fonts.Regular,
        color: colors.GRAY,
    },
    statLabel: {
        fontSize: hp(2),
        fontFamily: fonts.Regular,
        color: colors.GRAY,
        marginTop: hp(0.6),
    },
    normalBadge: {
        backgroundColor: '#FFF3E0',
        paddingHorizontal: wp(3),
        paddingVertical: hp(0.5),
        borderRadius: wp(5),
        marginTop: hp(0.6),
    },
    normalText: {
        color: '#FF9800',
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
    },
    graphContainer: {
        width: '100%',
        height: hp(15),
        marginBottom: hp(2.5),
        alignItems: 'center',
        justifyContent: 'center',
    },
    graph: {
        width: '100%',
        height: '100%',
        backgroundColor: '#E0F7FA',
        borderRadius: wp(2),
    },
    mapContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(-10),
    },
    slideDescription: {
        fontSize: hp(1.8),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
        textAlign: 'center',
        lineHeight: hp(2.8),
        marginBottom: hp(2.5),
        marginTop: hp(2),
    },
    button: {
        backgroundColor: colors.GREEN,
        paddingVertical: hp(1.8),
        borderRadius: wp(2.5),
        alignItems: 'center',
        marginBottom: hp(2.5),
    },
    buttonDisabled: {
        backgroundColor: colors.GRAY,
        opacity: 0.7,
    },
    buttonText: {
        color: colors.WHITE,
        fontSize: hp(2),
        fontFamily: fonts.SemiBold,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: hp(15),
        left: 0,
        right: 0,
    },
    dot: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        width: wp(2),
        height: wp(2),
        borderRadius: wp(1),
        marginLeft: wp(0.8),
        marginRight: wp(0.8),
    },
    activeDot: {
        backgroundColor: colors.GREEN,
        width: wp(2),
        height: wp(2),
        borderRadius: wp(1),
        marginLeft: wp(0.8),
        marginRight: wp(0.8),
    },
});

export default OnboardingScreen2; 