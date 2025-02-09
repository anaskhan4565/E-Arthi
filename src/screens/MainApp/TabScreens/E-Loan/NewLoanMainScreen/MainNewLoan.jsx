import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomInputAndText from '../NewLoanComponents/CustomInputAndText';
import CustomTxtAndPicker from '../NewLoanComponents/CustomTxtAndPicker';
import CustomPicker from '../../../EMandi/CustomComp/CustomPicker';
import colors from '../../../../../../util/colors';
import CustomUploadButton from '../NewLoanComponents/CustomUploadButton';
import TickBox from '../NewLoanComponents/TickBox';
import CustomButton from '../../../../../components/CustomButton';
import { fonts } from '../../../../../../util/FontName';
import ScreensName from '../../../../../../util/ScreensName.ts';
import { useTranslation } from 'react-i18next';

const MainNewLoan = () => {
        const { t } = useTranslation();
    
    return (
        <View style={{ flex: 1, gap: hp(2), marginBottom: hp(5) }}>
            <CustomTxtAndPicker PlaceHolderGiven={"Employment Type"} itemPackage={[{ label: "Salaried", value: "Salaried" }, { label: "Self-Employed", value: "Self Employed" }, { label: "Business Owner", value: "Business Owner" }]} Picker_Txt={"Select Employment Type"} />
            <CustomTxtAndPicker PlaceHolderGiven={"Loan Type"} itemPackage={[{ label: "Personal Loan", value: "Personal Loan" },  { label: "Agricultural Loan", value: "Agricultural Loan" }]} Picker_Txt={"Select Loan Type"} />
            <CustomTxtAndPicker PlaceHolderGiven={"Title"} itemPackage={[{ label: "Mr.", value: "mr" }, { label: "Ms.", value: "ms" }, { label: "Mrs.", value: "mrs" }]} Picker_Txt={"Select Title"} />
            <CustomInputAndText PlaceHolderGiven={"First Name"} InputHolder={"Enter First Name"} />
            <CustomInputAndText PlaceHolderGiven={"Last Name"} InputHolder={"Enter Last Name"} />
            <CustomInputAndText PlaceHolderGiven={"CNIC Number"} InputHolder={"42101-1234567-8"} />
            <CustomInputAndText PlaceHolderGiven={"Date of Birth"} InputHolder={"MM-DD-YYYY"} />
            <CustomInputAndText PlaceHolderGiven={"Phone Number"} InputHolder={"+92-012345678"} />
            <CustomInputAndText PlaceHolderGiven={"Alternative Phone Number"} InputHolder={"+92-012345678"} />
            <CustomInputAndText PlaceHolderGiven={"Alternative Number"} InputHolder={"Enter Here"} />
            <CustomInputAndText PlaceHolderGiven={"Postal Address"} InputHolder={"Enter Here"} />
            <CustomInputAndText PlaceHolderGiven={"Email Address"} InputHolder={"Enter Here"} />
            <CustomInputAndText PlaceHolderGiven={"Nearest City"} InputHolder={"Enter Here"} />
            <CustomInputAndText PlaceHolderGiven={"Organization Name"} InputHolder={"Enter Here"} />
            <CustomInputAndText PlaceHolderGiven={"Loan Amount"} InputHolder={"Amount (in PKR)"} />
            <CustomInputAndText PlaceHolderGiven={"Monthly Net Income"} InputHolder={"Enter Here"} />
            <CustomTxtAndPicker PlaceHolderGiven={"Desired Loan Repayment Period"} itemPackage={[{ label: "Value1", value: "Value2" }]} Picker_Txt={"Select"} />
            <Text style={{ fontSize: hp(3), fontFamily: fonts.Bold, fontStyle: 'normal', borderTopWidth: hp(0.2), textAlign: 'center' }}>-- Documents --</Text>
            <CustomUploadButton PlaceHolderGiven={"Recent Photograph"} InputHolder={'Upload'} isCamera={true} />
            <CustomUploadButton PlaceHolderGiven={"Salary Certificate"} InputHolder={'Upload'} />
            <CustomUploadButton PlaceHolderGiven={"Bank Statement"} InputHolder={'Upload'} />
            <CustomUploadButton PlaceHolderGiven={"Charge of Agricultural Land"} InputHolder={'Upload'} />
            <CustomUploadButton PlaceHolderGiven={"Mortgage of Property"} InputHolder={'Upload'} />
            <CustomUploadButton PlaceHolderGiven={"Passport Size Photograph"} InputHolder={'Upload'} />
            <CustomUploadButton PlaceHolderGiven={"CNIC Image (Front)"} InputHolder={'Upload'} isCamera={true} />
            <CustomUploadButton PlaceHolderGiven={"CNIC Image (Back)"} InputHolder={'Upload'} isCamera={true} />
            <CustomUploadButton PlaceHolderGiven={"Passport Size Photograph"} InputHolder={'Upload'} />
            <CustomUploadButton PlaceHolderGiven={"Agricultural Passbook"} InputHolder={'Upload'} />
            <TickBox TextGiven={'Do you agree with E-Agri Terms & Conditions?'} givePadding={true} />
            <TickBox TextGiven={'I have a valid government-issued ID.'} givePadding={true} />
            <TickBox TextGiven={'I understand that this application does not guarantee loan approval.'} givePadding={true} />
            <TickBox TextGiven={'I consent to receive communication via email and phone regarding my loan application.'} givePadding={true} />
            <CustomButton MainText={"Submit Your Form"} BgGiven={colors.GREEN} txColor={colors.WHITE} isNavigation={true} name={ScreensName.ELoanSuccessScr}/>

        </View>
    )
}

export default MainNewLoan

const styles = StyleSheet.create({})