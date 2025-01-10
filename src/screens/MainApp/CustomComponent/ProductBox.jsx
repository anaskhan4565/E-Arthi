import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import colors from '../../../../util/colors.js';
//import ScreensName from '../../../../util/ScreensName.js';

import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ProductBox = ({ name, price, save,old, SourceGiven, isNavigation, w = wp('40%'), h = hp('22%') }) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    if (name) {
      navigation.navigate("Product");
    }
  };

  const handleSubmit = () => {
    console.log('just a submit demo');
  };

  return (
    <TouchableOpacity style={[styles.Wrapper, { width: w, height: h }]} onPress={handleNavigation}>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Image source={SourceGiven} style={[styles.ImageStyle, { width: w / 2, height: h / 2 }]} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.TextStyle}>{name}</Text>
        <View style={styles.priceContainer}>
          <Text style={[styles.TextStyle, styles.price]}>Price: PKR{price}</Text>
          <Text style={[styles.TextStyle, styles.save]}>PKR{old}</Text>
        </View>
        <Text style={styles.TextStyle}>Save:{save}</Text>

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
    marginTop:hp('2%')
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },
  TextStyle: {
    fontWeight: 'bold',
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
    textDecorationLine:'line-through'
  },
  ImageStyle: {
    resizeMode: 'contain',
  },
});
