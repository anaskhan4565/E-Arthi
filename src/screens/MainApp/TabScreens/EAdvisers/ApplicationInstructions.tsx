import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Navbar from '../../Navbar/Navbar'
import colors from '../../../../../util/Constants/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../../../../../util/Constants/FontName';
import ScreensName from '../../../../../util/Constants/ScreensName';

type RootStackParamList = {
    FertilizationSchedule: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'FertilizationSchedule'>;

const ApplicationInstructions = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>
            
            <ScrollView style={styles.content}>
                <Text style={styles.title}>Diammonium Phosphate (DAP)</Text>
                
                <View style={styles.instructionsContainer}>
                    <View style={styles.headerRow}>
                        <Image 
                            source={require('./Images/Home/spray.png')} 
                            style={styles.icon}
                        />
                        <Text style={styles.sectionTitle}>Application Instructions</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>Time of Application:</Text>
                        <Text style={styles.subHeader}>At Sowing (Basal Application):</Text>
                        <Text style={styles.instructionText}>
                            Apply 60 kg per acre before or at the time of sowing to ensure strong root development
                        </Text>
                    </View>

                    <View style={[styles.section, {borderBottomWidth: 0}]}>
                        <Text style={styles.sectionHeader}>Method of Application:</Text>
                        <Text style={styles.instructionText}>
                            Place DAP 2-3 inches deep in the soil near the seed rows to improve nutrient availability
                        </Text>
                    </View>
                </View>

                <TouchableOpacity 
                    style={styles.scheduleButton}
                    onPress={() => navigation.navigate('FertilizationSchedule')}
                >
                    <Text style={styles.buttonText}>View Fertilization Schedule</Text>
                </TouchableOpacity>
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
      fontWeight: 'bold',
      color: colors.BLACK,
      marginBottom: hp('3%'),
      fontFamily: fonts.Medium,
  },
  instructionsContainer: {
      backgroundColor: colors.LIGHT_GREEN,
      borderRadius: wp('3%'),
      padding: wp('4%'),
      marginBottom: hp('3%'),
  },
  headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: hp('2%'),
      borderBottomWidth: 1,
      borderBottomColor: colors.GREEN,
  },
  icon: {
      width: wp('8%'),
      height: wp('8%'),
      marginRight: wp('2%'),
  },
  sectionTitle: {
      fontSize: wp('5%'),
      fontWeight: '600',
      color: colors.BLACK,
      fontFamily: fonts.Medium,
  },
  section: {
      marginBottom: hp('2%'),
      borderBottomWidth: 1,
      borderBottomColor: colors.GREEN,
  },
  sectionHeader: {
      fontSize: wp('4.5%'),
      fontWeight: '600',
      color: colors.BLACK,
      marginBottom: hp('1%'),
      fontFamily: fonts.Medium,
  },
  subHeader: {
      fontSize: wp('4%'),
      fontWeight: '500',
      color: colors.BLACK,
      marginBottom: hp('0.5%'),
      fontFamily: fonts.Regular,
  },
  instructionText: {
      fontSize: wp('4%'),
      color: colors.BLACK,
      lineHeight: wp('5.5%'),
      fontFamily: fonts.Regular,
  },
  scheduleButton: {
      backgroundColor: colors.GREEN,
      borderRadius: wp('2%'),
      padding: wp('4%'),
      alignItems: 'center',
      justifyContent: 'center',
  },
  buttonText: {
      color: colors.WHITE,
      fontSize: wp('4%'),
      fontWeight: '600',
      fontFamily: fonts.Regular,
  },
})

export default ApplicationInstructions