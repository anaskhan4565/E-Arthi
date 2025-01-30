import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import ProfilePic from "../../../assets/MainApp/HomeScreen/ProfilePic.png";
import Earthi from "../../../assets/MainApp/HomeScreen/Earthi.png";
import colors from "../../../../util/colors";
import bellIcon from "../../../assets/MainApp/HomeScreen/Bell.png";
import Hamburger from "../../../assets/MainApp/HomeScreen/Hamburger.png";
import CustomImageButton from "../CustomComponent/CustomImageButton";
import ScreensName from "../../../../util/ScreensName";
import backImg from '../../../assets/MainApp/Sidebar/Back.png'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";


const Navbar = ({isbackSet=false,isBackTo=ScreensName.MainTabNavigation,gobackOnly}) => {
  const navigation=useNavigation()
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        marginTop: hp('1%'),
        height: hp("4%"),
        backgroundColor: colors.LIGHT_GREEN,
      }}
    >
      <TouchableOpacity style={{ flex: 0.3, paddingLeft: 10, justifyContent: "center" }} onPress={()=>navigation.navigate(ScreensName.MyProfileMainStack)}>
        <Image source={isbackSet?backImg:ProfilePic} style={isbackSet?styles.BackIMG:styles.Profile} />
      </TouchableOpacity>
      <View
        style={{ justifyContent: "center", alignItems: "center", flex: 0.4 }}
      >
        <Image source={Earthi} style={styles.Icon} />
      </View>
      <View
        style={{
          flex: 0.3,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomImageButton SourceGiven={bellIcon} />
        <CustomImageButton SourceGiven={Hamburger} isNavigation={1} name={ScreensName.Sidebar} />
      </View>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  Profile: {
    width: wp('9%'),
    height: hp('7%'),
    borderRadius: hp('1%'),
    resizeMode: 'contain',
    marginLeft:hp(2)
  },
  BackIMG:{
    width: wp('10%'),
    height: hp('7%'),
    resizeMode: 'contain',
    

  },
  Icon: {
    width: wp('14%'),
    height: hp('7%'),
    resizeMode: 'contain',
  },
  Wrapper: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: hp('1.2%'),
    backgroundColor: colors.WHITE,
    marginHorizontal: wp('1%'),
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  ImageStyle: {
    resizeMode: "contain",
  },
});
