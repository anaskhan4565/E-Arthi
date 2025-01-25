import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import colors from "../../../util/colors";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import ScreensName from "../../../util/ScreensName";
import { useNavigation } from '@react-navigation/native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { height, width } = Dimensions.get("window");

import { useTranslation } from "react-i18next";
import { fonts } from "../../../util/FontName";
import CustomPicker from "../MainApp/EMandi/CustomComp/CustomPicker";

function SignIn() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [SwitchedButton, SetSwitchedButton] = useState(false)
  useEffect(() => {
    console.log(SwitchedButton)
  }, [SwitchedButton])
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.Header}>
        <Text style={styles.Heading}>{t('Sign-in')}</Text>
        <Text style={styles.SubHeading}>{t('Welcome back, please login again')}</Text>
      </View>

      <View style={styles.inputs}>
        <View style={{ flexDirection: 'row', gap: hp(3) }}>
          <CustomButton MainText={'Login By Email'} hgiven={hp(4)} wgiven={wp(30)} b_width={0} b_end_only={SwitchedButton ? 4 : 0} onPressG={() => SetSwitchedButton(!SwitchedButton)} />
          <CustomButton MainText={'Login By Phone'} hgiven={hp(4)} wgiven={wp(30)} b_end_only={!SwitchedButton ? 4 : 0} b_width={0} onPressG={() => SetSwitchedButton(!SwitchedButton)} />
        </View>
        <View style={{ flexDirection: 'row', width: wp(85), justifyContent: 'center', alignItems: 'center' }}>
          {!SwitchedButton ?
            <View style={{ width: hp(8.5) }}>
              <CustomPicker
                items={[
                  { label: "+92", value: "+92" },
                  { label: "+91", value: "+91" },
                  { label: "+86", value: "+86" },
                ]}
                isheader={true}
                padding_f={true}
              />
            </View>
            : null}
          <CustomInput placeholder={SwitchedButton ? t('Username') : t('Phone Number')} h={hp('5.5%')} w={!SwitchedButton?wp('65%'):wp(84)} b_radius={10} bg_give={colors.WHITE} />
        </View>
        <View style={styles.passInputBox}>
          <TextInput
            style={styles.passInput}
            placeholder={t('Password')}
            placeholderTextColor={colors.LIGHT_GRAY}
            secureTextEntry={passwordVisible}
          />
          <TouchableOpacity
            style={styles.passToggleButton}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Image
              source={require("../../assets/EyeHide.png")}
              style={styles.showPassIcon}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.button}>
        <CustomButton
          MainText={t('Login')}
          BgGiven={colors.GREEN}
          name={ScreensName.MainTabNavigation}
          txColor={colors.WHITE}
          isNavigation={1}
        ></CustomButton>
      </View>
      <View style={styles.options}>
        <View style={styles.RememberMe}>
          <BouncyCheckbox
            size={20}
            fillColor={colors.GREEN}
            iconStyle={{ borderColor: colors.LIGHT_GRAY }}
            style={styles.checkbox}
            textComponent={true}
            innerIconStyle={{ borderRadius: 7 }}
          />
          <Text style={styles.RememberMeText}>{t('Remember me')}</Text>
        </View>
        <TouchableOpacity onPress={() => { navigation.navigate(ScreensName.ForgotPassword) }}>
          <Text style={styles.forgotPassword}>{t('Forgot Password')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.break}>
        <View style={styles.line} />
        <Text style={styles.ORtext}>{t('OR')}</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.altSignin}>
        <TouchableOpacity style={styles.altSigninButton}>
          <Image
            source={require("../../assets/google.png")}
            style={styles.altSigninButtonIcon}
          />
          <Text style={{ fontSize: hp('1.7%'), fontFamily: fonts.Regular }}>{t('Login with google')} </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.altSigninButton}>
          <Image
            source={require("../../assets/apple.png")}
            style={styles.altSigninButtonIcon}
          />
          <Text style={{ fontSize: hp('1.7%'), fontFamily: fonts.Regular }}>{t('Login with Apple')}  </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  navButtonsContainer: {
    flex: 0.1,
  },
  navButtons: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(10),
  },



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
  inputs: {
    gap: height / 40,
    alignItems: "center",
  },
  button: {
    marginTop: height / 20,
    alignItems: "center",
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp('2%'),
    alignItems: "center",
  },
  RememberMe: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    flex: 1,
  },
  RememberMeText: {
    fontSize: height / 58,
    marginLeft: 5,
    fontFamily: fonts.Regular,
  },
  checkbox: {
    marginLeft: wp('3%'),
  },
  forgotPassword: {
    flex: 1,
    alignItems: "flex-end",
    color: colors.GREEN,
    fontSize: height / 58,
    fontFamily: fonts.Regular,
    marginRight: wp('3%'),
  },
  break: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: height / 40,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.LIGHT_GRAY,
  },
  ORtext: {
    marginHorizontal: 10,
    fontSize: height / 55,
    color: colors.GREEN,
    fontFamily: fonts.Medium,
  },
  altSignin: {
    gap: height / 80,
  },
  altSigninButton: {
    height: hp('5.7%'),
    width: wp('85%'),
    borderColor: colors.LIGHT_GRAY,
    borderWidth: 1,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  altSigninButtonIcon: {
    width: wp('7%'),
    height: hp('4%'),
    marginRight: 10,
    resizeMode: 'contain',
  },
  passToggleButton: {},
  showPassIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  passInputBox: {
    height: hp('5.7%'),
    width: wp('85%'),
    fontSize: 18,
    fontFamily: fonts.Medium,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: hp('1%'),
    borderColor: colors.LIGHT_GRAY,
  },
  passInput: {
    flex: 3,
    fontSize: hp('1.7%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK
  },
});

export default SignIn;