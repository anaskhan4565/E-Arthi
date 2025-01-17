import React, { Children } from "react";
import type { PropsWithChildren } from "react";
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
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
//import Home from './src/screens/Home';
import Connect from './src/screens/Connect';
import ForgotPassword from './src/screens/ForgotPassword';
import MapSelection from './src/screens/MapSelection';
import OTP from './src/screens/OTP';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Splash from './src/screens/Splash';
import { Header } from 'react-native/Libraries/NewAppScreen';
import SplashScreen from './src/SplashScreen/SplashScreen';
import AboutMore from './src/screens/Profile.jsx';
import HomeScr from './src/screens/MainApp/TabScreens/HomeScr.jsx';
import MainTabNavigation from './src/screens/MainApp/TabScreens/MainTabNavigation.tsx';
import LocationSys from './src/screens/LocationEnable.jsx';
import NoInternet from './src/screens/NoInternet.jsx';
import Sidebar from './src/screens/MainApp/Sidebar/Sidebar.jsx';
import ProductScr from './src/screens/MainApp/Product/ProductScr.jsx';

//for i18-next
import { I18nextProvider } from 'react-i18next';
import i18next from './services/i18next.js';
import ChangeLanguage from "./src/screens/SelectLanguage/SelectLanguage.jsx";
import InventoryMonitoring from "./src/screens/MainApp/TabScreens/E-InventoryScreens/InventoryMonitoring.jsx";
import Cnic_page_1 from "./src/screens/LoginSignup/Cnic_page_1.tsx";
import Cnic_page_2 from "./src/screens/LoginSignup/Cnic_page_2.tsx";
import BiometricVerification from "./src/screens/LoginSignup/BiometricVerification.tsx";
const Stack = createNativeStackNavigator();

const slideFromLeftOptions: NativeStackNavigationOptions = {
  animation: "slide_from_left",
  presentation: "transparentModal",
  gestureEnabled: true,
  animationDuration: 300,
};

function App(): React.JSX.Element {
  return (
    <I18nextProvider i18n={i18next}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={ScreensName.Cnic_page_2} screenOptions={{ headerShown: false }}>
          <Stack.Screen name={ScreensName.SplashScreen} component={SplashScreen} />
          <Stack.Screen name={ScreensName.NoInternet} component={NoInternet} />
          <Stack.Screen name={ScreensName.Connect} component={Connect} />
          <Stack.Screen
            name={ScreensName.ForgotPassword}
            component={ForgotPassword}
          />
          <Stack.Screen
            name={ScreensName.MapSelection}
            component={MapSelection}
          />
          <Stack.Screen name={ScreensName.OTP} component={OTP} />
          <Stack.Screen name={ScreensName.SignIn} component={SignIn} />
          <Stack.Screen name={ScreensName.MorePage} component={AboutMore} />
          <Stack.Screen name={ScreensName.SignUp} component={SignUp} />
          <Stack.Screen name={ScreensName.MainTabNavigation} component={MainTabNavigation} />
          <Stack.Screen name={ScreensName.LocationPermission} component={LocationSys} />
          <Stack.Screen name={ScreensName.Sidebar}
            options={slideFromLeftOptions} component={Sidebar} />
          <Stack.Screen name={ScreensName.ProductScr} component={ProductScr} />
          <Stack.Screen name={ScreensName.HomeScreen} component={HomeScr} />
          <Stack.Screen name={ScreensName.Cnic_page_1} component={Cnic_page_1} />
          <Stack.Screen name={ScreensName.Cnic_page_2} component={Cnic_page_2}/>
          <Stack.Screen name={ScreensName.BiometricVerification} component={BiometricVerification}/>

          {/* Specific to changing Lang */}
          <Stack.Screen name={ScreensName.ChangeLanguage} component={ChangeLanguage} />
            

          <Stack.Screen name={ScreensName.InventoryMonitoring} component={InventoryMonitoring} />

        </Stack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
