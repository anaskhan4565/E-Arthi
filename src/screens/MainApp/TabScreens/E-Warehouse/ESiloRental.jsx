import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Modal,
    FlatList,
    Image,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { MMKV } from 'react-native-mmkv';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

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
    const storage = new MMKV();
    const [entityName, setEntityName] = useState('');
    const [reservingAmount, setReservingAmount] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [certificateFileName, setCertificateFileName] = useState('');
    const [requestCertificateFileName, setRequestCertificateFileName] = useState('');
    
    const riceOptions = [
        { id: '1', name: 'Basmati Rice' },
        { id: '2', name: 'Brown Rice' }
    ];

    const handleReserve = () => {
        // Save the data to storage
        storage.set('selectedRiceType', entityName);
        storage.set('reservedAmount', reservingAmount);
        
        // Navigate to the next screen
        navigation.navigate(ScreensName.ESiloRental2);
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const selectItem = (item) => {
        setEntityName(item.name);
        setDropdownVisible(false);
    };

    const handleUploadCertificate = () => {
        const options = {
            mediaType: 'photo',
        };
        
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.assets && response.assets.length > 0) {
                console.log('Selected image: ', response.assets[0]);
                setCertificateFileName(response.assets[0].fileName);
            } else {
                console.log('No image selected or an unexpected response format');
            }
        });
    };

    const handleRemoveCertificate = () => {
        setCertificateFileName('');
    };

    const handleRequestCertificate = () => {
        const options = {
            mediaType: 'photo',
            cameraType: 'back',
        };
        
        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.error) {
                console.log('Camera Error: ', response.error);
            } else if (response.assets && response.assets.length > 0) {
                console.log('Captured image: ', response.assets[0]);
                setRequestCertificateFileName(response.assets[0].fileName);
            } else {
                console.log('No image captured or an unexpected response format');
            }
        });
    };

    const handleRemoveRequestCertificate = () => {
        setRequestCertificateFileName('');
    };

    const renderDropdownItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.dropdownItem} 
            onPress={() => selectItem(item)}
        >
            <Text style={styles.dropdownItemText}>{item.name}</Text>
        </TouchableOpacity>
    );

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
                    <Text style={styles.titleText}>{t('Silo Rental')}</Text>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.sectionTitle}>{t('Enter the following details:')}</Text>

                    <View style={styles.inputGroup1}>
                        <Text style={styles.inputLabel}>{t('Entity Name:')}</Text>
                        <TouchableOpacity 
                            style={styles.dropdownSelector}
                            onPress={toggleDropdown}
                        >
                            <Text style={entityName ? styles.dropdownText : styles.dropdownPlaceholder}>
                                {entityName || t('select rice type')}
                            </Text>
                        </TouchableOpacity>
                        
                        <Modal
                            visible={dropdownVisible}
                            transparent={true}
                            animationType="fade"
                        >
                            <TouchableOpacity 
                                style={styles.modalOverlay}
                                onPress={toggleDropdown}
                            >
                                <View style={styles.dropdownList}>
                                    <FlatList
                                        data={riceOptions}
                                        renderItem={renderDropdownItem}
                                        keyExtractor={item => item.id}
                                    />
                                </View>
                            </TouchableOpacity>
                        </Modal>
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
                            <TouchableOpacity 
                                style={styles.uploadButton}
                                onPress={handleUploadCertificate}
                            >
                                <Text style={styles.uploadButtonText}>{t('Upload')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    {certificateFileName ? (
                        <View style={styles.certificateInfoContainer}>
                            <Text style={styles.certificateInfoText}>
                                {t('Certificate')} {t('Uploaded!')}
                            </Text>
                            <TouchableOpacity onPress={handleRemoveCertificate}>
                                <Text style={styles.removeText}>{t('Remove')}</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Text style={styles.helperText}>{t('Don\'t have a certificate yet?')}</Text>
                    )}

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>{t('Request Grading Certificate:')}</Text>
                        <View style={styles.uploadContainer}>
                            <TouchableOpacity 
                                style={styles.requestButton}
                                onPress={()=>navigation.navigate(ScreensName.Grading)}
                            >
                                <Text style={styles.uploadButtonText}>{t('Request')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    {requestCertificateFileName ? (
                        <View style={styles.certificateInfoContainer}>
                            <Text style={styles.certificateInfoText}>
                                {t('Certificate Request')} {t('Submitted!')}
                            </Text>
                            <TouchableOpacity onPress={handleRemoveRequestCertificate}>
                                <Text style={styles.removeText}>{t('Remove')}</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null}

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
        marginBottom: hp(1),
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
    dropdownSelector: {
        height: hp(6),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        borderRadius: hp(1),
        paddingHorizontal: hp(2),
        justifyContent: 'center',
    },
    dropdownText: {
        fontSize: hp(1.8),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
    dropdownPlaceholder: {
        fontSize: hp(1.8),
        fontFamily: fonts.Regular,
        color: colors.DARK_GRAY,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dropdownList: {
        backgroundColor: colors.WHITE,
        marginHorizontal: wp(5),
        borderRadius: hp(1),
        paddingVertical: hp(1),
        elevation: 5,
    },
    dropdownItem: {
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(4),
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GRAY,
    },
    dropdownItemText: {
        fontSize: hp(1.8),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
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
    certificateInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(1.5),
        marginHorizontal: wp(4),
    },
    certificateInfoText: {
        fontSize: hp(1.6),
        fontFamily: fonts.Regular,
        flex: 1,
    },
    removeText: {
        fontSize: hp(1.6),
        fontFamily: fonts.Medium,
        color: colors.PRIMARY,
        marginLeft: wp(2),
    },
});

export default ESiloRental; 