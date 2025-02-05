import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import colors from '../../../../../../util/colors.js';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';

const MyPieChartSec = ({
  chartWidth = wp(50),
  chartHeight = hp(17),
  containerWidth = wp(42),
  containerHeight = hp(30),
  paddingLeft = hp(1),
  data = [],
}) => {
  const { t } = useTranslation();
  const formattedData = data.map((item) => ({
    name: item.name,
    population: item.value,
    color: item.color,
    legendFontColor: item.legendFontColor || '#7F7F7F',
    legendFontSize: item.legendFontSize || 0,
  }));

  return (
    <View style={[styles.box, { width: containerWidth, height: containerHeight }]}>
      <View style={styles.chartContainer}>
        <PieChart
          data={formattedData}
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
          paddingLeft={paddingLeft}
          absolute
          hasLegend={false}
        />
      </View>

      {/* Legend in Two Columns */}
      <View style={styles.legendContainer}>
        {formattedData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{t(item.name)}</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',


  },
  legendContainer: {
    marginTop: hp('1%'),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',

    marginBottom: hp('1%'),


  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: "red",
    marginHorizontal: wp(1),

  },
  colorBox: {
    width: wp('3%'),
    height: wp('3%'),
    marginRight: wp('2%'),
    borderRadius: wp('0.5%'),

  },
  legendText: {
    fontSize: hp('1.5%'),
    color: '#7F7F7F',
  },
});

export default MyPieChartSec;