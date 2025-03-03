import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/Constants/FontName.js";
import WarehouseHistory from "../../../../../util/Data/WarehouseHistory.js";
import Navbar from "../../Navbar/Navbar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/Constants/colors.js";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp";
import { useNavigation } from "@react-navigation/native";
import ScreensName from "../../../../../util/Constants/ScreensName.ts";
import CustomButton from "../../../../components/CustomButton";
import CustomBarChart from "./CustomStylesComp/Chart";
import InventoryProduct from "../../CustomComponent/WarehouseProduct.jsx";
import { MMKV } from "react-native-mmkv";

function PurchaseHisotry(): React.JSX.Element {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const storage = new MMKV();

  const handlePress = (name, type) => {
    storage.set("AvailableWarehouse", name);
    storage.set("StorageType", type);
    navigation.navigate(ScreensName.EWarehousePreviousWarehouseDetails);
  }
  const barChartData = {
    labels: ["PASSCO", "Cargill", "Kissan", "Suncrop Group", "GrowPak Store"],
    datasets: [
      {
        data: [5000, 10000, 7500, 12500, 9000],
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
      <View style={styles.mainContent}>
        <View style={styles.mainContent2}>

          <View style={styles.searchbar}>
            <CustomSearchApp placeholder={t("Search in here")} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', alignSelf: 'baseline' }}>
            <Text
              style={{
                fontSize: hp(3),
                paddingTop: hp(0.2),
                fontFamily: fonts.SemiBold,
                marginRight: wp(10) // Add minimal spacing only if needed for readability
              }}
            >
              E-Warehouse
            </Text>
            <CustomButton
              MainText={t("New Warehouse")}
              BgGiven={colors.GREEN}
              name={ScreensName.EWarehouseNewSpaceCropSelect}
              txColor={colors.WHITE}
              isNavigation={1}
              wgiven={wp(36)}
              tx_size={hp(0.1)}
              hgiven={hp(3.7)}
              tx_center={true}
            />
          </View>

          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>{t("Warehouse")}</Text>
            <Text style={styles.tableHeaderText}>{t("Date Reserved")}</Text>
          </View>
        </View>
        <View style={{ flex: 1, marginHorizontal: hp(1), justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
          {WarehouseHistory.map(
            (data, index) =>
              data.name.trim() !== "" && (
                <TouchableOpacity
                  style={styles.tableRow}
                  key={index}
                  onPress={() => {
                    storage.set("AvailableWarehouse", data.name);
                    storage.set("StorageType", data.type);
                    navigation.navigate(ScreensName.EWarehousePreviousWarehouseDetails);
                  }}
                >
                  <InventoryProduct name={data.name} SecondaryText={data.date} secTextWidth={hp(1.8)} allowImg={false} w={hp(42)} h={hp(5)} isNavigation={true} customPress={1} handlePress={() => { handlePress(data.name, data.type) }} />
                </TouchableOpacity>
              )
          )}
        </View>
      </View>
      <View style={{ flex: 0.5, marginTop: hp(5), }}>
        <CustomBarChart
          data={barChartData}
          legendTitle="Warehouse Space Stats"
          barColor="#FF6F61"
          bgColor={colors.WHITE}
        />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  navbarContainer: {
    height: hp(8.5),
    backgroundColor: colors.WHITE,
  },
  mainContent: {
    flex: 0.5,
  },
  mainContent2: {
    paddingLeft: hp(2)
  },
  searchbar: {
    marginVertical: hp(1.3),
    height: hp(7),
    alignSelf: 'flex-start',
    width: wp(85)
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(1.2),
  },
  headerText: {
    fontFamily: fonts.SemiBold,
    fontSize: hp(2.4),
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.LIGHT_GRAY,
    paddingBottom: hp(1),
    gap: hp(5),
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
});

export default PurchaseHisotry;