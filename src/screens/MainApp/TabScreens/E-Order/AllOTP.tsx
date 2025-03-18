import React, { useEffect, useRef, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, TextInput, StyleSheet, Button, Text, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomButton from '../../../../components/CustomButton';
import colors from '../../../../../util/Constants/colors';
import ScreensName from '../../../../../util/Constants/ScreensName';
import { useTranslation } from "react-i18next";
import { fonts } from '../../../../../util/Constants/FontName';

const AllOTP = () => {
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
    const { t } = useTranslation();

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
            <Text style={styles.title}>{t('OTP Verification')}</Text>
            <View style={styles.infotextcontainer}>
                <Text style={styles.subtitle}>
                    {t('Please enter the verification code we’ve sent you on +92-3212684192')}
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
                <Text style={styles.autocapturetext}>{t('Trying to Auto Capture')}</Text>
                <Text style={styles.timetext}> {formatTime(timeLeft)}</Text>
            </View>

            <CustomButton
                MainText={t('Verify')}
                BgGiven={colors.GREEN} name={ScreensName.PaymentSuccess} txColor={colors.WHITE} isNavigation={1} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: hp('1.5%'),
        backgroundColor: "white",
    },
    title: {
        marginTop: hp('10%'),
        fontSize: hp('3%'),
        fontFamily: fonts.SemiBold,
        marginBottom: hp('1.5%'),
        marginRight: wp('36%'),
    },
    subtitle: {
        fontSize: hp('1.8%'),
        fontFamily: fonts.Regular,
        marginBottom: hp('1.9%'),
        alignSelf: "flex-start",
        marginTop: hp('1%'),
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: hp('3.5%'),
    },
    infotextcontainer: {
        width: wp('70%'),
        marginRight: wp('15%'),
    },
    inputBox: {
        width: wp('13%'),
        height: hp('7.5%'),
        borderWidth: hp('0.1%'),
        borderColor: "#ccc",
        borderRadius: hp('1.5%'),
        textAlign: "center",
        fontSize: hp('2.5%'),
        fontFamily: fonts.Regular,
        backgroundColor: "#FFF",
        marginHorizontal: hp('0.5%'),
        color: colors.BLACK
    },
    bottomContainer: {
        flexDirection: "row",
        // marginRight: wp("43%"),
        marginBottom: hp('3%'),
        marginHorizontal: hp(2)

    },
    autocapturetext: {
        fontSize: hp('1.5%'),
        fontFamily: fonts.Light,
        fontWeight: '300',
        marginLeft: wp('3%'),
        marginRight: wp('33%'),
    },
    activityindicator: {

    },
    timetext: {
        fontSize: hp('2%'),
        fontFamily: fonts.Regular,
    },
});

export default AllOTP;
