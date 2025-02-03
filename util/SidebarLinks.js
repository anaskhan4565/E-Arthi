import ScreensName from "./ScreensName";

export default [
    { 
        name: "My Profile", 
        icon: require("../src/assets/MainApp/Sidebar/Profile.png"),
        screenName: "MyProfileScreen"
    },
    { 
        name: "My Orders", 
        icon: require('../src/assets/MainApp/Sidebar/Document.png'),
        screenName: "MyOrdersScreen"
    },
    { 
        name: "E-Arthi Khata", 
        icon: require("../src/assets/MainApp/Sidebar/Profile.png"),
        screenName: "EArthiKhataScreen"
    },
    { 
        name: "Language", 
        icon: require('../src/assets/MainApp/Sidebar/Message.png'),
        screenName: ScreensName.SelectLangSideBar
    },
    { 
        name: "Loan Request", 
        icon: require("../src/assets/MainApp/Sidebar/Profile.png"),
        screenName: ScreensName.EloanCurrentLoan
    },
    { 
        name: "Transaction History", 
        icon: require("../src/assets/MainApp/Sidebar/Profile.png"),
        screenName: "TransactionHistoryScreen"
    },
    { 
        name: "Delivery Address", 
        icon: require('../src/assets/MainApp/Sidebar/Location.png'),
        screenName: "DeliveryAddressScreen"
    },
    { 
        name: "Receiving Method", 
        icon: require('../src/assets/MainApp/Sidebar/Wallet.png'),
        screenName: ScreensName.Recieving
    },
    { 
        name: "Terms & Conditions", 
        icon: require("../src/assets/MainApp/Sidebar/Profile.png"),
        screenName: "TermsAndConditionsScreen"
    },
    { 
        name: "Contact Us", 
        icon: require('../src/assets/MainApp/Sidebar/Message.png'),
        screenName: "ContactUsScreen"
    },
];
