import React from "react";
import type { PropsWithChildren } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import ScreensName from "./util/ScreensName.ts";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
//import Home from './src/screens/Home';
import 'react-native-gesture-handler';
import Connect from "./src/screens/Connect.tsx";
import ForgotPassword from "./src/screens/ForgotPassword.tsx";  
import MapSelection from "./src/screens/MapSelection.tsx";
import OTP from "./src/screens/OTP.tsx";
import SignIn from "./src/screens/SignIn.jsx";
import SignUp from "./src/screens/SignUp.tsx";
import Splash from "./src/screens/Splash.tsx";
import { Header } from "react-native/Libraries/NewAppScreen";
import SplashScreen from "./src/SplashScreen/SplashScreen.tsx";
import AboutMore from "./src/screens/Profile.jsx";
import HomeScr from "./src/screens/MainApp/TabScreens/HomeScr.jsx";
import MainTabNavigation from "./src/screens/MainApp/TabScreens/MainTabNavigation.tsx";
import LocationSys from "./src/screens/LocationEnable.jsx";
import NoInternet from "./src/screens/NoInternet.jsx";
import Sidebar from "./src/screens/MainApp/Sidebar/Sidebar.jsx";
import ProductScr from "./src/screens/MainApp/Product/ProductScr.jsx";
const Stack = createNativeStackNavigator();

const slideFromLeftOptions: NativeStackNavigationOptions = {
  animation: "slide_from_left", // Slide animation
  presentation: "card", // Ensures the new screen overlaps the current one
  gestureEnabled: true, // Allows gesture-based navigation
  animationDuration: 500, // Adjusts the duration for smoother transition
};

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ScreensName.SplashScreen}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name={ScreensName.SplashScreen}
          component={SplashScreen}
        />
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
        <Stack.Screen
          name={ScreensName.MainTabNavigation}
          component={MainTabNavigation}
        />
        <Stack.Screen
          name={ScreensName.LocationPermission}
          component={LocationSys}
        />

        <Stack.Screen
          name={ScreensName.Sidebar}
          component={Sidebar}
          options={slideFromLeftOptions}
        />
        <Stack.Screen name={ScreensName.ProductScr} component={ProductScr} />

        {/* specific to After Login: */}
        <Stack.Screen name={ScreensName.HomeScreen} component={HomeScr} />
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
