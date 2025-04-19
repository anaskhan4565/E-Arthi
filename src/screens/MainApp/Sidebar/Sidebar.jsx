import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import colors from "../../../../util/Constants/colors";
import CustomImageButton from "../CustomComponent/CustomImageButton";
import ScreensName from "../../../../util/Constants/ScreensName";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Bell from "../../../assets/MainApp/HomeScreen/Bell.png";
import Back from "../../../assets/MainApp/Sidebar/Back.png";
import ProfilePic from "../../../assets/MainApp/HomeScreen/ProfilePic.png";
import Power from "../../../assets/MainApp/Sidebar/Power.png";
import links from "../../../../util/Data/SidebarLinks";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../util/Constants/FontName";
import Routes from "../../../../util/Constants/Routes";
import { storage } from "../../../screens/InitialStartScreens/SignIn.jsx";


function Sidebar() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: '',
    email: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      setIsLoading(true);
      const token = storage.getString('token');

      if (!token) {
        setError('No authentication token found');
        setIsLoading(false);
        return;
      }

      const headers = {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch(Routes.UserInfo, {
        method: 'GET',
        headers: headers
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        const data = result.data;
        setUserData({
          name: `${data.first_name} ${data.last_name}`,
          email: data.email
        });
      } else {
        setError(result.message || 'Failed to fetch user information');
      }
    } catch (error) {
      console.log('Error fetching user info:', error);
      setError('An error occurred while fetching user information');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    console.log('just a submit demo');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <CustomImageButton SourceGiven={Back} h={hp("4%")} w={hp("4%")} isNavigation={1} name={'GoBack'} />
        <Text style={styles.Heading}>{t('My Account')}</Text>
        <CustomImageButton SourceGiven={Bell} h={hp("4%")} w={hp("4%")} />
      </View>
      <View style={styles.User}>
        <Image source={ProfilePic} style={styles.Profile} />
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={colors.GREEN} />
            <Text style={styles.loadingText}>{t('Loading...')}</Text>
          </View>
        ) : (
          <View style={styles.UserInfo}>
            <Text style={{ fontSize: hp("2.75%"), fontFamily: fonts.SemiBold }}>
              {userData.name || t('USER NAME')}
            </Text>
            <Text style={{ fontSize: hp("1.95%"), fontFamily: fonts.Regular }}>
              {userData.email || t('user@email.com')}
            </Text>
          </View>
        )}
      </View>
      {/* <View style={styles.body}></View> */}
      {links.map(
        (link, index) =>
          link.name.trim() !== "" && (
            <TouchableOpacity style={styles.linkWrapper} key={index} onPress={() => navigation.navigate(link.screenName)}>
              <Image source={link.icon} style={styles.Icons} />
              <Text style={styles.link}>{t(link.name)}</Text>
            </TouchableOpacity>
          )
      )}
      <View style={styles.logout}>
        <TouchableOpacity style={styles.logoutButton} onPress={() => { navigation.navigate(ScreensName.Connect) }}>
          <Image source={Power} style={styles.logoutIcon} />
          <Text style={styles.logoutText}>{t('Log Out')}</Text>
        </TouchableOpacity>
      </View>
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
    flexDirection: "row",
    margin: wp("5%"),
  },
  Profile: {
    borderColor: colors.GREEN,
    borderWidth: 3,
    borderRadius: 20,
  },
  UserInfo: {
    marginLeft: wp("5%"),
    gap: wp("2%"),
  },
  loadingContainer: {
    marginLeft: wp("5%"),
    flexDirection: "row",
    alignItems: "center",
  },
  loadingText: {
    marginLeft: wp("2%"),
    fontSize: hp("1.8%"),
    fontFamily: fonts.Regular,
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
  },
  logout: {
    marginTop: hp("2.5%"),
    marginBottom: hp('2%'),
  },
  logoutText: {
    fontSize: hp("1.9%"),
    fontFamily: fonts.Medium,
    color: colors.WHITE,
    marginLeft: wp("3.1%"),
  },
  logoutButton: {
    backgroundColor: colors.GREEN,
    width: wp("35%"),
    height: hp("5.5%"),
    flexDirection: "row",
    marginLeft: wp("7%"),
    alignItems: "center",
    borderRadius: hp("2.5%"),
  },
  logoutIcon: {
    width: wp("8%"),
    height: hp("4%"),
    marginLeft: wp("3%"),
    resizeMode: 'contain',
  }
});

export default Sidebar;
