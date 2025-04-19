import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Picker } from '@react-native-picker/picker';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';
import Navbar from '../../Navbar/Navbar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  RequestGrading: undefined;
  ViewGrading: {
    gradingId: string;
    items: string;
    readyBy: string;
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Grading = () => {
  const navigation = useNavigation<NavigationProp>();
  const [sortByOrder, setSortByOrder] = useState('sort by order');
  const [sortByItems, setSortByItems] = useState('sort by items');

  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar gobackOnly={false} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Grading</Text>

        {/* Request Grading Section */}
        <View style={styles.requestSection}>
          <View style={styles.headerRow}>
            <Image 
              source={require('./Images/Services/feedback.png')}
              style={styles.icon}
            />
            <Text style={styles.sectionTitle}>Request Grading</Text>
          </View>
          <Text style={styles.description}>
            Assess and classify your crops based on quality standards to ensure better market pricing and transparency
          </Text>
          <TouchableOpacity 
            style={styles.requestButton}
            onPress={() => navigation.navigate('RequestGrading')}
          >
            <Text style={styles.buttonText}>Request Grading</Text>
          </TouchableOpacity>
        </View>

        {/* In Progress Section */}
        <View style={styles.inProgressSection}>
          <View style={styles.progressHeader}>
            <Image 
              source={require('./Images/Services/loading.png')}
              style={styles.loadingIcon}
            />
            <Text style={styles.progressTitle}>Grading in progress</Text>
          </View>
          <View style={styles.progressDetails}>
            <Text style={styles.progressText}>Grading ID: <Text style={styles.boldText}>39</Text></Text>
            <Text style={styles.progressText}>Ready by: <Text style={styles.boldText}>20 April 2024</Text></Text>
            <Text style={styles.progressText}>Items: <Text style={styles.boldText}>Potatoes</Text></Text>
          </View>
        </View>

        {/* History Section */}
        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>History</Text>
          
          {/* Sort Pickers */}
          <View style={styles.sortContainer}>
            <View style={styles.smallPickerContainer}>
              <Picker
                selectedValue={sortByOrder}
                onValueChange={(value) => setSortByOrder(value)}
                style={styles.smallPicker}
                mode="dropdown"
              >
                <Picker.Item label="sort by order" value="sort by order" />
                <Picker.Item label="ascending" value="ascending" />
                <Picker.Item label="descending" value="descending" />
              </Picker>
            </View>

            <View style={styles.smallPickerContainer}>
              <Picker
                selectedValue={sortByItems}
                onValueChange={(value) => setSortByItems(value)}
                style={styles.smallPicker}
                mode="dropdown"
              >
                <Picker.Item label="sort by items" value="sort by items" />
                <Picker.Item label="ascending" value="ascending" />
                <Picker.Item label="descending" value="descending" />
              </Picker>
            </View>
          </View>

          {/* History Items */}
          <View style={styles.historyList}>
            <TouchableOpacity 
              style={styles.historyItem}
              onPress={() => navigation.navigate('GradingInfo', {
                gradingId: '35',
                items: 'Wheat',
                readyBy: '10 April 2024'
              })}
            >
              <Image 
                source={require('./Images/Services/Exam.png')}
                style={styles.documentIcon}
              />
              <View style={styles.gradingInfo}>
                <Text style={styles.gradingTitle}>Grading ID <Text style={styles.boldText}>35</Text></Text>
                <Text style={styles.gradingDetails}>Items: <Text style={styles.boldText}>Wheat</Text></Text>
                <Text style={styles.gradingDetails}>Ready by: <Text style={styles.boldText}>10 April 2024</Text></Text>
              </View>
              <Image 
                source={require('./Images/Services/rArrow.png')}
                style={styles.chevronIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.historyItem}
              onPress={() => navigation.navigate('GradingInfo', {
                gradingId: '24',
                items: 'Rice',
                readyBy: '11 March 2024'
              })}
            >
              <Image 
                source={require('./Images/Services/Exam.png')}
                style={styles.documentIcon}
              />
              <View style={styles.gradingInfo}>
                <Text style={styles.gradingTitle}>Grading <Text style={styles.boldText}>24</Text></Text>
                <Text style={styles.gradingDetails}>Items: <Text style={styles.boldText}>Rice</Text></Text>
                <Text style={styles.gradingDetails}>Ready by: <Text style={styles.boldText}>11 March 2024</Text></Text>
              </View>
              <Image 
                source={require('./Images/Services/rArrow.png')}
                style={styles.chevronIcon}
              />
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
  requestSection: {
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
  documentIcon: {
    width: wp('8%'),
    height: wp('8%'),
    marginRight: wp('3%'),
  },
  chevronIcon: {
    width: wp('4%'),
    height: wp('4%'),
  },
  gradingInfo: {
    flex: 1,
  },
  gradingTitle: {
    fontSize: wp('4%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
    marginBottom: hp('0.5%'),
  },
  gradingDetails: {
    fontSize: wp('3.5%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
  },
  boldText: {
    fontFamily: fonts.Medium,
    color: colors.BLACK,
  },
});

export default Grading;