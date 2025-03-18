import ScreensName from "../Constants/ScreensName";

const allNames = [
  { name: "E-Loan", screen: ScreensName.ELoanMainStack, source: require("../../src/assets/MainApp/HomeScreen/loan.png"), },
  { name: "E-Munshi", screen: ScreensName.EMunshiMainStack, source: require("../../src/assets/MainApp/HomeScreen/munshi.png"), },
  { name: "E-MarketPlace", screen: ScreensName.EMarket, source: require("../../src/assets/MainApp/HomeScreen/market.png"), },
  { name: "E-Inventory", screen: ScreensName.EInventoryMainStack, source: require("../../src/assets/MainApp/HomeScreen/inventory.png"), },
  { name: "E-Broker", screen: "", source: require("../../src/assets/MainApp/HomeScreen/munshi.png"), },
  { name: "E-Vendors", screen: ScreensName.EVendorsMainStack, source: require("../../src/assets/MainApp/HomeScreen/vendor.png"), },
  { name: "E-Orders", screen: ScreensName.EOrderMainStack, source: require("../../src/assets/MainApp/HomeScreen/orders.png"), },
  { name: "E-WareHouse", screen: ScreensName.EWarehouseMainStack, source: require("../../src/assets/MainApp/HomeScreen/warehouse.png"), },
  { name: "E-Mandi", screen: ScreensName.EMandi, source: require("../../src/assets/MainApp/HomeScreen/market.png"), },
  { name: "E-Transport", screen: ScreensName.ETransportStack, source: require("../../src/assets/MainApp/HomeScreen/market.png"), },
  { name: "Others", screen: "", source: require("../../src/assets/MainApp/HomeScreen/market.png"), },


];

export default allNames;
