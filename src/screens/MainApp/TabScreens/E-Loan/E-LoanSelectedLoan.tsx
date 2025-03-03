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
import { fonts } from "../../../../../util/Constants/FontName";
import LoanCategoryDetails from "../../../../../util/Data/LoanCategoryDetails";
// import WomanFarmer from '../../../../assets/MainApp/E-Loan/';
import ELoanPiChart from '../../../../assets/MainApp/E-Loan/ELoanPiChart.svg';
import PiChartLegend from '../../../../assets/MainApp/E-Loan/PiChartLegend.svg';
import ELoanBarChart from '../../../../assets/MainApp/E-Loan/ELoanBarChart.svg';
import Navbar from "../../Navbar/Navbar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/Constants/colors";
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
        <View>
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>{t("Loan Report 2024")}</Text>
          </View>
          <ELoanPiChart style={styles.image} />
          <View >
            <PiChartLegend style={styles.image} width={hp(45)} height={hp(35)} />
          </View>
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>{t("Loan Payoff History")}</Text>
          </View>
          <ELoanBarChart style={styles.image} width={hp(45)} height={hp(50)} />
        </View>

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
  image: {
    width: wp(90),

    height: hp(10),
    resizeMode: 'contain',
    marginVertical: hp(1.5),
    alignSelf: 'center',
  },

  headerRow: {
    marginTop: hp(1),
    flexDirection: "row",
    width: wp(100),
    paddingHorizontal: wp(5),
    alignItems: "center",
  },
  headerText: {
    fontFamily: fonts.SemiBold,
    fontSize: hp(2.4)
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
