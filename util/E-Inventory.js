import ScreensName from './ScreensName.ts';
const EInventoryDet = [

    {
        screen: ScreensName.Inventory,
        title: "Inventory",
        img: require('../src/assets/MainApp/E-Inventory/Inventory.png')
    },
    {
        screen: ScreensName.Sales,
        title: "Sales & Purchase Orders",
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

const InventorySupplierDet = [
    {
        screen: ScreensName.EInventorySuppliersList,
        title: "Supplier List",
        img: require('../src/assets/MainApp/E-Inventory/E-InventorySupplier/einventorysupplier.png')
    },
    {
        screen: ScreensName.EInventorySupplierReports,
        title: "Download Report",
        img: require('../src/assets/MainApp/E-Inventory/E-InventorySupplier/einventorysupplier.png')
    },
    
];

const InventorySuppliersListDet = [
    {
        id: "S101",
        name: "ABC Electronics",
        item: "Microprocessors"
    },
    {
        id: "S102",
        name: "Global Parts Co.",
        item: "Circuit Boards"
    },
    {
        id: "S103",
        name: "Tech Solutions Inc.",
        item: "Power Supplies"
    },
    {
        id: "S104",
        name: "Digital Components Ltd.",
        item: "LED Displays"
    },
    {
        id: "S105",
        name: "Precision Hardware",
        item: "Memory Modules"
    },
    {
        id: "S106",
        name: "Silicon Valley Parts",
        item: "Semiconductors"
    },
    {
        id: "S107",
        name: "Eastern Electronics",
        item: "Capacitors"
    },
    {
        id: "S108",
        name: "Quality Components",
        item: "Resistors"
    },
    {
        id: "S109",
        name: "Smart Systems",
        item: "Sensors"
    },
    {
        id: "S110",
        name: "Future Tech",
        item: "Display Panels"
    }
];

const SupplierReports = [
    'Inventory Summary - Feb 28, 2024',
    'Purchase Orders - Feb 21, 2024',
    'Supplier Performance - Feb 14, 2024',
    'Stock Analysis - Feb 07, 2024',
    'Delivery Times - Jan 31, 2024',
    'Cost Analysis - Jan 24, 2024',
    'Quality Metrics - Jan 17, 2024',
    'Returns Report - Jan 10, 2024',
    'Supplier Ratings - Jan 03, 2024',
    'Year-End Summary - Dec 31, 2023'
];

export { InventoryDet, EInventoryDet, InventorySupplierDet, InventorySuppliersListDet, SupplierReports };
