import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../../util/Constants/colors.js';
import { fonts } from '../../../../../../util/Constants/FontName.js';
import Navbar from '../../../Navbar/Navbar.jsx';
import ScreensName from '../../../../../../util/Constants/ScreensName.ts';

const SalamOnBoarding = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>{t("Salam Finance")}</Text>
        
        <View style={styles.imageContainer}>
          <Image
            source={require('./SalamPic.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.heading}>{t("Salam")}</Text>
          <Text style={styles.description}>
            {t("Salam is used as a mode of finance in Islamic Banks to cater to the working capital needs. Salam is a contract of Sale where the Seller undertakes to supply some specific commodity to the Buyer at a future date in exchange for a price fully paid in advance.")}
          </Text>
          <Text style={styles.description}>
            {t("Hence, the price is paid in cash whereas delivery of the purchased Goods is deferred. This type of financing is particularly beneficial for farmers and agricultural businesses.")}
          </Text>
          
          <Text style={styles.bulletTitle}>{t("Key Features:")}</Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>{t("Compliant with Shariah principles")}</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>{t("Upfront payment provides immediate liquidity")}</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>{t("Particularly suitable for agricultural financing")}</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>{t("Helps with cash flow management for producers")}</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => navigation.navigate(ScreensName.ELoanSalam)}
        >
          <Text style={styles.continueButtonText}>{t("Continue")}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SalamOnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  navbarContainer: {
    height: hp('8.5%'),
    backgroundColor: colors.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: colors.LIGHT_GRAY,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: hp('5%'),
    alignItems: 'center',
  },
  title: {
    fontSize: hp('3%'),
    fontFamily: fonts.SemiBold,
    color: colors.BLACK,
    marginTop: hp('3%'),
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  imageContainer: {
    width: wp('80%'),
    height: hp('25%'),
    marginVertical: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    paddingHorizontal: wp('6%'),
    marginTop: hp('2%'),
  },
  heading: {
    fontSize: hp('2.5%'),
    fontFamily: fonts.SemiBold,
    color: colors.BLACK,
    marginBottom: hp('1.5%'),
    textAlign: 'center',
  },
  description: {
    fontSize: hp('1.8%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    textAlign: 'justify',
    lineHeight: hp('2.8%'),
    marginBottom: hp('1.5%'),
  },
  bulletTitle: {
    fontSize: hp('2%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
    marginTop: hp('1.5%'),
    marginBottom: hp('1%'),
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: hp('0.8%'),
    paddingRight: wp('2%'),
  },
  bullet: {
    fontSize: hp('1.8%'),
    marginRight: wp('2%'),
    color: colors.GREEN,
    fontFamily: fonts.Bold,
  },
  bulletText: {
    fontSize: hp('1.8%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    flex: 1,
  },
  continueButton: {
    backgroundColor: colors.GREEN,
    width: wp('80%'),
    height: hp('6%'),
    borderRadius: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('3%'),
    marginHorizontal: wp('10%'),
  },
  continueButtonText: {
    color: colors.WHITE,
    fontSize: hp('2%'),
    fontFamily: fonts.Medium,
  },
});