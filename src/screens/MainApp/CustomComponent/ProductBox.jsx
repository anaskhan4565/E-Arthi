import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import colors from '../../../../util/colors.js';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../../../../util/FontName.js';
import ScreensName from '../../../../util/ScreensName.ts';
import { useTranslation } from 'react-i18next';
import AddImg from './TempImages/AddImg.png';

const ProductBox = ({ name, price, save, old, SourceGiven, isNavigation, w = wp('40%'), h = hp('22%'), onPressG }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handlePress = () => {
    if (name) {
      navigation.navigate(ScreensName.ProductScr);
    }
  };
  const HandleAddPress=()=>{
    if(onPressG){
      onPressG()
    }
  }

  return (
    <TouchableOpacity style={[styles.Wrapper, { width: w, height: h }]} onPress={handlePress}>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'row', marginTop: hp(0.4) }}>
        <Image source={SourceGiven} style={[styles.ImageStyle, { width: w / 2, height: h / 2 }]} />
        <TouchableOpacity style={{ position: 'absolute', top: hp(1), right: hp(2) }}onPress={HandleAddPress}>
          <Image source={AddImg} style={{ width: hp(2.5), height: hp(2.5) }}  />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.TextStyle}>{t(name)}</Text>
        <View style={styles.priceContainer}>
          <Text style={[styles.TextStyle, styles.price]}>{t('Price')}: PKR{price}</Text>
          <Text style={[styles.TextStyle, styles.save]}>{t('PKR')}{t(old)}</Text>
        </View>
        <Text style={styles.TextStyle}>{t('Save')}: {t(save)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductBox;

const styles = StyleSheet.create({
  Wrapper: {
    borderRadius: 10,
    backgroundColor: colors.WHITE,
    marginHorizontal: hp('0.5%'),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textContainer: {
    rowGap: hp('1%'),
    margin: hp('0.5%'),
    marginTop: hp('2%'),
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TextStyle: {
    fontFamily: fonts.Medium,
    textAlign: 'left',
    fontSize: hp('1.2%'),
  },
  price: {
    flex: 1,
    textAlign: 'left',
  },
  save: {
    flex: 1,
    textAlign: 'right',
    color: 'red',
    textDecorationLine: 'line-through',
  },
  ImageStyle: {
    resizeMode: 'contain',
    marginTop: hp(1),
  },
});
