import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';
import Navbar from '../../Navbar/Navbar';
import { RouteProp, useRoute, useNavigation, NavigationProp  } from '@react-navigation/native';
import ScreensName from '../../../../../util/Constants/ScreensName';

type CropType = {
  id: string;
  name: string;
  image: any;
};

type RootStackParamList = {
  CropDiagnostics: { crop: CropType };
};

type CropDiagnosticsRouteProp = RouteProp<RootStackParamList, 'CropDiagnostics'>;

const CreatePackageDetails = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<CropDiagnosticsRouteProp>();
  const { crop } = route.params;
  const [quantity, setQuantity] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar gobackOnly={true} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Create A Package</Text>

        {/* Crop Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={crop.image}
            style={styles.cropImage}
            resizeMode="cover"
          />
        </View>

        {/* Details Section */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailText}>Item Name: <Text style={styles.boldText}>{crop.name}</Text></Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailText}>Quantity Available: <Text style={styles.boldText}>300 kg</Text></Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailText}>Harvested On: <Text style={styles.boldText}>15 April 2025</Text></Text>
          </View>
        </View>

        {/* Quantity Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Quantity to package:</Text>
          <TextInput
            style={styles.input}
            placeholder="enter quantity"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            placeholderTextColor={colors.GRAY}
          />
        </View>

        {/* Dates */}
        <View style={styles.datesSection}>
          <Text style={styles.dateText}>Packaging Date: <Text style={styles.boldText}>18 April 2025</Text></Text>
          <Text style={styles.dateText}>Estimated Completion Date: <Text style={styles.boldText}>20 April 2025</Text></Text>
        </View>

        {/* Package Button */}
        <TouchableOpacity style={styles.packageButton}
        onPress={() => navigation.navigate(ScreensName.Packaging)}
        >
          <Text style={styles.buttonText}>Package</Text>
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
    fontFamily: fonts.Medium,
    color: colors.BLACK,
    marginBottom: hp('2%'),
  },
  imageContainer: {
    height: hp('20%'),
    borderRadius: wp('3%'),
    overflow: 'hidden',
    marginBottom: hp('2%'),
  },
  cropImage: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    backgroundColor: colors.LIGHT_GREEN,
    borderRadius: wp('3%'),
    padding: wp('4%'),
    marginBottom: hp('2%'),
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
    marginBottom: hp('1%'),
  },
  detailRow: {
    marginBottom: hp('0.5%'),
  },
  detailText: {
    fontSize: wp('4%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
  },
  inputSection: {
    marginBottom: hp('2%'),
  },
  inputLabel: {
    fontSize: wp('4%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    marginBottom: hp('1%'),
  },
  input: {
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY,
    borderRadius: wp('2%'),
    padding: wp('3%'),
    fontSize: wp('4%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
  },
  datesSection: {
    marginBottom: hp('3%'),
  },
  dateText: {
    fontSize: wp('4%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    marginBottom: hp('0.5%'),
  },
  packageButton: {
    backgroundColor: colors.GREEN,
    borderRadius: wp('2%'),
    padding: wp('3%'),
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: wp('4%'),
    fontFamily: fonts.Medium,
  },
  boldText: {
    fontFamily: fonts.Medium,
    color: colors.BLACK,
  },
});

export default CreatePackageDetails