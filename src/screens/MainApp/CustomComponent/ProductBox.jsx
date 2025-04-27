import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import colors from '../../../../util/Constants/colors.js';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../../../../util/Constants/FontName.js';
import ScreensName from '../../../../util/Constants/ScreensName.ts';
import { useTranslation } from 'react-i18next';
import { MMKV } from 'react-native-mmkv';

const formatPrice = (price) => {
  // Convert price to number if it's a string
  const numPrice = typeof price === 'string' ? parseFloat(price.replace(/,/g, '')) : price;

  // Format number to include commas and limit decimal places
  return numPrice.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  });
};

const ProductBox = ({

  product,
  name,
  price,
  discounted_price,
  SourceGiven,
  category,
  Description,
  weight,
  stock_quantity,
  onPressG,
}) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const ProductClickInfo = new MMKV();

  const handlePress = () => {
    if (name) {
      const id = product.id;
      console.log("id", id);
   
      const productData = JSON.stringify({
        id, name, price, discounted_price,
        SourceGiven, weight, Description, category, stock_quantity
      });
      ProductClickInfo.set('selectedProduct', productData);
      navigation.navigate(ScreensName.ProductScr);
    }
  };

  // Format prices
  const formattedPrice = formatPrice(price);
  const formattedDiscountedPrice = discounted_price ? formatPrice(discounted_price) : null;

  // Calculate font size based on price length
  const getPriceFontSize = (priceString) => {
    const length = priceString.length;
    if (length > 12) return hp(1.6);
    if (length > 8) return hp(1.8);
    return hp(2);
  };

  const mainPriceToShow = formattedDiscountedPrice || formattedPrice;
  const mainPriceFontSize = getPriceFontSize(mainPriceToShow);

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      style={styles.container}
    >
      <Image
        source={SourceGiven ? { uri: SourceGiven } : require('./TempImages/AddImg2.png')}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {t(name)}
        </Text>

        <View style={styles.priceRow}>
          <View style={styles.priceContainer}>
            <Text style={[styles.price, { fontSize: mainPriceFontSize }]} numberOfLines={1}>
              Rs. {mainPriceToShow}
            </Text>
            {discounted_price && (
              <Text style={styles.originalPrice} numberOfLines={1}>
                Rs. {formattedPrice}
              </Text>
            )}
          </View>
          {discounted_price && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Agri cash</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={onPressG}
        >
          <Image
            source={require('./TempImages/AddImg2.png')}
            style={styles.cartIcon}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(45),
    backgroundColor: colors.WHITE,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: hp(1.5),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    minHeight: hp(35), // Increased minimum height
  },
  image: {
    width: '100%',
    height: hp(18),
    backgroundColor: colors.LIGHT_GRAY
  },
  content: {
    padding: hp(1.2),
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: hp(1.8),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
    marginBottom: hp(1),
    lineHeight: hp(2.2),
    height: hp(4.4), // Fixed height for 2 lines
    overflow: 'hidden',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: hp(1),
    minHeight: hp(6), // Minimum height for price section
  },
  priceContainer: {
    flex: 1,
    marginRight: wp(2),
  },
  price: {
    fontFamily: fonts.Bold,
    color: colors.GREEN,
    fontSize: hp(1.6),
  },
  originalPrice: {
    fontSize: hp(1.8),
    color: colors.BLACK,
    fontFamily: fonts.Bold,
    marginTop: 2,
  },
  badge: {
    backgroundColor: colors.GREEN,
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.3),
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: hp(0.5),
  },
  badgeText: {
    color: colors.WHITE,
    fontSize: hp(1.4),
    fontFamily: fonts.Medium,
  },
  cartButton: {
    position: 'absolute',
    bottom: hp(1.2),
    right: hp(1.2),
    shadowColor: colors.GREEN,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIcon: {

    width: wp(7),
    height: wp(6),

  },
});

export default ProductBox;