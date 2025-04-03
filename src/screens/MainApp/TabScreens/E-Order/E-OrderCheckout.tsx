import React, { useCallback, useState } from 'react';
import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../util/Constants/colors.js';
import { Image } from 'react-native';

import {
  SafeAreaView,
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../../../../util/Constants/FontName.js';
import ScreensName from '../../../../../util/Constants/ScreensName.ts';
import CustomButton from '../../../../components/CustomButton.jsx';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import InventoryProduct from '../../CustomComponent/InventoryComponents/InventoryProduct.jsx';
import { MMKV } from 'react-native-mmkv';
import Sub from './TempImgsOrder/sub.png'

import Add from './TempImgsOrder/add.png'
function EOrderPlaceOrder(): React.JSX.Element {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState('Crop');
  const navigation = useNavigation();
  const [key, setKey] = useState(0);
  const storage = new MMKV();
  const AGRI_CASH_LIMIT = 100000; // 1 Lakh rupees

  const formatNumber = (num) => {
    if (!num) return "0";
    return new Intl.NumberFormat("en-IN").format(num);
  };

  useFocusEffect(
    useCallback(() => {
      setKey(prevKey => prevKey + 1);
    }, [])
  );

  const savedCart = storage.getString("cart");
  const parsedCart = savedCart ? JSON.parse(savedCart) : [];

  const checkAgriCashLimit = (product, newQuantity) => {
    const itemPrice = parseFloat(product.discounted_price?.replace(/,/g, '') || 0);
    const newItemTotal = itemPrice * newQuantity;

    // Calculate current cart total excluding this item
    const currentCartTotal = parsedCart.reduce((sum, item) => {
      if (item.name !== product.name && !item.isCashPurchase) {
        const price = parseFloat(item.discounted_price?.replace(/,/g, '') || 0);
        return sum + (price * item.quantity);
      }
      return sum;
    }, 0);

    return (currentCartTotal + newItemTotal) <= AGRI_CASH_LIMIT;
  };

  const updateQuantity = (product: any, change: number) => {
    const productIndex = parsedCart.findIndex(item => 
      item.name === product.name && item.isCashPurchase === product.isCashPurchase
    );

    if (productIndex !== -1) {
      const newQuantity = parsedCart[productIndex].quantity + change;
      
      // Check Agri-Cash limit only for non-cash purchases
      if (!product.isCashPurchase && change > 0) {
        if (!checkAgriCashLimit(product, newQuantity)) {
          Alert.alert(
            "Agri-Cash Limit Exceeded",
            `Increasing quantity would exceed your Agri-Cash limit of Rs ${formatNumber(AGRI_CASH_LIMIT)}.`
          );
          return;
        }
      }

      if (newQuantity <= 0) {
        parsedCart.splice(productIndex, 1);
      } else {
        parsedCart[productIndex].quantity = newQuantity;
      }

      storage.set('cart', JSON.stringify(parsedCart));
      setKey(prevKey => prevKey + 1);
    }
  };

  const calculateSubtotal = () => {
    return parsedCart.reduce((acc, product) => {
      const price = parseFloat(product.isCashPurchase ? 
        product.price?.replace(/,/g, '') : 
        product.discounted_price?.replace(/,/g, '') || 0);
      return acc + (price * product.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  storage.set('FinalPrice', JSON.stringify(total));

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
          <View style={{ width: wp(85) }}>
            <Text style={{ fontFamily: fonts.SemiBold, fontSize: hp(2.2) }}>{t('Items')}</Text>
          </View>
          {parsedCart.map((product, index) => (
            product.quantity >= 1 && (
              <View key={`${product.name}-${product.isCashPurchase}-${index}`} style={styles.productRow}>
                <View style={styles.productInfo}>
                  <Text style={styles.productText}>{product.name}</Text>
                  <Text style={styles.priceText}>
                    PKR {formatNumber(parseFloat(
                      product.isCashPurchase ? 
                      product.price?.replace(/,/g, '') : 
                      product.discounted_price?.replace(/,/g, '') || 0
                    ).toFixed(2))}
                    {product.isCashPurchase ? " (Cash)" : " (Agri-Cash)"}
                  </Text>
                </View>
                <View style={[styles.quantityContainer, { justifyContent: 'space-around' }]}>
                  <View style={{ justifyContent: "center", marginRight: hp(1) }}>
                    <TouchableOpacity onPress={() => updateQuantity(product, -1)}>
                      <Image source={Sub} style={{ width: hp(4), height: hp(4) }} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.quantityBox}>
                    <Text style={{ color: colors.GREEN }}>{product.quantity}</Text>
                  </View>
                  <TouchableOpacity onPress={() => updateQuantity(product, 1)} style={{ margin: hp(1) }}>
                    <Image source={Add} style={{ width: hp(4), height: hp(4) }} />
                  </TouchableOpacity>
                </View>
              </View>
            )
          ))}
          <View style={{ flexDirection: 'row', width: wp(85), alignItems: 'center' }}>
            <View style={styles.notesContainer}>
              <TextInput
                style={styles.notesInput}
                placeholder={t('Enter your notes here')}
                placeholderTextColor={colors.LIGHT_GRAY}
                multiline
                numberOfLines={4}
              />
            </View>
            <TouchableOpacity style={styles.notesButton}>
              <Image source={require('../../../../assets/MainApp/E-Order/Bucket.png')} />
            </TouchableOpacity>
          </View>

          <View style={styles.summaryContainer}>
            <View style={styles.totalContainer}>
              <Text style={{ fontSize: hp(1.5), fontFamily: fonts.Bold }}>{t('SubTotal')}</Text>
              <Text style={{ color: colors.DARK_GRAY, fontSize: hp(1.5), fontFamily: fonts.Regular }}>PKR {formatNumber(subtotal.toFixed(2))}</Text>
            </View>
            <View style={styles.totalContainer}>
              <Text style={{ fontSize: hp(1.5), fontFamily: fonts.Regular }}>{t('Tax (13%)')}</Text>
              <Text style={{ color: colors.DARK_GRAY, fontSize: hp(1.5), fontFamily: fonts.Regular }}>PKR {formatNumber(tax.toFixed(2))}</Text>
            </View>
            {/* Dotted Line */}
            <View style={styles.dottedLine} />

            <View style={styles.totalContainer}>
              <Text style={{ fontSize: hp(1.5), fontFamily: fonts.Bold }}>{t('Total')}</Text>
              <Text style={{ color: colors.DARK_GRAY, fontSize: hp(1.5), fontFamily: fonts.Bold }}>PKR {formatNumber(total.toFixed(2))}</Text>
            </View>
          </View>

          <CustomButton MainText={t('Proceed')}
            BgGiven={total === 0 ? colors.GRAY : colors.GREEN}
            txColor={colors.WHITE}
            bordergiven={total === 0 ? colors.GRAY : colors.GREEN}
            isNavigation={total === 0 ? 0 : 1}
            isdisabled={total === 0 ? true : false}
            name={total !== 0 ? ScreensName.EOrderPaymentMethod : null} />
          <View style={{ marginTop: hp(2) }}>
            <CustomButton MainText={t('Cancel')} BgGiven={colors.WHITE} txColor={colors.GREEN} />
          </View>
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
    padding: wp(3),
    borderRadius: 10,
    width: '100%',
  },
  productText: {
    color: colors.PRIMARY,
    fontSize: hp(2),
    width: hp(20)
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(30),
  },
  quantityBox: {
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY,
    borderRadius: 5,
    padding: 5,
    width: wp(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  notesContainer: {
    marginTop: hp(3),
    width: '85%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    // elevation: 5,
  },
  notesInput: {
    height: hp(10),
    textAlignVertical: 'top',
    elevation: 5,
    backgroundColor: colors.WHITE,
    color: colors.BLACK,
    borderRadius: 5,
    color: colors.BLACK,
  },
  notesButton: {
    width: wp(10),
    marginLeft: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
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
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginHorizontal: wp(5),
    // marginBottom: hp(2),
    width: wp(85)
  },
  totalText: {
    color: colors.GREEN,
    fontSize: hp(1.8),
    fontFamily: fonts.Bold
  },
  amountText: {
    color: '#000',
    fontSize: hp(1.8),
    fontFamily: fonts.Bold
  },
  dottedLine: {
    borderBottomColor: colors.DARK_GRAY,
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    width: '100%',
    marginVertical: hp(1),
  },
  productInfo: {
    flexDirection: 'column',
  },
  priceText: {
    color: colors.GRAY,
    fontSize: hp(1.5),
    fontFamily: fonts.Regular
  },
});

export default EOrderPlaceOrder;