import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../util/Constants/colors.js';
import { fonts } from '../../../../util/Constants/FontName.js';
import { useTranslation } from 'react-i18next';

/**
 * DashboardBox component
 * @param {string} name - The title to display below the image
 * @param {React.ReactNode} svgImage - The SVG image component to display
 * @param {Object} style - Additional styles to apply to the container
 * @param {Function} onPress - Function to call when box is pressed
 * @param {boolean} isNavigation - Whether this box should navigate
 * @param {number} w - Width of the box (default: 23% of screen width)
 * @param {number} h - Height of the box (default: 12% of screen height)
 * @returns {React.ReactNode}
 */
const DashboardBox = ({
    name,
    svgImage,
    style,
    onPress,
    isNavigation = false,
    w = wp('23%'),
    h = hp('12%')
}) => {
    const { t } = useTranslation();

    const handlePress = () => {
        if (onPress) {
            onPress();
        }
    };

    return (
        <TouchableOpacity
            style={[styles.container, { width: w, height: h }, style]}
            onPress={handlePress}
            disabled={!onPress && !isNavigation}
        >
            <View style={styles.imageContainer}>
                {svgImage}
            </View>
            <Text style={styles.title}>{t(name)}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE,
        borderRadius: hp('1.3%'),
        // padding: hp('1%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: hp('0.7%'),
        // marginVertical: hp('0.7%'),
        flex: 1,
    },
    imageContainer: {
        // marginBottom: hp('1%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: hp('1.7%'),
        fontFamily: fonts.SemiBold,
        textAlign: 'center',
    },
});

export default DashboardBox;
