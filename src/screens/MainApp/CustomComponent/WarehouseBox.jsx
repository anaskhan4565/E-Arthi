import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import colors from '../../../../util/colors.js';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../../../../util/FontName.js';
import { useTranslation } from 'react-i18next';

const Categorybox = ({ name, SourceGiven, w = wp('18%'), h = hp('9%'), onPress }) => {
    const { t } = useTranslation();
    const handleSubmit = () => {
        console.log('just a submit demo');
    };
    return (
        <TouchableOpacity style={[styles.Wrapper, { width: w, height: h }]} onPress={onPress}>
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
        fontFamily: fonts.Light,
        fontSize: wp(2),
    },
    ImageStyle: {
        resizeMode: 'contain',
    },
});
