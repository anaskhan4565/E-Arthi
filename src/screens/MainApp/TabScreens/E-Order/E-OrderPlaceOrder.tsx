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

  const items = ['Crop', 'Seeds', 'Medicines', 'Machinery', 'Fertilizers', 'Herbicide'];

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.searchContainer}>
          <CustomSearchApp placeholder={t('Search in here')} />
        </View>

        <View style={styles.bodyContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>{t('Add New Transport')}</Text>
          </View>
          <View style={styles.selectercontainer}>{items.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.itemBox,
                selectedItem === item && styles.selectedBox,
              ]}
              onPress={() => setSelectedItem(item)}
            >
              <Text
                style={[
                  styles.itemText,
                  selectedItem === item && styles.selectedText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}</View>
          <View style={styles.recommendedProducts}>
            <View style={styles.productRow}>
              <InventoryProduct name={'Fresh Vegetables'} price={1280} isNavigation={1} navigateTo={ScreensName.EInventoryDetails} />
              <InventoryProduct name={'Leather Products'} price={4562} isNavigation={1} navigateTo={ScreensName.EInventoryDetails} />
              <InventoryProduct name={'Canned Goods '} price={1500} isNavigation={1} navigateTo={ScreensName.EInventoryDetails} />
              <InventoryProduct name={'Farm Fresh Juices'} price={1400} isNavigation={1} navigateTo={ScreensName.EInventoryDetails} />
              <InventoryProduct name={'Flowers '} price={1394} isNavigation={1} navigateTo={ScreensName.EInventoryDetails} />
              <InventoryProduct name={'Fertilizers'} price={1412} isNavigation={1} navigateTo={ScreensName.EInventoryDetails} />

            </View>

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
    backgroundColor: 'white',
    marginTop: hp('0.14%'),
  },
  searchContainer: {
    marginVertical: hp('3.2%'),
    height: hp('7%'),
  },
  bodyContainer: {
    alignItems: 'center',
    marginBottom: hp(4),
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
    flex: 0.5,
    marginTop: hp(-3),
    flexDirection: 'row',
    marginLeft: wp(5),
    width: wp(100),
  },
  headerTextWrapper: {
    flex: 0.7,
    marginLeft: wp(6),
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: hp(3),
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: hp('3%'),
},

});

export default EOrderPlaceOrder;
