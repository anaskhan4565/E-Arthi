import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRoute, RouteProp } from '@react-navigation/native';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';
import Navbar from '../../Navbar/Navbar';

type RootStackParamList = {
  ViewPackage: {
    packageId: string;
    packageNumber: string;
    startDate: string;
    completedDate: string;
    items: string;
    quantity: string;
    location: string;
  };
};

type ViewPackageRouteProp = RouteProp<RootStackParamList, 'ViewPackage'>;

const ViewPackage = () => {
  const route = useRoute<ViewPackageRouteProp>();
  const { packageNumber, startDate, completedDate, items, quantity, location } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar gobackOnly={true} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Package {packageNumber}</Text>

        <View style={styles.imageContainer}>
          <Image 
            source={require('./Images/Services/Croppackage.jpeg')}
            style={styles.packageImage}
            
          />
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Package ID: </Text>
            <Text style={styles.value}>{packageNumber}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Start date: </Text>
            <Text style={styles.value}>{startDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Completed by: </Text>
            <Text style={styles.value}>{completedDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Items: </Text>
            <Text style={styles.value}>{items}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Quantity: </Text>
            <Text style={styles.value}>{quantity}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Packaged at: </Text>
            <Text style={styles.value}>{location}</Text>
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
    fontFamily: fonts.Medium,
    color: colors.BLACK,
    marginBottom: hp('2%'),
  },
  imageContainer: {
    height: hp('25%'),
    backgroundColor: colors.LIGHT_GREEN,
    borderRadius: wp('3%'),
    padding: wp('4%'),
    marginBottom: hp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  packageImage: {
    width: '100%',
    height: '100%',
    borderRadius: wp('3%'),
  },
  detailsContainer: {
    backgroundColor: colors.LIGHT_GREEN,
    borderRadius: wp('3%'),
    padding: wp('4%'),
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: hp('1.5%'),
  },
  label: {
    fontSize: wp('4%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    flex: 1,
  },
  value: {
    fontSize: wp('4%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
    flex: 1,
  },
});

export default ViewPackage;