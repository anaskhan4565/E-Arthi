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
import RaastPaymentScreen from "./AllReceivingScreen.tsx";
import RaastConfirmPayment from "./PaymentConfirmation.tsx";
import PaymentScreens from "./AllReceivingScreen.tsx";
import PaymentConfirmation from "./PaymentConfirmation.tsx";
import AllOTP from "./AllOTP.tsx";
import PaymentSuccess from "./PaymentSuccess.jsx";
import LineOfCreditPay from "./LineOfCreditPay.jsx";

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
                    <Stack.Screen name={ScreensName.RaastPaymentScreen} component={PaymentScreens} />
                    <Stack.Screen name={ScreensName.RaastConfirmPayment} component={PaymentConfirmation} />
                    <Stack.Screen name={ScreensName.AllOTP} component={AllOTP} />
                    <Stack.Screen name={ScreensName.PaymentSuccess} component={PaymentSuccess} />

                    <Stack.Screen name={ScreensName.LineOfCreditPay} component={LineOfCreditPay} />

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
