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

import ELoan from "./E-LoanHome"
import ELoanOTP from "./E-LoanOTP"
import EloanPreviousLoan from "./E-LoanPreviousLoan"
import EloanIDVerify from "./E-LoanIDVerify"
import EloanLandVerify from "./E-LoanLandVerify"
import ELoanNewLoan from "./E-LoanNewLoan"
import ELoanCurrentLoan from "./E-LoanCurrentLoan"
import EloanSelectedLoan from "./E-LoanSelectedLoan"
import ELoanSuccessScr from "./E-LoanSuccess";
import ELoanNewBank from "./E-LoanNewBank";
import EloanHBL from "./E-LoanHBL";
import EloanBOP from "./E-LoanBOP";
import EloanZTBL from "./E-LoanZTBL";
import EloanMeezan from "./E-LoanMeezan";

const Stack = createNativeStackNavigator();


function ELoanMainStack(): React.JSX.Element {
    return (
        //  <I18nextProvider i18n={i18next}>
                <Stack.Navigator initialRouteName={ScreensName.ELoan} screenOptions={{ headerShown: false }}>
                    <Stack.Screen name={ScreensName.ELoan} component={ELoan} />
                    <Stack.Screen name={ScreensName.EloanOTP} component={ELoanOTP} />
                    <Stack.Screen name={ScreensName.EloanIDVerify} component={EloanIDVerify} />
                    <Stack.Screen name={ScreensName.EloanLandVerify} component={EloanLandVerify} />
                    <Stack.Screen name={ScreensName.EloanPreviousLoan} component={EloanPreviousLoan} />
                    <Stack.Screen name={ScreensName.ELoanNewLoan} component={ELoanNewLoan} />
                    <Stack.Screen name={ScreensName.ELoanSuccessScr} component={ELoanSuccessScr} />
                    <Stack.Screen name={ScreensName.ELoanNewBank} component={ELoanNewBank} />
                    <Stack.Screen name={ScreensName.EloanHBL} component={EloanHBL} />
                    <Stack.Screen name={ScreensName.EloanBOP} component={EloanBOP} />
                    <Stack.Screen name={ScreensName.EloanZTBL} component={EloanZTBL} />
                    <Stack.Screen name={ScreensName.EloanMeezan} component={EloanMeezan} />
                    <Stack.Screen name={ScreensName.EloanCurrentLoan} component={ELoanCurrentLoan} />
                    <Stack.Screen name={ScreensName.EloanSelectedLoan} component={EloanSelectedLoan} />
                </Stack.Navigator>
        // </I18nextProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ELoanMainStack;
