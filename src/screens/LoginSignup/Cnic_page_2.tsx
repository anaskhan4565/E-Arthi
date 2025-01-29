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
import colors from "../../../util/colors";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import ScreensName from "../../../util/ScreensName";
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { height, width } = Dimensions.get("window");

import i18next from "../../../services/i18next";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../util/FontName";

import DateTimePickerModal from "react-native-modal-datetime-picker";

function Cnic_page_2() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false); // State to toggle the date picker
  const [selectedDate, setSelectedDate] = useState(null); // State to store selected date
  const navigation = useNavigation();

  const { t } = useTranslation();

  const handleDateConfirm = (date) => {
    // Format the selected date (example: 'DD/MM/YYYY')
    const formattedDate = date.toLocaleDateString();
    setSelectedDate(formattedDate);
    setDatePickerVisible(false); // Close the picker once a date is selected
  };

  const handleDateCancel = () => {
    setDatePickerVisible(false); // Close the picker if canceled
  };

  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        <Text style={styles.Heading}>CNIC Verification</Text>
        <Text style={styles.SubHeading}>Please enter your CNIC details</Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonSpacing} />
        <View style={styles.textcontainer}>
          <Text style={styles.inputText}>Your CNIC number </Text>
        </View>

        <CustomInput placeholder={t('42101-467672-3')} h={hp('5.5%')} w={wp('85%')} b_radius={10} bg_give={colors.WHITE} hide={0} />

        <View style={styles.textcontainer}>
          <Text style={styles.inputText}>Your CNIC date of issue</Text>
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
        <CustomButton
          MainText="Verify"
          BgGiven={colors.GREEN}
          txColor={colors.WHITE}
          isNavigation={true}
          name={ScreensName.BiometricVerification}
        />
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
    fontSize: height / 45,
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
});

export default Cnic_page_2;