import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import colors from '../../../../../../util/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const MyPieChart = ({
  chartWidth = wp(50),         
  chartHeight = hp(17),         
  containerWidth = wp(40),      
  containerHeight = hp(30),     
  legend1Name = 'Total Loan Amount',
  legend1Population = 100000,
  legend2Name = 'Remaining Loan',
  legend2Population = 25000,
  legend1_color = colors.GREEN,
  legend2_color = colors.LIGHT_PURPLE,
}) => {
  const data = [
    {
      name: legend1Name,
      population: legend1Population,
      color: legend2_color,
      legendFontColor: '#7F7F7F',
      legendFontSize: 0,
    },
    {
      name: legend2Name,
      population: legend2Population,
      color: legend1_color,
      legendFontColor: colors.WHITE,
      legendFontSize: 0,
    },
  ];

  return (
    <View style={[styles.box, { width: containerWidth, height: containerHeight }]}>
      <PieChart
        data={data}
        width={chartWidth}
        height={chartHeight}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        absolute
        hasLegend={false} 
      />

      <View style={styles.legendContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    borderRadius: wp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp('0.5%') },
    shadowOpacity: 0.3,
    shadowRadius: hp('1%'),
    elevation: 5,
    padding: wp('4%'),
    margin: hp('1%'),
    marginVertical: hp('2%'),
  },
  legendContainer: {
    marginTop: hp('2%'),
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  colorBox: {
    width: wp('3%'),
    height: wp('3%'),
    marginRight: wp('2%'),
    borderRadius: wp('0.5%'),
  },
  legendText: {
    fontSize: hp('1.8%'),
    color: '#7F7F7F',
  },
});

export default MyPieChart;