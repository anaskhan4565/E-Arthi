import { StyleSheet, TextInput, View, Image } from 'react-native';
import React from 'react';
import colors from '../../../../util/colors.js';
import magnifierIcon from '../../../assets/CustomComponents/magnifer.png'; 

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { fonts } from '../../../../util/FontName.js';
import { useTranslation } from 'react-i18next';


const CustomSearchApp = ({ placeholder }) => {
    const { t } = useTranslation();
  
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInputStyle}
        placeholder={t(placeholder)}
        placeholderTextColor={colors.LIGHT_GRAY}
      />
      <Image source={magnifierIcon} style={styles.iconStyle} />
    </View>
  );
};

export default CustomSearchApp;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp('5%'),
    width: wp('85%'),
    alignSelf: 'center',
    borderColor: colors.LIGHT_GRAY,
    backgroundColor: colors.WHITE,
    borderRadius: 5,
    paddingHorizontal: hp('1%'),
    marginHorizontal: hp('2%'),
    elevation:4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  textInputStyle: {
    flex: 1, // Makes the TextInput take the remaining space
    fontSize: hp('1.5%'),
    fontFamily:fonts.Regular,
    color:colors.BLACK
  },
  iconStyle: {
    width: wp('4.5%'), // Adjust the size of the icon
    height: hp('4.5%'),
    resizeMode: 'contain',
  },
});
