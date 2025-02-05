import React, { useState } from 'react';
import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../util/colors.js';

import {
  SafeAreaView,
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,

} from 'react-native';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../../../../util/FontName.js';
import ScreensName from '../../../../../util/ScreensName.ts';
import CustomButton from '../../../../components/CustomButton.jsx';
import { useNavigation } from '@react-navigation/native';
import InventoryProduct from '../../CustomComponent/InventoryComponents/InventoryProduct.jsx';



function EOrderPlaceOrder(): React.JSX.Element {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState('Crop');
  const navigation = useNavigation();

  // New JSON variable for products
  const products = [
    { name: 'Guava', category: 'Fruits', price: 1500, quantity: 10 },
    { name: 'Spinach', category: 'Vegetables', price: 2000, quantity: 5 },
    { name: 'Milk', category: 'Dairy', price: 3000, quantity: 8 },
  ];

  // Function to update quantity
  const updateQuantity = (index: number, change: number) => {
    const newProducts = [...products];
    newProducts[index].quantity = Math.max(0, newProducts[index].quantity + change);
    // Update state or handle the newProducts as needed
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.searchContainer}>
          <CustomSearchApp placeholder={t('Search in here')} />
        </View>

        <View style={{ marginBottom: hp(1.2), marginTop: hp(0), marginHorizontal: wp(5), }}>
          <Text style={{ fontFamily: fonts.SemiBold, fontSize: hp(2.4) }}>
            {t('Your Order')}
          </Text>
        </View>
        <View style={styles.bodyContainer}>

          {products.map((product, index) => (
            <View key={index} style={styles.productRow}>
              <Text style={styles.productText}>{product.name} - ₨{product.price.toFixed(2)}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => updateQuantity(index, -1)}>
                  <Text>-</Text>
                </TouchableOpacity>
                <Text>{product.quantity}</Text>
                <TouchableOpacity onPress={() => updateQuantity(index, 1)}>
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          {/* Text Input for Notes */}
          <View style={styles.notesContainer}>
            <TextInput
              style={styles.notesInput}
              placeholder={t('Enter your notes here')}
              multiline
              numberOfLines={4}
            />
          </View>
          
          {/* Subtotal, Tax, and Total Calculation */}
          <View style={styles.summaryContainer}>
            {/* Calculate Subtotal */}
            <Text style={styles.summaryText}>
              Subtotal: ₨{products.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2)}
            </Text>
            {/* Calculate Tax (13%) */}
            <Text style={styles.summaryText}>
              Tax (13%): ₨{((products.reduce((acc, product) => acc + product.price * product.quantity, 0) * 0.13)).toFixed(2)}
            </Text>
            {/* Calculate Total */}
            <Text style={styles.summaryText}>
              Total: ₨{((products.reduce((acc, product) => acc + product.price * product.quantity, 0) * 1.13)).toFixed(2)}
            </Text>
          </View>
          <CustomButton MainText={t('Proceed')} BgGiven={colors.GREEN} txColor={colors.WHITE} isNavigation={1} name={ScreensName.EOrderPaymentMethod} />
          <CustomButton MainText={t('Cancel')} BgGiven={colors.WHITE} txColor={colors.GREEN} />
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  navbarContainer: {
    height: hp('8.2%'),
    backgroundColor: colors.LIGHT_GRAY,
    marginTop: hp('0.14%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    marginVertical: hp('3.2%'),
    height: hp('7%'),
  },
  bodyContainer: {
    alignItems: 'center',
    marginBottom: hp(4),
    padding: wp(5),
  },
  selectercontainer: {
    width: wp(100),
    height: hp(15),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'center',
    marginTop: hp(1),

  },
  headerRow: {
    marginTop: hp(2),
    marginBottom: hp(2),
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: hp(3),
    color: colors.DARK_GRAY,
  },

  itemBox: {
    width: wp(30),
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    marginVertical: hp(0.5),
    marginHorizontal: wp(1),
  },
  selectedBox: {
    borderColor: colors.GREEN,
  },
  itemText: {
    color: '#000',
    fontSize: hp(2),
  },
  selectedText: {
    color: colors.GREEN,
    fontWeight: 'bold',
  },
  recommendedProducts: {
    marginTop: hp('2%'),
    marginLeft: wp(2)
},
recommendedTitle: {
    fontSize: hp('3%'),
    fontFamily: fonts.SemiBold,
    marginBottom: hp('2%'),
},
productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('3%'),
    padding: wp(3),
    borderRadius: 10,
    backgroundColor: colors.LIGHT_BLUE,
    width: '100%',
},
productText: {
    color: colors.PRIMARY,
    fontSize: hp(2.5),
},
quantityContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: wp(30),
},
quantityButton: {
  backgroundColor: colors.PRIMARY,
  borderRadius: 5,
  padding: wp(2),
  marginHorizontal: wp(1),
  alignItems: 'center',
},
quantityText: {
  fontSize: hp(2),
  color: colors.WHITE,
},
notesContainer: {
  marginTop: hp(3),
  width: '100%',
},
notesInput: {
  borderColor: colors.GRAY,
  borderWidth: 1,
  borderRadius: 5,
  padding: wp(2),
  height: hp(10),
  textAlignVertical: 'top', // Ensures text starts at the top
},
summaryContainer: {
  marginTop: hp(3),
  width: '100%',
  padding: wp(3),
  borderRadius: 5,
},
summaryText: {
  fontSize: hp(2.5),
  color: colors.DARK_GRAY,
  marginVertical: hp(1),
},
});

export default EOrderPlaceOrder;
