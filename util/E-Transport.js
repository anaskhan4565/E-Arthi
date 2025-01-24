import ScreensName from './ScreensName.ts';
const ETransportMaindet = [

    {
        screen: ScreensName.ETransportAnalytics,
        title: "E-Transport Analytics",
        img: require('../src/assets/MainApp/E-Inventory/Inventory.png')
    },
    {
        screen: ScreensName.ETransportDeliveryHistory,
        title: "Delivery History",
        img: require('../src/assets/MainApp/E-Inventory/Sales.png')
    },
];

const ETransportNewTrans = [

    {
        screen: ScreensName.ETransportTruck,
        title: "Truck",
        img: require('../src/assets/MainApp/E-Inventory/E-InventorySupplier/einventorysupplier.png')
    },
    {
        screen: ScreensName.ETransportAir,
        title: "Air",
        img: require('../src/assets/MainApp/E-Inventory/E-InventorySupplier/einventorysupplier.png')
    },
    {
        screen: ScreensName.ETransportShip,
        title: "Ship",
        img: require('../src/assets/MainApp/E-Inventory/E-InventorySupplier/einventorysupplier.png')
    },
];
const ETransportTruckdet = [

    {
        title: " Box trucks",
    },
    {
        title: "Chiller trucks",
    },
    {
        title: "Dry trucks",
    },
    {
        title: "Refrigerated trucks",
    },
    {
        title: "Flatbed trucks",
    },
    {
        title: "Freight trucks",
    },

];

export { ETransportMaindet,ETransportNewTrans,ETransportTruckdet }