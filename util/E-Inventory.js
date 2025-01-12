import ScreensName from './ScreensName.ts';
const EInventoryDet = [
    {
        screen: ScreensName.Inventory,
        title: "Inventory",
        img: require('../src/assets/MainApp/E-Inventory/Inventory.png')
    },
    {
        screen: ScreensName.Sales,
        title: "Sales",
        img: require('../src/assets/MainApp/E-Inventory/Sales.png')
    },
    {
        screen: ScreensName.Suppliers,
        title: "Suppliers",
        img: require('../src/assets/MainApp/E-Inventory/Suppliers.png')
    },
];

const InventoryDet = [
    {
        screen: ScreensName.PurchaseHistory,
        title: "Purchase History",
        img: require('../src/assets/MainApp/E-Inventory/PurchaseHistory.png')
    },
    {
        screen: ScreensName.InventoryMonitoring,
        title: "Inventory Monitoring",
        img: require('../src/assets/MainApp/E-Inventory/InventoryMonitoring.png')
    },
];

export { InventoryDet, EInventoryDet };
