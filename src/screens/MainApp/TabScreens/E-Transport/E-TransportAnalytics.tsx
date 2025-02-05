import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Modal,
    View,
    TouchableOpacity,
    Image,
    Alert,
    Button,
} from "react-native";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/FontName";
import Navbar from "../../Navbar/Navbar";
import { Picker } from '@react-native-picker/picker';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/colors";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp";
import ScreensName from "../../../../../util/ScreensName.ts";
import { useNavigation } from "@react-navigation/native";
import { AnalyticsDet } from "../../../../../util/E-Transport.js";
import TransportAnalyticsBox from "../../CustomComponent/TransportAnalyticsBox.jsx";
import Icon from "react-native-vector-icons/FontAwesome";

function ETransportAnalytics(): React.JSX.Element {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.searchbar}>
                    <CustomSearchApp placeholder={"Search in here"} />
                </View>
                <View style={styles.Titlebuttoncontainer}>
                    <Text style={{ fontFamily: fonts.SemiBold, fontSize: hp(2.8) }}>
                        {t("E-Transport")}
                    </Text>
                    <TouchableOpacity
                        style={styles.reorderButton}
                        onPress={() => {
                            navigation.navigate(ScreensName.ETransportNewTransport);
                        }}
                    >
                        <Text style={styles.reorderButtonText}>{t("New Transport")}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.analyticscontainer}>
                    {AnalyticsDet.map((data, index) =>
                        data.title.trim() !== "" && (
                            <TransportAnalyticsBox
                                key={index}
                                icon={data.icon}
                                title={data.title}
                                value={data.value}
                                graph={data.graph}
                                percentage={data.percentage}
                                w={wp("40")}
                                h={hp("19")}
                            />
                        )
                    )}
                </View>

                {/* Bottom container with the "This Month" button */}
                <View style={styles.bottomcontainer}>
                    <View style={styles.citycontainer}>
                        <Image
                            style={styles.image}
                            source={require("../../../../../src/assets/MainApp/E-Transport/City.png")}
                        />
                        <Text style={styles.citytext}>Popular City</Text>
                        <View style={styles.monthbutton}>
                            <Picker
                                style={styles.picker}
                                mode="dropdown"
                                itemStyle={styles.pickerItem}
                            >
                                <Picker.Item
                                    label={t('This month')}
                                    value=""
                                    style={styles.pickerItem}
                                />
                                <Picker.Item
                                    label={t('Last month')}
                                    value="1"
                                    style={styles.pickerItem}
                                />
                                <Picker.Item
                                    label={t('Last year')}
                                    value="2"
                                    style={styles.pickerItem}
                                />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.totalcitycontainer}>
                        <Text style={styles.totalcitytext}>Total Cities</Text>
                        <View style={styles.jakartacontainer}>
                            <Text style={styles.cityquantitytext}>102</Text>
                            <View style={styles.greenbox}></View>
                            <Text style={styles.jakartatext}>Jakarta</Text>
                        </View>
                    </View>


                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    reorderButton: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        borderColor: colors.GREEN,
        width: wp("29%"),
        height: hp("3.5%"),
        backgroundColor: colors.GREEN,
        borderWidth: 1,
    },
    reorderButtonText: {
        color: colors.WHITE,
        fontSize: hp("1.6%"),
        textAlign: "center",
    },
    navbarContainer: {
        height: hp(8.5),
        backgroundColor: colors.WHITE,
    },
    image: {
        resizeMode: "contain",
        width: wp(8),
        height: hp(5),
    },
    icon: {
        resizeMode: "contain",
        width: wp(4.2),
        height: hp(2),
        marginLeft: wp(2),
    },
    bottomcontainer: {
        width: wp(85),
        height: hp(25),
        alignSelf: "center",
        borderRadius: hp("1.3%"),
        backgroundColor: colors.WHITE,
        marginHorizontal: hp("1.4%"),
        marginVertical: hp("1.2%"),
        padding: hp("1%"),
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        flexDirection: "column",

    },
    picker: {
        height: hp(6),
        width: wp(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        paddingHorizontal: wp(2),
    },

    pickerItem: {
        fontSize: wp('3%'),
        height: hp('6%'),
        fontFamily: fonts.Regular,
    },
    monthbutton: {
        borderWidth: 1,
        borderRadius: 3,
        width: wp(30),
        height: hp(5),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "#D3D3D3",
        alignSelf: "flex-end",
        // marginLeft: wp(5),
        flexDirection: "row",
        paddingVertical: hp(1),
    },
    monthtext: {
        fontSize: hp(1.8),
        fontFamily: fonts.Regular,

    },
    citycontainer: {
        marginTop: hp(2),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-evenly',
        width: "100%",
    },

    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
        justifyContent: "center",
    },
    searchbar: {
        marginTop: hp(1.3),
        height: hp("7%"),
    },
    Titlebuttoncontainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: hp(1.2),
        marginTop: hp(0),
        marginHorizontal: wp(4),
        gap: wp(23),
    },
    analyticscontainer: {
        width: wp(100),
        height: hp(42),
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingHorizontal: wp(2),
        marginTop: hp(2),
    },
    citytext: {
        fontFamily: fonts.SemiBold,
        fontSize: hp(2.2),
        marginRight: wp(5),
    },
    totalcitytext: {
        color: colors.GREEN,
        fontSize: hp(2),
        fontFamily: fonts.SemiBold,
    },
    totalcitycontainer: {
        marginTop: hp(2),
        width: wp(70),
        alignSelf: "center",
    },
    jakartacontainer: {
        flexDirection: "row",
        height: hp(5),
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    jakartatext: {
        fontSize: hp(2),
        fontFamily: fonts.Regular,
        marginRight: wp(7),
    },
    greenbox: {
        height: hp(3.6),
        width: wp(15),
        backgroundColor: colors.GREEN,
        marginLeft: wp(10),
    },
    cityquantitytext: {
        fontSize: hp(3),
        fontFamily: fonts.SemiBold,
        alignSelf: 'flex-start',
    },
    scrollViewContainer: {
        flexGrow: 1,
        paddingBottom: hp(5),
    },
});

export default ETransportAnalytics;
