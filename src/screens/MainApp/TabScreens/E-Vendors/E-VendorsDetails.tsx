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
  Image,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import ScreensName from "../../../../../util/ScreensName.ts";
import { fonts } from "../../../../../util/FontName.js";
import VendorOrders from "../../../../../util/E-VendorOrders.js";
import { useNavigation } from "@react-navigation/native";

function EVendorsDetails(): React.JSX.Element {
  const { t } = useTranslation();
  const navigation = useNavigation();

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
              <Text style={styles.labelText}>{t("Name: ")}</Text>
              <Text style={styles.infoText}>{t("Engro Fertilizers")}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.labelText}>{t("Location: ")}</Text>
              <Text style={styles.infoText}>
                {t("123 Street, ABC District, Karachi Pakistan")}
              </Text>
            </View>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../../assets/MainApp/E-Vendors/engro.png")}
              style={styles.itemImage}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>{t("Order Number")}</Text>
            <Text style={styles.tableHeaderText}>{t("Date Ordered")}</Text>
          </View>

          {VendorOrders.map(
            (data, index) =>
              data.name.trim() !== "" && (
                <View style={styles.tableRow} key={index}>
                  <Text style={styles.tableRowText}>{t(data.name)}</Text>
                  <Text style={styles.tableRowText}>{data.date} </Text>
                </View>
              )
          )}
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
    marginLeft: wp("3%"),
  },
  detailRow: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: hp("1.5%"),
  },
  labelText: {
    fontSize: wp("4%"),
    fontFamily: fonts.SemiBold,
    color: colors.GREEN,
    textAlign: "left",
  },
  infoText: {
    fontSize: wp("3.5%"),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
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
    borderBottomWidth: 1,
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

export default EVendorsDetails;
