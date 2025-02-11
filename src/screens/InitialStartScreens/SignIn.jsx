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
import CustomButton from "../../components/CustomButton";
import ScreensName from "../../../util/ScreensName";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import userData from "../../../util/User";

const { height, width } = Dimensions.get("window");

import { useTranslation } from "react-i18next";
import { fonts } from "../../../util/FontName";
import CustomPicker from "../MainApp/EMandi/CustomComp/CustomPicker";
import CustomInput from "../../components/CustomInput";

function SignIn() {
  const { t } = useTranslation();

  const [passwordVisible, setPasswordVisible] = useState(true);
  const navigation = useNavigation();
  const [SwitchedButton, SetSwitchedButton] = useState(false); // isEmail === SwitchedButton
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [number, setNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  useEffect(() => {
    setUsername("");
  }, [SwitchedButton]);

  const validateInput = () => {
    setErrorMessage(null);
    setUsernameError(false);
    setPasswordError(false);

    if (!username || !password) {
      setErrorMessage(t("Please fill all fields"));
      if (!username) setUsernameError(true);
      if (!password) setPasswordError(true);
      return;
    }

    // Check if user exists in the userData array
    const matchedUser = userData.find(user =>
      (SwitchedButton ? user.username === username : user.phoneNumber === username) &&
      user.password === password
    );

    if (!matchedUser) {
      setErrorMessage(t("Invalid username, phone number, or password"));
      setUsernameError(true);
      setPasswordError(true);
      return;
    }

    // Successful login
    console.log("Login successful!", matchedUser);
    navigation.navigate(ScreensName.MainTabNavigation); // Navigate to the home screen
  };
  const handleTextChange = (text) => {
    if (!SwitchedButton) {
      const numericText = text.replace(/[^0-9]/g, '');
      setUsername(numericText);
    } else {
      setUsername(text);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Header}>
        <Text style={styles.Heading}>{t("Sign-in")}</Text>
        <Text style={styles.SubHeading}>
          {t("Welcome back, please login again")}
        </Text>
      </View>

      <View style={styles.inputs}>
        <View style={{ flexDirection: "row", gap: hp(3) }}>
          <CustomButton
            MainText={t("Login By Email")}
            hgiven={hp(4)}
            wgiven={wp(40)}
            b_width={0}
            b_end_only={SwitchedButton ? 4 : 0}
            onPressG={() => SetSwitchedButton(!SwitchedButton)}
          />
          <CustomButton
            MainText={t("Login By Phone")}
            hgiven={hp(4)}
            wgiven={wp(40)}
            b_end_only={!SwitchedButton ? 4 : 0}
            b_width={0}
            onPressG={() => SetSwitchedButton(!SwitchedButton)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            width: wp(85),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!SwitchedButton ? (
            <View style={{ width: hp(10) }}>
              <CustomPicker
                items={[
                  { label: "+92", value: "+92" },
                  { label: "+91", value: "+91" },
                  { label: "+86", value: "+86" },
                ]}
                isheader={true}
                padding_f={true}
                placeholder={"+92"}
                w_given={hp(10)}
                min_given={hp(11)}
              />
            </View>
          ) : null}
          <View
            style={[
              styles.passInputBox,
              { borderColor: usernameError ? colors.RED : colors.LIGHT_GRAY, width: SwitchedButton ? wp(84) : wp(60) },
            ]}
          >

            <TextInput
              style={[styles.passInput]}
              placeholder={SwitchedButton ? t("@agri.pk") : t("Phone Number")}
              placeholderTextColor={usernameError ? colors.RED : colors.LIGHT_GRAY}
              value={username}
              onChangeText={(value) =>handleTextChange(value)}
            />
          </View>
        </View>
        <View
          style={[
            styles.passInputBox,
            { borderColor: passwordError ? colors.RED : colors.LIGHT_GRAY },
          ]}
        >
          <TextInput
            style={[styles.passInput]}
            placeholder={t("Password")}
            placeholderTextColor={passwordError ? colors.RED : colors.LIGHT_GRAY}
            secureTextEntry={passwordVisible}
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <TouchableOpacity
            style={styles.passToggleButton}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Image
              source={require("../../assets/EyeHide.png")}
              style={styles.showPassIcon}
            />
          </TouchableOpacity>
        </View>
        {errorMessage && <View style={styles.errorBox}>
          <Text style={styles.error}>{errorMessage}</Text>
        </View>}
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button} onPress={validateInput}>
          <Text style={styles.buttonText}>{t("Login")}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.options}>
        <View style={styles.RememberMe}>
          <BouncyCheckbox
            size={hp(2)}
            fillColor={colors.GREEN}
            iconStyle={{ borderColor: colors.LIGHT_GRAY }}
            style={styles.checkbox}
            textComponent={true}
            innerIconStyle={{ borderRadius: 5 }}
          />
          <Text style={styles.RememberMeText}>{t("Remember me")}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreensName.ForgotPassword);
          }}
        >
          <Text style={styles.forgotPassword}>{t("Forgot Password")}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.break}>
        <View style={styles.line} />
        <Text style={styles.ORtext}>{t("OR")}</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.altSignin}>
        <TouchableOpacity style={styles.altSigninButton}>
          <Image
            source={require("../../assets/whatsapp.png")}
            style={{
              width: wp("5%"),
              height: hp("4%"),
              marginRight: 10,
              resizeMode: "contain",
            }}
          />
          <Text style={{ fontSize: hp("1.7%"), fontFamily: fonts.Regular }}>
            {t("login with Whatsapp")}{" "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.altSigninButton}>
          <Image
            source={require("../../assets/google.png")}
            style={styles.altSigninButtonIcon}
          />
          <Text style={{ fontSize: hp("1.7%"), fontFamily: fonts.Regular }}>
            {t("Login with google")}{" "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.altSigninButton}>
          <Image
            source={require("../../assets/apple.png")}
            style={styles.altSigninButtonIcon}
          />
          <Text style={{ fontSize: hp("1.7%"), fontFamily: fonts.Regular }}>
            {t("Login with Apple")}{" "}
          </Text>
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
    flexDirection: "row",
    justifyContent: "center",
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
    marginLeft: wp("1.5%"),
    color: colors.BLACK,
  },
  SubHeading: {
    fontSize: height / 45,
    fontFamily: fonts.Regular,
    marginTop: height / 100,
    marginLeft: wp("1.5%"),
  },
  inputs: {
    gap: height / 40,
    alignItems: "center",
  },
  buttonWrapper: {
    marginTop: height / 20,
    alignItems: "center",
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp("2%"),
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
    marginLeft: wp(2),
    fontFamily: fonts.Regular,
  },
  checkbox: {
    marginLeft: wp("3%"),
  },
  forgotPassword: {
    flex: 1,
    alignItems: "flex-end",
    color: colors.GREEN,
    fontSize: height / 58,
    fontFamily: fonts.Regular,
    marginRight: wp("3%"),
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
    height: hp("5.7%"),
    width: wp("85%"),
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
    width: wp("6%"),
    height: hp("4%"),
    marginRight: 10,
    resizeMode: "contain",
  },
  showPassIcon: {
    width: wp(5),
    height: hp(2.5),
    marginRight: wp(2),
    resizeMode: "contain",
  },
  passInputBox: {
    height: hp("5.5%"),
    width: wp("84%"),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    paddingRight: 10,
  },
  passInput: {
    flex: 1,
    fontSize: hp("1.7%"),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    paddingHorizontal: wp(2),
    height: "100%",
    width: wp(100),
    paddingLeft: wp(2),
    paddingVertical: 8,

  },
  passToggleButton: {
    padding: 8,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: colors.GREEN,
    width: wp(85),
    height: hp(5.7),
    borderWidth: 1,
    backgroundColor: colors.GREEN,
    borderColor: colors.GREEN,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.WHITE,
    fontFamily: fonts.Medium,
    fontSize: hp("2%"),
    textAlign: "center",
  },
  error: {
    textAlign: "left",
    color: colors.BLACK,
    alignSelf: "flex-start",
    fontFamily: fonts.Medium,
    fontSize: hp(1.5)

  },
  errorBox: {
    backgroundColor: "#FFC1C3",
    borderRadius: 10,
    textAlign: "left",
    padding: hp(1),
    marginLeft: wp(4),
    alignSelf: "flex-start",
    borderColor: colors.RED,
    borderWidth: 1,
    marginBottom: hp(-3),
    marginTop: hp(-1)
  }
});

export default SignIn;
