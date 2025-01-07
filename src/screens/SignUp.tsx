import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomButtonWithImage from '../components/CustomButtonWithImage';
import colors from '../../util/colors';

function SignUp(): React.JSX.Element {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <Text>Welcome, please Register</Text>
            <CustomInput placeholder="Full Name" hide={0} />
            <CustomInput placeholder="Phone No." hide={0} />
            <CustomInput placeholder="Password" hide={1} />

            <Text style={styles.infoText}>
                Sign up for e-mails to get updates from E-Arthi tips and offers
            </Text>
            <CustomButton
                MainText="Register"
                BgGiven={colors.GREEN}
                txColor="white"
                name="SignUp"
                isNavigation={false}
            />
            <Text style={styles.infoText}>
                By creating your account, you agree to the Terms of Services and Privacy Policy
            </Text>
            <Text style={styles.orText}>OR</Text>

            {/* Buttons with space */}
            <View style={styles.buttonContainer}>
                <CustomButtonWithImage
                    MainText="Login with Google"
                    BgGiven={colors.WHITE}
                    txColor="black"
                    name="SignUp"
                    isNavigation={false}
                    imageSource={require('../assets/google.png')} // Replace with your image path
                />
                <CustomButtonWithImage
                    MainText="Login with Apple"
                    BgGiven={colors.WHITE}
                    txColor="black"
                    name="SignUp"
                    isNavigation={false}
                    imageSource={require('../assets/apple.png')} // Replace with your image path
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        backgroundColor: '#fff',
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
});

export default SignUp;
