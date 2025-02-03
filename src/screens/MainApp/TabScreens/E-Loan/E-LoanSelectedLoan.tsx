import React from "react";
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
import { fonts } from "../../../../../util/FontName";
import LoanCategoryDetails from "../../../../../util/LoanCategoryDetails";
import Navbar from "../../Navbar/Navbar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/colors";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp";
import MyPieChart from "./CustomComponents/PiChart";

function CurrentLoan({ val1 = 10241, val2 = 5990 }): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
      <View style={{ flex: 7 }}>
        <View style={styles.searchbar}>
          <CustomSearchApp placeholder={"Search in here"} />
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontFamily: fonts.bold, fontSize: hp(2.4) }}>
            Loan Report 2024
          </Text>

          <MyPieChart
            chartWidth= {wp(55)}
          chartHeight ={ hp(19)}
          containerHeight={hp(30)}
          containerWidth={wp(55)}
          data={[
            {
              name: "Total Loan Amount",
              value: val1,
              color: "#FF6F61",
            },
            {
              name: "Remaining Loan",
              value: val2,
              color: "#6B8E23",
            },
          ]}
          />
        </View>
        <View
          style={{
            marginBottom: hp(1.2),
            marginTop: hp(0),
            marginHorizontal: wp(5),
          }}
        >
          <Text style={{ fontFamily: fonts.SemiBold, fontSize: hp(2.4) }}>
            {t("Selected Loan")}
          </Text>
        </View>
        <View style={styles.MainHeader}>
          <View style={styles.HeaderSection}>
            <Text style={styles.SectionHead}>{t("Loan Amount")}</Text>
            <Text style={styles.SectionBody}>PKR 110,000</Text>
          </View>
          <View style={styles.HeaderSection}>
            <Text style={styles.SectionHead}>{t("Amount Left")}</Text>
            <Text style={styles.SectionBody}>PKR 85,000</Text>
          </View>
          <View style={styles.HeaderSection}>
            <Text style={styles.SectionHead}>{t("Line of Credit")}</Text>
            <Text style={styles.SectionBody}>PKR 70,000</Text>
          </View>
          <View style={styles.HeaderSection}>
            <Text style={styles.SectionHead}>{t("Cash")}</Text>
            <Text style={styles.SectionBody}>PKR 52,130</Text>
          </View>
        </View>

        <View style={styles.Header}>
          <Text style={styles.HeaderCol}>{t("Category")}</Text>

          <Text style={styles.HeaderCol}>{t("Amount")}</Text>
        </View>
        {LoanCategoryDetails.map(
          (data, index) =>
            data.category.trim() !== "" && (
              <View style={styles.row} key={index}>
                <View style={styles.decsAndQty}>
                  <Text style={styles.date}>{t(data.category)}</Text>
                </View>
                <Text style={styles.cost}>PKR: {data.cost}</Text>
              </View>
            )
        )}
      </View>
    </ScrollView>
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
    height: hp(5),
    marginTop: hp(2),
  },
  HeaderCol: {
    fontFamily: fonts.SemiBold,
    fontSize: hp(2),
    width: wp(29),
    textAlign: "left",
  },
  date: {
    fontFamily: fonts.Regular,
    fontSize: hp(2),
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
    marginHorizontal: wp(4),
    marginVertical: hp(1),
  },
  HeaderSection: {
    width: "41%",
    aspectRatio: 1,
    justifyContent: "center",
    margin: "1%",
    textAlign: "left",
  },
  SectionHead: {
    fontFamily: fonts.Medium,
    color: colors.GREEN,
    fontSize: hp(1.3),
  },
  SectionBody: {
    fontFamily: fonts.SemiBold,
    fontSize: hp(2.2),
  },
  MainHeader: {
    width: wp(90),
    height: hp(25),
    backgroundColor: colors.GREAT_WHITE,
    alignSelf: "center",
    borderRadius: hp(1),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "space-between",
    padding: 10,
    elevation: 5,
  },
});

export default CurrentLoan;
