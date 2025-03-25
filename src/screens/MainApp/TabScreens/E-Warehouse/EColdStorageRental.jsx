import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import { fonts } from '../../../../../util/Constants/FontName.js';
import colors from '../../../../../util/Constants/colors.js';
import ScreensName from '../../../../../util/Constants/ScreensName.ts';

// Import Cold Storage SVG
import ColdStorageSVG from '../../../../assets/MainApp/E-Warehouse/ColdStorage.svg';

function EColdStorageRental() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [entityName, setEntityName] = useState('');
    const [reservingAmount, setReservingAmount] = useState('');
    const [grading, setGrading] = useState('');
    const [expirationDate, setExpirationDate] = useState('');

    const handleReserve = () => {
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
                    <Text style={styles.titleText}>{t('Cold Storage Rental')}</Text>
                </View>

                <View style={styles.infoBox}>
                    <View style={styles.iconContainer}>
                        <ColdStorageSVG width={hp(5)} height={hp(5)} />
                    </View>
                    <View style={styles.locationInfo}>
                        <Text style={styles.locationLabel}>{t('Located:')}</Text>
                        <Text style={styles.locationValue}>{t('120 Km away')}</Text>
                    </View>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.sectionTitle}>{t('Enter the following details:')}</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>{t('Entity Name:')}</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={t('enter entity name')}
                            value={entityName}
                            onChangeText={setEntityName}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>{t('Reserving Amount (in KGs):')}</Text>
                        <View style={styles.dropdownContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder={t('enter amount')}
                                value={reservingAmount}
                                onChangeText={setReservingAmount}
                                keyboardType="numeric"
                            />
                            <Text style={styles.dropdownIcon}>▼</Text>
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>{t('Grading:')}</Text>
                        <View style={styles.dropdownContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder={t('enter grading needed')}
                                value={grading}
                                onChangeText={setGrading}
                            />
                            <Text style={styles.dropdownIcon}>▼</Text>
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>{t('Expiration Date')}</Text>
                        <View style={styles.dropdownContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder={t('enter expiration date')}
                                value={expirationDate}
                                onChangeText={setExpirationDate}
                            />
                            <Text style={styles.dropdownIcon}>▼</Text>
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
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: hp(2),
        marginVertical: hp(2),
        padding: hp(2),
        backgroundColor: colors.LIGHT_GRAY_BG,
        borderRadius: hp(1),
    },
    iconContainer: {
        marginRight: hp(2),
    },
    locationInfo: {
        flex: 1,
    },
    locationLabel: {
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
    },
    locationValue: {
        fontSize: hp(2.2),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
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
        marginBottom: hp(2.5),
    },
    inputLabel: {
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        marginBottom: hp(0.8),
    },
    textInput: {
        height: hp(6),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        borderRadius: hp(1),
        paddingHorizontal: hp(2),
        fontSize: hp(1.8),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
    dropdownContainer: {
        position: 'relative',
    },
    dropdownIcon: {
        position: 'absolute',
        right: hp(2),
        top: hp(2),
        color: colors.DARK_GRAY,
        fontSize: hp(1.5),
    },
    reserveButtonContainer: {
        marginTop: hp(2),
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

export default EColdStorageRental; 