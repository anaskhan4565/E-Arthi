import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../../../../components/CustomButton'
import CustomInputAndText from '../E-Loan/NewLoanComponents/CustomInputAndText'
import colors from '../../../../../util/Constants/colors'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomPicker from '../../EMandi/CustomComp/CustomPicker'
import CustomTxtAndPicker from '../E-Loan/NewLoanComponents/CustomTxtAndPicker'
import ScreensName from '../../../../../util/Constants/ScreensName'
import { useTranslation } from 'react-i18next'
const BankRecieving = () => {
  const { t } = useTranslation();

  return (
    <ScrollView>
      <View style={styles.inputs}>
        <CustomTxtAndPicker PlaceHolderGiven={"Bank Name"} itemPackage={[{ label: "Habib Bank Limited", value: "Meezan Bank" }, { label: "Bank Of Punjab", value: "Bank Of Punjab" }, { label: "Habib Bank Limited", value: "HBL" }]} Picker_Txt={"Select Bank"} />

        <CustomInputAndText
          PlaceHolderGiven={"IBAN"}
          InputHolder={"IBAN"}
        />

        <CustomButton
          MainText={"Save Information"}
          BgGiven={colors.GREEN}
          txColor={colors.WHITE}
          isNavigation={1}
          name={ScreensName.MyProfileMainStack}
        />
      </View>
    </ScrollView>
  )
}

export default BankRecieving

const styles = StyleSheet.create({
  inputs: {
    marginTop: hp(2),
    gap: hp(2)
  },
})