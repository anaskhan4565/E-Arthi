import { StyleSheet, TextInput } from 'react-native';
import React from 'react';
import colors from '../../util/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { fonts } from '../../util/FontName';
const CustomInput = ({ placeholder, hide, w = wp('85%'), h = hp('5.5%'), bg_give = colors.GREAT_WHITE, b_radius = 3 }) => {
  return (
    <TextInput
      style={[styles.textInputStyle, { width: w, height: h, backgroundColor: bg_give, borderRadius: b_radius }]}
      placeholder={placeholder}
      placeholderTextColor={colors.LIGHT_GRAY}
      secureTextEntry={hide == 1 ? true : false}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  textInputStyle: {
    fontSize: hp('1.7%'),
    alignSelf: 'center',
    borderColor: colors.GREAT_WHITE,
    borderWidth: 1,
    fontFamily: fonts.Regular,
    //backgroundColor: colors.GREAT_WHITE,
    // borderRadius: 3,
    color: colors.BLACK,
    borderColor: colors.LIGHT_GRAY,
  },
});
