import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';

import colors from '../../../../util/colors.js';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../../../../util/FontName.js';
import ScreensName from '../../../../util/ScreensName.ts';
// import ScreensName from '../../../../util/ScreensName.js';

const EInventoryBoxes = ({ name, SourceGiven, screenName, navigationName, isNavigation, w = wp('80%'), h = hp('30%') }) => {
    const navigation = useNavigation();

    const handleNavigation = () => {
        if (name) {
            navigation.navigate(navigationName, { screen: (screenName) });
        }
    };

    const handleSubmit = () => {
        console.log('just a submit demo');
    };

    return (
        <TouchableOpacity onPress={handleNavigation} style={[styles.Wrapper, { width: w, height: h }]}>
            <Image source={SourceGiven} style={styles.ImageStyle} />
            <Text style={styles.TextStyle}>{name}</Text>
        </TouchableOpacity>
    );
};

export default EInventoryBoxes;

const styles = StyleSheet.create({
    Wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hp('1.3%'),
        backgroundColor: colors.WHITE,
        marginHorizontal: hp('1.4%'),
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginTop: hp(1),
    },
    TextStyle: {
        fontFamily: fonts.Medium,
        fontSize: hp('2.5%'),
        marginTop: hp(0.9),
    },
    ImageStyle: {
        resizeMode: 'contain',
        width: wp(10),
        height: hp(5),
    },
});
