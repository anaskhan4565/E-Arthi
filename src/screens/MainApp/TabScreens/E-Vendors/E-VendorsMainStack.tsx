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
} from 'react-native';
import ScreensName from '../../../../../util/Constants/ScreensName';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Header } from 'react-native/Libraries/NewAppScreen';


import { I18nextProvider } from 'react-i18next';
import i18next from "i18next";

import EVendors from "./E-Vendors"
import EVendorsDetails from "./E-VendorsDetails"
import EVendorViewTranscations from "./E-VendorViewTranscations";
const Stack = createNativeStackNavigator();


function EVendorsMainStack(): React.JSX.Element {
    return (
        //  <I18nextProvider i18n={i18next}>
        <Stack.Navigator initialRouteName={ScreensName.EVendors} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ScreensName.EVendors} component={EVendors} />
            <Stack.Screen name={ScreensName.EVendorsDetails} component={EVendorsDetails} />
            <Stack.Screen name={ScreensName.EVendorViewTranscations} component={EVendorViewTranscations} />

        </Stack.Navigator>
        // </I18nextProvider>
    );
}

export default EVendorsMainStack;
