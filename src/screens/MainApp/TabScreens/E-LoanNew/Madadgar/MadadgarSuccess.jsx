import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import colors from '../../../../../../util/Constants/colors.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import Success from './Success.png';
import CustomButton from '../../../../../components/CustomButton';
import ScreensName from '../../../../../../util/Constants/ScreensName.ts';
import { useTranslation } from 'react-i18next';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { fonts } from '../../../../../../util/Constants/FontName.js';
import { useNavigation } from '@react-navigation/native';

const MadadgarSuccess = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();

    const translateY = useRef(new Animated.Value(hp(20))).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    const ResetDefaultsStore = () => {
        navigation.navigate(ScreensName.ELoanNew
        );
    }

    return (
        <SafeAreaView style={styles.MainContainer}>
            <View style={{ flex: 0.74, backgroundColor: colors.WHITE }}>
                <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center', marginTop: hp(10), gap: hp(2) }}>

                    <Animated.Image
                        source={Success}
                        resizeMode="contain"
                        style={[
                            styles.image,
                            { transform: [{ translateY }], opacity },
                        ]}
                    />
                    <Text style={{ fontSize: hp(2.5), textAlign: 'center', fontFamily: fonts.Medium, marginHorizontal: hp(3) }}>{t('Your request for Madadgar Grant has been successfully submitted!')}.</Text>
                </View>
            </View>
            <View style={{ flex: 0.3, alignItems: 'center' }}>
                <CustomButton BgGiven={colors.GREEN}
                    onPressG={ResetDefaultsStore}
                    MainText={t('Continue')}
                    txColor={colors.WHITE}
                    isNavigation={true}
                    name={ScreensName.ELoanNew} />
            </View>
        </SafeAreaView>
    );
};

export default MadadgarSuccess;

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    image: {
        height: hp(15),
        width: wp(180),
        marginLeft: hp(2.2),
    },

    card: {
        flex: 1,
        marginHorizontal: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        width: wp('30%'),
        height: hp('13%'),
    },
});