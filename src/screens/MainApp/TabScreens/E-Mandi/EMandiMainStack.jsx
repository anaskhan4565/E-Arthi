import React from "react";
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
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import EMandiHomeScreen from "./EMandiHomeScreen";
import RequestForAuction from "./RequestForAuction";
import MyAuctions from "./MyAuctions";
import Auctions from "./Auctions";
import AuctionHistory from "./AuctionHistory";
import AuctionSubmissionSuccess from "./AuctionSubmissionSuccess";
import LiveAuctions from "./LiveAuctions";
import AuctionDetails from "./AuctionDetails";
import MyAuctionDetail from "./MyAuctionDetail";
import AuctionHistoryDetails from "./AuctionHistoryDetails";
import AuctionHistoryPaymentMethod from "./AuctionHistoryPaymentMethod";
const Stack = createNativeStackNavigator();

function EMandiMainStack() {
    return (
        <Stack.Navigator initialRouteName={ScreensName.EMandiHomeScreen} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ScreensName.EMandiHomeScreen} component={EMandiHomeScreen} />
            <Stack.Screen name={ScreensName.RequestForAuction} component={RequestForAuction} />
            <Stack.Screen name={ScreensName.MyAuctions} component={MyAuctions} />
            <Stack.Screen name={ScreensName.Auctions} component={Auctions} />
            <Stack.Screen name={ScreensName.AuctionHistory} component={AuctionHistory} />
            <Stack.Screen name={ScreensName.AuctionSubmissionSuccess} component={AuctionSubmissionSuccess} />
            <Stack.Screen name={ScreensName.LiveAuctions} component={LiveAuctions} />
            <Stack.Screen name={ScreensName.AuctionDetails} component={AuctionDetails} />
            <Stack.Screen name={ScreensName.MyAuctionDetail} component={MyAuctionDetail} />
            <Stack.Screen name={ScreensName.AuctionHistoryDetails} component={AuctionHistoryDetails} />
            <Stack.Screen name={ScreensName.AuctionHistoryPaymentMethod} component={AuctionHistoryPaymentMethod} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default EMandiMainStack;
