import React, { useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import CustomButton from '../../../../components/CustomButton.jsx';
import { fonts } from '../../../../../util/Constants/FontName.js';
import colors from '../../../../../util/Constants/colors.js';
import ScreensName from '../../../../../util/Constants/ScreensName.ts';

function AuctionSubmissionSuccess() {
    const { t } = useTranslation();
    const navigation = useNavigation();

    // Animation values
    const checkmarkScale = useRef(new Animated.Value(0)).current;
    const checkmarkOpacity = useRef(new Animated.Value(0)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Animate checkmark
        Animated.sequence([
            Animated.timing(checkmarkScale, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(checkmarkOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();

        // Animate text with a slight delay
        Animated.timing(textOpacity, {
            toValue: 1,
            duration: 500,
            delay: 400,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar hasBackButton={true} />
            </View>

            <View style={styles.searchContainer}>
                <CustomSearchApp placeholder={t('Search in here')} />
            </View>

            <View style={styles.content}>
                {/* Success Icon */}
                <Animated.View
                    style={[
                        styles.checkmarkContainer,
                        {
                            transform: [{ scale: checkmarkScale }],
                            opacity: checkmarkOpacity,
                        },
                    ]}
                >
                    <View style={styles.checkmarkCircle}>
                        <Text style={styles.checkmark}>✓</Text>
                    </View>
                </Animated.View>

                {/* Success Message */}
                <Animated.View style={[styles.messageContainer, { opacity: textOpacity }]}>
                    <Text style={styles.messageTitle}>
                        {t('Your auction request has been successfully submitted!')}
                    </Text>
                </Animated.View>

                {/* Button to return */}
                <View style={styles.buttonContainer}>
                    <CustomButton
                        MainText={t('Back to Home')}
                        BgGiven={colors.GREEN}
                        txColor={colors.WHITE}
                        wgiven={wp('80%')}
                        hgiven={hp('5%')}
                        isNavigation={true}
                        name={ScreensName.EMandiHomeScreen}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

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
    searchContainer: {
        marginTop: hp('2%'),
        height: hp('7%'),
        marginHorizontal: hp(2),
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: wp(5),
    },
    checkmarkContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: hp(5),
    },
    checkmarkCircle: {
        width: hp(15),
        height: hp(15),
        borderRadius: hp(7.5),
        backgroundColor: colors.GREEN,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkmark: {
        color: colors.WHITE,
        fontSize: hp(8),
        fontWeight: 'bold',
    },
    messageContainer: {
        alignItems: 'center',
        marginBottom: hp(5),
    },
    messageTitle: {
        fontSize: hp(3),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        textAlign: 'center',
        marginBottom: hp(2),
    },
    buttonContainer: {
        marginTop: hp(5),
        width: '100%',
        alignItems: 'center',
    },
});

export default AuctionSubmissionSuccess; 