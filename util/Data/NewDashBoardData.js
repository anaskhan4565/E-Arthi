// Import SVG assets from NewDrawerIcons folder
import EMarketIcon from '../../src/assets/MainApp/NewDrawerIcons/EMarketIcon.svg';
import EInventoryIcon from '../../src/assets/MainApp/NewDrawerIcons/EInventoryIcon.svg';
import EOrdersIcon from '../../src/assets/MainApp/NewDrawerIcons/E0rdersIcon.svg';
import ERentalIcon from '../../src/assets/MainApp/NewDrawerIcons/ERentalIcon.svg';
import ETransportIcon from '../../src/assets/MainApp/NewDrawerIcons/ETransportIcon.svg';
import EWareHouseIcon from '../../src/assets/MainApp/NewDrawerIcons/EWareHouseIcon.svg';
import EMandiIcon from '../../src/assets/MainApp/NewDrawerIcons/EMandiIcon.svg';
import EMunshiIcon from '../../src/assets/MainApp/NewDrawerIcons/EMunshiIcon.svg';
import SettelmentsIcon from '../../src/assets/MainApp/NewDrawerIcons/SettelmentsIcon.svg';
import AnimalFeedIcon from '../../src/assets/MainApp/NewDrawerIcons/AnimalFeedIcon.svg';
import EFoodSupply from '../../src/assets/MainApp/NewDrawerIcons/EFoodSupply.svg';
import EAdvisorIcon from '../../src/assets/MainApp/NewDrawerIcons/EAdvisorIcon.svg';
import PlantDoctorIcon from '../../src/assets/MainApp/NewDrawerIcons/PlantDoctorIcon.svg';
import LoanIcon from '../../src/assets/MainApp/NewDrawerIcons/LoanIcon.svg';

// Import screen names constants
import ScreensName from '../Constants/ScreensName.ts';

/**
 * Drawer navigation data with icons from NewDrawerIcons
 */
const NewDrawerData = [
    {
        id: 'loan',
        title: 'Loan',
        svgImage: LoanIcon,
        screen: ScreensName.ELoanMainStack,
        isNavigation: true,
    },
    {
        id: 'advisor',
        title: 'E-Advisor',
        svgImage: EAdvisorIcon,
        screen: ScreensName.EAdviserMainStack,
        isNavigation: true,
    },
    {
        id: 'marketplace',
        title: 'E-Market',
        svgImage: EMarketIcon,
        screen: ScreensName.EMarket,
        isNavigation: true,
    },
    {
        id: 'inventory',
        title: 'E-Inventory',
        svgImage: EInventoryIcon,
        screen: ScreensName.EInventoryMainStack,
        isNavigation: true,
    },
    // {
    //     id: 'orders',
    //     title: 'E-Orders',
    //     svgImage: EOrdersIcon,
    //     screen: ScreensName.EOrderMainStack,
    //     isNavigation: true,
    // },
    {
        id: 'plantdoctor',
        title: 'Plant Doctor',
        svgImage: PlantDoctorIcon,
        screen: ScreensName.PlantDoctorMainStack,
        isNavigation: true,
    },
    {
        id: 'rental',
        title: 'E-Rental',
        svgImage: ERentalIcon,
        screen: ScreensName.ERentalsMainStack,
        isNavigation: true,
    },
    {
        id: 'transport',
        title: 'E-Transport',
        svgImage: ETransportIcon,
        screen: ScreensName.ETransportStack,
        isNavigation: true,
    },
    {
        id: 'warehouse',
        title: 'E-Warehouse',
        svgImage: EWareHouseIcon,
        screen: ScreensName.EWarehouseMainStack,
        isNavigation: true,
    },
    {
        id: 'mandi',
        title: 'E-Mandi',
        svgImage: EMandiIcon,
        screen: ScreensName.EMandiMainStack,
        isNavigation: true,
    },
    {
        id: 'foodsupply',
        title: 'E-Food Supply',
        svgImage: EFoodSupply,
        screen: ScreensName.FoodSupplyScr,
        isNavigation: true,
    },
    {
        id: 'munshi',
        title: 'E-Munshi',
        svgImage: EMunshiIcon,
        screen: ScreensName.EMunshiMainStack,
        isNavigation: true,
    },
    {
        id: 'settlements',
        title: 'Settlements',
        svgImage: SettelmentsIcon,
        screen: ScreensName.SettlementsMainStack,
        isNavigation: true,
    },
    {
        id: 'animalfeed',
        title: 'Animal Feed',
        svgImage: AnimalFeedIcon,
        screen: "",
        isNavigation: true,
    },




];

export default NewDrawerData; 