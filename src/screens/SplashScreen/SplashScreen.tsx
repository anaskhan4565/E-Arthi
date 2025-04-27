import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Animated, Easing } from 'react-native';
import { CommonActions, NavigationProp } from '@react-navigation/native';
import ScreensName from '../../../util/Constants/ScreensName';
import colors from '../../../util/Constants/colors';
import ArthiLogo from '../../assets/Icon/E-Agri.png';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Icon1 from './Icons/Icon1.png'
import Icon2 from './Icons/Icon2.png'
import Icon3 from './Icons/Icon3.png'
import { fonts } from '../../../util/Constants/FontName';
type RootStackParamList = {
  SplashScreen: undefined;
  Home: undefined;
};
type SplashScreenProps = {
  navigation: NavigationProp<RootStackParamList>;
};
const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  // Animation values
  const scaleAnim = useRef(new Animated.Value(0.2)).current;
  const opacityIcon1 = useRef(new Animated.Value(1)).current;
  const opacityIcon2 = useRef(new Animated.Value(0)).current;
  const opacityIcon3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation sequence
    const scaleUp = Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp)
    });

    const fadeOutIcon1 = Animated.timing(opacityIcon1, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
      delay: 300
    });

    const fadeInIcon2 = Animated.timing(opacityIcon2, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      delay: 300
    });

    const fadeOutIcon2 = Animated.timing(opacityIcon2, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
      delay: 300
    });

    const fadeInIcon3 = Animated.timing(opacityIcon3, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      delay: 400
    });

    // Start animation sequence
    Animated.sequence([
      scaleUp,
      Animated.parallel([fadeOutIcon1, fadeInIcon2]),
      Animated.parallel([fadeOutIcon2, fadeInIcon3])
    ]).start();

    // Navigate after the animation completes
    const timer = setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: ScreensName.MainTabNavigation}],
        }),
      );
    }, 3000);   

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Animated.Image
          source={Icon1}
          style={[
            styles.logo,
            {
              opacity: opacityIcon1,
              transform: [{ scale: scaleAnim }],
              position: 'absolute'
            }
          ]}
        />
        <Animated.Image
          source={Icon2}
          style={[
            styles.logo,
            {
              opacity: opacityIcon2,
              position: 'absolute'
            }
          ]}
        />
        <Animated.Image
          source={Icon3}
          style={[
            styles.logo,
            {
              opacity: opacityIcon3,
              position: 'absolute'
            }
          ]}
        />
      </View>
      <Animated.Text style={styles.text}>E-Agri</Animated.Text>
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
  imageContainer: {
    width: hp('33%'),
    height: hp('30%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.BLACK,
    fontSize: hp('6%'),
    fontFamily: fonts.SemiBold,
    marginTop: hp('2%'),
    textAlign: 'center',
    marginRight: wp('3%')
  },
  logo: {
    width: hp('35%'),
    height: hp('50%'),
    resizeMode: 'contain',
  },
});

export default SplashScreen;
