import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreensName from '../../../../../util/Constants/ScreensName.ts';
import EAdviser from './EAdviser';
import AgriServices from './AgriServices';
import CropAdvisor from './CropAdvisor';
import ZoneDetails from './ZoneDetails';
import FertilizerAdvisor from './FertilizerAdvisor';
import FertilizerAdvisorSelectedCrop from './FertilizerAdvisorSelectedCrop.tsx';
import ApplicationInstructions from './ApplicationInstructions.tsx';
import FertilizationSchedule from './FertilizationSchedule.tsx';
import PricingAdvisor from './PricingAdvisor.tsx';
import ProfitMaximisation from './ProfitMaximisation.tsx';
import ProductPricing from './ProductPricing.tsx';
import YieldTracker from './YieldTracker.tsx';
import CropYield from './CropYield.tsx';
import Diagnostics from './Diagnostics.tsx';
import CropDiagnostics from './CropDiagnostics.tsx';
import SoilTesting from './SoilTesting.tsx';
import RequestSoilTesting from './RequestSoilTesting.tsx';
import SoilTestingReport from './SoilTestingReport.tsx';
import EMarketMainStack from '../Home/EMarketMainStack.jsx';
import Packaging from './Packaging.tsx';
import GradingInfo from './GradingInfo.tsx';
import Grading from './Grading.tsx';
import RequestGrading from './RequestGrading.tsx';
import RequestGradingDone from './RequestGradingDone.tsx';
import ViewPackage from './ViewPackage.tsx';
import CreatePackageDetails from './CreatePackageDetails.tsx';
import CreatePackage from './CreatePackage.tsx';

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
            <Stack.Screen name={ScreensName.FertilizerAdvisorSelectedCrop} component={FertilizerAdvisorSelectedCrop} />
            <Stack.Screen name={ScreensName.ApplicationInstructions} component={ApplicationInstructions} />
            <Stack.Screen name={ScreensName.FertilizationSchedule} component={FertilizationSchedule} />
            <Stack.Screen name={ScreensName.PricingAdvisor} component={PricingAdvisor} />
            <Stack.Screen name={ScreensName.ProfitMaximisation} component={ProfitMaximisation} />
            <Stack.Screen name={ScreensName.ProductPricing} component={ProductPricing} />
            <Stack.Screen name={ScreensName.YieldTracker} component={YieldTracker} />
            <Stack.Screen name={ScreensName.CropYield} component={CropYield} />
            <Stack.Screen name={ScreensName.Diagnostics} component={Diagnostics} />
            <Stack.Screen name={ScreensName.CropDiagnostics} component={CropDiagnostics} />
            <Stack.Screen name={ScreensName.SoilTesting} component={SoilTesting} />
            <Stack.Screen name={ScreensName.RequestSoilTesting} component={RequestSoilTesting} />
            <Stack.Screen name={ScreensName.SoilTestingReport} component={SoilTestingReport} />
            <Stack.Screen name={ScreensName.EMarketMainStack} component={EMarketMainStack} />
            <Stack.Screen name={ScreensName.Packaging} component={Packaging} />
            <Stack.Screen name={ScreensName.GradingInfo} component={GradingInfo} />
            <Stack.Screen name={ScreensName.Grading} component={Grading} />
            <Stack.Screen name={ScreensName.RequestGrading} component={RequestGrading} />
            <Stack.Screen name={ScreensName.RequestGradingDone} component={RequestGradingDone} />
            <Stack.Screen name={ScreensName.ViewPackage} component={ViewPackage} />
            <Stack.Screen name={ScreensName.CreatePackageDetails} component={CreatePackageDetails} />
            <Stack.Screen name={ScreensName.CreatePackage} component={CreatePackage} />
        </Stack.Navigator>
    );
};

export default EAdviserMainStack; 