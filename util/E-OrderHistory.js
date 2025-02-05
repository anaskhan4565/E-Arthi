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
        screen: ScreensName.ETransportAddDetails,
        title: "Air",
        img: require('../src/assets/MainApp/E-Inventory/E-InventorySupplier/einventorysupplier.png')
    },
    {
        screen: ScreensName.ETransportAddDetails,
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
const OrderHist = [
    {
        desc: "Order #08098999917",
        time: "14:56 PM",
        cost: "PKR 2300",
        stat: false,
        date: "Today, 4 February 2025"
    },
    {
        desc: "Order #08098999917",
        time: "14:56 PM",
        cost: "PKR 2300",
        stat: false,
        date: "Today, 4 February 2025"
    },
    {
        desc: "Order #08098999917",
        time: "14:56 PM",
        cost: "PKR 2300",
        stat: false,
        date: "Today, 4 February 2025"
    },
    {
        desc: "Order #08098999917",
        time: "14:56 PM",
        cost: "PKR 2300",
        stat: false,
        date: "Today, 4 February 2025"
    }
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
export { ETransportMaindet, ETransportNewTrans, ETransportTruckdet, OrderHist,AnalyticsDet }