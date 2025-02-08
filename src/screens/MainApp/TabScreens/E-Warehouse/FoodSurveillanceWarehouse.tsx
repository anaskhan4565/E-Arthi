import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { MMKV } from "react-native-mmkv";

import Navbar from "../../Navbar/Navbar.jsx";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp.jsx";
import colors from "../../../../../util/colors.js";
import { fonts } from "../../../../../util/FontName.js";
import ScreensName from "../../../../../util/ScreensName.ts";

function FoodSurveillanceWarehouse(): React.JSX.Element {
    const { t } = useTranslation();
    const storage = new MMKV();
    const navigation = useNavigation();

    const handlePress = (name: string) => {
        // storage.set("SurveilledWarehouse", name);
        // navigation.navigate(ScreensName.FoodSurveillanceWarehouse)
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.searchContainer}>
                    <CustomSearchApp
                        placeholder={t("Search in here")}
                        value={undefined}
                        onChangeText={undefined}
                    />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        {t(storage.getString("SurveilledWarehouse"))}
                    </Text>
                </View>
                <View style={styles.bodyContainer}>
                    <View style={styles.scrollContainer}>
                        <View style={styles.SummaryBox}>
                            <View style={styles.ImageBox}></View>
                            <View style={styles.ContentBox}>
                                <View style={styles.ItemDetails}>
                                    <View style={styles.DetailRow}>
                                        <Text style={styles.DetailText}>
                                            {t("Item sent on: ")}
                                        </Text>
                                        <Text style={[styles.DetailText, {fontFamily: fonts.Medium}]}>
                                            {t("08-02-2025")}
                                        </Text>
                                    </View>
                                    <View style={styles.DetailRow}>
                                        <Text style={styles.DetailText}>
                                            {t("Number of items: ")}
                                        </Text>
                                        <Text style={[styles.DetailText, {fontFamily: fonts.Medium}]}>
                                            {t("5")}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.ItemSummary}>
                                    <Text>Items Summary</Text>
                                    <View style={styles.ChartContainer}>
                                        <View style={styles.Chart}></View>
                                        <View style={styles.ChartLegend}></View>
                                    </View>
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
        height: hp("8.5%"),
        backgroundColor: colors.WHITE,
    },
    searchContainer: {
        marginVertical: hp("3.2%"),
        height: hp("7%"),
    },
    bodyContainer: {
        alignItems: "center",
        alignSelf: "center",
    },
    titleContainer: {
        paddingHorizontal: hp(1),
        marginLeft: wp(5),
    },
    titleText: {
        fontFamily: fonts.Medium,
        fontSize: hp(2.9),
    },
    scrollContainer: {
        justifyContent: "center",
        paddingVertical: hp("2%"),
        alignItems: "center",
    },
    itemBoxWrapper: {
        width: "30%",
        marginBottom: hp("2%"),
        marginHorizontal: wp("-3%"),
        alignItems: "center",
    },
    SummaryBox: {
        backgroundColor: colors.LIGHT_GREEN,
        width: wp(85),
        height: hp(17),
        flexDirection: "row",
    },
    ImageBox: {
        flex: 1,
        borderColor: colors.GREEN,
        borderRightWidth: 2,
    },
    ContentBox: {
        flex: 1.5,
        // borderWidth: 1
    },
    ItemDetails: {
        borderColor: colors.GREEN,
        borderBottomWidth: 2,
        flex: 1,
    },
    ItemSummary: {
        // borderWidth: 1,
        flex: 1.5,
    },
    ChartContainer: {
        // borderWidth: 1,
        flexDirection: "row",
        flex: 1,
    },
    Chart: {
        // borderWidth: 1,
        flex: 1,
    },
    ChartLegend: {
        // borderWidth: 1,
        flex: 1.5,
    },
    DetailRow: {
      flexDirection: "row",
      margin: hp(.3)
    },
    DetailText: {
      fontFamily: fonts.Regular,
      fontSize: hp(1.5  )
    }
});

export default FoodSurveillanceWarehouse;
