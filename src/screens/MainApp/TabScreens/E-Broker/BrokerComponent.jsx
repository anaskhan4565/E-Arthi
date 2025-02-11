import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../../util/colors';
import { fonts } from '../../../../../util/FontName';
import { useTranslation } from 'react-i18next';
import { MMKV } from 'react-native-mmkv';
import { useNavigation } from '@react-navigation/native';
import ScreensName from '../../../../../util/ScreensName.ts'

const storage = new MMKV();

const BrokerComponent = ({
    specialty,
    location,
    phone,
    email,
    website,
    broker
}) => {
    const { t } = useTranslation();
    const navigation = useNavigation();

    const handlePress = () => {
        storage.set('broker', broker);
        storage.set('specialty', specialty);
        storage.set('location', location);
        storage.set('phone', phone);
        storage.set('email', email);
        storage.set('website', website);

        navigation.navigate(ScreensName.EBrokerPage);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.container} onPress={handlePress}>
                <View style={styles.header}>
                    <Text style={styles.title}>{t('Arif Habib Limited')}</Text>
                </View>
                <View style={styles.details}>
                    <Text style={styles.detailText}>{t('specialty')}: {specialty}</Text>
                    <Text style={styles.detailText}>{t("location")}: {location}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default BrokerComponent;

const styles = StyleSheet.create({
    container: {
        width: hp(20),
        height: hp(12),
        backgroundColor: '#d9fcf3',
        borderRadius: hp(0.2),
        elevation: hp(0.4),
        padding: hp(0.5),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: hp(0.5),
    },
    title: {
        fontFamily: fonts.SemiBold,
        fontSize: hp(1.7),
    },
    details: {
        marginLeft: hp(1),
    },
    detailText: {
        fontFamily: fonts.Regular,
    },
});
