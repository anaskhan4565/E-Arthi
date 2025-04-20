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
  ActivityIndicator,
} from "react-native";
import colors from "../../../util/Constants/colors";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import ScreensName from "../../../util/Constants/ScreensName";
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { height, width } = Dimensions.get("window");

import i18next from "../../../services/i18next";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../util/Constants/FontName";

import DateTimePickerModal from "react-native-modal-datetime-picker";

function Cnic_page_2() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false); // State to toggle the date picker
  const [selectedDate, setSelectedDate] = useState("03/04/2023"); // Default date set to April 3, 2023
  const [cnic, setCnic] = useState("42101-467672-3");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const navigation = useNavigation<any>();

  const { t } = useTranslation();

  const handleDateConfirm = (date: Date) => {
    // Format the selected date (example: 'DD/MM/YYYY')
    const formattedDate = date.toLocaleDateString();
    setSelectedDate(formattedDate);
    setDatePickerVisible(false); // Close the picker once a date is selected
  };

  const handleDateCancel = () => {
    setDatePickerVisible(false); // Close the picker if canceled
  };
  
  const handleVerify = () => {
    setIsVerifying(true);
    setVerificationProgress(0);
    
    // Simulate progress updates
    const totalTime = 5500; // 5.5 seconds total
    const interval = 100; // Update every 100ms
    const steps = totalTime / interval;
    let currentStep = 0;
    
    const progressTimer = setInterval(() => {
      currentStep++;
      setVerificationProgress(Math.min((currentStep / steps) * 100, 100));
      
      if (currentStep >= steps) {
        clearInterval(progressTimer);
        // Navigate after verification completes
        setTimeout(() => {
          setIsVerifying(false);
          navigation.navigate(ScreensName.BiometricVerification);
        }, 200);
      }
    }, interval);
  };

  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        <Text style={styles.Heading}>{t('CNIC Verification')}</Text>
        <Text style={styles.SubHeading}>{t('Our system has extracted the CNIC details from the uploaded image. Please confirm the details')}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonSpacing} />
        <View style={styles.textcontainer}>
          <Text style={styles.inputText}>{t('Your CNIC number ')}</Text>
        </View>

        <CustomInput 
          placeholder={t('42101-467672-3')} 
          h={hp('5.5%')} 
          w={wp('85%')} 
          b_radius={10} 
          bg_give={colors.WHITE} 
          hide={false} 
          value={cnic} 
          onChangeText={(text: string) => setCnic(text)} 
        />

        <View style={styles.textcontainer}>
          <Text style={styles.inputText}>{t('Your CNIC date of issue')}</Text>
        </View>


        <TouchableOpacity onPress={() => setDatePickerVisible(true)} style={styles.dateButton}>
          <Text style={styles.dateButtonText}>
            {selectedDate ? selectedDate : t('Date')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={handleDateCancel}
      />

      <View style={styles.buttoncontainer}>
        {isVerifying ? (
          <View style={styles.verificationContainer}>
            <Text style={styles.verificationText}>{t('Verifying with NADRA...')}</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${verificationProgress}%` }]} />
            </View>
            <Text style={styles.progressText}>{Math.round(verificationProgress)}%</Text>
            <ActivityIndicator size="large" color={colors.GREEN} style={styles.loader} />
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.verifyButton}
            onPress={handleVerify}
          >
            <Text style={styles.verifyButtonText}>{t('Verify')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingHorizontal: wp('5%'),
  },
  Header: {
    marginTop: hp('10%'),
    marginBottom: hp('5%'),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  Heading: {
    fontSize: height / 25,
    fontFamily: fonts.SemiBold,
    color: colors.BLACK,
    marginLeft: wp('1.5%'),
  },
  SubHeading: {
    fontSize: height /60,
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    marginTop: hp('1%'),
    marginLeft: wp('1.5%'),
  },
  inputText: {
    fontSize: hp('2%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    marginBottom: hp('1%'),
    marginLeft: wp('8%'),
    justifyContent: 'flex-start',
  },
  buttoncontainer: {
    marginTop: hp(5),
    justifyContent: "center",
    alignItems: "center",
  },
  textcontainer: {
    width: wp(100),
    justifyContent: 'flex-start',
    marginTop: hp(3),
  },
  dateButton: {
    backgroundColor: colors.WHITE,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('3%'),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('1%'),
    width: wp(85),
    height: hp(5.5),
  },
  dateButtonText: {
    fontSize: hp('2%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: hp('5%'),
  },
  buttonSpacing: {
    height: hp('2%'),
  },
  verificationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(85),
  },
  verificationText: {
    fontSize: hp(2.2),
    fontFamily: fonts.SemiBold,
    color: colors.BLACK,
    marginBottom: hp(2),
  },
  progressBarContainer: {
    width: wp(85),
    height: hp(1.5),
    backgroundColor: colors.LIGHT_GRAY,
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.GREEN,
  },
  progressText: {
    fontSize: hp(1.8),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    marginTop: hp(1),
  },
  loader: {
    marginTop: hp(2),
  },
  verifyButton: {
    backgroundColor: colors.GREEN,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(5),
    borderRadius: 8,
    width: wp(85),
    height: hp(5.7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyButtonText: {
    color: colors.WHITE,
    fontSize: hp(2),
    fontFamily: fonts.SemiBold,
  },
});

export default Cnic_page_2;