import React, { useState } from 'react';
import Navbar from '../../Navbar/Navbar.jsx';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../util/colors.js';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../../../../util/FontName.js';
import CustomInputAndText from './NewLoanComponents/CustomInputAndText.jsx';
import CustomTxtAndPicker from './NewLoanComponents/CustomTxtAndPicker';
import CustomUploadButton from './NewLoanComponents/CustomUploadButton';
import TickBox from './NewLoanComponents/TickBox';
import CustomButton from '../../../../components/CustomButton';



function ELoanBOP(): React.JSX.Element {
    const { t } = useTranslation();
    const [selectedOption, setSelectedOption] = useState("Generic");

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true}/>
            </View>
            <ScrollView style={styles.container}>
            <View style={[styles.header,{alignSelf:'center'}]}>
                <Image style={styles.image} source={require('../../../../../src/assets/MainApp/E-Loan/ZTBL.png')} />
                <Text style={styles.titletext}>Zarai Taraqiati Bank Limited</Text>
            </View>
                <View style={{ flex: 1, alignItems: 'center', marginBottom: hp(2), gap: hp(3), marginTop: hp(1) }}>
                    <CustomTxtAndPicker PlaceHolderGiven={"Employeement Type"} itemPackage={[{ label: "Value2", value: "Value2" }]} Picker_Txt={"Select Employeement Type"} />
                    <CustomTxtAndPicker PlaceHolderGiven={"Loan Type"} itemPackage={[{ label: "Pre Harvest", value: "Pre Harvest"},{ label: "Post Harvest", value: "Post Harvest"}]} Picker_Txt={"Select Loan Type"} />
                    <CustomTxtAndPicker PlaceHolderGiven={"Title"} itemPackage={[{ label: "Mr", value: "Mr" },{ label: "Mrs", value: "Mrs" },{ label: "Ms", value: "Ms" },{ label: "Sir", value: "Sir" },{ label: "Doc", value: "Doc" },]} Picker_Txt={"Select"} />
                    <CustomInputAndText PlaceHolderGiven={"First Name"} InputHolder={"Enter First Name"} />
                    <CustomInputAndText PlaceHolderGiven={"Last Name"} InputHolder={"Enter Last Name"} />
                    <CustomInputAndText PlaceHolderGiven={"CNIC number"} InputHolder={"42101-1234567-8"} />
                    <CustomInputAndText PlaceHolderGiven={"Date of birth"} InputHolder={"MM-DD-YYYYY"} />
                    <CustomInputAndText PlaceHolderGiven={"Phone number"} InputHolder={"+92-012345678"} />
                    <CustomInputAndText PlaceHolderGiven={"Alternative Phone Number"} InputHolder={"+92-012345678"} />
                    <CustomInputAndText PlaceHolderGiven={"Alternative Number"} InputHolder={"enter here"} />
                    <CustomInputAndText PlaceHolderGiven={"Postal Address"} InputHolder={"enter here"} />
                    <CustomInputAndText PlaceHolderGiven={"Email Address"} InputHolder={"enter here"} />
                    <CustomInputAndText PlaceHolderGiven={"Nearest City/City"} InputHolder={"enter here"} />
                    <CustomInputAndText PlaceHolderGiven={"Organization Name"} InputHolder={"enter here"} />
                    <CustomInputAndText PlaceHolderGiven={"Loan Amount"} InputHolder={"Amount (In PKR)"} />
                    <CustomInputAndText PlaceHolderGiven={"Monthly Net Income"} InputHolder={"enter here"} />
                    <CustomTxtAndPicker PlaceHolderGiven={"Desired Loan Repayment Period"} itemPackage={[{ label: "Value1", value: "Value2" }]} Picker_Txt={"Select"} />
                    <Text style={{ fontSize: hp(3), fontFamily: fonts.bold, fontStyle: 'normal', borderTopWidth: hp(0.2) }}>--Documents--</Text>

                    <CustomUploadButton PlaceHolderGiven={"CNIC Image (Front)"} InputHolder={'Upload'} isCamera={true} givePad={true} />
                    <CustomUploadButton PlaceHolderGiven={"CNIC Image (Back)"} InputHolder={'Upload'} isCamera={true} givePad={true} />
                    <CustomUploadButton PlaceHolderGiven={"Passport Size Photograph"} InputHolder={'Upload'} givePad={true}  />

                    <CustomUploadButton PlaceHolderGiven={"Mortgage of Property"} InputHolder={'Upload'} givePad={true} />
                    <CustomUploadButton PlaceHolderGiven={"Agri. Passbook"} InputHolder={'Upload'} givePad={true}  />
                    <CustomUploadButton PlaceHolderGiven={"Liquid security Certification Documents"} InputHolder={'Upload'} givePad={true} />
                    <CustomUploadButton PlaceHolderGiven={"Liquid security Certification Documents"} InputHolder={'Upload'} givePad={true} />
                    <CustomUploadButton PlaceHolderGiven={"Two written satisfactory market verified reports"} InputHolder={'Upload'} givePad={true}  />

                    <View style={{ flex: 1, gap: hp(3) }}>
                        <TickBox TextGiven={'Do you agree with E-Agri Terms & Conditions'} givePadding={false} />
                        <TickBox TextGiven={'Do you agree with ZTBL Terms & Conditions'} givePadding={false} />
                        <TickBox TextGiven={'I have a valid government-issued ID'} givePadding={false} />
                        <TickBox TextGiven={'I understand that this application does not guarantee loan approval.'} givePadding={true} />
                        <TickBox TextGiven={' I consent to receive communication via email and phone regarding my loan application.'} givePadding={true} />
                    </View>
                    <CustomButton MainText={"Submit Your Form"} BgGiven={colors.GREEN} txColor={colors.WHITE} />

                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: colors.WHITE,

    },
    navbarContainer: {
        height: hp('8.5%'),
        backgroundColor: colors.WHITE,
    },
    searchContainer: {
        marginVertical: hp('3.2%'),
        height: hp('7%'),
    },
    bodyContainer: {
        alignItems: 'center',

    },
    titleContainer: {
        padding: 10,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 25,
    },
    titletext: {
        fontSize: hp(3),
        fontFamily: fonts.SemiBold,
        textAlign:'center'
    },
    header: {
        marginTop: hp(2),
        width: wp(90),
        height: hp(20),
        borderRadius: 8,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE,

    },
    image: {
        resizeMode: 'contain',
        width: wp(35),
        height: hp(12),
    },

});



export default ELoanBOP;
