import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Picker } from '@react-native-picker/picker';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';
import Navbar from '../../Navbar/Navbar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreensName from '../../../../../util/Constants/ScreensName';

type RootStackParamList = {
  CreatePackage: undefined;
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

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Packaging = () => {
  const navigation = useNavigation<NavigationProp>();
  const [sortBy, setSortBy] = useState('order');
  const [sortOrder, setSortOrder] = useState('item');

  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar gobackOnly={false} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Packaging</Text>

        {/* Create Package Section */}
        <View style={styles.createSection}>
          <View style={styles.headerRow}>
            <Image 
              source={require('./Images/Services/AddPackage.png')}
              style={styles.icon}
            />
            <Text style={styles.sectionTitle}>Create a new package</Text>
          </View>
          <Text style={styles.description}>
            Easily manage and schedule packaging of your harvested crops with real-time status updates.
          </Text>
          <TouchableOpacity 
            style={styles.createButton}
            onPress={() => navigation.navigate('CreatePackage')}
          >
            <Text style={styles.buttonText}>Create Package</Text>
          </TouchableOpacity>
        </View>

        {/* In Progress Section */}
        <View style={styles.inProgressSection}>
          <View style={styles.progressHeader}>
            <Image 
              source={require('./Images/Services/loading.png')}
              style={styles.loadingIcon}
            />
            <Text style={styles.progressTitle}>Packaging in progress</Text>
          </View>
          <View style={styles.progressDetails}>
            <Text style={styles.progressText}>Package #: 39</Text>
            <Text style={styles.progressText}>Start date: 16 April 2024</Text>
            <Text style={styles.progressText}>Ready by: 20 April 2024</Text>
            <Text style={styles.progressText}>Items: Potatoes</Text>
            <Text style={styles.progressText}>Quantity: 50 kg</Text>
          </View>
        </View>

        {/* History Section */}
        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>History</Text>
          
          {/* Sort Pickers */}
          <View style={styles.sortContainer}>
            <View style={styles.smallPickerContainer}>
              <Picker
                selectedValue={sortBy}
                onValueChange={(value) => setSortBy(value)}
                style={styles.smallPicker}
                mode="dropdown"
              >
                <Picker.Item label="Sort by order" value="order" />
                <Picker.Item label="Ascending" value="asc" />
                <Picker.Item label="Descending" value="desc" />
              </Picker>
            </View>

            <View style={styles.smallPickerContainer}>
              <Picker
                selectedValue={sortOrder}
                onValueChange={(value) => setSortOrder(value)}
                style={styles.smallPicker}
                mode="dropdown"
              >
                <Picker.Item label="Sort by items" value="item" />
                <Picker.Item label="Ascending" value="asc" />
                <Picker.Item label="Descending" value="desc" />
                
              </Picker>
            </View>
          </View>

          {/* History Items */}
          <View style={styles.historyList}>
            <TouchableOpacity 
              style={styles.historyItem}
              onPress={() => navigation.navigate('ViewPackage', {
                packageId: '35',
                packageNumber: '35',
                startDate: '18 April 2024',
                completedDate: '20 April 2024',
                items: 'Potatoes',
                quantity: '50 kg',
                location: 'ABC Warehouse'
              })}
            >
              <Image 
                source={require('./Images/Services/Package.png')}
                style={styles.packageIcon}
              />
              <View style={styles.packageInfo}>
                <Text style={styles.packageTitle}>Package 35</Text>
                <Text style={styles.packageDetails}>Items: Potatoes</Text>
                <Text style={styles.packageDetails}>Ready by: 20 April 2024</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.historyItem}
              onPress={() => navigation.navigate('ViewPackage', {
                packageId: '24',
                packageNumber: '24',
                startDate: '9 March 2024',
                completedDate: '11 March 2024',
                items: 'Rice',
                quantity: '75 kg',
                location: 'ABC Warehouse'
              })}
            >
              <Image 
                source={require('./Images/Services/Package.png')}
                style={styles.packageIcon}
              />
              <View style={styles.packageInfo}>
                <Text style={styles.packageTitle}>Package 24</Text>
                <Text style={styles.packageDetails}>Items: Rice</Text>
                <Text style={styles.packageDetails}>Ready by: 11 March 2024</Text>
              </View>
            </TouchableOpacity>
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
    marginBottom: hp('2%'),
  },
  createSection: {
    backgroundColor: colors.LIGHT_GREEN,
    borderRadius: wp('3%'),
    padding: wp('4%'),
    marginBottom: hp('3%'),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  icon: {
    width: wp('6%'),
    height: wp('6%'),
    marginRight: wp('2%'),
  },
  sectionTitle: {
    fontSize: wp('4%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
  },
  description: {
    fontSize: wp('3.8%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    marginBottom: hp('2%'),
    lineHeight: wp('5%'),
  },
  createButton: {
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
  inProgressSection: {
    backgroundColor: colors.LIGHT_GREEN,
    borderRadius: wp('3%'),
    padding: wp('4%'),
    marginBottom: hp('3%'),
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  loadingIcon: {
    width: wp('5%'),
    height: wp('5%'),
    marginRight: wp('2%'),
  },
  progressTitle: {
    fontSize: wp('4%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
  },
  progressDetails: {
    gap: hp('0.5%'),
  },
  progressText: {
    fontSize: wp('3.8%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
  },
  historySection: {
    marginBottom: hp('3%'),
  },
  historyTitle: {
    fontSize: wp('4.5%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
    marginBottom: hp('2%'),
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: wp('3%'),
    marginBottom: hp('2%'),
  },
  smallPickerContainer: {
    flex: 1,
    height: hp('5%'),
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY,
    borderRadius: wp('2%'),
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: colors.WHITE,
  },
  smallPicker: {
    height: hp('5%'),
    color: colors.BLACK,
    fontSize: wp('3.5%'),
    fontFamily: fonts.Regular,
  },
  historyList: {
    gap: hp('1%'),
  },
  historyItem: {
    flexDirection: 'row',
    backgroundColor: colors.LIGHT_GREEN,
    borderRadius: wp('2%'),
    padding: wp('3%'),
    alignItems: 'center',
  },
  packageIcon: {
    width: wp('8%'),
    height: wp('8%'),
    marginRight: wp('3%'),
  },
  packageInfo: {
    flex: 1,
  },
  packageTitle: {
    fontSize: wp('4%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
    marginBottom: hp('0.5%'),
  },
  packageDetails: {
    fontSize: wp('3.5%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
  },
});

export default Packaging