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
  hide,
  w = wp('85%'),
  h = hp('5.5%'),
  bg_give = colors.GREAT_WHITE,
  b_radius = 3,
  editable = true,
  value,
  onChangeText,
  numericOnly = false, // New prop to enable numeric input
}) => {
  const handleTextChange = (text) => {
    if (numericOnly) {
      const numericText = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
      onChangeText(numericText);
    } else {
      onChangeText(text);
    }
  };

  return (
    <TextInput
      style={[
        styles.textInputStyle,
        { width: w, height: h, backgroundColor: bg_give, borderRadius: b_radius },
      ]}
      placeholder={placeholder}
      placeholderTextColor={colors.LIGHT_GRAY}
      secureTextEntry={hide === 1}
      editable={editable}
      value={value}
      onChangeText={handleTextChange} // Updated handler
      keyboardType={numericOnly ? 'numeric' : 'default'} // Numeric keyboard for numbers
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
    color: colors.BLACK,
    borderColor: colors.LIGHT_GRAY,
  },
});
