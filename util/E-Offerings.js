import ScreensName from "./ScreensName";

const allNames = [
  {
    name: "E-Market",
    screen: "",
    source: require("../src/assets/MainApp/HomeScreen/market.png"),
  },
  {
    name: "E-Munshi",
    screen: "",
    source: require("../src/assets/MainApp/HomeScreen/munshi.png"),
  },
  {
    name: "E-Inventory",
    screen: "",
    source: require("../src/assets/MainApp/HomeScreen/inventory.png"),
  },
  {
    name: "E-Loan",
    screen: ScreensName.ELoanMainStack,
    source: require("../src/assets/MainApp/HomeScreen/market.png"),
  },
  {
    name: "E-Collateral",
    screen: "",
    source: require("../src/assets/MainApp/HomeScreen/collateral.png"),
  },
  {
    name: "E-Orders",
    screen: "",
    source: require("../src/assets/MainApp/HomeScreen/orders.png"),
  },
  {
    name: "E-Vendors",
    screen: "",
    source: require("../src/assets/MainApp/HomeScreen/vendor.png"),
  },
  {
    name: "E-WareHouse",
    screen: ScreensName.EWarehouseMainStack,
    source: require("../src/assets/MainApp/HomeScreen/warehouse.png"),
  },
  {
    name: "E-Mandi",
    screen: ScreensName.EMandi,
    source: require("../src/assets/MainApp/HomeScreen/market.png"),
  },
  {
    name: "Others",
    screen: "",
    source: require("../src/assets/MainApp/HomeScreen/market.png"),
  },
];

export default allNames;
