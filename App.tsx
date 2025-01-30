import React, { Children } from "react";
import {
  StyleSheet,
} from 'react-native';
import ScreensName from './util/ScreensName.ts';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import Connect from './src/screens/InitialStartScreens/Connect.tsx';
import ForgotPassword from './src/screens/InitialStartScreens/ForgotPassword.tsx';
import OTP from './src/screens/InitialStartScreens/OTP.tsx';
import SignIn from './src/screens/InitialStartScreens/SignIn.jsx';
import SignUp from './src/screens/InitialStartScreens/SignUp.tsx';
import SplashScreen from './src/SplashScreen/SplashScreen';
import AboutMore from './src/screens/InitialStartScreens/Profile.jsx';
import HomeScr from './src/screens/MainApp/TabScreens/HomeScr.jsx';
import MainTabNavigation from './src/screens/MainApp/TabScreens/MainTabNavigation.tsx';
import LocationSys from './src/screens/InitialStartScreens/LocationEnable.jsx';
import NoInternet from './src/screens/InitialStartScreens/NoInternet.jsx';
import Sidebar from './src/screens/MainApp/Sidebar/Sidebar.jsx';
import ProductScr from './src/screens/MainApp/Product/ProductScr.jsx';
import EInventorySupplier from "./src/screens/MainApp/TabScreens/E-InventoryScreens/E-InventorySupplier.tsx";
import EInventorySuppliersList from "./src/screens/MainApp/TabScreens/E-InventoryScreens/E-InvetorySuppliersList.tsx";
import EInventoryAddSuppliers from "./src/screens/MainApp/TabScreens/E-InventoryScreens/E-InventoryAddSuppliers.tsx";
import EInventorySupplierReports from "./src/screens/MainApp/TabScreens/E-InventoryScreens/E-InventorySupplierReports.tsx";
import LanguageSelect from './src/screens/InitialStartScreens/LanguageSelect.tsx';

import EWarehouseMainStack from "./src/screens/MainApp/TabScreens/E-Warehouse/E-WarehouseMainStack.tsx";
//for i18-next
import { I18nextProvider } from 'react-i18next';
import i18next from './services/i18next.js';
import ChangeLanguage from "./src/screens/SelectLanguage/SelectLanguage.jsx";
import InventoryMonitoring from "./src/screens/MainApp/TabScreens/E-InventoryScreens/InventoryMonitoring.jsx";
import Cnic_page_1 from "./src/screens/LoginSignup/Cnic_page_1.tsx";
import Cnic_page_2 from "./src/screens/LoginSignup/Cnic_page_2.tsx";
import BiometricVerification from "./src/screens/LoginSignup/BiometricVerification.tsx";
import BiometricSuccess from "./src/screens/LoginSignup/BiometricSuccess.tsx";
import Overview from "./src/screens/MainApp/EMandi/Screens/Overview.jsx";
import Profile from "./src/screens/MainApp/EMandi/Screens/Profile.jsx";
import MarketDept from "./src/screens/MainApp/EMandi/Screens/MarketDept.jsx";
import EInventory from "./src/screens/MainApp/TabScreens/E-InventoryScreens/E-Inventory.tsx";
import ETransportStack from "./src/screens/MainApp/TabScreens/E-Transport/E-TransportStack.tsx";
import EVendorsMainStack from "./src/screens/MainApp/TabScreens/E-Vendors/E-VendorsMainStack.tsx";
import SelectLanguage from "./src/screens/SelectLanguage/SelectLanguage.jsx";
import MyProfileMainStack from "./src/screens/MainApp/TabScreens/MyProfile/MyProfileMainStack.tsx";
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
        <Stack.Navigator initialRouteName={ScreensName.SplashScreen} screenOptions={{ headerShown: false }}>
          <Stack.Screen name={ScreensName.SplashScreen} component={SplashScreen} />
          <Stack.Screen name={ScreensName.NoInternet} component={NoInternet} />
          <Stack.Screen name={ScreensName.Connect} component={Connect} />
          <Stack.Screen name={ScreensName.ForgotPassword} component={ForgotPassword} />
          <Stack.Screen name={ScreensName.LanguageSelect} component={LanguageSelect} />

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
          <Stack.Screen name={ScreensName.Cnic_page_2} component={Cnic_page_2} />
          <Stack.Screen name={ScreensName.BiometricVerification} component={BiometricVerification} />
          <Stack.Screen name={ScreensName.BiometricSuccess} component={BiometricSuccess} />


          {/* Specific to changing Lang */}
          <Stack.Screen name={ScreensName.ChangeLanguage} component={ChangeLanguage} />

          <Stack.Screen name={ScreensName.EWarehouseMainStack} component={EWarehouseMainStack} />
          <Stack.Screen name={ScreensName.EVendorsMainStack} component={EVendorsMainStack} />

          <Stack.Screen name={ScreensName.ETransportStack} component={ETransportStack} />
          <Stack.Screen name={ScreensName.InventoryMonitoring} component={InventoryMonitoring} />
          <Stack.Screen name={ScreensName.EInventorySupplier} component={EInventorySupplier} />
          <Stack.Screen name={ScreensName.EInventorySuppliersList} component={EInventorySuppliersList} />
          <Stack.Screen name={ScreensName.EInventoryAddSuppliers} component={EInventoryAddSuppliers} />
          <Stack.Screen name={ScreensName.EInventorySupplierReports} component={EInventorySupplierReports} />

          <Stack.Screen name={ScreensName.MyProfileMainStack} component={MyProfileMainStack} />


          <Stack.Screen name={ScreensName.EMandi} component={Overview} />
          <Stack.Screen name={ScreensName.MarketDept} component={MarketDept} />
          <Stack.Screen name={ScreensName.Profile} component={Profile} />

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
