import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/FontName";
import Navbar from "../../Navbar/Navbar";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/colors";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp";

const transaction =
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
}

function TransactionDetail({ val1 = 10241, val2 = 5990 }): React.JSX.Element {
    const { t } = useTranslation();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <View style={{ flex: 7 }}>
                <View style={styles.searchbar}>
                    <CustomSearchApp placeholder={"Search in here"} />
                </View>
                <View style={styles.headerRow}>
                    <Text style={styles.headerText}>{"Transaction " + transaction.number}</Text>
                    <View style={[styles.statusContainer, { backgroundColor: transaction.status === "Active" ? colors.BRIGHTGREEN : colors.BLUE }]}>
                        <Text style={[styles.transactionText, styles.statusText]}>
                            {transaction.status}
                        </Text>
                    </View>
                </View>

                <View style={{ width:'100%', padding: wp(5) }}>
                    <View style={styles.row}>
                        <Text style={styles.transactionTextBold}>Date: </Text>
                        <Text style={styles.transactionText}>{transaction.Date}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.transactionTextBold}>Location: </Text>
                        <Text style={styles.transactionText}>{transaction.Location}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.transactionTextBold}>Time: </Text>
                        <Text style={styles.transactionText}>{transaction.Time}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.transactionTextBold}>Items Purchased: </Text>
                        <Text style={styles.transactionText}>{transaction.Items.reduce((total, item) => total + item.qty, 0)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.transactionTextBold}>Vendor: </Text>
                        <Text style={styles.transactionText}>{transaction.Vendor}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.transactionTextBold}>Amount: </Text>
                        <Text style={styles.transactionText}>{transaction.Items.reduce((total, item) => total + (item.qty * item.price), 0)} Rs</Text>
                    </View>
                </View>
                <View style={styles.headerRow}>
                    <Text style={styles.headerText}>{"Details of Items"}</Text>
                </View>
                <View style={styles.tableContainer}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderText, styles.tableCellName]}>Name</Text>
                        <Text style={[styles.tableHeaderText, styles.tableCellQty]}>Qty</Text>
                        <Text style={[styles.tableHeaderText, styles.tableCellPrice]}>Price (Rs)</Text>
                    </View>
                    {transaction.Items.map((item, index) => (
                        <View key={index} style={[styles.tableRow, index === transaction.Items.length - 1 ? { borderBottomWidth: 0 } : {}]}>
                            <Text style={[styles.tableCell, styles.tableCellName]}>{item.name}</Text>
                            <Text style={[styles.tableCell, styles.tableCellQty]}>{item.qty}</Text>
                            <Text style={[styles.tableCell, styles.tableCellPrice, { borderRightWidth: 0 }]}>{item.price}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.headerRow}>
                    <Text style={styles.headerText}>{"Did Not Make This Transaction?"}</Text>
                </View>
                <Text style={[styles.transactionText, { width:'100%', padding: wp(5) }]}>
                    Dispute the transaction if you did not make it. Your dispute will be investigated by the team.
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Dispute Transaction</Text>
                    </TouchableOpacity>
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
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    searchbar: {
        marginTop: hp(1.3),
        height: hp("7%"),
    },
    headerRow: {
        marginTop: hp(1),
        flexDirection: "row",
        justifyContent: 'space-between',
        width: wp(100),
        paddingHorizontal: wp(5),
        alignItems: "center",
    },
    headerText: {
        fontFamily: fonts.SemiBold,
        fontSize: hp(2.4)
    },
    statusText: {
        fontFamily: fonts.Regular,
        fontSize: hp(2),
        color: colors.WHITE,
    },
    statusContainer: {
        backgroundColor: colors.BRIGHTGREEN,
        borderRadius: 5,
        paddingHorizontal: 2,
    },
    transactionTextBold: {
        fontFamily: fonts.SemiBold,
        fontSize: hp(1.8),
    },
    transactionText: {
        fontFamily: fonts.Regular,
        fontSize: hp(1.8),
    },
    row: {
        flexDirection: 'row',
    },
    tableContainer: {
        marginTop: hp(1),
        padding: wp(5),
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: wp(2),
        backgroundColor: colors.LIGHTGRAY,
    },
    tableHeaderText: {
        fontFamily: fonts.SemiBold,
        fontSize: hp(1.8),
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: wp(2),
        borderBottomWidth: 1,
        borderColor: colors.GREEN,
    },
    tableCell: {
        fontFamily: fonts.Regular,
        fontSize: hp(1.8),
        textAlign: 'center',
        borderRightWidth: 1,
        borderColor: colors.GREEN,
        paddingVertical: hp(1),
    },
    tableCellName: {
        flex: 0.5,
    },
    tableCellQty: {
        flex: 0.2,
    },
    tableCellPrice: {
        flex: 0.3,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: hp(2),
    },
    button: {
        backgroundColor: colors.GREEN,
        padding: hp(1),
        borderRadius: 5,
    },
    buttonText: {
        color: colors.WHITE,
        fontFamily: fonts.SemiBold,
        fontSize: hp(1.5),
    },
});

export default TransactionDetail;
