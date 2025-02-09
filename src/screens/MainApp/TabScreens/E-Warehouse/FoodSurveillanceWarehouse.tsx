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
import PieChart from "react-native-pie-chart"
import WarehouseIcon from "../../../../assets/warehouse.png";
import CustomPicker from "../../EMandi/CustomComp/CustomPicker.jsx";
import FoodSurveillanceItems from "../../../../../util/FoodSurveillanceItems.js";
import ItemStatusBox from "./CustomStylesComp/ItemStatusBox.tsx";

function FoodSurveillanceWarehouse(): React.JSX.Element {
    const { t } = useTranslation();
    const storage = new MMKV();
    const navigation = useNavigation();

    const handlePress = (name: string,status: Number) => {
        storage.set("itemName", name);
        storage.set("itemStatus", status);
        navigation.navigate(ScreensName.FoodSurveillanceItem)
    };
    const data = {
      data: [0.75], // 75% progress
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
                            <View style={styles.ImageBox}>
                                <Image source={WarehouseIcon} style={styles.Image} />
                            </View>
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
                                    <Text style={[styles.Subheading,{marginLeft: wp(2), marginTop: hp(.4)}]}>Items Summary</Text>
                                    <View style={styles.ChartContainer}>
                                        <PieChart
                                            widthAndHeight={wp(11)}
                                            series = {[{value: 70, color: "rgb(0, 169, 128)"},{value: 30, color: "rgb(235, 169, 40)"}]}
                                            cover={0.65}
                                            style={styles.Chart}
                                        />
                                        <View style={styles.ChartLegend}>
                                            <View style={{flexDirection: "row", marginVertical: hp(.4)}}>
                                                <Text style={[styles.LegendPercentage,{color: "rgb(0, 169, 128)"}]}>70%</Text>
                                                <Text style={styles.LegendText}>crops are fresh</Text>
                                            </View>
                                            <View style={{flexDirection: "row", marginVertical: hp(.4)}}>
                                                <Text style={[styles.LegendPercentage,{color: "rgb(235, 169, 40)"}]}>30%</Text>
                                                <Text style={[styles.LegendText]}>crops are almost ripe</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style = {styles.ItemsContainer}>
                            <View style = {styles.ItemsHeader}>
                                <Text style={styles.Subheading}>Items in Warehouse</Text>
                                <CustomPicker items={[{label: "Vegetable", value: "Vegetables"}]}
                                    key={0} isheader={false}
                                        w_given={wp(35)}
                                        hp_given={hp(1)}
                                        min_given={wp(35)}
                                        bg_color_on={true}
                                        bd_give={true}
                                        color_bd={colors.BLACK}
                                        isThatColor={true}
                                        placeholder={t("All items")}
                                    />
                            </View>
                            <View style = {styles.ItemsBody}>
                            {FoodSurveillanceItems
                                .filter((item) => item.name.trim() !== "") // Filter out empty names
                                .map((item, index) => (
                                    <ItemStatusBox
                                    key={index}
                                    name={item.name}
                                    status={item.status}
                                    bodyData={[
                                        { label: "Quantity", data: item.qty },
                                        { label: "Price", data: item.price },
                                        { label: "Expiry date", data: item.date },
                                    ]}
                                    statusTrueText={"Fresh"}
                                    statusFalseText={"Almost ripe"}
                                    onPress={() => {handlePress(item.name,item.status)}}
                                    />
                                ))}
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
        marginTop: hp(-3)
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
        width: wp(90),
        height: hp(17),
        flexDirection: "row",
    },
    ImageBox: {
        flex: 1,
        borderColor: colors.GREEN,
        borderRightWidth: 2,
        alignItems: "center",
        justifyContent: "center"
    },
    Image: {
        width: hp(10),
        height: hp(10)
    },
    ContentBox: {
        flex: 1.7,
    },
    ItemDetails: {
        borderColor: colors.GREEN,
        borderBottomWidth: 2,
        flex: 1,
    },
    ItemSummary: {
        flex: 1.5,
    },
    Chart: {
        margin: wp(2),
        flexDirection: "row",
        flex: 1,
        alignSelf: 'center',
    },
    
    ChartContainer:{
        flexDirection: "row",
        
        flex: 1,
    },
    ChartLegend: {
        flex: 2,
    },
    LegendPercentage: {
        marginRight: wp(1),
        fontFamily: fonts.SemiBold,
    },
    LegendText: {
        fontFamily: fonts.Regular,
    },
    DetailRow: {
      flexDirection: "row",
      margin: hp(.3)
    },
    DetailText: {
      fontFamily: fonts.Regular,
      fontSize: hp(1.5  )
    },
    Subheading: {
      fontFamily: fonts.Medium,
      fontSize: hp(1.8)
    },
    ItemsContainer: {
        height: hp(60),
        width: wp(90),
        marginTop: hp (3),
    },
    ItemsHeader: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    ItemsBody:{
        // borderWidth: 1,
        flex: 9,
        flexWrap: "wrap",
        gap: wp(4),
        rowGap: hp(0)
    }
});

export default FoodSurveillanceWarehouse;
