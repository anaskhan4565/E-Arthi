import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';

import colors from '../../../../util/colors.js';
import { useNavigation } from '@react-navigation/native';

const ProductBox = ({ name,price,save, SourceGiven, isNavigation, w = 160, h = 188 }) => {
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
    <TouchableOpacity style={[styles.Wrapper, { width: w, height: h }]}>
      <Image source={SourceGiven} style={[styles.ImageStyle, { width: w / 2, height: h / 2 }]} />
      <Text style={styles.TextStyle}>{name}</Text>
      <Text style={styles.TextStyle}>{price}</Text>
      <Text style={styles.TextStyle}>{save}</Text>

    </TouchableOpacity>
  );
};

export default ProductBox;

const styles = StyleSheet.create({
  Wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'left',
    borderRadius: 10,
    backgroundColor: colors.WHITE,
    marginHorizontal: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  TextStyle:{
    fontWeight:'bold',
    textAlign:'left',

    fontSize: 12,
  },
  ImageStyle: {
    resizeMode: 'contain',
  },
});
