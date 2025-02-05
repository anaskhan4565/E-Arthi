import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import colors from '../../../../../util/colors.js';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../../../../../util/FontName.js';
import Image4 from '../../../../assets/MainApp/E-Inventory/E-Inventory-Monitoring/blank.png';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const InventoryProduct = ({ name, price, isNavigation, w = wp('80%'), h = hp('30%'),navigateTo }) => {
      const navigation = useNavigation();
        const { t } = useTranslation()
    
    const handleNavigation = () => {
        if (isNavigation) {
            navigation.navigate(navigateTo)
        }
    };

    const handleSubmit = () => {
        console.log('just a submit demo');
    };

    return (
        <TouchableOpacity style={[styles.Wrapper, { width: wp(90), height: hp(10) }]}onPress={handleNavigation}>
            <View style={styles.rowContainer}>
                <View style={styles.imageContainer}>
                    <Image source={Image4} style={styles.ImageStyle} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.TextStyle}>{t(name)}</Text>
                    <Text style={styles.descriptionText}>{t("Introducing BRINC Ball transforming rescue and tactical operations.")}</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceText}>{t('PKR')} {price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default InventoryProduct;

const styles = StyleSheet.create({
    Wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 4,
        borderRadius: hp('1.3%'),
        backgroundColor: colors.LIGHT_GREEN,
        marginHorizontal: hp('1.4%'),
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 2 },
        shadowOpacity: 4.2,
        shadowRadius: 9,
        marginTop: hp(1),
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    imageContainer: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flex: 0.7,
    },
    priceContainer: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextStyle: {
        fontFamily: fonts.SemiBold,
        fontSize: hp(2.3),
        marginTop: hp(0.9),
    },
    descriptionText: {
        fontSize: hp(1.4),
    },
    ImageStyle: {
        resizeMode: 'contain',
        width: wp(15),
        height: hp(7),
    },
    priceText: {
        textAlign: 'center',
        color: colors.DARK_GREEN,
        fontWeight: 'bold',
        fontFamily:fonts.bold,
        fontSize: hp(1.6),
    },
});
