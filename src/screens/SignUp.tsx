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
} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import colors from '../../util/colors';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ScreensName from "../../util/ScreensName";

const { height, width } = Dimensions.get("window");

function SignUp(): React.JSX.Element {
    const [passwordVisible, setPasswordVisible] = useState(false);
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.Header}>
                <Text style={styles.Heading}>Register</Text>
                <Text style={styles.SubHeading}>Welcome, please Register</Text>
            </View>
            <View style={styles.inputs}>
                <CustomInput placeholder={"Full Name"} hide={0} />
                <CustomInput placeholder="Phone No." hide={0} />
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
                        size={25}
                        fillColor={colors.GREEN}
                        iconStyle={{ borderColor: colors.LIGHT_GRAY }}
                        style={styles.checkbox}
                        textComponent={1}
                        innerIconStyle={{ borderRadius: 7 }}
                    />
                    <Text style={styles.RememberMeText}>Sign up for e-mails to get updates from E-Arthi tips and offers</Text>
                </View>

            </View>

            <View style={styles.button}>
                <CustomButton
                    MainText={"Register"}
                    BgGiven={colors.GREEN}
                    name={ScreensName.Home}
                    txColor={colors.WHITE}
                    isNavigation={1}
                ></CustomButton>
            </View>



            <Text style={styles.infoText}>
                By creating your account, you agree to the Terms of Services and Privacy Policy
            </Text>
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
                    <Text style={{ fontSize: height / 65 }}>Register with Google </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.altSigninButton}>
                    <Image
                        source={require("../assets/apple.png")}
                        style={styles.altSigninButtonIcon}
                    />
                    <Text style={{ fontSize: height / 65 }}>Register with Apple </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        backgroundColor: colors.WHITE,
        paddingHorizontal: width / 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    infoText: {
        marginVertical: 10,
        textAlign: 'center',
        color: '#666',
    },
    orText: {
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginTop: 20,
    },
    buttonWithSpacing: {
        marginBottom: 10, // Adds space between buttons
    },
    Header: {
        marginTop: height / 10,
        marginBottom: height / 20,
    },
    Heading: {
        fontSize: height / 30,
        fontWeight: "bold",
        color: colors.BLACK,
    },
    SubHeading: {
        fontSize: height / 45,
        marginTop: height / 100,
    },
    inputs: {
        gap: height / 40,
        alignItems: "center",
    },
    button: {
        marginTop: height / 20,
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
        fontSize: height / 55,
        marginLeft: 5,
    },
    checkbox: {},
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
        height: height / 20,
        width: width / 1.1,
        fontSize: 16,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: width / 44,
        borderColor: colors.LIGHT_GRAY,
    },
    passInput: {
        flex: 3,
    },
});

export default SignUp;
