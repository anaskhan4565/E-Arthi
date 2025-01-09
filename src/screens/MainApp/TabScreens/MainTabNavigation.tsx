import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ScreensName from '../../../../util/ScreensName';
import Home from './HomeScr';
import ELoan from './E-Loan';
import EInventory from './E-Inventory';
import EMarket from './E-Market';
import EMunshi from './E-Munshi';
import colors from '../../../../util/colors';

export default function MainTabNavigation() {
    const Tab = createBottomTabNavigator();

    return (
        <View style={styles.container}>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: colors.GREEN,
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false,

                    tabBarStyle: {
                        backgroundColor: colors.LIGHT_GREEN,
                        height: hp('9%'),
                        borderTopWidth: 1,
                        borderTopColor: '#ccc',
                        borderBottomLeftRadius: hp('1.5%'),
                        borderBottomRightRadius: 15,
                        overflow: 'hidden',
                    },
                    tabBarLabelStyle: styles.labelStyle,
                    tabBarIconStyle: { width: wp('4%'), height: hp('4%'), marginTop: hp('1%') },
                }}
            >
                <Tab.Screen
                    name={ScreensName.Home}
                    component={Home}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={require('../../../assets/MainApp/TabIcons/Home.png')}
                                style={[
                                    styles.icon,
                                    { tintColor: focused ? colors.GREEN : 'gray' },
                                ]}
                            />
                        ),
                        tabBarLabel: 'Home',
                    }}
                />
                <Tab.Screen
                    name={ScreensName.EInvetory}
                    component={EInventory}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={require('../../../assets/MainApp/TabIcons/E-Inventory.png')}
                                style={[
                                    styles.icon,
                                    { tintColor: focused ? colors.GREEN : 'gray' },
                                ]}
                            />
                        ),
                        tabBarLabel: 'E-Inventory',
                    }}
                />
                <Tab.Screen
                    name={ScreensName.EMarket}
                    component={EMarket}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={require('../../../assets/MainApp/TabIcons/E-Market.png')}
                                style={[
                                    styles.icon,
                                    { tintColor: focused ? colors.GREEN : 'gray' },
                                ]}
                            />
                        ),
                        tabBarLabel: 'E-Market',
                    }}
                />
                <Tab.Screen
                    name={ScreensName.EMunshi}
                    component={EMunshi}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={require('../../../assets/MainApp/TabIcons/E-Munshi.png')}
                                style={[
                                    styles.icon,
                                    { tintColor: focused ? colors.GREEN : 'gray' },
                                ]}
                            />
                        ),
                        tabBarLabel: 'E-Munshi',
                    }}
                />
                <Tab.Screen
                    name={ScreensName.ELoan}
                    component={ELoan}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={require('../../../assets/MainApp/TabIcons/E-Loan.png')}
                                style={[
                                    styles.icon,
                                    { tintColor: focused ? colors.GREEN : 'gray' },
                                ]}
                            />
                        ),
                        tabBarLabel: 'E-Loan',
                    }}
                />
            </Tab.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        width: wp('6%'),
        height: hp('3%'),
        resizeMode: 'contain',
    },
    labelStyle: {
        fontSize: hp('1.5%'),
        fontWeight: 'bold',
    },
});
