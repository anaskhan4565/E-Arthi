import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Dimensions,
  useColorScheme,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import colors from "../../../util/Constants/colors";
import CustomButton from "../../components/CustomButton";
import ScreensName from "../../../util/Constants/ScreensName";
import { useNavigation } from '@react-navigation/native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { height, width } = Dimensions.get("window");

import { useTranslation } from "react-i18next";
import { fonts } from "../../../util/Constants/FontName";


function BiometricSuccess() {
  //for translation
  const { t } = useTranslation();

  //
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Header}>
        <Text style={styles.Heading}>{t('Biometric Success')}</Text>
        <Text style={styles.SubHeading}>{t('Congratulations! Your biometric verification is successful.')}</Text>
      </View>

      <View style={styles.button}>
        <CustomButton
          MainText={t('Continue')}
          BgGiven={colors.GREEN}
          name={ScreensName.OTP}
          txColor={colors.WHITE}
          isNavigation={1}
        ></CustomButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingHorizontal: width / 20,
  },
  Header: {
    marginTop: height / 10,
    marginBottom: height / 20,
  },
  Heading: {
    fontSize: height / 25,
    fontFamily: fonts.SemiBold,
    marginLeft: wp('1.5%'),
    color: colors.BLACK,
  },
  SubHeading: {
    fontSize: height / 45,
    fontFamily: fonts.Regular,
    marginTop: height / 100,
    marginLeft: wp('1.5%'),
  },
  button: {
    marginTop: height / 20,
    alignItems: "center",
  },
});

export default BiometricSuccess;