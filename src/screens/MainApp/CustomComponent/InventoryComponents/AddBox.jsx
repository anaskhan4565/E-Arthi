import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';

import colors from '../../../../../util/colors.js';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../../../../../util/FontName.js';
import { useTranslation } from 'react-i18next';
// import ScreensName from '../../../../util/ScreensName.js';
const EInventoryBoxes = ({ name, SourceGiven, isNavigation, w = wp('80%'), h = hp('30%'),navigateName }) => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const handleNavigation = () => {
        if (navigateName) {
            console.log('Navigating to:', name);
            navigation.navigate(navigateName);
        }
    };

    const handleSubmit = () => {
        console.log('just a submit demo');
    };

    return (
        <TouchableOpacity onPress={isNavigation=1?handleNavigation:null} style={[styles.Wrapper, { width: w, height: h }]}>
            <Image source={SourceGiven} style={styles.ImageStyle} />
            <Text style={styles.TextStyle}>{t(name)}</Text>
        </TouchableOpacity>
    );
};

export default EInventoryBoxes;

const styles = StyleSheet.create({
    Wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
        gap:4,
        borderRadius: hp('1.3%'),
        backgroundColor: colors.LIGHT_GREEN,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 2} ,
        shadowOpacity: 4.2,
        shadowRadius: 9,
        margin:hp(1)
    },
    TextStyle: {
        fontFamily: fonts.Medium,
        fontSize: hp(1.7),
        marginTop: hp(0.9),
    },
    ImageStyle: {
        resizeMode: 'contain',
        width: wp(6),
        height: hp(5),
    },
});
