import React from "react";
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import ETransportMain from "../E-Transport/E-TransportMain";
import EWarehouse from "../../../../../util/Data/E-Warehouse";
import EWarehouseMainStack from "../E-Warehouse/E-WarehouseMainStack";
import EOrderMainStack from "../E-Order/E-OrderMainStack";
import Overview from "../../EMandi/Screens/Overview";
import MarketDept from "../../EMandi/Screens/MarketDept";
import Profile from "../../EMandi/Screens/Profile";
import EVendorsMainStack from "../E-Vendors/E-VendorsMainStack";
import Home from "./HomeScr";
import NewHomeScreen from "./NewHomeScreen";
import ScreensName from "../../../../../util/Constants/ScreensName";
import ELoanMainStack from "../E-Loan/E-LoanMainStack";




const Stack = createNativeStackNavigator();

function NewHomeMainStack() {
  return (
    <Stack.Navigator initialRouteName={ScreensName.NewHomeScreen} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ScreensName.NewHomeScreen} component={NewHomeScreen} />
      <Stack.Screen name={ScreensName.Home} component={Home} />
      <Stack.Screen name={ScreensName.EMandi} component={Overview} />
      <Stack.Screen name={ScreensName.MarketDept} component={MarketDept} />
      <Stack.Screen name={ScreensName.Profile} component={Profile} />
      <Stack.Screen name={ScreensName.EWarehouseMainStack} component={EWarehouseMainStack} />
      <Stack.Screen name={ScreensName.EOrderMainStack} component={EOrderMainStack} />
      <Stack.Screen name={ScreensName.EVendorsMainStack} component={EVendorsMainStack} />
      <Stack.Screen name={ScreensName.ETransportStack} component={ETransportMain} />
      <Stack.Screen name={ScreensName.ELoanMainStack} component={ELoanMainStack} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NewHomeMainStack;