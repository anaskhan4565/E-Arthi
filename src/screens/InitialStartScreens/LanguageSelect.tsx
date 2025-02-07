import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import colors from '../../../util/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../assets/Icon/Logo-only.png';
import Langsymb from '../../assets/Vector.svg';
import GreenLangSymb from '../../assets/langgreen.svg';
import CustomButton from '../../components/CustomButton';
import ScreensName from '../../../util/ScreensName.ts';
import { useTranslation } from 'react-i18next';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { fonts } from '../../../util/FontName.js';
import { useNavigation } from '@react-navigation/native';

const AboutMore = () => {
    const [selectedCard, setSelectedCard] = useState('');
    const navigation = useNavigation();
    const { t } = useTranslation();
    const { i18n } = useTranslation();

    const handleCardPress = (language: string) => {
        setSelectedCard(language);
        i18n.changeLanguage(language);
        navigation.navigate(ScreensName.Connect);
    };

    return (
        <SafeAreaView style={styles.MainContainer}>
            <View style={{ flex: 0.74, backgroundColor: colors.WHITE }}>
                <View style={{ flex: 1.3, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={Logo} resizeMode="contain" style={{ height: hp(20), width: wp(200), marginLeft: hp(2.2) }} />
                    <Text style={{ fontSize: hp(5), textAlign: 'center', letterSpacing: hp(0.9), fontFamily: fonts.Bold }}>{t('E-AGRI')}</Text>
                    <Text style={styles.headerText}>{t('Select Your Preferred Language')}</Text>
                </View>
                <View style={styles.contentContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={[
                                styles.card,
                                selectedCard === 'en' && { borderColor: colors.GREEN, borderWidth: 2 },
                            ]}
                            onPress={() => handleCardPress('en')}
                        >
                            {selectedCard === 'en' ? (
                                <GreenLangSymb width={wp(10)} height={hp(5)} />
                            ) : (
                                <Langsymb width={wp(10)} height={hp(4)}  />
                            )}
                            <Text style={styles.cardText}>{t('English')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.card,
                                selectedCard === 'ur' && { borderColor: colors.GREEN, borderWidth: 2 },
                            ]}
                            onPress={() => handleCardPress('ur')}
                        >
                            {selectedCard === 'ur' ? (
                                <GreenLangSymb width={wp(10)} height={hp(4)} />
                            ) : (
                                <Langsymb width={wp(10)} height={hp(4)} />
                            )}
                            <Text style={styles.cardText}>اردو</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={[
                                styles.card,
                                selectedCard === 'sin' && { borderColor: colors.GREEN, borderWidth: 2 },
                            ]}
                            onPress={() => handleCardPress('sin')}
                        >
                            {selectedCard === 'sin' ? (
                                <GreenLangSymb width={wp(10)} height={hp(4)}  />
                            ) : (
                                <Langsymb width={wp(10)} height={hp(4)}  />
                            )}
                            <Text style={styles.cardText}>سنڌي</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.card,
                                selectedCard === 'psh' && { borderColor: colors.GREEN, borderWidth: 2 },
                            ]}
                            onPress={() => handleCardPress('psh')}
                        >
                            {selectedCard === 'psh' ? (
                                <GreenLangSymb width={wp(10)} height={hp(4)}  />
                            ) : (
                                <Langsymb width={wp(10)} height={hp(4)}  />
                            )}
                            <Text style={styles.cardText}>پښتو</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default AboutMore;

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    contentContainer: {
        flex: 0.3,
        margin: hp(2),
        gap: hp(1.5),
    },
    headerText: {
        textAlign: 'center',
        fontSize: hp('2.5%'),
        fontFamily: fonts.Regular,
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
    cardText: {
        marginTop: hp(0.6),
        fontSize: hp(2.5),
        fontFamily: fonts.Regular,
        textAlign: 'center'
    },
});
