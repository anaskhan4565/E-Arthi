import { StyleSheet, TextInput } from 'react-native';
import React from 'react';
import colors from '../../util/colors';

const CustomInput = ({ placeholder, hide, w = 330, h = 50,bg_give=colors.GREAT_WHITE,b_radius=3 }) => {
  return (
    <TextInput
      style={[styles.textInputStyle, { width: w, height: h,backgroundColor:bg_give,borderRadius:b_radius }]}
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
