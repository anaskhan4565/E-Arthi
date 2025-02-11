import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import colors from '../../../../util/colors.js';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../../../../util/FontName.js';
import { useTranslation } from 'react-i18next';
import { MMKV } from 'react-native-mmkv';

const Categorybox = ({ OnpressCustom = false,
    isSelected = true,
    name, SourceGiven,
    isNavigation,
    w = wp('18%'),
    h = hp('9%'),
    navigationName,
    screenName,
    selectedCategory,
    setSelectedCategory
}) => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const MarketProductType = new MMKV();

    const handleNavigation = () => {
        if (name) {
            navigation.navigate(navigationName, { screen: (screenName) });
        }
    };

    const handleSubmit = () => {
        console.log('just a submit demo');
    };

    const MarketProductSet = () => {
        if (selectedCategory === name) {
            MarketProductType.set('MarketProductType', "");
            setSelectedCategory('');
        } else {
            MarketProductType.set('MarketProductType', name);
            setSelectedCategory(name);
        }
    };

    return (
        <TouchableOpacity style={[styles.Wrapper, { width: w, height: h, borderWidth: selectedCategory === name ? hp(0.4) : hp(0.1) }]} onPress={OnpressCustom ? MarketProductSet : handleNavigation} >
            <Image source={SourceGiven} style={[styles.ImageStyle, { width: wp('6%'), height: hp('5%') }]} />
            <Text style={styles.TextStyle}>{t(name)}</Text>
        </TouchableOpacity>
    );
};

export default Categorybox;

const styles = StyleSheet.create({
    Wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: colors.WHITE,
        borderColor: colors.GREEN,
        // marginHorizontal: wp('%'),
    },
    TextStyle: {
        fontFamily: fonts.Regular,
        fontSize: hp(1.3),
        textAlign: 'center',
    },
    ImageStyle: {
        resizeMode: 'contain',
    },
});
