import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import colors from '../../util/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../assets/Icon/Logo.png';
import VectorMen from '../assets/AboutMoreicons/Vectormen.png';
import CustomButton from '../components/CustomButton';
import ScreensName from '../../util/ScreensName';
import { useTranslation } from 'react-i18next';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const AboutMore = () => {
    const [selectedCard, setSelectedCard] = useState('Farmer'); 
    // Default selection is 'Farmer'
    const {t} = useTranslation();
    return (
        <SafeAreaView style={styles.MainContainer}>
            <View style={{ flex: 0.74,backgroundColor:colors.WHITE }}>
                {/* Logo Section */}
                <View style={styles.logoContainer}>
                    <Image source={Logo} style={styles.logo} />
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
        marginTop: hp(4),
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: hp(2),
    },
    logo: {
        width: wp(40),
        height: hp(20),
        resizeMode: 'contain',
    },
    contentContainer: {
        flex: 0.5,
        margin: hp(2),
    },
    headerText: {
        textAlign: 'center',
        fontSize: hp(2.3),
        marginBottom: hp(2),
    },
    card: {
        flex: 1,
        marginHorizontal: hp(2),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray', 
        borderRadius: hp(1),
        width: wp(20),
        height: hp(13), 
    },
    vectorLogo: {
        width: wp(30),
        height: hp(6),
        resizeMode: 'contain',
    },
    cardText: {
        marginTop: hp(1),
        fontSize: hp(2),
        textAlign: 'center',
    },
});
