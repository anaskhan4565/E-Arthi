import React, { useEffect, useRef, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, TextInput, StyleSheet, Button, Text, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomButton from '../components/CustomButton';
import colors from '../../util/colors';
import ScreensName from '../../util/ScreensName';


const OTP = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputs = useRef([]);
    const [timer, setTimer] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState<number>(60);
    const isFocused = useIsFocused()
    let intervalId: NodeJS.Timeout;
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

    };

    useEffect(() => {
        if (isFocused) {
            startTimer();
        }
        return () => {
            clearInterval(intervalId);
        };
    }, [isFocused]);
    const startTimer = () => {
        setTimer(true);
        intervalId = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(intervalId);
                    setTimer(false);
                    setTimeLeft(5);
                    return 0;

                }
                return prevTime - 1;
            });
        }, 1000);
    };

    const handleChange = (text, index) => {
        if (text.length === 1) {
            const newOtp = [...otp];
            newOtp[index] = text;
            setOtp(newOtp);

            if (index < inputs.current.length - 1) {
                inputs.current[index + 1].focus();
            }
        } else if (text === "") {
            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);
        }
    };

    const handleSubmit = () => {
        const otpCode = otp.join("");

    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>OTP Verification</Text>
            <View style={styles.infotextcontainer}>
                <Text style={styles.subtitle}>
                    Please enter the verification code we’ve sent you on 9999999999
                </Text>
            </View>

            <View style={styles.inputContainer}>
                {otp.map((_, index) => (
                    <TextInput
                        key={index}
                        style={styles.inputBox}
                        keyboardType="numeric"
                        maxLength={1}
                        onChangeText={(text) => handleChange(text, index)}
                        ref={(ref) => (inputs.current[index] = ref)}
                    />
                ))}
            </View>
            <View style={styles.bottomContainer}>
                < ActivityIndicator size={23} color={colors.GREEN} style={styles.activityindicator} />
                <Text style={styles.autocapturetext}>Trying to Auto Capture</Text>
                <Text style={styles.timetext}> {formatTime(timeLeft)}</Text>
            </View>

            <CustomButton
                MainText="Verify"
                BgGiven={colors.GREEN} name={ScreensName.SignIn} txColor={colors.WHITE} isNavigation={1} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 16,
        backgroundColor: "white",
    },
    title: {
        marginTop: hp('10%'),
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
        marginRight: wp('42%'),
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 24,
        alignSelf: "flex-start",
        marginTop: hp('1%'),
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    infotextcontainer: {
        width: wp('70%'),
        marginRight: wp('15%'),
    },
    inputBox: {
        width: wp('13%'),
        height: hp('6.5%'),
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 12,
        textAlign: "center",
        fontSize: 18,
        backgroundColor: "#FFF",
        marginHorizontal: 3,
    },
    bottomContainer: {
        flexDirection: "row",
        // marginRight: wp("43%"),
        marginBottom: hp('3%'),

    },
    autocapturetext: {
        fontSize: 14,
        fontWeight: '300',
        marginLeft: wp('3%'),
        marginRight: wp('33%'),
    },
    activityindicator: {

    },
    timetext: {

    },
});

export default OTP;
