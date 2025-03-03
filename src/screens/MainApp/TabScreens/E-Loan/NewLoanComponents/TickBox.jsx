import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import colors from '../../../../../../util/Constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../../../../../../util/Constants/FontName';

const TickBox = ({ TextGiven, givePadding = false }) => {
    const { t } = useTranslation();

    return (
        <View style={{ flex: 1, flexDirection: 'row', gap: hp(1) }}>
            <BouncyCheckbox
                size={20}
                fillColor={colors.GREEN}
                iconStyle={{ borderColor: colors.LIGHT_GRAY }}
                style={styles.checkbox}
                textComponent={true}
                innerIconStyle={{ borderRadius: 7 }}
            />
            <Text style={{ fontSize: hp(1.6), fontFamily: fonts.Regular, width: givePadding ? hp(30) : null }}>{t(TextGiven)}</Text>

        </View>
    )
}

export default TickBox

const styles = StyleSheet.create({})