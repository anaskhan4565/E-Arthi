import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';

import colors from '../../../../util/colors.js';
import { useNavigation } from '@react-navigation/native';

const CustomImageButton = ({ name, SourceGiven, isNavigation, w = 38, h = 38 }) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    if (name) {
      navigation.navigate(name);
    }
  };

  const handleSubmit = () => {
    console.log('just a submit demo');
  };

  return (
    <TouchableOpacity style={[styles.Wrapper, { width: w, height: h }]} onPress={isNavigation?handleNavigation:handleSubmit} >
      <Image source={SourceGiven} style={[styles.ImageStyle, { width: w / 2, height: h / 2 }]} />
    </TouchableOpacity>
  );
};

export default CustomImageButton;

const styles = StyleSheet.create({
  Wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.WHITE,
    marginHorizontal: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  ImageStyle: {
    resizeMode: 'contain',
  },
});