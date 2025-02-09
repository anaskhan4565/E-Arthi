import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { MMKV } from "react-native-mmkv";

import Navbar from "../../Navbar/Navbar.jsx";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp.jsx";
import colors from "../../../../../util/colors.js";
import {fonts} from "../../../../../util/FontName.js";
import ScreensName from "../../../../../util/ScreensName.ts";
import UnderDev from './TempImages/UnderDev.webp'

const FoodSafetyAndSecuirty=()=> {
  const { t } = useTranslation();
  const storage = new MMKV();
  const navigation = useNavigation();
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar gobackOnly={true} />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.searchContainer}>
          <CustomSearchApp
            placeholder={t("Search in here")}
            value={undefined}
            onChangeText={undefined}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            {t("Upcoming Feature!")}
          </Text>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.scrollContainer}>
            <Image source={UnderDev} style={{ width:hp(50),height:hp(40)}}/>
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
    height: hp("8.5%"),
    backgroundColor: colors.WHITE,
  },
  searchContainer: {
    marginVertical: hp("3.2%"),
    height: hp("7%"),
  },
  bodyContainer: {
    alignItems: "center",
    backgroundColor: colors.LIGHT_GREEN,
    width: wp(95),
    alignSelf: "center",
  },
  titleContainer: {
    padding: hp(1),
    marginLeft: wp(5),
  },
  titleText: {
    fontFamily: fonts.Bold,
    fontSize: hp(2.9),
    textDecorationLine:'underline',
    textAlign:'center'
  },
  scrollContainer: {
    justifyContent: "center",
    paddingVertical: hp("2%"),
    height:hp(40),
    alignItems: "center",
  },
  itemBoxWrapper: {
    width: "30%",
    marginBottom: hp("2%"),
    marginHorizontal: wp("-3%"),
    alignItems: "center",
  },
  WarehouseBox: {
    width: wp(85),
    height: hp(6),
    backgroundColor: colors.WHITE,
    borderRadius: hp(0.5),
    justifyContent: 'space-between', // Space between left and right elements
    alignItems: "center",
    flexDirection: "row",
    elevation: 10,
    paddingHorizontal: wp(4), // Padding for better spacing
  },
  WhIcon: {
    width: wp(6),
    height: wp(6),
    marginRight: wp(2), // Add spacing between icon and text
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
});

export default FoodSafetyAndSecuirty;
