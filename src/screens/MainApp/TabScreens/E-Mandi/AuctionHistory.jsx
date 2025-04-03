import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';

import Navbar from '../../Navbar/Navbar.jsx';
import { fonts } from '../../../../../util/Constants/FontName.js';
import colors from '../../../../../util/Constants/colors.js';

function AuctionHistory() {
    const { t } = useTranslation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar hasBackButton={true} />
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>{t('Auction History')}</Text>
                <Text style={styles.subtitle}>{t('View your past auction activities')}</Text>

                {/* Content will be added as per requirements */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    navbarContainer: {
        height: hp('8.5%'),
        backgroundColor: colors.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GRAY,
    },
    content: {
        flex: 1,
        padding: hp(3),
    },
    title: {
        fontSize: hp(3),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp(1),
    },
    subtitle: {
        fontSize: hp(2),
        fontFamily: fonts.Regular,
        color: colors.GRAY,
    },
});

export default AuctionHistory; 