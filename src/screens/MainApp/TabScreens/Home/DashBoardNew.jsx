import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { fonts } from '../../../../../util/Constants/FontName.js';

// Import Navbar
import Navbar from '../../Navbar/Navbar.jsx';

// Import SVG assets
import Calendar from '../../../../assets/MainApp/DashBoardNew/Calendar.svg';
import WaterDrop from '../../../../assets/MainApp/DashBoardNew/WaterDrop.svg';
import WheatBag from '../../../../assets/MainApp/DashBoardNew/WheatBag.svg';
import MoneyBag from '../../../../assets/MainApp/DashBoardNew/MoneyBag.svg';
import Rice from '../../../../assets/MainApp/DashBoardNew/Rice.svg';
import Weather from '../../../../assets/MainApp/DashBoardNew/Weather.svg';


import Farm from '../../../../assets/MainApp/DashBoardNew/Farm.png';
import colors from '../../../../../util/Constants/colors.js';

const DashBoardNew = () => {

    const [tasks, setTasks] = React.useState([
        { id: 1, title: 'Scheduled spraying on Maize', completed: false },
        { id: 2, title: 'Field fertilization on Wheat', completed: false },
        { id: 3, title: 'Field fertilization on Onions', completed: false },
    ]);

    const toggleTaskCompletion = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const dashboardData = {
        weatherInfo: {
            temperature: '26°C',
            humidity: '30%',
        },
        harvestInfo: {
            daysLeft: 7,
            expectedCrop: '65 Kg',
            cropDistribution: {
                maize: 60,
                wheat: 40,
            },
            harvestSummary: {
                total: '80 Kg',
                maize: 50,
                wheat: 30,
                onion: 20,
            }
        },
        financialInfo: {
            agriCash: '65,000 Rupees',
            totalSpent: '80,000 Rs',
            spendingBreakdown: {
                labor: 50,
                seeds: 30,
                equipment: 20,
            },
            orders: {
                fulfilled: 86,
                pending: 22,
            },
            inventory: {
                items: 192,
                value: '270,000 Rs',
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#f2f7f5" barStyle="dark-content" />

            {/* Navbar */}
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>

            <Swiper
                style={styles.swiper}
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
                paginationStyle={styles.pagination}
                loop={false}
                showsButtons={false}
            >
                {/* Center Screen */}
                <View style={styles.slide}>



                    <Text style={styles.dashboardTitle}>Dashboard</Text>

                    <View style={styles.dashboardContainer}>
                        <View style={styles.farmImageContainer}>
                            <Image
                                source={Farm}
                                style={styles.farmImage}
                                resizeMode="cover"
                            />
                        </View>

                        {/* Weather Info */}
                        <View style={styles.weatherContainer}>
                            <View style={styles.weatherIconContainer}>
                                <Weather width={wp('20%')} height={hp('10%')} />
                            </View>
                            <View style={styles.weatherDetails}>
                                <Text style={styles.weatherTitle}>Field Weather</Text>
                                <Text style={styles.weatherData}>
                                    Temperature: {dashboardData.weatherInfo.temperature}
                                </Text>
                                <Text style={styles.weatherData}>
                                    Humidity Level: {dashboardData.weatherInfo.humidity}
                                </Text>
                            </View>
                            <View style={styles.weatherConditionContainer}>
                                <Text style={styles.weatherCondition}>
                                    Normal{'\n'}weather{'\n'}conditions
                                </Text>
                            </View>
                        </View>

                        <View style={styles.horizontalDivider}></View>
                        <View style={styles.tasksContainer}>
                            <Text style={styles.sectionTitle}>Current Tasks</Text>
                            {tasks.map((task, index) => (
                                <View key={task.id} style={styles.taskItem}>
                                    <View style={styles.taskIconContainer}>
                                        {index === 0 ? (
                                            <WaterDrop width={wp('6%')} height={hp('3%')} />
                                        ) : (
                                            <WheatBag width={wp('6%')} height={hp('3%')} />
                                        )}
                                    </View>
                                    <Text style={styles.taskText}>{task.title}</Text>
                                    <TouchableOpacity
                                        style={styles.checkboxContainer}
                                        onPress={() => toggleTaskCompletion(task.id)}
                                    >
                                        <View style={[styles.checkbox, task.completed && styles.checkboxChecked]}>
                                            {task.completed && (
                                                <Text style={styles.checkmark}>✓</Text>
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Left Screen */}
                <View style={styles.slide}>
                    <Text style={styles.dashboardTitle}>Dashboard</Text>

                    <View style={styles.dashboardContainer}>
                        {/* Harvest Timeline */}
                        <View style={styles.infoContainer}>
                            <View style={styles.infoBox}>
                                <Calendar width={55} height={55} />
                                <Text style={styles.infoValue}>{dashboardData.harvestInfo.daysLeft} days</Text>
                                <Text style={styles.infoLabel}>left for harvest</Text>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.infoBox}>
                                <WheatBag width={45} height={55} />
                                <Text style={styles.infoValue2}>{dashboardData.harvestInfo.expectedCrop}</Text>
                                <Text style={styles.infoLabel}>of crop expected</Text>
                            </View>
                        </View>

                        <View style={styles.horizontalDivider}></View>

                        {/* Crops */}
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Crops</Text>

                            <View style={styles.pieChartContainer}>
                                <AnimatedCircularProgress
                                    size={wp('22%')}
                                    width={15}
                                    fill={dashboardData.harvestInfo.cropDistribution.maize}
                                    tintColor="#00A980"
                                    backgroundColor="#e8f8f3"
                                    rotation={0}
                                >
                                    {() => (
                                        <View style={styles.pieChartInner} />
                                    )}
                                </AnimatedCircularProgress>

                                <View style={styles.pieChartLegend}>
                                    <Text style={[styles.pieChartPercentage, { color: '#00A980' }]}>
                                        <Text style={styles.pieChartPercentageText}>{dashboardData.harvestInfo.cropDistribution.maize}%</Text> of crops is Maize
                                    </Text>
                                    <Text style={styles.pieChartPercentage}>
                                        <Text style={styles.pieChartPercentageText}>{dashboardData.harvestInfo.cropDistribution.wheat}%</Text> of crops is Wheat
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.horizontalDivider}></View>

                        {/* Harvest Summary */}
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Harvest Summary</Text>
                            <Text style={styles.sectionSubtitle}>(for last 3 months)</Text>

                            <View style={styles.harvestSummaryContainer}>
                                <Text style={styles.harvestTotal}>
                                    Total crop harvested: <Text style={{ color: '#00A980' }}>{dashboardData.harvestInfo.harvestSummary.total}</Text>
                                </Text>

                                <View style={styles.progressContainer}>
                                    <View style={styles.progressBarContainer}>
                                        <View style={[styles.progressBar, { width: `${dashboardData.harvestInfo.harvestSummary.maize}%` }]} />
                                        <Text style={styles.progressPercentage}>{dashboardData.harvestInfo.harvestSummary.maize} %</Text>
                                    </View>
                                    <Text style={styles.progressLabel}>Maize</Text>
                                </View>

                                <View style={styles.progressContainer}>
                                    <View style={styles.progressBarContainer}>
                                        <View style={[styles.progressBar, { width: `${dashboardData.harvestInfo.harvestSummary.wheat}%` }]} />
                                        <Text style={styles.progressPercentage}>{dashboardData.harvestInfo.harvestSummary.wheat} %</Text>
                                    </View>
                                    <Text style={styles.progressLabel}>Wheat</Text>
                                </View>

                                <View style={styles.progressContainer}>
                                    <View style={styles.progressBarContainer}>
                                        <View style={[styles.progressBar, { width: `${dashboardData.harvestInfo.harvestSummary.onion}%` }]} />
                                        <Text style={styles.progressPercentage}>{dashboardData.harvestInfo.harvestSummary.onion} %</Text>
                                    </View>
                                    <Text style={styles.progressLabel}>Onion</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Right Screen */}
                <View style={styles.slide}>
                    <Text style={styles.dashboardTitle}>Dashboard</Text>

                    <View style={styles.dashboardContainer}>
                        {/* Financial Info */}
                        <View style={styles.financialHeader}>
                            <MoneyBag width={50} height={50} />
                                <Text style={styles.financialValue}>{dashboardData.financialInfo.agriCash}</Text>
                                <Text style={styles.financialLabel}>Agri cash left</Text>
                         
                        </View>

                        <View style={styles.horizontalDivider}></View>

                        <View style={styles.spendingContainer}>
                            <Text style={styles.sectionTitle}>Summary of Spendings</Text>
                            <Text style={styles.totalSpent}>
                                Total amount spent: <Text style={styles.spentValue}>{dashboardData.financialInfo.totalSpent}</Text>
                            </Text>

                            <View style={styles.progressContainer}>
                                <View style={styles.progressBarContainer}>
                                    <View style={[styles.progressBar, { width: `${dashboardData.financialInfo.spendingBreakdown.labor}%` }]} />
                                    <Text style={styles.progressPercentage}>{dashboardData.financialInfo.spendingBreakdown.labor} %</Text>
                                </View>
                                <Text style={styles.progressLabel}>Labor</Text>
                            </View>

                            <View style={styles.progressContainer}>
                                <View style={styles.progressBarContainer}>
                                    <View style={[styles.progressBar, { width: `${dashboardData.financialInfo.spendingBreakdown.seeds}%` }]} />
                                    <Text style={styles.progressPercentage}>{dashboardData.financialInfo.spendingBreakdown.seeds} %</Text>
                                </View>
                                <Text style={styles.progressLabel}>Seeds</Text>
                            </View>

                            <View style={styles.progressContainer}>
                                <View style={styles.progressBarContainer}>
                                    <View style={[styles.progressBar, { width: `${dashboardData.financialInfo.spendingBreakdown.equipment}%` }]} />
                                    <Text style={styles.progressPercentage}>{dashboardData.financialInfo.spendingBreakdown.equipment} %</Text>
                                </View>
                                <Text style={styles.progressLabel}>Equipment</Text>
                            </View>
                        </View>

                        <View style={styles.horizontalDivider}></View>

                        <View style={styles.ordersContainer}>
                            <View style={styles.orderBox}>
                                <View style={styles.orderIconContainer}>
                                    <Rice width={50} height={50} />
                                </View>
                                <Text style={styles.orderValue}>{dashboardData.financialInfo.orders.fulfilled}</Text>
                                <Text style={styles.orderLabel}>orders fulfilled</Text>
                            </View>

                            <View style={styles.verticalDivider} />

                            <View style={styles.orderBox}>
                                <View style={styles.orderIconContainer}>
                                    <Calendar width={50} height={50} />
                                </View>
                                <Text style={styles.orderValue}>{dashboardData.financialInfo.orders.pending}</Text>
                                <Text style={styles.orderLabel}>orders pending</Text>
                            </View>
                        </View>

                        <View style={styles.horizontalDivider}></View>

                        <View style={styles.inventoryContainer}>
                            <View style={styles.inventoryBox}>
                                <View style={styles.inventoryIconContainer}>
                                    <WheatBag width={50} height={50} />
                                </View>
                                <Text style={styles.inventoryValue}>{dashboardData.financialInfo.inventory.items}</Text>
                                <Text style={styles.inventoryLabel}>items in warehouse</Text>
                            </View>

                            <View style={styles.verticalDivider} />

                            <View style={styles.inventoryBox}>
                                <View style={styles.inventoryIconContainer}>
                                    <MoneyBag width={50} height={50} />
                                </View>
                                <Text style={styles.inventoryValue}>{dashboardData.financialInfo.inventory.value}</Text>
                                <Text style={styles.inventoryLabel}>inventory value</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Swiper>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    navbarContainer: {
        height: hp('8.5%'),
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    swiper: {
        marginTop: hp('8.5%'),
    },
    slide: {
        flex: 1,
        paddingHorizontal: wp('5%'),
        paddingTop: hp('1%'),

    },
    dashboardContainer: {
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('5%'),
        paddingTop: hp('1%'),
        borderRadius: 8,
        backgroundColor: colors.LIGHT_GREEN,
        // height: hp('72%'),
    },
    dashboardTitle: {
        fontSize: wp('6%'),
        fontWeight: 'bold',
        marginBottom: hp('2%'),
        fontFamily: fonts.SemiBold,
        textAlign: 'left',
    },
    farmImageContainer: {
        height: hp('20%'),
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: hp('2%'),
    },
    farmImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        paddingTop: hp('2%'),
    },
    weatherContainer: {
        flexDirection: 'row',
        // backgroundColor: '#fff',

        // padding: wp('3%'),
        // marginBottom: hp('2%'),
        alignItems: 'center',
        marginTop: hp('1%'),

    },
    weatherIconContainer: {
        marginRight: wp('3%'),
    },
    weatherDetails: {
        flex: 1,
    },
    weatherTitle: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
        marginBottom: 5,
        fontFamily: fonts.SemiBold,
    },
    weatherData: {
        fontSize: wp('3.5%'),
        color: '#555',
        fontFamily: fonts.Regular,
    },
    weatherConditionContainer: {
        // backgroundColor: '#e8f8f3',
        padding: wp('2%'),
        borderRadius: 8,
    },
    weatherCondition: {
        fontSize: hp('1.8%'),
        color: '#00A980',
        textAlign: 'center',
        fontFamily: fonts.Medium,
    },
    horizontalDivider: {
        height: 1,
        backgroundColor: colors.DARK_GREEN,
        marginVertical: hp('1.5%'),
    },
    tasksContainer: {


        padding: wp('3%'),

    },
    sectionTitle: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        marginBottom: hp('1.5%'),
        fontFamily: fonts.SemiBold,
        textAlign: 'center',
    },
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp('1.3%'),

        borderBottomColor: '#f0f0f0',
    },
    taskIconContainer: {
        marginRight: wp('2%'),
    },
    taskText: {
        flex: 1,
        fontSize: wp('3.5%'),
        color: '#333',
        marginLeft: wp('0.5%'),
        fontFamily: fonts.Regular,
    },
    checkboxContainer: {
        borderRadius: 4,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#00A980',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkbox: {
        width: 16,
        height: 16,
        borderRadius: 3,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#00A980',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#00A980',
    },
    checkmark: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        fontFamily: fonts.Bold,
    },
    infoContainer: {
        flexDirection: 'row',
        borderRadius: 15,
        // padding: wp('3%'),
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    infoBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        width: 1,
        height: '90%',
        backgroundColor: colors.DARK_GREEN,
        marginHorizontal: wp('3%'),
    },
    infoValue: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        color: '#00A980',
        marginTop: 8,
        fontFamily: fonts.Bold,
    },
    infoValue2: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        color: '#00A980',
        marginTop: hp(1),
        fontFamily: fonts.Bold,
    },
    infoLabel: {
        fontSize: wp('3.5%'),
        color: '#555',
        textAlign: 'center',
        fontFamily: fonts.Regular,
    },
    sectionContainer: {
        backgroundColor: 'transparent',
        // padding: wp('1%'),

    },
    sectionSubtitle: {
        fontSize: wp('3.5%'),
        color: '#666',
        marginBottom: hp('1%'),
        fontFamily: fonts.Regular,
        textAlign: 'center',
    },
    pieChartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginVertical: hp('1%'),
    },
    pieChartInner: {
        width: '85%',
        height: '85%',
        borderRadius: wp('10%'),
        backgroundColor: '#f2f7f5',
    },
    pieChartLegend: {
        flex: 1,
        paddingLeft: wp('5%'),
    },
    pieChartPercentage: {
        fontSize: wp('3.5%'),
        marginBottom: hp('1%'),
        color: '#444',
        fontFamily: fonts.Regular,
    },
    pieChartPercentageText: {
        fontFamily: fonts.Bold,
        fontSize: wp('3.8%'),

    },
    harvestSummaryContainer: {
        marginTop: hp('1%'),
    },
    harvestTotal: {
        fontSize: wp('3.8%'),
        fontWeight: 'bold',
        marginBottom: hp('2%'),
        fontFamily: fonts.SemiBold,
        textAlign: 'center',
    },
    progressContainer: {
        marginBottom: hp('1.5%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    progressBarContainer: {
        flex: 1,
        height: hp('2.5%'),
        backgroundColor: '#E8E8E8',
        borderRadius: 10,
        marginRight: wp('2%'),
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#00a980',
        borderRadius: 10,
    },
    progressPercentage: {
        position: 'absolute',
        right: wp('2%'),
        fontSize: wp('3%'),
        color: '#00a980',
        fontFamily: fonts.Medium,
    },
    progressLabel: {
        width: wp('20%'),
        fontSize: wp('3.5%'),
        color: '#333',
        fontFamily: fonts.SemiBold,
    },
    financialContainer: {
        flex: 1,
    },
    financialHeader: {
        flexDirection: 'row',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp('0%'),
    },
    financialHeaderText: {
        marginLeft: wp('3%'),
    },
    financialValue: {
        fontSize: wp('4%'),
        color: colors.BLACK,
        
        fontFamily: fonts.Medium,
    },
    financialLabel: {
        fontSize: wp('3.5%'),
        color: '#555',
        fontFamily: fonts.Medium,
    },
    spendingContainer: {
        backgroundColor: 'transparent',
  
    },
    totalSpent: {
        fontSize: wp('3.8%'),
        marginBottom: hp('1.5%'),
        fontFamily: fonts.Regular,
        textAlign: 'center',
    },
    spentValue: {
        fontWeight: 'bold',
        color: '#00A980',
        fontFamily: fonts.Bold,
    },
    ordersContainer: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        borderRadius: 15,
     
      
        alignItems: 'center',
    },
    orderBox: {
        flex: 1,
        alignItems: 'center',
    },
    orderIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
    },
    orderValue: {
        fontSize: wp('4.5%'),
        fontFamily: fonts.SemiBold,
    },
    orderLabel: {
        fontSize: wp('3.5%'),
        color: '#555',
        textAlign: 'center',
        fontFamily: fonts.Regular,
    },
    verticalDivider: {
        width: 1,
        height: '90%',
        backgroundColor: colors.DARK_GREEN,
        marginHorizontal: wp('3%'),
    },
    inventoryContainer: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        borderRadius: 15,
        padding: wp('1%'),
        // marginBottom: hp('0.5%'),
        alignItems: 'center',
    },
    inventoryBox: {
        flex: 1,
        alignItems: 'center',
    },
    inventoryIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
    },
    inventoryValue: {
        fontSize: wp('4.5%'),
        fontFamily: fonts.SemiBold,
    },
    inventoryLabel: {
        fontSize: wp('3.5%'),
        color: '#555',
        textAlign: 'center',
        fontFamily: fonts.Regular,
    },
    dot: {
        backgroundColor: '#e0e0e0',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
    },
    activeDot: {
        backgroundColor: '#00A980',
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: 3,
        marginRight: 3,
    },
    pagination: {
        bottom: hp('2%'),
    },
});

export default DashBoardNew;
