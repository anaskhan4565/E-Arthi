import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';
import Navbar from '../../Navbar/Navbar';

const FertilizationSchedule = () => {
  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar gobackOnly={true} />
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Fertilization Schedule</Text>
        <Text style={styles.subtitle}>Recommended schedule for wheat per acre:</Text>

        {/* At Sowing Stage */}
        <View style={styles.stageContainer}>
          <Text style={styles.stageNumber}>1.</Text>
          <View style={styles.stageContent}>
            <Text style={styles.stageName}>At Sowing</Text>
            <Text style={styles.stageSubtitle}>Basal Application - Before or During Planting</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletText}>• DAP (60 kg): Supplies phosphorus for strong root development.</Text>
            </View>
          </View>
        </View>

        {/* Tillering Stage */}
        <View style={styles.stageContainer}>
          <Text style={styles.stageNumber}>2.</Text>
          <View style={styles.stageContent}>
            <Text style={styles.stageName}>Tillering Stage</Text>
            <Text style={styles.stageSubtitle}>(25-30 Days After Sowing)</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletText}>• Urea (37.5 kg): Supplies nitrogen for vegetative growth and tillering.</Text>
            </View>
          </View>
        </View>

        {/* Booting Stage */}
        <View style={[styles.stageContainer, { borderBottomWidth: 0 }]}>
          <Text style={styles.stageNumber}>3.</Text>
          <View style={styles.stageContent}>
            <Text style={styles.stageName}>Booting Stage</Text>
            <Text style={styles.stageSubtitle}>(50-60 Days After Sowing)</Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletText}>• Urea (37.5 kg): Boosts grain formation and plant health.</Text>
              <Text style={styles.bulletText}>• MOP (Muriate of Potash, 20-30 kg) (Optional): Enhances disease resistance and grain quality.</Text>
            </View>
          </View>
        </View>

        {/* Precautions Section */}
        <View style={styles.precautionsContainer}>
          <View style={styles.warningHeader}>
            <Image 
              source={require('./Images/Home/warning.png')} 
              style={styles.warningIcon} 
            />
            <Text style={styles.precautionsTitle}>Precautions</Text>
          </View>
          <View style={styles.precautionsList}>
            <Text style={styles.precautionText}>• Apply DAP at sowing and do not mix with Urea to prevent nitrogen loss.</Text>
            <Text style={styles.precautionText}>• Ensure proper irrigation after fertilization for better nutrient absorption.</Text>
            <Text style={styles.precautionText}>• Conduct soil testing to optimize phosphorus and other nutrient levels.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

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
    fontFamily: fonts.Medium,
    color: colors.BLACK,
    marginBottom: hp('1%'),
  },
  subtitle: {
    fontSize: wp('4%'),
    color: colors.BLACK,
    marginBottom: hp('3%'),
    fontFamily: fonts.Regular,
  },
  stageContainer: {
    flexDirection: 'row',
    marginBottom: hp('3%'),
    borderBottomWidth: 1,
    borderBottomColor: colors.GREEN,
    paddingBottom: hp('2%'),
  },
  stageNumber: {
    fontSize: wp('4.5%'),
    color: colors.GREEN,
    fontFamily: fonts.Medium,
    marginRight: wp('2%'),
  },
  stageContent: {
    flex: 1,
  },
  stageName: {
    fontSize: wp('4.5%'),
    color: colors.GREEN,
    fontFamily: fonts.Medium,
    marginBottom: hp('0.5%'),
  },
  stageSubtitle: {
    fontSize: wp('4%'),
    color: colors.GREEN,
    marginBottom: hp('1%'),
    fontFamily: fonts.Regular,
  },
  bulletPoints: {
    marginLeft: wp('2%'),
  },
  bulletPoint: {
    marginLeft: wp('2%'),
  },
  bulletText: {
    fontSize: wp('4%'),
    color: colors.BLACK,
    lineHeight: wp('5.5%'),
    marginBottom: hp('0.5%'),
    fontFamily: fonts.Regular,
  },
  precautionsContainer: {
    backgroundColor: colors.LIGHT_GREEN,
    borderRadius: wp('3%'),
    padding: wp('4%'),
    marginBottom: hp('4%'),
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  warningIcon: {
    width: wp('10%'),
    height: wp('10%'),
    marginRight: wp('2%'),
  },
  precautionsTitle: {
    fontSize: wp('4.5%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
  },
  precautionsList: {
    gap: hp('1%'),
  },
  precautionText: {
    fontSize: wp('4%'),
    color: colors.BLACK,
    lineHeight: wp('5.5%'),
    fontFamily: fonts.Regular,
  },
});

export default FertilizationSchedule;