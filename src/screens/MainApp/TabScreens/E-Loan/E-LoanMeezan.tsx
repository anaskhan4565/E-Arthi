import React from 'react';
import type { PropsWithChildren } from 'react';
import { fonts } from '../../../../../util/FontName';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
    SafeAreaView,
    TextInput,
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from '../../../../../util/colors';
import CustomButton from '../../../../components/CustomButton';
import TickBox from './NewLoanComponents/TickBox';
import CustomUploadButton from './NewLoanComponents/CustomUploadButton';
import CustomInputAndText from './NewLoanComponents/CustomInputAndText';
import CustomTxtAndPicker from './NewLoanComponents/CustomTxtAndPicker';



function EloanMeezan(): React.JSX.Element {
    const { t } = useTranslation();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>

                <View style={[styles.header, { alignSelf: 'center' }]}>
                    <Image style={styles.image} source={require('../../../../../src/assets/MainApp/E-Loan/Meezan.png')} />
                    <Text style={styles.titletext}>Meezan Bank</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', marginBottom: hp(2), gap: hp(3), marginTop: hp(1) }}>
                    <CustomTxtAndPicker PlaceHolderGiven={"Employeement Type"} itemPackage={[{ label: "Value2", value: "Value2" }]} Picker_Txt={"Select Employeement Type"} />
                    <CustomTxtAndPicker PlaceHolderGiven={"Loan Type"} itemPackage={[{ label: "Value1", value: "Value2" }]} Picker_Txt={"Select Loan Type"} />
                    <CustomTxtAndPicker PlaceHolderGiven={"Title"} itemPackage={[{ label: "Value1", value: "Value2" }]} Picker_Txt={"Select"} />
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
                    <Text style={{ fontSize: hp(3), fontFamily: fonts.bold, fontStyle: 'normal', borderTopWidth: hp(0.2) }}>{t('--Documents--')}</Text>

                    <CustomUploadButton PlaceHolderGiven={"CNIC Image (Front)"} InputHolder={'Upload'} isCamera={true} givePad={true} />
                    <CustomUploadButton PlaceHolderGiven={"CNIC Image (Back)"} InputHolder={'Upload'} isCamera={true} givePad={true} />
                    <CustomUploadButton PlaceHolderGiven={"Passport Size Photograph"} InputHolder={'Upload'} givePad={true} />

                    <CustomUploadButton PlaceHolderGiven={"Liquid security in shape of Bank's FIxed Deposit Receipts"} InputHolder={'Upload'} givePad={true} />
                    <CustomUploadButton PlaceHolderGiven={"Agri. Passbook"} InputHolder={'Upload'} givePad={true} />
                    <CustomUploadButton PlaceHolderGiven={"Liquid security Certification Documents"} InputHolder={'Upload'} givePad={true} />
                    <CustomUploadButton PlaceHolderGiven={"Two written satisfactory market verified reports"} InputHolder={'Upload'} givePad={true} />

                    <View style={{ flex: 1, gap: hp(3) }}>
                        <TickBox TextGiven={'Are you older than 18'} givePadding={false} />
                        <TickBox TextGiven={'Do you agree with E-Agri Terms & Conditions'} givePadding={false} />
                        <TickBox TextGiven={'Do you agree with BOP Terms & Conditions'} givePadding={false} />
                        <TickBox TextGiven={'I have a valid government-issued ID'} givePadding={false} />
                        <TickBox TextGiven={'I understand that this application does not guarantee loan approval.'} givePadding={true} />
                        <TickBox TextGiven={' I consent to receive communication via email and phone regarding my loan application.'} givePadding={true} />
                    </View>
                    <CustomButton MainText={"Submit Your Form"} BgGiven={colors.GREEN} txColor={colors.WHITE} />

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        alignItems: 'center',
        backgroundColor: colors.WHITE,
    },
    
    titletext: {
        fontSize: hp(3),
        fontFamily: fonts.SemiBold,
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
    inputcontainer: {
        width: wp(100),
        height: hp(40),
        // backgroundColor: "blue",
        marginTop: hp(3),

    },
    detailRow: {
        flexDirection: 'row',
        marginTop: hp(2),
        flex: 1,
        alignItems: 'center',
    },
    label: {
        width: wp(30),
        marginLeft: wp(6),
        fontSize: hp(1.75),
    },
    value: {
        width: wp(60),
        fontSize: hp(1.5),
        fontFamily: fonts.Regular,
        marginRight: wp(5),
        height: hp(5),
        borderWidth: 1,
        borderRadius: 4,
        borderLeftColor: '#D3D3D3',
    },
});

export default EloanMeezan;
