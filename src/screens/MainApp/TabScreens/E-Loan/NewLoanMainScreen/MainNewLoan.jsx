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

const MainNewLoan = () => {
    return (
        <View style={{ flex: 1, gap: hp(2),marginBottom:hp(5) }}>
            <CustomTxtAndPicker PlaceHolderGiven={"Employeement Type"} itemPackage={[{ label: "Value1", value: "Value2" }]} Picker_Txt={"Select Employeement Type"} />
            <CustomTxtAndPicker PlaceHolderGiven={"Loan Type"} itemPackage={[{ label: "Value1", value: "Value2" }]} Picker_Txt={"Select Loan Type"} />
            <CustomTxtAndPicker PlaceHolderGiven={"Title"} itemPackage={[{ label: "Value1", value: "Value2" }]} Picker_Txt={"Select"} />
            <CustomInputAndText PlaceHolderGiven={"First Name"} InputHolder={"Enter First Name"} />
            <CustomInputAndText PlaceHolderGiven={"Last Name"}  InputHolder={"Enter Last Name"}/>
            <CustomInputAndText PlaceHolderGiven={"CNIC number"} InputHolder={"42101-1234567-8"}/>
            <CustomInputAndText PlaceHolderGiven={"Date of birth"} InputHolder={"MM-DD-YYYYY"}/>
            <CustomInputAndText PlaceHolderGiven={"Phone number"} InputHolder={"+92-012345678"}/>
            <CustomInputAndText PlaceHolderGiven={"Alternative Phone Number"} InputHolder={"+92-012345678"}/>

            <CustomInputAndText PlaceHolderGiven={"Alternative Number"} InputHolder={"enter here"}/>
            <CustomInputAndText PlaceHolderGiven={"Postal Address"} InputHolder={"enter here"}/>
            <CustomInputAndText PlaceHolderGiven={"Email Address"} InputHolder={"enter here"}/>
            <CustomInputAndText PlaceHolderGiven={"Nearest City/City"} InputHolder={"enter here"}/>
            <CustomInputAndText PlaceHolderGiven={"Organization Name"} InputHolder={"enter here"}/>
            <CustomInputAndText PlaceHolderGiven={"Loan Amount"} InputHolder={"Amount (In PKR)"}/>
            <CustomInputAndText PlaceHolderGiven={"Monthly Net Income"} InputHolder={"enter here"}/>
            <CustomTxtAndPicker PlaceHolderGiven={"Desired Loan Repayment Period"} itemPackage={[{ label: "Value1", value: "Value2" }]} Picker_Txt={"Select"} />
            <CustomUploadButton PlaceHolderGiven={"Recent Photograph"} InputHolder={'Upload'} isCamera={true}/>
            <CustomUploadButton PlaceHolderGiven={"Salary Certificate"} InputHolder={'Upload'}/>
            <CustomUploadButton PlaceHolderGiven={"Bank Statement"} InputHolder={'Upload'}/>
            <CustomUploadButton PlaceHolderGiven={"Charge of Agri Land"} InputHolder={'Upload'}/>
            <CustomUploadButton PlaceHolderGiven={"Mortgage of Property"} InputHolder={'Upload'}/>

            <CustomUploadButton PlaceHolderGiven={"Passport Size Photograph"} InputHolder={'Upload'}/>
            <CustomUploadButton PlaceHolderGiven={"CNIC Image (Front)"} InputHolder={'Upload'} isCamera={true}/>
            <CustomUploadButton PlaceHolderGiven={"CNIC Image (Back)"} InputHolder={'Upload'} isCamera={true}/>
         
            <CustomUploadButton PlaceHolderGiven={"Passport Size Photograph"} InputHolder={'Upload'}/>
            <CustomUploadButton PlaceHolderGiven={"Passport Size Photograph"} InputHolder={'Upload'}/>

            <TickBox TextGiven={'Do you agree with E-Agri Terms & Conditions'} givePadding={true}/>
            <TickBox TextGiven={'I have a valid government-issued ID'} givePadding={true}/>
            <TickBox TextGiven={'I understand that this application does not guarantee loan approval.'} givePadding={true}/>
            <TickBox TextGiven={' I consent to receive communication via email and phone regarding my loan application.'} givePadding={true}/>

            <CustomButton MainText={"Submit Your Form"} BgGiven={colors.GREEN} txColor={colors.WHITE}/>
        </View>
    )
}

export default MainNewLoan

const styles = StyleSheet.create({})