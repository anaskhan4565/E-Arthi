import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Navbar from '../../Navbar/Navbar';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';
import Rentals from '../../../../../util/Constants/Rentals';
import ScreensName from '../../../../../util/Constants/ScreensName';

type VehicleData = {
  name: string;
  description: string;
  specification: string;
  tagline: string;
};

type RentalsType = {
  [key: string]: VehicleData[];
};

type RootStackParamList = {
  BookRental: { vehicleType: string };
  ERentals: undefined;
};

type BookRentalRouteProp = RouteProp<RootStackParamList, 'BookRental'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const BookRental = () => {
  const [rentalType, setRentalType] = useState('daily');
  const [days, setDays] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);

  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<BookRentalRouteProp>();
  const { vehicleType } = route.params;

  useEffect(() => {
    // Find the vehicle data from Rentals based on vehicle type
    const category = Object.keys(Rentals as RentalsType).find(key => {
      return (Rentals as RentalsType)[key].some((item: VehicleData) => item.name === vehicleType);
    });

    if (category) {
      const data = (Rentals as RentalsType)[category].find((item: VehicleData) => item.name === vehicleType);
      setVehicleData(data || null);
    }
  }, [vehicleType]);

  if (!vehicleData) {
    return (
      <View style={styles.container}>
        <View style={styles.navbarContainer}>
          <Navbar gobackOnly={true} />
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>No vehicle data available</Text>
        </View>
      </View>
    );
  }

  const handleConfirm = () => {
    // Handle booking confirmation and navigate back to rentals
    navigation.navigate(ScreensName.ERentals);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar gobackOnly={true} />
      </View>

      <ScrollView style={styles.content}>
        {/* Product Title and Description */}
        <Text style={styles.title}>{vehicleData.name}</Text>
        <Text style={styles.tagline}>{`"${vehicleData.tagline}"`}</Text>

        {/* Product Image
        <View style={styles.imageContainer}>
          <Image 
            source={require('./assets/chisel.png')}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View> */}

        {/* Product Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product Description</Text>
          <Text style={styles.description}>{vehicleData.description}</Text>
        </View>

        {/* Specifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specification</Text>
          <View style={styles.specList}>
            {vehicleData.specification.split('. ').map((spec: string, index: number) => (
              <Text key={index} style={styles.specItem}>{`${index + 1}. ${spec.trim()}`}</Text>
            ))}
          </View>
        </View>

        {/* Rent This Machine */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rent This Machine</Text>
          
          {/* Rental Type Selection */}
          <View style={styles.rentalTypeContainer}>
            <TouchableOpacity 
              style={[styles.rentalTypeButton, rentalType === 'daily' && styles.selectedRentalType]}
              onPress={() => setRentalType('daily')}
            >
              <Text style={[styles.rentalTypeText, rentalType === 'daily' && styles.selectedRentalText]}>Daily rental</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.rentalTypeButton, rentalType === 'weekly' && styles.selectedRentalType]}
              onPress={() => setRentalType('weekly')}
            >
              <Text style={[styles.rentalTypeText, rentalType === 'weekly' && styles.selectedRentalText]}>Weekly Rental</Text>
            </TouchableOpacity>
          </View>

          {/* Rental Duration */}
          <View style={styles.durationContainer}>
            <Text style={styles.durationLabel}>Rental Duration</Text>
            <Text style={styles.durationQuestion}>How long do you want to rent this machine?</Text>
            <TextInput
              style={styles.durationInput}
              placeholder={rentalType === 'daily' ? "Days" : "Weeks"}
              value={days}
              onChangeText={setDays}
              keyboardType="numeric"
            />
          </View>

          {/* Date Selection */}
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Date for rental</Text>
            <View style={styles.dateInputContainer}>
              <TextInput
                style={styles.dateInput}
                placeholder="Start Date"
                value={startDate}
                onChangeText={setStartDate}
              />
              <Text style={styles.dateToText}>to</Text>
              <TextInput
                style={styles.dateInput}
                placeholder="End Date"
                value={endDate}
                onChangeText={setEndDate}
              />
            </View>
          </View>

          {/* Total Rate */}
          <View style={styles.rateContainer}>
            <Text style={styles.rateTitle}>Total Rate</Text>
            <Text style={styles.rateText}>For one {rentalType === 'daily' ? 'day' : 'week'}: 1000 Rs</Text>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>For {days} {rentalType === 'daily' ? 'days' : 'weeks'}:</Text>
              <TextInput
                style={styles.totalInput}
                editable={false}
                value={days ? `${parseInt(days) * 1000} Rs` : ''}
              />
            </View>
          </View>

          {/* Confirm Button */}
          <TouchableOpacity style={styles.confirmButton}
            onPress={() => navigation.navigate(ScreensName.ERentals)}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  tagline: {
    fontSize: wp('4%'),
    fontFamily: fonts.SemiBold,
    color: colors.GREEN,
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  imageContainer: {
    width: '100%',
    height: hp('25%'),
    backgroundColor: colors.LIGHT_GREEN,
    borderRadius: wp('3%'),
    marginBottom: hp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('4%'),
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  section: {
    marginBottom: hp('3%'),
    backgroundColor: colors.LIGHT_GREEN,
  },
  sectionTitle: {
    fontSize: wp('5%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
    marginBottom: hp('2%'),
  },
  description: {
    fontSize: wp('4%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    lineHeight: wp('6%'),
  },
  specList: {
    gap: hp('1%'),
  },
  specItem: {
    fontSize: wp('4%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
  },
  rentalTypeContainer: {
    flexDirection: 'row',
    gap: wp('4%'),
    marginBottom: hp('3%'),
  },
  rentalTypeButton: {
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('5%'),
    borderWidth: 1,
    borderColor: colors.GREEN,
  },
  selectedRentalType: {
    backgroundColor: colors.GREEN,
  },
  rentalTypeText: {
    fontSize: wp('4%'),
    fontFamily: fonts.Regular,
    color: colors.GREEN,
  },
  selectedRentalText: {
    color: colors.WHITE,
  },
  durationContainer: {
    marginBottom: hp('3%'),
  },
  durationLabel: {
    fontSize: wp('4%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
    marginBottom: hp('1%'),
  },
  durationQuestion: {
    fontSize: wp('4%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    marginBottom: hp('1%'),
  },
  durationInput: {
    height: hp('6%'),
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY,
    borderRadius: wp('2%'),
    paddingHorizontal: wp('4%'),
    fontSize: wp('4%'),
    fontFamily: fonts.Regular,
    backgroundColor: colors.WHITE,
  },
  dateContainer: {
    marginBottom: hp('3%'),
  },
  dateLabel: {
    fontSize: wp('4%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
    marginBottom: hp('1%'),
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2%'),
  },
  dateInput: {
    flex: 1,
    height: hp('6%'),
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY,
    borderRadius: wp('2%'),
    paddingHorizontal: wp('4%'),
    fontSize: wp('4%'),
    fontFamily: fonts.Regular,
    backgroundColor: colors.WHITE,
  },
  dateToText: {
    fontSize: wp('4%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
  },
  rateContainer: {
    marginBottom: hp('3%'),
  },
  rateTitle: {
    fontSize: wp('4%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
    marginBottom: hp('1%'),
  },
  rateText: {
    fontSize: wp('4%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    marginBottom: hp('1%'),
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2%'),
  },
  totalLabel: {
    fontSize: wp('4%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
  },
  totalInput: {
    flex: 1,
    height: hp('6%'),
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY,
    borderRadius: wp('2%'),
    paddingHorizontal: wp('4%'),
    fontSize: wp('4%'),
    fontFamily: fonts.Regular,
    backgroundColor: colors.WHITE,
  },
  confirmButton: {
    backgroundColor: colors.GREEN,
    height: hp('6%'),
    borderRadius: wp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  confirmButtonText: {
    fontSize: wp('4%'),
    fontFamily: fonts.Medium,
    color: colors.WHITE,
  },
});

export default BookRental;