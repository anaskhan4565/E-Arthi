import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import colors from '../../../../util/colors.js';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../../../../util/FontName.js';
import Image4 from '../../../assets/MainApp/E-Inventory/E-Inventory-Monitoring/blank.png';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import arrow from '../../../assets/rightarrowhead.png'

const InventoryProduct = ({secTextWidth=hp(2.3) ,gapGiven,allowImg = true,SecondaryText='Nothing', name, isNavigation, w = wp('90%'), h = hp('10%'), navigateTo }) => {
    const navigation = useNavigation();
    const { t } = useTranslation()

    const handleNavigation = () => {
        if (isNavigation) {
            console.log('Navigating to:', name);
            navigation.navigate(navigateTo)
        }
    };

    const handleSubmit = () => {
        console.log('just a submit demo');
    };

    return (
        <TouchableOpacity style={[styles.Wrapper, { width: w, height: h }]} onPress={handleNavigation}>
            <View style={styles.rowContainer}>
                {allowImg ?
                    <View style={styles.imageContainer}>
                        <Image source={Image4} style={styles.ImageStyle} />
                    </View>
                    : null
                }
                <View style={[styles.textContainer,{marginLeft:!allowImg?hp(2):null}]}>
                    <Text style={styles.TextStyle}>{t(name)}</Text>
                </View>

                {!allowImg ?
                    <View style={[styles.arrowContainer, { marginRight: hp(2), alignItems: "center", justifyContent: 'center' }]}>

                        <Text style={[styles.TextStyle, { paddingRight: hp(1),fontSize:secTextWidth }]}>{SecondaryText}</Text>
                        <Image source={arrow} styles={{ width: wp(3), height: hp(3) }} />
                    </View>

                    :
                    <View style={[styles.arrowContainer, { marginRight: hp(2), alignItems: "center", justifyContent: 'center' }]}>

                        <Image source={arrow} styles={{ width: wp(3), height: hp(3) }} />
                    </View>

                }
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
        backgroundColor: colors.WHITE,
        // marginHorizontal: hp('1%'),
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
        justifyContent: 'center'
    },
    arrowContainer: {
        flex: 0.3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextStyle: {
        fontFamily: fonts.SemiBold,
        fontSize: hp(2.3),
        marginTop: hp(0.9),
    },
    descriptionText: {
        fontSize: 10,
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
        fontFamily: fonts.Bold
    },
});
