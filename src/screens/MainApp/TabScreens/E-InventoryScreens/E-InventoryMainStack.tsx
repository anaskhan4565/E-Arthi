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
import Inventory from "./Inventory";
import Sales from "./Sales";
import Suppliers from "./Suppliers";
import EInventory from "./E-Inventory";
import InventoryMonitoring from "./InventoryMonitoring";
import PurchaseHisotry from "./PurchaseHistory";
import EInventoryReminder from "./E-InventoryReminder";
import EInventoryAddNew from "./E-InventoryAddNew";
import EInventoryAddNewGroup from "./E-InventoryAddNewGroup";
import EInventoryManageGroup from "./E-InventoryManageGroup";
import EInventoryDetails from "./E-InventoryDetails";
const Stack = createNativeStackNavigator();

const slideFromLeftOptions: NativeStackNavigationOptions = {
    animation: "slide_from_left",
    presentation: "transparentModal",
    gestureEnabled: true,
    animationDuration: 300,
};

function EInventoryMainStack(): React.JSX.Element {
    return (
        //  <I18nextProvider i18n={i18next}>
                <Stack.Navigator initialRouteName={ScreensName.EInventory} screenOptions={{ headerShown: false }}>
                    <Stack.Screen name={ScreensName.EInventory} component={EInventory} />
                    <Stack.Screen name={ScreensName.Inventory} component={Inventory} />
                    <Stack.Screen name={ScreensName.Sales} component={Sales} />
                    <Stack.Screen name={ScreensName.Suppliers} component={Suppliers} />
                    <Stack.Screen name={ScreensName.InventoryMonitoring} component={InventoryMonitoring} />
                    <Stack.Screen name={ScreensName.PurchaseHistory} component={PurchaseHisotry} />
                    <Stack.Screen name={ScreensName.EInventoryReminder} component={EInventoryReminder} />
                    <Stack.Screen name={ScreensName.EInventoryAddNew} component={EInventoryAddNew} />
                    <Stack.Screen name={ScreensName.EInventoryAddNewGroup} component={EInventoryAddNewGroup} />
                    <Stack.Screen name={ScreensName.EInventoryManageGroup} component={EInventoryManageGroup} />
                    <Stack.Screen name={ScreensName.EInventoryDetails} component={EInventoryDetails} />

                </Stack.Navigator>
        // </I18nextProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default EInventoryMainStack;
