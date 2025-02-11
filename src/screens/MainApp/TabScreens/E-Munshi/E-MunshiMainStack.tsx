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
import EMunshiCashFlow from "./E-MunshiCashFlow"
import EMunshiTransactionDetail from "./E-MunshiTransactionDetail"
import EMunshiDisputeTransaction from "./E-MunshiDisputeTransaction"
import EMunshiItemName from "./E-MunshiItemName"
import EMunshiFarmName from "./E-MunshiFarmName";
import EMunshiWarehouseInfo from "./EMunshiWarehouseInfo";
const Stack = createNativeStackNavigator();


function EMunshiMainStack(): React.JSX.Element {
    return (
        //  <I18nextProvider i18n={i18next}>
                <Stack.Navigator initialRouteName={ScreensName.EMunshi} screenOptions={{ headerShown: false }}>
                    <Stack.Screen name={ScreensName.EMunshi} component={EMunshi} />
                    <Stack.Screen name={ScreensName.EMunshiItemName} component={EMunshiItemName} />
                    <Stack.Screen name={ScreensName.EMunshiFarmName} component={EMunshiFarmName} />
                    <Stack.Screen name={ScreensName.EMunshiWarehouseInfo} component={EMunshiWarehouseInfo} />

                </Stack.Navigator>
        // </I18nextProvider>
    );
}

export default EMunshiMainStack;
