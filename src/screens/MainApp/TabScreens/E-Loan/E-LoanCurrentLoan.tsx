import React, { useEffect, useState } from "react";
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
import LoanCategoryDetails from "../../../../../util/LoanCategoryDetails";
import LoanVendorDetails from "../../../../../util/LoanVendorDetails";

import Navbar from "../../Navbar/Navbar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/colors";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp";
import MyPieChart from "./CustomComponents/PiChart";
import CustomPicker from "../../EMandi/CustomComp/CustomPicker";
import CustomBoxSort from "./CustomComponents/CustomBoxSort";
import FilterPic from "./CustomPictures/try/filter.png";

function CurrentLoan(): React.JSX.Element {
  const { t } = useTranslation();
  const currency = "Rs"; // Currency header
  const selectionBoth = [LoanCategoryDetails, LoanVendorDetails];
  const [currentState, setCurrentState] = useState(0);

  const [ByName, SetByName] = useState(0);
  const [ByPrice, SetByPrice] = useState(0);
  const [ByCategory, SetByCategory] = useState(0);

  const [activeState, setActiveState] = useState(false);
  useEffect(() => {
    console.log(currentState);
  }, [currentState]);

  // Function to format numbers with commas
  const formatNumber = (num) => new Intl.NumberFormat("en-US").format(num ?? 0);

  // Function to sort the data based on state
  const sortData = (data, byName, byPrice, byCategory) => {
    let sortedData = [...data];

    // Sorting by Name (alphabetically)
    if (byName) {
      sortedData = sortedData.sort((a, b) =>
        a.category.localeCompare(b.category)
      );
    }

    // Sorting by Price (numerically)
    if (byPrice) {
      sortedData = sortedData.sort((a, b) => {
        const costA = a.cost ?? 0; // Ensure valid numbers
        const costB = b.cost ?? 0;
        return costA - costB;
      });
    }

    // Sorting by Category (reverse order as an example)
    if (byCategory) {
      sortedData = sortedData.reverse();
    }

    return sortedData;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
      <View style={{ flex: 7 }}>
        <View style={styles.searchbar}>
          <CustomSearchApp placeholder={t("Search in here")} />
        </View>
        <View
          style={{
            marginBottom: hp(1.2),
            marginTop: hp(0),
            marginHorizontal: wp(5),
          }}
        >
          <Text style={{ fontFamily: fonts.Bold, fontSize: hp(3) }}>
            {t("Current Loan")}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MyPieChart
            data={[
              { name: t("Total Loan Amount"), value: 100000, color: "#FF6F61" },
              { name: t("Remaining Loan"), value: 25000, color: "#6B8E23" },
            ]}

            chartHeight={hp(15)}
          />

          <MyPieChart
            chartHeight={hp(15)}
            data={[
              {
                name: t("Unutilized Cash Line"),
                value: 40000,
                color: "#7ED321",
              },
              {
                name: t("Unutilized Line of Credit"),
                value: 25000,
                color: "#4A90E2",
              },
            ]}
            legend1Name={"Unutilized Cash Line"}
            legend1Population={32425}
            legend2Name={"Unutilized Line of Credit"}
            legend2Population={42221}
            legend1_color={'#F3495F'}
            legend2_color={'#49F3DD'}

          />
        </View>
        <View style={styles.MainHeader}>
          <View style={styles.mainboxrow}>
            <View style={styles.HeaderSection}>
              <Text style={styles.SectionHead}>{t("Requested amount")}</Text>
              <Text style={styles.SectionBody}>
                {currency} {formatNumber(100000)}
              </Text>
            </View>
            <View style={styles.HeaderSection}>
              <Text style={styles.SectionHead}>{t("Amount Left")}</Text>
              <Text style={styles.SectionBody}>
                {currency} {formatNumber(25000)}
              </Text>
            </View>
          </View>
          <View style={styles.mainboxrow}>
            <View style={styles.HeaderSection}>
              <Text style={styles.SectionHead}>{t("Line of Credit")}</Text>
              <Text style={styles.SectionBody}>
                {currency} {formatNumber(70000)}
              </Text>
            </View>
            <View style={styles.HeaderSection}>
              <Text style={styles.SectionHead}>{t("Cash")}</Text>
              <Text style={styles.SectionBody}>
                {currency} {formatNumber(30000)}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text
            style={[
              styles.HeaderCol,
              {
                width: hp(30),
                fontSize: hp(3),
                marginHorizontal: hp(2),
                marginTop: hp(2),
                fontFamily: fonts.Bold,
              },
            ]}
          >
            {t("Payment Details")}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              borderWidth: hp(0.3),
              margin: hp(1),
              borderRadius: hp(1),
              gap: hp(1),
              justifyContent: "space-evenly",
              borderColor: colors.GREAT_WHITE,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                margin: hp(1),
                marginRight: hp(1),
              }}
            >
              <Image
                source={FilterPic} // Toggle between active and default image
                style={{ width: hp(4), height: hp(3.5) }}
              />
            </View>
            <CustomBoxSort
              title={t("Name")}
              activeState={ByName}
              setActiveState={SetByName}
            />
            <CustomBoxSort
              title={t("Category")}
              activeState={ByCategory}
              setActiveState={SetByCategory}
            />
            <CustomBoxSort
              title={t("Price")}
              activeState={ByPrice}
              setActiveState={SetByPrice}
            />
          </View>
          <View style={[styles.Header]}>
            <CustomPicker
              items={[
                { label: "Type", value: "Type" },
                { label: "Vendor", value: "Vendor" },
                { label: "Price", value: "Price" },
              ]}
              isheader={true}
              bg_color_on={false}
              allow_shadow={true}
              min_given={hp(18)}
              currentState={currentState}
              setCurrentState={setCurrentState}
              stateName={"CategoryVendor"}
              w_given={hp(20)}
              tx_color={colors.BLACK}
              padding_f={true}
            />
            <Text style={styles.HeaderCol}>{t("Amount")}</Text>
          </View>
          {sortData(
            selectionBoth[currentState],
            ByName,
            ByPrice,
            ByCategory
          ).map((data, index) => (
            <View style={styles.row} key={index}>
              <View style={styles.decsAndQty}>
                <Text style={styles.date}>{t(data.category)}</Text>
              </View>
              <Text style={styles.cost}>
                {currency}: {formatNumber(data.cost)}
              </Text>
            </View>
          ))}
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
    width: wp(37),
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
    marginLeft: wp(5),
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
    width: wp(35),
    height: hp(10),
    //aspectRatio: 1,
    justifyContent: "center",
    margin: "1%",
    textAlign: "left",
  },
  SectionHead: {
    fontFamily: fonts.Medium,
    color: colors.GREEN,
    fontSize: hp(1.6),
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
  mainboxrow: {
    flexDirection: "row",
    width: wp(95),
    height: hp(9),
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
    // backgroundColor: "red",
    alignSelf: "center",
  },
});

export default CurrentLoan;
