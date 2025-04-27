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
  Image,
} from "react-native";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/Constants/FontName.js";
import { MMKV } from "react-native-mmkv";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ScreensName from "../../../../../util/Constants/ScreensName.ts";

import CloudSun from "../../../../assets/MainApp/PlantDoctor/CloudSun.png";


const PlantDoctor = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar gobackOnly={true} />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.Title}>
          <Text style={styles.TitleText}>{t("Plant Doctor")}</Text>
        </View>

        {/* Weather and Spraying Section */}
        <View style={styles.Header}>
          <View style={styles.HeaderSection}>
            <View style={styles.HeaderRow}>
              <Image source={CloudSun} style={styles.HeaderImage} />
              <Text style={styles.HeaderText}>{t("Weather Conditions")}</Text>
            </View>
            <Text style={styles.HeaderSubText}>Cloudy - 26°C</Text>
          </View>
          <View style={styles.HeaderSection}>
            <View style={styles.HeaderRow}>
              <Image source={require('../../../../assets/MainApp/PlantDoctor/DropletHalf.png')} style={styles.HeaderImage} />
              <Text style={styles.HeaderText}>{t("Spraying Conditions")}</Text>
            </View>
            <Text style={styles.HeaderSubText}>{t("Unfavourable")}</Text>
          </View>
        </View>

        {/* Crops Section */}
        <View style={styles.cropsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Image source={require('../../../../assets/MainApp/PlantDoctor/carrot.png')} style={styles.cropIcon} />
            <Image source={require('../../../../assets/MainApp/PlantDoctor/banana.png')} style={styles.cropIcon} />
            <Image source={require('../../../../assets/MainApp/PlantDoctor/cabage.png')} style={styles.cropIcon} />
            <Image source={require('../../../../assets/MainApp/PlantDoctor/strawberry.png')} style={styles.cropIcon} />
            <Image source={require('../../../../assets/MainApp/PlantDoctor/carrot.png')} style={styles.cropIcon} />
            <Image source={require('../../../../assets/MainApp/PlantDoctor/banana.png')} style={styles.cropIcon} />
            <Image source={require('../../../../assets/MainApp/PlantDoctor/cabage.png')} style={styles.cropIcon} />
            <Image source={require('../../../../assets/MainApp/PlantDoctor/strawberry.png')} style={styles.cropIcon} />
          </ScrollView>
          <TouchableOpacity
            style={styles.addCropButton}
            onPress={() => navigation.navigate(ScreensName.AddCrop)}>
            <Text style={styles.addCropText}>{t("Add more crops")}</Text>
          </TouchableOpacity>
        </View>

        {/* Heal Your Crop Section */}
        <View style={styles.healSection}>
          <Text style={styles.sectionTitle}>{t("Heal Your Crop")}</Text>
          <Text style={styles.sectionSubtitle}>{t("Take a picture to see diagnosis and get a medicine")}</Text>
          <TouchableOpacity
            style={styles.takePictureButton}
            onPress={() => navigation.navigate(ScreensName.HealCropImageCapture)}>
            <Text style={styles.buttonText}>{t("Take picture")}</Text>
          </TouchableOpacity>
        </View>

        {/* Features Grid */}
        <View style={styles.featuresGrid}>
          <TouchableOpacity
            style={styles.featureItem}
            onPress={() => navigation.navigate(ScreensName.FertilizerCalculator)}>
            <Image source={require('../../../../assets/MainApp/PlantDoctor/Fertilizer.png')} style={styles.featureIcon} />
            <Text style={styles.featureText}>{t("Fertilizer Calculator")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureItem}
            onPress={() => navigation.navigate(ScreensName.PestsAndDiseases)}>
            <Image source={require('../../../../assets/MainApp/PlantDoctor/Worm.png')} style={styles.featureIcon} />
            <Text style={styles.featureText}>{t("Pests and Diseases")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureItem} onPress={() => navigation.navigate(ScreensName.CultivationTips)}>
            <Image source={require('../../../../assets/MainApp/PlantDoctor/Seedling.png')} style={styles.featureIcon} />
            <Text style={styles.featureText}>{t("Cultivation Tips")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureItem} onPress={() => navigation.navigate(ScreensName.PestAndDiseasesAlert)}>
            <Image source={require('../../../../assets/MainApp/PlantDoctor/Warning.png')} style={styles.featureIcon} />
            <Text style={styles.featureText}>{t("Pests and Disease Alert")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureItem} onPress={() => navigation.navigate(ScreensName.PlantDrCommunity)}>
            <Image source={require('../../../../assets/MainApp/PlantDoctor/Chat.png')} style={styles.featureIcon} />
            <Text style={styles.featureText}>{t("Community")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlantDoctor;

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
  Title: {
    marginHorizontal: hp("4%"),
    marginTop: hp("2%"),
  },
  TitleText: {
    fontSize: hp("2.5%"),
    fontFamily: fonts.SemiBold,
    color: colors.BLACK,
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp('4%'),
    marginTop: hp('2%'),
  },
  HeaderSection: {
    flex: 1,
    backgroundColor: colors.LIGHT_GREEN,
    padding: hp('2%'),
    borderRadius: 10,
    marginHorizontal: wp('1%'),
  },
  HeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  HeaderImage: {
    width: wp('6%'),
    height: wp('6%'),
    marginRight: wp('2%'),
  },
  HeaderText: {
    fontSize: hp('1.8%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
  },
  HeaderSubText: {
    fontSize: hp('1.6%'),
    fontFamily: fonts.Regular,
    marginTop: hp('1%'),
  },
  cropsContainer: {
    marginTop: hp('2%'),
    paddingHorizontal: wp('4%'),
  },
  addCropButton: {
    backgroundColor: colors.PRIMARY,
    padding: hp('1.5%'),
    borderRadius: 8,
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  addCropText: {
    color: colors.WHITE,
    fontFamily: fonts.Medium,
    fontSize: hp('1.8%'),
  },
  healSection: {
    marginTop: hp('3%'),
    paddingHorizontal: wp('4%'),
    alignItems: 'center',
    backgroundColor: colors.LIGHT_GREEN,
  },
  sectionTitle: {
    fontSize: hp('2.2%'),
    fontFamily: fonts.SemiBold,
    marginBottom: hp('1%'),
  },
  sectionSubtitle: {
    fontSize: hp('1.6%'),
    fontFamily: fonts.Regular,
    color: colors.GRAY,
    marginBottom: hp('2%'),
  },
  takePictureButton: {
    backgroundColor: colors.PRIMARY,
    padding: hp('1.5%'),
    paddingHorizontal: wp('8%'),
    borderRadius: 8,
  },
  buttonText: {
    color: colors.WHITE,
    fontFamily: fonts.Medium,
    fontSize: hp('1.8%'),
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    marginTop: hp('3%'),
    marginBottom: hp('2%'),
  },
  featureItem: {
    width: wp('28%'),
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  featureIcon: {
    width: wp('12%'),
    height: wp('12%'),
    marginBottom: hp('1%'),
  },
  featureText: {
    textAlign: 'center',
    fontSize: hp('1.6%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
  },
  cropIcon: {
    width: wp('12%'),
    height: wp('12%'),
    marginBottom: hp('1%'),
    marginHorizontal: wp('1%'),
  },
});