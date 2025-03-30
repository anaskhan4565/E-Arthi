import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Navbar from '../../Navbar/Navbar';
import colors from '../../../../../util/Constants/colors';

const FertilizationChemical = ({navigation,route}) => {
  const {Name} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar gobackOnly={true} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>{Name}</Text>

        <View style={styles.weekContainer}>
          <View style={styles.weekHeader}>
            <View>
              <Text style={styles.weekTitle}>Week 1</Text>
              <Text style={styles.weekDates}>17 March - 24 March (Current)</Text>
            </View>
            <TouchableOpacity style={styles.fertChemicalButton}>
              <Text style={styles.fertChemicalText}>Fertilization Chemical</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.imageContainer}>
            {/* Placeholder for image */}
            <View style={styles.placeholderImage} />
          </View>

          <Text style={styles.taskTitle}>Basal fertilization for potato</Text>

          <TouchableOpacity style={styles.readMoreButton}>
            <Text style={styles.readMoreText}>Read More</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.weekContainer}>
          <View style={styles.weekHeader}>
            <View>
              <Text style={styles.weekTitle}>Week 6</Text>
              <Text style={styles.weekDates}>20 April - 27 April</Text>
            </View>
            <TouchableOpacity style={styles.fertChemicalButton}>
              <Text style={styles.fertChemicalText}>Fertilization Chemical</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.imageContainer}>
            {/* Placeholder for image */}
            <View style={styles.placeholderImage} />
          </View>

          <Text style={styles.taskTitle}>First split nitrogen fertilization</Text>

          <TouchableOpacity style={styles.readMoreButton}>
            <Text style={styles.readMoreText}>Read More</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  navbarContainer: {
    height: hp("8.2%"),
    backgroundColor: "white",
    marginTop: hp("0.14%"),
  },
  profileContainer: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  logo: {
    width: wp(10),
    height: wp(10),
    resizeMode: 'contain',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
  },
  icon: {
    width: wp(6),
    height: wp(6),
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
  },
  title: {
    fontSize: wp(5.5),
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: hp(2.5),
  },
  weekContainer: {
    marginBottom: hp(3),
    backgroundColor: colors.LIGHT_GREEN,
    padding: hp(1),
    borderRadius: wp(2)
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: hp(1),
  },
  weekTitle: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: '#000000',
  },
  weekDates: {
    fontSize: wp(3.5),
    color: '#666666',
  },
  fertChemicalButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.5),
    borderRadius: wp(5),
  },
  fertChemicalText: {
    color: '#ffffff',
    fontSize: wp(3),
  },
  plantingButton: {
    backgroundColor: '#27ae60',
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.5),
    borderRadius: wp(5),
  },
  plantingText: {
    color: '#ffffff',
    fontSize: wp(3),
  },
  imageContainer: {
    width: '100%',
    height: hp(15),
    marginBottom: hp(1.5),
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: wp(2),
  },
  taskTitle: {
    fontSize: wp(4),
    fontWeight: '500',
    color: '#000000',
    marginBottom: hp(1.5),
  },
  readMoreButton: {
    backgroundColor: colors.GREEN,
    paddingVertical: hp(1),
    borderRadius: wp(1),
    alignItems: 'center',
    alignSelf: 'center',
    width: '40%',
  },
  readMoreText: {
    color: '#ffffff',
    fontSize: wp(3.5),
    fontWeight: '500',
  }
});

export default FertilizationChemical;