import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomInput from '../../../../../components/CustomInput'
import colors from '../../../../../../util/Constants/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../../../../../../util/Constants/FontName';
import CustomPicker from '../../../EMandi/CustomComp/CustomPicker';
import { useTranslation } from 'react-i18next';

const CustomTxtAndPicker = ({ PlaceHolderGiven = "demo", itemPackage, Picker_Txt = "Select" }) => {
    const { t } = useTranslation();
    return (
            <CustomPicker items={itemPackage}
                key={0} isheader={false}
                w_given={wp(85)}
                hp_given={hp(3.5)}
                min_given={hp(39)}
                bg_color_on={true}
                bd_give={true}
                color_bd={colors.BLACK}
                isThatColor={true}
                placeholder={t(Picker_Txt)}
            />


    )
}

export default CustomTxtAndPicker

const styles = StyleSheet.create({})