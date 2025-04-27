import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Navbar from '../../Navbar/Navbar';
import colors from '../../../../../util/Constants/colors';
import ScreensName from '../../../../../util/Constants/ScreensName';

// // type RootStackParamList = {
//     [ScreensName.CropAdvisor]: undefined;
//     [ScreensName.FertilizerAdvisor]: undefined;
//     [ScreensName.AgriServices]: undefined;
// };

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const EAdviser = () => {
    const navigation = useNavigation();
    const [taskCompleted, setTaskCompleted] = useState(false);

    const handleMarkAsDone = () => {
        setTaskCompleted(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={false} />
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>E-Advisor</Text>

                <View style={styles.taskSection}>

                    <View style={styles.taskCards}>
                        <View style={styles.taskCard}>
                        <Text style={styles.sectionTitle}>Today's Task</Text>

                            <View style={styles.waterIconContainer}>
                                <Image 
                                    source={require('./Images/Home/water.png')}
                                    style={styles.waterIcon}
                                />
                            </View>
                            <Text style={styles.taskText}>Watering Day</Text>
                            <TouchableOpacity 
                                style={[styles.markButton, taskCompleted && styles.markButtonCompleted]}
                                onPress={handleMarkAsDone}
                                disabled={taskCompleted}
                            >
                                <Text style={styles.markButtonText}>
                                    {taskCompleted ? 'Completed' : 'Mark as done'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.taskCard}>
                        <Text style={styles.nextTask}>Next Task</Text>

                            <View style={styles.fertilizerIconContainer}>

                                <Image 
                                    source={require('./Images/Home/fertilizer.png')}
                                    style={styles.fertilizerIcon}
                                />
                            </View>
                            <Text style={styles.taskText}>Fertilizing Day</Text>
                            <Text style={styles.taskDate}>{new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString()}</Text>
                            </View>
                    </View>
                </View>

                <View style={styles.menuGrid}>
                    <TouchableOpacity 
                        style={styles.menuItem}
                        onPress={() => navigation.navigate(ScreensName.CropAdvisor)}
                    >
                        <View style={styles.cropAdvisorIcon}>
                            <Image 
                                source={require('./Images/Home/1.png')}
                                style={styles.menuIconImage}
                            />
                        </View>
                        <Text style={styles.menuText}>Crop Advisor</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.menuItem}
                        onPress={() => navigation.navigate(ScreensName.FertilizerAdvisor)}
                    >
                        <View style={styles.fertilizerAdvisorIcon}>
                            <Image 
                                source={require('./Images/Home/2.png')}
                                style={styles.menuIconImage}
                            />
                        </View>
                        <Text style={styles.menuText}>Fertilizer{'\n'}Advisor</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.menuItem}
                        onPress={() => navigation.navigate(ScreensName.PricingAdvisor)}>
                        <View style={styles.pricingIcon}>
                            <Image 
                                source={require('./Images/Home/3.png')}
                                style={styles.menuIconImage}
                            />
                        </View>
                        <Text style={styles.menuText}>Pricing{'\n'}Advisor</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.menuItem}
                        onPress={() => navigation.navigate(ScreensName.YieldTracker)}
                    >
                        <View style={styles.yieldIcon}>
                            <Image 
                                source={require('./Images/Home/4.png')}
                                style={styles.menuIconImage}
                            />
                        </View>
                        <Text style={styles.menuText}>Yield Tracker</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.menuItem}
                        onPress={() => navigation.navigate(ScreensName.AgriServices)}
                    >
                        <View style={styles.agriIcon}>
                            <Image 
                                source={require('./Images/Home/4.png')}
                                style={styles.menuIconImage}
                            />
                        </View>
                        <Text style={styles.menuText}>Agri Services</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* <View style={styles.bottomBarContainer}>
                <BottomBar />
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    navbarContainer: {
        height: hp('8.5%'),
        backgroundColor: colors.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GRAY,
    },
    content: {
        flex: 1,
        padding: wp('4%'),
    },
    title: {
        fontSize: wp('6%'),
        fontWeight: 'bold',
        color: colors.BLACK,
        marginBottom: hp('2%'),
    },
    taskSection: {
        marginBottom: hp('3%'),
    },
    taskHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('2%'),
    },
    sectionTitle: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        marginBottom: hp('1%'),

        color: colors.BLACK,
    },
    nextTask: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
        marginBottom: hp('2%'),
        color: colors.GREEN,
    },
    taskCards: {
        flexDirection: 'row',
        gap: wp('4%'),
    },
    taskCard: {
        flex: 1,
        backgroundColor: '#F0F9F6',
        padding: wp('4%'),
        borderRadius: wp('3%'),
        elevation: 2,
        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        alignItems: 'center',
    },
    waterIconContainer: {
        width: wp('10%'),
        height: wp('10%'),
        marginBottom: hp('1%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    waterIcon: {
        width: wp('8%'),
        height: wp('10%'),
        resizeMode: 'contain',
    },
    fertilizerIconContainer: {
        width: wp('10%'),
        height: wp('10%'),
        marginBottom: hp('1%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    fertilizerIcon: {
        width: wp('10%'),
        height: wp('10%'),
        resizeMode: 'contain',
    },
    taskText: {
        fontSize: wp('3.8%'),
        color: colors.BLACK,
        marginBottom: hp('1%'),
        textAlign: 'center',
        fontWeight: '500',
    },
    taskDate: {
        fontSize: wp('3.5%'),
        color: colors.GRAY,
        marginBottom: hp('1%'),
    },
    markButton: {
        backgroundColor: colors.GREEN,
        paddingVertical: wp('2%'),
        paddingHorizontal: wp('4%'),
        borderRadius: wp('2%'),
        alignItems: 'center',
    },
    markButtonCompleted: {
        backgroundColor: colors.GRAY,
    },
    markButtonText: {
        color: colors.WHITE,
        fontSize: wp('3.5%'),
        fontWeight: '500',
    },
    menuGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: hp('2%'),
    },
    menuItem: {
        width: wp('43%'),
        height: hp('15%'),
        backgroundColor: colors.WHITE,
        borderRadius: wp('3%'),
        padding: wp('3%'),
        elevation: 2,
        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cropAdvisorIcon: {
        width: wp('12%'),
        height: wp('12%'),
        marginRight: wp('3%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    fertilizerAdvisorIcon: {
        width: wp('12%'),
        height: wp('12%'),
        marginRight: wp('3%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    pricingIcon: {
        width: wp('12%'),
        height: wp('12%'),
        marginRight: wp('3%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    yieldIcon: {
        width: wp('12%'),
        height: wp('12%'),
        marginRight: wp('3%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    agriIcon: {
        width: wp('12%'),
        height: wp('12%'),
        marginRight: wp('3%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuIconImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    menuText: {
        fontSize: wp('3.8%'),
        color: colors.BLACK,
        flexShrink: 1,
        fontWeight: '500',
    },
    bottomBarContainer: {
        height: hp('8%'),
        backgroundColor: colors.WHITE,
        borderTopWidth: 1,
        borderTopColor: colors.LIGHT_GRAY,
    },
});

export default EAdviser; 
// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const EAdviser = () => {
//   return (
//     <View>
//       <Text>EAdviser</Text>
//     </View>
//   )
// }

// export default EAdviser

// const styles = StyleSheet.create({})