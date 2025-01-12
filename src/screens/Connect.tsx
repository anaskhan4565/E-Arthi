import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import CustomButton from '../components/CustomButton';
import colors from '../../util/colors';
import ScreensName from '../../util/ScreensName';
import Logo from '../assets/Icon/Logo-only.png';
import { useTranslation } from 'react-i18next';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { fonts } from '../../util/FontName';

function Connect(): React.JSX.Element {
  const { i18n } = useTranslation(); // To access the i18n instance for language change
  const [modalVisible, setModalVisible] = useState(false); // To manage dropdown visibility
  const { t } = useTranslation()
  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language); 
    setModalVisible(false); 
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.WHITE }}>
      <View style={{ padding: 10 }}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            padding: 10,
            backgroundColor: colors.GREEN,
            borderRadius: 5,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: colors.WHITE, fontSize: hp(2), fontFamily: fonts.Medium }}>Select Language</Text>
        </TouchableOpacity>

        {/* Modal for Language Options */}
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
            }}
          >
            <View
              style={{
                // width: 200,
                // height:200,
                backgroundColor: colors.WHITE,
                paddingHorizontal: 40,
                borderRadius: 10,
                flex: 0.2,
                justifyContent: 'space-evenly'
              }}
            >
              <TouchableOpacity onPress={() => handleLanguageChange('en')}>
                <Text style={{ fontSize: hp(2), marginBottom: 10, fontFamily: fonts.Medium }}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleLanguageChange('ur')}>
                <Text style={{ fontSize: hp(2), fontFamily: fonts.SemiBold }}>اردو</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleLanguageChange('sin')}>
                <Text style={{ fontSize: hp(2), fontFamily: fonts.SemiBold }}>سنڌي</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View style={{ flex: 0.75, justifyContent: 'center', marginTop: hp(16), alignItems: 'center' }}>
        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={Logo} resizeMode="contain" style={styles.logo} />
          <Text style={{ fontSize: hp(5), textAlign: 'center', fontWeight: 'bold' }}>{t('E-Arthi')}</Text>
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
            name={ScreensName.SignIn}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: wp(60),
    height: hp(24),
  },
});

export default Connect;
