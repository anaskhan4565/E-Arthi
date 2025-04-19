import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';
import Navbar from '../../Navbar/Navbar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  RequestSoilTesting: undefined;
  SoilTestingReport: {
    date: string;
    status: boolean;
    soilData: {
      pH: number;
      nitrogen: number;
      phosphorus: number;
      potassium: number;
      organic_matter: number;
      moisture: number;
    };
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SoilTesting = () => {
  const navigation = useNavigation<NavigationProp>();
  const historyData = [
    {
      date: '22 March 2025',
      status: false,
      soilData: null,
    },
    {
      date: '27 February 2025',
      status: true,
      soilData: {
        pH: 6.8,
        nitrogen: 45,
        phosphorus: 28,
        potassium: 180,
        organic_matter: 2.8,
        moisture: 35,
      },
    },
    {
      date: '09 January 2025',
      status: true,
      soilData: {
        pH: 6.5,
        nitrogen: 40,
        phosphorus: 25,
        potassium: 165,
        organic_matter: 2.5,
        moisture: 32,
      },
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar gobackOnly={false} />
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Soil Testing</Text>

        {/* Request Section */}
        <View style={styles.requestContainer}>
          <View style={styles.requestHeader}>
            <Image 
              source={require('./Images/Services/2.png')} 
              style={styles.testTubeIcon}
            />
            <Text style={styles.requestText}>Request soil testing for your land</Text>
          </View>
          
          <Text style={styles.descriptionText}>
            Analyse the nutrient levels, pH, and composition of your land for better yield, stronger crops, and higher profits.
          </Text>

          <TouchableOpacity 
            style={styles.requestButton}
            onPress={() => navigation.navigate('RequestSoilTesting')}
          >
            <Text style={styles.buttonText}>Request Soil Testing</Text>
          </TouchableOpacity>
        </View>

        {/* History Section */}
        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>History</Text>
          
          {historyData.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.historyItem}
              disabled={!item.status}
              onPress={() => item.soilData && navigation.navigate('SoilTestingReport', {
                date: item.date,
                status: item.status,
                soilData: item.soilData,
              })}
            >
              <View style={styles.historyItemLeft}>
                <Image 
                  source={require('./Images/Services/report.png')} 
                  style={styles.reportIcon}
                />
                <View>
                  <Text style={styles.dateText}>{item.date}</Text>
                  <Text style={styles.statusText}>{item.status ? 'Report available' : 'Testing in progress'}</Text>
                </View>
              </View>
              {item.status && (
              <Image 
                source={require('./Images/Services/rArrow.png')} 
                style={styles.chevronIcon}
              />
              )}
            </TouchableOpacity>
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
  requestContainer: {
    backgroundColor: colors.LIGHT_GREEN,
    borderRadius: wp('3%'),
    padding: wp('4%'),
    marginBottom: hp('3%'),
  },
  requestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  testTubeIcon: {
    width: wp('8%'),
    height: wp('8%'),
    marginRight: wp('2%'),
  },
  requestText: {
    fontSize: wp('4%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
    flex: 1,
  },
  descriptionText: {
    fontSize: wp('3.8%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    lineHeight: wp('5.5%'),
    marginBottom: hp('2%'),
  },
  requestButton: {
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
  historySection: {
    marginTop: hp('1%'),
  },
  historyTitle: {
    fontSize: wp('4.5%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
    marginBottom: hp('2%'),
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp('1.5%'),
    backgroundColor: colors.LIGHT_GREEN,
    marginBottom: hp('1%'),
  },
  historyItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportIcon: {
    width: wp('6%'),
    height: wp('6%'),
    marginRight: wp('3%'),
  },
  dateText: {
    fontSize: wp('4%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
    marginBottom: hp('0.3%'),
  },
  statusText: {
    fontSize: wp('3.5%'),
    fontFamily: fonts.Regular,
    color: colors.GRAY,
  },
  chevronIcon: {
    width: wp('2.5%'),
    height: wp('2.5%'),
    marginRight: wp('2%'),
  },
});

export default SoilTesting