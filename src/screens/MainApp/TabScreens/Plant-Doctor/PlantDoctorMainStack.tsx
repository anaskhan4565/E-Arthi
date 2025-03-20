import React from "react";
import type { PropsWithChildren } from "react";

import ScreensName from '../../../../../util/Constants/ScreensName.ts';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Header } from 'react-native/Libraries/NewAppScreen';


import { I18nextProvider } from 'react-i18next';
import i18next from "i18next";
import AddCrop from "./AddCrop.tsx"
import Diagnosis from "./Diagnosis.tsx"
import DosageCalculator from "./DosageCalculator.tsx"
import FertilizerCalculator from "./FertilizerCalculator.tsx"
import HealCropImageCapture from "./HealCropImageCapture.tsx"
import Pest from "./Pest.tsx"
import Prevent from "./Prevent.tsx"
import Treatment from "./Treatment.tsx"
import TreatmentProductDescription from "./TreatmentProductDescription.tsx"
import TreatNow from "./TreatNow.tsx"
import PlantDoctor from "./PlantDoctor.tsx"

const Stack = createNativeStackNavigator();


function PlantDoctorMainStack(): React.JSX.Element {
    return (
        //  <I18nextProvider i18n={i18next}>
        <Stack.Navigator initialRouteName={ScreensName.PlantDoctor} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ScreensName.AddCrop} component={AddCrop} />
            <Stack.Screen name={ScreensName.Diagnosis} component={Diagnosis} />
            <Stack.Screen name={ScreensName.DosageCalculator} component={DosageCalculator} />
            <Stack.Screen name={ScreensName.FertilizerCalculator} component={FertilizerCalculator} />
            <Stack.Screen name={ScreensName.HealCropImageCapture} component={HealCropImageCapture} />
            <Stack.Screen name={ScreensName.Pest} component={Pest} />
            <Stack.Screen name={ScreensName.Prevent} component={Prevent} />
            <Stack.Screen name={ScreensName.Treatment} component={Treatment} />
            <Stack.Screen name={ScreensName.TreatmentProductDescription} component={TreatmentProductDescription} />
            <Stack.Screen name={ScreensName.TreatNow} component={TreatNow} />
            <Stack.Screen name={ScreensName.PlantDoctor} component={PlantDoctor} />
        </Stack.Navigator>
        // </I18nextProvider>
    );
}


export default PlantDoctorMainStack;


