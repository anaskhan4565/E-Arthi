import ScreensName from './ScreensName';

export default [
    {name: "Language",icon: require('../src/assets/language_symbol_green.png') , Screen: ScreensName.ProfileChangeLanguage},
    {name: "Location",icon: require('../src/assets/MainApp/Sidebar/Location.png') ,Screen : "",},
    {name: "Recieving Methods",icon: require("../src/assets/MainApp/Sidebar/Profile.png"), Screen: ScreensName.Recieving},
    {name: "Loan Request",icon: require("../src/assets/MainApp/Sidebar/Profile.png"),Screen : "",},
    {name: "Transaction History",icon: require("../src/assets/MainApp/Sidebar/Profile.png"),Screen : "",},
    {name: "Payment Method",icon: require('../src/assets/MainApp/Sidebar/Wallet.png'),Screen : "",},
    {name: "Terms & Conditions",icon: require("../src/assets/MainApp/Sidebar/Profile.png"),Screen : "",},
    {name: "Contact Us",icon: require('../src/assets/MainApp/Sidebar/Message.png'),Screen : "",},
];
