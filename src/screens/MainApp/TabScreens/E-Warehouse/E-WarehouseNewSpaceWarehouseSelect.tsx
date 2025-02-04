import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/FontName";
import allNames from "../../../../../util/AvailableWarehouses";
import Navbar from "../../Navbar/Navbar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/colors";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp";
import { useNavigation } from "@react-navigation/native";
import ScreensName from "../../../../../util/ScreensName";
import WarehousePic from './TempImages/WarehouseBG.jpg'
import EInventoryBoxes from "../../CustomComponent/EInventoryBoxes";
import InventoryProduct from "../../CustomComponent/WarehouseProduct";
function PurchaseHisotry(): React.JSX.Element {
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.searchbar}>
          <CustomSearchApp placeholder={"Search in here"} />
        </View>
        <View
          style={{
            marginBottom: hp(1.2),
            marginTop: hp(0),
            marginHorizontal: wp(5),
          }}
        >
          <Text style={{ fontFamily: fonts.SemiBold, fontSize: hp(2.4) }}>
            {t("Available Warehouses")}
          </Text>
        </View>
        <View style={styles.Header}>
          <Text style={styles.HeaderCol}>Warehouse Name</Text>
          <Text style={styles.HeaderCol}>{t("Distance from You")}</Text>
        </View>
        <View style={{flex:1}}>
        {allNames.map(
          (data, index) =>
            data.name.trim() !== "" && (
              <TouchableOpacity
                style={styles.row}
                key={index}
                onPress={() => {
                  navigation.navigate(ScreensName.EWarehouseNewSpaceConfirmWarehouse);
                }}
              >
                <InventoryProduct name={data.name} SecondaryText={data.distance} allowImg={false} w={hp(44)} h={hp(6)} isNavigation={true} navigateTo={ScreensName.EWarehouseNewSpaceConfirmWarehouse} />

              </TouchableOpacity>
            )
        )}
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    height: hp("7%"),
  },
  Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: wp(4),
    height: hp(10),
  },
  HeaderCol: {
    fontFamily: fonts.SemiBold,
    fontSize: hp(2),
    width: wp(29),
    textAlign: "left",
  },
  date: {
    fontFamily: fonts.Regular,
    fontSize: hp(1.8),
    width: wp(30),
  },
  cost: {
    fontFamily: fonts.Regular,
    fontSize: hp(2),
    width: wp(40),
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
    marginVertical: hp(1),
  },
});

export default PurchaseHisotry;
