import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../util/colors.js';
import { BarChart } from "react-native-chart-kit";
import { useTranslation } from 'react-i18next';
import { fonts } from '../../../../../util/FontName.js';
import MyPieChart from '../E-Loan/CustomComponents/PiChart.jsx';
import CustomButton from '../../../../components/CustomButton.jsx';
import { useNavigation } from '@react-navigation/native';
import ScreensName from '../../../../../util/ScreensName.ts';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { MMKV } from 'react-native-mmkv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyPieChartSec from './CustomComponent/MyPiChartSec.jsx';

const EMunshiFarmName = () => {
    const { t } = useTranslation();
    const [selectedRange, setSelectedRange] = useState("today");
    const navigation = useNavigation();
    const storage = new MMKV();

    const [farm, setFarm] = useState<string | null>(null);

    useEffect(() => {
        const fetchWarehouse = async () => {
            const storedFarm = storage.getString("farm");
            setFarm(storedFarm);
        };
        fetchWarehouse();
    }, []);

    const getDataForRange = (range) => {
        switch (range) {
            case 'today':
                return {
                    labels: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM"],
                    datasets: [
                        {
                            data: [10, 30, 20, 40, 25, 35] || [],
                        },
                    ],
                };
            case 'lastMonth':
                return {
                    labels: ["W1", "W2", "W3", "W4"],
                    datasets: [
                        {
                            data: [100, 150, 120, 130] || [],
                        },
                    ],
                };
            case 'lastYear':
                return {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [
                        {
                            data: [500, 600, 450, 700, 550, 650, 600, 580, 620, 640, 700, 720] || [],
                        },
                    ],
                };
            default:
                return {
                    labels: [],
                    datasets: [{ data: [] }],
                };
        }
    };

    const chartData = getDataForRange(selectedRange);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.searchContainer}>
                    <CustomSearchApp placeholder={t('Search in here')} />
                </View>

                <Text style={styles.chartTitle}>{farm} Stats</Text>

                {/* Range Selection */}
                <View style={styles.rangeContainer}>
                    <TouchableOpacity
                        style={[
                            styles.rangeButton,
                            selectedRange === 'today' && styles.selectedRangeButton,
                        ]}
                        onPress={() => setSelectedRange('today')}
                    >
                        <Text
                            style={[
                                styles.rangeButtonText,
                                selectedRange === 'today' && styles.selectedRangeButtonText,
                            ]}
                        >
                            Today
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.rangeButton,
                            selectedRange === 'lastMonth' && styles.selectedRangeButton,
                        ]}
                        onPress={() => setSelectedRange('lastMonth')}
                    >
                        <Text
                            style={[
                                styles.rangeButtonText,
                                selectedRange === 'lastMonth' && styles.selectedRangeButtonText,
                            ]}
                        >
                            Last Month
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.rangeButton,
                            selectedRange === 'lastYear' && styles.selectedRangeButton,
                        ]}
                        onPress={() => setSelectedRange('lastYear')}
                    >
                        <Text
                            style={[
                                styles.rangeButtonText,
                                selectedRange === 'lastYear' && styles.selectedRangeButtonText,
                            ]}
                        >
                            Last Year
                        </Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.chartContainer}>
                    {chartData?.datasets?.[0]?.data?.length > 0 ? (
                        <BarChart
                            data={chartData}
                            width={wp(90)}
                            height={hp(30)}
                            yAxisLabel=""
                            withInnerLines={false}
                            chartConfig={{
                                backgroundColor: "white",
                                backgroundGradientFrom: "white",
                                backgroundGradientTo: "white",
                                decimalPlaces: 0,
                                color: (opacity = 1) => "blue",
                                barPercentage: 0.5,
                            }}
                            style={styles.chartStyle}
                        />

                    ) : (
                        <Text style={styles.noDataText}>No data available</Text>
                    )}
                </View>
                <View style={styles.unitsoldbox}>
                    <View style={styles.dollarcontainer}>
                        <Image style={styles.dollarimage} source={require('../../../../../src/assets/Icon/dollar.png')} />
                        <View style={styles.percentcontainer}>
                            <Text style={styles.percenttext}>+14%</Text>
                            <Text style={styles.lastmonthtext}> vs last month</Text>
                        </View>

                    </View>
                    <View style={styles.graphcontainer}>
                        <Text style={styles.unitsoldtext}>4214 units sold</Text>
                        <Image style={styles.graphimage} source={require('../../../../../src/assets/MainApp/E-Transport/Upgraph.png')} />
                    </View>

                </View>

                <View style={styles.yellowbox}>
                    <Image style={styles.clockimage} source={require('../../../../../src/assets/Icon/clock.png')} />
                    <View style={styles.pendingbox}>
                        <Text style={styles.paymenttext}>Payment Status:</Text>
                        <Text style={styles.pendingtext}> Pending</Text>
                    </View>

                </View>

                <View style={styles.piechatcontainer}>
                    <MyPieChartSec
                    data={[
                        { name: t("Pending Cash: PKR 12500"), value: 100000, color: "#693efe" },
                        { name: t("Cash Paid PKR 150000"), value: 25000, color: "#D3FE3E"}
                    ]}
                    paddingLeft={hp(9)}
                        
                        chartWidth={wp(75)}
                        chartHeight={hp(24)}
                        containerWidth={wp(80)}
                        containerHeight={hp(32)}
                    />
                </View>

                <Text style={styles.purchasehistorytext}>Purchase History Table</Text>

                <View style={styles.purchasehistorycontainer}>
                    <View style={styles.purchasehistoryverticlecontainer}>
                        <Text style={styles.quantitytext}>Quantity</Text>
                        <Text style={styles.pricetext}>1000 KG</Text>
                    </View>
                    <View style={styles.purchasehistoryverticlecontainer}>
                        <View>
                            <Text style={styles.quantitytext}>Selling price</Text>
                            <Text style={styles.quantitytext}>(Per unit)</Text>
                        </View>


                        <Text style={styles.pricetext}>Pkr 850</Text>
                    </View>
                    <View style={styles.purchasehistoryverticlecontainer}>
                        <View>
                            <Text style={styles.quantitytext}>Cost price</Text>
                            <Text style={styles.quantitytext}>(Per unit)</Text>
                        </View>


                        <Text style={styles.pricetext}>Pkr 385</Text>
                    </View>

                </View>

                <TouchableOpacity style={styles.recievingbutton} onPress={()=>navigation.navigate(ScreensName.RaastRecieving)}>
                    <Text style={styles.recievingmethodtext}> Receiving Method</Text>
                    <Image style={styles.raastimage} source={require('../../../../../src/assets/raast.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.recievingbutton} onPress={()=>navigation.navigate(ScreensName.BankRecieving)}>
                    <Text style={styles.recievingmethodtext}> Change Receiving Method</Text>
                    <Image style={styles.forwardimage} source={require('../../../../../src/assets/forward.png')} />
                </TouchableOpacity> 

                <View style={styles.farmcontactcontainer}>
                    <Text style={styles.farmcontacttext}>Farm Contact Information</Text>
                    <View style={styles.farmcontactecontainer}>
                        <Text style={styles.contacttext}> Owner Name</Text>
                        <View style={styles.addresscontainer}>
                            <Text style={styles.contacttext2}> Anas Khan</Text>
                        </View>

                    </View>
                    <View style={styles.farmcontactecontainer}>
                        <Text style={styles.contacttext}> Owner Contact</Text>
                        <View style={styles.addresscontainer}>
                            <Text style={styles.contacttext2}> +92-33327585471</Text>
                        </View>

                    </View>
                    <View style={styles.farmcontactecontainer}>
                        <Text style={styles.contacttext}> Farm Location</Text>
                        <View style={styles.addresscontainer}>
                            <Text style={styles.contacttext2}>GQ74+FVV, Civil Hospital Rd, Khairpur, Sindh</Text>
                        </View>

                    </View >
                    <View style={styles.farmcontactecontainer}>
                        <Text style={styles.contacttext}> Contact Deal</Text>
                        <View style={styles.addresscontainer}>
                            <Text style={styles.contacttext2}> No</Text>
                        </View>

                    </View>
                    <View style={styles.buttoncontainer}>
                        <CustomButton MainText={"Call owner"} BgGiven={colors.GREEN} txColor={colors.WHITE} />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EMunshiFarmName;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    navbarContainer: {
        height: hp('8.2%'),
        backgroundColor: colors.WHITE,
        justifyContent: 'center',
        paddingHorizontal: wp('4%'),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: hp('0.3%') },
        shadowOpacity: 0.1,
        shadowRadius: hp('0.5%'),
        elevation: 2,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: wp('4%'),
        paddingBottom: hp('5%'),
        //alignItems: 'center',
    },
    searchContainer: {
        marginVertical: hp('3%'),
        height: hp('7%'),
    },
    chartTitle: {
        textAlign: "left",
        marginBottom: hp('3%'),
        fontSize: hp('2.7%'),
        fontWeight: "bold",
        color: "#333",
    },
    rangeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: hp('2%'),
    },
    rangeButton: {
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('3%'),
        borderRadius: wp('2%'),
        backgroundColor: "#e0e0e0",
    },
    selectedRangeButton: {
        backgroundColor: colors.GREEN,
    },
    rangeButtonText: {
        fontSize: hp('2%'),
        color: "#333",
    },
    selectedRangeButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    chartContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: wp('2%'),
        padding: hp('2%'),
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: hp('0.3%') },
        shadowOpacity: 0.1,
        shadowRadius: hp('0.5%'),
        elevation: 3,
    },
    chartStyle: {
        marginVertical: hp('2%'),
        borderRadius: wp('2%'),
        alignSelf: "center",
    },
    noDataText: {
        textAlign: "center",
        marginTop: hp('2%'),
        fontSize: hp('2%'),
        color: "#333",
    },
    yellowbox: {
        backgroundColor: "#FFB93E",
        width: wp(80),
        height: hp(4.5),
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: hp(3),
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
    },
    paymenttext: {
        fontSize: hp(2),
        fontFamily: fonts.bold,

    },
    clockimage: {
        resizeMode: 'contain',
        width: wp(8),
        height: hp(2.8),
        marginRight: wp(6),
    },
    pendingtext: {
        fontSize: hp(2),
        fontFamily: fonts.bold,
        color: "#6495ED",
    },
    pendingbox: {
        width: wp(50),
        height: hp(4),
        // backgroundColor: "blue",
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: wp(15),
        alignSelf: "center",
        justifyContent: "center",
    },
    piechatcontainer: {
        width: wp(90),
        height: hp(30),
        alignItems: 'center',
        alignSelf: "center",
        marginTop: hp(3),
        marginBottom: hp(3),
    },
    unitsoldbox: {
        width: wp(80),
        alignSelf: "center",
        height: hp(14),
        borderRadius: 5,
        elevation: 5,
        backgroundColor: colors.WHITE,
        marginTop: hp(3),
    },
    dollarcontainer: {
        flexDirection: "row",
        // flexWrap: "wrap",
        justifyContent: 'space-between',

        alignItems: 'center',

    },
    dollarimage: {
        resizeMode: 'contain',
        width: wp(12),
        height: hp(7),
        marginTop: wp(1),
        marginLeft: wp(1),
    },
    graphcontainer: {
        flexDirection: "row",
        // flexWrap: "wrap",
        justifyContent: 'space-between',

        alignItems: 'center',

    },
    percenttext: {
        fontSize: hp(1.8),
        color: colors.GREEN,
        fontFamily: fonts.SemiBold,
    },
    lastmonthtext: {
        fontSize: hp(1.8),
        marginRight: wp(2),
        // fontFamily: fonts.Light,
    },
    unitsoldtext: {
        fontSize: hp(2.8),
        fontFamily: fonts.SemiBold,
        marginLeft: wp(1),
    },
    graphimage: {
        resizeMode: 'contain',
        width: wp(12),
        height: hp(6),
        marginRight: wp(4),
    },
    percentcontainer: {
        flexDirection: "row",
        // alignItems: 'center',
        // flexWrap: "wrap",
    },
    purchasehistorytext: {
        fontSize: hp(2),
        color: "grey",
        fontFamily: fonts.Regular,
        marginTop: hp(5),
        textAlign: "left",
    },
    purchasehistorycontainer: {
        width: wp(90),
        alignSelf: "center",
        height: hp(15),
        borderRadius: 12,
        backgroundColor: colors.LIGHT_GRAY,
        marginTop: hp(3),
        flexDirection: "row",
        marginBottom: hp(2),
    },
    quantitytext: {
        fontSize: hp(2),
        fontFamily: fonts.SemiBold,
        marginLeft: wp(1),
    },
    pricetext: {
        fontSize: hp(1.8),
        fontFamily: fonts.SemiBold,
        marginLeft: wp(2),
        // textAlign: 'center',
    },
    purchasehistoryverticlecontainer: {
        width: wp(30),
        height: hp(15),
        justifyContent: "space-between",
        marginHorizontal: wp(1),
    },
    recievingbutton: {
        width: wp(90),
        height: hp(8),
        justifyContent: "space-between",
        borderRadius: 6,
        backgroundColor: "#F8F6F6",
        marginVertical: hp(1),
        elevation: 5,
        alignItems: 'center',
        flexDirection: "row",
        alignSelf: 'center',
    },
    recievingmethodtext: {
        fontSize: hp(2),
        fontFamily: fonts.SemiBold,
        marginLeft: wp(1),

    },
    raastimage: {
        resizeMode: 'contain',
        width: wp(14),
        height: hp(7),
    },
    forwardimage: {
        resizeMode: 'contain',
        width: wp(10),
        height: hp(3.5),
    },
    farmcontactcontainer: {
        width: wp(90),
        alignSelf: "center",
        height: hp(48),
        backgroundColor: colors.LIGHT_GRAY,
        marginTop: hp(3),
        borderRadius: 8,

    },

    farmcontacttext: {
        fontSize: hp(2.6),
        fontFamily: fonts.SemiBold,
        textAlign: 'center',
        marginTop: hp(1),
        marginBottom: hp(4),
    },

    farmcontactecontainer: {
        width: wp(75),
        height: hp(6.5),
        // backgroundColor: "blue",
        marginLeft: wp(3),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',

    },
    contacttext: {
        fontSize: hp(1.5),
        marginVertical: hp(0.5),
        fontFamily: fonts.SemiBold,
        color: colors.GREEN,

    },
    addresscontainer: {
        width: wp(40),
        height: hp(6.5),
        marginLeft: wp(10),
        justifyContent: 'center',
    },

    contacttext2: {
        fontSize: hp(1.5),
        marginVertical: hp(0.5),
        fontFamily: fonts.SemiBold,

    },
    buttoncontainer: {
        marginTop: hp(3),
        alignSelf: "center",
    },



});


