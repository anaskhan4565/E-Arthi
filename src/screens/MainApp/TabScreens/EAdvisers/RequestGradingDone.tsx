import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';
import Navbar from '../../Navbar/Navbar';
import { useNavigation } from '@react-navigation/native';
import { Animated } from 'react-native';
import ScreensName from '../../../../../util/Constants/ScreensName';

const RequestGradingDone = () => {
  const navigation = useNavigation<any>();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  
  useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
  }, []);
  
  const handleGoHome = () => {
    // Navigate to the main tab navigation
    navigation.reset({
      index: 0,
      routes: [{ name: ScreensName.MainTabNavigation }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar gobackOnly={true} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Request Grading</Text>

        <Animated.View 
          style={[
            styles.successContainer,
            { 
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <View style={styles.checkmarkContainer}>
            <Image 
              source={require('./Images/Services/Check.png')}
              style={styles.checkmarkIcon}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.successTitle}>
            Your Grading Request has{'\n'}been successfully{'\n'}scheduled!
          </Text>
          <Text style={styles.successSubtitle}>
            We will notify you{'\n'}when the grading is{'\n'}completed.
          </Text>
          
          <TouchableOpacity 
            style={styles.homeButton}
            onPress={handleGoHome}
            activeOpacity={0.8}
          >
            <Text style={styles.homeButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  navbarContainer: {
    height: hp('8.5%'),
    backgroundColor: colors.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: colors.LIGHT_GRAY,
  },
  content: {
    flex: 1,
    padding: wp('4%'),
  },
  title: {
    fontSize: wp('6%'),
    fontFamily: fonts.SemiBold,
    color: colors.BLACK,
    marginVertical: hp('2%'),
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: hp('10%'), // Reduced padding to make room for button
  },
  checkmarkContainer: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: wp('12.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('4%'),
  },
  checkmarkIcon: {
    width: wp('45%'),
    height: wp('45%'),
    marginBottom: hp('2%'),
  },
  successTitle: {
    fontSize: wp('6%'),
    fontFamily: fonts.SemiBold,
    color: colors.BLACK,
    textAlign: 'center',
    lineHeight: wp('8%'),
  },
  successSubtitle: {
    fontSize: wp('4.5%'),
    fontFamily: fonts.Regular,
    color: colors.GRAY,
    textAlign: 'center',
    marginTop: hp('2%'),
  },
  homeButton: {
    backgroundColor: colors.GREEN,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('10%'),
    borderRadius: hp('3%'),
    marginTop: hp('6%'),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  homeButtonText: {
    color: colors.WHITE,
    fontFamily: fonts.SemiBold,
    fontSize: wp('4.5%'),
    textAlign: 'center',
  },
});

export default RequestGradingDone;