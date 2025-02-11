import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar.jsx";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp.jsx";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/colors.js";
import CustomButton from "../../../../components/CustomButton.jsx";
import ScreensName from "../../../../../util/ScreensName.ts";
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
import BrokerComponent from "./BrokerComponent.jsx";


const EBroker = () => {
  const { t } = useTranslation();
  const storage = new MMKV();

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
              <Text style={styles.labelText}>
                {t(storage.getString("broker") || "")}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: "column", margin: hp(3) }}>
          <View style={{ margin: hp(0.5), flex: 0.5, gap: hp(1.2), flexDirection: "row", flexWrap: "wrap" }}>
            <Text style={styles.title}>{t("specialty")}: </Text>
            <Text style={styles.detailText}>{t(storage.getString("specialty") || "")}</Text>
          </View>
          <View style={{ margin: hp(0.5), flex: 0.5, gap: hp(1.2), flexDirection: "row", flexWrap: "wrap" }}>
            <Text style={styles.title}>{t("location")}: </Text>
            <Text style={styles.detailText}>{t(storage.getString("location") || "")}</Text>
          </View>
          <View style={{ margin: hp(0.5), flex: 0.5, gap: hp(1.2), flexDirection: "row", flexWrap: "wrap" }}>
            <Text style={styles.title}>{t("Telephone")}: </Text>
            <Text style={styles.detailText}>{t(storage.getString("phone") || "")}</Text>
          </View>
          <View style={{ margin: hp(0.5), flex: 0.5, gap: hp(1.2), flexDirection: "row", flexWrap: "wrap" }}>
            <Text style={styles.title}>{t("Email")}: </Text>
            <Text style={styles.detailText}>{t(storage.getString("email") || "")}</Text>
          </View>
          <View style={{ margin: hp(0.5), flex: 0.5, gap: hp(1.2), flexDirection: "row", flexWrap: "wrap" }}>
            <Text style={styles.title}>{t("Web")}: </Text>
            <Text style={styles.detailText}>{t(storage.getString("website") || "")}</Text>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <CustomButton
            MainText={t("Request An Appointment")}
            BgGiven={colors.GREEN}
            txColor={colors.WHITE}
            isNavigation={true}
            name={ScreensName.MorePage}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    marginHorizontal: hp("1%"),
    flex: 1,
    alignItems: 'center'
  },
  
  labelText: {
    fontSize: wp("5%"),
    fontFamily: fonts.SemiBold,
    color: colors.BLACK,
    textAlign:'left',
    margin: wp(1)

  },
  infoText: {
    fontSize: wp("4.3%"),
    fontFamily: fonts.Bold,
    width:hp(21),
    color: colors.GREEN,
    textAlign:'left',
    marginBottom:hp(0.4)
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
  title: {
    fontFamily: fonts.SemiBold,
    fontSize: hp(1.7),
  },
  detailText: {
    fontFamily: fonts.Regular,
  },
});

export default EBroker;
