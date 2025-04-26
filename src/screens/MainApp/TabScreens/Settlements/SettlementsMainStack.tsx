import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreensName from '../../../../../util/Constants/ScreensName';

// Import the screens
import Settlements from "./Settlements";
import SummaryOfSpendings from "./SummaryOfSpendings";
import RaastPayment from "./RaastPayment";

const Stack = createNativeStackNavigator();

function SettlementsMainStack() {
    return (
        <Stack.Navigator initialRouteName={ScreensName.SettlementsScr} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ScreensName.SettlementsScr} component={Settlements} />
            <Stack.Screen name={ScreensName.SummaryOfSpendingsScr} component={SummaryOfSpendings} />
            <Stack.Screen name={ScreensName.RaastPaymentScr} component={RaastPayment} />
        </Stack.Navigator>
    );
}

export default SettlementsMainStack; 