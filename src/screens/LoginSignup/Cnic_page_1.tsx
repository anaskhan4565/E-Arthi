import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Dimensions, Image, Alert, TouchableOpacity } from 'react-native';
import colors from '../../../util/Constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomButton from '../../components/CustomButton';
import ScreensName from '../../../util/Constants/ScreensName';
import { fonts } from '../../../util/Constants/FontName';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';

const { height, width } = Dimensions.get("window");

const Cnic_page_1 = () => {
    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { t } = useTranslation();

    const handlePickImage = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                quality: 0.5,
                selectionLimit: 1,
                includeBase64: false,
            });

            if (result.assets && result.assets[0]) {
                const uri = result.assets[0].uri;
                setSelectedImage(uri || null);
                console.log('Selected Image URI: ', uri);
            }
        } catch (error) {
            console.error('Error picking image: ', error);
            Alert.alert('Error', 'Failed to pick image from gallery');
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
    };

    return (
        <View style={styles.container}>
            <View style={styles.Header}>
                <Text style={styles.Heading}>{t('CNIC Verification')}</Text>
                <Text style={styles.SubHeading}>{t('Please enter your CNIC details')}</Text>
            </View>

            <View style={styles.buttonContainer}>

                {selectedImage ? (
                    <View style={styles.imageWrapper}>
                        <Image source={{ uri: selectedImage }} style={styles.image} />
                        <TouchableOpacity style={styles.closeButton} onPress={handleRemoveImage}>
                            <Image source={require('../../../src/assets/Icon/remove.png')} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Image
                            source={require('../../assets/Cnic.png')}
                            style={styles.image}
                        />
                        <Text style={styles.placeholderText}>{t('Tap the button below to upload your CNIC')}</Text>
                    </View>
                )}
                
                {selectedImage ? (
                    <TouchableOpacity
                        style={[
                            styles.Wrapper,
                            {
                                width: wp("85%"),
                                height: hp("5.7%"),
                                backgroundColor: colors.GREEN,
                                borderColor: colors.GREEN,
                                borderWidth: 1,
                                borderRadius: 8,
                            },
                        ]}
                        onPress={() => { navigation.navigate(ScreensName.Cnic_page_2) }}
                    >
                        <Text style={{ color: colors.GREAT_WHITE, fontSize: hp('2%') }}>{t('Continue')}</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={[
                            styles.Wrapper,
                            {
                                width: wp("85%"),
                                height: hp("5.7%"),
                                backgroundColor: colors.GREEN,
                                borderColor: colors.GREEN,
                                borderWidth: 1,
                                borderRadius: 8,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 10,
                            },
                        ]}
                        onPress={handlePickImage}
                    >
                        <Text style={{ color: colors.GREAT_WHITE, fontSize: hp('2%') }}>{t('Upload from Gallery')}</Text>
                    </TouchableOpacity>
                )}

                <View style={styles.buttonSpacing} />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
        paddingHorizontal: width / 20,
    },
    Header: {
        marginTop: height / 10,
        marginBottom: height / 20,
        justifyContent: 'flex-start',
    },
    Heading: {
        fontSize: height / 25,
        fontFamily: fonts.SemiBold,
        marginLeft: wp('1.5%'),
        color: colors.BLACK,
    },
    SubHeading: {
        fontSize: height / 45,
        fontFamily: fonts.Regular,
        marginTop: height / 100,
        marginLeft: wp('1.5%'),
    },
    imageWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: wp(70),
        height: hp(20),
        marginBottom: hp(2),
        position: 'relative',
    },
    image: {
        width: wp(70),
        height: hp(23),
        borderRadius: 8,
        marginBottom: hp(6),
        resizeMode: 'contain',
    },
    imagePlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(2),
    },
    placeholderText: {
        fontSize: hp('1.8%'),
        color: colors.GRAY,
        fontFamily: fonts.Regular,
        textAlign: 'center',
        marginTop: -hp(4),
        marginBottom: hp(4),
    },
    icon: {
        width: wp(5),
        height: hp(5),
        resizeMode: 'contain',
    },
    closeButton: {
        position: 'absolute',
        top: -hp(5),
        right: -hp(-2),
        justifyContent: 'center',
        alignItems: 'center',
        width: wp(5),
        height: wp(5),
    },
    Wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: colors.GREEN,
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: hp('10%'),
    },
    buttonSpacing: {
        height: hp('2%'),
    },
});


export default Cnic_page_1;