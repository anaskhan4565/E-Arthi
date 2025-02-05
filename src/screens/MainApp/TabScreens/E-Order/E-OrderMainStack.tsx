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
import EOrderManager from "./E-OrderManager";
import EOrderHistory from "./E-OrderHistory";
import EOrderPlaceOrder from "./E-OrderPlaceOrder";
import EOrderTransaction from "./E-OrderTransaction";
import EOrderCheckout from "./E-OrderCheckout";
import EOrderPaymentMethod from "./EOrderPaymentMethod";
import { fonts } from '../../../../../util/FontName.js';

const Stack = createNativeStackNavigator();


function EOrderMainStack(): React.JSX.Element {
    return (
        //  <I18nextProvider i18n={i18next}>
                <Stack.Navigator initialRouteName={ScreensName.EOrderManager} screenOptions={{ headerShown: false }}>
                    <Stack.Screen name={ScreensName.EOrderManager} component={EOrderManager} />
                    <Stack.Screen name={ScreensName.EOrderHistory} component={EOrderHistory} />
                    <Stack.Screen name={ScreensName.EOrderPlaceOrder} component={EOrderPlaceOrder} />
                    <Stack.Screen name={ScreensName.EOrderTransaction} component={EOrderTransaction} />
                    <Stack.Screen name={ScreensName.EOrderCheckout} component={EOrderCheckout} />
                    <Stack.Screen name={ScreensName.EOrderPaymentMethod} component={EOrderPaymentMethod} />
                </Stack.Navigator>
        // </I18nextProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default EOrderMainStack;
