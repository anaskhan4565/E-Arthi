import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';

import colors from '../../../../util/colors.js';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";



const CustomImageButton = ({ name, SourceGiven, isNavigation, w = wp('6.5%'), h = hp('3.6%') }) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    if(name=='GoBack'){
      navigation.goBack()
    }else if(name){
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
    borderRadius: hp('0.8%'),
    backgroundColor: colors.WHITE,
    marginHorizontal: wp('1.6%'),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp('1.2%') },
    shadowOpacity: hp('1.3%'),
    shadowRadius: hp('1.3%'),
  },
  ImageStyle: {
    resizeMode: 'contain',
  },
});