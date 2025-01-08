import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import colors from '../../../../util/colors.js';
import { useNavigation } from '@react-navigation/native';

const ProductBox = ({ name, price, save,old, SourceGiven, isNavigation, w = 160, h = 188 }) => {
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
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.5 }}>
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
    textAlign: 'left',
    borderRadius: 10,
    backgroundColor: colors.WHITE,
    marginHorizontal: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textContainer: {
    rowGap: 5,
    margin: 6,
  },
  priceContainer: {
    flexDirection: 'row', // Ensures items are in a row
    justifyContent: 'space-between', // Spaces items evenly
    alignItems: 'center', // Aligns items vertically in the center
  },
  TextStyle: {
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 10,
  },
  price: {
    flex: 1, // Allows the text to take up space equally
    textAlign: 'left', // Align the first price text to the left
},
  save: {
    flex: 1, // Allows the text to take up space equally
    textAlign: 'right', // Align the second price text to the right
    color: 'red', // Optional: Color for the save text
  },
  ImageStyle: {
    resizeMode: 'contain',
  },
});
