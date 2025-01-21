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
  Alert,
} from "react-native";
import colors from "../../../util/colors";
import CustomButton from "../../components/CustomButton";
import ScreensName from "../../../util/ScreensName.ts";
import { useNavigation } from '@react-navigation/native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { launchCamera } from 'react-native-image-picker';
import { useTranslation } from "react-i18next";
const { height, width } = Dimensions.get("window");

import { fonts } from "../../../util/FontName";

const MyButton: React.FC<{ onPress: () => void; title: string; bgColor: string; textColor: string }> = ({ onPress, title, bgColor, textColor }) => (
  <TouchableOpacity style={[styles.button, { backgroundColor: bgColor, width: '100%' }]} onPress={onPress}>
    <Text style={[styles.text, { color: textColor }]}>{title}</Text>
  </TouchableOpacity>
);


function BiometricVerification() {
  const [handCaptured, setHandCaptured] = useState(false);
  const navigation = useNavigation();
  const {t} = useTranslation();
  const handleScanHands = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.assets) {
        setHandCaptured(true);
        launchCamera({ mediaType: 'photo' }, (response) => {
          if (response.didCancel) {
            console.log('User cancelled camera');
          } else if (response.assets) {
            Alert.alert(
              "Verification",
              "Please verify your hands from Nadra.",
              [
                { text: "Verify From Nadra", onPress: () => console.log("Verify pressed") },
              ],
              { cancelable: false }
            );
          }
        });
      } else {
        console.log('Camera error: ', response);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Header}>
        <Text style={styles.Heading}>{t('Biometric Verification')}</Text>
        <Text style={styles.SubHeading}>
          {t('Line up your hand with the guide.')} {'\n'}
          {t('Keep your fingers together.')} {'\n'}
          {t("Then stay still.")} {'\n'}
          <Text style={{ fontWeight: 'bold' }}>Scan Left Hand First and Then Right Hand</Text>
        </Text>
        <Image
          source={require('../../assets/LoginSignup/Hand-Scan.jpg')}
          style={styles.image}
        />
      </View>
      <View style={styles.button}>

        {handCaptured ? (<MyButton
          title="Continue"
          onPress={() => navigation.navigate(ScreensName.BiometricSuccess)}
          bgColor={colors.GREEN}
          textColor={colors.WHITE}
        />) : (<MyButton
          title="Scan Hands"
          onPress={handleScanHands}
          bgColor={colors.GREEN}
          textColor={colors.WHITE}
        />)}

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
    justifyContent: 'flex-start',
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
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  image: {
    width: width * 0.8,
    height: height * 0.3,
    marginTop: height / 20,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 16,
  },
});

export default BiometricVerification;