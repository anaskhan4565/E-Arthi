import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import colors from '../../util/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../assets/Icon/Logo-only.png';
import VectorMen from '../assets/AboutMoreicons/Vectormen.png';
import CustomButton from '../components/CustomButton';
import ScreensName from '../../util/ScreensName';
import { useTranslation } from 'react-i18next';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { fonts } from '../../util/FontName';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const AboutMore = () => {
    const [selectedCard, setSelectedCard] = useState('Farmer');
    // Default selection is 'Farmer'
    const { t } = useTranslation();
    return (
        <SafeAreaView style={styles.MainContainer}>
            <View style={{ flex: 0.74, backgroundColor: colors.WHITE }}>
                {/* Logo Section */}
                <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={Logo} resizeMode="contain" style={{height:hp(20),width:wp(200),marginLeft:hp(2.2)}} />
                    <Text style={{ fontSize: hp(4.5), textAlign: 'center', fontWeight: 'bold', fontFamily: fonts.Medium, letterSpacing: 4 }}>{t('E-Arthi').toUpperCase()}</Text>
                </View>

                {/* Content Section */}
                <View style={styles.contentContainer}>
                    <Text style={styles.headerText}>{t('Tell us more about you')}</Text>

                    {/* Row of Items */}
                    <View style={{ flexDirection: 'row' }}>
                        {/* Farmer Card */}
                        <TouchableOpacity
                            style={[
                                styles.card,
                                selectedCard === 'Farmer' && { borderColor: colors.GREEN, borderWidth: 2 },
                            ]}
                            onPress={() => setSelectedCard('Farmer')}
                        >
                            <Image source={VectorMen} style={styles.vectorLogo} />
                            <Text style={styles.cardText}>{t('Farmer')}</Text>
                        </TouchableOpacity>

                        {/* Dealer Card */}
                        <TouchableOpacity
                            style={[
                                styles.card,
                                selectedCard === 'Dealer' && { borderColor: colors.GREEN, borderWidth: 2 },
                            ]}
                            onPress={() => setSelectedCard('Dealer')}
                        >
                            <Image source={VectorMen} style={styles.vectorLogo} />
                            <Text style={styles.cardText}>{t('Vender')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Footer Section */}
            <View style={{ flex: 0.3, alignItems: 'center' }}>
                <CustomButton BgGiven={colors.GREEN} MainText={t('Continue')} txColor={colors.WHITE} isNavigation={true} name={ScreensName.SignUp} />
            </View>
        </SafeAreaView>
    );
};

export default AboutMore;

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor:colors.WHITE,
        marginTop: hp(3),
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: hp(1),
    },
    logo: {
        width: wp(40),
        height: hp(30),
        resizeMode: 'contain',
    },
    contentContainer: {
        flex: 0.5,
        margin: hp(2),
    },
    headerText: {
        textAlign: 'center',
        fontSize: hp('2.5%'),
        fontFamily:fonts.Regular,
        marginBottom: hp(1),
    },
    card: {
        flex: 1,
        marginHorizontal: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray', 
        borderRadius: 10,
        width: wp('30%'),
        height: hp('13%'), 
    },
    vectorLogo: {
        width: wp(10),
        height: hp(9),
        resizeMode: 'contain',
    },
    cardText: {
        marginTop: 5,
        fontSize: hp(2),
        fontFamily:fonts.Regular,
        textAlign: 'center',
        fontFamily: fonts.Medium
    },
});