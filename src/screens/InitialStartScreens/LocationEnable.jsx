import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Image,
    Text,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import colors from '../../../util/colors';
import ScreensName from '../../../util/ScreensName';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Location from '../../assets/LocationOpen/Location.png';
import { useTranslation } from "react-i18next";
import { fonts } from '../../../util/FontName';

const LocationSys = () => {
    const [isLocationEnabled, setIsLocationEnabled] = useState(true);
    const navigation = useNavigation();
    const {t} = useTranslation();

    useEffect(() => {
        if (isLocationEnabled) {
            navigation.navigate(ScreensName.LanguageSelect);
        }
    }, [isLocationEnabled, navigation]);

    const handleEnableLocation = () => {
        setIsLocationEnabled(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            {!isLocationEnabled ? (
                <View style={{ alignItems: 'center', gap: 10 }}>
                    <Image source={Location} style={styles.errorMsg} />
                    <Text style={{ fontSize: wp('7%'), fontFamily:fonts.SemiBold, }}>{t('Location')}</Text>
                    <Text style={{ width: wp('80%'), textAlign: 'center', color: colors.BLACK,fontFamily:fonts.Light, }}>
                        {t('Allow maps to access your location while you use the app?')}
                    </Text>
                    <View style={{ marginTop: hp('3%'), gap: 8 }}>
                        <CustomButton
                            MainText={t('Allow')}
                            BgGiven={colors.GREEN}
                            onPress={handleEnableLocation}
                            txColor={colors.WHITE}
                        />
                        <CustomButton
                            MainText={t('Skip for now')}
                            BgGiven={colors.WHITE}
                            name={ScreensName.Connect}
                            txColor={colors.GREEN}
                            isNavigation={true}
                        />
                    </View>
                </View>
            ) : null}
        </SafeAreaView>
    );
};

export default LocationSys;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
    },
    errorMsg: {
        width: wp('40%'),
        height: hp('17%'),
    },
});
