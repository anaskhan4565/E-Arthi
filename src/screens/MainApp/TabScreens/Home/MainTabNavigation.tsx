import { StyleSheet, View, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
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

// Custom Tab Bar component
function MyTabBar({ state, descriptors, navigation }) {
    const { t } = useTranslation();

    return (
        <View style={{
            flexDirection: 'row',
            height: hp('9%'),
            backgroundColor: colors.LIGHT_GREEN,
            borderTopWidth: 1,
            borderTopColor: '#ccc',
        }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel || route.name;

                const isFocused = state.index === index;

                // Get the appropriate icon
                let iconSource;
                switch (route.name) {
                    case t(ScreensName.NewHomeMainStack):
                        iconSource = require('../../../../assets/MainApp/NewTabIcons/Home.png');
                        break;
                    case 'Dashboard':
                        iconSource = require('../../../../assets/MainApp/NewTabIcons/DashBoard.png');
                        break;
                    case t(ScreensName.EMarket):
                        iconSource = require('../../../../assets/MainApp/NewTabIcons/Cart.png');
                        break;
                    case t(ScreensName.EWarehouseMainStack):
                        iconSource = require('../../../../assets/MainApp/NewTabIcons/EWareHouse.png');
                        break;
                    case t(ScreensName.EMunshiMainStack):
                        iconSource = require('../../../../assets/MainApp/NewTabIcons/EMunshi.png');
                        break;
                    default:
                        iconSource = require('../../../../assets/MainApp/NewTabIcons/Home.png');
                }

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={1} // This prevents any press feedback
                        onPress={onPress}
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                    >
                        <View style={isFocused ? styles.activeIconContainer : {}}>
                            <Image
                                source={iconSource}
                                style={[
                                    styles.icon,
                                    { tintColor: isFocused ? colors.WHITE : colors.GREEN },
                                ]}
                            />
                        </View>
                        <Text style={[
                            styles.labelStyle,
                            {
                                color: isFocused ? colors.GREEN : colors.GRAY,
                                opacity: 1,  // Ensure label is always visible
                                fontFamily: isFocused ? fonts.Bold : fonts.Medium,  // Make active tab bold
                            }
                        ]}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default function MainTabNavigation() {
    const Tab = createBottomTabNavigator();
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <Tab.Navigator
                initialRouteName={t(ScreensName.NewHomeMainStack)}
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: colors.GREEN,
                    tabBarInactiveTintColor: colors.GRAY,
                }}
                tabBar={props => <MyTabBar {...props} />}
            >
                <Tab.Screen
                    name={t(ScreensName.NewHomeMainStack)}
                    component={NewHomeMainStack}
                    options={{
                        tabBarLabel: t('Home'),
                    }}
                />
                <Tab.Screen
                    name="Dashboard"
                    component={DashboardScreen}
                    options={{
                        tabBarLabel: t('Dashboard'),
                    }}
                />
                <Tab.Screen
                    name={t(ScreensName.EMarket)}
                    component={EMarket}
                    options={{
                        tabBarLabel: t('E-Market'),
                    }}
                />
                <Tab.Screen
                    name={t(ScreensName.EWarehouseMainStack)}
                    component={EWarehouseMainStack}
                    options={{
                        tabBarLabel: t('E-Warehouse'),
                    }}
                />
                <Tab.Screen
                    name={t(ScreensName.EMunshiMainStack)}
                    component={EMunshiMainStack}
                    options={{
                        tabBarLabel: t('E-Munshi'),
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
        width: wp('9%'),
        height: hp('4%'),
        resizeMode: 'contain',
    },
    labelStyle: {
        fontSize: hp('1.3%'),
        fontFamily: fonts.Medium,
        marginTop: hp(0.7),
    },
    activeIconContainer: {
        backgroundColor: colors.GREEN,
        borderRadius: wp(100),
        justifyContent: 'center',
        alignItems: 'center',
        padding: hp(1),
        marginBottom: -hp(0.7),
    },
});
