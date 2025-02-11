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
import ScreensName from '../../../../../util/ScreensName.ts';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Header } from 'react-native/Libraries/NewAppScreen';


import { I18nextProvider } from 'react-i18next';
import i18next from "i18next";
import EBroker from "./E-Broker.tsx";
import EBrokerPage from "./E-BrokerPage.tsx";
const Stack = createNativeStackNavigator();

const slideFromLeftOptions: NativeStackNavigationOptions = {
    animation: "slide_from_left",
    presentation: "transparentModal",
    gestureEnabled: true,
    animationDuration: 300,
};

function EBrokerMainStack(): React.JSX.Element { 
    return (
        //  <I18nextProvider i18n={i18next}>
                <Stack.Navigator initialRouteName={ScreensName.EBroker} screenOptions={{ headerShown: false }}>
                    <Stack.Screen name={ScreensName.EBroker} component={EBroker} />
                    <Stack.Screen name={ScreensName.EBrokerPage} component={EBrokerPage} />
                </Stack.Navigator>
        // </I18nextProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default EBrokerMainStack;
