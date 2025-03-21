import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';

const SummaryOfSpendings = () => {
    const { t } = useTranslation();

    // Spending data
    const spendingData = [
        { category: 'Transport', amount: 16000, color: '#9966FF', percentage: 33.3 },
        { category: 'Fertilizer', amount: 16000, color: '#BDBDBD', percentage: 33.3 },
        { category: 'Pesticide', amount: 16000, color: '#D0B3FF', percentage: 33.3 },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>

            <View style={styles.searchBarContainer}>
                <CustomSearchApp placeholder="Search in here" />
            </View>
            <Text style={styles.title}>Summary of Spendings</Text>
            <View style={styles.contentContainer}>
                <View style={styles.chartContainer}>
                    <View style={styles.chartWrapper}>
               
                        <AnimatedCircularProgress
                            size={wp('50%')}
                            width={wp('8%')}
                            backgroundWidth={wp('8%')}
                            fill={100}
                            tintColor={spendingData[0].color}
                            backgroundColor="transparent"
                            arcSweepAngle={120}
                            rotation={0}
                            style={styles.chartSection}
                        />

                        {/* Fertilizer section (120 degrees) */}
                        <AnimatedCircularProgress
                            size={wp('50%')}
                            width={wp('8%')}
                            backgroundWidth={wp('8%')}
                            fill={100}
                            tintColor={spendingData[1].color}
                            backgroundColor="transparent"
                            arcSweepAngle={120}
                            rotation={120}
                            style={styles.chartSection}
                        />

                    
                        <AnimatedCircularProgress
                            size={wp('50%')}
                            width={wp('8%')}
                            backgroundWidth={wp('8%')}
                            fill={100}
                            tintColor={spendingData[2].color}
                            backgroundColor="transparent"
                            arcSweepAngle={120}
                            rotation={240}
                            style={styles.chartSection}
                        />

                      
                        <View style={[styles.chartLabel, styles.transportLabel]}>
                        <Text style={styles.legendText}>{spendingData[2].category}</Text>
                        <Text style={styles.legendPercentage}>{spendingData[2].percentage}%</Text>
                        </View>

                        <View style={[styles.chartLabel, styles.fertilizerLabel]}>
                        <Text style={styles.legendText}>{spendingData[0].category}</Text>
                        <Text style={styles.legendPercentage}>{spendingData[0].percentage}%</Text>
                         
                        </View>

                        <View style={[styles.chartLabel, styles.pesticideLabel]}>
                        <Text style={styles.legendText}>{spendingData[1].category}</Text>
                        <Text style={styles.legendPercentage}>{spendingData[1].percentage}%</Text>
                    
                        </View>
                    </View>
                </View>

                <View style={styles.spendingDetailsContainer}>
                    {spendingData.map((item, index) => (
                        <View key={index} style={styles.spendingItem}>
                            <Text style={[styles.spendingAmount, { color: item.color }]}>
                                {item.amount.toLocaleString()} Rupees
                            </Text>
                            <Text style={styles.spendingDescription}>
                                spent on {item.category.toLowerCase()}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    navbarContainer: {
        height: hp(8.5),
        backgroundColor: colors.WHITE,
    },
    searchBarContainer: {
        marginTop: hp('2%'),
        paddingHorizontal: wp('5%'),
    },
    contentContainer: {
        marginHorizontal: wp('3%'),
        marginTop: hp('2%'),
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: 8,
    },
    title: {
        fontSize: hp('2.6%'),
        fontFamily: fonts.SemiBold,
        fontWeight: '300',
        color: colors.BLACK,
        marginTop: hp('3%'),
        marginLeft: wp(3),
    },
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: hp('3%'),
        height: wp('60%'),
    },
    chartWrapper: {
        width: wp('60%'),
        height: wp('60%'),
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chartSection: {
        position: 'absolute',
        top: 0,
        left: wp('5%'),
    },
    chartLabel: {
        position: 'absolute',
        alignItems: 'center',
    },
    transportLabel: {
        left: wp(-14),
        top: '40%',
    },
    fertilizerLabel: {
        right: wp(-14),
        top: '40%',
    },
    pesticideLabel: {
        bottom: hp(-2),
        alignSelf: 'center',
    },
    legendText: {
        fontSize: hp('1.6%'),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
    legendPercentage: {
        fontSize: hp('1.6%'),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
    },
    spendingDetailsContainer: {
        marginTop: hp('2%'),
    },
    spendingItem: {
        width: wp('60%'),
        // marginBottom: hp('1.5%'),
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        alignSelf: 'center',
    },
    spendingAmount: {
        fontSize: hp('1.8%'),
        fontFamily: fonts.SemiBold,
    },
    spendingDescription: {
        fontSize: hp('1.8%'),
        fontFamily: fonts.Regular,
        color: colors.GRAY,
        marginLeft: wp('2%'),
    },

    
});

export default SummaryOfSpendings; 