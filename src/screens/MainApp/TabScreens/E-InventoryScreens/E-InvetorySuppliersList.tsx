import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/FontName";
import { InventorySuppliersListDet } from '../../../../../util/E-Inventory.js';
import Navbar from "../../Navbar/Navbar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/colors";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp";
import ScreensName from "../../../../../util/ScreensName.ts";
import { useNavigation } from '@react-navigation/native';

function InvetorySuppliersList(): React.JSX.Element {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>      
      <View style={{ flex: 7 }}>
        <View style={styles.searchbar}>
          <CustomSearchApp placeholder={"Search in here"} />
        </View>
        <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center', marginBottom: hp(1.2), marginTop: hp(0), marginHorizontal: wp(4), gap:wp(23)}}>
          <Text style={{ fontFamily: fonts.SemiBold, fontSize: hp(4) }}>
            {t('Suppliers')}
          </Text>
          <TouchableOpacity 
            style={styles.reorderButton} 
            onPress={() => { navigation.navigate(ScreensName.EInventoryAddSuppliers) }}>
            <Text style={styles.reorderButtonText}>{t('Add Suppliers')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Header}>
          <Text style={styles.HeaderCol}>{t('Supplier ID')}</Text>
          <Text style={[styles.HeaderCol, { textAlign: "center" }]}>{t('Supplier Name')}</Text>
          <Text style={styles.HeaderCol}>{t('Item')}</Text>
        </View>
        {InventorySuppliersListDet.map(
          (data, index) =>
            data.id.trim() !== "" && (
              <View style={styles.row} key={index}>
                <View style={styles.decsAndQty}>
                  <Text style={styles.decs}>{data.id}</Text>
                </View>
                <Text style={styles.cost}>{t(data.name)}</Text>
                <Text style={styles.date}>{t(data.item)}</Text>
              </View>
            )
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  navbarContainer: {
    height: hp(8.5),
    backgroundColor: colors.WHITE,
  },
  container: {
    flex: 1,

    backgroundColor: colors.WHITE,
  },
  searchbar: {
    marginTop: hp(1.3),
    height: hp('7%'),

  },
  Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: wp(4),
    height: hp(10),
    marginTop: hp(-2)
  },
  HeaderCol: {
    fontFamily: fonts.SemiBold,
    fontSize: hp(2),
    width: wp(29),
    textAlign: "left"

  },
  cost: {
    fontFamily: fonts.Regular,
    fontSize: hp(1.8),
    textAlign: "center",
    width: wp(33),
  },
  date: {
    fontFamily: fonts.Regular,
    fontSize: hp(1.8),
    width: wp(30)
  },
  decs: {
    fontFamily: fonts.Regular,
    fontSize: hp(1.8),
  },
  decsAndQty: {
    alignContent: "center",
    width: wp(30),
    fontFamily: fonts.Regular,
    fontSize: hp(1.8),

  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: wp(4),

  },
});

export default InvetorySuppliersList;