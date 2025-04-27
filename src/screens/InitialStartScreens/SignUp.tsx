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
    ActivityIndicator,
} from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import colors from "../../../util/Constants/colors.js";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ScreensName from "../../../util/Constants/ScreensName.ts";
import axios from "axios";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../util/Constants/FontName.js";
import CustomInputAndText from "../MainApp/TabScreens/E-Loan/NewLoanComponents/CustomInputAndText.jsx";
import SwitchButtonCustom from "../MainApp/TabScreens/E-Loan/NewLoanComponents/SwitchButton.jsx";
import SwitchButtonCoperate from "./SwitchButtonCoperate.jsx";
import { useNavigation } from "@react-navigation/native";
import userData from "../../../util/Constants/User.js";
import { MMKV } from "react-native-mmkv";
import Routes from "../../../util/Constants/Routes.js";

const { height, width } = Dimensions.get("window");

function SignUp(): React.JSX.Element {
    const [Name, setName] = useState("");
    const [LastName, setLastName] = useState("");
    const [FirstName, setFirstName] = useState("");

    const [Email, setEmail] = useState("");
    const [Number, setNumber] = useState("+92");
    const [Password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [FirstNameError, setFirstNameError] = useState(false);
    const [LastNameError, setLastNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [NumberError, setNumberError] = useState(false);
    const [EmailError, setEmailError] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(true);
    const { t } = useTranslation();
    const [selectedOption, setSelectedOption] = useState("Individual");
    const navigation = useNavigation<any>(); // Type as any to allow any screen name
    const storage = new MMKV();
    const [isLoading, setIsLoading] = useState(false);
    const handleNumberChange = (value: string) => {
        setNumber(value);
        // Clear number error when user starts typing
        if (NumberError && value !== "+92") {
            setNumberError(false);
            // Clear error message if it was related to phone number
            if (errorMessage === t("Mobile number must be 12 digits") ||
                errorMessage === t("Please fill all fields")) {
                setErrorMessage(null);
            }
        }
    };

    const handleEmailChange = (value: string) => {
        setEmail(value);
        // Clear email error when user starts typing
        if (EmailError) {
            setEmailError(false);
            // Clear error message if it was related to email
            if (errorMessage === t("Invalid email format") ||
                errorMessage === t("This email is already registered") ||
                errorMessage === t("Please fill all fields")) {
                setErrorMessage(null);
            }
        }
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        // Clear password error when user starts typing
        if (passwordError) {
            setPasswordError(false);
            // Clear error message if it was related to password
            if (errorMessage === t("Please fill all fields")) {
                setErrorMessage(null);
            }
        }
    };

    const handleFirstNameChange = (value: string) => {
        setFirstName(value);
        // Clear first name error when user starts typing
        if (FirstNameError) {
            setFirstNameError(false);
            // Clear error message if it was related to first name
            if (errorMessage === t("Please fill all fields")) {
                setErrorMessage(null);
            }
        }
    };

    const handleLastNameChange = (value: string) => {
        setLastName(value);
        // Clear last name error when user starts typing
        if (LastNameError) {
            setLastNameError(false);
            // Clear error message if it was related to last name
            if (errorMessage === t("Please fill all fields")) {
                setErrorMessage(null);
            }
        }
    };

    const validateInput = async () => {
        // Reset all error states at the beginning
        setErrorMessage(null);
        setFirstNameError(false);
        setLastNameError(false);
        setPasswordError(false);
        setNumberError(false);
        setEmailError(false);

        // Check for empty fields first
        let hasEmptyFields = false;

        if (!FirstName) {
            setFirstNameError(true);
            hasEmptyFields = true;
        }

        if (!LastName) {
            setLastNameError(true);
            hasEmptyFields = true;
        }

        if (!Password) {
            setPasswordError(true);
            hasEmptyFields = true;
        }

        if (Number === "+92" || !Number) {
            setNumberError(true);
            hasEmptyFields = true;
        }

        if (!Email) {
            setEmailError(true);
            hasEmptyFields = true;
        }

        if (hasEmptyFields) {
            setErrorMessage(t("Please fill all fields"));
            return;
        }

        // Validate phone number format
        if (Number.length < 13) {
            setErrorMessage(t("Mobile number must be 12 digits"));
            setNumberError(true);
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
            setErrorMessage(t("Invalid email format"));
            setEmailError(true);
            return;
        }

        // Check for duplicate email
        const isEmailDuplicate = userData.some((user) => user.username === Email);
        if (isEmailDuplicate) {
            setErrorMessage(t("This email is already registered"));
            setEmailError(true); // Changed from setNameError to setEmailError
            return;
        }

        // All validations passed, proceed with signup
        setIsLoading(true);
        try {
            const response = await axios.post(Routes.signup, {
                username: Email,
                password: Password,
                phone_number: Number,
                email: Email,
                first_name: FirstName,
                last_name: LastName,
                password2: Password,
            });

            if (response.status === 201) {
                const newUser = {
                    username: Email,
                    password: Password,
                    phoneNumber: Number,
                };

                userData.push(newUser);
                storage.set("Number", Number);
                navigation.navigate("OTPSignUp");
            }
        } catch (error: any) {
            console.log(error);
            // Handle API error response
            if (error.response?.data?.message) {
                setErrorMessage(t(error.response.data.message));
            } else {
                setErrorMessage(t("Signup failed. Please try again."));
            }
            // Don't set any specific field as error since we don't know which field caused the error
        } finally {
            setIsLoading(false);
        }
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

            {/* Position error message at the top of the form for better visibility */}
            {errorMessage && (
                <View style={styles.errorBox}>
                    <Text style={styles.error}>{errorMessage}</Text>
                </View>
            )}

            <View style={styles.inputs}>
                <View>
                    <Text style={styles.inputBoxLabel}>{t("First Name")}</Text>
                    <View style={[styles.passInputBox, { borderColor: FirstNameError ? colors.RED : colors.LIGHT_GRAY }]}>
                        <TextInput
                            style={styles.Input}
                            placeholder={t("First Name")}
                            placeholderTextColor={FirstNameError ? colors.RED : colors.Text_Fancy}
                            value={FirstName}
                            onChangeText={handleFirstNameChange}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.inputBoxLabel}>{t("Last Name")}</Text>
                    <View style={[styles.passInputBox, { borderColor: LastNameError ? colors.RED : colors.LIGHT_GRAY }]}>
                        <TextInput
                            style={styles.Input}
                            placeholder={t("Last Name")}
                            placeholderTextColor={LastNameError ? colors.RED : colors.Text_Fancy}
                            value={LastName}
                            onChangeText={handleLastNameChange}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.inputBoxLabel}>
                        {t("Email Address")}
                    </Text>
                    <View style={[styles.passInputBox, { borderColor: EmailError ? colors.RED : colors.LIGHT_GRAY }]}>
                        <TextInput
                            style={styles.Input}
                            placeholder={t("Email Address")}
                            placeholderTextColor={EmailError ? colors.RED : colors.Text_Fancy}
                            value={Email}
                            onChangeText={handleEmailChange}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.inputBoxLabel}>{t("Mobile No.")}</Text>
                    <View style={[styles.passInputBox, { borderColor: NumberError ? colors.RED : colors.LIGHT_GRAY }]}>
                        <TextInput
                            style={styles.Input}
                            placeholder={t("Mobile No.")}
                            placeholderTextColor={NumberError ? colors.RED : colors.Text_Fancy}
                            value={Number}
                            keyboardType="number-pad"
                            maxLength={13}
                            onChangeText={handleNumberChange}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.inputBoxLabel}>{t("Password")}</Text>
                    <View style={[styles.passInputBox, { borderColor: passwordError ? colors.RED : colors.LIGHT_GRAY }]}>
                        <TextInput
                            style={styles.Input}
                            placeholder={t("Password")}
                            placeholderTextColor={passwordError ? colors.RED : colors.Text_Fancy}
                            secureTextEntry={passwordVisible}
                            value={Password}
                            onChangeText={handlePasswordChange}
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
                        isChecked={false}
                        iconStyle={{ borderColor: colors.LIGHT_GRAY }}
                        style={styles.checkbox}
                        innerIconStyle={{ borderRadius: 7 }}
                        textComponent={
                            <Text style={styles.RememberMeText}>
                                {t("Sign up for e-mails to get updates from E-Agri tips and offers")}
                            </Text>
                        }
                    />
                </View>
            </View>

            <View style={styles.button}>
                <TouchableOpacity
                    style={[styles.customButton, { backgroundColor: colors.GREEN }]}
                    onPress={validateInput}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color={colors.WHITE} />
                    ) : (
                        <Text style={styles.buttonText}>{t("Register")}</Text>
                    )}
                </TouchableOpacity>
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
        fontFamily: fonts.Medium,
        fontSize: hp(1.5),
    },
    errorBox: {
        backgroundColor: "#FFC1C3",
        borderRadius: 10,
        padding: hp(1.5),
        marginTop: hp(1),
        marginBottom: hp(2),
        width: wp(85),
        alignSelf: "center",
        borderColor: colors.RED,
        borderWidth: 1,
    },
    loadingOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 1000,
        elevation: 3,
    },
    loadingText: {
        marginTop: hp(1),
        fontSize: hp(2),
        fontFamily: fonts.Medium,
        color: colors.GREEN
    },
    customButton: {
        width: wp("85%"),
        height: hp("5.5%"),
        borderRadius: hp("1.2%"),
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: colors.WHITE,
        fontSize: hp("2%"),
        fontFamily: fonts.Medium,
    },
});

export default SignUp;
