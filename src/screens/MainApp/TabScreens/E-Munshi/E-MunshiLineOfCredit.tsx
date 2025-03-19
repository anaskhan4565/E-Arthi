import React from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Dimensions } from "react-native";
import Navbar from "../../Navbar/Navbar.jsx";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp.jsx";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import colors from "../../../../../util/Constants/colors.js";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/Constants/FontName.js";
import ScreensName from "../../../../../util/Constants/ScreensName.ts";
import GreenGraph from "../../../../../src/assets/MainApp/E-Munshi/green.svg";
import OrangeGraph from "../../../../../src/assets/MainApp/E-Munshi/orange.svg";
import PurpleGraph from "../../../../../src/assets/MainApp/E-Munshi/purple.svg";

function EmunshiLineOfCredit() {
    const { t } = useTranslation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.searchContainer}>
                    <CustomSearchApp placeholder={t("Search in here")} />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{t("Line of Credit")}</Text>
                </View>
                <View style={styles.summaryContainer}>
                    <View style={styles.summaryCard}>
                        <Text style={styles.cardTitle}>Summary of Loan</Text>
                        <Text>Loan taken on: <Text style={styles.boldText}>08-02-2025</Text></Text>
                        <Text>Loan amount: <Text style={styles.boldText}>50,000 Rupees</Text></Text>
                        <View style={styles.graphRow}>
                            <GreenGraph width={wp(20)} height={hp(15)} />
                            <View style={styles.amountcontainer}>
                                <View style={styles.amountrow}>
                                    <Text style={styles.greenText}>30,000 Rupees</Text>
                                    <Text style={styles.grayText2}>is cash</Text>
                                </View>
                                <View style={styles.amountrow}>
                                    <Text style={styles.grayText}>20,000 Rupees</Text>
                                    <Text style={styles.grayText2}>is line of credit</Text>
                                </View>

                            </View>
                        </View>
                    </View>
                    <View style={styles.summaryCard}>
                        <Text style={styles.cardTitle}>Summary of Cash</Text>
                        <View style={styles.graphRow}>
                            <OrangeGraph width={wp(20)} height={hp(15)} />
                            <View style={styles.amountcontainer}>
                                <View style={styles.amountrow}>
                                    <Text style={styles.orangeText}>20,000 Rupees</Text>
                                    <Text style={styles.grayText2}>spent</Text>
                                </View>
                                <View style={styles.amountrow}>
                                    <Text style={styles.grayText}>10,000 Rupees</Text>
                                    <Text style={styles.grayText2}>remaining</Text>
                                </View>

                            </View>
                        </View>
                    </View>
                    <View style={styles.summaryCard}>
                        <Text style={styles.cardTitle}>Summary of Line of Credit</Text>
                        <View style={styles.graphRow}>
                            <PurpleGraph width={wp(20)} height={hp(15)} />
                            <View style={styles.amountcontainer}>
                                <View style={styles.amountrow}>
                                    <Text style={styles.purpleText}>15,000 Rupees</Text>
                                    <Text style={styles.grayText2}>spent</Text>
                                </View>
                                <View style={styles.amountrow}>
                                    <Text style={styles.grayText}>5,000 Rupees</Text>
                                    <Text style={styles.grayText2}>remaining</Text>
                                </View>

                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    navbarContainer: {
        height: hp("8.2%"),
        backgroundColor: "white",
        marginTop: hp("0.14%"),
    },
    searchContainer: {
        marginTop: hp("3.2%"),
        height: hp("7%"),
        alignSelf: "flex-start",
        marginLeft: hp(1),
    },
    titleContainer: {
        marginHorizontal: hp(1),
    },
    titleText: {
        fontSize: hp(3),
        fontFamily: fonts.SemiBold,
        marginLeft: hp(2),

    },
    summaryContainer: {
        paddingHorizontal: hp(2),

        alignSelf: 'center',
    },
    summaryCard: {
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: 10,
        padding: hp(2),
        marginBottom: hp(2),
        marginVertical: hp(2),
        width: wp(90),
        alignSelf: 'center',
    },
    cardTitle: {
        fontSize: hp(2.5),
        fontFamily: fonts.SemiBold,
        marginBottom: hp(1),
    },
    graphRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: hp(1),
        justifyContent: 'space-between',
    },
    amountcontainer: {
        width: wp(55),
    },
    amountrow: {
        flexDirection: 'row',
    },

    boldText: {
        fontFamily: fonts.Bold,
    },
    greenText: {
        color: "green",
        fontFamily: fonts.Bold,
        fontSize: hp(1.7),
    },
    orangeText: {
        color: "orange",
        fontFamily: fonts.Bold,
        fontSize: hp(1.7),
    },
    purpleText: {
        color: "purple",
        fontFamily: fonts.Bold,
        fontSize: hp(1.7),
    },
    grayText: {
        color: "gray",
        fontFamily: fonts.Bold,
        fontSize: hp(1.7),
    },
    grayText2: {
        fontFamily: fonts.Regular,
        marginLeft: wp(1.8),
        fontSize: hp(1.7),
    },

});

export default EmunshiLineOfCredit;