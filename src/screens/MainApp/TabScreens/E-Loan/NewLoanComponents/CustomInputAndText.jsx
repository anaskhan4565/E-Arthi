import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomInput from '../../../../../components/CustomInput'
import colors from '../../../../../../util/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../../../../../../util/FontName';

const CustomInputAndText = ({PlaceHolderGiven="demo",InputHolder="Enter Detail"}) => {
  return (
    <View style={{flex:1,alignItems:'flex-start',gap:hp(0.5)}}>
      <Text style={{fontSize:hp(2),fontFamily:fonts.Regular,paddingLeft:hp(0.1)}}>{PlaceHolderGiven}</Text>
      <CustomInput placeholder={InputHolder} bg_give={colors.WHITE}  placeholder_color={colors.Text_Fancy}/>
    </View>

  )
}

export default CustomInputAndText

const styles = StyleSheet.create({})