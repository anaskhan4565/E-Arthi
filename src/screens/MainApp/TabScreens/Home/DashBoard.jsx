import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import Navbar from '../../Navbar/Navbar.jsx';
import colors from '../../../../../util/Constants/colors.js';
import { fonts } from '../../../../../util/Constants/FontName.js';

// Import dashboard icons
import WeatherIcon from '../../../../assets/MainApp/DashBoard/WeatherIcon.svg';
import CashIcon from '../../../../assets/MainApp/DashBoard/CashIcon.svg';
import CashIconwhite from '../../../../assets/MainApp/DashBoard/CashIconwhite.svg';
import TruckIcon from '../../../../assets/MainApp/DashBoard/TruckIcon.svg';
import CalenderIcon from '../../../../assets/MainApp/DashBoard/CalenderIcon.svg';
import PriceIcon from '../../../../assets/MainApp/DashBoard/PriceIcon.svg';
import CropBagIcon from '../../../../assets/MainApp/DashBoard/CropBagIcon.svg';
import NotePadIcon from '../../../../assets/MainApp/DashBoard/NotePadIcon.svg';
import ClockIcon from '../../../../assets/MainApp/DashBoard/ClockIcon.svg';
import WareHouseIcon from '../../../../assets/MainApp/DashBoard/WareHouseIcon.svg';


const dashboardData = {
    weather: {
        temperature: '26°C',
        humidity: '30%',
        status: 'Normal weather conditions'
    },
    finance: {
        agriCash: 27000,
        cropPrice: 50000,
        inventoryValue: 22000
    },
    logistics: {
        daysToTransport: 5,
        daysToHarvest: 7,
        harvestDate: '24 January',
        expectedCrop: '15 Kg'
    },
    inventory: {
        itemsReceived: 86,
        itemsPending: 22,
        warehouseItems: 192
    }
};

const DashboardCard = ({ children, style }) => {
    return (
        <View style={[styles.card, style]}>
            {children}
        </View>
    );
};

const DashBoard = () => {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Dashboard</Text>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <DashboardCard>
                    <View style={styles.weatherCard}>
                        <View style={styles.weatherIconContainer}>
                            <WeatherIcon width={wp(17)} height={hp(9)} />
                        </View>
                        <View style={styles.weatherInfoContainer}>
                            <Text style={styles.weatherTitle}>Field Weather</Text>
                            <Text style={styles.weatherText}>
                                Temperature: {dashboardData.weather.temperature}
                            </Text>
                            <Text style={styles.weatherText}>
                                Humidity Level: {dashboardData.weather.humidity}
                            </Text>
                        </View>
                        <View style={styles.weatherStatusContainer}>
                            <Text style={styles.weatherStatusText}>
                                {dashboardData.weather.status}
                            </Text>
                        </View>
                    </View>
                </DashboardCard>


                <View style={styles.rowContainer}>
                    <DashboardCard style={styles.halfCard}>
                        <View style={styles.infoContainer}>
                            <CashIcon width={wp(18)} height={hp(10)} style={{ right: wp('3%') }} />
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoTitle}>Rs {dashboardData.finance.agriCash}</Text>
                                <Text style={styles.infoSubtitle}>Agri cash available</Text>
                            </View>
                        </View>
                    </DashboardCard>

                    <DashboardCard style={styles.halfCard}>
                        <View style={styles.infoContainer}>
                            <TruckIcon width={wp(17)} height={hp(10)} style={{ right: wp('3%') }} />
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoTitle}>{dashboardData.logistics.daysToTransport} days</Text>
                                <Text style={[styles.infoSubtitle, { marginRight: wp('0%') }]}>to transport left</Text>
                            </View>
                        </View>
                    </DashboardCard>
                </View>


                <DashboardCard>
                    <View style={styles.cropInfoContainer}>
                        <View style={styles.cropInfoColumn}>
                            <CalenderIcon width={wp(18)} height={hp(9)} />
                            <View style={styles.calendarDateContainer}>
                                {/* <Text style={styles.calendarDay}>
                                    {dashboardData.logistics.harvestDate.split(' ')[0]}
                                </Text> */}
                                {/* <Text style={styles.calendarMonth}>
                                    {dashboardData.logistics.harvestDate.split(' ')[1]}
                                </Text> */}
                            </View>
                            <Text style={styles.cropInfoTitle}>{dashboardData.logistics.daysToHarvest} days</Text>
                            <Text style={styles.cropInfoSubtitle}>left for crop to harvest</Text>
                        </View>

                        <View style={styles.divider}></View>

                        <View style={styles.cropInfoColumn}>
                            <PriceIcon width={wp(18)} height={hp(10)} />
                            <Text style={styles.cropInfoTitle}>Rs {dashboardData.finance.cropPrice}</Text>
                            <Text style={styles.cropInfoSubtitle}>current crop price</Text>
                        </View>

                        <View style={styles.divider}></View>

                        <View style={styles.cropInfoColumn}>
                            <CropBagIcon width={wp(18)} height={hp(9)} />
                            <Text style={styles.cropInfoTitle}>{dashboardData.logistics.expectedCrop}</Text>
                            <Text style={styles.cropInfoSubtitle}>of crop expected</Text>
                        </View>
                    </View>
                </DashboardCard>


                <View style={styles.rowContainer}>
                    <DashboardCard style={styles.halfCard}>
                        <View style={styles.infoContainer}>
                            <NotePadIcon width={wp(20)} height={hp(10)} style={{ right: wp('3%') }} />
                            <View style={styles.infoTextContainer}>
                                <Text style={[styles.infoTitle, { marginRight: wp('2%') }]}>{dashboardData.inventory.itemsReceived}</Text>
                                <Text style={[styles.infoSubtitle, { marginRight: wp('2%') }]}>items received</Text>
                            </View>
                        </View>
                    </DashboardCard>

                    <DashboardCard style={styles.halfCard}>
                        <View style={styles.infoContainer}>
                            <ClockIcon width={wp(18)} height={hp(9)} style={{ right: wp('3%') }} />
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoTitle}>{dashboardData.inventory.itemsPending}</Text>
                                <Text style={styles.infoSubtitle}>items pending</Text>
                            </View>
                        </View>
                    </DashboardCard>
                </View>


                <DashboardCard>
                    <View style={styles.warehouseContainer}>
                        <View style={styles.warehouseRow}>
                            <WareHouseIcon width={wp(17)} height={hp(9)} style={{ right: wp('3%') }} />
                            <View style={styles.warehouseTextContainer1}>
                                <Text style={styles.infoTitle}>{dashboardData.inventory.warehouseItems}</Text>
                                <Text style={styles.infoSubtitle}>current items in warehouse</Text>
                            </View>
                        </View>

                        <View style={[styles.divider, { marginHorizontal: wp('3%') }]}></View>
                        <View style={styles.warehouseRow}>
                            <CashIconwhite width={wp(17)} height={hp(9)} />
                            <View style={styles.warehouseTextContainer2}>
                                <Text style={styles.infoTitle}>{dashboardData.finance.inventoryValue} Rs</Text>
                                <Text style={styles.infoSubtitle}>inventory value</Text>
                            </View>
                        </View>
                    </View>
                </DashboardCard>
            </ScrollView>
        </View>
    );
};

export default DashBoard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    navbarContainer: {
        height: hp('6%'),
        backgroundColor: colors.LIGHT_GREEN,
    },
    titleContainer: {
        marginTop: hp('1%'),
        marginLeft: wp('5%'),
        marginBottom: hp('1%'),
    },
    title: {
        fontSize: hp('3%'),
        fontWeight: '600',
        color: colors.BLACK,

    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: wp('4%'),
        paddingTop: hp('0.5%'),
        paddingBottom: hp('10%'),
    },
    card: {
        backgroundColor: colors.WHITE,
        borderRadius: wp('3%'),
        marginVertical: hp('0.75%'),
        padding: wp('4%'),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 1.5,
        elevation: 5,
        marginVertical: hp('1%'),
    },
    weatherCard: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    weatherIconContainer: {
        marginRight: wp('3%'),
    },
    weatherInfoContainer: {
        width: wp('35%'),
    },
    weatherTitle: {
        fontSize: hp('1.8%'),
        fontWeight: '500',
        marginBottom: hp('0.5%'),
        fontFamily: fonts.Medium,
    },
    weatherText: {
        fontSize: hp('1.6%'),
        color: colors.BLACK,
        fontFamily: fonts.Regular,
    },
    weatherStatusContainer: {
        justifyContent: 'center',
        padding: hp('1.6%'),
        borderRadius: wp('2%'),
        backgroundColor: colors.LIGHT_GREEN,
        width: wp('25%'),
    },
    weatherStatusText: {
        color: colors.GREEN,
        textAlign: 'center',
        fontFamily: fonts.Medium,
        fontSize: hp('1.5%'),
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfCard: {
        width: wp('44%'),
        backgroundColor: colors.LIGHT_GREEN,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        // backgroundColor: 'red',
    },
    infoTextContainer: {
        // marginLeft: wp('2%'),
        // flex: 1,
        width: '60%',
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'red',
        marginRight: wp('5%'),

    },
    infoTitle: {
        fontSize: hp('1.9%'),
        fontWeight: '400',
        fontFamily: fonts.Medium,
        textAlign: 'center',

    },
    infoSubtitle: {
        fontSize: hp('1.7%'),
        color: colors.DARK_GRAY,
        fontFamily: fonts.Regular,
        textAlign: 'center',
    },
    cropInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: hp('16%'),

    },
    cropInfoColumn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    calendarDateContainer: {
        alignItems: 'center',
        // marginTop: hp('0.5%'),
    },
    calendarDay: {
        color: 'red',
        fontSize: wp('4%'),
        fontWeight: 'bold',
        fontFamily: fonts.Medium,
    },
    calendarMonth: {
        color: 'red',
        fontSize: wp('3.5%'),
        fontFamily: fonts.Regular,
    },
    cropInfoTitle: {
        fontSize: hp('1.9'),
        textAlign: 'center',
        fontFamily: fonts.Medium,
    },
    cropInfoSubtitle: {
        fontSize: hp('1.7%'),
        color: colors.DARK_GRAY,
        textAlign: 'center',
        fontFamily: fonts.Regular,
        padding: wp('1%'),
    },
    divider: {
        width: 1,
        height: '100%',
        backgroundColor: colors.DARK_GREEN,
        alignSelf: 'center',
    },
    warehouseContainer: {
        flexDirection: 'row',
        paddingVertical: hp('1%'),
        flex: 1,
        alignItems: 'center',
    },
    warehouseRow: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'row',
        // width: '60%',
        // backgroundColor: 'red',
    },
    warehouseTextContainer1: {
        width: '65%',
        // backgroundColor: 'red',
        // marginLeft: wp('2%'),
        right: wp('2%'),
    },
    warehouseTextContainer2: {
        width: '65%',
        // backgroundColor: 'red',
        // marginLeft: wp('2%'),

    },

});