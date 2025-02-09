import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomInput from '../../../../../components/CustomInput'
import { Input } from '@ant-design/react-native'
import colors from '../../../../../../util/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../../../../../../util/FontName';
import { useTranslation } from 'react-i18next';

const CustomInputAndText = ({PlaceHolderGiven="demo",InputHolder="Enter Detail",OnlyNN=false}) => {
  const { t } = useTranslation();
  return (
    <View style={{flex:1,alignItems:'flex-start',gap:hp(0.5)}}>
      <Text style={{fontSize:hp(2),fontFamily:fonts.Regular,paddingLeft:hp(0.3)}}>{t(PlaceHolderGiven)}</Text>
      <CustomInput placeholder={t(InputHolder)} bg_give={colors.WHITE}  placeholder_color={colors.Text_Fancy} AllowNumberOnly={OnlyNN}/>

    
    </View>
  )
}

export default CustomInputAndText

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY,
    alignSelf: 'center',
    borderRadius: 3,
    padding: 5,
    width: wp('85%'),
    height: hp('5.5%'),
    color: colors.BLACK,
  },
  input: {
    paddingLeft: wp('1%'),
    fontSize: wp('1%'),
    color: colors.BLACK,
    fontFamily: fonts.Bold
  },
})
