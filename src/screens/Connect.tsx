import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import colors from '../../util/colors';
import ScreensName from '../../util/ScreensName';
import Logo from '../assets/logo_text.png'
function Connect(): React.JSX.Element {


  return (
      <View style={{ flex: 1 ,backgroundColor:colors.WHITE}}>
        <View style={{ flex: 0.5,justifyContent:'center', marginTop: 181,alignItems:'center' }}>
          <Image
            source={Logo} // Replace with your logo path
            resizeMode="contain"
            style={styles.logo}
          />
        </View>
        <View style={{flex: 0.5 }}>
          <View style={{ flex:1,justifyContent:'center',alignItems:"center",gap:10 }}>
              <CustomButton
                MainText="Register Now"
                BgGiven={colors.GREEN} // Background color for the button
                txColor={colors.WHITE} // Text color for the button
                isNavigation={true} // Indicates navigation
                name={ScreensName.MorePage}
              />
              <CustomButton
                MainText="Login"
                BgGiven={colors.WHITE} // Background color for the button
                txColor={colors.GREEN} // Text color for the button
                isNavigation={true} // Indicates navigation
                name={ScreensName.SignIn}// Navigation route name
              />
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BLACK,
    paddingHorizontal: 20,
  },
  logo: {
    width: 300,
    height: 300,
  },
  imageWrapper: {
    width: 330,
    height: 240.76,
    marginTop: 181,
    marginLeft: 30,
    gap: 32,
  },
  buttonWrapper: {
    width: 330,
    height: 108,
    marginTop: 662,
    marginLeft: 28,
    gap: 12,
  },
});

export default Connect;