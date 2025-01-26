import React, { useState } from "react";
import {SafeAreaView, StyleSheet, Text, Dimensions, View, TouchableOpacity, TextInput, Image, ScrollView} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import colors from '../../../util/colors';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ScreensName from "../../../util/ScreensName";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {useTranslation} from 'react-i18next';
import { fonts } from "../../../util/FontName";

const { height, width } = Dimensions.get("window");

function SignUp(): React.JSX.Element {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const {t} = useTranslation();
    return (
        <ScrollView style={styles.container}>
            <View style={styles.Header}>
                <Text style={styles.Heading}>{t('Register')}</Text>
                <Text style={styles.SubHeading}>{t('Welcome, please Register')}</Text>
            </View>
 
            <View style={styles.inputs}>
                <CustomInput placeholder={t('Full Name')} bg_give={colors.WHITE} b_radius={hp('1.2%')} hide={0} />
                <CustomInput placeholder={t('Phone No.')} bg_give={colors.WHITE} b_radius={hp('1.2%')} hide={0} />
                <View style={styles.passInputBox}>
                    <TextInput
                        style={styles.passInput}
                        placeholder={t('Password')}
                        placeholderTextColor={colors.LIGHT_GRAY}
                        secureTextEntry={passwordVisible}
                    />
                    <TouchableOpacity
                        style={styles.passToggleButton}
                        onPress={() => setPasswordVisible(!passwordVisible)}
                    >
                        <Image
                            source={require("../../assets/EyeHide.png")}
                            style={styles.showPassIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.options}>
                <View style={styles.RememberMe}>
                    <BouncyCheckbox
                        size={25}
                        fillColor={colors.GREEN}
                        iconStyle={{ borderColor: colors.LIGHT_GRAY }}
                        style={styles.checkbox}
                        innerIconStyle={{ borderRadius: 7 }}
                        textComponent={
                            <Text style={styles.RememberMeText}>
                                {t('Sign up for e-mails to get updates from E-Agri tips and offers')}
                            </Text>
                        }
                    />
                </View>
            </View>

            <View style={styles.button}>
                <CustomButton
                    MainText={t('Register')}
                    BgGiven={colors.GREEN}
                    name={ScreensName.Cnic_page_1}
                    txColor={colors.WHITE}
                    isNavigation={1}
                />
            </View>

            <View style={styles.terms}>
                <Text style={styles.infoText}>{t('By creating your account, you agree to the ')}</Text>
                <TouchableOpacity>
                    <Text style={styles.redirectLink}>{('Terms of Services ')}</Text>
                </TouchableOpacity>
                <Text style={styles.infoText}>{t('and ')}</Text>
                <TouchableOpacity>
                    <Text style={styles.redirectLink}>{t('Privacy Policy')}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.break}>
                <View style={styles.line} />
                <Text style={styles.ORtext}>{t('OR')}</Text>
                <View style={styles.line} />
            </View>

            <View style={styles.altSignin}>
            <TouchableOpacity style={styles.altSigninButton}>
                    <Image
                        source={require("../../assets/whatsapp.png")}
                        style={styles.altSigninButtonIcon}
                    />
                    <Text style={{ fontSize: height / 65,fontFamily:fonts.Regular, }}>{t('Register with Whatsapp ')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.altSigninButton}>
                    <Image
                        source={require("../../assets/google.png")}
                        style={styles.altSigninButtonIcon}
                    />
                    <Text style={{ fontSize: height / 65,fontFamily:fonts.Regular, }}>{t('Register with Google ')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.altSigninButton}>
                    <Image
                        source={require("../../assets/apple.png")}
                        style={styles.altSigninButtonIcon}
                    />
                    <Text style={{ fontSize: height / 65,fontFamily:fonts.Regular, }}>{t('Register with Apple ')}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
    },
    Heading: {
        fontSize: height / 25,
        fontFamily:fonts.SemiBold,
        color: colors.BLACK,
    },
    SubHeading: {
        fontSize: height / 45,
        fontFamily:fonts.Regular,
        marginTop: height / 100,
    },
    infoText: {
        fontSize:hp('1.6%'),
        fontFamily:fonts.Regular,
    },
    inputs: {
        gap: height / 40,
        alignItems: "center",
    },
    button: {
        marginTop: height / 40,
        marginBottom: height / 40,
        alignItems: "center",
    },
    options: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: height / 30,
        alignItems: "center",
    },
    RememberMe: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        flex: 1,
    },
    RememberMeText: {
        marginLeft: wp('2%'),
        width:wp('70%'),
        fontSize:hp('1.6%'),
        fontFamily:fonts.Regular,
    },
    checkbox: {},
    break: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: height / 40,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: colors.LIGHT_GRAY,
    },
    ORtext: {
        marginHorizontal: 10,
        fontSize: height / 55,
        fontFamily:fonts.Regular,
        color: colors.GREEN,
    },
    altSignin: {
        gap: height / 80,
    },
    altSigninButton: {
        width: width / 1.11,
        height: height / 20,
        borderColor: colors.LIGHT_GRAY,
        borderWidth: 1,
        borderRadius: 8,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    altSigninButtonIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    passToggleButton: {},
    showPassIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    passInputBox: {
        height: hp('5.5%'),
        width: wp('85%'),
        fontSize: hp('1.7%'),
        fontFamily:fonts.Regular,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: hp('1.2%'),
        borderColor: colors.LIGHT_GRAY,
    },
    passInput: {
        flex: 3,
        fontSize: hp('1.7%'),
        fontFamily:fonts.Regular,
        borderRadius:hp('1.3%'),
        color: colors.BLACK
    },
    terms: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    redirectLink: {
        color: colors.GREEN,
        textDecorationLine: 'underline',
        fontSize:hp('1.6%'),
        fontFamily:fonts.Regular,
    }
});

export default SignUp;
