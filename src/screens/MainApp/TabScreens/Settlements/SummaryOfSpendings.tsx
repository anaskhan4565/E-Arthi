import React, { useState } from 'react';
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
    const [searchQuery, setSearchQuery] = useState('');

    // Spending data
    const spendingData = [
        { category: 'Transport', amount: 16000, color: '#9966FF', percentage: 33.3 },
        { category: 'Fertilizer', amount: 16000, color: '#BDBDBD', percentage: 33.3 },
        { category: 'Pesticide', amount: 16000, color: '#D0B3FF', percentage: 10 },
        { category: 'Other', amount: 1500, color: '#124000', percentage: 30 },
    ];

    // Calculate proper angles for each segment based on percentages
    const calculateAngles = () => {
        const total = spendingData.reduce((sum, item) => sum + item.percentage, 0);
        let startAngle = 0;
        
        return spendingData.map(item => {
            const sweepAngle = (item.percentage / total) * 360;
            const angle = {
                start: startAngle,
                sweep: sweepAngle
            };
            startAngle += sweepAngle;
            return angle;
        });
    };

    const angles = calculateAngles();

    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>

            <View style={styles.searchBarContainer}>
                <CustomSearchApp 
                    placeholder="Search in here" 
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            <Text style={styles.title}>Summary of Spendings</Text>
            <View style={styles.contentContainer}>
                <View style={styles.chartContainer}>
                    <View style={styles.chartWrapper}>
                        {/* Transport section */}
                        <AnimatedCircularProgress
                            size={wp('50%')}
                            width={wp('8%')}
                            backgroundWidth={wp('8%')}
                            fill={100}
                            tintColor={spendingData[0].color}
                            backgroundColor="transparen"
                            arcSweepAngle={angles[0].sweep}
                            rotation={angles[0].start}
                            style={styles.chartSection}
                        />

                        {/* Fertilizer section */}
                        <AnimatedCircularProgress
                            size={wp('50%')}
                            width={wp('8%')}
                            backgroundWidth={wp('8%')}
                            fill={100}
                            tintColor={spendingData[1].color}
                            backgroundColor="transparent"
                            arcSweepAngle={angles[1].sweep}
                            rotation={angles[1].start}
                            style={styles.chartSection}
                        />

                        {/* Pesticide section */}
                        <AnimatedCircularProgress
                            size={wp('50%')}
                            width={wp('8%')}
                            backgroundWidth={wp('8%')}
                            fill={100}
                            tintColor={spendingData[2].color}
                            backgroundColor="transparent"
                            arcSweepAngle={angles[2].sweep}
                            rotation={angles[2].start}
                            style={styles.chartSection}
                        />

                        {/* Other section */}
                        <AnimatedCircularProgress
                            size={wp('50%')}
                            width={wp('8%')}
                            backgroundWidth={wp('8%')}
                            fill={100}
                            tintColor={spendingData[3].color}
                            backgroundColor="transparent"
                            arcSweepAngle={angles[3].sweep}
                            rotation={angles[3].start}
                            style={styles.chartSection}
                        />

                        {/* Position the labels based on the center of each segment */}
                        <View style={[styles.chartLabel, { 
                            left: Math.cos((angles[0].start + angles[0].sweep/2) * Math.PI / 180) * wp('25%'),
                            top: Math.sin((angles[0].start + angles[0].sweep/2) * Math.PI / 180) * wp('29%') + wp('25%'),
                        }]}>
                            <Text style={styles.legendText}>{spendingData[0].category}</Text>
                            <Text style={styles.legendPercentage}>{spendingData[0].percentage}%</Text>
                        </View>

                        <View style={[styles.chartLabel, { 
                            left: Math.cos((angles[1].start + angles[1].sweep/2) * Math.PI / 180) * wp('25%') + wp('10%'),
                            top: Math.sin((angles[1].start + angles[1].sweep/2) * Math.PI / 180) * wp('20%') + wp('25%'),
                        }]}>
                            <Text style={styles.legendText}>{spendingData[1].category}</Text>
                            <Text style={styles.legendPercentage}>{spendingData[1].percentage}%</Text>
                        </View>

                        <View style={[styles.chartLabel, { 
                            left: Math.cos((angles[2].start + angles[2].sweep/2) * Math.PI / 180) * wp('20%') + wp('-4%'),
                            top: Math.sin((angles[2].start + angles[2].sweep/2) * Math.PI / 180) * wp('29%') + wp('25%'),
                        }]}>
                            <Text style={styles.legendText}>{spendingData[2].category}</Text>
                            <Text style={styles.legendPercentage}>{spendingData[2].percentage}%</Text>
                        </View>

                        <View style={[styles.chartLabel, { 
                            left: Math.cos((angles[3].start + angles[3].sweep/2) * Math.PI / 180) * wp('34%') + wp('25%'),
                            top: Math.sin((angles[3].start + angles[3].sweep/2) * Math.PI / 180) * wp('25%') + wp('25%'),
                        }]}>
                            <Text style={styles.legendText}>{spendingData[3].category}</Text>
                            <Text style={styles.legendPercentage}>{spendingData[3].percentage}%</Text>
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
        left: 0,
    },
    chartLabel: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',

        padding: 4,
    },
    legendText: {
        fontSize: hp('1.6%'),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
    legendPercentage: {
        fontSize: hp('1.6%'),
        fontFamily: fonts.Bold,
        color: colors.BLACK,
    },
    spendingDetailsContainer: {
        marginTop: hp('2%'),
        paddingBottom: hp('2%'),
    },
    spendingItem: {
        width: wp('60%'),
        marginBottom: hp('1.5%'),
        flexDirection: 'row',
        alignItems: 'center',
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