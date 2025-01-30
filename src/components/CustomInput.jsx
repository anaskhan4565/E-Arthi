import { StyleSheet, TextInput } from 'react-native';
import React from 'react';
import colors from '../../util/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { fonts } from '../../util/FontName';

const CustomInput = ({
  placeholder,
  hide = false,
  w = wp('85%'),
  h = hp('5.5%'),
  bg_give = colors.GREAT_WHITE,
  b_radius = 3,
  editable = true,
  value,
  placeholder_color = colors.LIGHT_GRAY,
  onChangeText = () => {},
  numericOnly = false,
  borderColor = colors.LIGHT_GRAY,
}) => {
  const handleTextChange = (text) => {
    if (numericOnly) {
      const numericText = text.replace(/[^0-9]/g, '');
      onChangeText(numericText);
    } else {
      onChangeText(text);
    }
  };

  return (
    <TextInput
      style={[
        styles.textInputStyle,
        { 
          paddingLeft: wp(2),
          width: w,
          height: h,
          backgroundColor: bg_give,
          borderRadius: b_radius,
          borderColor: borderColor,
        },
      ]}
      placeholder={placeholder}
      placeholderTextColor={placeholder_color}
      secureTextEntry={hide}
      editable={editable}
      value={value}
      onChangeText={handleTextChange}
      keyboardType={numericOnly ? 'numeric' : 'default'}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  textInputStyle: {
    fontSize: wp('3.8%'),
    alignSelf: 'center',
    borderWidth: 1,
    fontFamily: fonts.Regular,
    color: colors.BLACK,
  },
});