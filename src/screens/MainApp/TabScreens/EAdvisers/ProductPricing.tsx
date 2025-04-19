import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Picker } from '@react-native-picker/picker';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';
import Navbar from '../../Navbar/Navbar';
import { LineChart } from 'react-native-chart-kit';

const ProductPricing = () => {
  const [selectedCrop, setSelectedCrop] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar gobackOnly={true} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Product Pricing</Text>
        <Text style={styles.subtitle}>Choose crop to calculate profitable pricing for:</Text>

        {/* Crop Selection Dropdown */}
        <View style={styles.dropdownContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCrop}
              onValueChange={(value) => setSelectedCrop(value)}
              style={styles.picker}
              mode="dropdown"
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Select crop name" value="" style={styles.pickerItem} />
              <Picker.Item label="Wheat" value="wheat" style={styles.pickerItem} />
              <Picker.Item label="Rice" value="rice" style={styles.pickerItem} />
              <Picker.Item label="Cotton" value="cotton" style={styles.pickerItem} />
              <Picker.Item label="Sugarcane" value="sugarcane" style={styles.pickerItem} />
            </Picker>
          </View>
        </View>

        {/* Pricing Table */}
        <View style={styles.pricingTable}>
          <View style={[styles.tableRow, styles.firstRow]}>
            <Text style={styles.tableLabel}>Current Market Price</Text>
            <View style={styles.verticalLine} />
            <Text style={styles.tableValue}>150 Rupees per kg</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Break Even Price</Text>
            <View style={styles.verticalLine} />
            <Text style={styles.tableValue}>110 Rupees per kg</Text>
          </View>
          <View style={[styles.tableRow, styles.lastRow]}>
            <Text style={[styles.tableLabel, styles.recommendedLabel]}>Recommended Selling{'\n'}Price</Text>
            <View style={[styles.verticalLine, styles.lastVerticalLine]} />
            <Text style={[styles.tableValue, styles.recommendedValue]}>145 Rupees per kg</Text>
          </View>
        </View>

        {/* Profit Graph Section */}
        <View style={styles.graphSection}>
          <Text style={styles.graphTitle}>Expected profits based on recommended selling price:</Text>
          <View style={styles.graphContainer}>
            <LineChart
              data={{
                labels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 25', 'Day 30'],
                datasets: [{
                  data: [0, 5, 10, 20, 35, 60]
                }]
              }}
              width={wp('90%')}
              height={hp('30%')}
              chartConfig={{
                backgroundColor: colors.WHITE,
                backgroundGradientFrom: colors.WHITE,
                backgroundGradientTo: colors.WHITE,
                decimalPlaces: 0,
                color: (opacity = 1) => colors.GREEN,
                labelColor: (opacity = 1) => colors.BLACK,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "4",
                  strokeWidth: "2",
                  stroke: colors.GREEN
                },
                propsForBackgroundLines: {
                  strokeDasharray: "", // Solid grid lines
                  stroke: colors.LIGHT_GRAY,
                  strokeWidth: 1
                }
              }}
              withInnerLines={true}
              withOuterLines={true}
              withVerticalLines={true}
              withHorizontalLines={true}
              style={styles.chart}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  navbarContainer: {
    height: hp('8.5%'),
    backgroundColor: colors.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: colors.LIGHT_GRAY,
  },
  content: {
    flex: 1,
    padding: wp('4%'),
  },
  title: {
    fontSize: wp('6%'),
    fontFamily: fonts.SemiBold,
    color: colors.BLACK,
    marginBottom: hp('1%'),
  },
  subtitle: {
    fontSize: wp('4%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    marginBottom: hp('2%'),
  },
  dropdownContainer: {
    marginBottom: hp('3%'),
  },
  pickerContainer: {
    height: hp('6%'),
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY,
    borderRadius: wp('2%'),
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: colors.WHITE,
  },
  picker: {
    height: hp('6%'),
    color: colors.BLACK,
    fontFamily: fonts.Regular,
  },
  pickerItem: {
    fontSize: wp('4%'),
    fontFamily: fonts.Regular,
  },
  pricingTable: {
    marginBottom: hp('3%'),
    borderRadius: wp('2%'),
    overflow: 'hidden',
    backgroundColor: colors.LIGHT_GREEN,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.GREEN,
    backgroundColor: colors.WHITE,
    position: 'relative',
  },
  firstRow: {
    borderTopWidth: 0,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  tableLabel: {
    fontSize: wp('3.5%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    flex: 1,
    textAlign: 'center',
    paddingVertical: hp('2%'),
    paddingLeft: wp('4%'),
    paddingRight: wp('2%'),
  },
  verticalLine: {
    width: 1,
    position: 'absolute',
    top: 0,
    bottom: -1,
    backgroundColor: colors.GREEN,
    left: '50%',
  },
  lastVerticalLine: {
    bottom: 0,
  },
  tableValue: {
    fontSize: wp('3.5%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
    textAlignVertical: 'center',
    textAlign: 'center',
    flex: 1,
    paddingVertical: hp('2%'),
    paddingLeft: wp('2%'),
    paddingRight: wp('4%'),
  },
  recommendedLabel: {
    color: colors.GREEN,
    fontFamily: fonts.Medium,
  },
  recommendedValue: {
    color: colors.GREEN,
    fontFamily: fonts.SemiBold,
  },
  graphSection: {
    marginTop: hp('2%'),
  },
  graphTitle: {
    fontSize: wp('4%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    marginBottom: hp('2%'),
  },
  graphContainer: {
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: wp('3%'),
    padding: wp('2%'),
  },
  chart: {
    marginVertical: hp('1%'),
    borderRadius: wp('3%'),
  },
});

export default ProductPricing;