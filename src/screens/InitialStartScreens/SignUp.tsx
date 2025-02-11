import React, { useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    Dimensions,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
} from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import colors from "../../../util/colors";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ScreensName from "../../../util/ScreensName.ts";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../util/FontName";
import CustomInputAndText from "../MainApp/TabScreens/E-Loan/NewLoanComponents/CustomInputAndText.jsx";
import SwitchButtonCustom from "../MainApp/TabScreens/E-Loan/NewLoanComponents/SwitchButton.jsx";
import SwitchButtonCoperate from "./SwitchButtonCoperate.jsx";
import { useNavigation } from "@react-navigation/native";
import userData from "../../../util/User";
import { MMKV } from "react-native-mmkv";

const { height, width } = Dimensions.get("window");

function SignUp(): React.JSX.Element {
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Number, setNumber] = useState("+92");
    const [Password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState();
    const [NameError, setNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [NumberError, setNumberError] = useState(false);
    const [EmailError, setEmailError] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(true);
    const { t } = useTranslation();
    const [selectedOption, setSelectedOption] = useState("Individual");
    const navigation = useNavigation(); // Added navigation instance
    const storage = new MMKV();
    const handleNumberChange = (value: string) => {
        //value = value.replace(/[^0-9]/g, "");
        setNumber(value);
    };

    const validateInput = () => {
        setErrorMessage(null);
        setNameError(false);
        setPasswordError(false);
        setNumberError(false);

        if (!Name || !Email || !Password || !Number) {
            setErrorMessage(t("Please fill all fields"));
            if (!Name) setNameError(true);
            if (!Password) setPasswordError(true);
            if (Number === "+92" || !Number) setNumberError(true);
            if (!Email) setEmailError(true);
            return;
        }
        if ( Number.length<13) {
            setErrorMessage(t("Mobile number must be 12 digits"));
            setNumberError(true);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
            setErrorMessage(t("Invalid email format"));
            setEmailError(true);
            return;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passwordRegex.test(Password)) {
            setErrorMessage(t("Password must be at least 6 characters, with one number and one special character"));
            setPasswordError(true);
            return;
        }

        const isEmailDuplicate = userData.some((user) => user.username === Email);
        if (isEmailDuplicate) {
            setErrorMessage(t("This email is already registered"));
            setNameError(true);
            return;
        }

        // Add the new user (simulated, since modifying JSON directly is not possible)
        const newUser = {
            username: Email,
            password: Password,
            phoneNumber: Number,
        };
    
        userData.push(newUser);
        storage.set("Number",Number);
        navigation.navigate(ScreensName.OTPSignUp);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.Header}>
                <Text style={styles.Heading}>{t("Register")}</Text>
                <Text style={styles.SubHeading}>
                    {t("Welcome, please Register")}
                </Text>
                <SwitchButtonCoperate
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                />
            </View>

            <View style={styles.inputs}>
                <View>
                    <Text style={styles.inputBoxLabel}>{t("Full Name")}</Text>
                    <View style={[styles.passInputBox,{borderColor: NameError? colors.RED :colors.LIGHT_GRAY}]}>
                        <TextInput
                            style={styles.Input}
                            placeholder={t("Full Name")}
                            placeholderTextColor={NameError ? colors.RED : colors.Text_Fancy}
                            value={Name}
                            onChangeText={(value) => setName(value)}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.inputBoxLabel}>
                        {t("Email Address")}
                    </Text>
                    <View style={[styles.passInputBox,{borderColor: EmailError? colors.RED :colors.LIGHT_GRAY}]}>
                        <TextInput
                            style={styles.Input}
                            placeholder={t("Email Address")}
                            placeholderTextColor={EmailError ? colors.RED : colors.Text_Fancy}
                            value={Email}
                            onChangeText={(value) => setEmail(value)}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.inputBoxLabel}>{t("Mobile No.")}</Text>
                    <View style={[styles.passInputBox,{borderColor: NumberError? colors.RED :colors.LIGHT_GRAY}]}>
                        <TextInput
                            style={styles.Input}
                            placeholder={t("Mobile No.")}
                            placeholderTextColor={NumberError ? colors.RED : colors.Text_Fancy}
                            value={Number}
                            keyboardType="number-pad"
                            maxLength={13}
                            onChangeText={(value) => handleNumberChange(value)}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.inputBoxLabel}>{t("Password")}</Text>
                    <View style={[styles.passInputBox,{borderColor: passwordError? colors.RED :colors.LIGHT_GRAY}]}>
                        <TextInput
                            style={styles.Input}
                            placeholder={t("Password")}
                            placeholderTextColor={passwordError ? colors.RED : colors.Text_Fancy}
                            secureTextEntry={passwordVisible}
                            value={Password}
                            onChangeText={(value) => setPassword(value)}
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
            </View>

            <View style={styles.options}>
                
                <View style={styles.RememberMe}>
                    <BouncyCheckbox
                        size={hp(2.5)}
                        fillColor={colors.GREEN}
                        isChecked={false} // Ensure it's explicitly set to a boolean
                        iconStyle={{ borderColor: colors.LIGHT_GRAY }}
                        style={styles.checkbox}
                        innerIconStyle={{ borderRadius: 7 }}
                        textComponent={
                            <Text style={styles.RememberMeText}>
                                {t(
                                    "Sign up for e-mails to get updates from E-Agri tips and offers"
                                )}
                            </Text>
                        }
                    />
                </View>
            </View>
            {errorMessage && (
                    <View style={styles.errorBox}>
                        <Text style={styles.error}>{errorMessage}</Text>
                    </View>
                )}
            <View style={styles.button}>
                
                <CustomButton
                    MainText={t("Register")}
                    BgGiven={colors.GREEN}
                    name={ScreensName.OTPSignUp}
                    txColor={colors.WHITE}
                    isNavigation={1}
                    onPressG={validateInput}
                />
            </View>

            <View style={styles.terms}>
                <Text style={styles.infoText}>
                    {t("By creating your account, you agree to the ")}
                </Text>
                <TouchableOpacity>
                    <Text style={styles.redirectLink}>
                        {"Terms of Services "}
                    </Text>
                </TouchableOpacity>
                <Text style={styles.infoText}>{t("and ")}</Text>
                <TouchableOpacity>
                    <Text style={styles.redirectLink}>
                        {t("Privacy Policy")}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.break}>
                <View style={styles.line} />
                <Text style={styles.ORtext}>{t("OR")}</Text>
                <View style={styles.line} />
            </View>

            <View style={styles.altSignin}>
                <TouchableOpacity style={styles.altSigninButton}>
                    <Image
                        source={require("../../assets/whatsapp.png")}
                        style={styles.altSigninButtonIcon}
                    />
                    <Text
                        style={{
                            fontSize: height / 65,
                            fontFamily: fonts.Regular,
                        }}
                    >
                        {t("Register with Whatsapp ")}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.altSigninButton}>
                    <Image
                        source={require("../../assets/google.png")}
                        style={styles.altSigninButtonIcon}
                    />
                    <Text
                        style={{
                            fontSize: height / 65,
                            fontFamily: fonts.Regular,
                        }}
                    >
                        {t("Register with Google ")}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.altSigninButton, { marginBottom: hp(2) }]}
                >
                    <Image
                        source={require("../../assets/apple.png")}
                        style={styles.altSigninButtonIcon}
                    />
                    <Text
                        style={{
                            fontSize: height / 65,
                            fontFamily: fonts.Regular,
                        }}
                    >
                        {t("Register with Apple ")}
                    </Text>
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
        marginTop: height / 18,
        marginBottom: height / 30,
    },
    Heading: {
        fontSize: height / 25,
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
    },
    SubHeading: {
        fontSize: height / 45,
        fontFamily: fonts.Regular,
        marginTop: height / 100,
    },
    infoText: {
        fontSize: hp("1.6%"),
        fontFamily: fonts.Regular,
    },
    inputs: {
        gap: height / 70,
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
        marginTop: hp(-1)
    },
    RememberMeText: {
        marginLeft: wp("2%"),
        width: wp("70%"),
        fontSize: hp("1.6%"),
        fontFamily: fonts.Regular,
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

        fontFamily: fonts.Regular,
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
        width: wp(8),
        height: hp(3),
        marginRight: wp(2),
        resizeMode: "contain",
    },
    showPassIcon: {
        width: wp(5),
        height: hp(2.5),
        marginRight: wp(2),
        resizeMode: "contain",
    },
    passInputBox: {
        height: hp("5.5%"),
        width: wp("85%"),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: hp("1.2%"),
        borderColor: colors.LIGHT_GRAY,
        paddingRight: 10,
    },
    Input: {
        flex: 1,
        fontSize: hp("1.7%"),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
        paddingHorizontal: wp(2),
        height: "100%",
        paddingLeft: wp(2),
        paddingVertical: 8,
    },
    passToggleButton: {
        padding: 8,
    },
    terms: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginLeft: hp(1),
    },
    redirectLink: {
        color: colors.GREEN,
        textDecorationLine: "underline",
        fontSize: hp("1.6%"),
        fontFamily: fonts.Regular,
    },
    inputBoxLabel: {
        fontSize: hp(2),
        fontFamily: fonts.Regular,
        paddingLeft: hp(0.3),
    },
    error: {
        textAlign: "left",
        color: colors.BLACK,
        alignSelf: "flex-start",
        fontFamily: fonts.Medium,
        fontSize: hp(1.5),
    },
    errorBox: {
        backgroundColor: "#FFC1C3",
        borderRadius: 10,
        textAlign: "left",
        padding: hp(1),
        marginLeft: wp(4),
        alignSelf: "flex-start",
        borderColor: colors.RED,
        borderWidth: 1,
        marginTop: hp(1)
    },
});

export default SignUp;
