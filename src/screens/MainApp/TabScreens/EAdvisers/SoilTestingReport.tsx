import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRoute, RouteProp } from '@react-navigation/native';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';
import Navbar from '../../Navbar/Navbar';

type RootStackParamList = {
  SoilTestingReport: {
    date: string;
    status: boolean;
    soilData: {
      pH: number;
      organic_matter: number;
      nitrogen: number;
      phosphorus: number;
      potassium: number;
      zinc: number;
      iron: number;
      manganese: number;
      copper: number;
      boron: number;
      electrical_conductivity: number;
      soil_texture: number;
    };
  };
};

type SoilTestingReportRouteProp = RouteProp<RootStackParamList, 'SoilTestingReport'>;

const SoilTestingReport = () => {
  const route = useRoute<SoilTestingReportRouteProp>();
  const { date } = route.params;

  // Mock data for demonstration
  const soilData = {
    pH: 6.8,
    organic_matter: 2.1,
    nitrogen: 38,
    phosphorus: 27,
    potassium: 180,
    zinc: 0.9,
    iron: 4.5,
    manganese: 3.2,
    copper: 0.6,
    boron: 0.4,
    electrical_conductivity: 1.2,
    soil_texture: 38,
  };

  const parameters = [
    { name: 'Soil pH', value: soilData.pH, range: '6.0-7.5', unit: '' },
    { name: 'Organic Matter %', value: soilData.organic_matter, range: '2.0-3.5', unit: '' },
    { name: 'Nitrogen (N)', value: soilData.nitrogen, range: '40-60kg per acre', unit: 'kg per acre' },
    { name: 'Phosphorus (P)', value: soilData.phosphorus, range: '25-40kg per acre', unit: 'kg per acre' },
    { name: 'Potassium (K)', value: soilData.potassium, range: '150-210kg per acre', unit: 'kg per acre' },
    { name: 'Zinc (Zn)', value: soilData.zinc, range: '> 1.0ppm', unit: 'ppm' },
    { name: 'Iron (Fe)', value: soilData.iron, range: '3.0-6.0ppm', unit: 'ppm' },
    { name: 'Manganese (Mn)', value: soilData.manganese, range: '2.0-5.0ppm', unit: 'ppm' },
    { name: 'Copper (Cu)', value: soilData.copper, range: '0.5-1.0ppm', unit: 'ppm' },
    { name: 'Boron (B)', value: soilData.boron, range: '0.5-0.8ppm', unit: 'ppm' },
    { name: 'Electrical\nConductivity', value: soilData.electrical_conductivity, range: '< 2.0dS/m', unit: 'dS/m' },
    { name: 'Soil Texture', value: soilData.soil_texture, range: '-', unit: 'kg per acre' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar gobackOnly={true} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Soil Testing Report</Text>
        
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Conducted on: {date}</Text>
          <Text style={styles.dateText}>Report available on: 01 March 2025</Text>
        </View>

        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { flex: 1.2 }]}>Parameters</Text>
            <Text style={[styles.headerCell, { flex: 0.8 }]}>Result</Text>
            <Text style={[styles.headerCell, { flex: 1,borderRightWidth: 0 }]}>Ideal Range</Text>
          </View>

          {/* Table Rows */}
          {parameters.map((param, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.cell, { flex: 1.2 }]}>{param.name}</Text>
              <Text style={[styles.cell, { flex: 0.8 }]}>
                {param.value}{param.unit === 'ppm' ? 'ppm' : ''}
              </Text>
              <Text style={[styles.cell, { flex: 1,borderRightWidth: 0 }]}>{param.range}</Text>
            </View>
          ))}
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
    marginBottom: hp('2%'),
  },
  dateContainer: {
    marginBottom: hp('3%'),
  },
  dateText: {
    fontSize: wp('4%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    marginBottom: hp('0.5%'),
  },
  tableContainer: {
    borderRadius: wp('2%'),
    overflow: 'hidden',
    marginBottom: hp('5%'),
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.LIGHT_GREEN,
    borderBottomWidth: 1,
    borderBottomColor: colors.GREEN,
  },
  headerCell: {
    padding: wp('2%'),
    fontSize: wp('4%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.GREEN,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.GREEN,
    backgroundColor: colors.WHITE,
  },
  cell: {
    padding: wp('2%'),
    fontSize: wp('3.8%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.GREEN,
  },
});

export default SoilTestingReport