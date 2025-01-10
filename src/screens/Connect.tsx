import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import CustomButton from '../components/CustomButton';
import colors from '../../util/colors';
import ScreensName from '../../util/ScreensName';
import Logo from '../assets/Icon/Logo.png';
import { useTranslation } from 'react-i18next';

function Connect(): React.JSX.Element {
  const { i18n } = useTranslation(); // To access the i18n instance for language change
  const [modalVisible, setModalVisible] = useState(false); // To manage dropdown visibility
  const {t}=useTranslation()
  // Function to change the language based on selection
  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language); // Changes the language
    setModalVisible(false); // Close the modal after selection
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.WHITE }}>
      <View style={{ padding: 10 }}>
        {/* Language Dropdown Button */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            padding: 10,
            backgroundColor: colors.GREEN,
            borderRadius: 5,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: colors.WHITE, fontSize: 16 }}>Select Language</Text>
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
                flex:0.2,
                justifyContent:'space-evenly'
              }}
            >
              <TouchableOpacity onPress={() => handleLanguageChange('en')}>
                <Text style={{ fontSize: 18, marginBottom: 10 }}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleLanguageChange('ur')}>
                <Text style={{ fontSize: 18 }}>اردو</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleLanguageChange('sin')}>
                <Text style={{ fontSize: 18 }}>سنڌي</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View style={{ flex: 0.5,gap:9, justifyContent: 'center', marginTop: 181, alignItems: 'center' }}>
        <Image source={Logo} resizeMode="contain" style={styles.logo} />
        <Text style={{fontSize:20,textAlign:'center'}}>{t('Connect_With_us')}</Text>
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
    width: 200,
    height: 200,
  },
});

export default Connect;
