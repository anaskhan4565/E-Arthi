import { StyleSheet, TextInput, View, Image } from 'react-native';
import React from 'react';
import colors from '../../../../util/colors.js';
import magnifierIcon from '../../../assets/CustomComponents/magnifer.png'; 

const CustomSearchApp = ({ placeholder }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInputStyle}
        placeholder={placeholder}
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
    height: 50,
    width: '90%',
    alignSelf: 'center',
    borderColor: colors.LIGHT_GRAY,
    backgroundColor: colors.GREAT_WHITE,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 4,
    elevation:4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  textInputStyle: {
    flex: 1, // Makes the TextInput take the remaining space
    fontSize: 14,
    color:colors.BLACK
  },
  iconStyle: {
    width: 20, // Adjust the size of the icon
    height: 20,
    resizeMode: 'contain',
  },
});
