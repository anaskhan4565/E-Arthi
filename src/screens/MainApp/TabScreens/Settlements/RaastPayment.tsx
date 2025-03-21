import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Image,
    TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import RAAST from "../../../../assets/MainApp/E-Order/PaymentMethods/RAAST.svg";

import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';

const RaastPayment = () => {
    const { t } = useTranslation();
    const [raastId, setRaastId] = useState('');
    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');
    const [purpose, setPurpose] = useState('');

    const handleNext = () => {
        // Handle next button press
        console.log('Payment details:', { raastId, amount, name, purpose });
    };

    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>

            <View style={styles.searchBarContainer}>
                <CustomSearchApp placeholder="Search in here" />
            </View>

            <ScrollView style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Raast</Text>
                    <Text style={styles.paymentLabel}>Payment</Text>
                </View>

                <View style={styles.logoContainer}>
                    <RAAST width={wp('28%')} height={hp('15%')} />
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputGroup}>
                        <Text style={[styles.inputLabel, { marginTop: hp('2%') }]}>Raast ID:</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter Raast ID"
                            value={raastId}
                            onChangeText={setRaastId}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Amount:</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter amount"
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={setAmount}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Name:</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter name"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Purpose of Payment:</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter purpose"
                            value={purpose}
                            onChangeText={setPurpose}
                        />
                    </View>

                    <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                        <Text style={styles.nextButtonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    navbarContainer: {
        height: hp(8.5),
        backgroundColor: colors.WHITE,
    },
    searchBarContainer: {
        marginTop: hp('2%'),
        paddingHorizontal: wp('5%'),
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: wp('5%'),
        marginTop: hp('2%'),

    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp('1%'),
        marginBottom: hp('2%'),
        justifyContent: 'space-between',
    },
    title: {
        fontSize: hp('2.5%'),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
    },
    paymentLabel: {
        fontSize: hp('2.5%'),
        fontFamily: fonts.SemiBold,
        color: colors.GREEN,
        marginLeft: wp('2%'),
    },
    logoContainer: {
        alignItems: 'center',
        // marginVertical: hp('2%'),
    },
    raastLogo: {
        width: wp('50%'),
        height: hp('15%'),
    },
    formContainer: {
        marginTop: hp('2%'),
        backgroundColor: colors.LIGHT_GREEN,
    },
    inputGroup: {
        marginBottom: hp('2.5%'),
        width: wp('85%'),
        alignSelf: 'center',
    },
    inputLabel: {
        fontSize: hp('2%'),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        marginBottom: hp('1%'),
    },
    textInput: {
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        borderRadius: hp('1%'),
        padding: hp('1.5%'),
        fontSize: hp('1.8%'),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
    nextButton: {
        backgroundColor: colors.GREEN,
        padding: hp('1.8%'),
        borderRadius: hp('1%'),
        alignItems: 'center',
        marginTop: hp('2%'),
        marginBottom: hp('5%'),
    },
    nextButtonText: {
        color: colors.WHITE,
        fontFamily: fonts.Medium,
        fontSize: hp('1.8%'),
    },
});

export default RaastPayment; 