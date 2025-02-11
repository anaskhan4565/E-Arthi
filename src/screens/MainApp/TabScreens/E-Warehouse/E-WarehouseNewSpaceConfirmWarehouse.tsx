import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar.jsx";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp.jsx";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/colors.js";
import WarehouseItems from "../../../../../util/WarehouseItems.js";
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
import { MMKV } from "react-native-mmkv";

function ConfrimWarehouse(): React.JSX.Element {
  const { t } = useTranslation();
  const storage = new MMKV();
  const StorageType = storage.getString("StorageType");
  const [items, setItems] = useState(WarehouseItems[StorageType]);
  

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
            <Text style={styles.titleText}>{storage.getString("AvailableWarehouse")}</Text>
          </View>
          <View style={styles.SubtitleContainer}>
            <Text style={styles.SubtitleText}>{t("Type of Storage : ")}</Text>
            <Text style={[styles.SubtitleText, { fontFamily: fonts.Regular }]}>
              {StorageType}
            </Text>
          </View>
          <View style={styles.bodyTextContainer}>
            <Text style={styles.bodyText}>{t("Previously Stored Items")}</Text>
          </View>
          <View style={styles.Header}>
            <Text style={styles.HeaderCol}>{t("Item Name")}</Text>
            <Text style={styles.HeaderCol}>{t("Space Reserved")}</Text>
          </View>
          {items.map(
            (data, index) =>
              data.type.trim() !== "" && (
                <View
                  style={styles.row}
                  key={index}
                  
                >
                  <View style={styles.typeCol}>
                    <Text style={styles.typeText}>{t(data.type)}</Text>
                  </View>
                  
                  <Text style={styles.space}>{data.space}</Text>
                </View>
              )
          )}
        </View>
        
          <View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                {t('Enter the number of ')}{t(' units you want to reserve')}
              </Text>
              <CustomInput
                placeholder={t("Units")}
                h={hp("5.5%")}
                w={wp("90%")}
                b_radius={10}
                bg_give={colors.WHITE}
                hide={false}
              />
            </View>
            <View style={styles.buttonContainer}>
          <CustomButton
            MainText={t("Reserve")}
            BgGiven={colors.GREEN}
            name={ScreensName.EWarehouse}
            txColor={colors.WHITE}
            isNavigation={1}
            wgiven = {wp("90%")}
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
    height: hp("8.5%"),
    backgroundColor: colors.WHITE,
  },
  searchContainer: {
    marginVertical: hp("3.2%"),
    height: hp("7%"),
  },
  bodyContainer: {
    alignItems: "center",
    marginLeft: hp(2),
  },
  titleContainer: {
    padding: wp(2),
    alignSelf: "flex-start",
  },
  titleText: {
    fontFamily: fonts.SemiBold,
    fontSize: hp(3),
  },
  bodyTextContainer: {
    paddingTop: wp(2),
    paddingLeft: wp(2),
    alignSelf: "flex-start",
  },
  bodyText: {
    fontFamily: fonts.SemiBold,
    fontSize: hp(2),
    textAlign: "left",
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
  Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wp(85),
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(2),
    borderRadius: wp(2),
  },
  HeaderCol: {
    fontFamily: fonts.SemiBold,
    fontSize: hp(2),
    flex: 1,
    textAlign: "left",
    marginRight: wp(15)
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wp(85),
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(2),
  },
  typeCol: {
    flex: 1,
    alignItems: "flex-start",
  },
  typeText: {
    fontFamily: fonts.Regular,
    fontSize: hp(1.8),
    textAlign: "left",
  },
  space: {
    fontFamily: fonts.Regular,
    fontSize: hp(1.8),
    flex: 1,
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
    marginHorizontal: hp(2),
  },
  buttonContainer: {
    marginVertical: hp("3%"),
    alignItems: "center",
  },
});


export default ConfrimWarehouse;
