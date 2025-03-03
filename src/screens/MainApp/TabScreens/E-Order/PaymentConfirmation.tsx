import React, { useCallback, useState } from 'react';
import Navbar from '../../Navbar/Navbar.jsx';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../util/Constants/colors.js';

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
import { fonts } from '../../../../../util/Constants/FontName.js';
import ScreensName from '../../../../../util/Constants/ScreensName.ts';
import CustomButton from '../../../../components/CustomButton.jsx';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { MMKV } from 'react-native-mmkv';



function PaymentConfirmation(): React.JSX.Element {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [key, setKey] = useState(0);
  const formatNumber = (num) => new Intl.NumberFormat("en-US").format(num ?? 0);

  useFocusEffect(
    useCallback(() => {
      setKey(prevKey => prevKey + 1);
    }, [])
  );
  const storage = new MMKV();
  const PassedPayment = new MMKV();

  const finalPrice = storage.getString("FinalPrice")
  const passedName = PassedPayment.getString("PassedName");

  const savedCart = storage.getString("cart");
  const parsedCart = savedCart ? JSON.parse(savedCart) : [];
  console.log(parsedCart);


  const updateQuantity = (product: any, change: number) => {
    const productIndex = parsedCart.findIndex(item => item.name === product.name);

    if (productIndex !== -1) {
      parsedCart[productIndex].quantity += change;

      if (parsedCart[productIndex].quantity <= 0) {
        parsedCart.splice(productIndex, 1); // Remove item with 0 quantity
      }

      storage.set('cart', JSON.stringify(parsedCart));
      setKey(prevKey => prevKey + 1); // Force re-render 
    }
  };
  const totalPrice = parsedCart.reduce((acc, product) => acc + parseInt(product.price.replace(/,/g, '')) * product.quantity, 0) * 1.13;


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
      <ScrollView style={styles.container}>

        <View style={{ marginBottom: hp(1.2), marginTop: hp(1), marginHorizontal: wp(5), }}>
          <Text style={{ fontFamily: fonts.SemiBold, fontSize: hp(3), textAlign: 'center' }}>
            {passedName?.toLocaleUpperCase()} {t('Transfers')}
          </Text>
        </View>
        <View style={styles.bodyContainer}>

          {/* TRANSFER TO */}
          <View style={{ width: wp(85) }}>
            <Text style={{ fontFamily: fonts.SemiBold, fontSize: hp(2.5), marginTop: hp(1) }}>{t('Transfer To')}</Text>
          </View>
          <View style={{ flexDirection: 'row', width: wp(85), alignItems: 'center' }}>
            <View style={styles.amountContainer}>
              <Text style={{ color: colors.DARK_GRAY, fontSize: hp(2), fontFamily: fonts.Regular }}>{t('Agri-Tech Bank')}</Text>
            </View>
          </View>

          {/* SHOWING AMOUNT TO BE PAID */}
          <View style={{ width: wp(85) }}>
            <Text style={{ fontFamily: fonts.SemiBold, fontSize: hp(2.5), marginTop: hp(2) }}>{t('Amount')}</Text>
          </View>
          <View style={{ flexDirection: 'row', width: wp(85), alignItems: 'center' }}>
            <View style={styles.amountContainer}>
              <Text style={{ color: colors.DARK_GRAY, fontSize: hp(2), fontFamily: fonts.Regular }}>PKR {formatNumber(parseInt(finalPrice).toFixed(2))}</Text>
            </View>
          </View>

          {/* TRANSFER FROM */}
          <View style={{ width: wp(85) }}>
            <Text style={{ fontFamily: fonts.SemiBold, fontSize: hp(2.5), marginTop: hp(2) }}>{t('Transfer From')}</Text>
          </View>
          <View style={{ flexDirection: 'row', width: wp(85), alignItems: 'center' }}>
            <View style={styles.amountContainer}>
              <Text style={{ color: colors.DARK_GRAY, fontSize: hp(2), fontFamily: fonts.Regular }}>{t('0378240790018')}</Text>
            </View>
          </View>

          {/* PURPOSE */}
          <View style={{ width: wp(85), marginTop: hp(1) }}>
            <Text style={{ fontFamily: fonts.SemiBold, fontSize: hp(2.5) }}>{t('Purpose')}</Text>
          </View>
          <View style={{ flexDirection: 'row', width: wp(85), alignItems: 'center' }}>
            <View style={styles.amountContainer}>
              <Text style={{ color: colors.DARK_GRAY, fontSize: hp(2), fontFamily: fonts.Regular }}>{t('Agri Land')}</Text>
            </View>
          </View>

          {/* PURPOSE */}
          <View style={{ width: wp(85), marginTop: hp(1) }}>
            <Text style={{ fontFamily: fonts.SemiBold, fontSize: hp(2.5) }}>{t('Notes')}</Text>
          </View>
          <View style={{ flexDirection: 'row', width: wp(85), alignItems: 'center' }}>
            <View style={styles.amountContainer}>
              <Text style={{ color: colors.DARK_GRAY, fontSize: hp(2), fontFamily: fonts.Regular }}>{t('First 100 Acres of Land')}</Text>
            </View>
          </View>

          <View style={{ marginTop: hp(2), gap: 5 }}>
            <CustomButton MainText={t('Confirm')}
              BgGiven={totalPrice === 0 ? colors.GRAY : colors.GREEN}
              txColor={colors.WHITE}
              bordergiven={totalPrice === 0 ? colors.GRAY : colors.GREEN}
              isNavigation={totalPrice === 0 ? 0 : 1}
              isdisabled={totalPrice === 0 ? true : false}
              name={totalPrice !== 0 ? ScreensName.AllOTP : null} />
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

  notesContainer: {
    marginLeft: hp(2.9),
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
  amountContainer: {
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

});

export default PaymentConfirmation;