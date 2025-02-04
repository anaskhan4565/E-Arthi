import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar.jsx";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp.jsx";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/colors.js";
import WarehouseSpaceCategory from "../../../../../util/WarehouseSpaceCategory.js";
import CustomInput from "../../../../components/CustomInput.jsx";
import CustomButton from "../../../../components/CustomButton.jsx";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/FontName.js";
import ScreensName from "../../../../../util/ScreensName.ts";

import EWarehouseMainStack from "./E-WarehouseMainStack.tsx";

function ConfrimWarehouse(): React.JSX.Element {
  const { t } = useTranslation();
  const [Type, setType] = useState("Silo Storage");
  const [Units, setUnits] = useState("35,000");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.searchContainer}>
          <CustomSearchApp placeholder={t("Search in here")} />
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{t("PASSCO")}</Text>
          </View>
          <View style={styles.SubtitleContainer}>
            <Text style={styles.SubtitleText}>{t("Type of Storage : ")}</Text>
            <Text style={[styles.SubtitleText, { fontFamily: fonts.Regular }]}>
              {t("Box Storage")}
            </Text>
          </View>
          <View style={styles.bodyTextContainer}>
            <Text style={styles.bodyText}>{t("Select space type")}</Text>
          </View>
          <View style={styles.Header}>
            <Text style={styles.HeaderCol}>{t("Space type")}</Text>
            <Text style={[styles.HeaderCol, { textAlign: "center" }]}>
              {t("Cost per unit")}
            </Text>
            <Text style={styles.HeaderCol}>{t("Space")}</Text>
          </View>
          {WarehouseSpaceCategory.map(
            (data, index) =>
              data.type.trim() !== "" && (
                <TouchableOpacity
                  style={styles.row}
                 // key={index}
                  onPress={() => {
                    console.log('hello')
                  }}
                >
                  <View style={styles.typeCol}>
                    <Text style={styles.typeText}>{data.type}</Text>
                  </View>
                  <Text style={styles.price}>{data.price}</Text>
                  <Text style={styles.space}>{data.space}</Text>
                </TouchableOpacity>
              )
          )}
        </View>
        {Type && (
          <View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Enter the number of {Type} units you want to reserve
              </Text>
              <CustomInput
                placeholder={t("Units")}
                h={hp("5.5%")}
                w={wp("90%")}
                b_radius={10}
                bg_give={colors.WHITE}
                //hide={false}
               // editable = {false}
                //value= {Units}
              />
            </View>
            <View style={styles.buttonContainer}>
          <CustomButton
            MainText={t("Go Back")}
            BgGiven={colors.GREEN}
            name={ScreensName.EWarehouse}
            txColor={colors.WHITE}
            isNavigation={true}
            wgiven = {wp("90%")}
          />
        </View>
          </View>
        )}
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
  },
  titleContainer: {
    padding: wp(2),
    alignSelf: "flex-start",
  },
  titleText: {
    fontFamily: fonts.SemiBold,
    fontSize: hp(3),
  },
  bodyTextContainer:{
    paddingTop: wp(2),
    paddingLeft: wp(2),
    alignSelf: "flex-start",
  },
  bodyText: {
    fontFamily: fonts.SemiBold,
    fontSize: hp(2),
    textAlign: "left"
  },
  SubtitleContainer: {
    padding: wp(2),
    paddingTop: hp(2),
    alignSelf: "flex-start",
    flexDirection: "row",
  },
  SubtitleText: {
    fontFamily: fonts.Medium,
    fontSize: hp(2),
  },
  price: {
    fontFamily: fonts.Regular,
    fontSize: hp(1.8),
    textAlign: "center",
    width: wp(33),
  },
  space: {
    fontFamily: fonts.Regular,
    fontSize: hp(1.8),
    width: wp(30),
  },
  typeText: {
    fontFamily: fonts.Regular,
    fontSize: hp(1.8),
  },
  typeCol: {
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
    marginVertical: hp(1),
  },
  Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: wp(4),
    height: hp(8),
    // borderWidth: 1,
    width: wp(95),
  },
  HeaderCol: {
    fontFamily: fonts.SemiBold,
    fontSize: hp(2),
    width: wp(29),
    textAlign: "left",
  },
  inputContainer: {
    marginTop: hp(2),
    gap: hp("1%"),
  },
  label: {
    fontFamily: fonts.Medium,
    fontSize: hp("2%"),
    paddingHorizontal: wp(3),
  },
  buttonContainer: {
    marginVertical: hp("3%"),
    alignItems: "center",
  },
});

export default ConfrimWarehouse;
