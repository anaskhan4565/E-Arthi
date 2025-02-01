import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import CustomButton from '../../components/CustomButton';
import colors from '../../../util/colors';
import ScreensName from '../../../util/ScreensName';
import Logo from '../../assets/Icon/Logo-only.png';
import { useTranslation } from 'react-i18next';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { fonts } from '../../../util/FontName';
import { useNavigation } from '@react-navigation/native';

function Connect(): React.JSX.Element {
  const { i18n } = useTranslation(); // To access the i18n instance for language change
  const [modalVisible, setModalVisible] = useState(false); // To manage dropdown visibility
  const { t } = useTranslation()
  const navigation = useNavigation();
  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language); 
    setModalVisible(false); 
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.WHITE }}>
      <View style={{ padding: 10, alignItems:'center', justifyContent:'center' }}>
        <CustomButton
          MainText={t('Select Language')}
          BgGiven={colors.GREEN}
          txColor={colors.WHITE}
          isNavigation={true}
          name={ScreensName.LanguageSelect}
        />
      </View>

      <View style={{ flex: 0.75, justifyContent: 'center', marginTop: hp(16), alignItems: 'center' }}>
        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={Logo} resizeMode="contain" style={styles.logo} />
          <Text style={{ fontSize: hp(5), textAlign: 'center',letterSpacing:hp(0.9),paddingRight:hp(2),fontFamily:fonts.bold }}>{t('E-AGRI')}</Text>
        </View>
        <View style={{ flex: 0.5, justifyContent: 'center' }}>
          <Text style={{ fontSize: hp(2), textAlign: 'center', fontFamily: fonts.Regular }}>{t('Connect_With_us')}</Text>
        </View>
      </View>

      <View style={{ flex: 0.5 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 }}>
          <CustomButton
            MainText={t('Register_Now')}
            BgGiven={colors.GREEN}
            txColor={colors.WHITE}
            isNavigation={true}
            name={ScreensName.MorePage}
          />
          <CustomButton
            MainText={t('Login')}
            BgGiven={colors.WHITE}
            txColor={colors.GREEN}
            isNavigation={true}
            name={ScreensName.EMunshiWarehouseInfo}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: wp(48),
    height: hp(19),
  },
});

export default Connect;
