import { StyleSheet, TextInput, Dimensions } from 'react-native';
import React from 'react';
import colors from '../../util/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { height, width } = Dimensions.get("window");
const isTablet = width > 600;


const CustomInput = ({ placeholder, hide, w = wp("85%"), h = isTablet ? hp('6.7%') : hp('5.7%'), bg_give = colors.GREAT_WHITE, b_radius = 3 }) => {
  return (
    <TextInput
      style={[styles.textInputStyle, { width: w, height: h, backgroundColor: bg_give, borderRadius: b_radius }]}
      placeholder={placeholder}
      secureTextEntry={hide == 1 ? true : false}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  textInputStyle: {
    fontSize: 16,
    alignSelf: 'center',
    borderColor: colors.GREAT_WHITE,
    borderWidth: 1,
    //backgroundColor: colors.GREAT_WHITE,
    // borderRadius: 3,
    borderColor: colors.LIGHT_GRAY,
  },
});
