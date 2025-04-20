import React, { useState, useRef, useEffect } from "react";
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
  Animated,
  Easing,
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
  // For animation
  const translateY = useRef(new Animated.Value(100)).current;
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  
  //for translation
  const { t } = useTranslation();
  
  useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.5)),
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.7)),
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Animated.View style={[
          styles.iconContainer,
          {
            transform: [
              { translateY },
              { scale }
            ],
            opacity
          }
        ]}>
          <View style={styles.circleBackground}>
            <Image 
              source={require('../../assets/Success.png')} 
              style={styles.tickIcon}
              resizeMode="contain"
            />
          </View>
        </Animated.View>
        
        <Animated.View style={[styles.textContainer, { opacity }]}>
          <Text style={styles.Heading}>{t('Biometric Success')}</Text>
          <Text style={styles.SubHeading}>{t('Congratulations! Your biometric verification is successful.')}</Text>
        </Animated.View>
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(10),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(5),
  },
  circleBackground: {
    width: wp(30),
    height: wp(30),
    borderRadius: wp(15),
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  tickIcon: {
    width: hp(30),
    height: wp(25),
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  Heading: {
    fontSize: height / 25,
    fontFamily: fonts.SemiBold,
    color: colors.BLACK,
    textAlign: 'center',
  },
  SubHeading: {
    fontSize: height / 45,
    fontFamily: fonts.Regular,
    marginTop: height / 100,
    textAlign: 'center',
    paddingHorizontal: wp(5),
  },
  button: {
    marginTop: height / 20,
    alignItems: "center",
    marginBottom: hp(5),
  },
});

export default BiometricSuccess;