import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../../../../components/CustomInput'
import colors from '../../../../../../util/Constants/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../../../../../../util/Constants/FontName';
import CustomButton from '../../../../../components/CustomButton';
import { useTranslation } from 'react-i18next';
import UplodPic from '../AssetsLoan/Upload.png';
import CameraPic from '../AssetsLoan/Camera.png'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const CustomUploadButton = ({ isCamera = false, NoPic = false, PlaceHolderGiven = "demo", InputHolder = "Upload", tx_color = colors.WHITE }) => {
    const { t } = useTranslation();
    const [fileName, setFileName] = useState('');

    const handleButtonPress = () => {
        console.log('CustomUploadButton Pressed');
        const options = {
            mediaType: 'photo',
            ...(isCamera && { cameraType: 'back' }),
        };
        const launchFunction = isCamera ? launchCamera : launchImageLibrary;
        launchFunction(options, (response) => {
            console.log('Image Picker Callback Triggered');
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.assets && response.assets.length > 0) {
                console.log('Selected image: ', response.assets[0]);
                setFileName(response.assets[0].fileName);
            } else {
                console.log('No image selected or an unexpected response format');
            }
        });
    };

    const handleRemoveImage = () => {
        setFileName(''); // Reset the filename
    };

    return (
        <View style={{ flex: 1, alignItems: 'flex-start', gap: hp(0.5) }}>
            <View style={{ flex: 1, flexDirection: 'row', gap: hp(1) }}>
                <Text style={{ fontSize: hp(2), fontFamily: fonts.Regular }}>{t(PlaceHolderGiven)}</Text>
                <Image source={isCamera ? CameraPic : !NoPic ? UplodPic : null} style={{ width: hp(3.5), height: hp(3.1), resizeMode: 'contain' }} />
            </View>
            <TouchableOpacity onPress={handleButtonPress} style={[
                { backgroundColor: colors.GREEN, padding: 10 },
                styles.Wrapper
            ]}>
                <Text style={{ color: 'white', fontSize: hp('2.2%'), fontFamily: fonts.Regular }}>Upload</Text>
            </TouchableOpacity>
            {fileName ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp(1) }}>
                    <Text style={{ fontSize: hp(1.5), fontFamily: fonts.Regular }}>{PlaceHolderGiven + " Uploaded!"}</Text>
                    <TouchableOpacity onPress={handleRemoveImage}>
                        <Text style={{ color: colors.GREEN, marginLeft: 10, fontSize: hp(1.5), fontFamily: fonts.Regular }}>Remove</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    );
};

export default CustomUploadButton

const styles = StyleSheet.create({
    Wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: colors.GREEN,
        width: wp(85),
        height: hp(5.7),
    }
})