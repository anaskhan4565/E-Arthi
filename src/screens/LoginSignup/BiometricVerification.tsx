import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Dimensions,
  useColorScheme,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import colors from "../../../util/Constants/colors.js";
import CustomButton from "../../components/CustomButton";
import ScreensName from "../../../util/Constants/ScreensName.ts";
import { useNavigation } from '@react-navigation/native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { launchCamera } from 'react-native-image-picker';

const { height, width } = Dimensions.get("window");

import { fonts } from "../../../util/Constants/FontName.js";
import { useTranslation } from "react-i18next";

const MyButton: React.FC<{ onPress: () => void; title: string; bgColor: string; textColor: string }> = ({ onPress, title, bgColor, textColor }) => (
  <TouchableOpacity style={[styles.button, { backgroundColor: bgColor, width: '100%', height: hp(5.7) }]} onPress={onPress}>
    <Text style={[styles.text, { color: textColor }]}>{title}</Text>
  </TouchableOpacity>
);


function BiometricVerification() {
  const [scanStage, setScanStage] = useState('left'); // 'left', 'right', 'completed'
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  const handleScanLeftHand = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera error: ', response.errorMessage);
      } else if (response.assets) {
        // Process left hand scan
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
          setScanStage('right');
        }, 2000); // Simulate processing for 2 seconds
      }
    });
  };

  const handleScanRightHand = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera error: ', response.errorMessage);
      } else if (response.assets) {
        // Process right hand scan
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
          setScanStage('completed');
        }, 2000); // Simulate processing for 2 seconds
      }
    });
  };

  const handleContinue = () => {
    setIsVerifying(true);
    setVerificationProgress(0);
    
    // Simulate verification progress
    const totalTime = 6000; // 6 seconds
    const interval = 100; // Update every 100ms
    const steps = totalTime / interval;
    let currentStep = 0;
    
    const progressTimer = setInterval(() => {
      currentStep++;
      setVerificationProgress(Math.min((currentStep / steps) * 100, 100));
      
      if (currentStep >= steps) {
        clearInterval(progressTimer);
        // Navigate after verification completes
        setTimeout(() => {
          setIsVerifying(false);
          navigation.navigate(ScreensName.BiometricSuccess);
        }, 200);
      }
    }, interval);
  };

  const getInstructionText = () => {
    if (scanStage === 'left') {
      return (
        <>
          {t('Line up your hand with the guide. ')}{'\n'}
          {t('Keep your fingers together. ')}{'\n'}
          {t('Then stay still. ')}{'\n'}
          <Text style={{ fontWeight: 'bold' }}>{t('Scan Left Hand First')}</Text>
        </>
      );
    } else if (scanStage === 'right') {
      return (
        <>
          {t('Line up your hand with the guide. ')}{'\n'}
          {t('Keep your fingers together. ')}{'\n'}
          {t('Then stay still. ')}{'\n'}
          <Text style={{ fontWeight: 'bold' }}>{t('Now Scan Right Hand')}</Text>
        </>
      );
    } else {
      return (
        <>
          {t('Both hands scanned successfully!')}{'\n'}
          {t('Click continue to proceed.')}{'\n'}
        </>
      );
    }
  };

  const renderButton = () => {
    if (isVerifying) {
      return (
        <View style={styles.verificationContainer}>
          <Text style={styles.verificationText}>{t('Verifying with NADRA biometric database...')}</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${verificationProgress}%` }]} />
          </View>
          <Text style={styles.progressText}>{Math.round(verificationProgress)}%</Text>
          <ActivityIndicator size="large" color={colors.GREEN} style={styles.loader} />
        </View>
      );
    } else if (isProcessing) {
      return (
        <View style={styles.processingContainer}>
          <ActivityIndicator size="large" color={colors.GREEN} />
          <Text style={styles.processingText}>{t('Processing...')}</Text>
        </View>
      );
    } else if (scanStage === 'left') {
      return (
        <MyButton
          title={t('Scan Left Hand')}
          onPress={handleScanLeftHand}
          bgColor={colors.GREEN}
          textColor={colors.WHITE}
        />
      );
    } else if (scanStage === 'right') {
      return (
        <MyButton
          title={t('Scan Right Hand')}
          onPress={handleScanRightHand}
          bgColor={colors.GREEN}
          textColor={colors.WHITE}
        />
      );
    } else {
      return (
        <MyButton
          title={t('Continue')}
          onPress={handleContinue}
          bgColor={colors.GREEN}
          textColor={colors.WHITE}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Header}>
        <Text style={styles.Heading}>{t('Biometric Verification')}</Text>
        <Text style={styles.SubHeading}>
          {getInstructionText()}
        </Text>
        <Image
          source={require('../../assets/LoginSignup/Hand-Scan.jpg')}
          style={styles.image}
        />
      </View>
      <View style={styles.buttonContainer}>
        {renderButton()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingHorizontal: width / 20,
  },
  Header: {
    marginTop: height / 10,
    marginBottom: height / 20,
    justifyContent: 'flex-start',
  },
  Heading: {
    fontSize: height / 25,
    fontFamily: fonts.SemiBold,
    marginLeft: wp('1.5%'),
    color: colors.BLACK,
  },
  SubHeading: {
    fontSize: height / 45,
    fontFamily: fonts.Regular,
    marginTop: height / 100,
    marginLeft: wp('1.5%'),
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 0.8,
    height: height * 0.3,
    marginTop: height / 20,
    resizeMode: 'contain',
  },
  text: {
    fontSize: hp(2),
    textAlign: 'center',
  },
  processingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  processingText: {
    marginTop: 10,
    fontSize: hp(2),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
  },
  verificationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(85),
  },
  verificationText: {
    fontSize: hp(2),
    fontFamily: fonts.SemiBold,
    color: colors.BLACK,
    marginBottom: hp(2),
    textAlign: 'center',
  },
  progressBarContainer: {
    width: wp(85),
    height: hp(1.5),
    backgroundColor: colors.LIGHT_GRAY,
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.GREEN,
  },
  progressText: {
    fontSize: hp(1.8),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    marginTop: hp(1),
  },
  loader: {
    marginTop: hp(2),
  },
});

export default BiometricVerification;