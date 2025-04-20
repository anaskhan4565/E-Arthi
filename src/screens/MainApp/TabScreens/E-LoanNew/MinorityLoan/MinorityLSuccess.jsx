import React, { useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import colors from '../../../../../../util/Constants/colors.js';
import { fonts } from '../../../../../../util/Constants/FontName.js';
import { useNavigation } from '@react-navigation/native';
import ScreensName from '../../../../../../util/Constants/ScreensName.ts';

const MinorityLSuccess = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const scaleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 10,
            friction: 3,
        }).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../NewLoan/Success.png')}
                style={[
                    styles.successImage,
                    {
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            />
            <Text style={styles.successText}>{t("Your loan request has been successfully submitted!")}</Text>
            <Text style={styles.subText}>{t("We will review your application and get back to you soon.")}</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate(ScreensName.ELoanNew)}
            >
                <Text style={styles.buttonText}>{t("Back to Home")}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: wp('5%'),
    },
    successImage: {
        width: wp('30%'),
        height: wp('30%'),
        marginBottom: hp('3%'),
    },
    successText: {
        fontSize: hp('2.2%'),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        textAlign: 'center',
        marginBottom: hp('1%'),
    },
    subText: {
        fontSize: hp('1.8%'),
        fontFamily: fonts.Regular,
        color: colors.GRAY,
        textAlign: 'center',
        marginBottom: hp('4%'),
    },
    button: {
        backgroundColor: colors.GREEN,
        paddingVertical: hp('1.5%'),
        paddingHorizontal: wp('8%'),
        borderRadius: hp('1%'),
    },
    buttonText: {
        color: colors.WHITE,
        fontSize: hp('1.8%'),
        fontFamily: fonts.Medium,
    },
});

export default MinorityLSuccess; 