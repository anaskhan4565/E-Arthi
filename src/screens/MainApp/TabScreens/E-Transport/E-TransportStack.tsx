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
import ETransportMain from "./E-TransportMain";
import ETransportAddDetails from "./E-TransportAddDetails";
import ETransportAir from "./E-TransportAir";
import ETransportAnalytics from "./E-TransportAnalytics";
import ETransportDeliveryHistory from "./E-TransportDeliveryHistory";
import ETransportNewTransport from "./E-TransportNewTransport";
import ETransportSelectVehicleType from "./E-TransportSelectVehicleType";
import ETransportTruck from "./E-TransportTruck";
import ETransportShip from "./E-TransportShip";

const Stack = createNativeStackNavigator();


function ETransportStack(): React.JSX.Element {
    return (
        //  <I18nextProvider i18n={i18next}>
                <Stack.Navigator initialRouteName={ScreensName.ETransportMain} screenOptions={{ headerShown: false }}>
                    <Stack.Screen name={ScreensName.ETransportMain} component={ETransportMain} />
                    <Stack.Screen name={ScreensName.ETransportAddDetails} component={ETransportAddDetails} />
                    <Stack.Screen name={ScreensName.ETransportAir} component={ETransportAir} />
                    <Stack.Screen name={ScreensName.ETransportAnalytics} component={ETransportAnalytics} />
                    <Stack.Screen name={ScreensName.ETransportDeliveryHistory} component={ETransportDeliveryHistory} />
                    <Stack.Screen name={ScreensName.ETransportNewTransport} component={ETransportNewTransport} />
                    <Stack.Screen name={ScreensName.ETransportSelectVehicleType} component={ETransportSelectVehicleType} />
                    <Stack.Screen name={ScreensName.ETransportShip} component={ETransportShip} />
                    <Stack.Screen name={ScreensName.ETransportTruck} component={ETransportTruck} />
                </Stack.Navigator>
        // </I18nextProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ETransportStack;
