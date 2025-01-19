import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { CommonActions, NavigationProp } from '@react-navigation/native';
import ScreensName from '../../util/ScreensName';
import colors from '../../util/colors';
import ArthiLogo from '../assets/Icon/Logo.png';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type RootStackParamList = {
  SplashScreen: undefined;
  Home: undefined;
};
type SplashScreenProps = {
  navigation: NavigationProp<RootStackParamList>;
};
const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: ScreensName.NoInternet }],
        }),
      );
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return ( 
    <View style={styles.container}>
      <Image source={ArthiLogo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: wp('50%'),
    height: hp('40%'),
    resizeMode: 'contain',
  },
});

export default SplashScreen;
