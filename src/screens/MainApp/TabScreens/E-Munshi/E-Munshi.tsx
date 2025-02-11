import React from "react";
import { TouchableOpacity, Image } from "react-native";

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
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/FontName.js";
import ScreensName from "../../../../../util/ScreensName.ts";

import { useNavigation } from "@react-navigation/native";
import placeholder from '../../../../../src/assets/MainApp/E-Order/placeorder.png';
import { MMKV } from 'react-native-mmkv';
import { emunshiDet } from "../../../../../util/MunshiData.js";
import Back from "../../../../assets/MainApp/Sidebar/Back.png";


const warehouseData = [
  { name: "Khairpur Warehouse", value: 25, color: "#AFDC8F" },
  { name: "Kotri Warehouse", value: 20, color: "#0066CC" },
  { name: "Umerkot Warehouse", value: 15, color: "#5E40BE" },
  { name: "Lasbela Warehouse", value: 30, color: "#CA6C0F" },
  { name: "Sialkot Warehouse", value: 10, color: "#204D00" },
];

function EMunshi(): React.JSX.Element {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const storage = new MMKV();

  const handleNavigation = async (name: string) => {
    try {
      console.log("Storing name in AsyncStorage:", name);
      storage.set("warehouse", name);
      console.log("Stored successfully");
      navigation.navigate(ScreensName.EMunshiWarehouseInfo);
    } catch (error) {
      console.error("Error saving to AsyncStorage:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.searchContainer}>
          <CustomSearchApp placeholder={t("Search in here")} />
        </View>
        <View style={{ marginHorizontal: hp(1) }}>
          <Text
            style={{
              fontSize: hp(3.5),
              fontFamily: fonts.SemiBold,
              marginLeft: hp(2),
              marginBottom: hp(3),
            }}
          >
            {t('E-Munshi')}
          </Text>
        </View>
        {emunshiDet.map(
          (warehouse, index) =>
            warehouse.name.trim() !== "" && (
              <View
                style={styles.itemBoxWrapper}
                key={index}
              >
                <TouchableOpacity style={styles.WarehouseBox} onPress={() =>navigation.navigate(warehouse.screenname)}>
                  <View style={styles.leftContainer}>
                    <Image source={placeholder} style={styles.WhIcon} />
                    <Text style={styles.WarehouseName}>
                      {warehouse.name}
                    </Text>
                  </View>
                  <View>
                    <Image
                      source={Back}
                      style={[styles.image, { transform: [{ scaleX: -1 },], },]}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )
        )}
        <View style={styles.bodyContainer}>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: colors.WHITE,
  },
  navbarContainer: {
    height: hp("8.2%"),
    backgroundColor: "white",
    marginTop: hp("0.14%"),
  },
  searchContainer: {
    marginTop: hp("3.2%"),
    height: hp("7%"),
    alignSelf: "flex-start",
    marginLeft: hp(1),
  },
  bodyContainer: {
    alignItems: "flex-start",
    marginHorizontal: hp(3),
  },
  titleContainer: {
    padding: 10,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 25,
    fontFamily: "Poppins",
  },
  scrollContainer: {
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: hp("2%"),
    // backgroundColor: 'red',
    alignItems: "center",
  },
  itemBoxWrapper: {
    width: "85%",
    marginBottom: hp("2%"),
    marginHorizontal: wp("-3%"),
    alignItems: "center",
    alignSelf: 'center',

  },
  image: {
    width: wp(8),
    height: wp(7),
    marginRight: wp(2),
    resizeMode: "contain",
  },
  WhIcon: {
    width: wp(10),
    height: wp(10),
    marginRight: wp(2),
    resizeMode: "contain",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",

  },
  WarehouseName: {

    marginLeft: wp(2),
    fontSize: hp(2.3),
    fontFamily: fonts.Regular,
  },
  BackIcon: {
    width: wp(6),
    height: wp(6),
    transform: [{ scaleX: -1 }], // Flipped back icon
    paddingRight: wp(-4),
  },
  WarehouseBox: {
    width: wp(85),
    height: hp(10),
    backgroundColor: colors.WHITE,
    borderRadius: hp(0.5),
    justifyContent: 'space-between', // Space between left and right elements
    alignItems: "center",
    flexDirection: "row",
    elevation: 10,
    paddingHorizontal: wp(4), // Padding for better spacing
  },




});

export default EMunshi;
