import React, { useState } from "react";
import type { PropsWithChildren } from "react";
import ECategories from "../../../../../util/Data/E-Categories.js";
import Navbar from "../../Navbar/Navbar.jsx";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp.jsx";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/Constants/colors.js";
import { EInventoryDet } from "../../../../../util/Data/E-Inventory.js";
import EInventoryBoxes from "../../CustomComponent/EInventoryBoxes.jsx";
import { ELoanBank } from "../../../../../util/Data/E-Loan.js";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/Constants/FontName.js";
import ScreensName from "../../../../../util/Constants/ScreensName.ts";
import SwitchButtonCustom from "./components/SwitchButton.jsx";
import RaastRecieving from "./Raastrecieving.tsx";
import CustomInputAndText from "../E-Loan/NewLoanComponents/CustomInputAndText.jsx";
import BankRecieving from "./BankRecieving.tsx";

function Recieving(): React.JSX.Element {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState("Raast ID");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.searchContainer}>
          <CustomSearchApp placeholder={t("Search in here")} />
        </View>
        <View style={{ marginHorizontal: hp(2.5) }}>
          <Text
            style={{
              fontSize: hp(2.5),
              fontFamily: fonts.SemiBold,
              letterSpacing: hp(0.1),
              marginLeft: hp(1),
            }}
          >
            {t('Receiving Method')}
          </Text>
        </View>
        <View style={[styles.bodyContainer]}>
          <SwitchButtonCustom
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          {selectedOption !== "Raast ID" ? (
            <BankRecieving />
          ) : (
            <RaastRecieving />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
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
    padding: 10,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 25,
  },
  recommendedProducts: {
    marginTop: 20,
  },
  recommendedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});

export default Recieving;
