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
import ScreensName from "../../../util/ScreensName";
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import ETransportMain from "./TabScreens/E-Transport/E-TransportMain";
import EWarehouse from "../../../util/E-Warehouse";
import EWarehouseMainStack from "./TabScreens/E-Warehouse/E-WarehouseMainStack";
import EOrderMainStack from "./TabScreens/E-Order/E-OrderMainStack";
import Overview from "./EMandi/Screens/Overview";
import MarketDept from "./EMandi/Screens/MarketDept";
import Profile from "./EMandi/Screens/Profile";
import EVendorsMainStack from "./TabScreens/E-Vendors/E-VendorsMainStack";
import Home from "./TabScreens/HomeScr";




const Stack = createNativeStackNavigator();


function HomeScreenMainStack(): React.JSX.Element {
    return (
        //  <I18nextProvider i18n={i18next}>
                <Stack.Navigator initialRouteName={ScreensName.Home} screenOptions={{ headerShown: false }}>
                    <Stack.Screen name={ScreensName.ETransportStack} component={ETransportMain} />
                    <Stack.Screen name={ScreensName.Home} component={Home} />
                    <Stack.Screen name={ScreensName.EMandi} component={Overview} />
                    <Stack.Screen name={ScreensName.MarketDept} component={MarketDept} />
                    <Stack.Screen name={ScreensName.Profile} component={Profile} />
                    <Stack.Screen name={ScreensName.EWarehouseMainStack} component={EWarehouseMainStack} />
                    <Stack.Screen name={ScreensName.EOrderMainStack} component={EOrderMainStack} />
                    <Stack.Screen name={ScreensName.EVendorsMainStack} component={EVendorsMainStack} />
                    
                </Stack.Navigator>
        // </I18nextProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default HomeScreenMainStack;
