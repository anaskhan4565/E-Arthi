import { StyleSheet, View, Image, Dimensions } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ScreensName from '../../../../../util/Constants/ScreensName';
import Home from './HomeScr';
import EMarket from './E-Market';
import EMunshi from '../E-Munshi/E-Munshi';
import colors from '../../../../../util/Constants/colors';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../../../../util/Constants/FontName';
import EWarehouseMainStack from "../E-Warehouse/E-WarehouseMainStack";
import EMunshiMainStack from '../E-Munshi/E-MunshiMainStack';
import NewHomeMainStack from './NewHomeMainStack';
import DashboardScreen from './DashBoard';

const { height, width } = Dimensions.get("window");

export default function MainTabNavigation() {
    const Tab = createBottomTabNavigator();
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: colors.GREEN,
                    tabBarInactiveTintColor: colors.GREEN,
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: colors.LIGHT_GREEN,
                        height: hp('9%'),
                        borderTopWidth: 1,
                        borderTopColor: '#ccc',
                        overflow: 'hidden',
                    },
                    tabBarLabelStyle: styles.labelStyle,
                    tabBarIconStyle: {
                        width: wp('6%'),
                        height: hp('6%'),
                        justifyContent: 'center',
                        alignItems: 'center'
                    },
                }}
            >
                <Tab.Screen
                    name="Dashboard"
                    component={DashboardScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={require('../../../../assets/MainApp/NewTabIcons/DashBoardIcon.png')}
                                style={[
                                    styles.icon,
                                    { tintColor: colors.GREEN },
                                ]}
                            />
                        ),
                        tabBarLabel: t('Dashboard'),
                    }}
                />

                <Tab.Screen
                    name={t(ScreensName.EMunshiMainStack)}
                    component={EMunshiMainStack}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={require('../../../../assets/MainApp/NewTabIcons/EMunshiIcon.png')}
                                // style={[
                                //     styles.icon,
                                //     { tintColor: colors.GREEN },
                                // ]}
                            />
                        ),
                        tabBarLabel: t('E-Munshi'),
                    }}
                />

                <Tab.Screen
                    name={t(ScreensName.NewHomeMainStack)}
                    component={NewHomeMainStack}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={require('../../../../assets/MainApp/NewTabIcons/HomeIcon.png')}
                                style={[
                                    styles.icon,
                                    { tintColor: colors.GREEN },
                                ]}
                            />
                        ),
                        tabBarLabel: t('Home'),
                    }}
                />

                <Tab.Screen
                    name={t(ScreensName.EWarehouseMainStack)}
                    component={EWarehouseMainStack}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={require('../../../../assets/MainApp/NewTabIcons/EWarehouseIcon.png')}
                                style={[
                                    styles.icon,
                                    { tintColor: colors.GREEN },
                                ]}
                            />
                        ),
                        tabBarLabel: t('E-Warehouse'),
                    }}
                />

                <Tab.Screen
                    name={t(ScreensName.EMarket)}
                    component={EMarket}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={require('../../../../assets/MainApp/NewTabIcons/EMarketIcon.png')}
                                style={[
                                    styles.icon,
                                    { tintColor: colors.GREEN },
                                ]}
                            />
                        ),
                        tabBarLabel: t('E-Market'),
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
        width: wp('8%'),
        height: hp('4%'),
        resizeMode: 'contain',
    },
    labelStyle: {
        fontSize: hp('1.3%'),
        fontFamily: fonts.Medium,
        marginTop: -hp(0.5),
        color: colors.GRAY,
    },
});
