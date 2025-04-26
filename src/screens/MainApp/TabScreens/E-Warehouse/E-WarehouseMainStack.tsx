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
import ScreensName from '../../../../../util/Constants/ScreensName';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Header } from 'react-native/Libraries/NewAppScreen';


import { I18nextProvider } from 'react-i18next';
import i18next from "i18next";

import EWarehouse from "./E-Warehouse"
import EWarehouseHomeScreen from "./EWarehouseHomeScreen"
import EWarehouseRental from "./EWarehouseRental"
import ESiloRental from "./ESiloRental"
import EColdStorageRental from "./EColdStorageRental"
import EWarehouseNewSpaceCropSelect from "./E-WarehouseNewSpaceCropSelect"
import EWarehouseNewSpaceWarehouseSelect from "./E-WarehouseNewSpaceWarehouseSelect"
import EWarehouseNewSpaceConfirmWarehouse from "./E-WarehouseNewSpaceConfirmWarehouse"
import EWarehousePreviousWarehouses from "./E-WarehousePreviousWarehouses"
import EWarehousePreviousWarehouseDetails from "./E-WarehousePreviousWarehouseDetails"
import FoodSurveillanceSelectWarehouse from "./FoodSurveillanceSelectWarehouse"
import FoodSurveillanceWarehouse from "./FoodSurveillanceWarehouse"
import FoodSurveillanceItem from "./FoodSurveillanceItem"
import FoodSafetyAndSecurity from "./FoodSafetyAndSecurity";
import EWarehouseSuccess from "./EWarehouseSuccess";
import ESiloRental2 from "./EsiloRental2";
import ExistingRentals from "./ExistingRentals";
import RentalDetails from "./RentalDetails";
import Grading from "../EAdvisers/Grading";
import RequestGrading from "../EAdvisers/RequestGrading";
import GradingInfo from "../EAdvisers/GradingInfo";
import RequestGradingDone from "../EAdvisers/RequestGradingDone";
const Stack = createNativeStackNavigator();


function EWarehouseMainStack(): React.JSX.Element {
    return (
        //  <I18nextProvider i18n={i18next}>
        <Stack.Navigator initialRouteName={ScreensName.EWarehouseHomeScreen} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ScreensName.EWarehouse} component={EWarehouse} />
            <Stack.Screen name={ScreensName.EWarehouseHomeScreen} component={EWarehouseHomeScreen} />
            <Stack.Screen name={ScreensName.EWarehouseSuccess} component={EWarehouseSuccess} />
            <Stack.Screen name={ScreensName.EWarehouseRental} component={EWarehouseRental} />
            <Stack.Screen name={ScreensName.ESiloRental} component={ESiloRental} />
            <Stack.Screen name={ScreensName.ESiloRental2} component={ESiloRental2} />
            <Stack.Screen name={ScreensName.EColdStorageRental} component={EColdStorageRental} />
            <Stack.Screen name={ScreensName.EWarehouseNewSpaceCropSelect} component={EWarehouseNewSpaceCropSelect} />
            <Stack.Screen name={ScreensName.EWarehouseNewSpaceWarehouseSelect} component={EWarehouseNewSpaceWarehouseSelect} />
            <Stack.Screen name={ScreensName.EWarehouseNewSpaceConfirmWarehouse} component={EWarehouseNewSpaceConfirmWarehouse} />
            <Stack.Screen name={ScreensName.EWarehousePreviousWarehouses} component={EWarehousePreviousWarehouses} />
            <Stack.Screen name={ScreensName.EWarehousePreviousWarehouseDetails} component={EWarehousePreviousWarehouseDetails} />
            <Stack.Screen name={ScreensName.FoodSurveillanceSelectWarehouse} component={FoodSurveillanceSelectWarehouse} />
            <Stack.Screen name={ScreensName.FoodSurveillanceWarehouse} component={FoodSurveillanceWarehouse} />
            <Stack.Screen name={ScreensName.FoodSurveillanceItem} component={FoodSurveillanceItem} />
            <Stack.Screen name={ScreensName.FoodSafetyAndSecurity} component={FoodSafetyAndSecurity} />
            <Stack.Screen name={ScreensName.ExistingRentals} component={ExistingRentals} />
            <Stack.Screen name={ScreensName.RentalDetails} component={RentalDetails} />
            <Stack.Screen name={ScreensName.GradingInfo} component={GradingInfo} />
            <Stack.Screen name={ScreensName.Grading} component={Grading} />
            <Stack.Screen name={ScreensName.RequestGrading} component={RequestGrading} />
            <Stack.Screen name={ScreensName.RequestGradingDone} component={RequestGradingDone} />

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
