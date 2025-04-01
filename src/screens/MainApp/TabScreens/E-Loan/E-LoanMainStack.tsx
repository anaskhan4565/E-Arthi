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
import ELoanFaisal from "./E-LoanAskari";
import ELoanWoanScreen2 from "./E-LoanWomanScreen2";
import ELoanPending from "./E-LoanPending";
import ELoanHome from "../E-LoanNew/NewLoan/ELoanHome";
import EENewLoan from "../E-LoanNew/NewLoan/ELoanNewLoan";
import ELoanRequestNewLoan from "../E-LoanNew/NewLoan/ELoanRequestNewLoan";
import ELoanRequest2 from "../E-LoanNew/NewLoan/ELoanRequest2";
import ELoanRequest3 from "../E-LoanNew/NewLoan/ELoanRequest3";
import ELoanSuccess from "../E-LoanNew/NewLoan/ELoanSuccess";
import ELoanHistory from "../E-LoanNew/History/ELoanHistory";
import ELoanEach from "../E-LoanNew/History/ELoanEach";
import PendingLoan from "../E-LoanNew/PendingLoan/PendingLoan";
import CurrentLoanNew from "../E-LoanNew/CurrentLoan/CurrentLoanNew";
import MadadgarHome from "../E-LoanNew/Madadgar/MadadgarHome";
import MadadgarS2 from "../E-LoanNew/Madadgar/MadadgarS2";
import MadadgarS3 from "../E-LoanNew/Madadgar/MadadgarS3";
import MadadgarSuccess from "../E-LoanNew/Madadgar/MadadgarSuccess";

// Import Minority Loan screens
import MinorityL from "../E-LoanNew/MinorityLoan/MinorityL";
import MinorityLS2 from "../E-LoanNew/MinorityLoan/MinorityLS2";
import MinorityLS3 from "../E-LoanNew/MinorityLoan/MinorityLS3";
import MinorityLSuccess from "../E-LoanNew/MinorityLoan/MinorityLSuccess";

// Import Women Loan screens
import WomenLoan from "../E-LoanNew/WomenLoan/WomenLoan";
import WomenLoanS2 from "../E-LoanNew/WomenLoan/WomenLoanS2";
import WomenLoanS3 from "../E-LoanNew/WomenLoan/WomenLoanS3";
import WomenLoanSuccess from "../E-LoanNew/WomenLoan/WomenLoanSuccess";

// Import Micro Finance screens
import MicroF from "../E-LoanNew/MicroFinance/MicroF";
import MicroFS2 from "../E-LoanNew/MicroFinance/MicroFS2";
import MicroFS3 from "../E-LoanNew/MicroFinance/MicroFS3";
import MicroFSuccess from "../E-LoanNew/MicroFinance/MicroFSuccess";

const Stack = createNativeStackNavigator();


function ELoanMainStack(): React.JSX.Element {
    return (
        //  <I18nextProvider i18n={i18next}>
        <Stack.Navigator initialRouteName={ScreensName.ELoanNew} screenOptions={{ headerShown: false }}>
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
            <Stack.Screen name={ScreensName.ELoanFaisal} component={ELoanFaisal} />
            <Stack.Screen name={ScreensName.ELoanWoanScreen2} component={ELoanWoanScreen2} />
            <Stack.Screen name={ScreensName.ELoanPending} component={ELoanPending} />

            {/* //New screens */}
            <Stack.Screen name={ScreensName.ELoanNew} component={ELoanHome} />
            <Stack.Screen name={ScreensName.EENewLoan} component={EENewLoan} />
            <Stack.Screen name={ScreensName.ELoanRequestNewLoan} component={ELoanRequestNewLoan} />
            <Stack.Screen name={ScreensName.ELoanRequest2} component={ELoanRequest2} />
            <Stack.Screen name={ScreensName.ELoanRequest3} component={ELoanRequest3} />
            <Stack.Screen name={ScreensName.ELoanSuccess} component={ELoanSuccess} />
            <Stack.Screen name={ScreensName.ELoanHistory} component={ELoanHistory} />
            <Stack.Screen name={ScreensName.ELoanEach} component={ELoanEach} />
            <Stack.Screen name={ScreensName.ELoanPendingScreen} component={PendingLoan} />
            <Stack.Screen name={ScreensName.ELoanCurrentLoan} component={CurrentLoanNew} />
            <Stack.Screen name={ScreensName.ELoanMadadgar} component={MadadgarHome} />
            <Stack.Screen name={ScreensName.ELoanMadadgarS2} component={MadadgarS2} />
            <Stack.Screen name={ScreensName.ELoanMadadgarS3} component={MadadgarS3} />
            <Stack.Screen name={ScreensName.ELoanMadadgarSuccess} component={MadadgarSuccess} />

            {/* Minority Loan screens */}
            <Stack.Screen name={ScreensName.ELoanMinority} component={MinorityL} />
            <Stack.Screen name={ScreensName.ELoanMinorityS2} component={MinorityLS2} />
            <Stack.Screen name={ScreensName.ELoanMinorityS3} component={MinorityLS3} />
            <Stack.Screen name={ScreensName.ELoanMinoritySuccess} component={MinorityLSuccess} />

            {/* Women Loan screens */}
            <Stack.Screen name={ScreensName.ELoanWomen} component={WomenLoan} />
            <Stack.Screen name={ScreensName.ELoanWomenS2} component={WomenLoanS2} />
            <Stack.Screen name={ScreensName.ELoanWomenS3} component={WomenLoanS3} />
            <Stack.Screen name={ScreensName.ELoanWomenSuccess} component={WomenLoanSuccess} />

            {/* Micro Finance screens */}
            <Stack.Screen name={ScreensName.ELoanMicroF} component={MicroF} />
            <Stack.Screen name={ScreensName.ELoanMicroFS2} component={MicroFS2} />
            <Stack.Screen name={ScreensName.ELoanMicroFS3} component={MicroFS3} />
            <Stack.Screen name={ScreensName.ELoanMicroFSuccess} component={MicroFSuccess} />

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
