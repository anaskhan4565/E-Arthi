import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';
import Navbar from '../../Navbar/Navbar';
import ScreensName from '../../../../../util/Constants/ScreensName';
import { useNavigation } from '@react-navigation/native';

const PricingAdvisor = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar gobackOnly={true} />
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Pricing Advisor</Text>

        {/* Spending Breakdown Section */}
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Spending Breakdown</Text>
          <View style={styles.chartContainer}>
            <Image source={require('./Images/Home/chart.png')} style={styles.chart} />
          </View>
          
          
        </View>

        {/* Expected Earnings Section */}
        <View style={styles.earningsSection}>
          <Text style={styles.sectionTitle}>Expected Earnings</Text>
          <View style={styles.earningsDetails}>
            <View style={styles.earningsRow}>
              <Text style={styles.earningsLabel}>Estimated Yield:</Text>
              <Text style={styles.earningsValue}>27kg per acre</Text>
            </View>
            <View style={styles.earningsRow}>
              <Text style={styles.earningsLabel}>Market Rate:</Text>
              <Text style={styles.earningsValue}>220 Rupees per kg</Text>
            </View>
            <View style={styles.earningsRow}>
              <Text style={styles.earningsLabel}>Expected Income:</Text>
              <Text style={styles.earningsValue}>50,000 Rupees</Text>
            </View>
          </View>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate(ScreensName.ProfitMaximisation)}
          >
            <Image source={require('./Images/Home/trend.png')} style={styles.buttonIcon} />
            <Text style={styles.buttonTitle}>Profit</Text>
            <Text style={styles.buttonSubtitle}>Maximization</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate(ScreensName.ProductPricing)}
          >
            <Image source={require('./Images/Home/PriceTag.png')} style={styles.buttonIcon} />
            <Text style={styles.buttonTitle}>Product</Text>
            <Text style={styles.buttonSubtitle}>Pricing</Text>
          </TouchableOpacity>
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
    marginBottom: hp('3%'),
  },
  chartSection: {
    marginBottom: hp('3%'),
    backgroundColor: colors.LIGHT_GREEN,
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  chartContainer: {
    height: hp('30%'),
    marginBottom: hp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    height: '100%',
    width: '100%',
  },
  legendContainer: {
    marginTop: hp('2%'),
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  legendColor: {
    width: wp('4%'),
    height: wp('4%'),
    borderRadius: wp('2%'),
    marginRight: wp('2%'),
  },
  legendText: {
    flex: 1,
    fontSize: wp('3.8%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
  },
  legendPercentage: {
    fontSize: wp('3.8%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
  },
  earningsSection: {
    backgroundColor: colors.LIGHT_GREEN,
    borderRadius: wp('3%'),
    padding: wp('4%'),
    marginBottom: hp('3%'),
  },
  earningsDetails: {
    gap: hp('1%'),
  },
  earningsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2%'),
    justifyContent: 'center',
  },
  earningsLabel: {
    fontSize: wp('4%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    lineHeight: wp('6%'),
  },
  earningsValue: {
    fontSize: wp('4%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
    lineHeight: wp('6%'),
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('4%'),
    gap: wp('4%'),
  },
  button: {
    flex: 1,
    backgroundColor: colors.WHITE,
    borderRadius: wp('3%'),
    padding: wp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  buttonTitle: {
    fontSize: wp('4%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
  },
  buttonSubtitle: {
    fontSize: wp('3.5%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
  },
  buttonIcon: {
    width: wp('20%'),
    height: wp('20%'),
  },
});

export default PricingAdvisor;