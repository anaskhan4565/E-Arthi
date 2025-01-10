import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import colors from '../../util/colors';
import ScreensName from '../../util/ScreensName';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from "react-i18next";


function ForgotPassword(): React.JSX.Element {
    const {t}=useTranslation();
    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <View style={styles.textContainer}>
                    <Text style={styles.heading}>{t('Forgot Password')}</Text>
                    <Text style={styles.subHeading}>{t('Enter your email to be sent a reset password')}</Text>
                    <CustomInput placeholder={"email@email.com"} hide={false} />
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        MainText={t('Reset')}
                        BgGiven={colors.GREEN}
                        txColor={colors.WHITE}
                        isNavigation={true}
                        name={ScreensName.SignUp}
                    />
                </View>
            </View>
            <View style={styles.bottomSection} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
        flexDirection: 'column',
    },
    topSection: {
        height: hp('60%'),
    },
    textContainer: {
        flex: 0.7,
        justifyContent: 'flex-end',
        gap: hp('2%'),
        marginHorizontal: wp('8%'),
    },
    heading: {
        fontSize: hp('3%'),
        fontWeight: '600',
    },
    subHeading: {
        fontSize: hp('2%'),
    },
    buttonContainer: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    bottomSection: {
        flex: 0.5,
    },
});

export default ForgotPassword;
