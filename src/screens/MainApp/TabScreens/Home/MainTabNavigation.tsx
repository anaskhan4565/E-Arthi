import { StyleSheet, View, Image, Dimensions, TouchableOpacity, Text, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ScreensName from '../../../../../util/Constants/ScreensName';
import Home from './HomeScr';
import EMarketMainStack from './EMarketMainStack';
import EMunshi from '../E-Munshi/E-Munshi';
import colors from '../../../../../util/Constants/colors';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../../../../util/Constants/FontName';
import EWarehouseMainStack from "../E-Warehouse/E-WarehouseMainStack";
import EMunshiMainStack from '../E-Munshi/E-MunshiMainStack';
import NewHomeMainStack from './NewHomeMainStack';
import DashBoardNew from './DashBoardNew';

const { height, width } = Dimensions.get("window");

// Tab bar custom styles
const TAB_BAR_HEIGHT = hp('9%');
const ICON_SIZE = hp('4%');
const ICON_CONTAINER_SIZE = hp('6%');
const LIFT_DISTANCE = hp('2.5%'); // Increased lift distance for more dramatic effect

// Types for tab bar props
interface TabBarProps {
    state: {
        index: number;
        routes: Array<{
            key: string;
            name: string;
        }>;
    };
    descriptors: {
        [key: string]: {
            options: {
                tabBarLabel?: string | ((props: { focused: boolean; color: string; position: any; children: string; }) => React.ReactNode);
            };
        };
    };
    navigation: any;
    insets?: any;
}

// Custom Tab Bar component
function MyTabBar({ state, descriptors, navigation }: TabBarProps) {
    const { t } = useTranslation();
    const [prevIndex, setPrevIndex] = useState(state.index);
    const animatedValues = useRef(state.routes.map(() => new Animated.Value(0))).current;

    // Run animation when the selected tab changes
    useEffect(() => {
        if (prevIndex !== state.index) {
            // Create parallel animations for smoother transitions
            const animations = [
                // Animate previous tab down with spring for bouncy effect
                Animated.spring(animatedValues[prevIndex], {
                    toValue: 0,
                    velocity: 10,
                    tension: 80,
                    friction: 9,
                    useNativeDriver: true,
                }),

                // Animate new tab up with spring
                Animated.spring(animatedValues[state.index], {
                    toValue: 1,
                    velocity: 10,
                    tension: 80,
                    friction: 9,
                    useNativeDriver: true,
                })
            ];

            // Run animations in parallel for smoother transitions
            Animated.parallel(animations).start();

            setPrevIndex(state.index);
        }
    }, [state.index, prevIndex, animatedValues]);

    // Initialize animations for the initial tab
    useEffect(() => {
        Animated.spring(animatedValues[state.index], {
            toValue: 1,
            velocity: 10,
            tension: 80,
            friction: 9,
            useNativeDriver: true,
        }).start();
    }, []);

    // Helper function to render the label
    const renderLabel = (label: string | ((props: any) => React.ReactNode), isFocused: boolean, index: number) => {
        // Create animated opacity based on focus state
        const opacity = animatedValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.7, 1],
        });

        // Create animated scale for labels
        const scale = animatedValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.1],
        });

        if (typeof label === 'function') {
            return label({
                focused: isFocused,
                color: isFocused ? colors.GREEN : colors.GRAY,
                position: 'below-icon',
                children: ''
            });
        }

        return (
            <Animated.Text
                style={[
                    styles.labelStyle,
                    {
                        color: isFocused ? colors.GREEN : colors.GRAY,
                        fontFamily: isFocused ? fonts.Bold : fonts.Medium,
                        opacity: opacity,
                        transform: [{ scale }]
                    }
                ]}
            >
                {label}
            </Animated.Text>
        );
    };

    return (
        <View style={styles.tabBarContainer}>
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
                    case ScreensName.DashBoardNew:
                        iconSource = require('../../../../assets/MainApp/NewTabIcons/DashBoard.png');
                        break;
                    case t(ScreensName.EMarketMainStack):
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

                // Calculate animations based on focused state
                const translateY = animatedValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -LIFT_DISTANCE],
                });

                const scale = animatedValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.2],
                });

                const rotate = animatedValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                });

                // Shadow opacity and elevation animation
                const shadowOpacity = animatedValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.35],
                });

                const elevation = animatedValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 8],
                });

                return (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.7}
                        onPress={onPress}
                        style={styles.tabButton}
                    >
                        <Animated.View
                            style={[
                                styles.iconContainer,
                                {
                                    transform: [
                                        { translateY },
                                        { scale }
                                    ],
                                    shadowOpacity,
                                    elevation,
                                }
                            ]}
                        >
                            <Animated.View
                                style={[
                                    isFocused ? styles.activeIconContainer : {},
                                    isFocused && { transform: [{ rotate }] }
                                ]}
                            >
                                <Image
                                    source={iconSource}
                                    style={[
                                        styles.icon,
                                        { tintColor: isFocused ? colors.WHITE : colors.GREEN },
                                    ]}
                                />
                            </Animated.View>
                        </Animated.View>
                        {renderLabel(label, isFocused, index)}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default function MainTabNavigation() {
    const Tab = createBottomTabNavigator();
    const { t } = useTranslation();

    // Transition configuration for screens
    const screenOptions = {
        headerShown: false,
        tabBarActiveTintColor: colors.GREEN,
        tabBarInactiveTintColor: colors.GRAY,
    };

    return (
        <View style={styles.container}>
            <Tab.Navigator
                initialRouteName={t(ScreensName.NewHomeMainStack)}
                screenOptions={screenOptions}
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
                    name={t(ScreensName.DashBoardNew)}
                    component={DashBoardNew}
                    options={{
                        tabBarLabel: t('Dashboard'),
                    }}
                />
                <Tab.Screen
                    name={t(ScreensName.EMarketMainStack)}
                    component={EMarketMainStack}
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
    tabBarContainer: {
        flexDirection: 'row',
        height: TAB_BAR_HEIGHT,
        backgroundColor: colors.LIGHT_GREEN,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingBottom: hp(0.5),
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: TAB_BAR_HEIGHT,
        paddingBottom: hp(0.5),
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: ICON_CONTAINER_SIZE,
        width: ICON_CONTAINER_SIZE,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 8,
    },
    icon: {
        width: ICON_SIZE,
        height: ICON_SIZE,
        resizeMode: 'contain',
    },
    labelStyle: {
        fontSize: hp('1.3%'),
        fontFamily: fonts.Medium,
        marginTop: hp(0.8),
    },
    activeIconContainer: {
        backgroundColor: colors.GREEN,
        borderRadius: wp(100),
        justifyContent: 'center',
        alignItems: 'center',
        padding: hp(1),
        height: ICON_CONTAINER_SIZE,
        width: ICON_CONTAINER_SIZE,
    },
});
