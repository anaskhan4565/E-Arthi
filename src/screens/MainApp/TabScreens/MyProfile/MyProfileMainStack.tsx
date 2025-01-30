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

import MyProfile from "./MyProfile"
import BankRecieving from "./BankRecieving"
import ProfileChangeLanguage from "./ProfileChangeLanguage"
import RaastRecieving from "./Raastrecieving";
import Recieving from "./Recieving";

const Stack = createNativeStackNavigator();


function EWarehouseMainStack(): React.JSX.Element {
    return (
        //  <I18nextProvider i18n={i18next}>
                <Stack.Navigator initialRouteName={ScreensName.MyProfile} screenOptions={{ headerShown: false }}>
                    <Stack.Screen name={ScreensName.MyProfile} component={MyProfile} />
                    <Stack.Screen name={ScreensName.BankRecieving} component={BankRecieving} />
                    <Stack.Screen name={ScreensName.ProfileChangeLanguage} component={ProfileChangeLanguage} />
                    <Stack.Screen name={ScreensName.RaastRecieving} component={RaastRecieving} />
                    <Stack.Screen name={ScreensName.Recieving} component={Recieving} />
                </Stack.Navigator>
        // </I18nextProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default EWarehouseMainStack;
