import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';

import colors from '../../../../util/colors.js';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../../../../util/FontName.js';

const ItemBox = ({ name, SourceGiven, isNavigation, w = wp('19%'), h = hp('8.5') }) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    if (name) {
      console.log('navigating to ',name)
      navigation.navigate(name);
    }
  };

  const handleSubmit = () => {
    console.log('just a submit demo');
  };

  return (
    <TouchableOpacity style={[styles.Wrapper, { width: w, height: h }]} onPress={handleNavigation}>
      <Image source={SourceGiven} style={[styles.ImageStyle, { width: w / 2, height: h / 2 }]} />
      <Text style={styles.TextStyle}>{name}</Text>
    </TouchableOpacity>
  );
};

export default ItemBox;

const styles = StyleSheet.create({
  Wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp('1.3%'),
    backgroundColor: colors.WHITE,
    marginHorizontal: hp('1.4%'),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  TextStyle:{
    fontFamily:fonts.Medium,
    fontSize:hp('1.3%') ,
  },
  ImageStyle: {
    resizeMode: 'contain',
  },
});
