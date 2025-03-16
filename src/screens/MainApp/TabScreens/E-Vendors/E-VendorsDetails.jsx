import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar.jsx";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp.jsx";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/Constants/colors.js";
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
import ScreensName from "../../../../../util/Constants/ScreensName.ts";
import { fonts } from "../../../../../util/Constants/FontName.js";
import VendorOrders from "../../../../../util/Data/E-VendorOrders.js";
import { useNavigation } from "@react-navigation/native";
import ProductBox from "../../CustomComponent/ProductBox.jsx";
import Image2 from '../../../../assets/MainApp/EmarketPlace/Products/prod2.png'
import { MMKV } from "react-native-mmkv";
const EVendorsDetails = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const storage = new MMKV();
  const [VendorDetail, SetVendorDetail] = useState([])

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
              <Text style={styles.labelText}>{t("Name: ")}</Text>
              <Text style={styles.infoText}>{t(vendorDetail.VendorName)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.labelText}>{t("Location: ")}</Text>
              <Text style={styles.infoText}>
                {t("123 Street, ABC District, Karachi Pakistan")}
              </Text>
              <View style={styles.detailRow}>

                <Text style={styles.labelText}>{t("Helpline: ")}</Text>

                <Text style={styles.infoText}>
                  {vendorDetail.Helpline}
                </Text>
              </View>
            </View>
            <CustomButton MainText={"View Transactions"}
              wgiven={hp(20)} hgiven={hp(3.5)}
              tx_size={hp(1.7)} txColor={colors.WHITE}
              BgGiven={colors.GREEN}
              isSelected={true}
              isNavigation={true}
              name={ScreensName.EVendorViewTranscations} />

          </View>
          <View style={styles.imageContainer}>
            <Image
              source={vendorDetail.Logo}
              style={styles.itemImage}
              resizeMode="contain"

            />


          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>{t("Offered Products")}</Text>
          </View>


          <View style={styles.tableRow} >
            <ProductBox name={"Agri-Protex"}
              AddIcon={false} price={"2050"}
              SourceGiven={Image2}
              iscentered={true}

              backColor={colors.LIGHT_GREEN}
            />
            <ProductBox name={"Agri-Protex"}
              AddIcon={false} price={"2050"}
              SourceGiven={Image2}
              iscentered={true}

              backColor={colors.LIGHT_GREEN}
            />

            <ProductBox name={"Agri-Protex"}
              AddIcon={false} price={"2050"}
              SourceGiven={Image2}
              iscentered={true}

              backColor={colors.LIGHT_GREEN}
            />


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

export default EVendorsDetails;
