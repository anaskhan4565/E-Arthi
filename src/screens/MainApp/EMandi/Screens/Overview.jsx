import React, { useState, useEffect, useRef } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../util/colors.js';
import { SafeAreaView, Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { LineChart } from 'react-native-chart-kit';
import FarmerHand from '../../../../assets/MainApp/E-Mandi/FarmerHand.png';
import MandiNavbar from '../CustomComp/MandiNavbar.jsx';
import CustomNavigationMandi from '../CustomComp/CustomNavigation.jsx';
import CustomBottomSheetExport from '../CustomComp/CustomBottomSheet.jsx';
import { fonts } from '../../../../../util/FontName.js';
const Overview = () => {
    const { t } = useTranslation();
    const [price, setPrice] = useState(10.15);
    const [priceChange, setPriceChange] = useState(-0.09);
    const [tradeVolume, setTradeVolume] = useState(7261790);
    const [totalTrades, setTotalTrades] = useState(1402);
    const [lastTradeTime, setLastTradeTime] = useState(new Date().toLocaleTimeString());
    
    const generateRandomValue = (currentValue) => {
        const change = Math.random() > 0.5 ? 1 : -1; 
        const amount = Math.floor(Math.random() * 5) + 1; 
        return currentValue + (change * amount);
    };

    const getColorForPriceChange = (percentage) => {
        return percentage >= 1 ? colors.GREEN : (percentage <= -1 ? colors.RED : colors.GREEN);
    };
    useEffect(() => {
        const interval = setInterval(() => {
            // Adjust the price change rate to be slower and less extreme
            const priceChangeFactor = Math.random() * 0.02; // Small random change between 0 and 0.02 (2%)
            const changeDirection = Math.random() > 0.5 ? 1 : -1; // Randomly decide if the price increases or decreases
            const newPrice = price + (price * priceChangeFactor * changeDirection); // Apply the change
    
            const newPriceChange = ((newPrice - price) / price) * 100;
    
            setPrice(newPrice);
            setPriceChange(newPriceChange);
    
            setTradeVolume(prevVolume => prevVolume + Math.floor(Math.random() * 10) + 1); // Slow increment
            setTotalTrades(prevTrades => prevTrades + Math.floor(Math.random() * 3) + 1); // Slow increment
    
            setLastTradeTime(new Date().toLocaleTimeString());
        }, 1000);
    
        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, [price]);
    

    const priceColor = getColorForPriceChange(priceChange);
    const data = {
        labels: ["Jan", "Jun", "Dec"],
        datasets: [
            {
                data: [120, 135, 150, 180, 200, 170],
            },
        ],
    };

    return (
        <SafeAreaView style={styles.container}>
            <MandiNavbar />
            <ScrollView>
                <CustomNavigationMandi />
                
                <View style={styles.mandiContainer}>
                    <View style={styles.mandiHeader}>
                        <Image source={FarmerHand} style={styles.farmerImage} />
                        <Text style={styles.heading}>Mandi Of Khairpur</Text>
                        <View style={styles.marketCapContainer}>
                            <Text>MarketCap:</Text>
                            <Text>32M</Text>
                        </View>
                    </View>

                    <View style={styles.headerDetails}>
                    <View style={styles.leftHeader}>
                        <Text style={[styles.price, { color: colors.BLACK,backgroundColor:priceColor }]}>{price.toFixed(2)}</Text>
                        <Text style={[styles.priceChange, { color: priceChange >= 0 ? colors.GREEN : colors.RED }]}>
                            {priceChange.toFixed(2)} ({priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%)
                        </Text>
                        <View style={styles.minMax}>
                            <Text style={styles.low}>l:10.10</Text>
                            <Text style={styles.high}>h:10.35</Text>
                        </View>
                        <Text style={styles.avgPrice}>Avg Price: 10.20</Text>
                    </View>

                    <View style={styles.rightHeader}>
                        <View style={styles.row}>
                            <Text style={styles.textBold}>Last Trade Vol:</Text>
                            <Text style={styles.textMuted}>{tradeVolume}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.textBold}>Last Trade Time:</Text>
                            <Text style={styles.textMuted}>{lastTradeTime}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.textBold}>Total Volume:</Text>
                            <Text style={styles.textMuted}>{tradeVolume}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.textBold}>Total Trades:</Text>
                            <Text style={styles.textMuted}>{totalTrades}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.textBold}>Upper Cap:</Text>
                            <Text style={styles.textGreen}>22.37</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.textBold}>Lower Lock:</Text>
                            <Text style={styles.textRed}>9.22</Text>
                        </View>
                    </View>
                </View>
                </View>

                <View style={styles.valuesContainer}>
                    <View style={styles.valueBox}>
                        <Text style={styles.valueText}>0</Text>
                        <Text style={styles.valueText}>0</Text>
                    </View>

                    <View style={styles.valueBox}>
                        <Text style={styles.valueText}>0</Text>
                        <Text style={styles.valueText}>0</Text>
                    </View>
                </View>

                <View style={styles.chartContainer}>
                    <LineChart
                        data={data}
                        width={wp(93)}
                        height={hp(25)}
                        chartConfig={styles.chartConfig}
                        style={styles.chartStyle}
                    />
                </View>

                <View style={styles.kseInfo}>
                    <Text style={styles.kseText}>KSE100 113.852</Text>
                    <Text style={styles.kseChange}>-13.852(0.2%)</Text>
                </View>
            </ScrollView>

            <CustomBottomSheetExport />
        </SafeAreaView>
    );
};

export default Overview;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    mandiContainer: {
        flex: 0.3,
        marginHorizontal: hp(2),
        alignItems: 'center',
        backgroundColor: colors.WHITE,
        marginVertical: hp(1),
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 8,
    },
    mandiHeader: {
        flexDirection: 'row',
        gap: hp(0.5),
    },
    farmerImage: {
        height: hp(7),
        width: hp(7),
    },
    heading: {
        fontSize: hp("2.5%"),
        fontFamily: fonts.SemiBold,
    },
    marketCapContainer: {
        margin: hp(0.5),
        padding: hp(0.5),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        elevation: 2,
        borderRadius: hp(0.4),
    },
    headerDetails: {
        flexDirection: 'row',
        flex: 0.7,
    },
    leftHeader: {
        flex: 0.5,
        alignItems: 'center',
    },
    price: {
        fontWeight: '800',
        fontSize: hp(4),
        backgroundColor: '#ff6666',
        color: colors.WHITE,
        textAlign: 'center',
        margin: hp(1),
        borderRadius: hp(2),
        width: hp(19),
    },
    priceChange: {
        fontWeight: 'bold',
        color: colors.RED,
        fontSize: hp(2.5),
    },
    minMax: {
        flexDirection: 'row',
        gap: hp(0.5),
    },
    low: {
        color: colors.RED,
        fontWeight: 'bold',
    },
    high: {
        color: colors.GREEN,
        fontWeight: 'bold',
    },
    avgPrice: {
        color: colors.OLD_MILL_BLUE,
        fontWeight: '900',
    },
    rightHeader: {
        flex: 0.5,
        gap: hp(0.6),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    textBold: {
        fontWeight: '600',
    },
    textMuted: {
        color: '#808000',
        fontWeight: 'bold',
    },
    textGreen: {
        color: colors.DARK_GREEN,
        fontWeight: 'bold',
    },
    textRed: {
        color: colors.RED,
    },
    valuesContainer: {
        flex: 0.15,
        marginHorizontal: hp(3),
        borderRadius: hp(2),
        marginTop: hp(1),
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 0.3,
        elevation: 3,
        backgroundColor: '#fff',
    },
    valueBox: {
        flex: 0.5,
        margin: hp(1),
        borderRadius: hp(3),
        marginTop: hp(1),
    },
    valueText: {
        fontWeight: '800',
        fontSize: wp(10),
        color: colors.BLACK,
        textAlign: 'center',
        color: 'rgb(169, 9, 89)',
    },
    chartContainer: {
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: hp(2),
        borderRadius: hp(1),
        marginVertical: hp(2),
    },
    chartConfig: {
        backgroundColor: '#000',
        backgroundGradientFrom: '#1E2923',
        backgroundGradientTo: '#08130D',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    },
    chartStyle: {
        marginVertical: 8,
        borderRadius: 16,
    },
    kseInfo: {
        marginHorizontal: hp(1),
        flex: 0.09,
    },
    kseText: {
        fontWeight: '800',
        fontSize: hp(2),
        color: colors.BLACK,
    },
    kseChange: {
        fontWeight: '800',
        fontSize: hp(2),
        color: colors.RED,
    },
});
