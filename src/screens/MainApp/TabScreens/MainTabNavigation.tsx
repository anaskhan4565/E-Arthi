import { StyleSheet, View, Image, Dimensions } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ScreensName from '../../../../util/ScreensName';
import Home from './HomeScr';
import ELoan from './E-Loan';
import EInventory from './E-InventoryScreens/E-Inventory';
import EMarket from './E-Market';
import EMunshi from './E-Munshi';
import colors from '../../../../util/colors';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../../../util/FontName';

const { height, width } = Dimensions.get("window");
export default function MainTabNavigation() {
    const Tab = createBottomTabNavigator();
    const { t } = useTranslation();
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
                    tabBarIconStyle: { width: wp('5%'), height: hp('5%'), justifyContent: 'center', alignItems: 'center' },
                }}
            >
                <Tab.Screen
                    name={t(ScreensName.Home)}
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
                        tabBarLabel: t('Home'),
                    }}
                />
                <Tab.Screen
                    name={t(ScreensName.EInvetory)}
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
                        tabBarLabel: t('E-Inventory'),
                    }}
                />
                <Tab.Screen
                    name={t(ScreensName.EMarket)}
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
                        tabBarLabel: t('E-Market'),
                    }}
                />
                <Tab.Screen
                    name={t(ScreensName.EMunshi)}
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
                        tabBarLabel: t('E-Munshi'),
                    }}
                />
                <Tab.Screen
                    name={t(ScreensName.ELoan)}
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
                        tabBarLabel: t('E-Loan'),
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
        marginRight: width > 600 ? wp('1.5%') : wp('0%'),
    },
    labelStyle: {
        fontSize: hp('1.3%'),
        fontFamily: fonts.Medium,
    },
});
