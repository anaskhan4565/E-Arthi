import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar.jsx";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp.jsx";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/colors.js";
import CustomButton from "../../../../components/CustomButton.jsx";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/FontName.js";
import { MMKV } from "react-native-mmkv";
import { Picker } from "@react-native-picker/picker";
import TranscationComponent from "./TranscationComponent.jsx";
const EVendorViewTranscations = () => {
  const { t } = useTranslation();
  const storage = new MMKV();

  const vendorDetail = JSON.parse(storage.getString("VendorDetail") || "{}");
  // SetVendorDetail(vendorDetail)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar gobackOnly={undefined} />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.searchContainer}>
          <CustomSearchApp
            placeholder={t("Search In Here")}
            value={undefined}
            onChangeText={undefined}
          />
        </View>

        <View style={styles.itemDetailsContainer}>
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.labelText}>{t("Transcations from: ")}</Text>
              <Text style={styles.infoText}>{t(vendorDetail.VendorName)}</Text>
            </View>

          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'column', marginTop: hp(3) }}>
          <View style={{ flex: 0.4, flexDirection: 'row', marginRight: hp(10), gap: hp(2), marginLeft: hp(2) }}>
            <View style={styles.pickerContainer}>
              <Picker
                mode="dropdown"
                itemStyle={styles.pickerItem}
              >
                <Picker.Item
                  label={t('Transactions')}
                  value=""
                  style={styles.pickerItem}
                />
                <Picker.Item
                  label={t('Place 1')}
                  value="1"
                  style={styles.pickerItem}
                />
                <Picker.Item
                  label={t('Place 2')}
                  value="2"
                  style={styles.pickerItem}
                />
              </Picker>
            </View>
            <View style={styles.pickerContainer}>
              <Picker
                mode="dropdown"
                itemStyle={styles.pickerItem}
              >
                <Picker.Item
                  label={t('Categories')}
                  value=""
                  style={styles.pickerItem}
                />
                <Picker.Item
                  label={t('Place 1')}
                  value="1"
                  style={styles.pickerItem}
                />
                <Picker.Item
                  label={t('Place 2')}
                  value="2"
                  style={styles.pickerItem}
                />
              </Picker>
            </View>
          </View>
          <View style={{ margin:hp(1.5), flex: 0.5,gap:hp(1.2),flexDirection:'row',flexWrap:'wrap' }}>
            <TranscationComponent State = {1} Date={'09-02-2025'} Items = {5} Amount = {5000}/>
            <TranscationComponent State = {3} Date={'09-02-2025'} Items = {5} Amount = {5000}/>
            <TranscationComponent State = {2} Date={'09-02-2025'} Items = {5} Amount = {5000}/>
            <TranscationComponent State = {1} Date={'09-02-2025'} Items = {5} Amount = {5000}/>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  comp: {
    height: hp(2.5),
    width: wp(15),
    borderRadius: 6,
    backgroundColor: '#0EAE2D',
  },
  pickerContainer: {
    height: hp('4%'),
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY,
    borderRadius: 8,
    justifyContent: 'center',
    overflow: 'hidden',
    flex: 0.6,
  },
  picker: {
    height: hp('4%'),
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY,
    borderRadius: 8,
    justifyContent: 'center',
    overflow: 'hidden',
    flex: 0.6,

  },
  pickerItem: {
    fontSize: wp('3%'),
    height: hp('6%'),
  },
  navbarContainer: {
    height: hp("8.2%"),
    backgroundColor: colors.WHITE,
    marginTop: hp("0.14%"),
  },
  searchContainer: {
    marginTop: hp("3.2%"),
    height: hp("7%"),
  },
  itemDetailsContainer: {
    flexDirection: "row",
    padding: wp("3%"),
    // gap: 2,
    backgroundColor: colors.WHITE,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: wp("40%"),
    height: wp("40%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  itemImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
  },
  detailRow: {
    flexDirection: 'row',
    marginHorizontal: hp("1.5%"),
    flex: 1
  },
  labelText: {
    fontSize: hp("2.5%"),
    fontFamily: fonts.SemiBold,
    color: colors.BLACK,
    textAlign: "left",
  },
  infoText: {
    fontSize: wp("4.3%"),
    fontFamily: fonts.Bold,
    width:hp(20),
    color: colors.GREEN,
    textAlign: "left",
  },
  buttonContainer: {
    alignItems: "center",
    marginVertical: hp("2%"),
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.LIGHT_GRAY,
    paddingBottom: hp(1),
    marginBottom: hp(1),
    marginTop: hp(3),
  },
  tableHeaderText: {
    fontFamily: fonts.SemiBold,
    fontSize: hp(2),
    width: wp(45),
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: hp(1),
    gap: hp(2),
    borderBottomWidth: 1,
    flexWrap: 'wrap',
    borderBottomColor: colors.LIGHT_GRAY,
  },
  tableRowText: {
    fontFamily: fonts.Regular,
    fontSize: hp(1.8),
    width: wp(45),
  },
  table: {
    paddingHorizontal: wp(2),
  },
});

export default EVendorViewTranscations;
