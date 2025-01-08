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
            <View style={{flex:0.5}}>
                <View style={styles.textWrapper}>
                    <Text style={styles.title}>selected</Text>
                    <Text style={styles.subtitle}>Enter your email to be sent a reset password</Text>
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
            <View style={{flex:0.5}}></View>
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
        color: colors.BLACK,
        marginBottom: 10,
        justifyContent: 'center',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: colors.BLACK,
        marginBottom: 20,
        textAlign: 'center',
    },
    resetWrapper: {
        flex:1,
        marginTop: 384,
        borderRadius: 8,
    },
    inputWrapper: {
        flex:1,
        marginTop: 224,
    },
    textWrapper: {
        gap: 16,
    },
});

export default ForgotPassword;