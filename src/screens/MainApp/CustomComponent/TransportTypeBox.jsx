import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import colors from '../../../../util/colors.js';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../../../../util/FontName.js';

const TransportTypeBox = ({ name, SourceGiven, isNavigation,screen, w = wp('21%'), h = hp('8.5') }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const handleNavigation = () => {
    if (screen) {
      navigation.navigate(screen);
    }
  };

  const handleSubmit = () => {
    console.log('just a submit demo');
  };

  return (
    <TouchableOpacity style={[styles.Wrapper, { width: w, height: h }]} onPress={isNavigation ? handleNavigation:handleSubmit}>
      <Image source={SourceGiven} style={[styles.ImageStyle, { width: w / 2, height: hp(4.5)}]} />
      <Text style={styles.TextStyle}>{t(name)}</Text>
    </TouchableOpacity>
  );
};

export default TransportTypeBox;

const styles = StyleSheet.create({
  Wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp('1.3%'),
    backgroundColor: colors.WHITE,
    marginHorizontal: hp('1.4%'),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  TextStyle:{
    fontFamily:fonts.Medium,
    fontSize:hp('1.8%') ,
  },
  ImageStyle: {
    resizeMode: 'contain',
  },
});
