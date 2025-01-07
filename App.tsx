import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import ScreensName from './util/ScreensName.ts';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Connect from './src/screens/Connect';
import ForgotPassword from './src/screens/ForgotPassword';
import MapSelection from './src/screens/MapSelection';
import NoInternet from './src/screens/NoInternet';
import OTP from './src/screens/OTP';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Splash from './src/screens/Splash';
import { Header } from 'react-native/Libraries/NewAppScreen';
import SplashScreen from './src/SplashScreen/SplashScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ScreensName.SignUp} screenOptions={{headerShown:false}}>
        <Stack.Screen name={ScreensName.SplashScreen} component={SplashScreen}/>
        <Stack.Screen name={ScreensName.NoInternet} component={NoInternet} />
        <Stack.Screen name={ScreensName.Home} component={Home} />
        <Stack.Screen name={ScreensName.Connect} component={Connect} />
        <Stack.Screen name={ScreensName.ForgotPassword} component={ForgotPassword} />
        <Stack.Screen name={ScreensName.MapSelection} component={MapSelection} />
        <Stack.Screen name={ScreensName.OTP} component={OTP} />
        <Stack.Screen name={ScreensName.SignIn} component={SignIn} />
        <Stack.Screen name={ScreensName.SignUp} component={SignUp} />

      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
