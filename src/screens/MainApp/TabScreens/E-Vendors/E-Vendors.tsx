import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar.jsx";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp.jsx";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/colors.js";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/FontName.js";
import ScreensName from "../../../../../util/ScreensName";
import VendorList from "../../../../../util/E-Vendorlist.js";
import { useNavigation } from "@react-navigation/native";

function EVendors(): React.JSX.Element {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState("");
  const [Vendors, setVendors] = useState(VendorList);
  const navigation = useNavigation();
  const items = ["Seeds", "Machinery", "Fertilizers", "Pesticides", "Products"];
  useEffect(() => {
    if (selectedItem) {
    setVendors(VendorList.filter((entry) => entry.Category === selectedItem));
    }
    else{
        setVendors(VendorList);
    }
  }, [selectedItem]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar
          isbackSet={true}
          isBackTo={ScreensName.EInventorySupplier}
          gobackOnly={true}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.searchContainer}>
          <CustomSearchApp
            placeholder={t("Search in here")}
            value={undefined}
            onChangeText={undefined}
          />
        </View>

        <View style={styles.bodyContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>{t("Select Category")}</Text>
          </View>

          <View style={styles.selectorContainer}>
            {items.map((item) => (
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
            ))}
          </View>

          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText,{width: wp(55)}]}>{t("Vendors")}</Text>
            <Text style={styles.tableHeaderText}>{t("Orders Placed")}</Text>
          </View>

          {Vendors.map(
            (data, index) =>
              data["Vendor Name"].trim() !== "" && (
                <TouchableOpacity
                  key={index}
                  style={styles.tableRow}
                  onPress={() =>
                    navigation.navigate(ScreensName.EVendorsDetails)
                  }
                >
                  <Text style={[styles.tableRowText,{width: wp(55)}]}>{data["Vendor Name"]}</Text>
                  <Text style={[styles.tableRowText,{textAlign: "right",paddingRight: wp(2)}]}>
                    {data["Orders Placed"]}
                  </Text>
                </TouchableOpacity>
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
  },
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    marginVertical: hp("3%"),
    height: hp("7%"),
  },
  bodyContainer: {
    alignItems: "center",
    marginBottom: hp(4),
  },
  selectorContainer: {
    width: wp(100),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: hp(1),
  },
  headerRow: {
    marginTop: hp(1),
    flexDirection: "row",
    width: wp(100),
    paddingHorizontal: wp(5),
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: hp(3),
    fontFamily: fonts.SemiBold,
  },
  itemBox: {
    width: wp(30),
    height: hp(5),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY,
    borderRadius: 8,
    marginVertical: hp(0.5),
    marginHorizontal: wp(1),
  },
  selectedBox: {
    borderColor: colors.GREEN,
  },
  itemText: {
    fontSize: hp(2),
    color: colors.BLACK,
  },
  selectedText: {
    color: colors.GREEN,
    fontWeight: "bold",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.LIGHT_GRAY,
    paddingVertical: hp(1),
    marginVertical: hp(2),
    width: wp(90),
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
    width: wp(90),
  },
  tableRowText: {
    fontFamily: fonts.Regular,
    fontSize: hp(1.8),
    width: wp(30),
  },
});

export default EVendors;
