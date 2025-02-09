import ScreensName from './ScreensName.ts';
const EloanDet = [
    {
        screen: ScreensName.EloanCurrentLoan,
        title: "Current Loan",
        SecondaryTitle:"Available Loan",
        img: require('../src/assets/MainApp/E-Loan/CurrentLoan.png'),
        amount:'Rs 25,000',
    },
    {
        screen: ScreensName.ELoanPending,
        title: "Pending Loan",
        img: require('../src/assets/MainApp/E-Loan/clock.png'),
      amount:'Rs 25,000'
    },
    {
        screen: ScreensName.ELoanNewBank,
        title: "New Loan",
        img: require('../src/assets/MainApp/E-Loan/loan.png')
    },
    {
        screen: ScreensName.EloanPreviousLoan,
        title: "Loan History",
        img: require('../src/assets/MainApp/E-Loan/loans.png')
    },
    {
        screen: ScreensName.ELoanWoanScreen2,
        title: "Women Loan Program",
        img: require('../src/assets/MainApp/E-Loan/women.webp')
    },


];
const ELoanBank = [
    {
        screen: ScreensName.EloanHBL,
        title: "Habib Bank",
        img: require('../src/assets/MainApp/E-Loan/HBL.png')
    },
    {
        screen: ScreensName.EloanBOP,
        title: "Bank Of Punjab",
        img: require('../src/assets/MainApp/E-Loan/BOP.png')
    },
    {
        screen: ScreensName.EloanZTBL,
        title: "Zari Tarakiyati Bank",
        img: require('../src/assets/MainApp/E-Loan/ZTBL.png')
    },
    {
        screen: ScreensName.EloanMeezan,
        title: "Meezan Bank",
        img: require('../src/assets/MainApp/E-Loan/Meezan.png')
    },
    {
        screen: ScreensName.ELoanFaisal,
        title: "Askari Bank",
        img: require('../src/assets/MainApp/E-Loan/AskariBank.png')
    },
];
const pendingloan = [
    {
        desc: "Loan #08098999917",
        time: "14:56 PM",
        cost: "PKR 23000",
        stat: false,
        date: "Today, 4 February 2025"
    },
    {
        desc: "Loan #08098999918",
        time: "15:30 PM",
        cost: "PKR 50000",
        stat: false,
        date: "Today, 4 February 2025"
    },
    {
        desc: "Loan #08098999919",
        time: "10:00 AM",
        cost: "PKR 120000",
        stat: false,
        date: "Tomorrow, 5 February 2025"
    },
    {
        desc: "Loan #08098999920",
        time: "09:15 AM",
        cost: "PKR 80000",
        stat: false,
        date: "6 February 2025"
    }
];

export { EloanDet, ELoanBank,pendingloan };
