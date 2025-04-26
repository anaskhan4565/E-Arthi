import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/Constants/FontName";
import Navbar from "../../Navbar/Navbar";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/Constants/colors";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp";
import { useNavigation } from "@react-navigation/native";
import ScreensName from "../../../../../util/Constants/ScreensName";

const transactions = [
    {
        "id": 1214,
        "number": 1,
        "status": "Complete",
        "Date": "2025-04-02",
        "Location": "Agri Market Lahore",
        "Time": "14:30",
        "Items": [
            { "name": "Sarsabz Urea", "qty": 3, "price": 2300 },
            { "name": "Sarsabz DAP", "qty": 1, "price": 9100 },
        ],
        "Vendor": "Agri Market ",
    },
  
    {
        "id": 1218,
        "number": 5,
        "status": "Complete",
        "Date": "2025-04-12",
        "Location": "Sialkot Agri Expo",
        "Time": "13:45",
        "Items": [
            { "name": "Syngenta Gengwei 550 SC", "qty": 1, "price": 2300 },
            { "name": "Sulphuric Acid", "qty": 1, "price": 9500 }
        ],
        "Vendor": "Agri Market ",
    },
    {
        "id": 1219,
        "number": 6,
        "status": "Active",
        "Date": "2025-04-15",
        "Location": "Faisalabad Warehouse",
        "Time": "10:30",
        "Items": [
            { "name": "Badshah Single Super Phosphate (SSP)", "qty": 2, "price": 4100 }
        ],
        "Vendor": "Agri Market ",
    },
    {
        "id": 1215,
        "number": 2,
        "status": "Active",
        "Date": "2025-04-05",
        "Location": "Online - E-Agri Store",
        "Time": "09:15",
        "Items": [
            { "name": "Movento 240 SC by Bayer", "qty": 2, "price": 2755 },
            { "name": "Acelan 20SL by FMC", "qty": 1, "price": 1055 }
        ],
        "Vendor": "Pesticide Direct",
    },
    {
        "id": 1216,
        "number": 3,
        "status": "Complete",
        "Date": "2025-04-07",
        "Location": "Islamabad Farmers Market",
        "Time": "17:45",
        "Items": [
            { "name": "PlantCare Plus by Terminix Pakistan", "qty": 1, "price": 3000 },
            { "name": "Sona Zinc", "qty": 2, "price": 2300 }
        ],
        "Vendor": "Green Solutions",
    },
    {
        "id": 1217,
        "number": 4,
        "status": "Active",
        "Date": "2025-04-10",
        "Location": "Mobile Dealer Visit",
        "Time": "11:30",
        "Items": [
            { "name": "Syngenta Primextra Gold", "qty": 2, "price": 1500 },
            { "name": "Syngenta Metribuzin", "qty": 1, "price": 600 },
            { "name": "Syngenta Logran 75 WG", "qty": 3, "price": 800 },
        ],
        "Vendor": "Syngenta Official Distributor",
    },
    {
        "id": 1220,
        "number": 7,
        "status": "Complete",
        "Date": "2025-04-18",
        "Location": "Multan Online Store",
        "Time": "09:15",
        "Items": [
            { "name": "Sarsabz CAN", "qty": 2, "price": 7000 },
            { "name": "Sarsabz Nitrophos (NP)", "qty": 1, "price": 8500 }
        ],
        "Vendor": "South Punjab Suppliers",
    },
   
    {
        "id": 1223,
        "number": 10,
        "status": "Active",
        "Date": "2025-04-3",
        "Location": "Mobile Retailer",
        "Time": "14:15",
        "Items": [
            { "name": "Acelan 20SL by FMC", "qty": 2, "price": 1055 },
            { "name": "PlantCare Plus by Terminix Pakistan", "qty": 1, "price": 3000 }
        ],
        "Vendor": "Farm Solutions Pakistan",
    },
    {
        "id": 1221,
        "number": 8,
        "status": "Active",
        "Date": "2025-04-20",
        "Location": "Karachi Distributor",
        "Time": "16:45",
        "Items": [
            { "name": "Sona Boron", "qty": 3, "price": 2000 },
            { "name": "MOP", "qty": 1, "price": 7700 }
        ],
        "Vendor": "Sindh Agro Services",
    },
    {
        "id": 1222,
        "number": 9,
        "status": "Complete",
        "Date": "2025-04-23",
        "Location": "Peshawar Market",
        "Time": "11:30",
        "Items": [
            { "name": "SOP", "qty": 1, "price": 11200 },
            { "name": "Sona Urea", "qty": 2, "price": 9200 }
        ],
        "Vendor": "KPK Agricultural Supply Co.",
    },
    {
        "id": 1224,
        "number": 11,
        "status": "Complete",
        "Date": "2025-04-1",
        "Location": "Quetta Agricultural Fair",
        "Time": "10:45",
        "Items": [
            { "name": "Movento 240 SC by Bayer", "qty": 1, "price": 2755 },
            { "name": "Syngenta Primextra Gold", "qty": 1, "price": 1500 }
        ],
        "Vendor": "Balochistan Agri Supply",
    },
    {
        "id": 1225,
        "number": 12,
        "status": "Active",
        "Date": "2025-02-30",
        "Location": "Gujranwala Depot",
        "Time": "13:00",
        "Items": [
            { "name": "Sarsabz Urea", "qty": 3, "price": 2300 },
            { "name": "Sarsabz DAP", "qty": 2, "price": 9100 },
            { "name": "Sona Zinc", "qty": 1, "price": 2300 }
        ],
        "Vendor": "Punjab Farm Services",
    },
    {
        "id": 1226,
        "number": 13,
        "status": "Active",
        "Date": "2025-03-25",
        "Location": "Online - E-Agri Store",
        "Time": "10:15",
        "Items": [
            { "name": "Badshah Single Super Phosphate (SSP)", "qty": 3, "price": 12900 },
            { "name": "Badshah Single Super Phosphate (SSP) (AGRI-CASH)", "qty": 3, "price": 12300 },
        ],
        "Vendor": "Agri Market ",
    },
    {
        "id": 1227,
        "number": 14,
        "status": "Active",
        "Date": "2025-04-25",
        "Location": "Online - E-Agri Store",
        "Time": "10:15",
        "Items": [
            { "name": "Hybird Okra Seeds (AGRI-CASH)", "qty": 2, "price": 1200 },
            { "name": "Hybird Okra Seeds ", "qty": 2, "price": 1400 },
            {"name": "Hybird Watermelon Seeds (AGRI-CASH)", "qty": 1, "price": 3500},
            {"name": "Hybird Watermelon Seeds ", "qty": 1, "price": 3700},

        ],
        "Vendor": "Agri Market ",
    },
]

function CashFlow(): React.JSX.Element {
    const { t } = useTranslation();
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>
            <View style={{ flex: 7 }}>
                <View style={styles.searchbar}>
                    <CustomSearchApp 
                        placeholder={"Search in here"} 
                        value="" 
                        onChangeText={() => {}}
                    />
                </View>
                <View style={styles.HeaderRow}>
                    <Text style={styles.headerText}>{t("Cash Flow")}</Text>
                </View>
                <View style={styles.gridContainer}>
                    
                    {
                    transactions.length>0? 
                    transactions.map((transaction, index) => (
                        <TouchableOpacity 
                            key={transaction.id} 
                            style={styles.rectangle} 
                            onPress={() => { 
                                navigation.navigate(ScreensName.EmunshiTransactionDetail as any, { 
                                    transactiondata: transactions[index] 
                                }) 
                            }}
                        >
                            <View style={styles.RectangleheaderRow}>
                                <Text style={[styles.transactionText, styles.transactionLabel]}>
                                    Transaction {index + 1}
                                </Text>
                                <View style={[styles.statusContainer, { backgroundColor: transaction.status === "Active" ? colors.BRIGHTGREEN : colors.BLUE }]}>
                                    <Text style={[styles.transactionText, styles.statusText]}>
                                        {transaction.status}
                                    </Text>
                                </View>
                            </View>
                            <Text style={styles.transactionText}>Date: {transaction.Date}</Text>
                            <Text style={styles.transactionText}>Items Purchased: {transaction.Items.reduce((total, item) => total + item.qty, 0)}</Text>
                            <Text style={styles.transactionText}>Vendor: {transaction.Vendor}</Text>
                            <Text style={styles.transactionText}>Amount: {transaction.Items.reduce((total, item) => total + (item.qty * item.price), 0)} Rs</Text>
                        </TouchableOpacity>
                    )):
                    <Text style={styles.transactionText2}>No transactions found</Text>
                    }
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    navbarContainer: {
        height: hp(8.5),
        backgroundColor: colors.WHITE,
    },
    transactionText2:{
        fontFamily: fonts.Medium,
        fontSize: hp(2.4),
        color: colors.GRAY,
        marginTop: hp(1),
        marginBottom: hp(1),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        
        marginHorizontal: wp(15),
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    searchbar: {
        marginTop: hp(1.3),
        height: hp("7%"),
    },
    HeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: wp(4),
        height: hp(5),
        marginTop: hp(2),
    },
    RectangleheaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        width: '100%',
    },
    headerText: {
        fontFamily: fonts.SemiBold,
        fontSize: hp(2.4)
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: wp(5),
    },
    rectangle: {
        width: wp(43),
        marginBottom: hp(2),
        padding: wp(2),
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 4,
        backgroundColor: colors.LIGHT_GREEN,
    },
    transactionText: {
        fontFamily: fonts.Regular,
        fontSize: hp(1.4),
    },
    transactionLabel: {
        fontFamily: fonts.SemiBold,
        fontSize: hp(1.4),
    },
    statusText: {
        fontFamily: fonts.Regular,
        fontSize: hp(1.1),
        color: colors.WHITE,
        padding: wp(0.5),
    },
    statusContainer: {
        backgroundColor: colors.BRIGHTGREEN,
        borderRadius: 3,
        paddingHorizontal: wp(1),
    },
});

export default CashFlow;
