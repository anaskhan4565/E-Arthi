import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import colors from "../../../../../util/Constants/colors.js";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { fonts } from "../../../../../util/Constants/FontName.js";
import CustomInputAndText from "../E-Loan/NewLoanComponents/CustomInputAndText.jsx";
import CustomButton from "../../../../components/CustomButton.jsx";
import ScreensName from "../../../../../util/Constants/ScreensName.ts";

const RaastRecieving = () => {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.Wrapper}>
        <Image
          source={require("../../../../assets/raast.png")}
          style={[styles.ImageStyle]}
        />
      </View>
      <View style={styles.inputs}>
        <CustomInputAndText
          PlaceHolderGiven={"Raast ID"}
          InputHolder={"Raast ID"}
        />

        <CustomButton
          MainText={"Save Information"}
          BgGiven={colors.GREEN}
          txColor={colors.WHITE}
          isNavigation={1}
          wgiven={wp(90)}
          hgiven={hp(5)}
          name={ScreensName.MyProfileMainStack}
        />
      </View>
      <View></View>
    </ScrollView>
  );
};

export default RaastRecieving;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  Wrapper: {
    width: hp("30%"),
    height: hp("30%"),
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: hp("1.3%"),
    backgroundColor: colors.WHITE,
    marginHorizontal: hp("1.4%"),
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: hp(1),
  },
  TextStyle: {
    textAlign: "center",
  },
  ImageStyle: {
    resizeMode: "contain",
    marginBottom: hp(0.5),
    height: hp(30),
    width: hp(30),
    alignSelf: "center",
  },
  inputs: {
    marginTop: hp(2),
    gap: hp(2)
  },
});
