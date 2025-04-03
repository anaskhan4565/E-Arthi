import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreensName from "../../../../../util/Constants/ScreensName";
import EMarket from "./E-Market";
import ProductScr from "../../Product/ProductScr";

const Stack = createNativeStackNavigator();

function EMarketMainStack() {
    return (
        <Stack.Navigator initialRouteName={ScreensName.EMarket} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ScreensName.EMarket} component={EMarket} />
            <Stack.Screen name={ScreensName.ProductScr} component={ProductScr} />
        </Stack.Navigator>
    );
}

export default EMarketMainStack; 