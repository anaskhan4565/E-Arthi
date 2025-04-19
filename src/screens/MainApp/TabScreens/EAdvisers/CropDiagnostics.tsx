import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';
import Navbar from '../../Navbar/Navbar';

type CropType = {
  id: string;
  name: string;
  image: any;
};

type RootStackParamList = {
  CropDiagnostics: { crop: CropType };
};

type CropDiagnosticsRouteProp = RouteProp<RootStackParamList, 'CropDiagnostics'>;

const CropDiagnostics = () => {
  const route = useRoute<CropDiagnosticsRouteProp>();
  const { crop } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar gobackOnly={true} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>{crop.name}</Text>

        {/* Crop Image */}
        <View style={styles.imageContainer}>
          <Image
            source={crop.image}
            style={styles.cropImage}
            resizeMode="cover"
          />
        </View>

        {/* Crop Health Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Crop Health</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Disease detected: </Text>
            <Text style={styles.value}>Early Stage Leaf Rust</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Suggested treatment: </Text>
            <Text style={styles.value}>Apply Fungicide A within 3 days</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Recovery Time: </Text>
            <Text style={styles.value}>7-10 days if treated</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View Diagnosis</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View Treatment</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pest Detection Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pest Detection</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Pest detected: </Text>
            <Text style={styles.value}>Aphids</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Suggested treatment: </Text>
            <Text style={styles.value}>Broflanilide 20.0% SC</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View Pest</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View Treatment</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Nutrient Deficiency Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nutrient Deficiency</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Nutrient deficiency detected: </Text>
            <Text style={styles.value}>Nitrogen deficiency</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Suggested treatment: </Text>
            <Text style={styles.value}>Apply Urea (75 kg/acre in 2 splits)</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Expected Recovery: </Text>
            <Text style={styles.value}>Visible in 1 week</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Prevention: </Text>
            <Text style={styles.value}>Use starter dose next season</Text>
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
    marginBottom: hp('2%'),
  },
  imageContainer: {
    height: hp('25%'),
    borderRadius: wp('3%'),
    overflow: 'hidden',
    marginBottom: hp('3%'),
  },
  cropImage: {
    width: '100%',
    height: '100%',
  },
  section: {
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
    textAlign: 'center',
  },
  detectionText: {
    fontSize: wp('4%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    marginBottom: hp('1%'),
  },
  treatmentText: {
    fontSize: wp('4%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    marginBottom: hp('1%'),
  },
  recoveryText: {
    fontSize: wp('4%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    marginBottom: hp('1%'),
  },
  preventionText: {
    fontSize: wp('4%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
    gap: wp('3%'),
  },
  button: {
    flex: 1,
    backgroundColor: colors.GREEN,
    borderRadius: wp('2%'),
    padding: wp('3%'),
    alignItems: 'center',
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: wp('3.8%'),
    fontFamily: fonts.Medium,
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: hp('1%'),
  },
  label: {
    fontSize: wp('3.5%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
  },
  value: {
    fontSize: wp('3.5%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
  },
});

export default CropDiagnostics;