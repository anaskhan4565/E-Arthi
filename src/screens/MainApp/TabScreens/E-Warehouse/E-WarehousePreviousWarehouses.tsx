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
import { fonts } from "../../../../../util/FontName";
import WarehouseHistory from "../../../../../util/WarehouseHistory";
import Navbar from "../../Navbar/Navbar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/colors";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp";
import { useNavigation } from "@react-navigation/native";
import ScreensName from "../../../../../util/ScreensName";
import CustomButton from "../../../../components/CustomButton";
import CustomBarChart from "./CustomStylesComp/Chart";

function PurchaseHisotry(): React.JSX.Element {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const barChartData = {
    labels: ["PASSCO", "Cargill", "Kissan", "PASSCO", "Cargill"],
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
        <View style={styles.searchbar}>
          <CustomSearchApp placeholder={t("Search in here")} />
        </View>
        <View style={{marginBottom:hp(1) }} >
          <Text style={{ fontSize: hp(3.5), fontFamily: fonts.ExtraBold, letterSpacing: hp(0.6) }}>E-Warehouses</Text>
        </View>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>{t("Your Warehouses")}</Text>
          <CustomButton
            MainText={t("New Warehouse")}
            BgGiven={colors.GREEN}
            name={ScreensName.EWarehouseNewSpaceCropSelect}
            txColor={colors.WHITE}
            isNavigation={1}
            wgiven={wp(40)}
            hgiven={hp(4)}
          />
        </View>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>{t("Warehouse")}</Text>
          <Text style={styles.tableHeaderText}>{t("Date Reserved")}</Text>
        </View>
        {WarehouseHistory.map(
          (data, index) =>
            data.name.trim() !== "" && (
              <TouchableOpacity
                style={styles.tableRow}
                key={index}
                onPress={() => {
                  navigation.navigate(ScreensName.EWarehousePreviousWarehouseDetails);
                }}
              >
                <Text style={styles.tableRowText}>{data.name}</Text>
                <Text style={styles.tableRowText}>{data.date} </Text>
              </TouchableOpacity>
            )
        )}
      </View>
      <View style={{ flex: 0.5,marginTop:hp(5),}}>
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
    paddingHorizontal: wp(4),
  },
  searchbar: {
    marginVertical: hp(1.3),
    height: hp(7),
    alignSelf:'flex-start',
    width:wp(85)
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
