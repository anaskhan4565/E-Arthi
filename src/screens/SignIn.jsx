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
import colors from "../../util/colors";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import ScreensName from "../../util/ScreensName";
import { useNavigation } from '@react-navigation/native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { height, width } = Dimensions.get("window");
function SignIn() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation=useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Header}>
        <Text style={styles.Heading}>Sign in</Text>
        <Text style={styles.SubHeading}>Welcome back, please login again</Text>
      </View>
      <View style={styles.inputs}>
      {/* height: height / 20,
      width: width / 1.1, */}
        <CustomInput placeholder={"Username"} hide={height/20} w={width/1.1} b_radius={10}  bg_give={colors.WHITE}/>
        <View style={styles.passInputBox}>
          <TextInput
            style={styles.passInput}
            placeholder={"Password"}
            secureTextEntry={passwordVisible}
          />
          <TouchableOpacity
            style={styles.passToggleButton}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Image
              source={require("../assets/EyeHide.png")}
              style={styles.showPassIcon}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.button}>
        <CustomButton
          MainText={"Login"}
          BgGiven={colors.GREEN}
          name={ScreensName.HomeScreen}
          txColor={colors.WHITE}
          isNavigation={1}
        ></CustomButton>
      </View>
      <View style={styles.options}>
        <View style={styles.RememberMe}>
          <BouncyCheckbox
            size={25}
            fillColor={colors.GREEN}
            iconStyle={{ borderColor: colors.LIGHT_GRAY }}
            style={styles.checkbox}
            textComponent={true}
            innerIconStyle = {{borderRadius: 7}}
          />
          <Text style={styles.RememberMeText}>Remember Me</Text>
        </View>
        <TouchableOpacity onPress={() => {navigation.navigate(ScreensName.ForgotPassword)}}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.break}>
        <View style={styles.line} />
        <Text style={styles.ORtext}>OR</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.altSignin}>
        <TouchableOpacity style={styles.altSigninButton}>
          <Image
            source={require("../assets/google.png")}
            style={styles.altSigninButtonIcon}
          />
          <Text style={{ fontSize: height / 65 }}>login with Google </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.altSigninButton}>
          <Image
            source={require("../assets/apple.png")}
            style={styles.altSigninButtonIcon}
          />
          <Text style={{ fontSize: height / 65 }}>login with Apple </Text>
        </TouchableOpacity>
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
    fontSize: height / 30,
    fontWeight: "bold",
    color: colors.BLACK,
  },
  SubHeading: {
    fontSize: height / 45,
    marginTop: height / 100,
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
    marginTop: height / 30,
    alignItems: "center",
  },
  RememberMe: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    flex: 1,
  },
  RememberMeText: {
    fontSize: height / 55,
    marginLeft: 5,
  },
  checkbox: {},
  forgotPassword: {
    flex: 1,
    alignItems: "flex-end",
    color: colors.GREEN,
    fontSize: height / 55,
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
  },
  altSignin: {
    gap: height / 80,
  },
  altSigninButton: {
    width: width / 1.11,
    height: height / 20,
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
    width: 20,
    height: 20,
    marginRight: 10,
  },
  passToggleButton: {},
  showPassIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  passInputBox: {
    height: height / 20,
    width: width / 1.1,
    fontSize: 16,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: width / 44,
    borderColor: colors.LIGHT_GRAY,
  },
  passInput: {
    flex: 3,
  },
});

export default SignIn;