import React, { useRef, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Animated,
    Easing,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';

import Navbar from '../../Navbar/Navbar';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';

const RentalDetails = ({ route }) => {
    const { t } = useTranslation();
    const {
        rentalId,
        date,
        type,
        entity,
        amount,
        status,
        time,
        warehouse,
        distance = '120 km',
        color
    } = route.params;

    // Animation progress value
    const progressAnim = useRef(new Animated.Value(0)).current;
    const distanceOpacity = useRef(new Animated.Value(0)).current;
    const calculatingOpacity = useRef(new Animated.Value(1)).current;
    
    // Get numeric value for animation
    const numericValue = parseInt(distance.replace(/[^0-9]/g, '')) || 100;
    const progressWidth = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', `${Math.min(80, (numericValue / 150) * 80)}%`]
    });

    useEffect(() => {
        // Start with "Calculating..." text
        setTimeout(() => {
            // Fade out "Calculating..." text
            Animated.timing(calculatingOpacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
                easing: Easing.ease
            }).start();
            
            // Fade in the distance value
            Animated.timing(distanceOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.ease,
                delay: 300
            }).start();
            
            // Animate the progress bar
            Animated.timing(progressAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: false,
                easing: Easing.out(Easing.cubic)
            }).start();
        }, 1500);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>

            <View style={styles.searchBarContainer}>
                <CustomSearchApp placeholder="Search in here" />
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Rental {rentalId}</Text>
                    <View style={[styles.badge, { backgroundColor: color }]}>
                        <Text style={styles.badgeText}>{type}</Text>
                    </View>
                </View>

                <View style={styles.detailsContainer}>
                    <DetailItem label="Rented Date" value={date} />
                    <DetailItem label="Time" value={time} />
                    <DetailItem label="Type" value={type} />
                    <DetailItem label="Warehouse" value={warehouse} />
                    <DetailItem label="Entity" value={entity} />
                    <DetailItem label="Amount Reserved" value={amount} />
                </View>
            </View>
            
            <View style={styles.distanceContainer}>
                <View style={styles.distanceCard}>
                    <Text style={styles.distanceTitle}>Distance from your main location</Text>
                    
                    <View style={styles.distanceContent}>
                        {/* Calculating text - fades out */}
                        <Animated.Text style={[styles.calculatingText, { opacity: calculatingOpacity }]}>
                            Calculating distance...
                        </Animated.Text>
                        
                        {/* Distance value - fades in */}
                        <Animated.Text style={[styles.distanceValue, { opacity: distanceOpacity }]}>
                            {distance}
                        </Animated.Text>
                        
                        {/* Progress bar */}
                        <View style={styles.distanceIndicator}>
                            <Animated.View style={[styles.distanceBar, { width: progressWidth }]} />
                        </View>
                        
                        <Animated.Text style={[styles.distanceText, { opacity: distanceOpacity }]}>
                            From your registered location
                        </Animated.Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const DetailItem = ({ label, value }) => (
    <View style={styles.detailItem}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);

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
    searchBarContainer: {
        marginTop: hp('2%'),
        marginHorizontal: wp('4%'),
        height: hp('6%'),
    },
    contentContainer: {
        padding: wp('4%'),
    },
    distanceContainer: {
        marginHorizontal: wp('4%'),
        marginVertical: hp('2%'),
        marginBottom: hp('4%'),
    },
    distanceCard: {
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: hp('1.5%'),
        padding: wp('4%'),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    distanceTitle: {
        fontSize: hp('2%'),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        marginBottom: hp('1.5%'),
    },
    distanceContent: {
        alignItems: 'center',
        position: 'relative',
        paddingVertical: hp('1.5%'),
        minHeight: hp('10%'),
    },
    calculatingText: {
        fontSize: hp('1.8%'),
        fontFamily: fonts.Regular,
        color: colors.DARK_GRAY,
        marginBottom: hp('1%'),
        position: 'absolute',
        top: hp('1.5%'),
    },
    distanceValue: {
        fontSize: hp('2.8%'),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp('1%'),
        zIndex: 2,
    },
    distanceIndicator: {
        width: wp('80%'),
        height: hp('1.2%'),
        backgroundColor: colors.LIGHT_GRAY,
        borderRadius: hp('0.6%'),
        overflow: 'hidden',
        marginVertical: hp('1%'),
    },
    distanceBar: {
        height: '100%',
        backgroundColor: colors.PRIMARY,
        borderRadius: hp('0.6%'),
    },
    distanceText: {
        fontSize: hp('1.6%'),
        fontFamily: fonts.Regular,
        color: colors.DARK_GRAY,
        marginTop: hp('1%'),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('3%'),
    },
    title: {
        fontSize: hp('2.8%'),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
    },
    badge: {
        marginLeft: hp(0.5),
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: hp(0.7),
        paddingVertical: hp(0.8),
        paddingHorizontal: wp(4),
    },
    badgeText: {
        color: colors.WHITE,
        fontSize: hp('1.6%'),
        fontFamily: fonts.Medium,
    },
    detailsContainer: {
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: hp('2%'),
        padding: wp('4%'),
    },
    detailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('2%'),
    },
    label: {
        fontSize: hp('2%'),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
    },
    value: {
        fontSize: hp('2%'),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
});

export default RentalDetails; 