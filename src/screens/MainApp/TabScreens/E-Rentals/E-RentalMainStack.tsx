import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreensName from '../../../../../util/Constants/ScreensName.ts';
import ERentals from "./E-Rentals.tsx" 
import Harvester from './Harvester.tsx';
import Auger from './Auger.tsx';
import BookRental from './BookRental.tsx';
import ToolCarrier from './ToolCarrier.tsx';
import Tractors from './Tractors.tsx';
import Forklift from './Forklift.tsx';

const Stack = createNativeStackNavigator();

const ERentalMainStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={ScreensName.ERentals}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name={ScreensName.ERentals} component={ERentals} />
            <Stack.Screen name={ScreensName.Harvester} component={Harvester} />
            <Stack.Screen name={ScreensName.Forklift} component={Forklift} />
            <Stack.Screen name={ScreensName.Auger} component={Auger} />
            <Stack.Screen name={ScreensName.ToolCarrier} component={ToolCarrier} />
            <Stack.Screen name={ScreensName.Tractor} component={Tractors} />
            <Stack.Screen name={ScreensName.BookRental} component={BookRental} /> 
        </Stack.Navigator>
    );
};

export default ERentalMainStack; 