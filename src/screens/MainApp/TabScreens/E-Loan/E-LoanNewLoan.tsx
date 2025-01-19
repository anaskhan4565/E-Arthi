import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  Dimensions,
  View,
  ScrollView,
} from "react-native";
import colors from "../../../../../util/colors";
import CustomInput from "../../../../components/CustomInput";
import CustomButton from "../../../../components/CustomButton";
import ScreensName from "../../../../../util/ScreensName";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/FontName";
import Navbar from "../../Navbar/Navbar";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp";

const { height } = Dimensions.get("window");

function EInventory(): React.JSX.Element {
  const { t } = useTranslation();

  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    const year: number = new Date().getFullYear();
    setCurrentYear(year);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.searchContainer}>
          <CustomSearchApp placeholder={t("Search in here")} />
        </View>
        <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.heading}>{t("New Loan")}</Text>
        </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Loan Amount (in PKR)</Text>
            <CustomInput
              placeholder={t("Amount")}
              h={hp("5.5%")}
              w={wp("85%")}
              b_radius={10}
              bg_give={colors.WHITE}
              hide={(0)}
            />
          </View>   
          <Text style={styles.subHeading}>Past Performance</Text>
          {currentYear && ["Current", currentYear - 1, currentYear - 2,currentYear - 3].map((year) => (
            <View key={year} style={styles.inputContainer}>
              <Text style={styles.label}>{year}</Text>
              <CustomInput
                placeholder=""
                h={hp("5.5%")}
                w={wp("85%")}
                b_radius={10}
                bg_give={colors.WHITE}
                hide={(0)}
              />
            </View>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            MainText={t("Apply")}
            BgGiven={colors.GREEN}
            name={ScreensName.ELoan}
            txColor={colors.WHITE}
            isNavigation={1}
          />
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
    marginVertical: hp("3%"),
    height: hp("7%"),
  },
  header: {
    // borderWidth: 1,
    // marginBottom: height / 20,
  },
  heading: {
    fontSize: hp(3),
    fontFamily: fonts.SemiBold,
    color: colors.BLACK,
    // marginLeft: wp("2%"),
  },
  subHeading: {
    fontSize: hp(2.5),
    fontFamily: fonts.Medium,
    marginTop: hp("1%"),
    marginLeft: wp("2%"),
  },
  body: {
    gap: hp("2%"),
    alignItems: "center",
  },
  inputContainer: {
    gap: hp("1%"),
  },
  label: {
    fontFamily: fonts.Medium,
    fontSize: hp("2%"),
  },
  buttonContainer: {
    marginTop: hp("5%"),
    alignItems: "center",
  },
});

export default EInventory;
