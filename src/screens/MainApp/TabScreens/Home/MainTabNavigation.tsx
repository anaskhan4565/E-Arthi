import { StyleSheet, View, Image, Dimensions, TouchableOpacity, Text, Animated } from 'react-native';
import React, { useRef, useEffect, useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ScreensName from '../../../../../util/Constants/ScreensName';
import Home from './HomeScr';
import EMarketMainStack from './EMarketMainStack';
import colors from '../../../../../util/Constants/colors';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../../../../util/Constants/FontName';
import EWarehouseMainStack from "../E-Warehouse/E-WarehouseMainStack";
import EMunshiMainStack from '../E-Munshi/E-MunshiMainStack';
import NewHomeMainStack from './NewHomeMainStack';
import DashBoardNew from './DashBoardNew';
import BottomTabData from './BottomTab/BottomTab';
import { useSelector } from 'react-redux';

const { height, width } = Dimensions.get("window");
const TAB_BAR_HEIGHT = hp('10%'); // Increased height

// Type definitions for tab bar props
interface TabBarProps {
    state: {
        index: number;
        routes: Array<{
            key: string;
            name: string;
        }>;
    };
    descriptors: any;
    navigation: any;
}

// Custom Tab Bar component
function MyTabBar({ state, descriptors, navigation }: TabBarProps) {
    const { t } = useTranslation();
    const prevIndexRef = useRef(state.index);
    const cartAnimatedValue = useRef(new Animated.Value(0)).current;
    
    // Get cart items from Redux store
    const cart = useSelector((state: any) => state.emarket?.cart || []);
    const cartCount = cart.length;
    
    // Animation for cart icon when selected/unselected
    useEffect(() => {
        // Check if cart tab was selected or unselected
        const cartRouteIndex = state.routes.findIndex(route => route.name === t(ScreensName.EMarketMainStack));
        
        if (cartRouteIndex >= 0) {
            const wasSelected = prevIndexRef.current === cartRouteIndex;
            const isSelected = state.index === cartRouteIndex;
            
            if (!wasSelected && isSelected) {
                // Cart got selected - animate up
                Animated.spring(cartAnimatedValue, {
                    toValue: 1,
                    tension: 50,
                    friction: 7,
                    useNativeDriver: true
                }).start();
            } else if (wasSelected && !isSelected) {
                // Cart got unselected - animate down
                Animated.spring(cartAnimatedValue, {
                    toValue: 0,
                    tension: 50,
                    friction: 7,
                    useNativeDriver: true
                }).start();
            }
        }
        
        prevIndexRef.current = state.index;
    }, [state.index, cartAnimatedValue, t]);
    
    // Pre-find icons for better performance
    const icons = useMemo(() => {
        return {
            home: BottomTabData.find(tab => tab.id === 'home'),
            dashboard: BottomTabData.find(tab => tab.id === 'dashboard'),
            cart: BottomTabData.find(tab => tab.id === 'cart'),
            warehouse: BottomTabData.find(tab => tab.id === 'warehouse'),
            munshi: BottomTabData.find(tab => tab.id === 'munshi')
        };
    }, []);
    
    return (
        <View style={styles.tabBarContainer}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel || route.name;
                const isFocused = state.index === index;
                
                // Get icons based on the route name - faster lookup
                let iconData;
                switch (route.name) {
                    case t(ScreensName.NewHomeMainStack):
                        iconData = icons.home;
                        break;
                    case ScreensName.DashBoardNew:
                        iconData = icons.dashboard;
                    break;
                    case t(ScreensName.EMarketMainStack):
                        iconData = icons.cart;
                        break;
                    case t(ScreensName.EWarehouseMainStack):
                        iconData = icons.warehouse;
                        break;
                    case t(ScreensName.EMunshiMainStack):
                        iconData = icons.munshi;
                        break;
                    default:
                        iconData = icons.home;
                }

                const ActiveIcon = iconData?.icon || null;
                const InactiveIcon = iconData?.inactiveIcon || null;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // Direct navigation without extra params for speed
                        navigation.navigate(route.name);
                    }
                };

                // Render central cart icon differently (with circle background)
                const isCartTab = route.name === t(ScreensName.EMarketMainStack);
                
                // Cart-specific animation transformations
                const cartTranslateY = cartAnimatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -hp('2.5%')]
                });
                
                return (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.7}
                        onPress={onPress}
                        style={[
                            styles.tabButton,
                        ]}
                    >
                        {isCartTab ? (
                            <Animated.View 
                                style={[
                                    styles.cartButtonContainer,
                                    { transform: [{ translateY: cartTranslateY }] }
                                ]}
                            >
                                <View style={[
                                    styles.cartIconContainer, 
                                    isFocused ? styles.activeCartIconContainer : styles.inactiveCartIconContainer
                                ]}>
                                    {isFocused && ActiveIcon ? 
                                        <ActiveIcon width={26} height={26} fill={colors.WHITE} /> : 
                                        InactiveIcon && <InactiveIcon width={26} height={26} />}
                                    
                                    {/* {cartCount > 0 && (
                                        <View style={styles.cartBadge}>
                                            <Text style={styles.cartBadgeText}>{cartCount}</Text>
                                        </View>
                                    )} */}
                                </View>
                                
                                {isFocused && (
                                    <Text style={[styles.labelStyle, styles.activeLabel]}>
                                        Cart ({cartCount})
                                    </Text>
                                )}
                            </Animated.View>
                        ) : (
                            <>
                                <View style={styles.iconContainer}>
                                    {isFocused && ActiveIcon ? 
                                        <ActiveIcon width={24} height={24} /> : 
                                        InactiveIcon && <InactiveIcon width={24} height={24} />}
                                </View>
                                <Text style={[
                                    styles.labelStyle,
                                    isFocused ? styles.activeLabel : styles.inactiveLabel
                                ]}>
                                    {label}
                                </Text>
                            </>
                        )}
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
                    // Optimize navigation performance
                    freezeOnBlur: true,
                    lazy: false, // Keep screens mounted for faster switching
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
        backgroundColor: '#f5fbfa',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        paddingTop: hp('1%'),
        paddingBottom: hp('1.5%'),
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartButtonContainer: {
        alignItems: 'center',
    },
    iconContainer: {
        height: hp('4%'),
        width: wp('10%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp('0.8%'),
    },
    cartIconContainer: {
        width: wp('16%'),
        height: wp('16%'),
        borderRadius: wp('16%') / 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp('0.8%'),
        position: 'relative',
    },
    cartBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'red',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    cartBadgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    activeCartIconContainer: {
        backgroundColor: colors.GREEN,
        elevation: 5,
        shadowColor: colors.GREEN,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    inactiveCartIconContainer: {
        backgroundColor: '#D9D9D9',
    },
    labelStyle: {
        fontSize: hp('1.4%'),
        fontFamily: fonts.Medium,
        textAlign: 'center',
    },
    activeLabel: {
        color: colors.GREEN,
        fontFamily: fonts.SemiBold,
    },
    inactiveLabel: {
        color: colors.GRAY,
    },
});
