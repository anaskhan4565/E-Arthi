import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';

import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import { fonts } from '../../../../../util/Constants/FontName.js';
import colors from '../../../../../util/Constants/colors.js';
import ScreensName from '../../../../../util/Constants/ScreensName.ts';

// Import Cold Storage SVG
import ColdStorageSVG from '../../../../assets/MainApp/E-Warehouse/ColdStorage.svg';
import SiloSVG from '../../../../assets/MainApp/E-Warehouse/Silo.svg';

// Image imports
import ColdStorageImg from '../../../../assets/MainApp/E-Warehouse/ColdStorage.png';
import SiloImg from '../../../../assets/MainApp/E-Warehouse/Silo.png';
import DryBedsImg from '../../../../assets/MainApp/E-Warehouse/DryBeds.png';
import TemperatureControlledImg from '../../../../assets/MainApp/E-Warehouse/TemperatureInside.png';

function EColdStorageRental() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const route = useRoute();
    
    // Log the route params for debugging
    console.log('Route params received:', route.params);
    
    // Extract params, use default values if not provided
    const storageType = route.params?.storageType || 'Cold Storage';
    const location = route.params?.location || '120 Km away';
    const description = route.params?.description || 'Temperature controlled storage';
    const imageSource = route.params?.imageSource;
    
    console.log('Using values:', { storageType, location, description, imageSource });
    
    const [entityName, setEntityName] = useState('');
    const [reservingAmount, setReservingAmount] = useState('');
    const [grading, setGrading] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    
    // Validate form whenever inputs change
    useEffect(() => {
        const valid = 
            entityName.trim() !== '' && 
            reservingAmount.trim() !== '' && 
            grading.trim() !== '' && 
            expirationDate.trim() !== '';
        
        setIsFormValid(valid);
    }, [entityName, reservingAmount, grading, expirationDate]);

    const handleReserve = () => {
        if (!isFormValid) {
            Alert.alert('Missing Information', 'Please fill in all fields before reserving.');
            return;
        }
        
        navigation.navigate(ScreensName.EWarehouseSuccess, {
            storageType,
            entityName,
            reservingAmount,
            location
        });
    };
    
    // Choose the appropriate icon based on the storage type
    const renderStorageIcon = () => {
        console.log('Rendering icon for type:', storageType);
        
        // Match storage type to the correct image
        switch(storageType) {
            case 'Silo':
                return <Image source={SiloImg} style={{ width: wp(16), height: hp(10), resizeMode: 'contain' }} />;
            case 'Cold Storage':
                return <Image source={ColdStorageImg} style={{ width: wp(16), height: hp(10), resizeMode: 'contain' }} />;
            case 'Dry Beds':
                return <Image source={DryBedsImg} style={{ width: wp(16), height: hp(10), resizeMode: 'contain' }} />;
            case 'Temperature Controlled':
                return <Image source={TemperatureControlledImg} style={{ width: wp(16), height: hp(10), resizeMode: 'contain' }} />;
            default:
                return <ColdStorageSVG width={wp(20)} height={hp(10)} />;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>

            <ScrollView style={styles.container}>
                <View style={styles.searchContainer}>
                    <CustomSearchApp 
                        placeholder={t('Search in here')}
                        value=""
                        onChangeText={() => {}}
                    />
                </View>

                <View style={styles.titleWrapper}>
                    <Text style={styles.titleText}>
                        {storageType ? t(storageType) : t('Storage')} {t('Rental')}
                    </Text>
                </View>

                <View style={styles.infoBox}>
                    {renderStorageIcon()}
                    <View style={styles.locationInfo}>
                        <Text style={styles.locationLabel}>Located</Text>
                        <Text style={styles.locationValue}>{location}</Text>
                    </View>
                </View>
                
                {description && (
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionText}>{t(description)}</Text>
                    </View>
                )}

                <View style={styles.formContainer}>
                    <Text style={styles.sectionTitle}>{t('Enter the following details:')}</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>{t('Entity Name:')}</Text>
                        <TextInput
                            style={[styles.textInput, !entityName.trim() && styles.inputInvalid]}
                            placeholder={t('enter entity name')}
                            value={entityName}
                            onChangeText={setEntityName}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>{t('Reserving Amount (in KGs):')}</Text>
                        <View style={styles.dropdownContainer}>
                            <TextInput
                                style={[styles.textInput, !reservingAmount.trim() && styles.inputInvalid]}
                                placeholder={t('enter amount')}
                                value={reservingAmount}
                                onChangeText={setReservingAmount}
                                keyboardType="numeric"
                            />
                            
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>{t('Grading')}</Text>
                        <View style={styles.dropdownContainer}>
                            <TextInput
                                style={[styles.textInput, !grading.trim() && styles.inputInvalid]}
                                placeholder={t('enter grading needed')}
                                value={grading}
                                onChangeText={setGrading}
                            />
                            
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>{t('Expiration Date')}</Text>
                        <View style={styles.dropdownContainer}>
                            <TextInput
                                style={[styles.textInput, !expirationDate.trim() && styles.inputInvalid]}
                                placeholder={t('enter expiration date')}
                                value={expirationDate}
                                onChangeText={setExpirationDate}
                            />
                            
                        </View>
                    </View>

                    <View style={styles.reserveButtonContainer}>
                        <TouchableOpacity
                            style={[
                                styles.reserveButton,
                                !isFormValid && styles.reserveButtonDisabled
                            ]}
                            onPress={handleReserve}
                            disabled={!isFormValid}
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
        justifyContent: 'space-between',
        marginHorizontal: hp(2),
        marginVertical: hp(2),
        padding: hp(2),
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: hp(1),
        elevation: 5,
    },
    iconContainer: {
        marginRight: hp(2),
    },
    locationInfo: {
        justifyContent: 'center',
        marginRight: wp(10),
    },
    locationLabel: {
        fontSize: hp(2.2),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        textAlign: 'center',
    },
    locationValue: {
        fontSize: hp(2.5),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginTop: hp(2),
    },
    formContainer: {
        marginHorizontal: hp(2),
    },
    sectionTitle: {
        fontSize: hp(2),
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
    inputInvalid: {
        borderColor: colors.RED || '#ff6b6b',
        backgroundColor: colors.VERY_LIGHT_RED || '#ffeded',
    },
    reserveButtonDisabled: {
        backgroundColor: colors.DARK_GRAY,
        opacity: 0.6,
    },
    descriptionContainer: {
        marginHorizontal: hp(2),
        marginVertical: hp(1),
        padding: hp(1.5),
        backgroundColor: colors.LIGHT_BLUE || colors.LIGHT_GREEN,
        borderRadius: hp(1),
    },
    descriptionText: {
        fontSize: hp(1.8),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
        textAlign: 'center',
    },
});

export default EColdStorageRental; 