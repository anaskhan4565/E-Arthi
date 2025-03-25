import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import CustomInput from '../../../../components/CustomInput.jsx';
import CustomButton from '../../../../components/CustomButton.jsx';
import { fonts } from '../../../../../util/Constants/FontName.js';
import colors from '../../../../../util/Constants/colors.js';
import ScreensName from '../../../../../util/Constants/ScreensName.ts';

function ESiloRental() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [entityName, setEntityName] = useState('');
    const [reservingAmount, setReservingAmount] = useState('');

    const handleReserve = () => {
        // Implement reservation logic here
        navigation.navigate(ScreensName.EWarehouseSuccess);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>

            <ScrollView style={styles.container}>
                <View style={styles.searchContainer}>
                    <CustomSearchApp placeholder={t('Search in here')} />
                </View>

                <View style={styles.titleWrapper}>
                    <Text style={styles.titleText}>{t('Silo Rental')}</Text>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.sectionTitle}>{t('Enter the following details:')}</Text>

                    <View style={styles.inputGroup1}>
                        <Text style={styles.inputLabel}>{t('Entity Name:')}</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={t('enter entity name')}
                            value={entityName}
                            onChangeText={setEntityName}
                        />
                    </View>

                    <View style={styles.inputGroup1}>
                        <Text style={styles.inputLabel}>{t('Reserving Amount (in KGs):')}</Text>
                        <View style={styles.dropdownContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder={t('enter amount')}
                                value={reservingAmount}
                                onChangeText={setReservingAmount}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>{t('Upload Grading Certificate:')}</Text>
                        <View style={styles.uploadContainer}>
                            <TouchableOpacity style={styles.uploadButton}>
                                <Text style={styles.uploadButtonText}>{t('Upload')}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <Text style={styles.helperText}>{t('Don\'t have a certificate yet?')}</Text>
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>{t('Request Grading Certificate:')}</Text>
                        <View style={styles.uploadContainer}>
                            <TouchableOpacity style={styles.requestButton}>
                                <Text style={styles.uploadButtonText}>{t('Request')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.reserveButtonContainer}>
                        <TouchableOpacity
                            style={styles.reserveButton}
                            onPress={handleReserve}
                        >
                            <Text style={styles.reserveButtonText}>{t('Reserve')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    navbarContainer: {
        height: hp('8.5%'),
        backgroundColor: colors.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GRAY,
    },
    searchContainer: {
        marginTop: hp('2%'),
        height: hp('7%'),

    },
    titleWrapper: {
        marginHorizontal: hp(2),
        marginTop: hp(1),
        marginBottom: hp(1),
    },
    titleText: {
        fontSize: hp(2.5),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        letterSpacing: hp(0.1),
        textAlign: 'left',
    },
    formContainer: {
        marginHorizontal: hp(2),

    },
    sectionTitle: {
        fontSize: hp(2.2),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        marginBottom: hp(2),
    },
    inputGroup: {
        marginBottom: hp(1.5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputGroup1: {
        marginBottom: hp(2.5),
    },
    inputLabel: {
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.BLACK,

    },
    textInput: {
        height: hp(6),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        borderRadius: hp(1),
        paddingHorizontal: hp(2),
        fontSize: hp(1.8),
        fontFamily: fonts.Regular,
    },
    dropdownContainer: {
        position: 'relative',
    },
    dropdownIcon: {
        position: 'absolute',
        right: hp(2),
        top: hp(2),
    },
    uploadContainer: {
        flexDirection: 'row',
    },
    uploadButton: {
        backgroundColor: colors.PRIMARY,
        paddingVertical: hp(1.2),
        paddingHorizontal: hp(3),
        borderRadius: hp(1),
        width: wp(28),
        height: hp(5),
        marginLeft: wp(4),
    },
    requestButton: {
        backgroundColor: colors.PRIMARY,
        paddingVertical: hp(1.2),
        paddingHorizontal: hp(3),
        borderRadius: hp(1),
        width: wp(28),
        height: hp(5),
        marginLeft: wp(4),
    },
    uploadButtonText: {
        color: colors.WHITE,
        fontFamily: fonts.Medium,
        fontSize: hp(1.8),
    },
    helperText: {
        marginTop: hp(1),
        marginBottom: hp(2),
        fontSize: hp(1.6),
        fontFamily: fonts.Regular,
        color: colors.DARK_GRAY,
    },
    reserveButtonContainer: {
        marginTop: hp(4),
        marginBottom: hp(4),
    },
    reserveButton: {
        backgroundColor: colors.PRIMARY,
        paddingVertical: hp(1.8),
        borderRadius: hp(1),
        alignItems: 'center',
    },
    reserveButtonText: {
        color: colors.WHITE,
        fontFamily: fonts.SemiBold,
        fontSize: hp(2),
    },
});

export default ESiloRental; 