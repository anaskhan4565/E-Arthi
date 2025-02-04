import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import colors from '../../../../util/colors.js';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../../../../util/FontName.js';
import ScreensName from '../../../../util/ScreensName.ts';
// import ScreensName from '../../../../util/ScreensName.js';

const EInventoryBoxes = ({
    name, SourceGiven, screenName,
    navigationName, isNavigation,
    w = wp('80%'),
    h = hp('30%'),
    isBold = false,
    img_size_h = hp(5),
    img_size_w = hp(20),
    font_Size = hp('2.5%'),
    isLightBold = false,
    give_top_margin = 0


}) => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const handleNavigation = () => {
        if (isNavigation == 1) {
            if (name) {
                navigation.navigate(navigationName, { screen: (screenName) });
            }
        }

    };

    const handleSubmit = () => {
        console.log('just a submit demo');
    };

    return (
        <TouchableOpacity onPress={handleNavigation} style={[styles.Wrapper, { width: w, height: h }]}>
            <Image source={SourceGiven} style={[styles.ImageStyle, { width: img_size_w, height: img_size_h }]} />
            <Text style={[styles.TextStyle, {
                fontSize: font_Size,
                fontFamily: isBold ? fonts.bold : isLightBold ? fonts.SemiBold : fonts.Medium,
                marginTop: give_top_margin,



            }]}>{t(name)}</Text>
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
        textAlign: 'center',
    },
    ImageStyle: {
        resizeMode: 'contain',
        marginBottom: hp(0.5), // Optional: Add a bottom margin to the image for consistent spacing
    },
});
