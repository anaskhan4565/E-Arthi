import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, Dimensions, View, TouchableOpacity, TextInput, Image } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import colors from '../../util/colors';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ScreensName from "../../util/ScreensName";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { height, width } = Dimensions.get("window");
const isTablet = width > 600;
console.log(isTablet);

console.log(height);
console.log(width);
function SignUp(): React.JSX.Element {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.Header}>
                <Text style={styles.Heading}>Register</Text>
                <Text style={styles.SubHeading}>Welcome, please Register</Text>
            </View>

            <View style={styles.inputs}>
                <CustomInput placeholder={"Full Name"} bg_give={colors.WHITE} b_radius={8} hide={0} />
                <CustomInput placeholder="Phone No." bg_give={colors.WHITE} b_radius={8} hide={0} />
                <View style={styles.passInputBox}>
                    <TextInput
                        style={styles.passInput}
                        placeholder={"Password"}
                        secureTextEntry={passwordVisible}
                    />
                    <TouchableOpacity
                        style={styles.passToggleButton}
                        onPress={() => setPasswordVisible(!passwordVisible)}
                    >
                        <Image
                            source={require("../assets/EyeHide.png")}
                            style={styles.showPassIcon}
                        ></Image>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.options}>
                <View style={styles.RememberMe}>
                    <BouncyCheckbox
                        size={isTablet ? wp('1.9%') : wp('5%')}
                        fillColor={colors.GREEN}
                        iconStyle={{ borderColor: colors.LIGHT_GRAY }}
                        style={styles.checkbox}
                        innerIconStyle={{ borderRadius: 7 }}
                        textComponent={
                            <Text style={styles.RememberMeText}>
                                Sign up for e-mails to get updates from E-Arthi tips and offers
                            </Text>
                        }
                    />
                </View>
            </View>

            <View style={styles.button}>
                <CustomButton
                    MainText={"Register"}
                    BgGiven={colors.GREEN}
                    name={ScreensName.OTP}
                    txColor={colors.WHITE}
                    isNavigation={1}
                ></CustomButton>
            </View>

            <View style={styles.terms}>
                <Text style={styles.infoText}>By creating your account, you agree to the </Text>
                <TouchableOpacity>
                    <Text style={styles.redirectLink}>Terms of Services </Text>
                </TouchableOpacity>
                <Text style={styles.infoText}>and </Text>
                <TouchableOpacity>
                    <Text style={styles.redirectLink}>Privacy Policy</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.break}>
                <View style={styles.line} />
                <Text style={styles.ORtext}>OR</Text>
                <View style={styles.line} />
            </View>

            <View style={styles.altSignin}>
                <TouchableOpacity style={styles.altSigninButton}>
                    <Image
                        source={require("../assets/google.png")}
                        style={styles.altSigninButtonIcon}
                    />
                    <Text style={{ fontSize: hp('1.7%') }}>Register with Google </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.altSigninButton}>
                    <Image
                        source={require("../assets/apple.png")}
                        style={styles.altSigninButtonIcon}
                    />
                    <Text style={{ fontSize: hp('1.7%') }}>Register with Apple </Text>
                </TouchableOpacity>
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
        marginLeft: wp('2%'),
        marginTop: isTablet ? height / 15 : height / 10,
        marginBottom: height / 20,
    },
    Heading: {
        fontSize: isTablet ? width / 38 : height / 30,
        fontWeight: "bold",
        color: colors.BLACK,
    },
    SubHeading: {
        fontSize: isTablet ? width / 58 : height / 45,
        marginTop: height / 100,
    },
    infoText: {
        // marginVertical: 10,
        // color: '#666',
        fontSize: isTablet ? width / 90 : height / 60,
        marginLeft: wp('1%'),
    },
    inputs: {
        gap: height / 40,
        alignItems: "center",
    },
    button: {
        marginTop: isTablet ? height / 45 : height / 40,
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
        marginLeft: wp('1%'),
    },
    RememberMeText: {
        fontSize: isTablet ? width / 90 : height / 60,
        marginLeft: wp('2%'),
        width: wp('70%')
    },
    checkbox: {
        marginLeft: wp('2%'),
    },
    forgotPassword: {
        flex: 1,
        alignItems: "flex-end",
        color: colors.GREEN,
        fontSize: height / 55,
    },
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
        color: colors.GREEN,
    },
    altSignin: {
        gap: height / 80,
        marginBottom: isTablet ? hp('10%') : hp('0%'),
    },
    altSigninButton: {
        height: isTablet ? hp('6.7%') : hp('5.7%'),
        width: wp('85%'),
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
        width: wp('7%'),
        height: hp('4%'),
        marginRight: 10,
        resizeMode: 'contain',
    },
    passToggleButton: {},
    showPassIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    checkboxContainer: {
        padding: 10, // Padding around the checkbox container
        flexDirection: "row", // To align the checkbox and the text together
        alignItems: "center", // To vertically align the checkbox and text
    },
    passInputBox: {
        height: isTablet ? hp('6.7%') : hp('5.7%'),
        width: wp('85%'),
        fontSize: 16,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 8,
        borderColor: colors.LIGHT_GRAY,
    },
    passInput: {
        flex: 3,
        fontSize: 16,
    },
    terms: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    redirectLink: {
        color: colors.GREEN,
        textDecorationLine: 'underline',
    }
});

export default SignUp;
