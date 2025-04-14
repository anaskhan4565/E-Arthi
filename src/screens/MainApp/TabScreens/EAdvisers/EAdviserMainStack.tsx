import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreensName from '../../../../../util/Constants/ScreensName.ts';
import EAdviser from './EAdviser';
import AgriServices from './AgriServices';
import CropAdvisor from './CropAdvisor';
import ZoneDetails from './ZoneDetails';
import FertilizerAdvisor from './FertilizerAdvisor';

const Stack = createNativeStackNavigator();

const EAdviserMainStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={ScreensName.EAdviser}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name={ScreensName.EAdviser} component={EAdviser} />
            <Stack.Screen name={ScreensName.AgriServices} component={AgriServices} />
            <Stack.Screen name={ScreensName.CropAdvisor} component={CropAdvisor} />
            <Stack.Screen name={ScreensName.ZoneDetails} component={ZoneDetails} />
            <Stack.Screen name={ScreensName.FertilizerAdvisor} component={FertilizerAdvisor} />
        </Stack.Navigator>
    );
};

export default EAdviserMainStack; 