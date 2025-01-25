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
const DeliveryHist = [
    {
        desc: "Balsamic Rice",
        qty: "400lbs",
        cost: "$412.38",
        date: "10/23/2023"
    },
    {
        desc: "Basmati Rice",
        qty: "350lbs",
        cost: "$367.50",
        date: "10/24/2023"
    },
    {
        desc: "Jasmine Rice",
        qty: "300lbs",
        cost: "$315.00",
        date: "10/25/2023"
    },
    {
        desc: "Brown Rice",
        qty: "450lbs",
        cost: "$472.50",
        date: "10/26/2023"
    },
    {
        desc: "Balsamic Rice",
        qty: "400lbs",
        cost: "$412.38",
        date: "10/23/2023"
    },
    {
        desc: "Basmati Rice",
        qty: "350lbs",
        cost: "$367.50",
        date: "10/24/2023"
    },
    {
        desc: "Jasmine Rice",
        qty: "300lbs",
        cost: "$315.00",
        date: "10/25/2023"
    },
    {
        desc: "Brown Rice",
        qty: "450lbs",
        cost: "$472.50",
        date: "10/26/2023"
    },
    {
        desc: "Balsamic Rice",
        qty: "400lbs",
        cost: "$412.38",
        date: "10/23/2023"
    },
    {
        desc: "Basmati Rice",
        qty: "350lbs",
        cost: "$367.50",
        date: "10/24/2023"
    },
    {
        desc: "Jasmine Rice",
        qty: "300lbs",
        cost: "$315.00",
        date: "10/25/2023"
    },
    {
        desc: "Brown Rice",
        qty: "450lbs",
        cost: "$472.50",
        date: "10/26/2023"
    },

]

const AnalyticsDet = [
    {
        icon:require('../src/assets/MainApp/E-Transport/TotalDelivery.png'),
        title:"Total Deliveries",
        value:534,
        graph:require('../src/assets/MainApp/E-Transport/Upgraph.png'),
        percentage:"+21%",
    },
    {
        icon:require('../src/assets/MainApp/E-Transport/Complete.png'),
        title:"Complete",
        value:109,
        graph:require('../src/assets/MainApp/E-Transport/Upgraph.png'),
        percentage:"+28%",
    },
    {
        icon:require('../src/assets/MainApp/E-Transport/Pending.png'),
        title:"Pending",
        value:293,
        graph:require('../src/assets/MainApp/E-Transport/Upgraph.png'),
        percentage:"+19%",
    },
    {
        icon:require('../src/assets/MainApp/E-Transport/Refund.png'),
        title:"Refund",
        value:23,
        graph:require('../src/assets/MainApp/E-Transport/DownGraph.png'),
        percentage:"-10%",
    },

]
export { ETransportMaindet, ETransportNewTrans, ETransportTruckdet, DeliveryHist,AnalyticsDet }