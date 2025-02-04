import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomInput from '../../../../../components/CustomInput'
import colors from '../../../../../../util/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../../../../../../util/FontName';
import CustomPicker from '../../../EMandi/CustomComp/CustomPicker';
import { useTranslation } from 'react-i18next';

const CustomTxtAndPicker = ({ PlaceHolderGiven = "demo", itemPackage,Picker_Txt="Select" }) => {
    const { t } = useTranslation();
    return (
        <View style={{ flex: 1, alignItems: 'flex-start', gap: hp(0.5) }}>
            <Text style={{ fontSize: hp(2), fontFamily: fonts.Regular,paddingLeft:hp(0.1) }}>{t(PlaceHolderGiven)}</Text>
            <CustomPicker items={itemPackage}
             key={0} isheader={false}
                w_given={hp(39)}
                hp_given={hp(3)}
                min_given={hp(39)}
                bg_color_on={true}
                bd_give={true}
                color_bd={colors.BLACK}
                isThatColor={true}
                placeholder={t(Picker_Txt)}
            />

        </View>

    )
}

export default CustomTxtAndPicker

const styles = StyleSheet.create({})