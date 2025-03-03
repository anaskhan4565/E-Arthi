import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import colors from "../../../../../util/Constants/colors";
import CustomImageButton from "../../CustomComponent/CustomImageButton";
import ScreensName from "../../../../../util/Constants/ScreensName";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Back from "../../../../assets/MainApp/Sidebar/Back.png";
import ProfilePic from "../../../../assets/MainApp/HomeScreen/ProfilePic.png";
import links from "../../../../../util/Constants/ProfileLinks";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/Constants/FontName";
import CustomButton from "../../../../components/CustomButton";

function MyProfile() {
  const navigation = useNavigation();

  const handleSubmit = () => {
    console.log("just a submit demo");
  };

  const { t } = useTranslation();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <CustomImageButton
          SourceGiven={Back}
          h={hp("4%")}
          w={hp("4%")}
          isNavigation={1}
          name={ScreensName.MainTabNavigation}
        />
      </View>
      <View style={styles.User}>
        <Image source={ProfilePic} style={styles.Profile} />
        <View style={styles.UserInfo}>
          <Text style={{ fontSize: hp("2.75%"), fontFamily: fonts.Medium }}>
            {t("MAAZ NAVAID")}
          </Text>
          <View style={{ alignSelf: "center" }}>
            <CustomButton
              MainText={"Edit Profile"}
              BgGiven={colors.GREEN}
              txColor={colors.WHITE}
              isNavigation={1}
              wgiven={wp(35)}
              hgiven={hp(4)}
            />
          </View>
        </View>
      </View>
      {links.map(
        (link, index) =>
          link.name.trim() !== "" && (
            <TouchableOpacity style={styles.linkWrapper} key={index} onPress={() => navigation.navigate(link.Screen)}>
              <Image source={link.icon} style={styles.Icons} />
              <Text style={styles.link}>{t(link.name)}</Text>
            </TouchableOpacity>
          )
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    margin: hp("1.5%"),
    marginTop: hp("3%"),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Heading: {
    fontSize: hp("2.5%"),
    alignSelf: "center",
    fontFamily: fonts.SemiBold,
  },
  User: {
    margin: wp("5%"),
    marginTop: 0,
  },
  Profile: {
    borderColor: colors.GREEN,
    borderWidth: 3,
    borderRadius: hp(12),
    height: hp(20),
    width: hp(20),
    alignSelf: "center",
  },
  UserInfo: {
    marginTop: hp("2%"),
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  Icons: {
    width: wp("9%"),
    height: wp("9%"),
  },
  linkWrapper: {
    flexDirection: "row",
    marginLeft: wp("6%"),
    marginVertical: wp("2%"),
    alignItems: "center",
  },
  link: {
    fontSize: hp("2%"),
    fontFamily: fonts.Regular,
    marginLeft: wp("2%"),
  }
});

export default MyProfile;
