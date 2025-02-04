import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { SafeAreaView, StyleSheet, View, Image, Text } from 'react-native';
import CustomButton from '../../components/CustomButton';
import colors from '../../../util/colors';
import ScreensName from '../../../util/ScreensName';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import InternetErr from '../../assets/NoInternet/Internet_sn.png';
import { useTranslation } from "react-i18next";
import { fonts } from '../../../util/FontName';

const NoInternet = () => {
    const [isConnected, setIsConnected] = useState(null);
    const navigation = useNavigation();
    const { t } = useTranslation();
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
            if (state.isConnected) {
                navigation.navigate(ScreensName.Connect);
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {isConnected === null ? (
                <Text>{t('Checking connection...')}</Text>
            ) : isConnected ? null : (
                <View style={{ alignItems: 'center', gap: 10 }}>
                    <Image source={InternetErr} style={styles.errorMsg} />
                    <Text style={{ fontSize: wp('7%'), fontFamily: fonts.SemiBold }}>{t('No Internet Connection')}</Text>
                    <Text style={{ width: wp('80%'), textAlign: 'center', color: colors.BLACK }}>{t('Your internet connection is currently not available please check or try again.')}</Text>
                    <View style={{ marginTop: hp('3%') }}>
                        <CustomButton
                            MainText={t('Try Again')}
                            BgGiven={colors.GREEN}
                            name={ScreensName.SplashScreen}
                            txColor={colors.WHITE}
                            isNavigation={true}
                        />
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
}
export default NoInternet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorMsg: {
        width: wp('40%'),
        height: hp('17%')
    }
});
