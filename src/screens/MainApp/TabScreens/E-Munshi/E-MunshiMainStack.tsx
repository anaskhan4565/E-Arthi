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
import ScreensName from '../../../../../util/ScreensName';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Header } from 'react-native/Libraries/NewAppScreen';


import { I18nextProvider } from 'react-i18next';
import i18next from "i18next";

import EMunshi from "./E-Munshi"
import EMunshiItemName from "./E-MunshiItemName"
import EMunshiCashFlow from "./E-MunshiCashflow"
import EMunshiFarmName from "./E-MunshiFarmName";
const Stack = createNativeStackNavigator();


function EMunshiMainStack(): React.JSX.Element {
    return (
        //  <I18nextProvider i18n={i18next}>
                <Stack.Navigator initialRouteName={ScreensName.EMunshiFarmName} screenOptions={{ headerShown: false }}>
                    <Stack.Screen name={ScreensName.EMunshi} component={EMunshi} />
                    <Stack.Screen name={ScreensName.EMunshiItemName} component={EMunshiItemName} />
                    <Stack.Screen name={ScreensName.EMunshiCashFlow} component={EMunshiCashFlow} />
                    <Stack.Screen name={ScreensName.EMunshiFarmName} component={EMunshiFarmName} />
                </Stack.Navigator>
        // </I18nextProvider>
    );
}

export default EMunshiMainStack;
