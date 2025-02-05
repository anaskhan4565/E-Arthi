import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import colors from '../../../../../util/colors.js';
import ItemBox from '../../CustomComponent/ItemBox.jsx';
import { SupplierReports } from '../../../../../util/E-Inventory.js';
import ProductBox from '../../CustomComponent/ProductBox.jsx';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import pdf from '../../../../assets/pdf1.png';
import { useNavigation } from '@react-navigation/native';
import ScreensName from '../../../../../util/ScreensName.ts';

//Need to edit this later, passing images literl
import { fonts } from '../../../../../util/FontName.js';

const SuppliersReport = () => {
  const { t } = useTranslation()
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: colors.WHITE }}>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingTop: hp('8%') }}>
        <View style={styles.contentContainer}>
          <View style={styles.searchContainer}>
            <CustomSearchApp placeholder={t('Search in here')} />
          </View>

          <View style={styles.bodyContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{t('Supplier Reports')}</Text>
              <TouchableOpacity
                style={styles.reorderButton}
                onPress={() => { navigation.navigate(ScreensName.EInventorySuppliersList) }}>
                <Text style={styles.reorderButtonText}>{t('Download All')}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.scrollContainer}>
              {SupplierReports.map((name, index) => (
                name.trim() !== '' && (
                  <View style={styles.itemBoxWrapper} key={index}>
                    <Image source={pdf} style={styles.image} />
                    <Text style={{ fontSize: hp(1.3), textAlign: 'center' }}>{t(name)}</Text>
                  </View>
                )
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SuppliersReport;

const styles = StyleSheet.create({
  navbarContainer: {
    height: hp('8.5%'),
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },

  searchContainer: {
    marginVertical: hp('3%'),
    height: hp('7%'),
  },
  contentContainer: {
    flex: 1,
    //marginTop: 10,
  },

  bodyContainer: {
    flex: 1,
    margin: hp('1%'),
  },
  titleContainer: {
    padding: hp('1%'),
    marginTop: hp(-2),
    flexDirection: 'row',
    margin: wp(1),
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: wp(4)
  },
  image: {
    width: wp(14),
    height: hp(4.8),
    resizeMode: 'contain',
    marginBottom: hp(1),
  },
  titleText: {
    fontFamily: fonts.SemiBold,
    fontSize: hp('3%'),
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: hp('3%'),
    // backgroundColor: 'red',
  },
  itemBoxWrapper: {
    width: wp('28%'),
    marginBottom: hp('2%'),
    alignItems: 'center',
    flexWrap: 'wrap',
    marginHorizontal: wp(1),
    marginVertical: hp(0.5),
  },
  recommendedProducts: {
    marginTop: hp('2%'),
  },
  recommendedTitle: {
    fontSize: hp('2.5%'),
    fontFamily: fonts.SemiBold,
    marginBottom: hp('2%'),
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('3%'),
  },
  reorderButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: colors.GREEN,
    width: wp("29%"),
    height: hp("3%"),
    backgroundColor: colors.GREEN,
    borderWidth: 1,
  },
  reorderButtonText: {
    color: colors.WHITE,
    fontSize: hp('1.6%'),
    textAlign: 'center',
  },
});
