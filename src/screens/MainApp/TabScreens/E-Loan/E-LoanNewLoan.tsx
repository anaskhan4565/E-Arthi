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

function ELoanNewLoan() {
  const { t } = useTranslation();
  const [currentYear, setCurrentYear] = useState(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.searchContainer}>
          <CustomSearchApp placeholder={t("Search in here")} />
        </View>
        <View style={styles.body}>
          <View style={styles.header}>
            <Text style={styles.heading}>{t("Requested amount")}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel,{marginBottom: hp(1)}]}>{t("Loan Amount (in PKR)")}</Text>
            <CustomInput
              placeholder={t("Amount")}
              h={hp("5.5%")}
              w={wp("85%")}
              b_radius={10}
              
              bg_give={colors.WHITE}
              want={false}

            />
          </View>
          <Text style={styles.subHeading}>{t("Past Performance")}</Text>
          {currentYear &&
            ["Current", currentYear - 1, currentYear - 2, currentYear - 3].map((year) => (
              <View key={year} style={styles.inputContainer}>
                <Text style={styles.label}>{t(year)}</Text>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>{t("Yield")}</Text>
                  <CustomInput
                    h={hp("5.5%")}
                    w={wp("67%")}
                    b_radius={10}
                    want={false}

                    bg_give={colors.WHITE}
                  />
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>{t("Revenue")}</Text>
                  <CustomInput
                    h={hp("5.5%")}
                    w={wp("67%")}
                    b_radius={10}
                    bg_give={colors.WHITE}
                    want={false}
                  />
                </View>
              </View>
            ))}
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            MainText={t("Apply")}
            BgGiven={colors.GREEN}
            name={ScreensName.EloanOTP}
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
  scrollContainer: {
    flex: 1,
  },
  searchContainer: {
    marginVertical: hp("3%"),
    height: hp("7%"),
    paddingHorizontal: wp("5%"),
  },
  header: {
    marginBottom: hp("2%"),
  },
  heading: {
    fontSize: hp("3%"),
    fontFamily: fonts.SemiBold,
    color: colors.BLACK,
  },
  subHeading: {
    fontSize: hp("2.5%"),
    fontFamily: fonts.Medium,
    marginTop: hp("1%"),
    marginLeft: wp("2%"),
  },
  body: {
    paddingHorizontal: wp("5%"),
    paddingBottom: hp("5%"),
  },
  inputContainer: {
    marginVertical: hp("2%"),
  },
  label: {
    fontFamily: fonts.SemiBold,
    fontSize: hp("2%"),
    marginBottom: hp("1%"),
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1.5%"),
  },
  inputLabel: {
    fontFamily: fonts.Regular,
    fontSize: hp("2%"),
    marginRight: wp("3%"),
    flex: 1,
  },
  buttonContainer: {
    alignItems: "center",
  },
});

export default ELoanNewLoan;
