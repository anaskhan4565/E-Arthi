import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import CustomSearchApp from '../CustomComponent/CustomSearchApp.jsx';
import colors from '../../../../util/colors.js';
import ItemBox from '../CustomComponent/ItemBox.jsx';
import Heart from '../../../assets/MainApp/HomeScreen/Heart.png';
import allNames from '../../../../util/E-Offerings.js';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const Home = () => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.WHITE }}>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.searchContainer}>
          <CustomSearchApp placeholder={'Search in here'} />
        </View>

        <View style={styles.bodyContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>E-Arthi-Offerings</Text>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {allNames.map((name, index) => (
              name.trim() !== '' && (
                <View style={styles.itemBoxWrapper} key={index}>
                  <ItemBox name={name} SourceGiven={Heart} />
                </View>
              )
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  navbarContainer: {
    height: hp('8.5%'),
    backgroundColor: 'white',
},
searchContainer: {
    marginVertical: hp('3%'),
    height: hp('7%'),
},
  contentContainer: {
    flex: 1,
    //marginTop: 10,
  },

  bodyContainer: {
    flex: 1,
    margin: 20,
  },
  titleContainer: {
    padding: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Space items evenly
    paddingVertical: 10,
  },
  itemBoxWrapper: {
    width: '30%', // 3 items per row (adjusted for padding)
    marginBottom: 15,
    alignItems: 'center',
  },
});
