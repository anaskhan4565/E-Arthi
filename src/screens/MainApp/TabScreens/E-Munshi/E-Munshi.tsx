import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../util/colors.js';
import EInventoryBoxes from '../../CustomComponent/EInventoryBoxes.jsx'
import { ETransportMaindet } from '../../../../../util/E-Transport.js';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../../../../util/FontName.js';
import ScreensName from '../../../../../util/ScreensName.ts';
import CustomButton from '../../../../components/CustomButton.jsx';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const warehouseData = {
  warehouses: [
    { name: 'Warehouse A', percentage: 25 },
    { name: 'Warehouse B', percentage: 20 },
    { name: 'Warehouse C', percentage: 15 },
    { name: 'Warehouse D', percentage: 30 },
    { name: 'Warehouse E', percentage: 10 }
  ]
};

function EMunshi(): React.JSX.Element {
    const { t } = useTranslation();

    const chartData = warehouseData.warehouses.map((warehouse, index) => ({
        name: warehouse.name,
        population: warehouse.percentage,
        color: [
            '#2196F3', // Vibrant Blue
            '#FF9800', // Vibrant Orange
            '#4CAF50', // Vibrant Green
            '#757575', // Strong Gray
            '#9C27B0'  // Vibrant Purple
        ][index],
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
        strokeWidth: 20,
        strokeColor: colors.WHITE,
    }));

    const screenWidth = Dimensions.get('window').width;

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <ScrollView style={styles.container}>

                <View style={styles.searchContainer}>
                    <CustomSearchApp placeholder={t('Search in here')} />
                </View>
                <View style={{ marginHorizontal: hp(1) }} >
                    <Text style={{ fontSize: hp(3.5), fontFamily: fonts.SemiBold, marginLeft: hp(2) }}>E-Munshi</Text>
                </View>
                <View style={styles.bodyContainer}>
                    <View style={styles.chartContainer}>
                        <PieChart
                            data={chartData}
                            width={screenWidth - hp(8)}
                            height={220}
                            chartConfig={{
                              backgroundColor: colors.WHITE,
                                backgroundGradientFrom: colors.WHITE,
                                backgroundGradientTo: colors.WHITE,
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                strokeWidth: 20,
                              }}
                            accessor="population"
                            backgroundColor="transparent"
                            paddingLeft="15"
                            absolute
                            hasLegend={false}
                            style={{ alignSelf: 'center' }}
                        />
                        <View style={styles.legendContainer}>
                            {chartData.map((item, index) => (
                              <View key={index} style={styles.legendItem}>
                                    <View style={[styles.colorBox, { backgroundColor: item.color }]} />
                                    <Text style={styles.legendText}>{item.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <Text style={styles.subsectionTitle}>Select Warehouse</Text>
                    {warehouseData.warehouses.map((warehouse, index) => (
                        <TouchableOpacity key={index} style={styles.warehouseBox} onPress={() => {/* Navigate to another screen */}}>
                            <Text style={styles.warehouseLabel}>{warehouse.name}</Text>
                            <View style={styles.percentageContainer}>
                                <Text style={styles.warehousePercentage}>{warehouse.percentage}%</Text>
                                <Image 
                                    source={require('../../../../assets/MainApp/E-Munshi/chevron-right-solid.png')} 
                                    style={styles.arrowImage}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: colors.WHITE,

    },
    navbarContainer: {
        height: hp('8.2%'),
        backgroundColor: 'white',
        marginTop: hp('0.14%'),
    },
    searchContainer: {
        marginTop: hp('3.2%'),
        height: hp('7%'),
        alignSelf:'flex-start',
        marginLeft:hp(1)
    },
    bodyContainer: {
        alignItems: 'flex-start',
        marginHorizontal:hp(3)

    },
    titleContainer: {
        padding: 10,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 25,
        fontFamily: 'Poppins',
    },
    scrollContainer: {
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingVertical: hp('2%'),
        // backgroundColor: 'red',
        alignItems: 'center',

    },
    itemBoxWrapper: {
        width: '30%',
        marginBottom: hp('2%'),
        marginHorizontal: wp('-3%'),
        alignItems: 'center',

    },
    recommendedProducts: {
        marginTop: 20,
    },
    recommendedTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    subsectionTitle: {
        fontSize: hp(2),
        fontFamily: 'Poppins Bold',
        marginBottom: hp(2),
        textAlign: 'center',
    },
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    legendContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(2),
        marginBottom: hp(2),
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp(0.5),
        width: '50%',
        justifyContent: 'center',
    },
    colorBox: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: hp(1),
    },
    legendText: {
        fontSize: hp(2),
        color: '#7F7F7F',
    },
    warehouseBox: {
        backgroundColor: colors.WHITE,
        padding: hp(2),
        marginVertical: hp(1),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        elevation: 2, // Optional: for shadow effect on Android
    },
    warehouseLabel: {
        color: 'black',
        fontSize: hp(2),
        fontFamily: 'Poppins',
    },
    warehousePercentage: {
        color: colors.PRIMARY,
        fontSize: hp(2),
        fontFamily: 'Poppins',
    },
    percentageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrowImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginLeft: hp(1),
    },
});

export default EMunshi;