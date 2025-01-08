import React from 'react';
import type { PropsWithChildren } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import colors from '../../util/colors';


function ForgotPassword(): React.JSX.Element {
    return (
        <View style={styles.container}>
            <View style={styles.textWrapper}>
                <Text style={styles.title}>Forgot Password</Text>

                <Text style={styles.subtitle}>
                    Enter your email to be sent a reset password
                </Text>
            </View>
            <View style={styles.inputWrapper}>
                <CustomInput
                    placeholder="email@email.com"
                    hide={0}
                />
            </View>
            <View style={styles.resetWrapper}>
                <CustomButton
                    MainText="Reset"
                    BgGiven={colors.GREEN}
                    txColor="#FFFFFF"
                    isNavigation={false}
                    name="Reset"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
    },
    resetWrapper: {
        width: 330,
        height: 48,
        marginTop: 384,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 60,
        paddingRight: 60,
        borderRadius: 8,
    },
    inputWrapper: {
        width: 330,
        height: 50,
        marginTop: 224,
        marginLeft: 30,
    },
    textWrapper: {
        width: 330,
        height: 93,
        marginTop: 116,
        marginLeft: 30,
        gap: 16,
    },
});

export default ForgotPassword;