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
        "status": "Active",
        "Date": "2025-02-10",
        "Location": "Store A",
        "Time": "14:30",
        "Items": [
            { "name": "Laptop", "qty": 2, "price": 1200 },
            { "name": "Mouse", "qty": 1, "price": 2500 },
            { "name": "Gpu", "qty": 2, "price": 20000 },
        ],
        "Vendor": "TechMart",
    },
    {
        "id": 1215,
        "number": 2,
        "status": "Complete",
        "Date": "2025-02-11",
        "Location": "Online Store B",
        "Time": "09:15",
        "Items": [
            { "name": "Headphones", "qty": 2, "price": 75.00 },
            { "name": "Keyboard", "qty": 1, "price": 45.00 }
        ],
        "Vendor": "AudioGear",
    },
    {
        "id": 1216,
        "number": 3,
        "status": "Active",
        "Date": "2025-02-12",
        "Location": "Store C",
        "Time": "17:45",
        "Items": [
            { "name": "Monitor", "qty": 1, "price": 300 }
        ],
        "Vendor": "VisionTech",
    },
    {
        "id": 1217,
        "number": 4,
        "status": "Active",
        "Date": "2025-02-10",
        "Location": "Store A",
        "Time": "14:30",
        "Items": [
            { "name": "Laptop", "qty": 2, "price": 1200 },
            { "name": "Mouse", "qty": 1, "price": 2500 },
            { "name": "Gpu", "qty": 2, "price": 20000 },
        ],
        "Vendor": "TechMart",
    },
    {
        "id": 1218,
        "number": 5,
        "status": "Complete",
        "Date": "2025-02-11",
        "Location": "Online Store B",
        "Time": "09:15",
        "Items": [
            { "name": "Headphones", "qty": 2, "price": 75.00 },
            { "name": "Keyboard", "qty": 1, "price": 45.00 }
        ],
        "Vendor": "AudioGear",
    },
]

function CashFlow(): React.JSX.Element {
    const { t } = useTranslation();
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <View style={{ flex: 7 }}>
                <View style={styles.searchbar}>
                    <CustomSearchApp placeholder={"Search in here"} />
                </View>
                <View style={styles.HeaderRow}>
                    <Text style={styles.headerText}>{t("Cash Flow")}</Text>
                </View>
                <View style={styles.gridContainer}>
                    
                    {
                    transactions.length>0? 
                    transactions.map((transaction, index) => (
                        <TouchableOpacity key={transaction.id} style={styles.rectangle} onPress={() => { navigation.navigate(ScreensName.EmunshiTransactionDetail, { transactiondata: transactions[index] }) }}>
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
