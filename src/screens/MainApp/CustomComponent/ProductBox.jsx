import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import colors from '../../../../util/Constants/colors.js';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../../../../util/Constants/FontName.js';
import ScreensName from '../../../../util/Constants/ScreensName.ts';
import { useTranslation } from 'react-i18next';
import AddImg from './TempImages/AddImg.png';
import { MMKV } from 'react-native-mmkv';

const ProductBox = ({ AddIcon = true, name,
  price, save, old, SourceGiven,
  backColor = colors.WHITE,
  isNavigation, w = wp('40%'),
  h = hp('28%'), onPressG, iscentered = null

}) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const ProductClickInfo = new MMKV();

  const handlePress = () => {
    if (name) {
      const productData = JSON.stringify({ name, price, save, old, SourceGiven });
      ProductClickInfo.set('selectedProduct', productData);
      navigation.navigate(ScreensName.ProductScr);
    }
  };

  const HandleAddPress = () => {
    if (onPressG) {
      onPressG();
    }
  };

  return (
    <TouchableOpacity style={[styles.Wrapper, { width: w, height: h, backgroundColor: backColor }]} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image
          source={SourceGiven ? { uri: SourceGiven } : require('./TempImages/AddImg.png')}
          style={styles.ImageStyle}
        />      {AddIcon && (
          <TouchableOpacity style={styles.addIcon} onPress={HandleAddPress}>
            <Image source={AddImg} style={styles.addIconImage} />
          </TouchableOpacity>
        )}
      </View>
      <View style={[styles.textContainer, { alignItems: iscentered ? 'center' : null }]}>
        <Text style={[styles.TextStyle2, , { fontSize: iscentered ? hp(2) : null, fontFamily: iscentered ? fonts.Bold : null }]} numberOfLines={2} ellipsizeMode="tail">
          {t(name)}
        </Text>
        <View style={[styles.priceContainer]}>
          <Text style={[styles.TextStyle, styles.price, { textAlign: iscentered ? 'center' : null, fontSize: iscentered ? hp(1.4) : hp(1) }]}>{t('Price')}: PKR {price}</Text>
          {old != null ?

            <Text style={[styles.TextStyle, styles.save]}>{t('PKR')}{t(old)}</Text>
            : null}
        </View>
        {save != null ?
          <Text style={styles.TextStyle}>{t('Save')}: {t(save)}</Text>
          : null
        }
      </View>
    </TouchableOpacity>
  );
};

export default ProductBox;

const styles = StyleSheet.create({
  Wrapper: {
    borderRadius: 10,
    marginHorizontal: hp('0.5%'),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginTop: hp(0.4),
    overflow: 'hidden',
  },
  addIcon: {
    position: 'absolute',
    top: hp(1),
    right: hp(1),
  },
  addIconImage: {
    width: hp(2.5),
    height: hp(2.5),
  },
  textContainer: {
    paddingHorizontal: hp('1%'),
    paddingBottom: hp('1.5%'),
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TextStyle: {
    fontFamily: fonts.Medium,
    textAlign: 'left',
    fontSize: hp('1%'),
  },
  TextStyle2: {
    fontFamily: fonts.Medium,
    textAlign: 'left',
    fontSize: hp('1.4%'),
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
    width: wp('30%'),
    height: hp('14%'),
    resizeMode: 'contain',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});