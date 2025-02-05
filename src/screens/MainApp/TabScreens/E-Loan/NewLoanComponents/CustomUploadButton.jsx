import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import CustomInput from '../../../../../components/CustomInput'
import colors from '../../../../../../util/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../../../../../../util/FontName';
import CustomButton from '../../../../../components/CustomButton';
import { useTranslation } from 'react-i18next';
import UplodPic from '../AssetsLoan/Upload.png';
import CameraPic from '../AssetsLoan/Camera.png'
const CustomUploadButton = ({isCamera=false,NoPic=false,givePad=false,padAllow=false, PlaceHolderGiven = "demo", InputHolder = "Upload", tx_color = colors.WHITE }) => {
    const { t } = useTranslation();
    return (
        <View style={{ flex: 1, alignItems: 'flex-start', gap: hp(0.5) }}>
            <View style={{flex:1,flexDirection:'row',gap:hp(1)}}>
                <Text style={{ fontSize: hp(2), fontFamily: fonts.Regular,width:givePad?hp(30):null }}>{t(PlaceHolderGiven)}</Text>
                <Image source={isCamera?CameraPic:!NoPic?UplodPic:null} style={{width:hp(3.5),height:hp(3.1), resizeMode: 'contain'}}/>
            </View>
            <CustomButton BgGiven={colors.GREEN} MainText={InputHolder} txColor={tx_color} />
        </View>

    )
}

export default CustomUploadButton

const styles = StyleSheet.create({})