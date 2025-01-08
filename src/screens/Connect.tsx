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
import CustomButton from '../components/CustomButton'
import colors from '../../util/colors';


function Connect(): React.JSX.Element {


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require('../assets/logo_text.png')} // Replace with your logo path
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <CustomButton
          MainText="Register Now"
          BgGiven={colors.GREEN} // Background color for the button
          txColor="#FFFFFF" // Text color for the button
          isNavigation={true} // Indicates navigation
          name="Register" // Navigation route name
        />
        <CustomButton
          MainText="Login"
          BgGiven="#FFFFFF" // Background color for the button
          txColor={colors.GREEN} // Text color for the button
          isNavigation={true} // Indicates navigation
          name="Login" // Navigation route name
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
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