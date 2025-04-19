import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Picker } from '@react-native-picker/picker';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';
import Navbar from '../../Navbar/Navbar';

const ProfitMaximisation = () => {
  const [selectedCrop, setSelectedCrop] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar gobackOnly={true} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Profit Maximization</Text>
        <Text style={styles.subtitle}>Choose crop to maximize profits for:</Text>

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

        {/* Fertilizer Costs Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Image 
              source={require('./Images/ProfitMax/Fertilizer.png')}
              style={styles.sectionIcon}
            />
            <View style={styles.sectionHeaderText}>
              <Text style={styles.sectionTitle}>Fertilizer Costs Reduction</Text>
              <Text style={styles.sectionSubtitle}>Discover products in less price for same chemical composition</Text>
            </View>
            <Image 
              source={require('./Images/ProfitMax/arrow.png')}
              style={styles.arrowIcon}
            />
          </View>
        </View>

        {/* Harvest Smart Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Image 
              source={require('./Images/ProfitMax/Harvesting.png')}
              style={styles.sectionIcon}
            />
            <View style={styles.sectionHeaderText}>
              <Text style={styles.sectionTitle}>Harvest Smart</Text>
              <Text style={styles.sectionSubtitle}>Time your harvest with peak market demand to fetch premium prices</Text>
            </View>
          </View>

          {/* Harvest Dates */}
          <View style={styles.harvestDates}>
            <View style={styles.dateContainer}>
              <Text style={styles.dateLabel}>Sow on</Text>
              <View style={styles.dateBox}>
                <Text style={styles.dateText}>27 Feb</Text>
              </View>
            </View>
            <Text style={styles.dateConnector}>to</Text>
            <View style={styles.dateContainer}>
              <Text style={styles.dateLabel}>Reap on</Text>
              <View style={styles.dateBox}>
                <Text style={styles.dateText}>14 Apr</Text>
              </View>
            </View>
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
  section: {
    backgroundColor: colors.LIGHT_GREEN,
    borderRadius: wp('3%'),
    padding: wp('4%'),
    marginBottom: hp('3%'),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    width: wp('12%'),
    height: wp('12%'),
    marginRight: wp('3%'),
  },
  sectionHeaderText: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: wp('4%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
    marginBottom: hp('0.5%'),
  },
  sectionSubtitle: {
    fontSize: wp('3.5%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    lineHeight: wp('4.5%'),
  },
  arrowIcon: {
    width: wp('8%'),
    height: wp('8%'),
    tintColor: colors.GREEN,
  },
  harvestDates: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('3%'),
    gap: wp('4%'),
  },
  dateContainer: {
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: wp('3.5%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    marginBottom: hp('1%'),
  },
  dateBox: {
    borderWidth: 1,
    borderColor: colors.GREEN,
    borderRadius: wp('2%'),
    padding: wp('3%'),
    minWidth: wp('25%'),
    alignItems: 'center',
  },
  dateText: {
    fontSize: wp('4%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
  },
  dateConnector: {
    fontSize: wp('3.5%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    marginTop: hp('3%'),
  },
});

export default ProfitMaximisation;