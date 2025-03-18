import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar.jsx";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/Constants/colors.js";

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
import { MMKV } from "react-native-mmkv";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ScreensName from "../../../../../util/Constants/ScreensName.ts";

const DosageCalulator = () => {
  return (
    <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>
            <ScrollView style={styles.container}>
                
    
            </ScrollView>
            
        </SafeAreaView>
  )
}

export default DosageCalulator

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: colors.WHITE,
  },
  navbarContainer: {
      height: hp("8.2%"),
      backgroundColor: "white",
      marginTop: hp("0.14%"),
  },
});