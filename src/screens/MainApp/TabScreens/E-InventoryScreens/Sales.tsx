import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
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
import MyPieChart from "../E-Loan/CustomComponents/PiChart";

function Sales(): React.JSX.Element {
    const { t } = useTranslation();
    const currency = "$"; // Currency header
    const [currentState, setCurrentState] = useState(0);

    useEffect(() => {
        console.log(currentState);
    }, [currentState]);

    const formatNumber = (num) => new Intl.NumberFormat("en-US").format(num ?? 0);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <View style={{ flex: 7 }}>
                <View style={styles.searchbar}>
                    <CustomSearchApp placeholder={t("Search sales & purchase orders")} />
                </View>
                <View style={styles.sectionTitle}>
                    <Text style={styles.mainTitle}>{t("Sales and Purchases Overview")}</Text>
                </View>

                {/* Sales & Purchase Pie Charts */}
                <View style={styles.chartContainer}>
                    <MyPieChart
                        legend1Name={t("Total Sales")}
                        legend1Population={150000}
                        legend2Name={t("Pending Orders")}
                        legend2Population={30000}
                        legend1_color="#FF6F61"
                        legend2_color="#FFA500"
                        chartHeight={hp(15)}
                    />

                    <MyPieChart
                        chartHeight={hp(15)}
                        legend1Name={t("Total Purchases")}
                        legend1Population={120000}
                        legend2Name={t("Outstanding Payments")}
                        legend2Population={45000}
                        legend1_color="#4A90E2"
                        legend2_color="#FF4500"

                    />
                </View>

                {/* Sales & Purchases Summary */}
                <View style={styles.MainHeader}>
                    <View style={styles.mainboxrow}>
                        <View style={styles.HeaderSection}>
                            <Text style={styles.SectionHead}>{t("Total Sales Amount")}</Text>
                            <Text style={styles.SectionBody}>
                                {currency} {formatNumber(150000)}
                            </Text>
                        </View>
                        <View style={styles.HeaderSection}>
                            <Text style={styles.SectionHead}>{t("Pending Sales")}</Text>
                            <Text style={styles.SectionBody}>
                                {currency} {formatNumber(30000)}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.mainboxrow}>
                        <View style={styles.HeaderSection}>
                            <Text style={styles.SectionHead}>{t("Total Purchases")}</Text>
                            <Text style={styles.SectionBody}>
                                {currency} {formatNumber(120000)}
                            </Text>
                        </View>
                        <View style={styles.HeaderSection}>
                            <Text style={styles.SectionHead}>{t("Outstanding Payments")}</Text>
                            <Text style={styles.SectionBody}>
                                {currency} {formatNumber(45000)}
                            </Text>
                        </View>
                    </View>
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
    sectionTitle: {
        marginBottom: hp(1.2),
        marginTop: hp(0),
        marginHorizontal: wp(5),
    },
    mainTitle: {
        fontFamily: fonts.bold,
        fontSize: hp(3),
    },
    chartContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    HeaderSection: {
        width: wp(40),
        height: hp(10),
        justifyContent: "center",
        margin: "1%",
        textAlign: "left",
    },
    SectionHead: {
        fontFamily: fonts.Medium,
        color: colors.GREEN,
        fontSize: hp(1.6),
    },
    SectionBody: {
        fontFamily: fonts.SemiBold,
        fontSize: hp(2.2),
    },
    MainHeader: {
        width: wp(90),
        height: hp(25),
        backgroundColor: colors.GREAT_WHITE,
        alignSelf: "center",
        borderRadius: hp(1),
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignContent: "space-between",
        padding: 10,
        elevation: 5,
    },
    mainboxrow: {
        flexDirection: "row",
        width: wp(100),
        height: hp(9),
        justifyContent: "space-between",
        flexWrap: "wrap",
        alignItems: "center",
    },
});

export default Sales;
