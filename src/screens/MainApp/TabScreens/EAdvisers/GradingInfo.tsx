import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRoute, RouteProp } from '@react-navigation/native';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';
import Navbar from '../../Navbar/Navbar';

type RootStackParamList = {
  GradingInfo: {
    gradingId: string;
    items: string;
    readyBy: string;
  };
};

type GradingInfoRouteProp = RouteProp<RootStackParamList, 'GradingInfo'>;

const GradingInfo = () => {
  const route = useRoute<GradingInfoRouteProp>();
  const { gradingId } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar gobackOnly={true} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Grading ID {gradingId}</Text>

        {/* Basic Info */}
        <View style={styles.basicInfo}>
          <Text style={styles.infoText}>Grading ID: <Text style={styles.boldText}>35</Text></Text>
          <Text style={styles.infoText}>Requested on: <Text style={styles.boldText}>18 April 2024</Text></Text>
          <Text style={styles.infoText}>Completed by: <Text style={styles.boldText}>20 April 2024</Text></Text>
          <Text style={styles.infoText}>Item: <Text style={styles.boldText}>Wheat</Text></Text>
          <Text style={styles.infoText}>Quantity: <Text style={styles.boldText}>50 kg</Text></Text>
          <Text style={styles.infoText}>Stored at: <Text style={styles.boldText}>ABC Warehouse</Text></Text>
        </View>

        {/* Grading Details */}
        <View style={styles.gradingDetailsContainer}>
          <Text style={styles.sectionTitle}>Grading Details</Text>
          <View style={styles.gradingDetails}>
            <Text style={styles.detailText}>Grade: <Text style={styles.boldText}>A</Text></Text>
            <Text style={styles.detailText}>Moisture %: <Text style={styles.boldText}>18%</Text></Text>
            <Text style={styles.detailText}>Purity %: <Text style={styles.boldText}>98%</Text></Text>
            <Text style={styles.detailText}>Defects: <Text style={styles.boldText}>2%</Text></Text>
          </View>
        </View>

        {/* Download Button */}
        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.buttonText}>Download Grading Certificate</Text>
        </TouchableOpacity>
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
    fontFamily: fonts.Medium,
    color: colors.BLACK,
    marginBottom: hp('3%'),
  },
  basicInfo: {
    marginBottom: hp('3%'),
    gap: hp('0.5%'),
  },
  infoText: {
    fontSize: wp('4%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
  },
  gradingDetailsContainer: {
    backgroundColor: colors.LIGHT_GREEN,
    borderRadius: wp('3%'),
    padding: wp('4%'),
    marginBottom: hp('3%'),
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
    marginBottom: hp('2%'),
  },
  gradingDetails: {
    gap: hp('0.5%'),
  },
  detailText: {
    fontSize: wp('4%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
  },
  boldText: {
    fontFamily: fonts.Medium,
    color: colors.BLACK,
  },
  downloadButton: {
    backgroundColor: colors.GREEN,
    borderRadius: wp('2%'),
    padding: wp('3%'),
    alignItems: 'center',
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: wp('4%'),
    fontFamily: fonts.Medium,
  },
});

export default GradingInfo;