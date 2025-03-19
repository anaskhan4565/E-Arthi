import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { CommonActions, NavigationProp } from '@react-navigation/native';
import ScreensName from '../../../util/Constants/ScreensName';
import colors from '../../../util/Constants/colors';
import ArthiLogo from '../../assets/Icon/E-Agri.png';
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
          routes: [{ name: ScreensName.MainTabNavigation }],
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
    width: hp('55%'),
    height: hp('89%'),
    resizeMode: 'contain',
  },
});

export default SplashScreen;
