import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import colors from '../../../../util/colors.js';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../../../../util/FontName.js';

const TransportAnalyticsBox = ({ icon, title, value, graph, percentage, w = wp('40%'), h = hp('15') }) => {
    const navigation = useNavigation();
    const { t } = useTranslation();

    return (
        <TouchableOpacity style={[styles.Wrapper, { width: w, height: h }]} >
            <Image source={icon} style={[styles.ImageStyle, { width: w / 5, height: hp(4.5) }]} />
            <Text style={styles.TextStyle}>{t(title)}</Text>
            <View style={styles.graphcontaineer}>
                <Text style={styles.valuetext}>{t(value)}</Text>
                <Image source={graph} style={[{ width: w / 3, height: hp(4), resizeMode: 'contain', marginRight: hp(8) },]} />
            </View>
            <View style={styles.percentagecontainer}>
                <Text style={styles.percentagetext}>{t(percentage)}</Text>
                <Text style={styles.comparetext}>{t(" vs last month")}</Text>
            </View>

        </TouchableOpacity>
    );
};

export default TransportAnalyticsBox;

const styles = StyleSheet.create({
    Wrapper: {
        borderRadius: hp('1.3%'),
        backgroundColor: colors.WHITE,
        marginHorizontal: hp('1.4%'),
        marginVertical: hp('1.2%'),
        padding: hp('1%'),
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        //marginLeft: wp(7),
    },
    TextStyle: {
        fontFamily: fonts.Medium,
        fontSize: hp('1.7%'),
        marginVertical: hp('0.5%'),
    },
    valuetext: {
        fontFamily: fonts.SemiBold,
        fontWeight: 'bold',
        fontSize: hp(3.5),
        marginRight: wp('2%'),
        fontFamily: fonts.Regular,
    },
    ImageStyle: {
        resizeMode: 'contain',
        justifyContent: 'flex-start',
        marginRight: wp(10),
    },
    graphcontaineer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: hp('0.5%'),
    },
    percentagecontainer: {
        flexDirection: 'row',
    },
    percentagetext: {
        fontSize: hp(1.6),
        color: colors.GREEN,
        fontFamily: fonts.Regular,
    },
    comparetext: {
        fontSize: hp(1.6),
        fontFamily: fonts.Regular,
    },
});

