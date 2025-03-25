import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import colors from '../../../../util/Constants/colors.js';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../../../../util/Constants/FontName.js';
import ScreensName from '../../../../util/Constants/ScreensName.ts';
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
    give_top_margin = 0,
    fontcolor = "black",
    amount,
    SecondaryText = null,
    elevation = 5,

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
        <TouchableOpacity onPress={handleNavigation} style={[styles.Wrapper, { width: w, height: h,elevation: elevation }]}>
            <View style={{ marginTop: SecondaryText ? hp(2) : null, }}>
                <Image source={SourceGiven} style={[styles.ImageStyle, { width: img_size_w, height: img_size_h }]} />
                <Text style={[styles.TextStyle, {
                    fontSize: font_Size,
                    fontFamily: isBold ? fonts.Bold : isLightBold ? fonts.SemiBold : fonts.Medium,
                    marginTop: give_top_margin,
                    color: fontcolor,
                }]}>{t(name)}</Text>
            </View>
            <View >
                {SecondaryText ?
                    <Text style={{ color: colors.PRIMARY }}>{SecondaryText}</Text>

                    : null}
                {amount && (
                    <Text style={[styles.TextStyle, {
                        fontSize: font_Size,
                        fontFamily: isBold ? fonts.Bold : isLightBold ? fonts.SemiBold : fonts.Medium,
                        marginTop: give_top_margin,

                    }]}>{t(amount)}</Text>
                )}
            </View>
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
        justifyContent: "center", alignContent: 'center', alignSelf: 'center',
        marginBottom: hp(0.5), // Optional: Add a bottom margin to the image for consistent spacing
    },
});
